(() => {
  const challengeNode = document.querySelector("#qualified-embed");
  const nextChallengeBtn = document.querySelector("#next-challenge");
  nextChallengeBtn.disabled = true;
  const getSolnBtn = document.querySelector("#get-solution");
  let nextChallengeBtnHandler;
  const challengeIds = [
    "5c74a4cdfa4fe30007a71e80",
    "5c8b093e21d0760008f57e55",
    "5c8b0930d13fa3000b0b46c8",
  ];
  const presetCodeForChallenge = {
    "5c8b0930d13fa3000b0b46c8": `

def valid_installation(sequence, package, dependencies):
    pass

`,
  };
  let candidateCode = "";
  //const initialFiles = {"src/index.js": candidateCode || undefined}; // for PCC
  const initialFiles = {};
  const editorConfig = {
    node: challengeNode, 
    challengeId: challengeIds[0],
    options: {},
  };
  
  const managerConfig = {
    // generate editors by looking through nodes
    autoCreate: false,

    // shared options for new editors
    options: {
      embedClientKey: "g39RsSfAYEkyRG8ZYjxrpT9c/XqnfQpN",
      language: "javascript",
      theme: "light",
      autoStart: false,
      initialFiles: initialFiles,
      initialLayout: {topRight: ["instructions"]},
    },

    // The following events can also be handled per-challenge
    onLoaded({manager, editor, challengeId, data}) {},
    onChange({manager, editor, challengeId, data}) {
      candidateCode = data.files.code;
    },
    onRun({manager, editor, challengeId, data}) {
      if (data.result.completed && data.type === "attempt" /* "test" */) {
        nextChallenge(editor, challengeId);
      }
    }
  };
  
  const getSolnHandler = e =>
    context.editor.setFileContents({"code": solutions[editorConfig.challengeId]})
  ;
  getSolnBtn.addEventListener("click", getSolnHandler);
  const context = {manager: window.QualifiedEmbed.init(managerConfig)};
  context.editor = context.manager.createEditor(editorConfig);
  const nextChallenge = (editor, challengeId) => {
    nextChallengeBtn.disabled = false;
    nextChallengeBtn.removeEventListener("click", nextChallengeBtnHandler);

    nextChallengeBtnHandler = e => {
      nextChallengeBtn.disabled = true;
      const nextIdx = (1 + challengeIds.indexOf(challengeId)) % challengeIds.length;
      editor.update({challengeId: challengeIds[nextIdx]});
      editorConfig.challengeId = challengeIds[nextIdx];
      initialFiles.code = candidateCode + 
        (presetCodeForChallenge[challengeIds[nextIdx]] || "");
      getSolnBtn.removeEventListener("click", getSolnHandler);
      getSolnBtn.addEventListener("click", getSolnHandler);
    };
    nextChallengeBtn.addEventListener("click", nextChallengeBtnHandler);
  };
})();

