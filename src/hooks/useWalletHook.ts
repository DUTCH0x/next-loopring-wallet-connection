import {
  WebAppReducerI,
  setIsConnected,
  setIsConnectionLoading,
  setIsConnectionModalOpen,
  setIsOpenWalletConnect,
  setWalletType,
  webAppReducerActions,
} from '@/ducks';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ConnectorNames } from '@loopring-web/loopring-sdk';
import { connectProvides, walletServices } from '@/web3-provider';
import { deleteCookie } from 'cookies-next';
import { shallowEqual } from 'react-redux';

const useWalletHook = () => {
  const dispatch = useAppDispatch();

  const { account, apiKey } = useAppSelector((state) => {
    const { account, apiKey } = state.webAppReducer as WebAppReducerI;
    return { account, apiKey };
  }, shallowEqual);

  const disconnectAccount = () => {
    walletServices.sendDisconnect('', 'disconnect');
    dispatch(webAppReducerActions.setChainId(null));
    dispatch(webAppReducerActions.setAccount(null));
    dispatch(setIsConnected(false));
    deleteCookie('ACCOUNT');
    deleteCookie('APIKEY');
    deleteCookie('ACCOUNTID');
  };

  const connectAccount = async (
    connectorName: ConnectorNames,
    signOnly?: boolean
  ) => {
    if (!signOnly) {
      disconnectAccount();
    }
    if (connectorName !== ConnectorNames.WalletConnect)
      dispatch(setIsConnectionLoading(true));

    switch (connectorName) {
      case ConnectorNames.Coinbase:
        await connectProvides.Coinbase({});
        break;
      case ConnectorNames.Gamestop:
        await connectProvides.GameStop({ darkMode: true });
        break;
      case ConnectorNames.WalletConnect:
        await connectProvides.WalletConnect({
          account: undefined,
          darkMode: true,
        });
        break;
      default:
        await connectProvides.MetaMask({});
        break;
    }
    if (!signOnly) {
      dispatch(setIsConnectionLoading(false));
      dispatch(setIsConnectionModalOpen(false));
      dispatch(setIsOpenWalletConnect(false));
      dispatch(setWalletType(connectorName));
    }
  };

  return {
    connectAccount,
    disconnectAccount,
  };
};

export default useWalletHook;
