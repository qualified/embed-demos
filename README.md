# embed-demos
A collection of proofs-of-concept for Qualified's [Embed](https://www.qualified.io/embedded) feature. See [API documentation](https://www.qualified.io/embed/api-docs/) for help.

[Try the demos live](https://qualified.github.io/embed-demos) and [visit the repository on GitHub](https://www.github.com/qualified/embed-demos).

If you want to run the demos locally, start a development server, for example `python3 -m http.server 8000`, then point your browser to the [localhost:8000](localhost:8000) address.

## Demos

### [CodeMirror](codemirror)
Powerful browser-based code editors such as [CodeMirror](https://codemirror.net) and [Ace](https://ace.c9.io) can be used with Qualified Embed in place of the built-in CodeMirror editor in Embed's iframe.

A minimal connection between an external editor and Qualified Embed involves extracting any editor textarea values to insert into their corresponding Qualified Embed files upon submission. This can be done in CodeMirror as follows:

```javascript
codeMirrorEditor.on("keyup", (cm, event) => {
  qEmbedEditor.setFileContents({code: cm.getValue()});
});
```

Beyond that, mapping the editor's keystrokes like <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to fire Embed submissions and setting CodeMirror textareas based on the initially loaded code inside challenge files is likely desirable. See [script.js](codemirror/script.js) for details.

It's possible to go a step further and move challenge instructions and code runner output outside of Embed. This would enable you to use Embed headlessly and create your UI entirely from scratch.

### [Carry Forward](carry-forward)
If you have a series of challenges, you can use the [manager's `onRun` callback](https://www.qualified.io/embed/api-docs/QualifiedEmbedManager.html#QualifiedEmbedManager__anchor) to determine when a challenge has been completed and move on to the next challenge using [`editor.update({challengeId: nextChallengeId})`](https://www.qualified.io/embed/api-docs/QualifiedEmbeddedEditor.html#update). 

If you'd like the new challenge to begin with the candidate's last-completed source code, you can set [`initialFiles.code`](https://www.qualified.io/embed/api-docs/ChallengeOptions.html#initialFiles__anchor) (for classic code challaneges) or `initialFiles[path]` (for project code challenges) to the previous solution code (or any other code you wish to provide as a starting point for the next challenge).

### [Multiplayer](multiplayer)
Expanding on the [CodeMirror demo](codemirror), you can use [Firepad](https://firepad.io) or another service to enable multiple editors. This enables students, instructors, candidates and reviewers to collaborate from different computers in real time. There are many rabbit holes available to go down with multiplayer editing which can cover a wide range of use cases, so this is a bare-minimum "hello world" example.

### [Challenge Chooser](challenge-chooser)
Oftentimes, letting the student or candidate pick from a variety of challenges is useful. For example, when assessing framework-agnostic front-end development skills, it may be appropriate to let challengers work in one of multiple frameworks. At the time of writing, Qualified's [project code challenge feature](https://www.qualified.io/kb/hire/challenges/multi-file-code) doesn't offer more than a single environment per challenge, but Embed can.

### [Progress Meter](progress)
Sometimes it's nice to let students move between different coding tests at their own pace. In this demo, we simulate a complete education course on a single page. This demo tracks the student's progress across several embeds, with a progress bar at the top of the page tracking their overall success. The student is free to solve the challenges in any order.

### [Blockly](blockly)
This is a demonstration of how you can use Embed with Google's <a href="https://developers.google.com/blockly">Blockly</a> to create captivating educational experiences.

### [Parson's Problem](parsons)
This shows how you can use Embedded Qualified to set up an experimental challenge format like a code block scramble (Parson's problem).

### [Written Response](written-response)
Embed supports challenges that offer testable written response fields using markdown.

### [Server Validation](server-validation)
This demonstration illustrates how to run Embed on the server programmatically with the browser automation library Playwright. This allows you to securely run your candidate's code, validate solutions and persist the results on your server without using Qualified to manage assessments or assessment results.
