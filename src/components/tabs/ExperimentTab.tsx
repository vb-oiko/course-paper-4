import React from "react";
import { useSelector } from "react-redux";
import { ExperimentParams, getExperimentSolutions } from "../../core/experiment";
import { selectProblem } from "../../rdx/selectors";
import { ExperimentChart } from "../experiment/ExperimentChart";
import { ExperimentSelect } from "../experiment/ExperimentSelect";
import { ExperimentTable } from "../experiment/ExperimentTable";

export const ExperimentTab: React.FC = () => {
  const problem = useSelector(selectProblem);
  const [experimentParams, setExperimentParams] = React.useState<ExperimentParams>();

  const experimentData = React.useMemo(() => {
    return experimentParams && getExperimentSolutions(problem, experimentParams);
  }, [experimentParams, problem]);

  return (
    <div className="mb-4">
      <ExperimentSelect onChange={setExperimentParams} />
      {experimentData && (
        <div className="mt-4">
          <ExperimentChart experimentData={experimentData} />
          <ExperimentTable experimentData={experimentData} className="mt-8 w-full" />
        </div>
      )}
    </div>
  );
};
