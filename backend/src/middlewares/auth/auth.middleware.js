import dbPool from "../../database/index.js";
import jwt from "jsonwebtoken";

class AuthMiddleware {
  async authenticated(req, res, next) {
    let con;
    try {
      const authHeader = req.headers.authorization || req.cookies.token;
      if (!authHeader) {
        // If missing token, redirect to login page
        return res.redirect("/auth/login");
      }

      // Handle Bearer token or cookie token
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.id) {
        return res.redirect("/auth/login");
      }

      con = await dbPool.connect();
      const result = await con.query(
        "SELECT * FROM users WHERE id = $1 LIMIT 1",
        [decoded.id]
      );

      if (result.rowCount === 0) {
        return res.redirect("/auth/login");
      }

      req.user = result.rows[0];
      next();
    } catch (err) {
      console.error("Authentication failed:", err);
      return res.redirect("/auth/login");
    } finally {
      if (con) con.release();
    }
  }

  checkRole(...allowedRoles) {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        // Redirect unauthorized users to a "forbidden" page or login
        return res.status(403).render("pages/auth/forbidden", {
          title: "Access Denied",
          route: "Auth",
          user: req.user,
        });
      }
      next();
    };
  }
}

export default new AuthMiddleware();
