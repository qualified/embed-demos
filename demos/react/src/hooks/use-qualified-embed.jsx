import React from "react";
import { QualifiedEmbedManager } from "@qualified/embed";

const useQualifiedEmbed = ({ managerConfig, editorConfig }) => {
  const embedContainerRef = React.useRef();

  React.useEffect(() => {
    const manager = QualifiedEmbedManager.init(managerConfig);
    const editor = manager.createEditor({
      ...editorConfig,
      node: embedContainerRef.current,
    });

    return () => manager.destroy();
  }, []);

  return embedContainerRef;
};

export default useQualifiedEmbed;
