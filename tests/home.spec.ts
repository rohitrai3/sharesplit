import test, { expect } from "@playwright/test";

test.beforeEach("go to home page", async ({ page }) => {
  await page.goto("http://localhost:3000/home");
})

test("has username", async ({ page }) => {
  expect(page.getByRole("link", { name: process.env.TEST_USERNAME}));
})
