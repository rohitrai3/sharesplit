import test, { expect } from "@playwright/test";

test("has logo icon", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByAltText("ShareSplit logo")).toBeVisible();
});

test("has welcome message", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByRole("heading", { name: "Welcome to"})).toBeVisible();
})

test("has logo text", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByAltText("ShareSplit text")).toBeVisible();
})
