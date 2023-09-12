import { getDb } from "./db.js";
import "./tables.js";

export async function hang(iterations) {
  console.log("Starting")
  console.time("execution")
  const db = await getDb();
  const [{ insertId: userId }] = await db.execute(
    "insert into users (creator_id, first_name, img, last_name) values (NULL, 'Test', 'Test', 'Test')"
  );
  const [{ insertId: organizationId }] = await db.execute(
    "insert into organizations (creator_id, name) values (?, 'Test')",
    [userId]
  );
  await db.execute(
    "insert into organizations_users (inviter_id, organization_id, role, user_id) values (NULL, ?, 'ADMIN', ?)",
    [organizationId, userId]
  );
  await db.execute(
    "insert into permissions (organization_id, presets, priority, role) values (?, DEFAULT, 300, 'ADMIN')",
    [organizationId]
  );

  for (let i = 0; i < iterations; i++) {
    await db.execute(
      `SELECT permissions.* from organizations_users
INNER JOIN permissions on permissions.organization_id = organizations_users.organization_id AND permissions.role = organizations_users.role
WHERE (organizations_users.organization_id,organizations_users.user_id) in ((?, ?))
UNION SELECT permissions.* from organizations_users
LEFT JOIN permissions on permissions.id is null
WHERE (organizations_users.organization_id,organizations_users.user_id) in ((?, ?))
       `,
      [organizationId, userId, organizationId, userId]
    );
  }
  console.timeEnd("execution")

  db.destroy();
  console.log("Tearing Down")
  console.time("done")
  process.on("exit", () => {
    console.timeEnd("done")
  })
}
