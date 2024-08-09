"use client";

import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

interface Nft {
  image: string;
  collection: string;
}

interface Props {
  asset: Nft;
}

const NFTAssetCard = ({ asset }: Props) => {
  return (
    <motion.div
      style={{
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      whileHover={{
        border: "1px solid rgba(1, 239, 156, 1)",
        boxShadow: "8px 8px 0px #01EF9C",
      }}
      className="w-full flex items-center justify-between gap-4 py-4 pl-4 pr-6 rounded-lg bg-black cursor-pointer"
    >
      <div className="flex gap-4 items-center">
        <div className="relative flex w-[64px] aspect-square items-center justify-center rounded overflow-hidden">
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt=""
            src={asset.image}
          />
        </div>

        <h3>{asset.collection}</h3>
      </div>

      <div className="flex flex-col items-end">
        <h5>total Holding</h5>
        <h3>4200</h3>
      </div>
    </motion.div>
  );
};

export default NFTAssetCard;
