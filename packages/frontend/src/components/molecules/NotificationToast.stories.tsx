import React from "react";
import { NotificationToast, NotificationToastProps } from "./NotificationToast";

const args: NotificationToastProps = {
  icon: "✅",
  title: "transaction confirmed",
  text: "OK",
};

export default {
  title: "Molecules/NotificationToast",
  component: NotificationToast,
  args,
};

export const Control: React.FC<NotificationToastProps> = (props) => (
  <NotificationToast {...props}>{props.children}</NotificationToast>
);
