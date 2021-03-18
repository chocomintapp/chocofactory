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
    const { signer, signerAddress } = await connectWallet();
    const ownerAddress = signerAddress.toLowerCase();
    const { chocomoldContract, chocofactoryContract } = getContractsForChainId(chainId);
    const domain = {
      name: "Chocofactory",
      version: "1",
      chainId,
      verifyingContract: chocofactoryContract.address,
    };
    const types = {
      Choco: [
        { name: "implementation", type: "address" },
        { name: "name", type: "string" },
        { name: "symbol", type: "string" },
      ],
    };
    const value = {
      test: "chocomoldContract",
      implementation: chocomoldContract.address,
      name: name,
      symbol: symbol,
    };
    const signature = await signer._signTypedData(domain, types, value);
    const result = await functions.httpsCallable("createNFTContract")({
      chainId,
      factoryAddress: chocofactoryContract.address,
      moldAddress: chocomoldContract.address.toLowerCase(),
      signature,
      name,
      symbol,
      ownerAddress,
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
