import React from "react";
import { atom, useRecoilState } from "recoil";

import { signatureMessage } from "../../../../common/config";

import { auth, functions } from "../../modules/firebase";
import { initializeWeb3Modal, getWeb3, getEthersSigner } from "../../modules/web3";
import { LoadingOverlay } from "../molecules/LoadingOverlay";
import { MessageModalProps } from "../molecules/MessageModal";
import { MessageModal } from "../molecules/MessageModal";
import { NotificationToastProps } from "../molecules/NotificationToast";
import { NotificationToast } from "../molecules/NotificationToast";

export const loadingOverlayDisplayAtom = atom({
  key: "loadingOverlayDisplay",
  default: false,
});
export const messageModalDisplayAtom = atom({
  key: "messageModalDisplay",
  default: false,
});
export const notificationToastDisplayAtom = atom({
  key: "notificationToastDisplay",
  default: false,
});
export const messageModalPropsAtom = atom<MessageModalProps | undefined>({
  key: "messageModalProps",
  default: undefined,
});

export const notificationToastPropsAtom = atom<NotificationToastProps | undefined>({
  key: "notificationToastProps",
  default: undefined,
});

export const signerAddressAtom = atom({
  key: "signerAddress",
  default: "",
});

export const useLoadingOverlay = () => {
  const [isLoadingOverlayDiplay, setLoadingOverlayDisplay] = useRecoilState(loadingOverlayDisplayAtom);
  const openLoadingOverlay = () => {
    setLoadingOverlayDisplay(true);
  };
  const closeLoadingOverlay = () => {
    setLoadingOverlayDisplay(false);
  };
  return { isLoadingOverlayDiplay, openLoadingOverlay, closeLoadingOverlay };
};

export const useMessageModal = () => {
  const [isMessageModalDisplay, setMessageModalDisplay] = useRecoilState(messageModalDisplayAtom);
  const [messageModalProps, setMessageModalProps] = useRecoilState(messageModalPropsAtom);
  const openMessageModal = (props: MessageModalProps) => {
    setMessageModalProps(props);
    setMessageModalDisplay(true);
  };
  const closeMessageModal = () => {
    setMessageModalDisplay(false);
    setMessageModalProps(undefined);
  };
  return { isMessageModalDisplay, messageModalProps, openMessageModal, closeMessageModal };
};

export const useNotificationToast = () => {
  const [isNotificationToastDisplay, setNotificationToastDisplay] = useRecoilState(notificationToastDisplayAtom);
  const [notificationToastProps, setNotificationToastProps] = useRecoilState(notificationToastPropsAtom);
  const openNotificationToast = (props: NotificationToastProps) => {
    setNotificationToastProps(props);
    setNotificationToastDisplay(true);
  };
  const closeNotificationToast = () => {
    setNotificationToastDisplay(false);
    setNotificationToastProps(undefined);
  };

  return { isNotificationToastDisplay, notificationToastProps, openNotificationToast, closeNotificationToast };
};

interface AtomsRootProps {
  children: React.ReactNode;
}

export const AtomsRootLoader: React.FC<AtomsRootProps> = ({ children }) => {
  const { isLoadingOverlayDiplay } = useLoadingOverlay();
  const { isMessageModalDisplay, messageModalProps } = useMessageModal();
  const { isNotificationToastDisplay, notificationToastProps } = useNotificationToast();
  return (
    <>
      {children}
      {isLoadingOverlayDiplay && <LoadingOverlay />}
      {isMessageModalDisplay && messageModalProps && <MessageModal {...messageModalProps} />}
      {isNotificationToastDisplay && notificationToastProps && <NotificationToast {...notificationToastProps} />}
    </>
  );
};

export const userWallet = () => {
  const [userAddress, setSignerAddressState] = useRecoilState(signerAddressAtom);

  const connectWallet = async () => {
    const provider = await initializeWeb3Modal();
    const signerAddress = provider.selectedAddress.toLowerCase();
    const web3 = await getWeb3(provider);
    const signer = await getEthersSigner(provider);
    if (userAddress != signerAddress) {
      const message = signatureMessage;
      const signature = await web3.eth.personal.sign(`${message}${signerAddress}`, signerAddress, "");
      const response = await functions.httpsCallable("connectWallet")({
        signature,
        signerAddress,
      });
      auth.signInWithCustomToken(response.data);
      setSignerAddressState(signerAddress);
    }
    return { web3, signer, signerAddress };
  };

  const disconnectWallet = () => {
    console.log("log out...");
  };
  return { userAddress, connectWallet, disconnectWallet };
};
