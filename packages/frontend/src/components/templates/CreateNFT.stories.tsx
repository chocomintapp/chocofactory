import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList } from "../../__fixtures__/mock.stories.json";
import { CreateNFTTemplate, CreateNFTTemplateProps } from "./CreateNFT";

const args: CreateNFTTemplateProps = {
  chainId: nftContractList[0].chainId,
  nftContractAddress: nftContractList[0].nftContractAddress,
};

export default {
  title: "Templates/CreateNFTTemplate",
  component: CreateNFTTemplate,
  args,
};

export const Control: React.FC<CreateNFTTemplateProps> = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <CreateNFTTemplate {...props}>{props.children}</CreateNFTTemplate>
    </MemoryRouter>
  </RecoilRoot>
);
