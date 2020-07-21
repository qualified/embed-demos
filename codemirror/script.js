(() => {

const challengeNode = document.querySelector("#qualified-embed");
const editorConfig = {
  node: challengeNode, 
  challengeId: "5eebfd4eee149e00119f4600",
};
const managerConfig = {
  autoCreate: false,
  options: {
    embedClientKey: "g39RsSfAYEkyRG8ZYjxrpT9c/XqnfQpN",
    language: "python",
    hideTabs: "code,idesettings", // TODO "code,idesettings,testcases"
    theme: "dark",
    autoStart: false,
    initialFiles: {},
    initialLayout: {
      topLeft: ["instructions", "runnerframe", "testcases"], // TODO remove testcases
    },
  },
  onLoaded({manager, editor, challengeId, data}) {
  },
  onChange({manager, editor, challengeId, data}) {
    if (codeCM.isClean()) {
      codeCM.setValue(data.files.code);
    }

    if (testcaseCM.isClean()) {
      testcaseCM.setValue(data.files.testcases);
    }
  },
  onRun({manager, editor, challengeId, data}) {}
};

const context = {manager: window.QualifiedEmbed.init(managerConfig)};
context.editor = context.manager.createEditor(editorConfig);

const makeCodeMirror = textarea => {
  const cm = CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    mode: "python",
    version: 3,
    keyMap: "vim",
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: false,
    matchBrackets: true,
    showCursorWhenSelecting: true,
    theme: "abcdef",
    extraKeys: {"Ctrl-Space": "autocomplete"},
  });
  //cm.setSize(null, "100%");
  
  cm.addKeyMap({
    Tab: cm => {
      if (cm.somethingSelected()) {
        cm.indentSelection("add");
      }
      else {
        cm.execCommand("insertSoftTab");
      }
    },
    "Shift-Tab": cm => cm.indentSelection("subtract"),
    "Ctrl-Enter": cm => context.editor.attempt(),
    "Ctrl-'": cm => context.editor.runTests()
  });
  
  return cm;
};

const codeCM = makeCodeMirror(document.querySelector("#code-code-mirror"));
const testcaseCM = makeCodeMirror(document.querySelector("#testcase-code-mirror"));
codeCM.on("keyup", (cm, event) => {
  context.editor.setFileContents({code: cm.getValue()});
});
testcaseCM.on("keyup", (cm, event) => {
  context.editor.setFileContents({testcases: cm.getValue()});
});
  
})();

