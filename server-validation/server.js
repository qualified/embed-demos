const express = require("express");
const {readFile} = require("node:fs/promises");
const {chromium} = require("playwright");

// Primary Embed configuration options are set here.
// This could be dynamic, but for purposes of
// demonstration, a specific challengeId is hardcoded.
const embedRunConfig = {
  embedOptions: {
    embedClientKey: "g39RsSfAYEkyRG8ZYjxrpT9c/XqnfQpN",
    language: "javascript",
  },
  editorConfig: {
    challengeId: "5f029b271dbad30012978cd5",
  },

  // `code` is the solution to be provided by the
  // candidate, but you could also use dynamic test
  // cases, ignoring the challengeId set above.
  fileContents: {code: ""},
};

(async () => {
  const browser = await chromium.launch({headless: true});
  const embedHTML = await readFile("server.html", {
    encoding: "ascii",
  });

  const app = express();
  app
    .set("port", process.env.PORT || 3003)
    .use(express.static("public"))
    .use(express.json())
    .post("/submit", async (req, res) => {
      const {fileContents} = req.body;

      if (!fileContents || typeof fileContents !== "object") {
        return res.status(422).json({
          error: "key `fileContents` (object) is required",
        });
      }

      let page;
      try {
        page = await browser.newPage();
        await page.setContent(embedHTML);
        const result = await page.evaluate(
          embedRunConfig => window.runEmbed(embedRunConfig),
          {...embedRunConfig, fileContents}
        );

        // At this point, generally store the result
        // in a database rather than returning it verbatim
        // to the client. But for purposes of demonstration,
        // pass the response along.
        return res.json({result});
      } catch (err) {
        return res.status(500).json({error: err.message});
      } finally {
        await page?.close();
      }
    })
    .listen(app.get("port"), () =>
      console.log(`running on port ${app.get("port")}`)
    );
})().catch(err => console.error(err));

