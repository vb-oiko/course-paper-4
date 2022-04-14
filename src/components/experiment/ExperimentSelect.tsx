import React from "react";
import { ExperimentParams } from "../../core/experiment";
import { getFactoryProductivityTransformProblem } from "../../core/experiment/problemTransformers";
import { SelectInput } from "../UI/SelectInput";
import { EXPERIMENT_OPTIONS } from "./experimentOptions";
import { useExperimentState } from "./useExperimentState";

export interface ExperimentSelectProps {
  onChange: (experimentParams: ExperimentParams) => void;
  className?: string;
}

const initialParams = {
  start: 0.5,
  end: 1.5,
  step: 0.1,
  transformProblem: getFactoryProductivityTransformProblem(0),
  paramToLabelMapper: (value: number) => `${Math.round(value * 100)}%`,
};

export const ExperimentSelect: React.FC<ExperimentSelectProps> = ({ className, onChange }) => {
  const { state, setExperimentIndex, setParamIndex, selectParamOptions } = useExperimentState();

  React.useEffect(() => {
    onChange(initialParams);
  }, []);

  const paramOptions = selectParamOptions();

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      <SelectInput value={state.experimentIndex} onChange={setExperimentIndex} options={EXPERIMENT_OPTIONS} />
      {paramOptions && <SelectInput value={state.paramIndex} onChange={setParamIndex} options={paramOptions!} />}
    </div>
  );
};
