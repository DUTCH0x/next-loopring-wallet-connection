import Image from 'next/image';
import useWalletHook from '@/hooks/useWalletHook';
import { ConnectorNames } from '@loopring-web/loopring-sdk';

import * as DutchC from './style';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsConnectionLoading, setIsConnectionModalOpen } from '@/ducks';
import { setConnectionError } from '@/ducks';
import { useState } from 'react';

const LoginOptions = [
  {
    name: ConnectorNames.MetaMask,
    label: 'MetaMask',
    imgUrl: 'https://static.loopring.io/assets/svg/meta-mask.svg',
  },
  {
    name: ConnectorNames.Gamestop,
    label: 'Gamestop',
    imgUrl: 'https://static.loopring.io/assets/svg/gs.svg',
  },
  {
    name: ConnectorNames.WalletConnect,
    label: 'WalletConnect',
    imgUrl: 'https://static.loopring.io/assets/svg/wallet-connect.svg',
  },
];

const ConnectWallet = (): JSX.Element => {
  const { connectAccount } = useWalletHook();
  const dispatch = useAppDispatch();

  const { connectionError, isConnectionModalOpen } =
    useAppSelector((state) => {
      const { connectionError, isConnectionLoading, isConnectionModalOpen } =
        state.webAppReducer;
      return { connectionError, isConnectionLoading, isConnectionModalOpen };
    }, shallowEqual);

  const closeConnectionModal = () => {
    dispatch(setIsConnectionModalOpen(false));
    dispatch(setConnectionError(false));
    dispatch(setIsConnectionLoading(false));
  };

  const [selectedWallet, setSelectedWallet] = useState('');

  let renderContent = <DutchC.LoginWrapper>
    {LoginOptions.map((option, i) => {
      return (
        <DutchC.AccountWrapper
          key={i}
          onClick={() => {
            connectAccount(option.name), setSelectedWallet(option.label);
          }}
        >
          <DutchC.Account>
            <button>
              <Image
                src={option.imgUrl}
                alt="MetaMask"
                height="36"
                width="36"
              />
            </button>
            <DutchC.TextNormal>{option.name}</DutchC.TextNormal>
          </DutchC.Account>
          <button>Connect</button>
        </DutchC.AccountWrapper>
      );
    })}
  </DutchC.LoginWrapper>

  return (
    <>
      {renderContent}
    </>
  );
};

export default ConnectWallet;
