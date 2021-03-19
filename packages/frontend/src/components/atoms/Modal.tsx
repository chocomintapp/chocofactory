import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface ModalProps {
  icon: string;
  children: React.ReactNode;
  onClickDismiss?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, icon, onClickDismiss }) => {
  return (
    <section className="fixed z-1 inset-0">
      <div className="flex p-4 items-center justify-center min-h-screen text-center">
        <div onClick={onClickDismiss} className="absolute inset-0 overflow-hidden bg-black opacity-40"></div>
        <div className="bg-white p-6 px-4 transform max-w-lg w-full rounded-xl">
          <p className="focus:outline-none absolute left-4 top-2 text-gray-400">{icon}</p>
          {onClickDismiss && (
            <button onClick={onClickDismiss} className="focus:outline-none absolute right-4 top-2 text-gray-400">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};
