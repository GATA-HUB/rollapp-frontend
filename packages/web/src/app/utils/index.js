"use client";
import { Contract } from "@ethersproject/contracts";
import ERC20ABI from "../contracts/ERC20.json";
import ERC721ABI from "../contracts/ERC721.json";
import TycheStakeABI from "../contracts/TycheStake.json";
import { chainInfo, REACT_APP_NETWORK_ID } from "../chainInfo";
import axios from "axios";

// export const BASE_IPFS = "https://hardbin.com/ipfs/"
export const BASE_IPFS = "https://ipfs.io/ipfs/"
export const currentNetwork = chainInfo[REACT_APP_NETWORK_ID].REACT_APP_NETWORK_ID;
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
// export const TYCHE_STAKE_ADDRESS = {280: "0x126632D21Cc03018061D7a59731bdaCC3C38faA4", 324: "0x3F0fb544F4A37676B32989cE6d23749a099eaC12", 84531: "0xc33b2d4F95177561240069f2d4a582b603f0123e", 8453: "0xF0bfbe94FD99fa8ec2AAdE380b2868C95Bd6AC03"};
// export const TYCHE_STAKE_ADDRESS = {280: "0xD4bb917Ab6270e96AAF8197DB1dA36A0cB761999", 324: "0x3F0fb544F4A37676B32989cE6d23749a099eaC12", 84531: "0xc33b2d4F95177561240069f2d4a582b603f0123e", 8453: "0xF0bfbe94FD99fa8ec2AAdE380b2868C95Bd6AC03"};
// 1234 local 0x4333C23a81913bF1cC337DC66998Ba8616edC4ed
export const TYCHE_STAKE_ADDRESS = {
  280: "0xC533bB0EDc59014517c4aa86bd21EDf409ed037D", 
  324: "0xD049063fF11B1029B27be87f117785E2A98d75c2", 
  84531: "0xc33b2d4F95177561240069f2d4a582b603f0123e", 
  8453: "0xacafdc807ba31e05335407b318c339b208ddb276", 
  1234: '0xd09fC596021ec7E7681e182b9055ce14554Bf640', 
  100004: '0x1D26563A437b0C2b6b1BceDB592a99754A4639E9', 
  10781: '0xC22B9a94F78045aCd156F06D8Eb08C08a1A0E031',
  28182: '0x984bc9B5282e2F7cC5949AFfa70e599a8050b675',
};

export const CONTRACTS_BY_NETWORK = {
  280: {
    ERC20: {
      address: '0x63E56e3d87Df37e01F24c94e67A88B7949f9D531',
      abi: ERC20ABI,
    },
    ERC721: {
      address: "0xfcBD3207E738DCc5BFF115Aa5521a5d5631EbC85",
      abi: ERC721ABI,
    },
    TycheStake: {
      address: TYCHE_STAKE_ADDRESS[280],
      abi: TycheStakeABI,
    },
  },
  324: {
    ERC20: {
      address: '0x63E56e3d87Df37e01F24c94e67A88B7949f9D531',
      abi: ERC20ABI,
    },
    ERC721: {
      address: "0xfcBD3207E738DCc5BFF115Aa5521a5d5631EbC85",
      abi: ERC721ABI,
    },
    TycheStake: {
      address: TYCHE_STAKE_ADDRESS[324],
      abi: TycheStakeABI,
    },
  },  8453: {
    ERC20: {
      address: '0x63E56e3d87Df37e01F24c94e67A88B7949f9D531',
      abi: ERC20ABI,
    },
    ERC721: {
      address: "0xfcBD3207E738DCc5BFF115Aa5521a5d5631EbC85",
      abi: ERC721ABI,
    },
    TycheStake: {
      address: TYCHE_STAKE_ADDRESS[8453],
      abi: TycheStakeABI,
    },
  },  84531: {
    ERC20: {
      address: '0x63E56e3d87Df37e01F24c94e67A88B7949f9D531',
      abi: ERC20ABI,
    },
    ERC721: {
      address: "0xfcBD3207E738DCc5BFF115Aa5521a5d5631EbC85",
      abi: ERC721ABI,
    },
    TycheStake: {
      address: TYCHE_STAKE_ADDRESS[84531],
      abi: TycheStakeABI,
    },
  },
  // 1234: { // local testing
  //   ERC20: {
  //     address: '0x63E56e3d87Df37e01F24c94e67A88B7949f9D531',
  //     abi: ERC20ABI,
  //   },
  //   ERC721: {
  //     address: "0x74DEFdc2C1f4A918562CB3DEAb39e0C9EBf7f625",
  //     abi: ERC721ABI,
  //   },
  //   TycheStake: {
  //     address: TYCHE_STAKE_ADDRESS[1234],
  //     abi: TycheStakeABI,
  //   },
  // },
  1234: {
    ERC20: {
      address: '0xA25da6751287bc8F46AeA330CBd664fB21c6fD8c',
      abi: ERC20ABI,
    },
    ERC721: {
      address: "0x74DEFdc2C1f4A918562CB3DEAb39e0C9EBf7f625",
      abi: ERC721ABI,
    },
    TycheStake: {
      address: TYCHE_STAKE_ADDRESS[1234],
      abi: TycheStakeABI,
    },
  },
  100004: {
    ERC20: {
      address: '0x58a9BcDF4ed4014E15E1c21ebB128A46717919Ec',
      abi: ERC20ABI,
    },
    ERC721: {
      address: "0xe13Be783C3EDf41A88D61F4A50c33e7F7498Da9A",
      abi: ERC721ABI,
    },
    TycheStake: {
      address: TYCHE_STAKE_ADDRESS[100004],
      abi: TycheStakeABI,
    },
  },
  10781: {
    ERC20: {
      address: '0xdfc20192a48B293fFFb7A0f8934136cf2BDaBCF5',
      abi: ERC20ABI,
    },
    ERC721: {
      address: "0xe13Be783C3EDf41A88D61F4A50c33e7F7498Da9A",
      abi: ERC721ABI,
    },
    TycheStake: {
      address: TYCHE_STAKE_ADDRESS[10781],
      abi: TycheStakeABI,
    },
  } ,
  28182: {
    ERC20: {
      address: '0xc63bf57a5a10CC66970a7081d5e76e15ABd8a49f',
      abi: ERC20ABI,
    },
    ERC721: {
      address: "0xfcBD3207E738DCc5BFF115Aa5521a5d5631EbC85",
      abi: ERC721ABI,
    },
    TycheStake: {
      address: TYCHE_STAKE_ADDRESS[28182],
      abi: TycheStakeABI,
    },
  },
}
export function getContractInfo(name, chainId = null) {
  if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }

}
export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}
export function getTokenContract(address, chainId, provider) {
  const info = getContractInfo('ERC20', chainId);
  return !!info && new Contract(address, info.abi, provider);
}
export function getCollectionContract(address, chainId, provider) {
  const info = getContractInfo('ERC721', chainId);
  return !!info && new Contract(address, info.abi, provider);
}
export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str
export function formatNum(value) {
  let intValue = Math.floor(value)
  if (intValue < 10) {
    return '' + parseFloat(value).toFixed(2)
  } else if (intValue < 1000) {
    return '' + intValue
  } else if (intValue < 1000000) {
    return parseFloat(intValue / 1000).toFixed(1) + 'K'
  } else if (intValue < 1000000000) {
    return parseFloat(intValue / 1000000).toFixed(1) + 'M'
  } else {
    return parseFloat(intValue / 1000000000).toFixed(1) + 'G'
  }
}

