import React from "react";
import { Button } from "../atoms/Button";
import { Modal } from "../atoms/Modal";

export interface MessageModalProps {
  icon: string;
  messageText: string;
  buttonText?: string;
  onClickConfirm?: () => void;
  onClickDismiss?: () => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  icon,
  messageText,
  buttonText,
  onClickConfirm,
  onClickDismiss,
}) => {
  return (
    <Modal onClickDismiss={onClickDismiss} icon={icon}>
      <p className="my-8 text-xs font-bold text-gray-600">{messageText}</p>
      {onClickConfirm && (
        <div className="flex justify-center">
          <div className="w-6/12">
            <Button onClick={onClickConfirm} type="tertiary">
              {buttonText}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export const useMessageModal = () => {
  const [messageModalProps, setMessageModalProps] = React.useState<MessageModalProps | undefined>(undefined);

  const openMessageModal = (
    icon: string,
    messageText: string,
    buttonText?: string,
    onClickConfirm?: () => void,
    onClickDismiss?: () => void
  ) => {
    setMessageModalProps({
      icon,
      messageText,
      buttonText,
      onClickConfirm,
      onClickDismiss,
    });
  };

  const closeMessageModal = () => {
    setMessageModalProps(undefined);
  };

  return { messageModalProps, openMessageModal, closeMessageModal };
};
