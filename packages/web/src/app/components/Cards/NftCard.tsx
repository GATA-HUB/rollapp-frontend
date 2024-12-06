"use client";

import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

interface MintedNfts {
  image: string;
  collection: string;
  quantity: number;
  minted: number;
  price: string;
}

interface Props {
  nft: MintedNfts;
}

const NftCard = ({ nft }: Props) => {
  return (
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
          src={nft.image}
        />
      </div>

      <h3>{nft.collection}</h3>

      <div className="w-full grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 w-full">
          <h5>quantity</h5>
          <p>{nft.quantity}</p>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <h5>minted</h5>
          <p>{nft.minted}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-4 py-2 rounded bg-darkGray">
        <h5 className="text-primary">mint price</h5>
        <h4>{nft.price}</h4>
      </div>
    </motion.div>
  );
};

export default NftCard;
