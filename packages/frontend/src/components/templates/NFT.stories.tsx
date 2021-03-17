import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList, metadataList } from "../../__fixtures__/mock.stories.json";
import { NFTTemplate, NFTTemplateProps } from "./NFT";

const args: NFTTemplateProps = {
  nftContract: nftContractList[0],
  metadata: metadataList[0],
};

export default {
  title: "Templates/NFTTemplate",
  component: NFTTemplate,
  args,
};

export const Control: React.FC<NFTTemplateProps> = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <NFTTemplate {...props}>{props.children}</NFTTemplate>
    </MemoryRouter>
  </RecoilRoot>
);
