import authController from "./auth.controller.js";

import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", authController.login);

authRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Auth route is working" });
});

export default authRouter;
