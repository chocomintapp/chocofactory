import React from "react";

export interface ButtonProps {
  type: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ type, disabled, onClick, children }) => {
  return type === "primary" ? (
    <button
      onClick={onClick}
      disabled={disabled}
      className="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none w-full text-white text-sm font-medium bg-green-400 py-2 px-4 rounded-xl"
    >
      {children}
    </button>
  ) : type === "secondary" ? (
    <button
      onClick={onClick}
      disabled={disabled}
      className="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none w-full text-white text-sm font-medium bg-gray-700 py-2 px-4 rounded-xl"
    >
      {children}
    </button>
  ) : type === "tertiary" ? (
    <button
      onClick={onClick}
      disabled={disabled}
      className="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none w-full text-gray-600 text-sm font-medium bg-white py-2 px-4 rounded-xl border"
    >
      {children}
    </button>
  ) : (
    <></>
  );
};
