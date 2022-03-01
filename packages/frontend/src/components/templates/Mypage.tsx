import React from "react";

import { NFTContract } from "../../types";
import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { AuthGuard } from "../organisms/AuthGuard";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

import { Mypage } from "../organisms/Mypage";

export interface MypageTemplateProps {
  nftContractList: NFTContract[];
}

export const MypageTemplate: React.FC<MypageTemplateProps> = ({ nftContractList }) => {
  return (
    <Main>
      <Header />
      <Container type="wide">
        <AuthGuard>
          <Mypage nftContractList={nftContractList} />
        </AuthGuard>
      </Container>
      <Footer />
    </Main>
  );
};
