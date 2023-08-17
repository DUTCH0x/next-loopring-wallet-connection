interface Block {
  timestamp: string;
  gasPrice: string;
  gasLimit: string;
  txHash: string;
}

interface User {
  address: string;
  id?: string;
}

interface Token {
  decimals: number;
  name: string;
  symbol: string;
  address: string;
}

interface NFT {
  minter?: User;
  creatorFeeBips?: number;
  nftID: string;
}

interface Account {
  address: string;
}

interface NFTTr {
  id: string;
  amount: string;
  __typename: string;
  fromAccount: Account;
  accountFromID: number;
  toAccount: Account;
  nfts: NFTDetails[];
  block: {
    gasPrice: string;
    gasLimit: string;
    txHash: string;
    timestamp: string;
  };
  fee: string;
  feeToken: {
    address: string;
    id: string;
    name: string;
    symbol: string;
    decimals: number;
  };
  metadata: {
    totalNum: number;
    data: NFTMetadata[];
  };
}

interface NFTDetails {
  minter: {
    address: string;
    id: string;
  };
  nftID: string;
  token: string;
  nftType: number;
  creatorFeeBips: number;
}

interface NFTMetadata {
  id: number;
  accountId: number;
  tokenId: number;
  nftData: string;
  tokenAddress: string;
  nftId: string;
  nftType: string;
  total: string;
  locked: string;
  pending: {
    withdraw: string;
    deposit: string;
  };
  deploymentStatus: string;
  isCounterFactualNFT: boolean;
  metadata: {
    uri: string;
    base: {
      name: string;
      decimals: number;
      description: string;
      image: string;
      properties: string;
      localization: string;
      createdAt: number;
      updatedAt: number;
    };
    imageSize: {
      '240-240': string;
      '332-332': string;
      original: string;
    };
    extra: {
      imageData: string;
      externalUrl: string;
      attributes: string;
      backgroundColor: string;
      animationUrl: string;
      youtubeUrl: string;
      minter: string;
    };
    status: number;
    nftType: number;
    network: number;
    tokenAddress: string;
    nftId: string;
  };
  minter: string;
  royaltyPercentage: number;
  preference: {
    favourite: boolean;
    hide: boolean;
  };
  collectionInfo: {
    id: number;
    owner: string;
    name: string;
    contractAddress: string;
    collectionAddress: string;
    baseUri: string;
    nftFactory: string;
    description: string;
    avatar: string;
    banner: string;
    thumbnail: string;
    tileUri: string;
    cached: {
      avatar: string;
      banner: string;
      tileUri: string;
      thumbnail: string;
    };
    deployStatus: string;
    nftType: string;
    times: {
      createdAt: number;
      updatedAt: number;
    };
    extra: {
      properties: {
        isLegacy: boolean;
        isPublic: boolean;
        isCounterFactualNFT: boolean;
        isMintable: boolean;
        isEditable: boolean;
        isDeletable: boolean;
      };
      mintChannel: string;
    };
  };
  updatedAt: number;
  balanceUpdatedAt: number;
}
export interface MostTr {
  total: number;
  nft: NFTTr;
}

interface Metadata {
  name: string;
  description: string;
  image: string;
  animation_url: string;
  royalty_percentage: number;
  collection_metadata: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  properties: {
    Color: string;
    Latin: string;
    Other: string;
    Family: string;
    Flavor: string;
    Animation: string;
  };
}

export interface NftDataType {
  id: string;
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
  metadata: Metadata;
}

interface VolumeOrRoyaltyI {
  [key: string]: { amount: number; tokenAddress: string };
}

export interface TradeOrRoyaltyI {
  data: NftDataType[];
  volume: VolumeOrRoyaltyI;
  royalties?: VolumeOrRoyaltyI;
}

export interface TopBuyerOrSellerI {
  total: number;
  tradeVolumeInFiat: number;
  nft: NftDataType;
}

export interface MostTransferredNftsI {
  total: number;
  nft: {
    id: string;
    amount: string;
    fromAccount: User;
    toAccount: User;
    accountFromID: number;
    nfts: NFT[];
    block: Block;
    metadata: Metadata;
  };
}

export interface TransferredNftsI {
  id: string;
  amount: string;
  fromAccount: User;
  toAccount: User;
  feeToken: {
    decimals: number;
    name: string;
    symbol: string;
    address: string;
    id: string;
  };
  accountFromID: number;
  nfts: NFT[];
  block: Block;
  metadata: Metadata;
}

interface RoyaltiesNftIdI {
  src: string;
  groupName: string;
  id: string;
}

export interface RoyaltiesI {
  type: string;
  from: string;
  to: string;
  nftID: RoyaltiesNftIdI;
  transferredTimes: number;
  units: number;
  // fFillSB: number;
  royalty: number;
  royaltyPercent: number;
  price: number;
  gas: number;
  date: string;
  link: string;
}

interface TransfersI {
  id: string;
  amount: string;
  fromAccount: {
    address: string;
  };
  toAccount: {
    address: string;
  };
  nfts: [
    {
      nftID: string;
    }
  ];
  block: Block;
  fee: string;
  feeToken: {
    decimals: number;
    name: string;
    symbol: string;
    address: string;
    id: string;
  };
  metadata: Metadata;
}

export interface AllTransactionsI {
  type: string;
  from: string;
  to: string;
  nftID: {
    src: string;
    groupName: string;
    id: string;
  };
  transferredTimes: number;
  units: number;
  royalityPercent: number;
  royality: number;
  price: number;
  gas: number;
  date: string;
  link: string;
}
