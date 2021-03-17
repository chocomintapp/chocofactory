import React from "react";
import { useParams } from "react-router-dom";
import { CreateNFTTemplate } from "../../../components/templates/CreateNFT";

export const CreateNFT: React.FC = () => {
  const { chainId, nftContractAddress } = useParams<{ chainId: string; nftContractAddress: string }>();

  return <CreateNFTTemplate chainId={chainId} nftContractAddress={nftContractAddress} />;
};

export default CreateNFT;
