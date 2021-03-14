import React from "react";

import { Modal, ModalProps } from "./Modal";

const args: ModalProps = {
  icon: "🎉",
  children: "content",
};

export default {
  title: "atoms/Modal",
  component: Modal,
  args,
};

export const Control: React.FC<ModalProps> = (props) => <Modal {...props}>{props.children}</Modal>;
