import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";
import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { AuthGuard } from "../molecules/AuthGuard";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

import { Mypage } from "../organisms/Mypage";

export const MypageTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Container>
        <AuthGuard>
          <Mypage nftContractList={[]} />
        </AuthGuard>
      </Container>
      <Footer />
    </Main>
  );
};
