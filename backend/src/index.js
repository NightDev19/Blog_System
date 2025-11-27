import express from "express";
import dotenv from "dotenv";
import router from "./router/index.js";
import setupCors from "./configs/configs.js";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(morgan("dev"));
setupCors(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", router);

export default app;
