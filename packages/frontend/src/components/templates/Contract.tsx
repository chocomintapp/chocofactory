import React from "react";

import { NFTContract, Metadata } from "../../types";
import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { AuthGuard } from "../organisms/AuthGuard";
import { Contract } from "../organisms/Contract";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export interface ContractTemplateProps {
  nftContract?: NFTContract;
  metadataList: Metadata[];
  deployed: boolean;
  mintedTokenIds: string[];
}

export const ContractTemplate: React.FC<ContractTemplateProps> = ({
  nftContract,
  metadataList,
  deployed,
  mintedTokenIds,
}) => {
  return (
    <Main>
      <Header />
      <Container type="wide">
        <AuthGuard>
          <Contract
            nftContract={nftContract}
            metadataList={metadataList}
            deployed={deployed}
            mintedTokenIds={mintedTokenIds}
          />
        </AuthGuard>
      </Container>
      <Footer />
    </Main>
  );
};
