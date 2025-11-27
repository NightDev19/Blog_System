// database/index.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
});

dbPool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default dbPool;
