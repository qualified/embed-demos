import React from "react";
import useQualifiedEmbed from "../hooks/use-qualified-embed";

const Embed = ({ editorConfig, managerConfig, elementOptions }) => {
  const embedContainerRef = useQualifiedEmbed({
    editorConfig,
    managerConfig,
  });

  return <div {...elementOptions} ref={embedContainerRef}></div>;
};

export default Embed;
