const { execSync } = require("child_process");
const fs = require("fs");

// Step 1: Run the build command
console.log("Running build...");
execSync("npm run build", { stdio: "inherit" });

// Step 2: Move the index.html file
console.log("Moving index.html...");
execSync("mv dist/index.html .", { stdio: "inherit" });

// Step 3: Update the paths in index.html
const htmlFile = "index.html";
const content = fs
  .readFileSync(htmlFile, "utf8")
  .replace('src="bundle.js"', 'src="dist/bundle.js"')
  .replace('href="bundle.css"', 'href="dist/bundle.css"');

fs.writeFileSync(htmlFile, content);
console.log("Updated paths in index.html");

// Step 4: Add files to Git
console.log("Adding files to git...");
execSync("git add dist index.html", { stdio: "inherit" });

// Step 5: Commit the changes
console.log("Committing changes...");
execSync('git commit -m "Update the React demo"', { stdio: "inherit" });

// Step 6: Push the changes
console.log("Pushing to repository...");
execSync("git push", { stdio: "inherit" });

console.log("Build and commit process complete.");
