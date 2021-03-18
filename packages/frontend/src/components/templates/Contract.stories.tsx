import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList, metadataList } from "../../__fixtures__/mock.stories.json";
import { ContractTemplate, ContractTemplateProps } from "./Contract";

const args: ContractTemplateProps = {
  nftContract: nftContractList[0],
  metadataList,
  deployed: false,
  mintedTokenIds: [],
};

export default {
  title: "Templates/ContractTemplate",
  component: ContractTemplate,
  args,
};

export const Control: React.FC<ContractTemplateProps> = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <ContractTemplate {...props}>{props.children}</ContractTemplate>
    </MemoryRouter>
  </RecoilRoot>
);
