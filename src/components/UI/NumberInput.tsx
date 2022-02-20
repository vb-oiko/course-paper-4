import React from "react";
import cs from "classnames";

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "min" | "max" | "step" | "value" | "className" | "onChange"
  > {
  value: number;
  onChange: (newValue: number) => void;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, className, ...restProps }) => {
  const [internalValue, setInternalValue] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((ev) => {
    const value = Number(ev.target.value);
    if (!isNaN(value)) {
      setInternalValue(value);
    }
  }, []);

  const handleKeyPress = React.useCallback<React.KeyboardEventHandler<HTMLInputElement>>((e) => {
    if (e.keyCode === 13) {
      inputRef.current?.blur();
    }
  }, []);

  const handleBlur = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(() => {
    onChange(internalValue);
  }, [internalValue, onChange]);

  return (
    <div className={className}>
      <input
        {...restProps}
        value={internalValue}
        onInput={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
        type="number"
        ref={inputRef}
        className={cs(
          className,
          "p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        )}
      />
    </div>
  );
};
