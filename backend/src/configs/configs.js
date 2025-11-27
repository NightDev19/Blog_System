// configs/cors.js
import cors from "cors";

export default function setupCors(app) {
  if (process.env.NODE_ENV === "development") {
    const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
    app.use(
      cors({
        origin: function (origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
      })
    );
  }
}
