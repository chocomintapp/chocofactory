import React from "react";

import { Main } from "../atoms/Main";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
import { Hero } from "../organisms/Hero";

export const HomeTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Hero />
      <Footer />
    </Main>
  );
};
