export interface NFTContract {
  chainId: string;
  factoryAddress: string;
  moldAddress: string;
  nftContractAddress: string;
  name: string;
  symbol: string;
  ownerAddress: string;
  signature: string;
}

export interface Metadata {
  chainId: string;
  nftContractAddress: string;
  tokenId: number;
  name: string;
  description: string;
  image: string;
  animationUrl: string;
  attributes: { trait_type: string; value: string | number }[];
}

export interface ContractCountsForChainId {
  chainId: string;
  count: number;
}
