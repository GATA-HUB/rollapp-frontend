import {useCallback, useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {checkActiveTime} from "@/app/utils";
import {liveRewards} from "@/app/utils/contracts";
import {ethers} from "ethers";
import {store} from "@/app/store";

export function useRewardTracking() {
  const [listReward, setListReward] = useState([]);
  const [totalReward, setTotalReward] = useState(0);
  const { account, chainId, library } = useWeb3React();
  const getRewardRealTime = useCallback(
    async (_dataList, _dataFlag) => {
      if (!account || !chainId || !library) return;
      let dataList = _dataList;
      if (!_dataFlag) dataList = [{address: '0x9B28891A70ee297Bb2EAa8d6e3b7cC55eaA6dc24', poolIndex: 0}, {address: '0x644439090d56986f3da56c42b7bc864cfa668ce9', poolIndex: 0}, ];
      let _newList = [];
      for (let i = 0; i < dataList.length; i++) {
        let m_reward1 = 0;
        let m_reward2 = 0;
        let claimable = false;
        let delayTime = checkActiveTime(dataList[i].address, dataList[i].poolIndex, account);
        if (delayTime < 0) {
          claimable = true;
          const token1Info = dataList[i].rewardToken1;
          const token2Info = dataList[i].rewardToken2;
          let _rewards = await liveRewards(
            account,
            dataList[i].address,
            dataList[i].poolIndex,
            chainId,
            library.getSigner()
          );
          if (_rewards == null) continue;
          m_reward1 = ethers.utils.formatUnits(
            _rewards[0],
            token1Info?.decimals
          );
          if (token2Info) {
            m_reward2 = ethers.utils.formatUnits(
              _rewards[1],
              token2Info?.decimals
            );
          }
        }
        _newList.push({
          stakeAddress: dataList[i].address,
          reward1: m_reward1,
          reward2: m_reward2,
          claimable: claimable,
          claimnap: delayTime,
          poolIndex: dataList[i].poolIndex,
        });
      }
      setListReward(_newList);
    },
    [account, chainId, library]
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
      tReward += Number(rewardTemp);
      tReward += Number(rewardTemp2);
    }
    console.log("total reward", tReward);
    setTotalReward(tReward);
    store.totalReward = tReward;
  }, [listReward]);
  return { listReward, totalReward };
}