const addressToImagePathMap = {
  '0x76314a360eed8dd13c7262739a70c2a5e66238d8': 'https://pbs.twimg.com/profile_images/1648237430544420864/yf2HiM4c_400x400.png',
  '0xAddress2': '/path_to_assets/image_for_address2.png',
  // ... add more addresses and their respective image paths
};

export const ipfsReplace = (URI, item) => {
  if(URI) {
    if (URI.startsWith("ipfs://")) URI = URI.replace("ipfs://", BASE_IPFS);
    else if (URI.indexOf("http://") < 0 && URI.indexOf("https://") < 0) URI = BASE_IPFS + URI;
    return URI;
  }

  // Check if the address exists in the map, if it does return the local path
  if (addressToImagePathMap[item?.address]) {
    return addressToImagePathMap[item?.address];
  }
}
export const checkColStore = (address, colStore) => {
  let colInfo = null;
  try {
    for (let i = 0; i < colStore.length; i++) {
      if (colStore[i].address.toLowerCase() === address.toLowerCase()) {
        colInfo = colStore[i];
        break;
      }
    }
  } catch (err) {
    console.log("ColStore: ", err);
  }
  return colInfo;
}
export const claimnap = 1800; // seconds (30 minutes)
export const checkActiveTime = (collection, poolIndex, user) => {
  const key = `${collection.toLowerCase()}-${poolIndex}-${user.toLowerCase()}`;
  const currentTime = parseInt(Date.now() / 1000);
  let activeTime = localStorage.getItem(key);
  if(currentNetwork !== 324) {
    return -1;
  }
  if (activeTime) {
    activeTime = parseInt(activeTime);
    return claimnap + activeTime - currentTime;
  } else {
    localStorage.setItem(key, currentTime);
    return claimnap;
  }
}
export const setActiveTime = (collection, poolIndex, user) => {
  const key = `${collection.toLowerCase()}-${poolIndex}-${user.toLowerCase()}`;
  const currentTime = parseInt(Date.now() / 1000);
  localStorage.setItem(key, currentTime);
}

export const cachedGet = async (itemUri) => {
  if(!itemUri) return;
  const cachedItem = window?.localStorage.getItem(itemUri);
  if(cachedItem) return JSON.parse(cachedItem);

  const newData = await axios.get(itemUri);
  window?.localStorage.setItem(itemUri, JSON.stringify(newData));
  return  newData;
};

export const verifiedContracts = ['0x8749d6e08ff9def7dbe19efc5c43e0b23428d88f'.toLowerCase(), '0xc6157Baaf561d3c3ed9189D747D8a477d4228A14'.toLowerCase(), '0x7C638ddf68DD3cfa46a213F9AEa1de6035E6A00A'.toLowerCase()];