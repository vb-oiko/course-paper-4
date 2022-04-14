import { LabelMapper, TransformProblem } from "../../core/experiment";
import {
  getFactoryTransformProblem,
  getFactoryProductivityTransformProblem,
  getProductProductivityTransformProblem,
  getProductTransformProblem,
} from "../../core/experiment/problemTransformers";
import { SelectOption } from "../UI/SelectInput";

export interface ExperimentOption extends SelectOption {
  paramOptions?: ExperimentParamOptions[];
  problemTransformer: (indexValue: number) => TransformProblem;
  paramToLabelMapper: LabelMapper;
  paramRange: ParamRange;
}

export interface ExperimentParamOptions extends SelectOption {}

export const factoryTypeOptions: ExperimentParamOptions[] = [
  { value: 0, label: "Підприємство 1-го типу" },
  { value: 1, label: "Підприємство 2-го типу" },
  { value: 2, label: "Підприємство 3-го типу" },
  { value: 3, label: "Підприємство 4-го типу" },
  { value: 4, label: "Підприємство 5-го типу" },
];

export const productTypeOptions: ExperimentParamOptions[] = [
  { value: 0, label: "Виріб 1-го типу" },
  { value: 1, label: "Виріб 2-го типу" },
  { value: 2, label: "Виріб 3-го типу" },
];

export const percentLabelMapper = (value: number) => `${Math.round(value * 100)}%`;
export const defaultLabelMapper = (value: number) => `${value}`;

export interface ParamRange {
  start: number;
  end: number;
  step: number;
}

export const multiplierParamRange = {
  start: 0.5,
  end: 1.5,
  step: 0.1,
};

export const factoryParamRange = {
  start: 5,
  end: 50,
  step: 5,
};

export const productParamRange = {
  start: 1,
  end: 10,
  step: 1,
};

export const experimentOptions: ExperimentOption[] = [
  {
    value: 0,
    label: "Зміна продуктивності підприємств визначеного типу",
    paramOptions: factoryTypeOptions,
    problemTransformer: getFactoryProductivityTransformProblem,
    paramToLabelMapper: percentLabelMapper,
    paramRange: multiplierParamRange,
  },
  {
    value: 1,
    label: "Зміна продуктивності при виробництві продукту зазначеного типу",
    paramOptions: productTypeOptions,
    problemTransformer: getProductProductivityTransformProblem,
    paramToLabelMapper: percentLabelMapper,
    paramRange: multiplierParamRange,
  },
  {
    value: 2,
    label: "Зміна кількості продукту визначеного типу у комплекті",
    paramOptions: productTypeOptions,
    problemTransformer: getProductTransformProblem,
    paramToLabelMapper: defaultLabelMapper,
    paramRange: productParamRange,
  },
  {
    value: 3,
    label: "Зміна кількості підприємств визначеного типу",
    paramOptions: factoryTypeOptions,
    problemTransformer: getFactoryTransformProblem,
    paramToLabelMapper: defaultLabelMapper,
    paramRange: factoryParamRange,
  },
  // { value: 4, label: "Зміна ступеню недомінованості", problemTransformer: getFactoryTransformProblem },
];
