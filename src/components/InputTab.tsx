import React from "react";

import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { NumberInput } from "./UI/NumberInput";

export interface InputTabProps {}

export const InputTab: React.FC<InputTabProps> = () => {
  const handleChange = React.useCallback((newValue: number) => {
    console.warn({ newValue });
  }, []);

  return (
    <div className="mt-1">
      <NumberInput value={0} onChange={handleChange} />
    </div>
  );
};
