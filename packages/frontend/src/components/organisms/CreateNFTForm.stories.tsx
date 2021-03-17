import React from "react";
import { MemoryRouter } from "react-router-dom";
import { nftContractList } from "../../__fixtures__/mock.stories.json";
import { CreateNFTForm, CreateNFTFormProps } from "./CreateNFTForm";

const args: CreateNFTFormProps = {
  chainId: nftContractList[0].chainId,
  nftContractAddress: nftContractList[0].nftContractAddress,
};

export default {
  title: "Organisms/CreateNFTForm",
  component: CreateNFTForm,
  args,
};

export const Control: React.FC<CreateNFTFormProps> = (props) => (
  <MemoryRouter>
    <CreateNFTForm {...props}>{props.children}</CreateNFTForm>
  </MemoryRouter>
);
