import test, { expect } from "@playwright/test";

test.beforeEach("go to view add member page", async ({ page }) => {
  await page.goto(process.env.TEST_ADD_MEMBER_PAGE_URL!);
});

test("has loading while fetching user", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Loading user..." })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: process.env.TEST_USERNAME })
  ).toHaveCount(0);
});
