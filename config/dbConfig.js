const dotenv = require("dotenv");
dotenv.config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 5,
});

function getConnection() {
  return pool.getConnection();
}

module.exports = { getConnection };
