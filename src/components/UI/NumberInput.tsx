import React from "react";

export interface NumberInputProps {
  value: number;
  onChange: (newValue: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = React.useState(value);

  const handleChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (ev) => {
      const value = Number(ev.target.value);
      if (!isNaN(value)) {
        setInternalValue(value);
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <div className="mt-1">
      <input
        value={internalValue}
        onChange={handleChange}
        type="number"
        className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  );
};
