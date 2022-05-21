import React from "react";
import Latex from "react-latex";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

export interface InlineLatexProps {
  className?: string;
  standalone?: boolean;
}

export const InlineLatex: React.FC<InlineLatexProps> = ({ children, className, standalone = false }) => {
  const copyToClipboard = useCopyToClipboard();

  const handleClick = React.useCallback(() => {
    copyToClipboard(`$$ ${children} $$`);
  }, [copyToClipboard, children]);

  return typeof children === "string" ? (
    <span className={`${className} cursor-pointer`} onClick={handleClick}>
      {standalone ? <Latex displayMode={true}>{`$$ ${children} $$`}</Latex> : <Latex>{`$${children}$`}</Latex>}
    </span>
  ) : null;
};
