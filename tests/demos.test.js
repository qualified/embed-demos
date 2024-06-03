// @ts-check
const fs = require("node:fs");
const { expect, test } = require('@playwright/test');

const skipDirs = ["common", "server-validation"];
const skipScriptCheck = ["react"];
const scriptSelector =
  `script[src="https://cdn.jsdelivr.net/gh/andela-technology/qualified-embed@v1.0.1/dist/embed.min.js"]`;

const dirs = fs
  .readdirSync("./demos", { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name)
  .filter(e => !skipDirs.includes(e));

for (const dir of dirs) {
  test.describe(dir, () => {
    test.beforeEach(({page}) => page.goto(dir, {waitUntil: "commit"}));

    if (!skipScriptCheck.includes(dir)) {
      test('uses the correct version of embed', async ({ page }) => {
        await expect(page.locator(scriptSelector)).toBeAttached();
      });
    }

    test('embed loads', async ({ page }) => {
      const embedFrame = page.frameLocator("iframe").first();
      await expect(embedFrame.getByText("Run Output")).toBeVisible();
    });

    test('common CSS loads', async ({ page }) => {
      const responsePromise = page.waitForResponse(/shared-styles.css/);
      await page.goto(dir, {waitUntil: "commit"});
      const response = await responsePromise;
      expect(response.status()).toBe(200);
    });
  });
}
