import dbPool from "../index.js";

const createTable = async () => {
  const client = await dbPool.connect();
  try {
    // Create ENUM type if not exists
    const createTypeQuery = `
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('user', 'admin');
      END IF;
    END $$;
    `;
    await client.query(createTypeQuery);

    // Create table if not exists, include updated_at
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      role user_role DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      
    );
    `;

    await client.query(createTableQuery);

    console.log("Users table created successfully");
  } catch (err) {
    console.error("Error creating users table", err);
  } finally {
    client.release();
  }
};

export default createTable;
