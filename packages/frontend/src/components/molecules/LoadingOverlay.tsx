import React from "react";

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed z-1 inset-0">
      <div className="flex p-4 items-center justify-center min-h-screen text-center">
        <img className="h-20 w-20 z-10" src="/img/spinner.svg" />
      </div>
    </div>
  );
};
