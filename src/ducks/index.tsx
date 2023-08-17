import { RootStateT } from '@/redux/store';
import { CollectionI, NFTI } from '@/types';
import { ConnectorNames } from '@loopring-web/loopring-sdk';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface WalletConnectI {
  url: string;
  isOpen: boolean;
  isLoading: boolean;
  isScanned: boolean;
}

export interface VerificationModalI {
  enterCode: boolean;
  onEnterCode: boolean;
  email: string;
}

const walletConnectInitialState: WalletConnectI = {
  url: '',
  isOpen: false,
  isLoading: false,
  isScanned: false,
};

export const verificationModalInitialState = {
  enterCode: false,
  onEnterCode: false,
  email: '',
};

// Define a type for the slice state
export interface WebAppReducerI {
  isConnected: boolean;
  isAccountRegistered: boolean;
  walletType: ConnectorNames;
  apiKey: string | null;
  account: string | null | any;
  chainId: number | null;
  accountId: number | null;
  connectionError: boolean;
  isConnectionLoading: boolean;
  isConnectionModalOpen: boolean;
  showUnlockModal: boolean;
  showRegisterModal: boolean;
  userCollection: CollectionI[];
  userNfts: NFTI[];
  walletConnect: WalletConnectI;
  verificationModal: VerificationModalI;
  accountInfo?: any;
}
export interface ConnectedAccountI {
  apiKey: string;
  account: string;
  chainId: number;
  accountId: number;
}

// Define the initial state using that type
const initialState: WebAppReducerI = {
  isConnected: false,
  isAccountRegistered: true,
  walletType: ConnectorNames.Unknown,
  apiKey: null,
  account: null,
  chainId: null,
  connectionError: false,
  isConnectionLoading: false,
  isConnectionModalOpen: false,
  userCollection: [],
  userNfts: [],
  accountId: null,
  showUnlockModal: false,
  showRegisterModal: false,
  walletConnect: walletConnectInitialState,
  verificationModal: verificationModalInitialState,
};

export const webAppReducer: Slice<WebAppReducerI> = createSlice({
  name: 'webApp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setChainId: (state, action: PayloadAction<number | null>) => {
      state.chainId = action.payload;
    },
    setWalletType: (state, action: PayloadAction<ConnectorNames>) => {
      state.walletType = action.payload;
    },
    setApiKey: (state, action: PayloadAction<string | null>) => {
      state.apiKey = action.payload;
    },
    setAccount: (state, action: PayloadAction<string | null>) => {
      state.account = action.payload;
    },
    setShowUnlockModal: (state, action: PayloadAction<boolean>) => {
      state.showUnlockModal = action.payload;
    },
    setVerificationModal: (
      state,
      action: PayloadAction<VerificationModalI>
    ) => {
      state.verificationModal.enterCode = action.payload.enterCode;
      state.verificationModal.onEnterCode = action.payload.onEnterCode;
    },
    setVerificationEmail: (state, action: PayloadAction<string>) => {
      state.verificationModal.email = action.payload;
    },
    setShowRegisterModal: (state, action: PayloadAction<boolean>) => {
      state.showRegisterModal = action.payload;
    },
    setConnectionError: (state, action: PayloadAction<boolean>) => {
      state.connectionError = action.payload;
    },
    setIsAccountRegistered: (state, action: PayloadAction<boolean>) => {
      state.isAccountRegistered = action.payload;
    },
    setIsConnectionLoading: (state, action: PayloadAction<boolean>) => {
      state.isConnectionLoading = action.payload;
    },
    setIsConnectionModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isConnectionModalOpen = action.payload;
    },
    setDisconnectAccount: (state) => {
      state.chainId = null;
      state.account = null;
      state.apiKey = null;
      state.accountId = null;
      state.isConnected = false;
    },
    setIsOpenWalletConnect: (state, action: PayloadAction<boolean>) => {
      state.walletConnect.isOpen = action.payload;
    },
    setUrlWalletConnect: (state, action: PayloadAction<string>) => {
      state.walletConnect.url = action.payload;
    },
    setIsScannedWalletConnect: (state, action: PayloadAction<boolean>) => {
      state.walletConnect.isScanned = action.payload;
    },
    setIsLoadingWalletConnect: (state, action: PayloadAction<boolean>) => {
      state.walletConnect.isLoading = action.payload;
    },
    setConnectAccount: (state, action: PayloadAction<ConnectedAccountI>) => {
      state.chainId = action.payload.chainId;
      state.account = action.payload.account;
      state.apiKey = action.payload.apiKey;
      state.accountId = action.payload.accountId;
      state.isConnected = true;
      state.isConnectionLoading = false;
      state.isConnectionModalOpen = false;
    },
    setUserCollection: (state, action: PayloadAction<CollectionI[]>) => {
      state.userCollection = action.payload;
    },
    setUserNfts: (state, action: PayloadAction<NFTI[]>) => {
      state.userNfts = action.payload;
    },  
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.webApp,
      };
    },
  },
});

export const {
  setApiKey,
  setIsOpenWalletConnect,
  setUrlWalletConnect,
  setIsScannedWalletConnect,
  setIsLoadingWalletConnect,
  setChainId,
  setAccount,
  setIsConnected,
  setWalletType,
  setConnectionError,
  setIsAccountRegistered,
  setIsConnectionLoading,
  setIsConnectionModalOpen,
  setUserCollection,
  setUserNfts,
  setConnectAccount,
  setDisconnectAccount,
  setVerificationEmail,
  setVerificationModal,
  setPriceData,
  setTransactionId,
  setDepositStep,
} = webAppReducer.actions;

export const webAppReducerActions = webAppReducer.actions;

// Other code such as selectors can use the imported `RootStateT` type
export const selectWebApp = (state: RootStateT): WebAppReducerI =>
  state.webAppReducer;

export default webAppReducer.reducer;
