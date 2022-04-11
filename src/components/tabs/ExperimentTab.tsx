import { useSelector } from "react-redux";
import { getFactoryProductivityTransformProblem } from "../../core/experiment/problemTransformers";
import { getLatexFromProblem } from "../../core/Problem";
import { selectProblem } from "../../rdx/selectors";
import { LatexStatements } from "../LatexStatements";

export const ExperimentTab: React.FC = () => {
  const problem = useSelector(selectProblem);

  const problemLatex = getLatexFromProblem(problem);

  const transformer = getFactoryProductivityTransformProblem(2);
  const problem1 = transformer(problem, 2);
  const problemLatex1 = getLatexFromProblem(problem1);

  return (
    <div>
      <LatexStatements statements={problemLatex} className="mt-2" />
      <LatexStatements statements={problemLatex1} className="mt-2" />
    </div>
  );
};
