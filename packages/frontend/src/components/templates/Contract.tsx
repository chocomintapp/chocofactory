import React from "react";

import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const ContractTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Container>Contract</Container>
      <Footer />
    </Main>
  );
};
