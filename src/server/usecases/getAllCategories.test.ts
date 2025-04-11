import { beforeAll, expect, test, afterAll } from "vitest";
import { prisma } from "@/lib";
import { getAllCategories } from "./getAllCategories";
import { seedCategories } from "@/server/seeder/categories";
import { deleteTestData } from "@/server/seeder/deleteTestData";

beforeAll(async () => {
  // categoriesを作成する
  await seedCategories(prisma);
});

afterAll(async () => {
  deleteTestData(prisma);
});

test("get all categories.", async () => {
  const result = await getAllCategories(prisma);

  expect(result).toHaveProperty("IT");
});
