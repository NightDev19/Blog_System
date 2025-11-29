import authController from "./auth.controller.js";

import { Router } from "express";

const authRouter = Router();

authRouter.get("/login", authController.showLogin);
authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);

authRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Auth route is working" });
});

export default authRouter;
