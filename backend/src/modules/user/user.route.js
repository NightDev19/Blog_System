import { Router } from "express";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";

const userRouter = Router();

userRouter.use(authMiddleware.authenticated);
userRouter.use(authMiddleware.checkRole("user", "admin"));

userRouter.get("/", (req, res) => {
  try {
    res.render("pages/user/index", {
      // Add .ejs extension
      title: "User Dashboard",
      route: "User",
      user: req.user,
    });
  } catch (err) {
    console.error("User route error:", err);
    res.status(500).send("Internal Server Error");
  }
});

export default userRouter;
