import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ChainId } from "../../../../contracts/helpers/types";
import { saveIcon, backIcon, errorIcon, confirmIcon } from "../../configs.json";
import { functions } from "../../modules/firebase";
import { getContractsForChainId, chainIdLabels, chainIdValues, getNetworkNameFromChainId } from "../../modules/web3";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";

import { FormInput } from "../molecules/FormInput";
import { FormRadio } from "../molecules/FormRadio";
import { useWallet } from "../utils/hooks";
import { useLoadingOverlay, useNotificationToast } from "../utils/hooks";

export const CreateNFTContractForm: React.FC = () => {
  const [chainId, setChainId] = React.useState<ChainId>(chainIdValues[0]);
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [symbolError, setSymbolError] = React.useState("");
  const { openLoadingOverlay, closeLoadingOverlay } = useLoadingOverlay();
  const { openNotificationToast } = useNotificationToast();

  const { connectWallet } = useWallet();
  const history = useHistory();

  const validateForm = () => {
    let result = true;
    if (!name || name.trim() == "") {
      setNameError("please input name");
      result = false;
    } else if (name.length > 20) {
      setNameError("Please input 20 characters or less");
      result = false;
    } else {
      setNameError("");
    }
    if (!symbol || symbol.trim() == "") {
      setSymbolError("please input symbol");
      result = false;
    } else if (symbol.length > 20) {
      setSymbolError("Please input 20 characters or less");
      result = false;
    } else {
      setSymbolError("");
    }

    return result;
  };

  const createNFTContract = async () => {
    if (!validateForm()) return;
    const { signer, signerAddress } = await connectWallet();
    const signerNetwork = await signer.provider.getNetwork();
    if (chainId != signerNetwork.chainId.toString()) {
      const networkName = getNetworkNameFromChainId(chainId);
      openNotificationToast({ type: "error", text: `Please connect ${networkName} network` });
      return;
    }
    openLoadingOverlay();
    try {
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
      closeLoadingOverlay();
      openNotificationToast({ type: "success", text: "NFT is created!" });
      history.push(`/${chainId}/${nftContractAddress}`);
    } catch (err) {
      closeLoadingOverlay();
      openNotificationToast({ type: "error", text: err.message });
    }
  };

  return (
    <section>
      <div className="flex justify-end mb-4">
        <div className="mr-2">
          <Link to={`/mypage`}>
            <Button size="small" type="secondary">
              Cancel<span className="ml-2">{backIcon}</span>
            </Button>
          </Link>
        </div>
        <div>
          <Button onClick={createNFTContract} size="small" type="primary">
            Save<span className="ml-2">{saveIcon}</span>
          </Button>
        </div>
      </div>
      <div className="mb-8">
        <Form>
          <FormRadio label="Network" labels={chainIdLabels} values={chainIdValues} setState={setChainId} />
          <FormInput type="text" error={nameError} value={name} label="Name" setState={setName} />
          <FormInput type="text" error={symbolError} value={symbol} label="Symbol" setState={setSymbol} />
        </Form>
      </div>
    </section>
  );
};
