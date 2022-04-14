import React from "react";
import { ExperimentParams } from "../../core/experiment";
import { getFactoryProductivityTransformProblem } from "../../core/experiment/problemTransformers";
import { experimentOptions } from "./useExperimentOptions";

export interface ExperimentState {
  experimentIndex: number;
  paramIndex: number;
}

const initialExperimentState: ExperimentState = {
  experimentIndex: 0,
  paramIndex: 0,
};

export const useExperimentState = () => {
  const [state, setState] = React.useState(initialExperimentState);

  const setExperimentIndex = React.useCallback(
    (newValue: number) => {
      setState({
        ...state,
        experimentIndex: newValue,
        paramIndex: 0,
      });
    },
    [state]
  );

  const setParamIndex = React.useCallback(
    (newValue: number) => {
      setState({
        ...state,
        paramIndex: newValue,
      });
    },
    [state]
  );
  const selectParamOptions = React.useCallback(() => {
    return experimentOptions[state.experimentIndex].paramOptions;
  }, [state.experimentIndex]);

  const selectExperimentParams = (): ExperimentParams => {
    return {
      start: 0.5,
      end: 1.5,
      step: 0.1,
      transformProblem: getFactoryProductivityTransformProblem(0),
      paramToLabelMapper: (value: number) => `${Math.round(value * 100)}%`,
    };
  };

  console.warn(state);

  return { state, setExperimentIndex, setParamIndex, selectExperimentParams, selectParamOptions };
};
