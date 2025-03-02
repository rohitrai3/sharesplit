import test, { expect } from "@playwright/test";

test.beforeEach("go to home page", async ({ page }) => {
  await page.goto(process.env.TEST_HOME_PAGE_URL!);
});

test("has loading while fetching user", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Loading user..." })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: process.env.TEST_USERNAME })
  ).toHaveCount(0);
});

test("has username after loading is finished", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Loading user..." })
  ).toBeHidden();
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
  await expect(
    page.getByRole("heading", { name: "Loading groups..." })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: process.env.TEST_GROUP_UI })
  ).toHaveCount(0);
});

test("has groups after loading is finished", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Loading groups..." })
  ).toBeHidden({
    timeout: 10_000,
  });
  await expect(
    page.getByRole("heading", { name: process.env.TEST_GROUP_UI })
  ).toBeVisible();
});
