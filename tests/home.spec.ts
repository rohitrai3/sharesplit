import test, { expect } from "@playwright/test";

test.beforeEach("go to home page", async ({ page }) => {
  await page.goto("http://localhost:3000/home");
});

test("has username", async ({ page }) => {
  await expect(
    page.getByRole("link", { name: process.env.TEST_USERNAME })
  ).toBeVisible();
});

test("has create group button", async ({ page }) => {
  await expect(
    page.getByRole("button", { name: "Create group" })
  ).toBeVisible();
});

test("has logout button", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

test("has loading while fetching groups", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Loading..." })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: process.env.TEST_GROUP_UI })
  ).toHaveCount(0);
});

test("has groups after loading is finished", async ({ page }) => {
  await page.getByRole("heading", { name: "Loading..." }).isHidden();
  await expect(page.getByRole("heading", { name: "Loading..." })).toBeHidden();
  await expect(
    page.getByRole("heading", { name: process.env.TEST_GROUP_UI })
  ).toBeVisible();
});
