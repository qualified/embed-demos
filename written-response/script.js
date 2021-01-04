(() => {

const editorConfig = {
  node: document.querySelector("#qualified-embed"),
  challengeId: "5fbdbb973acee4000daf9b81",
};
const managerConfig = {
  autoCreate: false,
  options: {
    embedClientKey: "g39RsSfAYEkyRG8ZYjxrpT9c/XqnfQpN",
    language: "javascript",
    theme: "light",
    autoStart: false,
    initialFiles: {},
    initialLayout: {
      topRight: ["instructions", "runnerframe"],
    },
    hideTabs: ["webpreview"], // TODO maybe an issue -- challenge doesn't have WP 
    //hideActions: ["attempt", "runTests"],
  },
  onLoaded({manager, editor, challengeId, data}) {
  },
  onChange({manager, editor, challengeId, data}) {
  },
  onRun({manager, editor, challengeId, data}) {
  }
};

const manager = window.QualifiedEmbed.init(managerConfig);
const editor = manager.createEditor(editorConfig);

})();

