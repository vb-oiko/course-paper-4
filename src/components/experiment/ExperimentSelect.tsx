import React from "react";
import { ExperimentParams } from "../../core/experiment";
import { getFactoryProductivityTransformProblem } from "../../core/experiment/problemTransformers";
import { SelectInput } from "../UI/SelectInput";
import { useExperimentOptions } from "./useExperimentOptions";

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
  const { experimentOptions } = useExperimentOptions();

  React.useEffect(() => {
    onChange(initialParams);
  });

  const [experimentIndex, setExperimentIndex] = React.useState(0);
  const [paramIndex, setParamIndex] = React.useState(0);

  const handleExperimentIndexChange = React.useCallback((newValue: number) => {
    setExperimentIndex(newValue);
    setParamIndex(0);
  }, []);

  const handleParamIndexChange = React.useCallback((newValue: number) => {
    setParamIndex(newValue);
  }, []);

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      <SelectInput value={experimentIndex} onChange={handleExperimentIndexChange} options={experimentOptions} />
      {experimentOptions[experimentIndex].paramOptions && (
        <SelectInput
          value={paramIndex}
          onChange={handleParamIndexChange}
          options={experimentOptions[experimentIndex].paramOptions!}
        />
      )}
    </div>
  );
};
