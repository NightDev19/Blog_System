import dbPool from "../database/index.js";

describe("Database Connection", () => {
  it("should connect to the database successfully", async () => {
    const client = await dbPool.connect(); // works in pg
    expect(client).toBeDefined();
    client.release();
  });
});
