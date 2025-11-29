// auth.service.js
import dbPool from "../../database/index.js";
import bcrypt from "bcrypt"; // Add this dependency: npm install bcrypt

class authService {
  async login(data) {
    const con = await dbPool.connect();
    const { username, password } = data;

    try {
      if (!username || !password) {
        throw new Error("Missing credentials");
      }

      const userExist = await con.query(
        "SELECT * FROM users WHERE username = $1 LIMIT 1",
        [username]
      );

      if (userExist.rowCount === 0) {
        throw new Error("Invalid credentials");
      }

      const user = userExist.rows[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      return user;
    } catch (err) {
      throw err;
    } finally {
      con.release();
    }
  }
  logout(req, res) {
    // Clear the JWT cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
    });
    // Redirect to login page
    return res.redirect("api/auth/login");
  }
}
export default new authService();
