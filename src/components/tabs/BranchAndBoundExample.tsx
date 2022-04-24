import { useSelector } from "react-redux";
import { getSolutionAsString } from "../../core/utils";
import { selectBranchAndBoundSolution, selectTableau } from "../../rdx/selectors";
import { BranchAndBoundNodeComponent } from "../BranchAndBoundNodeComponent";
import { InlineLatex } from "../InlineLatex";
import { LatexProblemStatement } from "../LatexProblemStatement";

export const BranchAndBoundExample = () => {
  const tableau = useSelector(selectTableau);
  const { nodes, maximizedValue, solution } = useSelector(selectBranchAndBoundSolution);
  return (
    <>
      <LatexProblemStatement tableau={tableau} className="mb-2" />
      {nodes.map((node, idx) => (
        <div key={idx} className="mb-6">
          <div className="mb-2">{`Node ${idx}`}</div>
          <BranchAndBoundNodeComponent node={node} />
        </div>
      ))}
      <div className="mb-1 text-blue-600 font-semibold">{`Maximized value: ${maximizedValue}`}</div>
      <div className="mb-1 text-blue-600 font-semibold">
        <span className="mr-2">{`Solution:`}</span>
        <InlineLatex>{getSolutionAsString(solution)}</InlineLatex>
      </div>
    </>
  );
};
