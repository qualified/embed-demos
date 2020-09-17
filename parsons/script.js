(() => {

const code = `
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
char *say_hello(char *name) {
        char *msg = malloc(strlen(name) + 9);
    if (strcmp(name, "")) {
        return msg;
        sprintf(msg, "Hello, %s!", name);
        msg[0] = '\\0';
    }
    strcat(msg, "Hello there!");
    msg[0] = '\\0';
    char *msg = malloc(13);
    return msg;
}
`;

const codeEl = document.getElementById("block-code");
code.trim().split("\n").forEach(e => {
  const li = document.createElement("li");
  codeEl.append(li);
  li.classList.add("language-c");
  li.textContent = e;
  hljs.highlightBlock(li);
});

const sortable = new Sortable(codeEl, {
  animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
  easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.

  // Called by any change to the list (add / update / remove)
  onSort: evt => setEditorCodeFromBlocks(),
});
  
const editorConfig = {
  node: document.querySelector("#qualified-embed"), 
  challengeId: "5f029b271dbad30012978cd5",
};

const managerConfig = {
  autoCreate: false,
  options: {
    embedClientKey: "g39RsSfAYEkyRG8ZYjxrpT9c/XqnfQpN",
    language: "c",
    hideTabs: "instructions,code,idesettings,testcases",
    theme: "light",
    autoStart: false,
    initialFiles: {},
    initialLayout: {},
  },

  onLoaded({manager, editor, challengeId, data}) {
    setEditorCodeFromBlocks();
  },

  onChange({manager, editor, challengeId, data}) {},
  
  onRun({manager, editor, challengeId, data}) {
    if (data.result.completed && data.type === "attempt") {
      // handle pass
    }
  }
};

const context = {manager: window.QualifiedEmbed.init(managerConfig)};
context.editor = context.manager.createEditor(editorConfig);

function setEditorCodeFromBlocks() {
  const src = [...codeEl.querySelectorAll("li")].map(e => e.textContent).join("\n");
  context.editor.setFileContents({code: src});
}

})();
