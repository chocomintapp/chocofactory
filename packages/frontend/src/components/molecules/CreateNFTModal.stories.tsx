import React from "react";
import { MemoryRouter } from "react-router-dom";
import { nftContractList } from "../../__fixtures__/mock.stories.json";
import { CreateNFTModal, CreateNFTModalProps } from "./CreateNFTModal";

const args: CreateNFTModalProps = {
  chainId: nftContractList[0].chainId,
  nftContractAddress: nftContractList[0].nftContractAddress,
};

export default {
  title: "Organisms/CreateNFTModal",
  component: CreateNFTModal,
  args,
};

export const Control: React.FC<CreateNFTModalProps> = (props) => (
  <MemoryRouter>
    <CreateNFTModal {...props}>{props.children}</CreateNFTModal>
  </MemoryRouter>
);
