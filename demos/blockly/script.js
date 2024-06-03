(() => {
  const blocklyWorkspace = Blockly.inject("blockly-container", {
    toolbox: document.getElementById("toolbox"),
  });
  Blockly.Xml.domToWorkspace(
    document.getElementById("start-blocks"),
    blocklyWorkspace,
  );

  // Convert text_print block to Node instead of browser
  Blockly.JavaScript["text_print"] = (block) => {
    const msg =
      Blockly.JavaScript.valueToCode(
        block,
        "TEXT",
        Blockly.JavaScript.ORDER_NONE,
      ) || "''";
    return `console.log(${msg});\n`;
  };

  const editorConfig = {
    node: document.querySelector("#qualified-embed"),
    challengeId: "5f029b271dbad30012978cd5",
  };

  const managerConfig = {
    autoCreate: false,
    options: {
      embedClientKey: "g39RsSfAYEkyRG8ZYjxrpT9c/XqnfQpN",
      language: "javascript",
      hideTabs: "instructions,code,idesettings,testcases",
      theme: "light",
      autoStart: false,
      initialFiles: {},
      initialLayout: {},
    },

    onLoaded({ manager, editor, challengeId, data }) {
      setEmbedEditorCodeFromBlockly();
      blocklyWorkspace.addChangeListener(setEmbedEditorCodeFromBlockly);
    },

    onChange({ manager, editor, challengeId, data }) {},

    onRun({ manager, editor, challengeId, data }) {
      if (data.result.completed && data.type === "attempt") {
        // handle pass
      }
    },
  };

  const context = {
    manager: window.QualifiedEmbed.QualifiedEmbedManager.init(managerConfig),
  };
  context.editor = context.manager.createEditor(editorConfig);

  const setEmbedEditorCodeFromBlockly = () => {
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    const code = Blockly.JavaScript.workspaceToCode(blocklyWorkspace);
    context.editor.setFileContents({ code });
  };
})();
