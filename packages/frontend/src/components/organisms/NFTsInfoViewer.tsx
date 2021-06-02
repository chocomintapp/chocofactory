import React from "react";

import { firestore, DB_VIRSION } from "../../modules/firebase";
import { chainIdValues, getNetworkNameFromChainId } from "../../modules/web3";

import { NFTContract, Metadata, NFTContractWithMetadata } from "../../types";

import { ChocoList } from "../molecules/ChocoList";

export interface NFTsInfoViewerProps {
  nftContractList: NFTContract[];
}

export const NFTsInfoViewer: React.FC<NFTsInfoViewerProps> = ({ nftContractList }) => {
  const [nftContractWithMetadata, setNftContractWithMetadata] = React.useState<NFTContractWithMetadata[]>();
  const [contractsCreated, setContractsCreated] = React.useState<any[]>();
  React.useEffect(() => {
    const nftContractWithMetadataList: NFTContractWithMetadata[] = [];

    const promises = nftContractList.map((nftContract) => {
      return firestore
        .collection(DB_VIRSION)
        .doc(nftContract.chainId)
        .collection("nftContract")
        .doc(nftContract.nftContractAddress)
        .collection("metadata")
        .doc("1")
        .get();
    });
    Promise.all(promises).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Metadata;
        const contract = nftContractList.find(
          (element) => element.nftContractAddress == data.nftContractAddress
        ) as NFTContract;

        const nftContractWithMetadata = {
          chainId: contract.chainId,
          factoryAddress: contract.factoryAddress,
          moldAddress: contract.moldAddress,
          nftContractAddress: contract.nftContractAddress,
          name: contract.name,
          symbol: contract.symbol,
          ownerAddress: contract.ownerAddress,
          signature: contract.signature,
          metadata: [data],
        };
        nftContractWithMetadataList.push(nftContractWithMetadata);
      });
      console.log(nftContractWithMetadataList, "nftContractWithMetadataList");
      setNftContractWithMetadata(nftContractWithMetadataList);
    });

    chainIdValues.forEach((chainId) => {
      firestore
        .collection(DB_VIRSION)
        .doc(chainId)
        .collection("nftContract")
        .get()
        .then((snap) => {
          console.log({ chainId, count: snap.size });
        });
    });
  }, [nftContractList]);
  return (
    <section>
      {chainIdValues.map((chainId, i) => {
        return (
          <h3 key={i} className="text-center text-gray-600 font-bold m-4">
            {getNetworkNameFromChainId(chainId)}: {0} projects
          </h3>
        );
      })}

      <div className="container px-2 mx-auto max-w-5xl">
        <ChocoList nftContractWithMetadataList={nftContractWithMetadata as NFTContractWithMetadata[]} />
      </div>
    </section>
  );
};
