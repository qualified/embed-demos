import React from "react";
import Embed from "./components/Embed";
import embedConfig from "./embed-config.json";
import "./App.css";

const App = () => {
  const [result, setResult] = React.useState();

  const managerConfig = {
    ...embedConfig.managerConfig,
    onRun({ manager, editor, challengeId, data }) {
      console.log(data);
      setResult(data.result);
    },
    // Visit our docs for more options and callbacks
  };

  return (
    <React.StrictMode>
      <Embed
        elementOptions={{ className: "qualified-embed" }}
        managerConfig={managerConfig}
        editorConfig={embedConfig.editorConfig}
      />
      <pre>{result && JSON.stringify(result, null, 2)}</pre>
    </React.StrictMode>
  );
};

export default App;
