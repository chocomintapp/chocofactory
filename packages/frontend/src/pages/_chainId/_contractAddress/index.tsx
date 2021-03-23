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
    const { chocofactoryContract, chocomoldContract, provider } = getContractsForChainId(chainId);
    if (userAddress) {
      provider.getCode(nftContractAddress).then((code: string) => {
        const deployed = code != "0x";
        setDeployed(deployed);
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
            if (chainId != "1" && chainId != "4") {
              provider.getCode(nftContractAddress).then((code: string) => {
                if (code != "0x") {
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
                          return metadataList[i].tokenId;
                        }
                      })
                      .filter((item) => item != undefined);
                    if (!tokenIds) {
                      setMintedTokenIds(tokenIds);
                    }
                  });
                }
              });
            }
          });
      });
      if (chainId == "1" || chainId == "4") {
        const MintEvent = chocomoldContract.filters.Transfer(NULL_ADDRESS, null, null);
        chocomoldContract
          .attach(nftContractAddress)
          .queryFilter(MintEvent, 0, "latest")
          .then((events) => {
            const tokenIds = events.map((event) => event.args!.tokenId.toString());
            setMintedTokenIds(tokenIds);
          });
      }
    }
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
