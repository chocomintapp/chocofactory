import React from "react";
import { Main, MainProps } from "./Main";

const args: MainProps = {
  children: "children",
};

export default {
  title: "Atoms/Main",
  component: Main,
  args,
};

export const Control: React.FC<MainProps> = (props) => <Main {...props}>{props.children}</Main>;
