import cs from "classnames";

export interface ButtonProps {
  onClick: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "primary", className }) => (
  <button
    type="button"
    onClick={onClick}
    className={cs(
      className,
      "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
      {
        "text-white bg-indigo-600 hover:bg-indigo-700  focus:ring-indigo-500": variant === "primary",
        "border-gray-300  text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500": variant === "secondary",
      }
    )}
  >
    {children}
  </button>
);
