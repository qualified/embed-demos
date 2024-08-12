// @ts-check
const fs = require("node:fs");
const path = require("node:path");
const { expect, test } = require("@playwright/test");

const skipDirs = ["common", "server-validation"];
const skipScriptCheck = ["react"];

const json = fs.readFileSync(
  path.join("demos", "react", "package.json"),
  "utf-8",
);
const embedVersion = JSON.parse(json).dependencies["@qualified/embed"].replace(
  /^\^/,
  "",
);

const scriptSelector = `script[src="https://cdn.jsdelivr.net/npm/@qualified/embed@v${embedVersion}"]`;

const dirs = fs
  .readdirSync("demos", { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .filter((e) => !skipDirs.includes(e));

for (const dir of dirs) {
  test.describe(dir, () => {
    test.beforeEach(({ page }) => page.goto(dir, { waitUntil: "commit" }));

    if (!skipScriptCheck.includes(dir)) {
      test("uses the correct version of embed", async ({ page }) => {
        await expect(page.locator(scriptSelector)).toBeAttached();
      });
    }

    test("embed loads", async ({ page }) => {
      const embedFrame = page.frameLocator("iframe").first();
      await expect(embedFrame.getByText("Run Output")).toBeVisible();
    });

    test("common CSS loads", async ({ page }) => {
      const responsePromise = page.waitForResponse(/shared-styles.css/);
      await page.goto(dir, { waitUntil: "commit" });
      const response = await responsePromise;
      expect(response.status()).toBe(200);
    });

    test("has link to source code", async ({ page }) => {
      const a = page.getByRole("link", { name: "this demo's source" });
      const source = new RegExp(`/github.*/embed-demos/.*/${dir}$`);
      await expect(a).toHaveAttribute("href", source);
    });
  });
}
