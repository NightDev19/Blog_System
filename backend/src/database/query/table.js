import dbPool from "../index.js";

const createTable = async () => {
  const client = await dbPool.connect();
  try {
    const queryText = `
  DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role user_role DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
    await client.query(queryText);
    console.log("Users table created successfully");
  } catch (err) {
    console.error("Error creating users table", err);
  } finally {
    client.release();
  }
};

export default createTable;
