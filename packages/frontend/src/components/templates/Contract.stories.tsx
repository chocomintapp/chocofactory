import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList } from "../../__fixtures__/mock.stories.json";
import { ContractTemplate, ContractTemplateProps } from "./Contract";

const args: ContractTemplateProps = {
  nftContract: nftContractList[0],
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
