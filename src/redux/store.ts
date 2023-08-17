import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import webAppReducer from '@/ducks';
import storageSession from 'redux-persist/lib/storage/session';

const webAppPersistConfig = {
  key: 'webAppReducer',
  storage: storageSession,
  whitelist: [
    'isConnected',
    'isAccountRegistered',
    'walletType',
    'apiKey',
    'account',
    'chainId',
    'connectionError',
    'isConnectionLoading',
    'isConnectionModalOpen',
    'userCollection',
    'accountId',
    'showUnlockModal',
    'showRegisterModal',
  ],
};


const rootReducer = combineReducers({
  webAppReducer: persistReducer(webAppPersistConfig, webAppReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootStateT = ReturnType<typeof store.getState>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateT> = useSelector;

export default store;
