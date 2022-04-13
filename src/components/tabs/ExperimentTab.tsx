import React from "react";
import { useSelector } from "react-redux";
import { ExperimentParams, getExperimentSolutions } from "../../core/experiment";
import { getFactoryProductivityTransformProblem } from "../../core/experiment/problemTransformers";
import { selectProblem } from "../../rdx/selectors";
import { ExperimentChart } from "../experiment/ExperimentChart";
import { ExperimentSelect } from "../experiment/ExperimentSelect";
import { ExperimentTable } from "../experiment/ExperimentTable";

export const ExperimentTab: React.FC = () => {
  const problem = useSelector(selectProblem);
  const [experimentParams, setExperimentParams] = React.useState<ExperimentParams>({
    start: 0.5,
    end: 1.5,
    step: 0.1,
    transformProblem: getFactoryProductivityTransformProblem(4),
    paramToLabelMapper: (value: number) => `${Math.round(value * 100)}%`,
    showX: true,
  });

  const experimentData = React.useMemo(
    () => getExperimentSolutions(problem, experimentParams),
    [experimentParams, problem]
  );

  return (
    <div className="mb-4">
      <ExperimentChart experimentData={experimentData} title="Some experiment" />
      <ExperimentTable experimentData={experimentData} className="mt-8 w-full" />
      <ExperimentSelect />
    </div>
  );
};
