import React from "react";

import { problem as initialProblem } from "../const/problem";
import { getLatexFromProblem, Problem } from "../core/Problem";
import { InlineLatex } from "./InlineLatex";
import { InputProblem } from "./InputProblem";

export interface InputTabProps {}

export const InputTab: React.FC<InputTabProps> = () => {
  const [problem, setProblem] = React.useState(initialProblem);
  const [latexProblem, setLatexProblem] = React.useState<string[]>([]);

  const handleSubmit = React.useCallback((value: Problem) => {
    setProblem(value);
    setLatexProblem(getLatexFromProblem(value));
  }, []);

  return (
    <div>
      <InputProblem onSubmit={handleSubmit} />
      <div className="mt-4">
        {latexProblem.map((statement) => (
          <div key={`statement-${statement}`}>
            <InlineLatex>{statement}</InlineLatex>
          </div>
        ))}
      </div>
    </div>
  );
};
