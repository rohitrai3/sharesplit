import test, { expect } from "@playwright/test";

test.beforeEach("go to add expense page", async ({ page }) => {
  await page.goto(process.env.TEST_ADD_EXPENSE_PAGE_URL!);
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

test("has loading while fetching group", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Loading group..." })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: process.env.TEST_GROUP_UI })
  ).toHaveCount(0);
});

test("has group after loading is finished", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Loading group..." })
  ).toBeHidden({
    timeout: 10_000,
  });
  await expect(
    page.getByRole("heading", { name: process.env.TEST_GROUP_UI })
  ).toBeVisible();
  await expect(page.getByText(process.env.TEST_MEMBERS_UI!)).toBeVisible();
});

test("has enter expense name input field", async ({ page }) => {
  await expect(page.getByLabel("Enter expense name")).toBeVisible();
});
