interface Block {
  timestamp: string;
  gasPrice: string;
  gasLimit: string;
  txHash: string;
}

interface User {
  address: string;
}

interface NFT {
  minter: User;
  creatorFeeBips: number;
  nftID: string;
}

interface Token {
  decimals: number;
  name: string;
  symbol: string;
  address: string;
}

export interface TradeNFTI {
  id: string
  feeSeller: string;
  realizedNFTPrice: string;
  internalID: string;
  fFillSB: number;
  block: Block;
  token: Token;
  nfts: NFT[];
  accountBuyer: User;
  accountSeller: User;
  fillAmountBorSA: boolean;
  fillAmountBorSB: boolean;
}

export interface TransferNFTI {
  id: string
  amount: string;
  fromAccount: User;
  toAccount: User;
  accountFromID: number;
  internalID: string;
  block: Block;
  token: Token;
  nfts: NFT[];
  accountBuyer: User;
  accountSeller: User;
}

export enum TransactionTypeEnum {
  ALL = 'All',
  PRIMARY = 'Primary sales',
  SECONDARY = 'NFT trades',
  TRANSFER = 'Transfer',
}

export interface TradeI {
  nftId: {
    src: string;
    groupName: string;
    id: string;
  };
  type: TransactionTypeEnum;
  fillAmountBorSA?: boolean;
  fillAmountBorSB?: boolean;
  from: string;
  timestamp: string;
  to: string;
  units: number | string;
  link: string;
  price?: string | number;
  gas: number;
}

export interface VolumeOrRoyaltyI {
  [key: string]: {amount: number, tokenAddress: string};
}

export interface nftTrackingResponseI {
  data: TradeNFTI[];
  volume: VolumeOrRoyaltyI;
  royalties: VolumeOrRoyaltyI;
}
