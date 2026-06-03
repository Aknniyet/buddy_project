import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getAdminDashboard } from "../controllers/adminController.js";
import {
  addAdminMatchNote,
  approveRequestByAdmin,
  changeBuddyStatusByAdmin,
  changeMatchStatusByAdmin,
  createManualMatchByAdmin,
  declineReassignmentRequestByAdmin,
  getAdminMatchesOverview,
  getMatchNotesByAdmin,
  reassignMatchByAdmin,
} from "../controllers/adminMatchController.js";
import {
  getAccountDeletionRequestsByAdmin,
  reviewAccountDeletionRequestByAdmin,
} from "../controllers/accountDeletionController.js";

const router = express.Router();

router.get("/dashboard", authenticate, getAdminDashboard);
router.get("/account-deletion-requests", authenticate, getAccountDeletionRequestsByAdmin);
router.patch("/account-deletion-requests/:requestId/review", authenticate, reviewAccountDeletionRequestByAdmin);
router.get("/matches", authenticate, getAdminMatchesOverview);
router.post("/requests/:requestId/approve", authenticate, approveRequestByAdmin);
router.post("/matches/manual", authenticate, createManualMatchByAdmin);
router.patch("/buddies/:buddyId/status", authenticate, changeBuddyStatusByAdmin);
router.patch("/matches/:matchId/status", authenticate, changeMatchStatusByAdmin);
router.patch("/matches/:matchId/reassign", authenticate, reassignMatchByAdmin);
router.patch("/reassignment-requests/:requestId/decline", authenticate, declineReassignmentRequestByAdmin);
router.post("/matches/notes", authenticate, addAdminMatchNote);
router.get("/matches/:matchId/notes", authenticate, getMatchNotesByAdmin);

export default router;