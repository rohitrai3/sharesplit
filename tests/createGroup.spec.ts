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

test("has enter members name input field", async ({ page }) => {
  await expect(page.getByLabel("Enter members name")).toBeVisible();
});

test("has create button", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Create" })).toBeVisible();
});

test("has cancel button", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
});
