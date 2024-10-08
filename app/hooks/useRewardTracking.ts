import {useCallback, useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {checkActiveTime} from "@/app/utils";
import {liveRewards} from "@/app/utils/contracts";
import {ethers} from "ethers";
import {useAppContext} from "@/app/context/AppContext";

interface RewardItem {
  stakeAddress: string;
  reward1: number;
  reward2: number;
  claimable: boolean;
  claimnap: number;
  poolIndex: number;
}

export function useRewardTracking() {
  const [listReward, setListReward] = useState<RewardItem[]>([]);
  const { account, chainId, library } = useWeb3React();
  const { state, dispatch } = useAppContext();

  const getRewardRealTime = useCallback(
    async () => {
      if (!account || !chainId || !library) return;
      
      const activeIncentivizedCollections = state.dashboard?.activeIncentivizedCollections || [];
      
      let _newList: RewardItem[] = [];
      for (let i = 0; i < activeIncentivizedCollections.length; i++) {
        const collection = activeIncentivizedCollections[i];
        let m_reward1 = 0;
        let m_reward2 = 0;
        let claimable = false;
        let delayTime = checkActiveTime(collection.address, collection.poolIndex, account);
        if (delayTime < 0) {
          claimable = true;
          const token1Info = collection.rewardToken1;
          const token2Info = collection.rewardToken2;
          let _rewards = await liveRewards(
            account,
            collection.address,
            collection.poolIndex,
            chainId,
            library.getSigner()
          );
          if (_rewards == null) continue;
          m_reward1 = Number(ethers.utils.formatUnits(
            _rewards[0],
            token1Info?.decimals
          ));
          if (token2Info) {
            m_reward2 = Number(ethers.utils.formatUnits(
              _rewards[1],
              token2Info?.decimals
            ));
          }
        }
        _newList.push({
          stakeAddress: collection.address,
          reward1: m_reward1,
          reward2: m_reward2,
          claimable: claimable,
          claimnap: delayTime,
          poolIndex: collection.poolIndex,
        });
      }
      setListReward(_newList);
    },
    [account, chainId, library, state.dashboard?.activeIncentivizedCollections]
  );

  let timerInterval: string | number | NodeJS.Timeout | undefined;
  useEffect(() => {
    getRewardRealTime();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      getRewardRealTime();
    }, 15000);
    return () => clearInterval(timerInterval);
  }, [getRewardRealTime]);

  useEffect(() => {
    let tReward = 0;
    for (let i = 0; i < listReward.length; i++) {
      let rewardTemp = listReward[i].reward1;
      let rewardTemp2 = listReward[i].reward2;
      tReward += rewardTemp;
      tReward += rewardTemp2;
    }
    console.log("total reward", tReward);
    dispatch({ type: 'SET_TOTAL_REWARD', payload: tReward });
  }, [listReward, dispatch]);

  return { listReward };
}