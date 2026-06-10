import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-decision-ownership-reset-brief app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Decision Ownership Reset Brief");
  });

  it("serves the ownership lane route", async () => {
    const response = await request(app).get("/ownership-lane");
    expect(response.status).toBe(200);
  });

  it("serves the reset ledger route", async () => {
    const response = await request(app).get("/reset-ledger");
    expect(response.status).toBe(200);
  });

  it("serves the intervention posture route", async () => {
    const response = await request(app).get("/intervention-posture");
    expect(response.status).toBe(200);
  });

  it("serves verification and docs routes", async () => {
    await request(app).get("/verification").expect(200);
    await request(app).get("/docs").expect(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.items).toBeGreaterThan(0);
  });

  it("serves all JSON APIs", async () => {
    const routes = [
      "/api/dashboard/summary",
      "/api/ownership-lane",
      "/api/reset-ledger",
      "/api/intervention-posture",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];

    for (const route of routes) {
      const response = await request(app).get(route);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
    }
  });
});
