"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import MintPopup from "../Popup/MintPopup";
import Link from "next/link";

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

interface Props {
  index: number;
  nft: CollectionNfts;
}
const CollectionNftCard = ({ nft, index }: Props) => {
  const [showPopup, setshowPopup] = useState(false);
  const handleShwoPopup = () => {
    setshowPopup(!showPopup);
  };
  return (
    <Link href={`/mint/${index}`}>
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
          {nft.endingDate ? (
            <div className="absolute z-10 top-1 right-1 text-darkGray flex rounded-full bg-primary px-3 py-1">
              <p>live mint</p>
            </div>
          ) : (
            <div className="absolute z-10 top-1 right-1 text-darkGray flex rounded-full bg-[#FF6F6F] px-3 py-1">
              <p>ended mint</p>
            </div>
          )}
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
            <h5>Quantity</h5>
            <p>{nft.quantity}</p>
          </div>
        </div>
      </motion.div>

      {/* {showPopup && <MintPopup nft={nft} onClose={handleShwoPopup} />} */}
    </Link>
  );
};

export default CollectionNftCard;
