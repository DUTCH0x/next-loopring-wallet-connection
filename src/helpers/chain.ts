import { convertNumToHexdecimal } from '.';

export const switchNetwork = async () => {
  if (typeof window.ethereum !== 'undefined') {
    // @ts-ignore
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: `0x${convertNumToHexdecimal('1')}`,
        },
      ],
    });
  }
};

interface ExtendedChainInformation {
  name: string;
}

export const CHAINS: { [chainId: number]: ExtendedChainInformation } = {
  1: {
    name: 'Ethereum Mainnet',
  },
  5: {
    name: 'Goerli',
  },
};
