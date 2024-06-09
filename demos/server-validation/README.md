# Qualified Embed Server Validation

This demo app shows how you can run Qualified's [Embed](https://www.qualified.io/embedded) feature on a server, allowing you to validate candidate (or student) solutions securely and persist the results.

View [this demo's source](https://github.com/qualified/embed-demos/tree/master/demos/blockly).

Normally, Embed is run in a stateless [challenge](https://andela-technology.github.io/qualified-embed/docs/tutorial-challenges.html) mode. Solutions are sent to Qualified's Code Runner service which runs the test suite and responds directly to the client with the result. Since the Code Runner doesn't track the results, there's no way to trust that the result sent to the client hasn't been tampered with.

Embed can also run in a stateful [assessment](https://andela-technology.github.io/qualified-embed/docs/tutorial-assessments.html) mode, eliminating the trust issue. Adding an auth token to the challenge mode is another way to save results securely. However, results must be stored on Qualified, and creating and managing assessments and invitations on Qualified may not fit all use cases.

This demo app uses a browser automation service, [Playwright](https://playwright.dev/), to run Embed on your server, effectively proxying requests to the Code Runner in a way that lets you record the results in a trustworthy manner, yet continue to use Embed's lightweight challenge mode. The only input from the candidate would typically be the solution code, which the candidate can test and develop before submission using a regular Embed instance such as the [index.html](public/index.html) in this project.

Using Embed this way, you can even create custom content outside of Qualified and inject arbitrary testing and starter code into Embed, effectively allowing you to manage your own content and results. This minimalist approach uses Qualified as a stateless code runner and, optionally, a web code editor.

Note that Playwright supports many popular languages, and other browser automation solutions exist, so there's nothing special about the particular stack used in this proof of concept.

As as a proof of concept, this app is not completely production-ready out of the box, so adaptation to your specific needs is expected.

## Usage

This demo needs to be installed and run locally; the online Embed demos page doesn't have a back-end, so the HTML pages won't be particularly interesting on their own.

You can get set up with the following commands:

```
git clone https://github.com/qualified/embed-demos.git
cd embed-demos/server-validation
npm i
npx playwright install
npm start
```

With the server running, you can navigate to <http://localhost:3003>, open the browser developer tools console and use the Submit button to run your custom Embed server-side validation. `node test.js` can also be used to test the backend service directly, without a browser client.

[server.html](server.html) is the code Playwright uses to run Embed on the server and won't be seen by the candidate. You can open this file in a browser directly to help debug your server code. A `testRunEmbed()` function is provided to test your server Embed logic without Playwright.
