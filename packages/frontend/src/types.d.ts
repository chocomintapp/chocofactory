export interface NFTContract {
  chainId: string;
  factoryAddress: string;
  moldAddress: string;
  nftContractAddress: string;
  name: string;
  symbol: string;
  ownerAddress: string;
  signature?: string;
}

export interface Metadata {
  nftContractAddress: string;
  tokenId: string;
  name: string;
  description: string;
  image: string;
  animationUrl: string;
}
