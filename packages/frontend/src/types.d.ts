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
  token_id: string;
  name: string;
  description: string;
  image: string;
  animation_url: string;
}
