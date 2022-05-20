import React from "react";
import Latex from "react-latex";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

export interface InlineLatexProps {
  className?: string;
}

export const InlineLatex: React.FC<InlineLatexProps> = ({ children, className }) => {
  const copyToClipboard = useCopyToClipboard(`$$ ${children} $$`);

  return typeof children === "string" ? (
    <span className={`${className} cursor-pointer`} onClick={copyToClipboard}>
      <Latex>{`$${children}$`}</Latex>
    </span>
  ) : null;
};
