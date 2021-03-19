import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Loader } from "./Loader";

export default {
  title: "Molecules/Loader",
  component: Loader,
};

export const Control: React.FC = (props) => (
  <MemoryRouter>
    <Loader {...props}>{props.children}</Loader>
  </MemoryRouter>
);
