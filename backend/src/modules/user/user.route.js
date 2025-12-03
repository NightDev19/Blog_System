import { Router } from "express";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import userController from "./user.controller.js";

const userRouter = Router();

userRouter.use(authMiddleware.authenticated);
userRouter.use(authMiddleware.checkRole("user"));

userRouter.route("/").get((req, res) => {
  res.render("pages/user/index", {
    title: "User Dashboard",
    route: "User",
    user: req.user,
  });
});

userRouter
  .route("/profile")
  .get(userController.getProfileInformation)
  .post(userController.updateProfileInformation);

export default userRouter;
