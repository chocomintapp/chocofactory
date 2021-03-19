import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { errorIcon, confirmIcon } from "../../configs.json";

export interface NotificationToastProps {
  type: "error" | "success";
  text: string;
  onClickDismiss?: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ type, text, onClickDismiss }) => {
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    if (!onClickDismiss) return;
    setTimeout(() => {
      setActive(true);
    }, 0);
    setTimeout(() => {
      setActive(false);
    }, 3400);
    setTimeout(() => {
      onClickDismiss();
    }, 3500);
  }, []);

  const bgColor = type == "error" ? "bg-red-100" : "bg-green-100";

  return (
    <div
      className={`fixed z-1 mt-20 mr-4 top-0 right-0 w-80 h-20 shadow rounded-md overflow-hidden transition-opacity ease-in-out ${bgColor}
        ${active ? " opacity-90" : " opacity-0"}`}
    >
      <div className="px-2 pt-2 pb-4">
        <div className="flex items-start">
          <div>{type == "error" ? errorIcon : confirmIcon}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-bold text-secondary">{type == "error" ? "Error" : "Success"}</p>
            <p className="mt-2 text-xs text-secondary">{text}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button onClick={onClickDismiss} className="rounded-md inline-flex text-tertiary focus:outline-none">
              <span className="sr-only">Close</span>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
