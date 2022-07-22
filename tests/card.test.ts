import supertest from "supertest";
import app from "../src/app.js";

import prisma from "../prisma/migrations/prisma.js";

import { createCard } from "./factories/createCard.js";

const API_KEY = "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUaf67vs0";

beforeAll(async () => {
  await prisma.$connect();
  await prisma.$executeRaw`TRUNCATE TABLE cards RESTART IDENTITY CASCADE`;
});

describe("POST /cards", () => {
  it("should not be able create a card with invalid token", async () => {
    const employeeId = 1;
    const typeCard = "groceries";
    const card = createCard(employeeId, typeCard);

    const response = await supertest(app)
      .post("/cards")
      .send(card)
      .set("x-api-key", `Bearer ${API_KEY}`);

    expect(response.status).toBe(401);
  });

  it("should not be able create a card without token", async () => {
    const employeeId = 1;
    const typeCard = "groceries";
    const card = createCard(employeeId, typeCard);

    const response = await supertest(app).post("/cards").send(card);
    expect(response.status).toBe(400);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
