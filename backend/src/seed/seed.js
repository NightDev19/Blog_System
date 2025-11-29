// src/seed/seed.js
import dbPool from "../database/index.js";
import bcrypt from "bcrypt";

const seedUsers = async () => {
  const client = await dbPool.connect();
  try {
    const users = [
      {
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      },
      {
        username: "john_doe",
        email: "john@example.com",
        password: "password123",
        role: "user",
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        password: "password123",
        role: "user",
      },
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await client.query(
        `INSERT INTO users (username, email, password, role) 
         VALUES ($1, $2, $3, $4) 
         ON CONFLICT (email) DO NOTHING`,
        [user.username, user.email, hashedPassword, user.role]
      );
    }

    console.log("Users seeded successfully (1 admin, 2 users)");
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
