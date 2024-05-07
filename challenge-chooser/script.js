(() => {

const frameworkBtnsContainer = document.querySelector("#framework-chooser");
const challengeNode = document.querySelector("#qualified-embed");
const challengeIds = {
  react: "5d389870eea25fc13eb18de0",
  angular: "5d8e42606076b300106c9660",
  vue: "5d5b4170eea25f14431748a2"
};
const editorConfig = {
  node: challengeNode,
  challengeId: challengeIds.react
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
  },
  onLoaded({manager, editor, challengeId, data}) {
  },
  onChange({manager, editor, challengeId, data}) {
  },
  onRun({manager, editor, challengeId, data}) {
  }
};

const manager = window.QualifiedEmbed.QualifiedEmbedManager.init(managerConfig);
const editor = manager.createEditor(editorConfig);

for (const [framework, challengeId] of Object.entries(challengeIds)) {
  const anchor = document.createElement("a");
  anchor.classList.add('button');
  frameworkBtnsContainer.appendChild(anchor);
  anchor.textContent = framework[0].toUpperCase() + framework.slice(1);
  anchor.href = "javascript:;";
  anchor.addEventListener("click", () => editor.update({challengeId}));
}

})();

