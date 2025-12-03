import { Router } from "express";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import userController from "./user.controller.js";
const userRouter = Router();

userRouter.use(authMiddleware.authenticated);
userRouter.use(authMiddleware.checkRole("user", "admin"));

userRouter.get("/", (req, res) => {
  res.render("pages/user/index", {
    // Add .ejs extension
    title: "User Dashboard",
    route: "User",
    user: req.user,
  });
});

userRouter.get("/profile/:id", userController.getProfileInformation);

export default userRouter;
