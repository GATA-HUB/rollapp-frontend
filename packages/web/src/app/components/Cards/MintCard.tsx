"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import MintPopup from "../Popup/MintPopup";

interface MintNft {
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
  nft: MintNft;
}

const MintCard = ({ nft }: Props) => {
  const [showPopup, setshowPopup] = useState(false);
  const handleShwoPopup = () => {
    setshowPopup(!showPopup);
  };
  return (
    <>
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
            <h5>Royalties</h5>
            <p>{nft.royalties}</p>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <h5>minted</h5>
            <p>
              {nft.minted}/{nft.quantity}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1 px-4 py-2 rounded bg-darkGray">
          <h5 className="text-primary">mint price</h5>
          <div className="flex gap-1 items-end">
            <h3>{nft.price}</h3>
            <h3>{nft.token}</h3>
          </div>
        </div>
      </motion.div>

      {showPopup && <MintPopup nft={nft} onClose={handleShwoPopup} />}
    </>
  );
};

export default MintCard;
