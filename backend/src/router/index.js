import authRouter from "../middlewares/auth/auth.route.js";
import adminRouter from "../modules/admin/admin.route.js";
import userRouter from "../modules/user/user.route.js";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/user", userRouter);

export default router;
