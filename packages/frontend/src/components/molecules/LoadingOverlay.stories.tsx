import React from "react";
import { MemoryRouter } from "react-router-dom";
import { LoadingOverlay } from "./LoadingOverlay";

export default {
  title: "Molecules/LoadingOverlay",
  component: LoadingOverlay,
};

export const Control: React.FC = (props) => (
  <MemoryRouter>
    <LoadingOverlay {...props}>{props.children}</LoadingOverlay>
  </MemoryRouter>
);
