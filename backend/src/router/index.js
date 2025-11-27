import authRouter from "../middlewares/auth/auth.route.js";

import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);

export default router;
