import request from "supertest";
import app from "../index.js";

describe("GET /", () => {
  it("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(404);
  });
});
