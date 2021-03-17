import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList, metadataList } from "../../__fixtures__/mock.stories.json";
import { NFT, NFTProps } from "./NFT";

const args: NFTProps = {
  nftContract: nftContractList[0],
  metadata: metadataList[0],
};

export default {
  title: "Organisms/NFT",
  component: NFT,
  args,
};

export const Control: React.FC<NFTProps> = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <NFT {...props}>{props.children}</NFT>
    </MemoryRouter>
  </RecoilRoot>
);
