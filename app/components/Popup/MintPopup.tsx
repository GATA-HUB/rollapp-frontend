"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  PrimaryButton,
  PrimaryMintButton,
  SecondaryButton,
  TertiaryButton,
} from "../Buttons";
import { mint } from "@/app/utils/mintcontracts";
import { useWeb3React } from "@web3-react/core";
import { BaseCollection } from "@/app/types/nft";
import Link from "next/link";

interface Props {
  nft: BaseCollection;
  onClose: () => void;
}

const MintPopup = ({ nft, onClose }: Props) => {
  const [tokenQuantity, setTokenQuantity] = useState(1);
  const maxToken = 50;
  const { account, chainId, library } = useWeb3React();
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintFailed, setMintFailed] = useState(false);

  const handleAddToken = () => {
    if (tokenQuantity < maxToken) {
      setTokenQuantity(tokenQuantity + 1);
    }
  };

  const handleReduseToken = () => {
    if (tokenQuantity > 1) {
      setTokenQuantity(tokenQuantity - 1);
    }
  };

  const handleMaxToken = () => {
    setTokenQuantity(maxToken);
  };

  const handleHalfToken = () => {
    setTokenQuantity(maxToken / 2);
  };

  const mintNFT = async () => {
    const result = await mint(
      nft.address,
      tokenQuantity,
      nft.price,
      library.getSigner(),
      account
    );
    console.log("Mint response status : ", result);
    if (result) {
      setMintSuccess(true);
    } else {
      console.log("Failed to mint!");
      setMintFailed(true);
    }
  };

  if (mintSuccess) {
    return (
      <div className="z-20 fixed top-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm p-8">
        <div className="relative max-w-[512px] p-16 flex flex-col gap-4 items-center text-center overflow-hidden rounded-2xl border-[1px] border-white border-opacity-10">
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt=""
            src="/bg/noticeCard.jpg"
          />
          <div className="z-10 flex flex-col gap-4 items-center">
            <Image width={160} height={160} alt="" src="/successTrans.png" />
            <h1>Amazing! You've Done it Successfully.</h1>
            <p className="text-textGray">
              You have successfully minted {nft.collection}!
            </p>
            <PrimaryButton onClick={() => setMintSuccess(false)}>
              Back to {nft.collection}
            </PrimaryButton>
            <SecondaryButton onClick={onClose}>Back to Mint</SecondaryButton>
          </div>
        </div>
      </div>
    );
  }

  if (mintFailed) {
    return (
      <div className="z-20 fixed top-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm p-8">
        <div className="relative max-w-[512px] p-16 flex flex-col gap-4 items-center text-center overflow-hidden rounded-2xl border-[1px] border-white border-opacity-10">
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt=""
            src="/bg/noticeCard.jpg"
          />
          <div className="z-10 flex flex-col gap-4 items-center">
            <Image width={160} height={160} alt="" src="/errorTrans.png" />
            <h1>Something went wrong!</h1>
            <p className="text-textGray">Failed to mint! Please try again.</p>
            <PrimaryButton onClick={() => setMintFailed(false)}>
              Back to {nft.collection}
            </PrimaryButton>
            <TertiaryButton onClick={onClose}>Back to Mint</TertiaryButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="z-20 fixed top-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm p-8">
      <div className="w-full max-w-[920px] grid grid-cols-2 gap-4 p-4 rounded-lg bg-black border-[1px] border-white border-opacity-10">
        <div className="relative flex w-full aspect-square items-center justify-center rounded overflow-hidden">
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt=""
            src={nft.image}
          />
        </div>

        <div className="flex flex-col gap-4 w-full px-4 py-2">
          <div className="flex gap-4 w-full justify-between">
            <h4>{nft.collection}</h4>

            <div
              onClick={onClose}
              className="group w-6 h-6 flex items-center justofy-center cursor-pointer"
            >
              <svg
                className="fill-white group-hover:fill-primary"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.964 5.63604C18.7687 5.44078 18.4521 5.44078 18.2569 5.63604L12.6 11.2929L6.94315 5.63604C6.74789 5.44078 6.43131 5.44078 6.23605 5.63604C6.04078 5.8313 6.04078 6.14789 6.23605 6.34315L11.8929 12L6.23605 17.6569C6.04078 17.8521 6.04078 18.1687 6.23605 18.364C6.43131 18.5592 6.74789 18.5592 6.94315 18.364L12.6 12.7071L18.2569 18.364C18.4521 18.5592 18.7687 18.5592 18.964 18.364C19.1592 18.1687 19.1592 17.8521 18.964 17.6569L13.3071 12L18.964 6.34315C19.1592 6.14789 19.1592 5.8313 18.964 5.63604Z"
                  fill=""
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <h5>Created by</h5>
            <p>{nft.creator}</p>
          </div>

          <p>{nft.desc}</p>

          <div className="w-full grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1 w-full">
              <h5>Minted</h5>
              <div className="flex gap-1">
                <p>{nft.minted}</p>
                <p className="text-textGray">
                  {`(${((nft.minted / nft.quantity) * 100).toFixed(2)}%)`}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <h5>Quantity</h5>
              <p>{nft.quantity}</p>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <h5>Royalties</h5>
              <p>{nft.royalties}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 px-4 py-2 rounded bg-darkGray">
            <h5 className="text-primary">mint price</h5>
            <div className="flex gap-2">
              <h4>{nft.price}</h4>
              <h4>{nft.token}</h4>
            </div>
          </div>

          <div className="flex w-full items-end justify-between">
            <div className="flex flex-col gap-1 w-full">
              <h5>Token Quantity</h5>
              <div className="flex gap-4 w-fit">
                <div className="flex gap-4 w-fit p-1 rounded-lg border-[1px] border-white border-opacity-10 bg-black">
                  <div
                    onClick={handleReduseToken}
                    className="group flex p-2 items-center justify-center bg-darkGray rounded cursor-pointer"
                  >
                    <svg
                      className="fill-white group-hover:fill-[#FF8787] transition-all duration-300 ease-in-out"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="4" width="10" height="2" rx="1" fill="" />
                    </svg>
                  </div>

                  {tokenQuantity}

                  <div
                    onClick={handleAddToken}
                    className="group flex p-2 items-center justify-center bg-darkGray rounded cursor-pointer"
                  >
                    <svg
                      className="fill-white group-hover:fill-[#01EF9C] transition-all duration-300 ease-in-out"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 1C6 0.447715 5.55228 0 5 0C4.44772 0 4 0.447715 4 1L4 4H1C0.447715 4 0 4.44772 0 5C0 5.55228 0.447716 6 1 6H4L4 9C4 9.55229 4.44771 10 5 10C5.55228 10 6 9.55228 6 9V6H9C9.55229 6 10 5.55228 10 5C10 4.44772 9.55228 4 9 4H6V1Z"
                        fill=""
                      />
                    </svg>
                  </div>
                </div>
                <SecondaryButton onClick={handleHalfToken}>
                  half
                </SecondaryButton>
                <SecondaryButton onClick={handleMaxToken}>max</SecondaryButton>
              </div>
            </div>

            <div className="flex flex-col gap-1 w-32">
              <div className="flex gap2">
                <p>{(nft.price * tokenQuantity).toFixed(2)}</p>
                <p>{nft.token}</p>
              </div>
              <h5>{`Max ${maxToken} tokens`}</h5>
            </div>
          </div>

          <PrimaryMintButton onClick={mintNFT}>mint</PrimaryMintButton>
        </div>
      </div>
    </div>
  );
};

export default MintPopup;
