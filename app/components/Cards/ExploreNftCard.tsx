"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import ExplorePopup from "../Popup/ExplorePopup";
import { BaseCollection } from "@/app/types/nft";
import StakePopup from "@/app/components/Popup/StakePopup";

interface Props {
  index: number;
  stakedNfts: BaseCollection;
}

const ExploreNftCardDummy = ({ stakedNfts, index }: Props) => {
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
          <p>{new Date(stakedNfts.endingDate * 1000).toLocaleDateString()}</p>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <h5>staked</h5>
          <p>
            {stakedNfts.staked}/{stakedNfts.quantity}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-4 py-2 rounded bg-darkGray">
        <h5 className="text-primary">reward</h5>
        <div className="flex gap-1 items-end">
          <h3>{stakedNfts.reward}</h3>
          <h3>{stakedNfts.token}</h3>
          <p className="text-textGray">/day</p>
        </div>
      </div>
      {showPopup && <StakePopup nft={stakedNfts} onClose={handleShwoPopup} />}
    </motion.div>
  );
};

export default ExploreNftCardDummy;
