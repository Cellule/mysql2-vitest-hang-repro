import mysql from "mysql2/promise";

const database = "mysql2_repro";
const rootDb = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "base_root_password",
  port: 3308,
  charset: "UTF8MB4",
});

const [databases] = await rootDb.execute(`SHOW DATABASES`);
if (!databases.some((d) => d.Database === database)) {
  await rootDb.execute(`CREATE DATABASE ${database}`);
}
rootDb.destroy();

export async function getDb() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "base_root_password",
    database,
    port: 3308,
    charset: "UTF8MB4",
    typeCast: (v, n) => n(),
    timezone: "Z",
  });
}
