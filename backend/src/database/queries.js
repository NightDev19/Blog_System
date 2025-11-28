import createUsersTable from "./query/table.js";

const initializeDatabase = async () => {
  try {
    await createUsersTable();
  } catch (err) {
    console.error("Failed to initialize database", err);
    throw err; // Propagate error to server.js
  }
  // Removed finally block with process.exit(0)
};

export default initializeDatabase;
