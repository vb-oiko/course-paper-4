import React from "react";
import { ExperimentParams } from "../../core/experiment";
import { getFactoryProductivityTransformProblem } from "../../core/experiment/problemTransformers";
import { EXPERIMENT_OPTIONS } from "./experimentOptions";

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
    return EXPERIMENT_OPTIONS[state.experimentIndex].paramOptions;
  }, [state.experimentIndex]);

  const selectExperimentParams = React.useCallback((): ExperimentParams => {
    const experiment = EXPERIMENT_OPTIONS[state.experimentIndex];

    return {
      ...experiment.paramRange,
      transformProblem: experiment.problemTransformer(state.paramIndex),
      paramToLabelMapper: experiment.paramToLabelMapper,
    };
  }, [state.experimentIndex, state.paramIndex]);

  return { state, setExperimentIndex, setParamIndex, selectExperimentParams, selectParamOptions };
};
