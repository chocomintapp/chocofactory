import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { ContractTemplate } from "../../../components/templates/Contract";
import { useLoadingOverlay } from "../../../components/utils/hooks";
import { firestore, DB_VIRSION } from "../../../modules/firebase";
import { getContractsForChainId, NULL_ADDRESS } from "../../../modules/web3";
import { NFTContract, Metadata } from "../../../types";
export const Contract: React.FC = () => {
  const [nftContract, setNFTContract] = React.useState<NFTContract>();
  const [metadataList, setMetadataList] = React.useState<Metadata[]>([]);
  const [deployed, setDeployed] = React.useState<boolean>(false);
  const [mintedTokenIds, setMintedTokenIds] = React.useState<string[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { nftContractAddress, chainId } = useParams<{ chainId: string; nftContractAddress: string }>();
  const { openLoadingOverlay, closeLoadingOverlay } = useLoadingOverlay();

  const history = useHistory();

  const finishLoading = () => {
    closeLoadingOverlay();
    setIsLoaded(true);
  };

  React.useEffect(() => {
    openLoadingOverlay();
    const { chocomoldContract, provider } = getContractsForChainId(chainId);
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

    provider.getCode(nftContractAddress).then((code: string) => {
      const deployed = code != "0x";
      setDeployed(deployed);
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
          if (metadataList.length == 0 || code == "0x") {
            finishLoading();
            return;
          }
          if (chainId != "1" && chainId != "4") {
            const promises = metadataList.map((metadata) => {
              return chocomoldContract
                .attach(nftContractAddress)
                .ownerOf(metadata.tokenId)
                .catch((err) => err);
            });
            Promise.all(promises).then((resolves) => {
              const tokenIds = resolves
                .map((resolve, i: number) => {
                  if (typeof resolve == "string") {
                    return metadataList[i].tokenId.toString();
                  }
                })
                .filter((item) => item != undefined) as string[];
              setMintedTokenIds(tokenIds);
              finishLoading();
            });
          } else {
            const MintEvent = chocomoldContract.filters.Transfer(NULL_ADDRESS, null, null);
            chocomoldContract
              .attach(nftContractAddress)
              .queryFilter(MintEvent, 0, "latest")
              .then((events) => {
                const tokenIds = events.map((event) => event.args!.tokenId.toString());
                setMintedTokenIds(tokenIds);
                finishLoading();
              });
          }
        });
    });
  }, []);

  return isLoaded ? (
    <ContractTemplate
      nftContract={nftContract}
      metadataList={metadataList}
      deployed={deployed}
      mintedTokenIds={mintedTokenIds}
    />
  ) : (
    <></>
  );
};

export default Contract;
