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

const StakeCollCard = ({ stakedNfts, index }: Props) => {
  const [showPopup, setshowPopup] = useState(false);
  const handleShwoPopup = () => {
    setshowPopup(!showPopup);
  };
  return (
    <Link href={`/stake/${index}`}>
      <motion.div
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
            <h5>Staked NFTs</h5>
            <p>
              {stakedNfts.staked}/{stakedNfts.quantity}
            </p>
          </div>
        </div>
      </motion.div>

      {showPopup && <StakePopup nft={stakedNfts} onClose={handleShwoPopup} />}
    </Link>
  );
};

export default StakeCollCard;