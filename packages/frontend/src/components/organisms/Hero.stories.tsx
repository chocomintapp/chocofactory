import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Hero } from "./Hero";

export default {
  title: "Organisms/Hero",
  component: Hero,
};

export const Control: React.FC = (props) => (
  <MemoryRouter>
    <Hero {...props}>{props.children}</Hero>
  </MemoryRouter>
);
