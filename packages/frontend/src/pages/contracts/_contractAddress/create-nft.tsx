import React from "react";
import { useParams } from "react-router-dom";
import { CreateNFTTemplate } from "../../../components/templates/CreateNFT";

export const CreateNFT: React.FC = () => {
  const { nftContractAddress } = useParams<{ nftContractAddress: string }>();

  return <CreateNFTTemplate nftContractAddress={nftContractAddress} />;
};

export default CreateNFT;
