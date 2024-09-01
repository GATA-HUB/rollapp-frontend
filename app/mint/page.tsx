"use client";

import React, {useEffect, useState} from "react";
import { SecondaryButton } from "../components/Buttons";
import StakeNftCard from "../components/Cards/StakeNftCard";
import NftCard from "../components/Cards/NftCard";
import MintCard from "../components/Cards/MintCard";
import CollectionNftCard from "../components/Cards/CollectionNftCard";
import MintPopup from "../components/Popup/MintPopup";
import MintCollCard from "../components/Cards/MintCollCard";
import mintData from "../../public/mintColl.json";
import {ethers} from "ethers";
import {getAllCollectionsMetadata, registerMintListeners} from "@/app/utils/mintcontracts";
import {ENV} from "@/env";
import {BaseCollection} from "@/app/types/nft";
import {store} from "@/app/store";

const page = () => {
  const initialMintNfts: BaseCollection[] = mintData;
  const contracts = ENV.liveMints;
  const [liveMints, setLiveMints] = useState<BaseCollection[]>([]);


  console.log(contracts);

  useEffect(() => {
    getAllCollectionsMetadata(contracts).then(liveMints => {
      setLiveMints(liveMints);
      store.BaseCollections = liveMints;
    }).catch(console.error);
    const handleTransfer = (index: number) => (from: string, to: string, tokenId: string) => {
      const contractAddress = contracts[index];
      if (from === ethers.constants.AddressZero) {
        console.log(`NFT ${tokenId} transferred from ${from} to ${to} at contract ${contractAddress}`);
        setLiveMints(prev => {
          return prev.map(mint => {
            if(mint.address === contractAddress) {
              mint.minted = mint.minted + 1;
            }
            return mint;
          })
        });
      }
    };
    return registerMintListeners(contracts, handleTransfer);
  }, [contracts])


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

        <div className="w-full grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {liveMints.map((nft, i) => {
              return <MintCard key={i} nft={nft} />;
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