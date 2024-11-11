"use client";

import React, { useEffect, useCallback, useState } from "react";
import MintCard from "../components/Cards/MintCard";
import MintCollCard from "../components/Cards/MintCollCard";
import mintData from "../../public/mintColl.json";
import { ethers } from "ethers";
import {
  getAllCollectionsMetadata,
  registerMintListeners,
} from "@/app/utils/mintcontracts";
import { ENV } from "@/env";
import { BaseCollection } from "@/app/types/nft";
import { useAppContext } from "@/app/context/AppContext";
import CardLoader from "../components/loaders/CardLoader";
import OStateCard from "../components/EmptyState/OState";
import { useWeb3React } from "@web3-react/core";

const Page = () => {
  const initialMintNfts: BaseCollection[] = mintData;
  const contracts = ENV.liveMints;
  const { account } = useWeb3React();
  const { state, dispatch } = useAppContext();

  const fetchMintData = useCallback(
    async (isBackground = false) => {
      if (!isBackground) {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "mint", value: true },
        });
      }

      try {
        const liveMints = await getAllCollectionsMetadata(contracts);
        dispatch({ type: "SET_MINT_DATA", payload: { liveMints } });
      } catch (error) {
        console.error("Error fetching mint data:", error);
      } finally {
        if (!isBackground) {
          dispatch({
            type: "SET_LOADING",
            payload: { key: "mint", value: false },
          });
        }
      }
    },
    [dispatch, contracts]
  );

  useEffect(() => {
    if (!state.mint) {
      fetchMintData();
    } else {
      // If data exists, fetch in the background
      fetchMintData(true);
    }

    // Set up interval for background fetching
    const intervalId = setInterval(() => {
      fetchMintData(true);
    }, ENV.globalBackgroundRefreshInterval); // Fetch every minute

    const handleTransfer =
      (index: number) => (from: string, to: string, tokenId: string) => {
        const contractAddress = contracts[index];
        if (from === ethers.constants.AddressZero) {
          console.log(
            `NFT ${tokenId} transferred from ${from} to ${to} at contract ${contractAddress}`
          );
          // dispatch({ type: 'SET_MINT_DATA', payload: {
          //   liveMints: state.mint?.liveMints?.map(mint => {
          //     if (mint.address === contractAddress) {
          //       return { ...mint, minted: mint.minted + 1 };
          //     }
          //     return mint;
          //   }) || []
          // }});
        }
      };

    const unregisterListeners = registerMintListeners(
      contracts,
      handleTransfer
    );

    return () => {
      clearInterval(intervalId);
      unregisterListeners();
    };
  }, [fetchMintData, dispatch, contracts]);

  return (
    <div className="page">
      {/* on going NFT's */}
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-4 items-center justify-between">
          <div className="flex gap-4">
            <h2>Live mint</h2>
            <h2 className="text-textGray">{`(0${contracts.length})`}</h2>
          </div>
        </div>

        {account ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {state.loading.mint ? (
              <>
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
              </>
            ) : (
              state.mint?.liveMints?.map((nft, i) => {
                return <MintCard key={i} nft={nft} />;
              })
            )}
          </div>
        ) : (
          <OStateCard title="Connect your Wallet & start minting!" />
        )}
      </div>

      {/* all collections */}
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-4 items-center justify-between">
          <div className="flex gap-4">
            <h2>Ended mints</h2>
            <h2 className="text-textGray">{`(0${initialMintNfts.length})`}</h2>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {initialMintNfts.map((nft, i) => {
            if (!nft.endingDate) {
              return <MintCollCard key={i} index={i} nft={nft} />;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
