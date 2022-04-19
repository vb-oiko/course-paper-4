import React from "react";

export interface SelectInputProps {
  value: number;
  onChange: (newValue: number) => void;
  options: SelectOption[];
  label?: string;
}

export interface SelectOption {
  value: number;
  label: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({ value, onChange, options, label }) => {
  const handleInput = React.useCallback(
    (e: any) => {
      const newValue = Number(e.target.value);
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <div>
      {label ?? (
        <label htmlFor={label} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={label}
        name={label}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        onInput={handleInput}
        value={value}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
