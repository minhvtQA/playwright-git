import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";

test("has title", async ({ page }, testInfo) => {
  await page.goto("https://playwright.dev/");
  await allure.attachment(
    "homepage",
    await page.screenshot({ fullPage: true }),
    {
      contentType: "image/png",
    },
  );
  await testInfo.attach("homepage", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }, testInfo) => {
  await page.goto("https://playwright.dev/");
  await page.screenshot({ fullPage: true });
  await testInfo.attach("homepage", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});
