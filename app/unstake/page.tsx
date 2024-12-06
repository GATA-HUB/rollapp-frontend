"use client";

import React, { useState } from "react";
import ExploreNftCardDummy from "../components/Cards/ExploreNftCardDummy";
import StakeCollCard from "../components/Cards/StakeCollCard";
import collectionData from "../../public/collections.json";
import UnStakeCollCard from "@/app/components/Cards/UnStakeCollCard";

interface NftsInCollection {
  image: string;
  name: string;
  staked: boolean;
}

interface CollectionNfts {
  nfts: NftsInCollection[];
  image: string;
  collection: string;
  creator: string;
  desc: string;
  quantity: number;
  staked: number;
  endingDate: string;
  reward: number;
  token: string;
}

const page = () => {
  const stakedNfts: CollectionNfts[] = collectionData;
  return (
    <div className="page">

      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-4 items-center justify-between">
          <div className="flex gap-4">
            <h2>staked collections</h2>
            <h2 className="text-textGray">{`(0${stakedNfts.length})`}</h2>
          </div>
        </div>

        <div className="w-full grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {stakedNfts.map((nft, i) => {
            return <UnStakeCollCard key={i} index={i} stakedNfts={nft} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default page;