import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ChainId } from "../../../../contracts/helpers/types";
import { useAuth } from "../../modules/auth";
import { functions } from "../../modules/firebase";
import { getContractsForChainId, chainIdLabels, chainIdValues } from "../../modules/web3";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { FormInput } from "../molecules/FormInput";
import { FormRadio } from "../molecules/FormRadio";
import { MessageModal, useMessageModal } from "../molecules/MessageModal";

export const CreateNFTContractForm: React.FC = () => {
  const [chainId, setChainId] = React.useState<ChainId>(chainIdValues[0]);
  const [name, setName] = React.useState("");
  const [symbol, setSymbol] = React.useState("");

  const { messageModalProps, openMessageModal, closeMessageModal } = useMessageModal();
  const { connectWallet } = useAuth();
  const history = useHistory();

  const createNFTContract = async () => {
    const { web3, signerAddress } = await connectWallet();

    const { chocomoldContract, chocofactoryContract } = getContractsForChainId(chainId);

    //TODO: Change to typed data sign
    const digest = ethers.utils.solidityKeccak256(
      ["uint256", "address", "address", "string", "string"],
      [chainId, chocofactoryContract.address, chocomoldContract.address, name, symbol]
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
    openMessageModal("🎉", `NFTs are created! \n\n${nftContractAddress}`, "View Details", () => {
      closeMessageModal();
      history.push(`/${chainId}/${nftContractAddress}`);
    });
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <div className="mr-2">
          <Link to={`/mypage`}>
            <Button size="small" type="secondary">
              Cancel<span className="ml-2">↩</span>
            </Button>
          </Link>
        </div>
        <div>
          <Button onClick={createNFTContract} size="small" type="primary">
            Save<span className="ml-2">💾</span>
          </Button>
        </div>
      </div>
      <div className="mb-8">
        <Form>
          <FormRadio label="Network" labels={chainIdLabels} values={chainIdValues} setState={setChainId} />
          <FormInput type="text" value={name} label="Name" setState={setName} />
          <FormInput type="text" value={symbol} label="Symbol" setState={setSymbol} />
        </Form>
      </div>
      {messageModalProps && <MessageModal {...messageModalProps} />}
    </>
  );
};
