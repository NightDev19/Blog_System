import authService from "./auth.service.js";
import jwt from "jsonwebtoken";

class AuthController {
  async login(req, res) {
    try {
      const user = await authService.login(req.body);

      // Generate JWT token including role
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // Optionally, store JWT in cookie for easier UI auth
      res.cookie("token", token, { httpOnly: true });

      // Redirect based on role
      if (user.role === "admin") {
        return res.redirect("/api/admin");
      } else {
        res.render("pages/user/index", {
          user,
          title: user.username,
          route: "User",
        });
      }
    } catch (error) {
      // On error, re-render login page with message
      return res.status(400).render("pages/auth/login", {
        title: "Login",
        route: "Auth",
        error: error.message,
      });
    }
  }

  showLogin(req, res) {
    try {
      const token = req.cookies.token; // read JWT from cookie
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded && decoded.role) {
          // Redirect based on role
          if (decoded.role === "admin") {
            return res.redirect("/api/admin"); // UI admin route
          } else {
            return res.render("pages/user/index", {
              user,
              title: user.username,
              route: "User",
            });
          }
        }
      }
    } catch (err) {
      // If token is invalid, ignore and show login page
    }

    // If no token, render login
    res.render("pages/auth/login", {
      title: "Login",
      route: "Auth",
      error: null,
    });
  }

  async logout(req, res) {
    // Clear the JWT cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
    });

    // Redirect to login page
    return res.redirect("/api/auth/login");
  }
}

export default new AuthController();
