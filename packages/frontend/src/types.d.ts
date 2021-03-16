export interface NFTContract {
  name: string;
  symbol: string;
  nftContractAddress: string;
  moldAddress: string;
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
