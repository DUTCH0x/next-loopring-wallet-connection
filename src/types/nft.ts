import { NFTMetaDataI, NftDataI } from '.';

export interface Pending {
  withdraw: string;
  deposit: string;
}

export interface Preference {
  favourite: boolean;
  hide: boolean;
}

export interface Cached {
  avatar: string;
  banner: string;
  tileUri: string;
  thumbnail: string;
}

export interface Times {
  createdAt: number;
  updatedAt: number;
}

export interface Properties {
  isLegacy: boolean;
  isPublic: boolean;
  isCounterFactualNFT: boolean;
  isMintable: boolean;
  isEditable: boolean;
  isDeletable: boolean;
}

export interface Extra {
  properties: Properties;
  mintChannel: string;
}

export interface NFTCollectionInfo {
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
  cached: Cached;
  deployStatus: string;
  nftType: string;
  times: Times;
  extra: Extra;
}

export interface NFTI_Deprecated {
  id: number;
  accountId: number;
  tokenId: number;
  nftData: string;
  tokenAddress: string;
  nftID: string;
  nftType: string;
  total: string;
  locked: string;
  pending: Pending;
  deploymentStatus: string;
  isCounterFactualNFT: boolean;
  minter: string;
  royaltyPercentage: number;
  preference: Preference;
  collectionInfo: NFTCollectionInfo;
  metadata: NftDataI;
}

export interface SlotI {
  balance: string;
}

export interface NFTI {
  collectionInfo: any;
  available: any;
  collectionName: any;
  id: number;
  amount: number;
  nftId: string;
  nftType: string;
  nftCreateId: string;
  tokenAddress: string;
  slots: SlotI[];
  isSynced?: boolean;
  metadata: NFTMetaDataI;
  managementData: any;
  total: string;
}

export interface NFTResponse {
  nfts?: NFTI[];
  totalNfts?: any;
  length?: any;
  map?: any;
}
export interface PropertyI {
  key: any;
  value: any;
}

export interface CreateNftManagementI {
  id: number;
  owner: string;
  accountId?: string;
  name: string;
  description: string;
  collectionName: string;
  collectionImage: string;
  collectionAddress: string;
  amount: string;
  image: string;
  nftId: string;
  nftCreateId: string;
  available: string;
  nftData?: string;
  properties: PropertyI[];
  listName: string | null;
  createdAt?: Date | string;
}

export interface DraftNFTResponseI {
  id: number;
  nftCreateId: string;
  collection: string;
  collectionImage: string;
  owner: string;
  media: string;
  name: string;
  description: string;
  amount: string;
  royalty: string;
  properties: string;
  createdAt: Date;
  selected?: boolean;
}

export interface DeleteDraftNFTRequestI {
  id: number;
  ownerAddress: string;
}

export enum MintStatusEnum {
  QUEUED = 'QUEUED',
  MINTING = 'MINTING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface MintingNftsI {
  id: number;
  media: string;
  name: string;
  status: MintStatusEnum;
}

export interface AttributesI {
  collectionName: string;
}

export interface CollectionDataI {
  nfts: AttributesI[];
}

export interface PropertiesI {
  label: string;
  isChecked: boolean;
}

export type TabTypeT = 'ALL' | 'LIST' | 'COLLECTION' | 'ARCHIVE' | 'BANK0X';

export interface UserListI {
  listName: string;
  collectionName: string;
  collectionAddress: string;
  imageUrls: string[];
  nfts: CreateNftManagementI[];
}

export enum UsageStatusEnum {
  ARCHIVED = 'ARCHIVED',
  UNARCHIVED = 'UNARCHIVED',
}

export interface mintingActivityI {
  name: string;
  gasFee: string;
  image: string;
  nftAmount: string;
  owner: string;
  nftId: string;
  nftStatus: string;
  // completedAt: Date;
  completedAt: number;
}

export type NFTFee = {
  fees: {
    eth: {
      feeMint: string;
      feeTransfer: string;
      feeWithdrawal: string;
    };
    lrc: {
      feeMint: string;
      feeTransfer: string;
      feeWithdrawal: string;
    };
    usdt: {
      feeMint: string;
      feeTransfer: string;
      feeWithdrawal: string;
    };
    usdc: {
      feeMint: string;
      feeTransfer: string;
      feeWithdrawal: string;
    };
  };
};

export type WalletNftsInfo = {
  nfts: { nfts: NFTEntity[] };
  message: string;
};

export interface NFTEntity {
  id: string;
  __typename?: string;
  accounts?: AccountsEntity[];
  nftID: string;
  amount: string;
  slots?: SlotsEntity[];
  block: Block;
  tokenAddress: string;
  minter: Minter;
  metadata: Metadata;
  managementData?: ManagementData;
}
interface AccountsEntity {
  address: string;
}
interface SlotsEntity {
  balance: string;
}
interface Block {
  gasPrice: string;
  gasLimit: string;
  timestamp: string;
}
interface Minter {
  id: string;
  address: string;
}
interface Metadata {
  image: string;
  animation_url: string;
  name: string;
  royalty_percentage: number;
  description: string;
  collection_metadata: string;
  mint_channel: string;
  properties: MetaDataProperties;
  attributes?: AttributesEntity[];
}
interface MetaDataProperties {
  Color?: string;
  Animation?: string;
  color?: string;
  versio?: string;
  Times?: string;
  Animal?: string;
  Image?: string;
}
interface AttributesEntity {
  trait_type: string;
  value: string;
}
interface ManagementData {
  id: number;
  name: string;
  description: string;
  image: string;
  collectionName: string;
  listName: string;
  collectionAddress: string;
  amount: string;
  available: string;
  owner: string;
  nftId: string;
  nftCreateId: string;
  isArchived: boolean;
  createdAt: string;
}
