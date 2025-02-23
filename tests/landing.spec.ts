import test, { expect } from "@playwright/test";

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach("go to landing page", async ({ page }) => {
  await page.goto(process.env.TEST_LANDING_PAGE_URL!);
});

test("has logo icon", async ({ page }) => {
  await expect(page.getByAltText("ShareSplit logo")).toBeVisible();
});

test("has welcome message", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Welcome to" })).toBeVisible();
});

test("has logo text", async ({ page }) => {
  await expect(page.getByAltText("ShareSplit text")).toBeVisible();
});

test("has tag line", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Split your shares with your friends" })
  ).toBeVisible();
});

test("hast login button", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
