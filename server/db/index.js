const fs = require("fs");
const path = require("path");

const { Client } = require("pg");

let pool;

try {
  pool = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });

  pool.connect();

  const executeQuery = fs
    .readFileSync(path.resolve(__dirname, "./execute-db.sql"))
    .toString();

  pool.query(executeQuery);
} catch (e) {
  console.log("Error connect  or execute db", e);
  process.exit();
}

module.exports = pool;
