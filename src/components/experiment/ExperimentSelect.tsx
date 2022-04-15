import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExperimentIndex, setParamIndex } from "../../rdx/actions";
import { selectExperimentIndex, selectParamIndex, selectParamOptions } from "../../rdx/selectors";
import { SelectInput } from "../UI/SelectInput";
import { EXPERIMENT_OPTIONS } from "./experimentOptions";

export interface ExperimentSelectProps {
  className?: string;
}

export const ExperimentSelect: React.FC<ExperimentSelectProps> = ({ className }) => {
  const dispatch = useDispatch();
  const paramOptions = useSelector(selectParamOptions);
  const experimentIndex = useSelector(selectExperimentIndex);
  const paramIndex = useSelector(selectParamIndex);

  const handleExperimentIndexChange = React.useCallback(
    (experimentIndex: number) => {
      dispatch(setExperimentIndex(experimentIndex));
    },
    [dispatch]
  );

  const handleParamIndexChange = React.useCallback(
    (paramIndex: number) => {
      dispatch(setParamIndex(paramIndex));
    },
    [dispatch]
  );

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      <SelectInput value={experimentIndex} onChange={handleExperimentIndexChange} options={EXPERIMENT_OPTIONS} />
      {paramOptions && <SelectInput value={paramIndex} onChange={handleParamIndexChange} options={paramOptions!} />}
    </div>
  );
};
