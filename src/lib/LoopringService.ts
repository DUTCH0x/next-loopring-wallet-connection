import { toast } from 'react-toastify';

import * as sdk from '@loopring-web/loopring-sdk';
import Web3 from 'web3';
import {
  ChainId,
  CollectionMeta,
  ConnectorNames,
  NFTCounterFactualInfo,
} from '@loopring-web/loopring-sdk';
import {
  AccountInfoI,
  CollectionNFTI,
  CollectionObjectI,
  LooseObjectI,
  MintNFTPostDataI,
  NFTI,
  UserCollectionI,
} from '@/types';
import { getTimestampDaysLater, TOKEN_INFO } from '@/helpers';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import store from '@/redux/store';
import assert from 'assert';
import { ethers } from 'ethers';
import { connectProvides } from '@loopring-web/web3-provider';
import { Subject } from 'rxjs';

interface MintNFTI {
  accountInfo: AccountInfoI;
  nftTokenAddress: string;
  walletType: ConnectorNames;
  metadata: LooseObjectI;
  amount: string;
  royaltyPercentage: number;
  nftID: string;
}

export const connectSubject = new Subject<{
  status: any;
  data?:any;
}>();
export class LoopringService {
  exchangeAPI: sdk.ExchangeAPI;
  userAPI: sdk.UserAPI;
  nftAPI: sdk.NFTAPI;
  walletAPI: sdk.WalletAPI;
  user: string | null;
  apiKey: string;
  accountId: number;
  abortController: any;

  constructor() {
    this.exchangeAPI = new sdk.ExchangeAPI({
      chainId: 1,
    });
    this.userAPI = new sdk.UserAPI({
      chainId: 1,
    });
    this.userAPI = new sdk.UserAPI({
      chainId: 1,
    });
    this.nftAPI = new sdk.NFTAPI({
      chainId: 1,
    });
    this.walletAPI = new sdk.WalletAPI({
      chainId: 1,
    });
    this.abortController = new AbortController();

    const reduxStore = store.getState();

    this.user = reduxStore.webAppReducer.account;
    this.apiKey = String(reduxStore.webAppReducer.apiKey);
    this.accountId = Number(reduxStore.webAppReducer.accountId);
  }

