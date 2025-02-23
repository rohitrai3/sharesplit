import test, { expect } from "@playwright/test";

test.beforeEach("go to create group", async ({ page }) => {
  await page.goto("http://localhost:3000/group/create");
});

test("has username", async ({ page }) => {
  await expect(
    page.getByRole("link", { name: process.env.TEST_USERNAME })
  ).toBeVisible();
});

test("has enter group name input field", async ({ page }) => {
  await expect(page.getByLabel("Enter group name")).toBeVisible();
});
