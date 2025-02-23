import test, { expect } from "@playwright/test";

test.beforeEach("go to home page", async ({ page }) => {
  await page.goto("http://localhost:3000/home");
});

test("has username", async ({ page }) => {
  await expect(page.getByRole("link", { name: process.env.TEST_USERNAME })).toBeVisible();
});

test("has create group button", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Create group" })).toBeVisible();
});

test("has logout button", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});
