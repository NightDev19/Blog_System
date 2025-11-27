import createUsersTable from "./query/table.js";

const initializeDatabase = async () => {
  try {
    await createUsersTable();
    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Failed to initialize database", err);
  } finally {
    process.exit(0); // exit after setup
  }
};

initializeDatabase();
