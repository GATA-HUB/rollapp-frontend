"use client";

import React, { useState } from "react";
import { SecondaryButton } from "../components/Buttons";
import StakeNftCard from "../components/Cards/StakeNftCard";
import NftCard from "../components/Cards/NftCard";
import MintCard from "../components/Cards/MintCard";
import CollectionNftCard from "../components/Cards/CollectionNftCard";
import MintPopup from "../components/Popup/MintPopup";
import MintCollCard from "../components/Cards/MintCollCard";
import mintData from "../../public/mintColl.json";

interface LiveNfts {
  image: string;
  collection: string;
  creator: string;
  desc: string;
  quantity: number;
  minted: number;
  royalties: string;
  price: number;
  token: string;
}

interface Nfts {
  image: string;
  name: string;
  minted: boolean;
}

interface CollectionNfts {
  nfts: Nfts[];
  image: string;
  collection: string;
  creator: string;
  desc: string;
  quantity: number;
  minted: number;
  royalties: string;
  endingDate: boolean;
  price: number;
  token: string;
}

const page = () => {
  const initialMintNfts: CollectionNfts[] = mintData;

  return (
    <div className="page">
      {/* on going NFT's */}

      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-4 items-center justify-between">
          <div className="flex gap-4">
            <h2>Live mint</h2>
            <h2 className="text-textGray">{`(0${initialMintNfts.length})`}</h2>
          </div>
        </div>

        <div className="w-full grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {initialMintNfts.map((nft, i) => {
            if (nft.endingDate) {
              return <MintCard key={i} nft={nft} />;
            }
          })}
        </div>
      </div>

      {/* all collections */}

      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-4 items-center justify-between">
          <div className="flex gap-4">
            <h2>Ended mints</h2>
            <h2 className="text-textGray">{`(0${initialMintNfts.length})`}</h2>
          </div>
        </div>

        <div className="w-full grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {initialMintNfts.map((nft, i) => {
            if (!nft.endingDate) {
              return <MintCollCard key={i} index={i} nft={nft} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
