import dbPool from "../index.js";

const createTable = async () => {
  const client = await dbPool.connect();
  try {
    // Create user_role ENUM type if not exists
    try {
      await client.query(`CREATE TYPE user_role AS ENUM ('user', 'admin');`);
    } catch (err) {
      if (err.code !== "42710") throw err; // Ignore "already exists" error
    }

    // Create users table if not exists
    const createUsersTableQuery = `
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
    await client.query(createUsersTableQuery);
    console.log("Users table created successfully");

    // Create post_status ENUM type if not exists
    try {
      await client.query(
        `CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');`,
      );
    } catch (err) {
      if (err.code !== "42710") throw err; // Ignore "already exists" error
    }

    // Create posts table if not exists
    const createPostsTableQuery = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      status post_status DEFAULT 'draft',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `;
    await client.query(createPostsTableQuery);

    // Create indexes for better query performance
    const createIndexQuery = `
    CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
    CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
    `;
    await client.query(createIndexQuery);

    console.log("Posts table created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    client.release();
  }
};

export default createTable;
