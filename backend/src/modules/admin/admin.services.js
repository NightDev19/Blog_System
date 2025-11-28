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

class AdminServices {
  static async getAllUsers() {
    return await Users();
  }
}

export default AdminServices;
