// Set of helper functions to facilitate wallet setup

import { nodes } from './getRpcUrl'
import {chainInfo, REACT_APP_NETWORK_ID} from "../chainInfo";

 export const setupNetwork = async () => {

  const provider = window.ethereum
  if (provider) {
    const chainId = parseInt(REACT_APP_NETWORK_ID, 10)
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: `${chainInfo[REACT_APP_NETWORK_ID].REACT_APP_NETWORK}`,
            nativeCurrency: {
              name: `${chainInfo[REACT_APP_NETWORK_ID].REACT_APP_COIN}`,
              symbol: `${chainInfo[REACT_APP_NETWORK_ID].REACT_APP_COIN}`,
              decimals: 18,
            },
            rpcUrls: chainInfo[REACT_APP_NETWORK_ID]['REACT_APP_NODES'],
            blockExplorerUrls: [`${chainInfo[REACT_APP_NETWORK_ID].REACT_APP_BLOCK_EXPLORER}`],
          },
        ],
      })
      return true
    } catch (error) {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
          },
        ],
      })
      return true
    }
  } else {
    console.error("Can't setup the zkSync chain on metamask because window.ethereum is undefined")
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
) => {
  try {
    const tokenAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    })

    return tokenAdded
  } catch (e) {
    console.warn(e);
  }
}