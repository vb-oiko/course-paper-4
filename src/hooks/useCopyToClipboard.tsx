import React from "react";

const useCopyToClipboard = () =>
  React.useCallback((value: string) => {
    var textField = document.createElement("textarea");
    textField.innerText = value;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  }, []);

export default useCopyToClipboard;
