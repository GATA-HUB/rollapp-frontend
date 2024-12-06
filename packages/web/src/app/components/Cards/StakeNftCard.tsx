"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import StakePopup from "../Popup/StakePopup";
import Link from "next/link";

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

interface Props {
  index: number;
  stakedNfts: CollectionNfts;
}

const StakeNftCard = ({ stakedNfts, index }: Props) => {
  const [showPopup, setshowPopup] = useState(false);
  const handleShwoPopup = () => {
    setshowPopup(!showPopup);
  };
  return (
    <motion.div
      onClick={handleShwoPopup}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      whileHover={{
        border: "1px solid rgba(1, 239, 156, 1)",
        boxShadow: "8px 8px 0px #01EF9C",
      }}
      className="w-full flex flex-col gap-4 p-4 rounded-lg bg-black cursor-pointer"
    >
      <div className="relative flex w-full aspect-square items-center justify-center rounded overflow-hidden">
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt=""
          src={stakedNfts.image}
        />
      </div>

      <h3>{stakedNfts.collection}</h3>

      <div className="w-full grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 w-full">
          <h5>ending date</h5>
          <p>{stakedNfts.endingDate}</p>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <h5>staked</h5>
          <p>
            {stakedNfts.staked}/{stakedNfts.quantity}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-1 w-full items-center">
          <h5 className="text-primary">rewards</h5>
          <div className="w-full h-[2px] rounded bg-primary"></div>
        </div>
        <div className="flex gap-2">
          <div className="flex px-2 py-1 rounded bg-darkGray">
            <p>
              {stakedNfts.reward} {stakedNfts.token}
            </p>
            <h5>/day</h5>
          </div>
          <div className="flex px-2 py-1 rounded bg-darkGray">
            <p>
              {stakedNfts.reward} {stakedNfts.token}
            </p>
            <h5>/day</h5>
          </div>
        </div>
      </div>
      {showPopup && <StakePopup nft={stakedNfts} onClose={handleShwoPopup} />}
    </motion.div>
  );
};

export default StakeNftCard;
