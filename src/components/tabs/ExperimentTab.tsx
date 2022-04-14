import React from "react";
import { useSelector } from "react-redux";
import { ExperimentData, ExperimentParams, getExperimentSolutions } from "../../core/experiment";
import { selectProblem } from "../../rdx/selectors";
import { ExperimentChart } from "../experiment/ExperimentChart";
import { ExperimentSelect } from "../experiment/ExperimentSelect";
import { ExperimentTable } from "../experiment/ExperimentTable";
import { useExperimentState } from "../experiment/useExperimentState";

export const ExperimentTab: React.FC = () => {
  const problem = useSelector(selectProblem);
  const { selectExperimentParams, state } = useExperimentState();

  const [experimentData, setExperimentData] = React.useState<ExperimentData>();

  React.useEffect(() => {
    console.warn(state);

    setExperimentData(getExperimentSolutions(problem, selectExperimentParams()));
  }, [selectExperimentParams, problem, state, state.experimentIndex, state.paramIndex]);

  return (
    <div className="mb-4">
      <ExperimentSelect />
      {experimentData && (
        <div className="mt-4">
          <ExperimentChart experimentData={experimentData} />
          <ExperimentTable experimentData={experimentData} className="mt-8 w-full" />
        </div>
      )}
    </div>
  );
};
