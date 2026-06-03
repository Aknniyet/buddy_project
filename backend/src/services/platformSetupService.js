import { query } from "../config/db.js";

let setupPromise = null;

export function ensurePlatformEnhancements() {
  if (setupPromise) {
    return setupPromise;
  }

  setupPromise = (async () => {
    await query(
      `ALTER TABLE users
       ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMP`
    );

    await query(
      `ALTER TABLE users
       ADD COLUMN IF NOT EXISTS preferred_meeting_mode VARCHAR(20) NOT NULL DEFAULT 'both'`
    );

    await query(
      `ALTER TABLE users
       ADD COLUMN IF NOT EXISTS max_weekly_hours INTEGER NOT NULL DEFAULT 2`
    );

    await query(
      `ALTER TABLE users
       ADD COLUMN IF NOT EXISTS support_areas TEXT[] DEFAULT ARRAY[]::TEXT[]`
    );

    await query(
      `ALTER TABLE users
       ADD COLUMN IF NOT EXISTS account_status VARCHAR(30) NOT NULL DEFAULT 'active'`
    );

    await query(
      `ALTER TABLE users
       ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP`
    );

    await query(
      `ALTER TABLE users
       DROP CONSTRAINT IF EXISTS users_account_status_check`
    );

    await query(
      `ALTER TABLE users
       ADD CONSTRAINT users_account_status_check
       CHECK (account_status IN ('active', 'deleted'))`
    );

    await query(
      `ALTER TABLE users
       ALTER COLUMN last_active_at DROP DEFAULT`
    );

    await query(
      `CREATE TABLE IF NOT EXISTS platform_runtime_flags (
        flag_key VARCHAR(100) PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW()
      )`
    );

    await query(
      `WITH missing_flag AS (
         INSERT INTO platform_runtime_flags (flag_key)
         SELECT 'last_active_reset_v1'
         WHERE NOT EXISTS (
           SELECT 1
           FROM platform_runtime_flags
           WHERE flag_key = 'last_active_reset_v1'
         )
         RETURNING flag_key
       )
       UPDATE users
       SET last_active_at = NULL
       WHERE EXISTS (SELECT 1 FROM missing_flag)`
    );

    await query(
      `ALTER TABLE adaptation_checklist_tasks
       ADD COLUMN IF NOT EXISTS deadline TIMESTAMP`
    );

    await query(
      `ALTER TABLE adaptation_checklist_tasks
       ADD COLUMN IF NOT EXISTS created_by VARCHAR(20) NOT NULL DEFAULT 'system'`
    );

    await query(
      `ALTER TABLE adaptation_checklist_tasks
       ADD COLUMN IF NOT EXISTS is_custom BOOLEAN NOT NULL DEFAULT FALSE`
    );

    await query(
      `ALTER TABLE adaptation_checklist_tasks
       ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP`
    );

    await query(
      `UPDATE adaptation_checklist_tasks
       SET created_by = COALESCE(created_by, 'system')`
    );

    await query(
      `UPDATE adaptation_checklist_tasks
       SET is_custom = COALESCE(is_custom, FALSE)`
    );

    await query(
      `CREATE TABLE IF NOT EXISTS task_reminder_deliveries (
        id SERIAL PRIMARY KEY,
        task_id INTEGER NOT NULL REFERENCES adaptation_checklist_tasks(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        reminder_type VARCHAR(30) NOT NULL
          CHECK (reminder_type IN ('24_hours', '6_hours', 'overdue')),
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE (task_id, user_id, reminder_type)
      )`
    );

    await query(
      `CREATE TABLE IF NOT EXISTS match_reassignment_requests (
        id SERIAL PRIMARY KEY,
        match_id INTEGER NOT NULL REFERENCES buddy_matches(id) ON DELETE CASCADE,
        international_student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        current_buddy_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        reason TEXT NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'pending'
          CHECK (status IN ('pending', 'resolved', 'declined')),
        reviewed_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        admin_note TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        responded_at TIMESTAMP
      )`
    );

    await query(
      `CREATE UNIQUE INDEX IF NOT EXISTS one_pending_reassignment_per_match
       ON match_reassignment_requests(match_id)
       WHERE status = 'pending'`
    );

    await query(
      `CREATE TABLE IF NOT EXISTS blocked_buddy_pairs (
        id SERIAL PRIMARY KEY,
        international_student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        buddy_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        match_id INTEGER REFERENCES buddy_matches(id) ON DELETE SET NULL,
        reason VARCHAR(30) NOT NULL
          CHECK (reason IN ('cancelled', 'reassigned')),
        note TEXT,
        created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE (international_student_id, buddy_id)
      )`
    );

    await query(
      `CREATE INDEX IF NOT EXISTS idx_blocked_buddy_pairs_student
       ON blocked_buddy_pairs(international_student_id)`
    );

    await query(
      `INSERT INTO blocked_buddy_pairs (
         international_student_id,
         buddy_id,
         match_id,
         reason,
         note
       )
       SELECT bm.international_student_id,
              bm.buddy_id,
              bm.id,
              'cancelled',
              'Backfilled from cancelled match history.'
       FROM buddy_matches bm
       WHERE bm.status = 'cancelled'
       ON CONFLICT (international_student_id, buddy_id) DO NOTHING`
    );

    await query(
      `CREATE INDEX IF NOT EXISTS idx_checklist_deadline
       ON adaptation_checklist_tasks(user_id, deadline)`
    );

    await query(
      `CREATE INDEX IF NOT EXISTS idx_users_last_active_at
       ON users(last_active_at DESC)`
    );

    await query(
      `ALTER TABLE community_posts
       ADD COLUMN IF NOT EXISTS image_url TEXT`
    );

    await query(
      `ALTER TABLE community_posts
       ADD COLUMN IF NOT EXISTS status VARCHAR(30)`
    );

    await query(
      `UPDATE community_posts
       SET status = 'active'
       WHERE status IS NULL`
    );

    await query(
      `ALTER TABLE community_posts
       ALTER COLUMN status SET DEFAULT 'active'`
    );

    await query(
      `ALTER TABLE community_comments
       ADD COLUMN IF NOT EXISTS image_url TEXT`
    );

    await query(
      `CREATE INDEX IF NOT EXISTS idx_community_posts_status
       ON community_posts(status, created_at DESC)`
    );

    await query(
      `CREATE TABLE IF NOT EXISTS account_deletion_requests (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        user_name VARCHAR(150) NOT NULL,
        user_email VARCHAR(150) NOT NULL,
        user_role VARCHAR(30) NOT NULL CHECK (user_role IN ('international', 'local')),
        reason TEXT NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'pending'
          CHECK (status IN ('pending', 'approved', 'declined')),
        reviewed_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        admin_note TEXT,
        requested_at TIMESTAMP DEFAULT NOW(),
        reviewed_at TIMESTAMP
      )`
    );

    await query(
      `CREATE UNIQUE INDEX IF NOT EXISTS one_pending_account_deletion_request_per_user
       ON account_deletion_requests(user_id)
       WHERE status = 'pending'`
    );

    await query(
      `CREATE INDEX IF NOT EXISTS idx_account_deletion_requests_status
       ON account_deletion_requests(status, requested_at DESC)`
    );

    await query(
      `ALTER TABLE messages
       ADD COLUMN IF NOT EXISTS deleted_for_everyone_at TIMESTAMP`
    );

    await query(
      `ALTER TABLE messages
       ADD COLUMN IF NOT EXISTS deleted_for_everyone_by INTEGER REFERENCES users(id) ON DELETE SET NULL`
    );
  })();

  return setupPromise;
}