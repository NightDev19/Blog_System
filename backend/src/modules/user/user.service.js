import dbPool from "../../database/index.js";
import bcrypt from "bcrypt";
import UserDTO from "./user.dto.js";

class UserService {
  async getProfileInformation(id) {
    const con = await dbPool.connect();

    try {
      const result = await con.query(
        "SELECT * FROM users WHERE id = $1 LIMIT 1",
        [id],
      );

      if (result.rowCount === 0) {
        throw new Error("User not found");
      }
      // console.log("User data:", result.rows[0]);

      return UserDTO.toProfile(result.rows[0]);
    } finally {
      con.release();
    }
  }

  async updateProfileInformation(id, data) {
    const con = await dbPool.connect();
    try {
      const sanitized = UserDTO.sanitizeUpdate(data);
      const { username, email, password } = sanitized;

      const userExist = await con.query(
        "SELECT 1 FROM users WHERE id = $1 LIMIT 1",
        [id],
      );
      if (userExist.rowCount === 0) throw new Error("User not found");

      const fields = { username, email };
      if (password) fields.password = await bcrypt.hash(password, 10);

      const keys = Object.keys(fields);
      const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
      const values = [...Object.values(fields), id];

      const updateQuery = `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`;

      const result = await con.query(updateQuery, values);
      return UserDTO.toProfile(result.rows[0]);
    } finally {
      con.release();
    }
  }
}

export default new UserService();
