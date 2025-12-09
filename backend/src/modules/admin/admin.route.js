import AdminController from "./admin.controller.js";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import { Router } from "express";

const adminRouter = Router();

// Apply middleware to all routes in this router
adminRouter.use(authMiddleware.authenticated);
adminRouter.use(authMiddleware.checkRole("admin"));

// admin.routes.js - Fix the route handler
adminRouter.get("/", async (req, res) => {
  try {
    const posts = await AdminController.fetchAdminPosts(req.user.id); // Pass user ID
    res.render("pages/admin/index", {
      title: "Admin Dashboard",
      route: "Admin",
      user: req.user,
      posts: posts,
    });
  } catch (err) {
    console.error("Error loading admin dashboard:", err); // Add error logging
    res.status(500).send("Error loading admin dashboard");
  }
});

// Fetch all users
adminRouter.get("/users", AdminController.fetchAllUsers);

export default adminRouter;
