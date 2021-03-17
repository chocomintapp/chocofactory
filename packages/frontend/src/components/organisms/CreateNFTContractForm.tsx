import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../modules/auth";
import { functions } from "../../modules/firebase";
import { chocofactoryContract, chocomoldContract, chainIdLabels, chainIdValues } from "../../modules/web3";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { FormInput } from "../molecules/FormInput";
import { FormRadio } from "../molecules/FormRadio";

export const CreateNFTContractForm: React.FC = () => {
  const [chainId, setChainId] = React.useState(chainIdValues[0]);
  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");

  const { connectWallet } = useAuth();
  const history = useHistory();

  const createNFTContract = async () => {
    const { web3, signerAddress } = await connectWallet();
    const functionData = chocomoldContract.interface.encodeFunctionData("initialize", [name, symbol, signerAddress]);
    const digest = ethers.utils.solidityKeccak256(
      ["uint256", "address", "address", "bytes"],
      [chainId, chocofactoryContract.address, chocomoldContract.address, functionData]
    );
    const signature = await web3.eth.personal.sign(digest, signerAddress, "");
    const result = await functions.httpsCallable("createNFTContract")({
      chainId,
      factoryAddress: chocofactoryContract.address,
      moldAddress: chocomoldContract.address.toLowerCase(),
      signature,
      name,
      symbol,
      signerAddress,
    });
    const { nftContractAddress } = result.data;
    history.push(`/${chainId}/${nftContractAddress}`);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <div>
          <Link to={`/mypage`}>
            <button className="mb-4 focus:outline-none p-1 px-2 text-xs border rounded-md text-gray-600 mr-2">
              Cancel
            </button>
          </Link>
        </div>
        <div>
          <button
            onClick={createNFTContract}
            className="mb-4 focus:outline-none p-1 px-2 text-xs bg-green-400 rounded-md text-white"
          >
            Save
          </button>
        </div>
      </div>
      <div className="mb-8">
        <Form>
          <FormRadio label="Network" labels={chainIdLabels} values={chainIdValues} setState={setChainId} />
          <FormInput type="text" value={name} label="Name" setState={setName} />
          <FormInput type="text" value={symbol} label="Symbol" setState={setSymbol} />
        </Form>
      </div>
    </>
  );
};
