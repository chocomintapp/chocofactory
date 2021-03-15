import { ethers } from "ethers";
import React from "react";

import { functions } from "../../modules/firebase";
import { chocofactoryContract, chocomoldContract, useWallet, getWeb3 } from "../../modules/web3";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { FormInput } from "../molecules/FormInput";

export const CreateContractForm: React.FC = () => {
  const [chainId, setChainId] = React.useState("");
  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");

  const { connectWallet } = useWallet();

  const createContract = async () => {
    const provider = await connectWallet();
    const web3 = await getWeb3(provider);
    const [singerAddress] = await web3.eth.getAccounts();
    const functionData = chocomoldContract.interface.encodeFunctionData("initialize", [name, symbol, singerAddress]);
    console.log(functionData);
    const messageHash = ethers.utils.solidityKeccak256(
      ["uint256", "address", "address", "bytes"],
      [chainId, chocofactoryContract.address, chocomoldContract.address, functionData]
    );
    const signature = await web3.eth.personal.sign(messageHash, singerAddress, "");
    await functions.httpsCallable("createContract")({
      implementation: chocomoldContract.address,
      signature,
      name,
      symbol,
    });
  };

  const handleNameChange = () => {
    console.log("ok");
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
      <Button onClick={createContract} type="primary">
        Create
      </Button>
    </>
  );
};
