import AdminController from "./admin.controller.js";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import { Router } from "express";

const adminRouter = Router();

// Apply middleware to all routes in this router
adminRouter.use(authMiddleware.authenticated);
adminRouter.use(authMiddleware.checkRole("admin"));

// Admin dashboard
adminRouter.get("/", (req, res) => {
  res.render("pages/admin/index", {
    title: "Admin Dashboard",
    route: "Admin",
    user: req.user, // pass logged-in user
  });
});

// Fetch all users
adminRouter.get("/users", AdminController.fetchAllUsers);

export default adminRouter;
