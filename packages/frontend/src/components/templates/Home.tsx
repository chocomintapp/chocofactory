import React from "react";

import { Main } from "../atoms/Main";
import { Hero } from "../molecules/Hero";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const HomeTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Hero />
      <Footer />
    </Main>
  );
};
