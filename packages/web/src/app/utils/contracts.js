import {BigNumber, ethers} from "ethers";
import {getCollectionContract, getContractObj, getTokenContract, ZERO_ADDRESS} from ".";
import {chainInfo, REACT_APP_NETWORK_ID} from "../chainInfo";
import {store} from "@/app/store";
import {getFromLocalStorage, setToLocalStorage} from "@/app/utils/localStorage";
import {getAllCollectionsMetadata} from "@/app/utils/mintcontracts";
import {formatEther} from "ethers/lib/utils";

export const tokenDecimal = 6;
export const defaultProvider = new ethers.providers.JsonRpcProvider(chainInfo[REACT_APP_NETWORK_ID].REACT_APP_NODE_1);
export const defaultSigner = defaultProvider.getSigner();

export function isAddress(address) {
    try {
        ethers.utils.getAddress(address);
    } catch (e) { return false; }
    return true;
}
export function toEth(amount) {
    return ethers.utils.formatEther(String(amount), { commify: true });
}
export function toWei(amount) {
    return ethers.utils.parseEther(String(amount));
}
export function toUnits(amount, decimals) {
    return ethers.utils.formatUnits(String(amount), decimals);
}
function makeString(decimals) {
    return "1" + "0".repeat(decimals)
}
export function calcBigNumber(amount, decimals) {
    try {
        // Convert amount to string and split by decimal
        let [whole, fractional] = amount.toString().split('.');

        // If no fractional part, then it's an integer number
        if (!fractional) {
            return BigNumber.from(whole).mul(BigNumber.from("10").pow(decimals));
        }

        // Create a new number without the decimal
        let withoutDecimal = whole + fractional;

        // Calculate how much to scale the number up by
        let scaleFactor = decimals - fractional.length;

        // If negative, we need to scale down
        if (scaleFactor < 0) {
            return BigNumber.from(withoutDecimal).div(BigNumber.from("10").pow(-scaleFactor));
        }

        // Otherwise, scale up
        return BigNumber.from(withoutDecimal).mul(BigNumber.from("10").pow(scaleFactor));
    } catch (err) {
        console.log(err);
        return 0;
    }
}

export async function getERC20Info(address, chainId = null, provider = defaultProvider) {
    const storageKey = `erc20Details_${address}`;
    let erc20Details = getFromLocalStorage(storageKey);

    if (erc20Details) {
        return erc20Details;
    }

    const erc20Contract = getTokenContract(address, chainId, provider);
    try {
        const name = await erc20Contract.name();
        const symbol = await erc20Contract.symbol();
        const decimals = await erc20Contract.decimals();
        erc20Details = { name: name, symbol: symbol, decimals: decimals };
        setToLocalStorage(storageKey, erc20Details);
        return erc20Details;
    } catch (e) {
        console.log(e);
        return null;
    }
}
export async function getDecimals(address, chainId = null, provider = defaultProvider) {
    const erc20Contract = getTokenContract(address, chainId, provider);
    try {
        const decimals = await erc20Contract.decimals();
        return decimals;
    } catch (e) {
        console.log(e);
        return -1;
    }
}
export async function getOwnerOfFactory(chainId, provider) {
    const stakeFactoryContract = getContractObj("TycheStake", chainId, provider);
    try {
        const stakeOwner = await stakeFactoryContract.owner();
        return stakeOwner.toString().toLowerCase();
    } catch (e) {
        console.log(e);
        return "";
    }
}
export async function getTotalSupply(collection, chainId, provider) {
    const collectionContract = getCollectionContract(collection, chainId, provider);
    try {
        const supply = await collectionContract.totalSupply();
        return parseInt(supply);
    } catch (e) {
        console.log(e);
        return 0;
    }
}
export async function createStakingPool(stakeToken, rewardToken1, reward1PerSecond, rewardToken2, reward2PerSecond, startTime, endTime, chainId, provider) {
    const stakeContract = getContractObj("TycheStake", chainId, provider);
    try {
        let _rewardToken2 = rewardToken2; let _reward2PerSecond = reward2PerSecond;
        if (!rewardToken2) { _rewardToken2 = ZERO_ADDRESS; _reward2PerSecond = 0 };
        const tx = await stakeContract.createPool(stakeToken, rewardToken1, reward1PerSecond, startTime, endTime, _rewardToken2, _reward2PerSecond);
        return tx;
    } catch (e) {
        console.log(e);
        return null;
    }
}
export async function getPoolInfo(chainId, provider = defaultProvider) {
    let poolInfo = [];
    const stakeContract = getContractObj("TycheStake", chainId, provider);
    try {
        const poolContracts = await stakeContract.getPoolContracts();
        console.log("Getting pool info for contracts:", poolContracts);
        for (let i = 0; i < poolContracts.length; i++) {
            try {
                const col_addr = poolContracts[i];
                const poolsForContract = await stakeContract.getPoolAtIndexForAddress(col_addr, i);
                console.log("Getting pool info for contract:", col_addr, poolsForContract);
                for (let poolIndex = 0; poolIndex < poolsForContract.length; poolIndex++) {
                    const poolDetail = poolsForContract[poolIndex];
                    poolInfo.push({ poolIndex, address: col_addr.toLowerCase(), info: poolDetail });
                }
            } catch (e1) {
                console.log(e1);
            }
        }
    } catch (e) {
        console.log(e);
    }
    return poolInfo;
}

