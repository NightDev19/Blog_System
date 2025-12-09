import dbPool from "../../database/index.js";

const Users = async () => {
  const client = await dbPool.connect();
  try {
    const res = await client.query("SELECT * FROM users;");
    return res.rows; // Add return here
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  } finally {
    client.release();
  }
};

// admin.services.js - Fix Posts function
const Posts = async (userId) => {
  // Add userId parameter
  const client = await dbPool.connect();
  try {
    const res = await client.query(
      `
      SELECT posts.*, users.username
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE users.role = 'admin' AND users.id = $1
    `,
      [userId],
    );
    return res.rows;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  } finally {
    client.release();
  }
};

class AdminServices {
  static async getAllUsers() {
    return await Users();
  }
  static async getAdminPost(userId) {
    // Add userId parameter
    return await Posts(userId);
  }
}

export default AdminServices;
