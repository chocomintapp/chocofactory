import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Hero } from "./Hero";

export default {
  title: "Molecules/Hero",
  component: Hero,
};

export const Control: React.FC = () => (
  <MemoryRouter>
    <Hero />
  </MemoryRouter>
);
