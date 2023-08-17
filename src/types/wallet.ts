export type WalletInfo = {
  ensName: {
    name: string;
    address: string;
  };
  layer1EthBalance: string;
  layer2EthBalance: string;
  account: string;
};

export type SearchEnsOrWalletIdInfo = {
  wallet: string;
  message: string;
};

export type WalletCurrenciesInfo = {
  user: {
    totalCurrency: number;
    payout: {
      [key: string]: {
        price: number;
        name: string;
        amount: number;
        balance: number;
      };
    };
  };
  message: string;
};

interface Block {
  gasPrice: string;
  gasLimit: string;
  timestamp: string;
  txHash?: string;
}

interface FeeToken {
  address: string;
  id?: string;
  name: string;
  symbol: string;
  decimals: number;
}

interface Token {
  address: string;
  symbol: string;
  decimals: number;
}
export interface IResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

interface TokenAdressAmount {
  amount: number;
  tokenAddress: string;
}

export type WalletTransactionsInfo = {
  transactions: TransactionsEntity[];
};

interface NftsEntity {
  nftID: string;
}
interface SlotsEntity {
  balance: string;
}
interface Minter {
  id: string;
  address: string;
}

export interface WalletGasInfo {
  gas: Gas;
}
interface Gas {
  gas: {
    [symbol: string]: {
      amount: number;
    };
  };
  transactions: TransactionsEntity[];
}

interface TransactionsEntity {
  id: string;
  internalID: string;
  __typename: string;
  block: Block;
  to?: string;
  from?: string;
  amount?: string;
  fee?: string;
  feeToken?: FeeToken;
  token?: Token;
  accounts?: AddressEntity[];
  accountFromID?: number;
  accountToID?: number;
  toAccount?: AddressEntity;
  fromAccount?: AddressEntity;
  nfts?: NftsEntity[];
  nftID?: string;
  slots?: SlotsEntity[];
  tokenAddress?: string;
  minter?: Minter;
}

interface AddressEntity {
  address: string;
}

export interface WalletCurrencyTxnInfo {
  currencies: {
    [txnType: string]: {
      [symbol: string]: TokenAdressAmount;
    };
  };
  message: string;
}

export enum WalletCurrencyTxnType {
  all = 'all',
  deposits = 'deposits',
  transfers = 'transfers',
  withdrawals = 'withdrawals',
}

export enum WalletTxnType {
  all = 'all',
  deposits = 'deposits',
  transfers = 'transfers',
  withdrawals = 'withdrawals',
  swap = 'swaps',
}
