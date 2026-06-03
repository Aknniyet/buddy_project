import { pool, query } from "../config/db.js";

function buildDeletedEmail(userId) {
  return `deleted-user-${userId}-${Date.now()}@deleted.local`;
}

export function findPendingAccountDeletionRequest(userId) {
  return query(
    `SELECT id, status, reason, requested_at
     FROM account_deletion_requests
     WHERE user_id = $1 AND status = 'pending'
     LIMIT 1`,
    [userId]
  );
}

export async function createAccountDeletionRequest({ userId, reason }) {
  return query(
    `INSERT INTO account_deletion_requests (
       user_id,
       user_name,
       user_email,
       user_role,
       reason,
       status
     )
     SELECT id, full_name, email, role, $2, 'pending'
     FROM users
     WHERE id = $1
       AND role IN ('international', 'local')
       AND account_status = 'active'
       AND NOT EXISTS (
         SELECT 1
         FROM account_deletion_requests adr
         WHERE adr.user_id = users.id AND adr.status = 'pending'
       )
     RETURNING id, user_id, user_name, user_email, user_role, reason, status, requested_at`,
    [userId, reason]
  );
}

export function getAccountDeletionRequestsForAdmin() {
  return query(
    `SELECT adr.id, adr.user_id, adr.user_name, adr.user_email, adr.user_role,
            adr.reason, adr.status, adr.admin_note, adr.requested_at, adr.reviewed_at,
            reviewer.full_name AS reviewed_by_name,
            COALESCE(active_matches.count, 0)::int AS active_matches_count,
            COALESCE(pending_requests.count, 0)::int AS pending_requests_count
     FROM account_deletion_requests adr
     LEFT JOIN users reviewer ON reviewer.id = adr.reviewed_by
     LEFT JOIN LATERAL (
       SELECT COUNT(*) AS count
       FROM buddy_matches bm
       WHERE bm.status = 'active'
         AND (
           bm.international_student_id = adr.user_id
           OR bm.buddy_id = adr.user_id
         )
     ) active_matches ON TRUE
     LEFT JOIN LATERAL (
       SELECT COUNT(*) AS count
       FROM buddy_requests br
       WHERE br.status = 'pending'
         AND (
           br.international_student_id = adr.user_id
           OR br.buddy_id = adr.user_id
         )
     ) pending_requests ON TRUE
     ORDER BY CASE WHEN adr.status = 'pending' THEN 0 ELSE 1 END,
              adr.requested_at DESC`
  );
}

export async function reviewAccountDeletionRequest({ requestId, adminId, decision, adminNote }) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const requestResult = await client.query(
      `SELECT *
       FROM account_deletion_requests
       WHERE id = $1`,
      [requestId]
    );

    if (requestResult.rows.length === 0) {
      throw new Error("REQUEST_NOT_FOUND");
    }

    const deletionRequest = requestResult.rows[0];

    if (deletionRequest.status !== "pending") {
      throw new Error("REQUEST_ALREADY_REVIEWED");
    }

    if (decision === "decline") {
      const declined = await client.query(
        `UPDATE account_deletion_requests
         SET status = 'declined',
             reviewed_by = $2,
             admin_note = $3,
             reviewed_at = NOW()
         WHERE id = $1 AND status = 'pending'
         RETURNING id, user_id, user_name, user_email, user_role, reason, status,
                   admin_note, requested_at, reviewed_at`,
        [requestId, adminId, adminNote]
      );

      if (declined.rows.length === 0) {
        throw new Error("REQUEST_ALREADY_REVIEWED");
      }

      await client.query("COMMIT");
      return {
        request: declined.rows[0],
        affectedUserIds: [],
      };
    }

    if (decision !== "approve") {
      throw new Error("INVALID_DECISION");
    }

    const userResult = await client.query(
      `SELECT id, role
       FROM users
       WHERE id = $1 AND account_status = 'active'`,
      [deletionRequest.user_id]
    );

    if (userResult.rows.length === 0) {
      throw new Error("USER_NOT_FOUND");
    }

    const affectedUsersResult = await client.query(
      `SELECT DISTINCT CASE
         WHEN bm.international_student_id = $1 THEN bm.buddy_id
         ELSE bm.international_student_id
       END AS user_id
       FROM buddy_matches bm
       WHERE bm.status = 'active'
         AND (
           bm.international_student_id = $1
           OR bm.buddy_id = $1
         )`,
      [deletionRequest.user_id]
    );

    await client.query(
      `UPDATE buddy_matches
       SET status = 'cancelled'
       WHERE status = 'active'
         AND (
           international_student_id = $1
           OR buddy_id = $1
         )`,
      [deletionRequest.user_id]
    );

    await client.query(
      `UPDATE buddy_requests
       SET status = 'cancelled',
           responded_at = NOW()
       WHERE status = 'pending'
         AND (
           international_student_id = $1
           OR buddy_id = $1
         )`,
      [deletionRequest.user_id]
    );

    await client.query(
      `UPDATE match_reassignment_requests
       SET status = 'declined',
           reviewed_by = $2,
           admin_note = 'Account deletion approved; reassignment request closed.',
           responded_at = NOW()
       WHERE status = 'pending'
         AND (
           international_student_id = $1
           OR current_buddy_id = $1
         )`,
      [deletionRequest.user_id, adminId]
    );

    const deletedEmail = buildDeletedEmail(deletionRequest.user_id);

    await client.query(
      `UPDATE users
       SET full_name = $2,
           email = $3,
           password_hash = '',
           home_country = NULL,
           city = NULL,
           study_program = NULL,
           languages = ARRAY[]::text[],
           hobbies = ARRAY[]::text[],
           about_you = NULL,
           gender = NULL,
           gender_preference = NULL,
           buddy_status = CASE WHEN role = 'local' THEN 'not_applied' ELSE buddy_status END,
           profile_photo_url = NULL,
           support_areas = ARRAY[]::text[],
           account_status = 'deleted',
           deleted_at = NOW(),
           updated_at = NOW()
       WHERE id = $1`,
      [deletionRequest.user_id, `Deleted user ${deletionRequest.user_id}`, deletedEmail]
    );

    const approved = await client.query(
      `UPDATE account_deletion_requests
       SET status = 'approved',
           reviewed_by = $2,
           admin_note = $3,
           reviewed_at = NOW()
       WHERE id = $1 AND status = 'pending'
       RETURNING id, user_id, user_name, user_email, user_role, reason, status,
                 admin_note, requested_at, reviewed_at`,
      [requestId, adminId, adminNote]
    );

    if (approved.rows.length === 0) {
      throw new Error("REQUEST_ALREADY_REVIEWED");
    }

    await client.query("COMMIT");
    return {
      request: approved.rows[0],
      affectedUserIds: affectedUsersResult.rows.map((item) => item.user_id).filter(Boolean),
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}