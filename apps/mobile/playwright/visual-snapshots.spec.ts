import { expect, test } from "@playwright/test";

const routes = ["/"];

// Test each route
for (const route of routes) {
  test(`Visual snapshot of route: ${route}`, async ({ page }) => {
    // Skip routes with path parameters for simplicity
    // You could replace parameters with actual values if needed
    if (route.includes(":")) {
      test.skip();
      return;
    }

    // Normalize empty route to root path
    const path = route === "" ? "/" : route;

    // Navigate to the route
    await page.goto(`${path}`);

    // Wait for any loading states to resolve
    await page.waitForLoadState("networkidle");

    // Take a screenshot and compare with baseline
    await expect(page).toHaveScreenshot(
      `${route.replace(/\//g, "-") || "home"}.png`,
    );
  });
}
