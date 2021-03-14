import React from "react";
import { Container, ContainerProps } from "./Container";

const args: ContainerProps = {
  children: "children",
};

export default {
  title: "Atoms/Container",
  component: Container,
  args,
};

export const Control: React.FC<ContainerProps> = (props) => <Container {...props}>{props.children}</Container>;
