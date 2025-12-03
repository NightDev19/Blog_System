import dbPool from "../../database/index.js";

class UserService {
  async getProfileInformation(id) {
    const con = await dbPool.connect(); // await the connection

    try {
      const result = await con.query(
        "SELECT * FROM users WHERE id = $1 LIMIT 1",
        [id]
      );

      if (result.rowCount === 0) {
        throw new Error("User not found");
      }

      return result;
    } finally {
      con.release(); // ensure proper release
    }
  }
  async updateProfileInformation(id, data) {
    const con = await dbPool.connect();

    try {
      const { email, username } = data;

      const result = await con.query(
        "UPDATE users SET email = $1, username = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
        [email, username, id]
      );

      if (result.rowCount === 0) {
        throw new Error("User not found or update failed");
      }

      return result;
    } finally {
      con.release();
    }
  }
}

export default new UserService();
