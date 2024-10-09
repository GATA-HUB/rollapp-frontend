"use client";

import React, { useEffect, useCallback } from "react";
import StakeCollCard from "../components/Cards/StakeCollCard";
import collectionData from "../../public/collections.json";
import { useWeb3React } from "@web3-react/core";
import {
  fetchNFTCollectionDetails,
  getPoolContracts,
  getUserInfoFromAddresses,
} from "@/app/utils/contracts";
import { StakedCollection } from "@/app/types/nft";
import { ENV } from "@/env";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/app/utils/localStorage";
import { useAppContext } from "@/app/context/AppContext";
import CardLoader from "../components/loaders/CardLoader";
import OStateCard from "../components/EmptyState/OState";
import Image from "next/image";
import EmptyState from "../components/EmptyState/EmptyState";

const Page = () => {
  const stakedNfts = collectionData;
  const { account, chainId } = useWeb3React();
  const { state, dispatch } = useAppContext();

  const fetchStakedCollections = useCallback(
    async (isBackground = false) => {
      if (!account) return;

      if (!isBackground) {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "staked", value: true },
        });
      }

      try {
        const poolContracts = await getPoolContracts();
        let infoList = await getUserInfoFromAddresses(account, poolContracts);
        let stakedList = [];

        for (let i = 0; i < infoList.length; i++) {
          if (infoList[i].info.amount.toNumber() > 0) {
            const data = await fetchNFTCollectionDetails(infoList[i].address);
            const storageKey = `ipfsGatewayMetadata_${infoList[i].address}`;
            let metadata = getFromLocalStorage(storageKey);

            if (!metadata) {
              const ipfsGatewayMetadata = data?.uri.replace(
                "ipfs://",
                ENV.ipfsGateway
              );
              metadata = await fetch(ipfsGatewayMetadata).then((response) =>
                response.json()
              );
              setToLocalStorage(storageKey, metadata);
            }

            const { description, image } = metadata;
            let _item = {
              description,
              address: infoList[i].address,
              userInfo: infoList[i].info,
              poolIndex: infoList[i].poolIndex,
              image: image.replace("ipfs://", ENV.ipfsGateway),
              staked: infoList[i].info.amount.toNumber(),
            };
            stakedList.push(_item);
          }
        }

        dispatch({
          type: "SET_STAKED_DATA",
          payload: { stakedCollections: stakedList },
        });
      } catch (error) {
        console.error("Error fetching staked collections:", error);
      } finally {
        if (!isBackground) {
          dispatch({
            type: "SET_LOADING",
            payload: { key: "staked", value: false },
          });
        }
      }
    },
    [account, dispatch]
  );

  useEffect(() => {
    if (!state.staked) {
      fetchStakedCollections();
    } else {
      // If data exists, fetch in the background
      fetchStakedCollections(true);
    }

    // Set up interval for background fetching
    const intervalId = setInterval(() => {
      fetchStakedCollections(true);
    }, ENV.globalBackgroundRefreshInterval); // Fetch every minute

    return () => clearInterval(intervalId);
  }, [fetchStakedCollections]);

  return (
    <div className="page">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-4 items-center justify-between">
          <div className="flex gap-4">
            <h2>staked collections</h2>
            <h2 className="text-textGray">{`(0${
              state.staked?.stakedCollections?.length || 0
            })`}</h2>
          </div>
        </div>

        {account ? (
          <div className="flex w-full">
            {state.loading.staked ? (
              <div className="w-full grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
              </div>
            ) : (
              <>
                {state.staked?.stakedCollections?.length ? (
                  <div className="w-full grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {state.staked?.stakedCollections?.map((nft, i) => (
                      <StakeCollCard key={i} index={i} stakedNfts={nft} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="You have no NFTs staked."
                    desc="Check our mint page to staked some NFTs and get rewards!"
                    href="/mint"
                    buttonTitle="mint now"
                  />
                )}
              </>
            )}
          </div>
        ) : (
          <OStateCard title="Connect Your Wallet and stake NFTs!" />
        )}
      </div>
    </div>
  );
};

export default Page;
