import React from "react";

import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const HomeTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Container>Home</Container>
      <Footer />
    </Main>
  );
};
