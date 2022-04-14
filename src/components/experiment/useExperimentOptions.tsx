import { SelectOption } from "../UI/SelectInput";

export interface ExperimentOptions extends SelectOption {
  paramOptions?: ExperimentParamOptions[];
}

export interface ExperimentParamOptions extends SelectOption {}

const factoryTypeOptions: ExperimentParamOptions[] = [
  { value: 0, label: "Підприємство 1-го типу" },
  { value: 1, label: "Підприємство 2-го типу" },
  { value: 2, label: "Підприємство 3-го типу" },
  { value: 3, label: "Підприємство 4-го типу" },
  { value: 4, label: "Підприємство 5-го типу" },
];

const productTypeOptions: ExperimentParamOptions[] = [
  { value: 0, label: "Виріб 1-го типу" },
  { value: 1, label: "Виріб 2-го типу" },
  { value: 2, label: "Виріб 3-го типу" },
];

export const percentLabelMapper = (value: number) => `${Math.round(value * 100)}%`;

const experimentOptions: ExperimentOptions[] = [
  {
    value: 0,
    label: "Зміна продуктивності підприємств визначеного типу",
    paramOptions: factoryTypeOptions,
  },
  {
    value: 1,
    label: "Зміна продуктивності при виробництві продукту зазначеного типу",
    paramOptions: productTypeOptions,
  },
  { value: 2, label: "Зміна кількості продукту визначеного типу у комплекті", paramOptions: productTypeOptions },
  { value: 3, label: "Зміна кількості підприємств визначеного типу", paramOptions: factoryTypeOptions },
  { value: 4, label: "Зміна ступеню недомінованості" },
];

export const useExperimentOptions = () => {
  return { factoryTypeOptions, productTypeOptions, experimentOptions };
};
