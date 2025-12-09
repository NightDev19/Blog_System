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

    const userIds = [];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const result = await client.query(
        `INSERT INTO users (username, email, password, role)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO UPDATE SET username = EXCLUDED.username
         RETURNING id`,
        [user.username, user.email, hashedPassword, user.role],
      );
      userIds.push(result.rows[0].id);
    }
    console.log("Users seeded successfully (1 admin, 2 users)");

    // Seed posts for each user
    const posts = [
      // Admin posts
      {
        user_id: userIds[0],
        title: "Welcome to Our Blog Platform",
        content:
          "This is the official blog platform. We're excited to have you here! Feel free to explore and share your thoughts.",
        status: "published",
      },
      {
        user_id: userIds[0],
        title: "Platform Updates and Guidelines",
        content:
          "Please follow our community guidelines. Be respectful, share quality content, and engage positively with other users.",
        status: "published",
      },
      // John's posts
      {
        user_id: userIds[1],
        title: "My Journey into Web Development",
        content:
          "I started learning web development six months ago. It's been an amazing journey filled with challenges and victories. Here's what I've learned so far...",
        status: "published",
      },
      {
        user_id: userIds[1],
        title: "Top 5 JavaScript Tips for Beginners",
        content:
          "After months of coding, I've discovered some useful JavaScript tips that helped me improve. Let me share them with you: 1. Use const and let instead of var...",
        status: "draft",
      },
      // Jane's posts
      {
        user_id: userIds[2],
        title: "The Art of Writing Clean Code",
        content:
          "Clean code is not just about making your code work. It's about making it readable, maintainable, and elegant. Here are my principles for writing clean code...",
        status: "published",
      },
      {
        user_id: userIds[2],
        title: "Understanding Async/Await in JavaScript",
        content:
          "Asynchronous programming can be tricky. Let me break down async/await in a simple way that everyone can understand. It's easier than you think!",
        status: "published",
      },
    ];

    for (const post of posts) {
      await client.query(
        `INSERT INTO posts (user_id, title, content, status)
         VALUES ($1, $2, $3, $4)`,
        [post.user_id, post.title, post.content, post.status],
      );
    }
    console.log("Posts seeded successfully (2 posts per user)");
  } catch (err) {
    console.error("Error seeding data:", err);
    throw err;
  } finally {
    client.release();
    await dbPool.end();
    process.exit(0);
  }
};

seedUsers();
