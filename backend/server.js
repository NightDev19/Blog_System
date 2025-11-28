import app from "./src/index.js";
import initializeDatabase from "./src/database/queries.js";

const port = process.env.PORT || 3000;

initializeDatabase()
  .then(() => {
    console.log("Database initialized successfully");
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });
