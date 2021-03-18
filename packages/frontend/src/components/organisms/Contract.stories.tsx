import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList, metadataList } from "../../__fixtures__/mock.stories.json";
import { Contract, ContractProps } from "./Contract";

const args: ContractProps = {
  nftContract: nftContractList[0],
  metadataList,
  deployed: false,
  mintedTokenIds: [],
};

export default {
  title: "Organisms/Contract",
  component: Contract,
  args,
};

export const Control: React.FC<ContractProps> = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <Contract {...props}>{props.children}</Contract>
    </MemoryRouter>
  </RecoilRoot>
);
