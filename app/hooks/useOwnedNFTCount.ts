import {useEffect, useState} from "react";
import { balanceOfUser } from "@/app/utils/mintcontracts";
import { ENV } from "@/env";
import { useWeb3React } from "@web3-react/core";

export function useOwnedNFTCount() {
  const [totalBalance, setTotalBalance] = useState(0);
  const contracts = ENV.liveMints;
  const { account } = useWeb3React();
  useEffect(() => {
    (async () => {
      if (!account) return;

      let total = 0;
      for (let i = 0; i < contracts.length; i++) {
        const balance = await balanceOfUser(account, contracts[i]);
        if (balance > 0) {
          total += balance;
        }
        console.log(balance, contracts[i]);
      }
      setTotalBalance(total);
    })();
  }, [account]);
  return {
    totalBalance,
  };
}