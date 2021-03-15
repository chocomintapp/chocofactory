import { ethers } from "ethers";
import React from "react";

import { functions } from "../../modules/firebase";
import { getWeb3, chocofactoryContract, chocomoldContract } from "../../modules/web3";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { FormInput } from "../molecules/FormInput";
import { MessageModal, useMessageModal } from "../molecules/MessageModal";

export const CreateContractForm: React.FC = () => {
  const [chainId, setChainId] = React.useState("");
  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");

  // const { connectWallet } = useWallet();
  const { messageModal, openModal, closeModal } = useMessageModal();

  const createNFTAddress = async () => {
    // const provider = await connectWallet();
    // const web3 = await getWeb3(provider);
    // const [singerAddress] = await web3.eth.getAccounts();
    // const functionData = chocomoldContract.interface.encodeFunctionData("initialize", [name, symbol, singerAddress]);
    // const digest = ethers.utils.solidityKeccak256(
    //   ["uint256", "address", "address", "bytes"],
    //   [chainId, chocofactoryContract.address, chocomoldContract.address, functionData]
    // );
    // const signature = await web3.eth.personal.sign(digest, singerAddress, "");
    // const result = await functions.httpsCallable("createNFTAddress")({
    //   implementation: chocomoldContract.address,
    //   signature,
    //   name,
    //   symbol,
    //   singerAddress,
    // });
    // const { nftAddress } = result.data;
    // openModal("🎉", `Your NFT address is ${nftAddress}!`, "Check", `/contract/${nftAddress}`, false);
  };

  return (
    <>
      <div className="mb-8">
        <Form>
          <FormInput type="text" label="ChainId" setState={setChainId} />
          <FormInput type="text" label="Name" setState={setName} />
          <FormInput type="text" label="Symbol" setState={setSymbol} />
        </Form>
      </div>
      <Button onClick={createNFTAddress} type="primary">
        Create
      </Button>
      {messageModal && <MessageModal {...messageModal} onClickDismiss={closeModal} />}
    </>
  );
};
