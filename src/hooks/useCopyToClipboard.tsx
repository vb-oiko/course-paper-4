import React from "react";

const useCopyToClipboard = (value: string) =>
  React.useCallback(() => {
    var textField = document.createElement("textarea");
    textField.innerText = value;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  }, [value]);

export default useCopyToClipboard;
