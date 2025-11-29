import express from "express";
import dotenv from "dotenv";
import router from "./router/index.js";
import setupCors from "./configs/configs.js";
import morgan from "morgan";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Resolve absolute directory (ESM-compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(morgan("dev"));
setupCors(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// EJS + Layouts setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressEjsLayouts);
app.set("layout", "layouts/main");

// Test route
app.get("/", (req, res) => {
  res.render("pages/admin/index", { title: "Home" });
});

// API Route
app.use("/api", router);

export default app;
