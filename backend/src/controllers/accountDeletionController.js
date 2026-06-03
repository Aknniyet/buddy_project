import {
  createAccountDeletionRequest,
  getAccountDeletionRequestsForAdmin,
  reviewAccountDeletionRequest,
} from "../repositories/accountDeletionRepository.js";
import { findAdminRecipients } from "../repositories/userRepository.js";
import { createNotification } from "../services/notificationService.js";
import { ensurePlatformEnhancements } from "../services/platformSetupService.js";
import { env } from "../config/env.js";
import { isEmailConfigured, sendNotificationEmail } from "../utils/mailer.js";

function ensureAdmin(req, res) {
  if (req.user.role !== "admin") {
    res.status(403).json({ message: "Admin access required." });
    return false;
  }

  return true;
}

export async function requestAccountDeletion(req, res) {
  try {
    await ensurePlatformEnhancements();

    if (!["international", "local"].includes(req.user.role)) {
      return res.status(403).json({ message: "Only student accounts can request deletion here." });
    }

    const reason = String(req.body.reason || "").trim();

    if (reason.length < 10) {
      return res.status(400).json({ message: "Please provide a deletion reason with at least 10 characters." });
    }

    if (reason.length > 1000) {
      return res.status(400).json({ message: "Deletion reason must be 1000 characters or fewer." });
    }

    const result = await createAccountDeletionRequest({
      userId: req.user.id,
      reason,
    });

    if (result.rows.length === 0) {
      return res.status(409).json({ message: "You already have a pending deletion request." });
    }

    const deletionRequest = result.rows[0];

    const admins = await findAdminRecipients().catch(() => ({ rows: [] }));
    await Promise.all(
      admins.rows.map((admin) =>
        createNotification({
          userId: admin.id,
          type: "account_deletion_requested",
          title: "Account deletion request",
          description: `${deletionRequest.user_name} requested account deletion.`,
          referenceType: "account_deletion_request",
          referenceId: deletionRequest.id,
          sendEmail: false,
        }).catch(() => null)
      )
    );

    return res.status(201).json({
      message: "Your account deletion request was sent to admin for review.",
      request: deletionRequest,
    });
  } catch (error) {
    console.error("Request account deletion error:", error.message);
    return res.status(500).json({ message: "Could not request account deletion." });
  }
}

export async function getAccountDeletionRequestsByAdmin(req, res) {
  try {
    if (!ensureAdmin(req, res)) return;

    await ensurePlatformEnhancements();
    const result = await getAccountDeletionRequestsForAdmin();
    return res.json(result.rows);
  } catch (error) {
    console.error("Get account deletion requests error:", error.message);
    return res.status(500).json({ message: "Could not load account deletion requests." });
  }
}

export async function reviewAccountDeletionRequestByAdmin(req, res) {
  try {
    if (!ensureAdmin(req, res)) return;

    await ensurePlatformEnhancements();

    const { decision, adminNote } = req.body;
    const cleanNote = String(adminNote || "").trim();

    if (!["approve", "decline"].includes(decision)) {
      return res.status(400).json({ message: "Decision must be approve or decline." });
    }

    if (decision === "decline" && cleanNote.length < 5) {
      return res.status(400).json({ message: "Admin note is required when declining a request." });
    }

    const result = await reviewAccountDeletionRequest({
      requestId: req.params.requestId,
      adminId: req.user.id,
      decision,
      adminNote: cleanNote || null,
    });

    if (decision === "decline" && result.request.user_id) {
      await createNotification({
        userId: result.request.user_id,
        type: "account_deletion_declined",
        title: "Account deletion request declined",
        description: `Admin declined your account deletion request. Note: ${cleanNote}`,
        referenceType: "account_deletion_request",
        referenceId: result.request.id,
      }).catch(() => null);
    }

    if (decision === "approve") {
      if (isEmailConfigured() && result.request.user_email) {
        await sendNotificationEmail(result.request.user_email, {
          recipientName: result.request.user_name,
          title: "Account deletion approved",
          description:
            "Your KazakhBuddy account deletion request was approved. Your account has been deactivated and anonymized, and you can no longer sign in.",
          actionUrl: env.frontendUrl,
        }).catch((emailError) => {
          console.error("Account deletion approval email error:", emailError.message);
        });
      }

      await Promise.all(
        result.affectedUserIds.map((userId) =>
          createNotification({
            userId,
            type: "match_cancelled",
            title: "Match closed",
            description: "A matched account was deleted by admin review, so the active match was closed.",
            referenceType: "account_deletion_request",
            referenceId: result.request.id,
          }).catch(() => null)
        )
      );
    }

    return res.json({
      message:
        decision === "approve"
          ? "Account deletion approved. The account was deactivated and anonymized."
          : "Account deletion request declined.",
      request: result.request,
    });
  } catch (error) {
    if (error.message === "REQUEST_NOT_FOUND") {
      return res.status(404).json({ message: "Deletion request not found." });
    }

    if (error.message === "REQUEST_ALREADY_REVIEWED") {
      return res.status(400).json({ message: "This request was already reviewed." });
    }

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "The requested account no longer exists." });
    }

    console.error("Review account deletion request error:", error.message);
    return res.status(500).json({ message: "Could not review account deletion request." });
  }
}