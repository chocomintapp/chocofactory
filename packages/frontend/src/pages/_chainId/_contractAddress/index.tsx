import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { ContractTemplate } from "../../../components/templates/Contract";
import { useWallet } from "../../../components/utils/hooks";
import { firestore, DB_VIRSION } from "../../../modules/firebase";
import { getContractsForChainId, NULL_ADDRESS } from "../../../modules/web3";
import { NFTContract, Metadata } from "../../../types";

export const Contract: React.FC = () => {
  const [nftContract, setNFTContract] = React.useState<NFTContract>();
  const [metadataList, setMetadataList] = React.useState<Metadata[]>([]);
  const [deployed, setDeployed] = React.useState<boolean>(false);
  const [mintedTokenIds, setMintedTokenIds] = React.useState<string[]>([]);

  const { nftContractAddress, chainId } = useParams<{ chainId: string; nftContractAddress: string }>();

  const { userAddress } = useWallet();

  const history = useHistory();

  React.useEffect(() => {
    if (userAddress) {
      firestore
        .collection(DB_VIRSION)
        .doc(chainId)
        .collection("nftContract")
        .doc(nftContractAddress)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setNFTContract(doc.data() as NFTContract);
          } else {
            history.push("/mypage");
          }
        })
        .catch((err) => {
          history.push("/mypage");
        });

      firestore
        .collection(DB_VIRSION)
        .doc(chainId)
        .collection("nftContract")
        .doc(nftContractAddress)
        .collection("metadata")
        .orderBy("tokenId")
        .get()
        .then((querySnapshot) => {
          const metadataList: Metadata[] = [];
          querySnapshot.forEach((doc) => {
            metadataList.push(doc.data() as Metadata);
          });
          setMetadataList(metadataList);
        });
    }

    const { chocofactoryContract, chocomoldContract, provider } = getContractsForChainId(chainId);
    console.log(chainId);
    provider.getBlockNumber().then((latest) => {
      console.log(latest);
      const DeployEvent = chocofactoryContract.filters.Deployed(null, null, nftContractAddress, null, null);
      chocofactoryContract.queryFilter(DeployEvent, latest - 999, latest).then((events) => {
        console.log(events);
        setDeployed(events.length > 0);
      });
      const MintEvent = chocomoldContract.filters.Transfer(NULL_ADDRESS, null, null);
      chocomoldContract
        .attach(nftContractAddress)
        .queryFilter(MintEvent, latest - 999, latest)
        .then((events) => {
          console.log(events);
          const tokenIds = events.map((event) => event.args!.tokenId.toString());
          setMintedTokenIds(tokenIds);
        });
    });
  }, [userAddress]);

  return (
    <ContractTemplate
      nftContract={nftContract}
      metadataList={metadataList}
      deployed={deployed}
      mintedTokenIds={mintedTokenIds}
    />
  );
};

export default Contract;
