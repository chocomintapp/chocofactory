import React from "react";

export interface ButtonProps {
  type: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ size, type, disabled, onClick, children }) => {
  const sizeClass = size == "small" ? "px-4 py-1 text-xs rounded-md shadow" : "text-sm py-2 px-4 rounded-md shadow-sm";

  return type === "primary" ? (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-75 focus:outline-none w-full text-white bg-green-400 ${sizeClass}`}
    >
      {children}
    </button>
  ) : type === "secondary" ? (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-75 focus:outline-none w-full text-gray-800 bg-gray-100 ${sizeClass}`}
    >
      {children}
    </button>
  ) : type === "tertiary" ? (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-75 focus:outline-none w-full text-gray-600 bg-white border ${sizeClass}`}
    >
      {children}
    </button>
  ) : (
    <></>
  );
};
