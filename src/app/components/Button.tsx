import React from "react";

interface ButtonProps {
  onClick: () => void;
  label?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  type = "button",
  className = "",
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-300 ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
      } ${className}`}
      disabled={disabled}
    >
      {label}
      {children}
    </button>
  );
};

export default Button;