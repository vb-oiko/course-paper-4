import { LabelMapper, TransformProblem } from "../../core/experiment";
import {
  getFactoryTransformProblem,
  getFactoryProductivityTransformProblem,
  getProductProductivityTransformProblem,
  getProductTransformProblem,
} from "../../core/experiment/problemTransformers";
import { SelectOption } from "../UI/SelectInput";

export type ExperimentType =
  | "factory_productivity"
  | "product_productivity"
  | "product_set"
  | "factory_number"
  | "alpha";

export interface ExperimentOption extends SelectOption {
  paramOptions?: ExperimentParamOptions[];
  problemTransformer: (indexValue: number) => TransformProblem;
  paramToLabelMapper: LabelMapper;
  paramRange: ParamRange;
  type: ExperimentType;
  getHeaders: (paramIndex: number) => ExperimentHeaders;
}

export interface ExperimentHeaders {
  resultHeader: string;
  sourceHeader: string;
  cornerCell: string;
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

export const ALPHA_PARAM_RANGE = {
  start: 0.55,
  end: 1,
  step: 0.05,
};

export const EXPERIMENT_OPTIONS: ExperimentOption[] = [
  {
    value: 0,
    label: "Зміна продуктивності підприємств визначеного типу",
    paramOptions: FACTORY_TYPE_OPTIONS,
    problemTransformer: getFactoryProductivityTransformProblem,
    paramToLabelMapper: percentLabelMapper,
    paramRange: MULTIPLIER_PARAM_RANGE,
    type: "factory_productivity",
    getHeaders: (paramIndex: number) => ({
      resultHeader: `змін значень розв'язку задачі в залежності від зміни продуктивності (у відсотках) на підприємствах ${
        paramIndex + 1
      }-го типу для усіх продуктів у відсотках від початкових значень`,
      sourceHeader: `Таблиця вихідних значень експерименту при зміні продуктивності виробництва на підприємствах ${
        paramIndex + 1
      }-го типу для усіх типів продуктів у відсотках від початкових значень`,
      cornerCell: `Відсоток зміни продуктивності на підприємствах ${paramIndex + 1}-го типу`,
    }),
  },
  {
    value: 1,
    label: "Зміна продуктивності при виробництві продукту зазначеного типу",
    paramOptions: PRODUCT_TYPE_OPTIONS,
    problemTransformer: getProductProductivityTransformProblem,
    paramToLabelMapper: percentLabelMapper,
    paramRange: MULTIPLIER_PARAM_RANGE,
    type: "product_productivity",
    getHeaders: (paramIndex: number) => ({
      resultHeader: `змін значень розв'язку задачі в залежності від зміни продуктивності (у відсотках) при виробництві ${
        paramIndex + 1
      }-го виробу на підприємствах усіх типів`,
      sourceHeader: `Таблиця вихідних значень експерименту при зміні продуктивності виробництва ${
        paramIndex + 1
      }-го виробу на підприємствах усіх типів у відсотках від початкових значень`,
      cornerCell: `Відсоток зміни продуктивності при виробництві виробу ${paramIndex + 1}-го типу`,
    }),
  },
  {
    value: 2,
    label: "Зміна кількості продукту визначеного типу у комплекті",
    paramOptions: PRODUCT_TYPE_OPTIONS,
    problemTransformer: getProductTransformProblem,
    paramToLabelMapper: defaultLabelMapper,
    paramRange: PRODUCT_PARAM_RANGE,
    type: "product_set",
    getHeaders: (paramIndex: number) => ({
      resultHeader: `змін значень розв'язку задачі в залежності від зміни кількості виробів ${
        paramIndex + 1
      }-го типу у комплекті `,
      sourceHeader: "",
      cornerCell: `Кількість виробів ${paramIndex + 1}-го типу у комплекті`,
    }),
  },
  {
    value: 3,
    label: "Зміна кількості підприємств визначеного типу",
    paramOptions: FACTORY_TYPE_OPTIONS,
    problemTransformer: getFactoryTransformProblem,
    paramToLabelMapper: defaultLabelMapper,
    paramRange: FACTORY_PARAM_RANGE,
    type: "factory_number",
    getHeaders: (paramIndex: number) => ({
      resultHeader: `змін значень розв'язку задачі в залежності від зміни загальної кількості підприємств ${
        paramIndex + 1
      }-го типу `,
      sourceHeader: "",
      cornerCell: `Кількість підприємств ${paramIndex + 1}-го типу `,
    }),
  },
  {
    value: 4,
    label: "Зміна ступеню недомінованості",
    problemTransformer: getFactoryTransformProblem,
    paramToLabelMapper: defaultLabelMapper,
    paramRange: ALPHA_PARAM_RANGE,
    type: "alpha",
    getHeaders: (_paramIndex: number) => ({
      resultHeader: `змін значень розв'язку задачі оптиміста, чіткої задачі та задачі песиміста в залежності від зміни значення ступеню недомінованості`,
      sourceHeader: "",
      cornerCell: "Значення ступеню недомінованості",
    }),
  },
];
