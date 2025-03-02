import test, { expect } from "@playwright/test";

test.beforeEach("go to view group page", async ({ page }) => {
  await page.goto(process.env.TEST_VIEW_GROUP_PAGE_URL!);
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

test("has group name and members", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: process.env.TEST_GROUP_UI })
  ).toBeVisible();
  await expect(page.getByRole("paragraph")).toHaveText(
    process.env.TEST_MEMBERS_UI!
  );
});

test("has add member button", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Add member" })).toBeVisible();
});

test("has back button", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Back" })).toBeVisible();
});

test("has add expense button", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Add expense" })).toBeVisible();
});

test("has logout button", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});
