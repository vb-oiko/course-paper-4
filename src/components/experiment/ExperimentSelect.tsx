import React from "react";
import { SelectInput } from "../UI/SelectInput";
import { EXPERIMENT_OPTIONS } from "./experimentOptions";
import { useExperimentState } from "./useExperimentState";

export interface ExperimentSelectProps {
  className?: string;
}

export const ExperimentSelect: React.FC<ExperimentSelectProps> = ({ className }) => {
  const { state, setExperimentIndex, setParamIndex, selectParamOptions } = useExperimentState();

  const paramOptions = selectParamOptions();

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      <SelectInput value={state.experimentIndex} onChange={setExperimentIndex} options={EXPERIMENT_OPTIONS} />
      {paramOptions && <SelectInput value={state.paramIndex} onChange={setParamIndex} options={paramOptions!} />}
    </div>
  );
};