export async function getPoolContracts() {
    const stakeContract = getContractObj("TycheStake", null, defaultProvider);
    try {
        const poolContracts = await stakeContract.getPoolContracts();
        let pool_contracts = [];
        for (let i = 0; i < poolContracts.length; i++) pool_contracts.push(poolContracts[i].toLowerCase());
        return pool_contracts;
    } catch (e) {
        console.log(e);
        return [];
    }
}
export async function getPoolInfoFromAddresses() {
    let poolInfo = [];
    const stakeContract = getContractObj("TycheStake", null, defaultProvider);
    try {
        const poolContracts = await stakeContract.getPoolContracts();
        for (let i = 0; i < poolContracts.length; i++) {
            try {
                const col_addr = poolContracts[i];
                const poolCount = await stakeContract.getPoolCountForAddress(col_addr);
                for (let poolIndex = 0; poolIndex < poolCount; poolIndex++) {
                    const poolDetail = await stakeContract.getPoolAtIndexForAddress(col_addr, poolIndex);
                    poolInfo.push({ poolIndex, address: col_addr.toLowerCase(), info: poolDetail });
                }
            } catch (e1) {
                console.log(e1);
            }
        }
    } catch (e) {
        console.log(e);
    }
    return poolInfo;
}

export async function getOnePoolInfo(address, poolIndex) {
    const stakeContract = getContractObj("TycheStake", null, defaultProvider);
    try {
        const info = await stakeContract.pools(address, poolIndex);
        return info;
    } catch (e1) { console.log(e1); return null; }
}
export async function getUserInfoFromAddresses(user_address, addrList) {
    const stakeContract = getContractObj("TycheStake", null, defaultProvider);
    let userInfo = [];

    for (let address of addrList) {
        try {
            const poolCount = await stakeContract.whitelist(address);  // Get the number of pools for the address

            for (let poolIndex = 0; poolIndex < poolCount; poolIndex++) {
                const info = await stakeContract.checkUser(user_address, address, poolIndex);
                userInfo.push({ address, poolIndex, info });
            }
        } catch (e1) {
            console.log(`Error fetching info for address ${address}:`, e1);
        }
    }

    return userInfo;
}
export async function getUserOneInfo(user_address, stakeAddress) {
    let userInfo = null;
    const stakeContract = getContractObj("TycheStake", null, defaultProvider);
    try {
        // const info = await stakeContract.users(user_address, stakeAddress);
        const info = await stakeContract.checkUser(user_address, stakeAddress, 0);
        return info;
    } catch (e1) { console.log(e1); }
    return userInfo;
}

