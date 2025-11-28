// src/seed/seed.js
import dbPool from "../database/index.js";
import bcrypt from "bcrypt";

const seedUsers = async () => {
  const client = await dbPool.connect();
  try {
    const users = [
      {
        username: "john_doe",
        email: "john@example.com",
        password: "password123",
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        password: "password123",
      },
      {
        username: "bob_wilson",
        email: "bob@example.com",
        password: "password123",
      },
      {
        username: "alice_brown",
        email: "alice@example.com",
        password: "password123",
      },
      {
        username: "charlie_davis",
        email: "charlie@example.com",
        password: "password123",
      },
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await client.query(
        `INSERT INTO users (username, email, password) 
         VALUES ($1, $2, $3) 
         ON CONFLICT (email) DO NOTHING`,
        [user.username, user.email, hashedPassword]
      );
    }

    console.log("5 users seeded successfully");
  } catch (err) {
    console.error("Error seeding users:", err);
    throw err;
  } finally {
    client.release();
    await dbPool.end();
    process.exit(0);
  }
};

seedUsers();
