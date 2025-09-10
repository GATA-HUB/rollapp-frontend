// Set of helper functions to facilitate wallet setup

import { nodes } from './getRpcUrl'
import {chainInfo, REACT_APP_NETWORK_ID} from "../chainInfo";

 export const setupNetwork = async () => {
  const provider = window.ethereum
  if (provider) {
    const chainId = parseInt(REACT_APP_NETWORK_ID, 10)
    
    // Only allow network setup for Base network (8453) to prevent broken network addition
    if (chainId !== 8453) {
      console.log(`Network setup skipped for unsupported network: ${chainId}. Only Base (8453) is supported.`)
      return false
    }
    
    // Validate network configuration exists and has valid RPC URLs
    const networkConfig = chainInfo[REACT_APP_NETWORK_ID]
    if (!networkConfig || !networkConfig.REACT_APP_NODES || networkConfig.REACT_APP_NODES.length === 0) {
      console.error(`Invalid network configuration for network ${chainId}`)
      return false
    }
    
    // Check for broken RPC URLs
    const hasValidRPC = networkConfig.REACT_APP_NODES.some(url => 
      url && !url.includes('dangerous-tiger-29.telebit.io')
    )
    
    if (!hasValidRPC) {
      console.error(`No valid RPC URLs found for network ${chainId}`)
      return false
    }
    
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: `${networkConfig.REACT_APP_NETWORK}`,
            nativeCurrency: {
              name: `${networkConfig.REACT_APP_COIN}`,
              symbol: `${networkConfig.REACT_APP_COIN}`,
              decimals: 18,
            },
            rpcUrls: networkConfig.REACT_APP_NODES,
            blockExplorerUrls: [`${networkConfig.REACT_APP_BLOCK_EXPLORER}`],
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
    console.error("Can't setup the network on wallet because window.ethereum is undefined")
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