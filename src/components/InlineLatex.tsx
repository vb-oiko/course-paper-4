import React from "react";
import Latex from "react-latex";

export interface InlineLatexProps {
  className?: string;
}

export const InlineLatex: React.FC<InlineLatexProps> = ({ children, className }) =>
  typeof children === "string" ? (
    <span className={className}>
      <Latex>{`$${children}$`}</Latex>
    </span>
  ) : null;
