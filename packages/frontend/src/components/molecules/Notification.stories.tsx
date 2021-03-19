import React from "react";
import { Notification, NotificationProps } from "./Notification";

const args: NotificationProps = {
  icon: "✅",
  title: "transaction confirmed",
  text: "OK",
};

export default {
  title: "Molecules/Notification",
  component: Notification,
  args,
};

export const Control: React.FC<NotificationProps> = (props) => <Notification {...props}>{props.children}</Notification>;
