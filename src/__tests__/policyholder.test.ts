import request from "supertest";
import sequelize from "../configs/db";
import { Policyholder } from "../models/policyholderModel";
import app from "../app";

beforeAll(async () => {
  await sequelize.sync();
  await Policyholder.destroy({ where: {} });

  // create a dummy policyholder
  await request(app).post("/api/policyholder").send({
    name: "john",
    id_number: "A123456798",
  });

  await request(app).post("/api/policyholder").send({
    name: "aaa",
    id_number: "A123456790",
    introducer_code: "1",
  });

  await request(app).post("/api/policyholder").send({
    name: "bbb",
    id_number: "A123456791",
    introducer_code: "1",
  });

  await request(app).post("/api/policyholder").send({
    name: "ccc",
    id_number: "A123456792",
    introducer_code: "2",
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Policyholder API", () => {
  it("should create a new policyholder", async () => {
    const res = await request(app).post("/api/policyholder").send({
      name: "wendy",
      id_number: "A123456789",
      introducer_code: "1",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("code");
  });

  it("should not create a new policyholder if id_number already exists", async () => {
    const res = await request(app).post("/api/policyholder").send({
      name: "wendy",
      id_number: "A123456798",
    });
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message");
  });

  it("get all policyholders", async () => {
    const res = await request(app).get("/api/policyholders");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(5);
  });

  it("get a policyholder by id", async () => {
    const res = await request(app).get(`/api/policyholders/1`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");
  });

  it("get a policyholder by id with invalid id", async () => {
    const res = await request(app).get(`/api/policyholders/100`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message");
  });

  it("get top parent", async () => {
    const res = await request(app).get(`/api/policyholders/2/top`);
  });

  it("get top parent with invalid id", async () => {
    const res = await request(app).get(`/api/policyholders/100/top`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message");
  });
});
