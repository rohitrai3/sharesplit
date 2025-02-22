import test, { expect } from "@playwright/test";

test("has logo icon", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByAltText("ShareSplit logo")).toBeVisible();
});