export async function iApprovedForStaking(account, collection, chainId, provider) {
    const stakeContract = getContractObj("TycheStake", chainId, provider);
    const collectionContract = getCollectionContract(collection, chainId, provider);
    return await collectionContract.isApprovedForAll(account, stakeContract.address);
}
export async function setApprovedForStaking(collection, chainId, provider) {
    const stakeContract = getContractObj("TycheStake", chainId, provider);
    const collectionContract = getCollectionContract(collection, chainId, provider);
    try {
        const tx = await collectionContract.setApprovalForAll(stakeContract.address, true);
        await tx.wait(1);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function deposit(from, collection, poolIndex, tokenIds, chainId, provider, signerAddress) {
    console.log("token IDS: ", tokenIds);
    const stakeContract = getContractObj("TycheStake", chainId, provider);
    try {
        let isApproved = await iApprovedForStaking(from, collection, chainId, provider);
        if (!isApproved) {
            isApproved = await setApprovedForStaking(collection, chainId, provider);
        }

        // Estimate gas for the transaction
        const estimatedGas = await stakeContract.estimateGas.stake(collection, poolIndex, tokenIds);

        // Prepare the transaction options
        const txOptions = {
            from,
            gasLimit: estimatedGas, // Use the estimated gas value
            gasPrice: await provider.getGasPrice(),
        };

        // Send the transaction
        const tx = await stakeContract.stake(collection,  poolIndex, tokenIds, txOptions);
        await tx.wait(1);
        return tx;
    } catch (err) {
        console.log("DepositError: ", err);
        return null;
    }
}

export async function claimRewards(collection, poolIndex, chainId, provider, signerAddress) {
    const stakeContract = getContractObj("TycheStake", chainId, provider);

    try {
        // Estimate gas for the transaction
        const estimatedGas = await stakeContract.estimateGas.claim(collection, poolIndex);

        // Prepare the transaction options
        const txOptions = {
            gasLimit: estimatedGas, // Use the estimated gas value
            gasPrice: await provider.getGasPrice(),
            from: signerAddress,
        };

        // Send the transaction
        const tx = await stakeContract.claim(collection, poolIndex, txOptions);

        // Wait for the transaction to be mined
        await tx.wait(1);

        return tx;
    } catch (err) {
        console.log("ClaimError: ", err);
        return null;
    }
}

export async function withdrawAll(collection, poolIndex, chainId, provider, signerAddress) {
    const stakeContract = getContractObj("TycheStake", chainId, provider);
    try {
        // Estimate gas for the transaction
        const estimatedGas = await stakeContract.estimateGas.unstake(collection, poolIndex);

        // Prepare the transaction options
        const txOptions = {
            gasLimit: estimatedGas, // Use the estimated gas value
            gasPrice: await provider.getGasPrice(),
            from: signerAddress,
        };

        // Send the transaction
        const tx = await stakeContract.unstake(collection, poolIndex, txOptions);
        await tx.wait(1);
        return true;
    } catch (err) {
        console.log("WithdrawError: ", err);
        return false;
    }
}
export async function withdrawOne(collection, tokenId, poolIndex, chainId, provider, signerAddress) {
    const stakeContract = getContractObj("TycheStake", chainId, provider);
    try {
        // Estimate gas for the transaction
        const estimatedGas = await stakeContract.estimateGas.unstakeOne(collection, poolIndex, tokenId);

        // Prepare the transaction options
        const txOptions = {
            gasLimit: estimatedGas, // Use the estimated gas value
            gasPrice: await provider.getGasPrice(),
            from: signerAddress,
        };
        const tx = await stakeContract.unstakeOne(collection, poolIndex, tokenId, txOptions);
        await tx.wait(1);
        return true;
    } catch (err) {
        console.log("WithdrawOneError: ", err);
        return false;
    }
}
export async function updatePoolRate(collection, newRate1, newRate2, poolIndex, chainId, provider) {
    const stakeContract = getContractObj("TycheStake", chainId, provider);
    try {
        const tx = await stakeContract.updateRewardRate(collection, newRate1, newRate2, poolIndex);
        await tx.wait(1);
        return true;
    } catch (err) {
        console.log("UpdatePoolRateError: ", err);
        return false;
    }
}
export async function getUserTokenIds(user_address, collection, poolIndex, chainId, provider) {
    const stakeContract = getContractObj("TycheStake", chainId, provider);
    try {
        const tokenIds = await stakeContract.getUserTokenIds(user_address, collection, poolIndex);
        return tokenIds;
    } catch (err) {
        console.log("getUserCollections: ", err);
        return [];
    }
}

export async function liveRewards(_user, stakeToken, poolIndex, chainId, provider) {
    console.log("liveRewards: ", _user, stakeToken, poolIndex, chainId);
    const stakeContract = getContractObj("TycheStake", chainId, provider);
    try {
        const tx = await stakeContract.checkRewards(_user, stakeToken, poolIndex);
        return tx;
    } catch (err) {
        console.log("liveRewards: ", err);
        return null;
    }
}

// Define the ERC-721 ABI (just the required parts)
const abi = [
    // Read-Only Functions
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function balanceOf(address owner) view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
];

// Fetch NFT collection details
export async function fetchNFTCollectionDetails(address) {
    const storageKey = `nftCollectionDetails_${address}`;
    let collectionDetails = getFromLocalStorage(storageKey);

    if (collectionDetails) {
        return collectionDetails;
    }

    try {
        const nftContract = new ethers.Contract(address, abi, defaultProvider);
        const name = await nftContract.name();
        const symbol = await nftContract.symbol();
        const uri = await nftContract.tokenURI(1);

        collectionDetails = { name, symbol, address, uri };
        setToLocalStorage(storageKey, collectionDetails);

        return collectionDetails;
    } catch (error) {
        console.error("Error fetching NFT collection details:", error);
        return null;
    }
}

export async function fetchUserNFTs(collectionAddress, userAddress) {
    try {
        const collectionMetadata = store.BaseCollections.find(c => c.address.toLowerCase() === collectionAddress.toLowerCase());

        if (!collectionMetadata) {
            console.warn(`Metadata not found for collection: ${collectionAddress}`);
            return [];
        }

        const nftContract = new ethers.Contract(collectionAddress, abi, defaultProvider);
        const balance = await nftContract.balanceOf(userAddress);
        const ownedNFTs = [];

        for (let i = 0; i < balance; i++) {
            const tokenId = await nftContract.tokenOfOwnerByIndex(userAddress, i);
            ownedNFTs.push({
                collection: collectionAddress,
                name: `${collectionMetadata.collection || 'Unknown Collection'} #${tokenId.toString()}`,
                tokenId: tokenId.toString(),
                image: collectionMetadata.image || '',
                owner: userAddress,
                balance: Number(balance)
            });
        }
        return ownedNFTs;
    } catch (error) {
        console.error("Error fetching user NFTs:", error);
        return [];
    }
}

export async function fetchTokenBalance(collectionAddress, userAddress) {
    const nftContract = new ethers.Contract(collectionAddress, abi, defaultProvider);
    const balance = await nftContract.balanceOf(userAddress);
    return balance.toString();
}

export async function fetchDashboardData() {
  try {
    const poolContracts = await getPoolContracts();
    const [allPoolsInfo, allCollectionsMetadata] = await Promise.all([getPoolInfoFromAddresses(poolContracts), getAllCollectionsMetadata(poolContracts)]);
    store.BaseCollections = allCollectionsMetadata;
    const mappedMetadata = await Promise.all(
      allCollectionsMetadata.map(async (collection) => {
        const poolInfo = allPoolsInfo.find(
          (info) => info.address === collection.address
        );
        return {
          ...collection,
          reward: formatEther(poolInfo?.info?.rewardPerSecond1.mul(86400)),
          token: (await getERC20Info(poolInfo?.info?.rewardToken1))?.name,
          endingDate: poolInfo?.info?.endTime.toNumber(),
          staked: poolInfo?.info?.stakedSupply.toNumber(),
          poolIndex: poolInfo?.poolIndex,
        };
      })
    );

    return {
      activeIncentivizedCollections: mappedMetadata,
      totalReward: 0, // You may want to calculate this
      totalBalance: 0, // You may want to calculate this
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}