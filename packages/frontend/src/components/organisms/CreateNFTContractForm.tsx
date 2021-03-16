import { ethers } from "ethers";
import React from "react";

import { useAuth } from "../../modules/auth";
import { functions } from "../../modules/firebase";
import { chocofactoryContract, chocomoldContract } from "../../modules/web3";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { FormInput } from "../molecules/FormInput";
import { MessageModal, useMessageModal } from "../molecules/MessageModal";

export const CreateNFTContractForm: React.FC = () => {
  const [chainId, setChainId] = React.useState("");
  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");

  const { connectWallet } = useAuth();
  const { messageModal, openModal, closeModal } = useMessageModal();

  const createNFTContract = async () => {
    const { web3, signerAddress } = await connectWallet();
    const functionData = chocomoldContract.interface.encodeFunctionData("initialize", [name, symbol, signerAddress]);
    const digest = ethers.utils.solidityKeccak256(
      ["uint256", "address", "address", "bytes"],
      [chainId, chocofactoryContract.address, chocomoldContract.address, functionData]
    );
    const signature = await web3.eth.personal.sign(digest, signerAddress, "");
    const result = await functions.httpsCallable("createNFTContract")({
      moldAddress: chocomoldContract.address.toLowerCase(),
      signature,
      name,
      symbol,
      signerAddress,
    });
    const { nftContractAddress } = result.data;
    openModal("🎉", `Your NFT address is ${nftContractAddress}!`, "Check", `/contracts/${nftContractAddress}`, false);
  };

  return (
    <>
      <div className="mb-8">
        <Form>
          <FormInput type="text" value={chainId} label="ChainId" setState={setChainId} />
          <FormInput type="text" value={name} label="Name" setState={setName} />
          <FormInput type="text" value={symbol} label="Symbol" setState={setSymbol} />
        </Form>
      </div>
      <Button onClick={createNFTContract} type="primary">
        Create
      </Button>
      {messageModal && <MessageModal {...messageModal} onClickDismiss={closeModal} />}
    </>
  );
};