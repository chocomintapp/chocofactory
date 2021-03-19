import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface NotificationToastProps {
  icon: string;
  title: string;
  text: string;
  onClickDismiss?: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ icon, title, text, onClickDismiss }) => {
  React.useEffect(() => {
    if (!onClickDismiss) return;
    setTimeout(() => {
      onClickDismiss();
    }, 3500);
  }, []);

  return (
    <div className="fixed z-1 mt-20 mr-10 top-0 right-0 w-80 h-20 bg-white border shadow rounded-md overflow-hidden">
      <div className="p-2">
        <div className="flex items-start">
          <div>{icon}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-bold text-primary">{title}</p>
            <p className="mt-1 text-xs text-secondary">{text}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onClickDismiss}
              className="bg-white rounded-md inline-flex text-tertiary focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
