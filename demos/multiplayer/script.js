(() => {
  const editorConfig = {
    challengeId: "5c781be7f768730009630056",
    node: document.querySelector("#qualified-embed"),
  };
  const managerConfig = {
    autoCreate: false,
    options: {
      embedClientKey: "g39RsSfAYEkyRG8ZYjxrpT9c/XqnfQpN",
      language: "c",
      hideTabs: "code,idesettings,testcases",
      theme: "light",
      autoStart: false,
      initialFiles: {},
      initialLayout: {
        topLeft: ["instructions", "runnerframe"],
      },
    },
    onLoaded({ manager, editor, challengeId, data }) {},
    onChange({ manager, editor, challengeId, data }) {
      if (testcaseCM.isClean()) {
        testcaseCM.setValue(data.files.testcases);
      }
    },
    onRun({ manager, editor, challengeId, data }) {},
  };

  const makeCodeMirror = (textarea) => {
    const cm = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      mode: "text/x-csrc",
      version: 3,
      tabSize: 4,
      indentWithTabs: false,
      lineWrapping: false,
      matchBrackets: true,
      showCursorWhenSelecting: true,
      theme: "default",
      extraKeys: { "Ctrl-Space": "autocomplete" },
    });
    cm.setSize(null, "100%");

    cm.addKeyMap({
      Tab: (cm) => {
        if (cm.somethingSelected()) {
          cm.indentSelection("add");
        } else {
          cm.execCommand("insertSoftTab");
        }
      },
      "Shift-Tab": (cm) => {
        cm.indentSelection("subtract");
      },
      "Ctrl-Enter": (cm) => {
        context.editor.attempt();
      },
      "Ctrl-'": (cm) => {
        context.editor.runTests();
      },
    });

    return cm;
  };

  const firebaseConfig = {
    apiKey: "AIzaSyBlh9MSemgD3GfF0gV1mzw6ptbwl7vZTs4",
    authDomain: "firepad-3e39a.firebaseapp.com",
    databaseURL: "https://firepad-3e39a.firebaseio.com",
    projectId: "firepad-3e39a",
    storageBucket: "firepad-3e39a.appspot.com",
    messagingSenderId: "144908628430",
    appId: "1:144908628430:web:53c08e84dd6102034bfb9f",
  };
  firebase.initializeApp(firebaseConfig);
  let firepadRef = firebase.database().ref();
  const hash = location.hash.replace(/^#/, "");

  if (hash) {
    firepadRef = firepadRef.child(hash);
  } else {
    firepadRef = firepadRef.push();
    location += "#" + firepadRef.key;
    managerConfig.onChange = ({ manager, editor, challengeId, data }) => {
      if (codeCM.isClean()) {
        codeCM.setValue(data.files.code);
      }

      if (testcaseCM.isClean()) {
        testcaseCM.setValue(data.files.testcases);
      }
    };
  }

  const anchor = document.createElement("a");
  anchor.textContent = anchor.href = location;
  document.querySelector("#firebase-loc").appendChild(anchor);
  const codeCM = makeCodeMirror(document.querySelector("#code-code-mirror"));
  const firepad = Firepad.fromCodeMirror(firepadRef, codeCM);
  const context = {
    manager: window.QualifiedEmbed.QualifiedEmbedManager.init(managerConfig),
  };
  context.editor = context.manager.createEditor(editorConfig);
  codeCM.on("keyup", (cm, event) => {
    context.editor.setFileContents({ code: cm.getValue() });
  });
  const testcaseCM = makeCodeMirror(
    document.querySelector("#testcase-code-mirror"),
  );
  testcaseCM.on("keyup", (cm, event) => {
    context.editor.setFileContents({ testcases: cm.getValue() });
  });
})();
