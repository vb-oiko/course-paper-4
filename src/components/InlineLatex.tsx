import React from "react";
import Latex from "react-latex";

export const InlineLatex: React.FC<{}> = ({ children }) =>
  typeof children === "string" ? <Latex>{`$${children}$`}</Latex> : null;
