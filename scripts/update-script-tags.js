const fs = require("node:fs/promises");
const path = require("path");

const getQualifiedEmbedVersion = async () => {
  const packageJsonPath = path.resolve("demos", "react", "package.json");
  const data = await fs.readFile(packageJsonPath, "utf8");
  return JSON.parse(data).dependencies["@qualified/embed"].replace("^", "");
};

const updateScriptTag = async (filePath, newVersion) => {
  const oldScriptTag =
    /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/@qualified\/embed@v?[^\"]+"><\/script>/g;
  const newScriptTag = `<script src="https://cdn.jsdelivr.net/npm/@qualified/embed@v${newVersion}"></script>`;

  const fileContent = await fs.readFile(filePath, "utf8");

  if (oldScriptTag.test(fileContent)) {
    const updatedContent = fileContent.replace(oldScriptTag, newScriptTag);
    await fs.writeFile(filePath, updatedContent, "utf8");
  }
};

const findHtmlFiles = async (dir, newVersion) => {
  for (const file of await fs.readdir(dir)) {
    const filePath = path.resolve(dir, file);

    if ((await fs.stat(filePath)).isDirectory()) {
      await findHtmlFiles(filePath, newVersion);
    } else if (filePath.endsWith(".html")) {
      await updateScriptTag(filePath, newVersion);
    }
  }
};

(async () => {
  const newVersion = await getQualifiedEmbedVersion();
  await findHtmlFiles(path.resolve("demos"), newVersion);
})().catch((err) => console.error(err));
