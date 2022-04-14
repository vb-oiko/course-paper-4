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

export interface ParamRange {
  start: number;
  end: number;
  step: number;
}

export interface ExperimentParamOptions extends SelectOption {}

export const FACTORY_TYPE_OPTIONS: ExperimentParamOptions[] = [
  { value: 0, label: "Підприємство 1-го типу" },
  { value: 1, label: "Підприємство 2-го типу" },
  { value: 2, label: "Підприємство 3-го типу" },
  { value: 3, label: "Підприємство 4-го типу" },
  { value: 4, label: "Підприємство 5-го типу" },
];

export const PRODUCT_TYPE_OPTIONS: ExperimentParamOptions[] = [
  { value: 0, label: "Виріб 1-го типу" },
  { value: 1, label: "Виріб 2-го типу" },
  { value: 2, label: "Виріб 3-го типу" },
];

export const percentLabelMapper = (value: number) => `${Math.round(value * 100)}%`;
export const defaultLabelMapper = (value: number) => `${value}`;

export const MULTIPLIER_PARAM_RANGE = {
  start: 0.5,
  end: 1.5,
  step: 0.1,
};

export const FACTORY_PARAM_RANGE = {
  start: 5,
  end: 50,
  step: 5,
};

export const PRODUCT_PARAM_RANGE = {
  start: 1,
  end: 10,
  step: 1,
};

export const EXPERIMENT_OPTIONS: ExperimentOption[] = [
  {
    value: 0,
    label: "Зміна продуктивності підприємств визначеного типу",
    paramOptions: FACTORY_TYPE_OPTIONS,
    problemTransformer: getFactoryProductivityTransformProblem,
    paramToLabelMapper: percentLabelMapper,
    paramRange: MULTIPLIER_PARAM_RANGE,
  },
  {
    value: 1,
    label: "Зміна продуктивності при виробництві продукту зазначеного типу",
    paramOptions: PRODUCT_TYPE_OPTIONS,
    problemTransformer: getProductProductivityTransformProblem,
    paramToLabelMapper: percentLabelMapper,
    paramRange: MULTIPLIER_PARAM_RANGE,
  },
  {
    value: 2,
    label: "Зміна кількості продукту визначеного типу у комплекті",
    paramOptions: PRODUCT_TYPE_OPTIONS,
    problemTransformer: getProductTransformProblem,
    paramToLabelMapper: defaultLabelMapper,
    paramRange: PRODUCT_PARAM_RANGE,
  },
  {
    value: 3,
    label: "Зміна кількості підприємств визначеного типу",
    paramOptions: FACTORY_TYPE_OPTIONS,
    problemTransformer: getFactoryTransformProblem,
    paramToLabelMapper: defaultLabelMapper,
    paramRange: FACTORY_PARAM_RANGE,
  },
  // { value: 4, label: "Зміна ступеню недомінованості", problemTransformer: getFactoryTransformProblem },
];
