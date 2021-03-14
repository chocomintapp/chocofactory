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
      className="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none w-full text-white text-lg font-medium bg-green-500 border-b-2 border-green-600 py-2 px-4 rounded-xl shadow-md"
    >
      {children}
    </button>
  ) : type === "secondary" ? (
    <button
      onClick={onClick}
      disabled={disabled}
      className="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none w-full text-white text-lg font-medium bg-gray-700 border-b-2 border-gray-800 py-2 px-4 rounded-xl shadow-md"
    >
      {children}
    </button>
  ) : type === "tertiary" ? (
    <button
      onClick={onClick}
      disabled={disabled}
      className="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none w-full text-gray-600 text-lg font-medium bg-white-200  border-b-2 border-gray-100 py-2 px-4 rounded-xl shadow-md"
    >
      {children}
    </button>
  ) : (
    <></>
  );
};
