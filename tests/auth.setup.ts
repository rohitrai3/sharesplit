import { expect, test as setup } from "@playwright/test";
import "dotenv/config";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  // Perform authentication steps
  await page.goto("http://localhost:3000/api/auth/login");
  await page.getByLabel("Username").fill(process.env.TEST_USERNAME!);
  await page.getByLabel("Password").fill(process.env.TEST_PASSWORD!);
  await page.getByRole("button", { name: "Continue" }).click();
  // Wait until the page receives the cookies.
  await page.waitForURL("http://localhost:3000/home");
  // Assert that username is visible on home page
  await expect(
    page.getByRole("link", { name: process.env.TEST_USERNAME })
  ).toBeVisible();
  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
