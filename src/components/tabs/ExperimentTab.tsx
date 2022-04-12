import React from "react";
import { useSelector } from "react-redux";
import { getExperimentSolutions } from "../../core/experiment";
import { getFactoryProductivityTransformProblem } from "../../core/experiment/problemTransformers";
import { selectProblem } from "../../rdx/selectors";
import { ExperimentChart } from "../experiment/ExperimentChart";

export const ExperimentTab: React.FC = () => {
  const problem = useSelector(selectProblem);

  const experimentData = React.useMemo(
    () =>
      getExperimentSolutions(problem, {
        start: 0.5,
        end: 1.5,
        step: 0.1,
        transformProblem: getFactoryProductivityTransformProblem(4),
        paramToLabelMapper: (value: number) => `${Math.round(value * 100)}%`,
        showX: false,
      }),
    [problem]
  );

  return (
    <div className="mb-4">
      <ExperimentChart experimentData={experimentData} title="Some experiment" />
    </div>
  );
};