  async depositEthFromL1ToL2(accountAddress: string, tradeETHValue: number) {
    try {
      const web3 = connectProvides.usedWeb3 as unknown as any;
      const { exchangeInfo } = await this.exchangeAPI.getExchangeInfo();

      const nonce = await sdk.getNonce(web3, accountAddress);
      const gasPrice = (await this.exchangeAPI.getGasPrice()).gasPrice;
      const gasLimit = 150000;

      const response = await sdk.deposit(
        web3,
        accountAddress,
        exchangeInfo.exchangeAddress,
        TOKEN_INFO.tokenMap.ETH,
        tradeETHValue,
        0,
        gasPrice,
        gasLimit,
        // sdk.ChainId.GOERLI,
        sdk.ChainId.MAINNET,
        nonce,
        true
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async depositLrcFromL1ToL2(accountAddress: string, value: string) {
    try {
      // step1: getAllowances
      const tradeLRCValue = Number(ethers.utils.parseEther(value).toString());
      const { exchangeInfo } = await this.exchangeAPI.getExchangeInfo();

      const { tokenAllowances } = await this.exchangeAPI.getAllowances({
        owner: accountAddress,
        token: [TOKEN_INFO.tokenMap.LRC.address],
      });

      const gasPrice = (await this.exchangeAPI.getGasPrice()).gasPrice;
      const gasLimit = 150000;
      const web3 = connectProvides.usedWeb3 as unknown as any;
      const nonce = await sdk.getNonce(web3, accountAddress);

      if (
        tokenAllowances.has(TOKEN_INFO.tokenMap.LRC.address) &&
        Number(tokenAllowances.get(TOKEN_INFO.tokenMap.LRC.address)) <
          tradeLRCValue
      ) {
        await sdk.approveMax(
          web3,
          accountAddress,
          TOKEN_INFO.tokenMap.LRC.address, // LRC address  {tokenIdMap} = getTokens();  tokenIdMap['LRC']
          exchangeInfo.depositAddress, //{exchangeInfo} = getExchangeInfo()  exchangeInfo.depositAddress
          gasPrice,
          gasLimit,
          sdk.ChainId.MAINNET,
          nonce,
          true
        );
      }

      console.log(
        `deposit: ${TOKEN_INFO.tokenMap.LRC.symbol}-${tradeLRCValue}, gasPrice: ${gasPrice}, `
      );
      const response = await sdk.deposit(
        web3,
        accountAddress,
        exchangeInfo.exchangeAddress,
        TOKEN_INFO.tokenMap.LRC,
        sdk
          .toBig(tradeLRCValue)
          .div('1e' + TOKEN_INFO.tokenMap.LRC.decimals)
          .toNumber(),
        0,
        gasPrice,
        gasLimit,
        sdk.ChainId.MAINNET,
        nonce,
        true
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public subscribe(){
    return connectSubject.asObservable()
  }

  public updateL2Account(account: any) {
    const connectSubject = new Subject<{
      status: any;
      data?:any;
    }>();
    
    connectSubject.next({
      status:'update',
      data: {
        l2Account: account
      },
    });
  }

  getTypeData(ownerAddress: string, exchangeAddress: string) {
    return  {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        TestTypedData: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'tokenID', type: 'uint16' },
        ],
      },
      primaryType: 'TestTypedData',
      domain: {
        name: 'Loopring Protocol',
        version: '3.6.0',
        chainId: sdk.ChainId.GOERLI,
        verifyingContract: exchangeAddress,
      },
      message: {
        from: ownerAddress,
        to: exchangeAddress,
        tokenID: TOKEN_INFO.tokenMap.LRC.tokenId,
      },
    }
  }

  async unlockAccount2(ownerAddress: string, walletType: ConnectorNames) {
    try {
      const { accInfo } = await this.exchangeAPI.getAccount({
        owner: ownerAddress,
      });

      
      
      if (!accInfo) return null;
      
      console.log("accInfo", accInfo);
      const { exchangeInfo } = await this.exchangeAPI.getExchangeInfo();

      console.log("exchangeInfo", exchangeInfo);
      

      let keySeed = sdk.GlobalAPI.KEY_MESSAGE.replace(
        '${exchangeAddress}',
        exchangeInfo.exchangeAddress
      ).replace('${nonce}', (accInfo.nonce - 1).toString());

      console.log({
         web3: connectProvides.usedWeb3 as unknown as Web3,
        address: accInfo.owner,
        keySeed,
        walletType,
        chainId: 1,
        counterFactualInfo: undefined,
      });
      

      const eddsaKey = await sdk.generateKeyPair({
        web3: connectProvides.usedWeb3 as unknown as Web3,
        address: accInfo.owner,
        keySeed,
        walletType,
        chainId: 1,
        counterFactualInfo: undefined,
      });

      console.log({eddsaKey, keySeed});
      

      const { apiKey } = await this.userAPI.getUserApiKey(
        { accountId: accInfo.accountId },
        eddsaKey.sk
      );

      return { accInfo, eddsaKey, apiKey };
    } catch (error) {
      console.log(error);
    }
  }

  async unlockAccount(ownerAddress: string, walletTypeT: ConnectorNames) {
    try {
      const { exchangeInfo } = await this.exchangeAPI.getExchangeInfo();
      const { accInfo } = await this.exchangeAPI.getAccount({
          owner: ownerAddress,
      });

      // const testTypedData = this.getTypeData(ownerAddress, exchangeInfo.exchangeAddress)

      // const result = await sdk.getEcDSASig(
      //   connectProvides.usedWeb3,
      //   testTypedData,
      //   ownerAddress,
      //   sdk.GetEcDSASigType.WithoutDataStruct,
      //   sdk.ChainId.MAINNET,
      //   accInfo.accountId,
      //   "",
      //   sdk.ConnectorNames.Unknown
      // );

      // console.log({result});

      let walletType = undefined;
      const isMobile = false;

      //@ts-ignore
      if (window.ethereum && walletTypeT === sdk.ConnectorNames.MetaMask && isMobile) {
        walletType = undefined;
      } else {
        walletType = (await this.walletAPI.getWalletType({
          wallet: ownerAddress,
        })).walletType;
      }

      const msg = sdk.GlobalAPI.KEY_MESSAGE.replace(
                    "${exchangeAddress}",
                    exchangeInfo.exchangeAddress)
                    .replace("${nonce}", (accInfo.nonce - 1).toString()
                  );
      const chainId = await connectProvides?.usedWeb3?.eth?.getChainId();

      console.log({
            keyPair: {
              web3: connectProvides.usedWeb3 as unknown as Web3,
              address:  ownerAddress,
              keySeed: msg,
              //@ts-ignore
              walletType,
              //@ts-ignore
              chainId,
              accountId: accInfo.accountId,
              isMobile, //todo flag for is mobile
            },
            request: {
              accountId:  accInfo.accountId,
            },
            publicKey: accInfo.publicKey
          },
      );
      

      const response = await this.userAPI.unLockAccount(
          {
            keyPair: {
              web3: connectProvides.usedWeb3 as unknown as Web3,
              address:  ownerAddress,
              keySeed: msg,
              //@ts-ignore
              walletType,
              //@ts-ignore
              chainId,
              accountId: accInfo.accountId,
              isMobile, //todo flag for is mobile
            },
            request: {
              accountId:  accInfo.accountId,
            },
          },
          accInfo.publicKey
        );


        console.log({response});

        const {apiKey, eddsaKey, counterFactualInfo} = response as any;
        if (apiKey && eddsaKey) {
          this.updateL2Account({
            apiKey,
            eddsaKey,
            publicKey: {
              x: sdk.toHex(sdk.toBig(eddsaKey.keyPair.publicKeyX)),
              y: sdk.toHex(sdk.toBig(eddsaKey.keyPair.publicKeyY)),
            } as any,
            isInCounterFactualStatus: walletType?.isInCounterFactualStatus,
            isContract: walletType?.isContract,
            readyState: "ACTIVATED",
            counterFactualInfo
          })
        }
        
  
      return { accInfo, eddsaKey, apiKey };
    } catch (error) {
      console.log(error);
    }
  }

  async createCollection(
    accountInfo: AccountInfoI,
    collectionobj: CollectionObjectI
  ) {
    try {
      const response = await this.userAPI.submitNFTCollection(
        {
          name: collectionobj.name,
          tileUri: collectionobj.tileUri,
          description: collectionobj.description,
          owner: accountInfo.accInfo.owner,
          avatar: collectionobj.avatar,
          banner: collectionobj.banner,
          nftFactory:
            sdk.NFTFactory_Collection[
              1 as ChainId
            ],
        },
        1,
        accountInfo.apiKey,
        accountInfo.eddsaKey.sk
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserCollection({
    tokenAddress = undefined,
    offset = undefined,
    limit = undefined,
    isMintable,
  }: UserCollectionI) {
    assert(this.user, 'this.user === null');

    const collectionRes = await this.userAPI.getUserOwenCollection(
      {
        owner: this.user,
        tokenAddress,
        isMintable,
        offset,
        limit,
      },
      this.apiKey
    );

    return collectionRes;
  }

  async getUserNFTCollection({ tokensAddress, offset, limit }: CollectionNFTI) {
    try {
      const headers = {
        'X-API-KEY': this.apiKey,
      };

      const res = await axios.get(
        `https://api3.loopring.io/api/v3/user/nft/balances?accountId=${
          this.accountId
        }&tokenAddrs=${tokensAddress.join(
          ','
        )}&offset=${offset}&limit=${limit}`,
        { headers }
      );

      if (res.status === 200 && res.data && res.data.data) {
        const nfts = res.data.data as NFTI[];

        const nftsWithMetadata = await Promise.all(
          nfts.map(async (nft) => {
            const cid = await this.ipfsNftIDToCid(nft.nftId);
            const metadataRes = await axios.get(
              `https://ipfs.loopring.io/ipfs/${cid}`
            );

            if (metadataRes.status === 200 && metadataRes.data) {
              return { ...nft, metadata: metadataRes.data };
            } else return nft;
          })
        );

        return {
          totalNFT: Number(res.data.totalNum),
          nfts: nftsWithMetadata as NFTI[],
        };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async getInfoForNFTTokens(nftDatas: string[]) {
    const response = await this.nftAPI.getInfoForNFTTokens({
      nftDatas,
    });

    return response;
  }

  async ipfsNftIDToCid(nftID: string) {
    const response = await this.nftAPI.ipfsNftIDToCid(nftID);

    return response;
  }

  async getLayer2Balance() {
    const { userBalances } = await this.userAPI.getUserBalances(
      { accountId: this.accountId, tokens: '' },
      this.apiKey
    );

    return userBalances;
  }

  async getContractNFTMeta(
    tokenAddress: string,
    nftId: string,
    nftType: string
  ) {
    const response = await this.nftAPI.getContractNFTMeta({
      web3: connectProvides.usedWeb3 as unknown as Web3,
      tokenAddress,
      nftId,
      nftType: nftType as unknown as sdk.NFTType,
    });
    return response;
  }

  async getCollectionMeta(tokenAddress: string) {
    const collectionRes = await this.getUserCollection({
      tokenAddress,
      isMintable: true,
    });

    if (
      (collectionRes &&
        ((collectionRes as sdk.RESULT_INFO).code ||
          (collectionRes as sdk.RESULT_INFO).message)) ||
      !collectionRes.collections.length
    ) {
      toast(`${(collectionRes as sdk.RESULT_INFO).message}`, { type: 'info' });
      return null;
    }

    const collectionMeta = (collectionRes as any)
      .collections[0] as CollectionMeta;

    return collectionMeta;
  }

  async getNFTOffchainFeeAmt(collectionMeta: sdk.CollectionMeta) {
    const fee = await this.userAPI.getNFTOffchainFeeAmt(
      {
        accountId: this.accountId,
        tokenAddress: collectionMeta.contractAddress,
        requestType: sdk.OffchainNFTFeeReqType.NFT_MINT,
      },
      this.apiKey
    );

    return fee;
  }


}
