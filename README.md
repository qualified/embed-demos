# embed-demos
A collection of proofs-of-concept for Qualified's [Embed](https://www.qualified.io/embedded) feature. See [API documentation](https://www.qualified.io/embed/api-docs/) for help.

[Try the demos live](https://qualified.github.io/embed-demos) and [visit the repository on GitHub](https://www.github.com/qualified/embed-demos).

If you want to run the demos locally, start a development server, for example `python3 -m http.server 8000`, then point your browser to the `localhost:8000` address.

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

