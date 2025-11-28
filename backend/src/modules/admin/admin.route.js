import AdminController from "./admin.controller.js";
import { Router } from "express";

const adminRouter = Router();
adminRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Admin route is working" });
});
adminRouter.get("/users", AdminController.fetchAllUsers);

export default adminRouter;
