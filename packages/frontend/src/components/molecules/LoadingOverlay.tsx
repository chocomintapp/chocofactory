import React from "react";

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed z-1 inset-0">
      <div className="flex p-4 items-center justify-center min-h-screen text-center">
        <div className="absolute inset-0 overflow-hidden bg-black opacity-10"></div>
        <img className="h-10 w-10" src="/img/spinner.svg" />
      </div>
    </div>
  );
};
