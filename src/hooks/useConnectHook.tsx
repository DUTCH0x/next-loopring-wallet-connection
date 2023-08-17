import { toast } from 'react-toastify';

import {
  setConnectAccount,
  setConnectionError,
  setDisconnectAccount,
  setUrlWalletConnect,
  setIsScannedWalletConnect,
  setIsLoadingWalletConnect,
  webAppReducerActions,
} from '@/ducks';
import { LoopringService } from '@/lib/LoopringService';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ChainId } from '@loopring-web/loopring-sdk';
import { useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import useConnectHelper, {
  handleConnectI,
  handleErrorI,
  handleProcessingI,
} from '../helpers/useConnectHelper';
import { CHAINS, switchNetwork } from '@/helpers/chain';
import useWalletHook from './useWalletHook';

const useConnectHook = () => {
  const { disconnectAccount } = useWalletHook();


  const loopringService = useMemo(() => new LoopringService(), []);
  const dispatch = useAppDispatch();

  const { walletType, account } = useAppSelector((state) => {
    const { walletType, account } = state.webAppReducer;
    return { walletType, account };
  }, shallowEqual);

  const configuredChainId = 1;

  const onWalletConnectHandler = async (
    connectedAccount: string,
    connectedChainId: ChainId | 'unknown'
  ) => {
    try {
      dispatch(setConnectionError(false));
      dispatch(webAppReducerActions.setShowUnlockModal(true));

      if (
        account !== connectedAccount &&
        connectedChainId === configuredChainId
      ) {
        dispatch(setDisconnectAccount(null));
        disconnectAccount();
      }

      if (connectedChainId !== configuredChainId) {
        toast.warn(`Connect to ${CHAINS[configuredChainId]}`);
        await switchNetwork();
        return;
      }

      if (
        account === connectedAccount &&
        connectedChainId === configuredChainId
      )
        return;

      const { accInfo } = await loopringService.exchangeAPI.getAccount({
        owner: connectedAccount,
      });

      console.log("accInfo", accInfo);


      if (!accInfo) {
        dispatch(webAppReducerActions.setConnectionError(true));
        dispatch(webAppReducerActions.setIsConnectionModalOpen(true));
        return;
      }
      dispatch(setConnectionError(false));
      dispatch(webAppReducerActions.setShowUnlockModal(true));

      dispatch(webAppReducerActions.setChainId(connectedChainId));
      dispatch(webAppReducerActions.setAccount(connectedAccount));

      await unlockAccount(connectedAccount, connectedChainId);
    } catch (error) {
      console.log(error);
    }
  };

  const unlockAccount = async (
    connectedAccount: string,
    connectedChainId: ChainId
  ) => {
    try {

      dispatch(webAppReducerActions.setIsConnectionLoading(true));

      console.log("walletType", walletType);
      console.log("connectedAccount", connectedAccount);


      const accountDetails = await loopringService.unlockAccount(
        connectedAccount,
        walletType
      );

      console.log("accountDetails", accountDetails);

      if (!accountDetails) {
        return toast.error('Unable to get API Key');
      }

      dispatch(
        setConnectAccount({
          apiKey: accountDetails?.apiKey,
          account: connectedAccount,
          chainId: connectedChainId,
          accountId: accountDetails?.accInfo.accountId,
        })
      );

      dispatch(setIsLoadingWalletConnect(false));
      dispatch(setIsScannedWalletConnect(true));

    } catch (error) {
      console.log(error);

    }
  };


  useConnectHelper({
    handleAccountDisconnect: () => {
      console.log('handleAccountDisconnect:');
      if (window.ethereum) {
        window.ethereum.on('disconnect', (error: any) => {
          if (error?.code === 1000) {
            console.log('User disconnected account directly from MetaMask.');
            dispatch(setDisconnectAccount(null));
            disconnectAccount();
          }
        });
      }
    },
    handleProcessing: ({ opts }: handleProcessingI) => {
      console.log('---> handleProcessing:', opts);
      console.log({ opts });

      if (opts && opts.qrCodeUrl) {
        dispatch(setUrlWalletConnect(opts.qrCodeUrl));
      }
    },
    handleError: (props: handleErrorI) => {
      console.log('---> handleError:', props);
      console.log('---> handleErrorMSG:', props);
      //@ts-ignore
      toast(props.opts.error.message, { type: 'error' });
    },
    handleConnect: async ({ accounts, chainId }: handleConnectI) => {
      console.log({ accounts, chainId });
      await onWalletConnectHandler(accounts[0], chainId);

      console.log(
        'After connect >>,network part start: step1 networkUpdate',
        accounts[0]
      );
      console.log('After connect >>,network part done: step2 check account');
    },
  });
};

export default useConnectHook;
