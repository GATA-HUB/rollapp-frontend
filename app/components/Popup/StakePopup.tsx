"use client";
import React from "react";
import Image from "next/image";
import { BaseCollection } from "@/app/types/nft";
import Link from "next/link";
import { PrimaryStakeButton } from "../Buttons";

interface Props {
  nft: BaseCollection;
  onClose: () => void;
}

const StakePopup = ({ nft, onClose }: Props) => {
  return (
    // <div className="z-10 fixed top-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm p-8">
    //   <div className="w-full max-w-[1280px] grid grid-cols-2 gap-4 p-4 rounded-lg bg-black border-[1px] border-white border-opacity-10">
    //     <div className="grid grid-cols-4 gap-4">
    //       {collection.nfts.map((nft, i) => {
    //         if (nft.staked) {
    //           return (
    //             <div
    //               key={i}
    //               className="h-fit flex flex-col gap-2 p-2 bg-black rounded-lg border-[1px] border-primary transition-all duration-300 ease-in-out cursor-pointer"
    //             >
    //               <div className="relative flex w-full aspect-square items-center justify-center rounded overflow-hidden">
    //                 <Image
    //                   layout="fill"
    //                   objectFit="cover"
    //                   objectPosition="center"
    //                   alt=""
    //                   src={nft.image}
    //                 />
    //               </div>
    //               <h3>{nft.name}</h3>
    //             </div>
    //           );
    //         }
    //         return (
    //           <div
    //             key={i}
    //             className="h-fit flex flex-col gap-2 p-2 bg-black rounded-lg border-[1px] border-white border-opacity-10 hover:border-primary transition-all duration-300 ease-in-out cursor-pointer"
    //           >
    //             <div className="relative flex w-full aspect-square items-center justify-center rounded overflow-hidden">
    //               <Image
    //                 layout="fill"
    //                 objectFit="cover"
    //                 objectPosition="center"
    //                 alt=""
    //                 src={nft.image}
    //               />
    //             </div>
    //             <h3>{nft.name}</h3>
    //           </div>
    //         );
    //       })}
    //     </div>

    //     <div className="flex flex-col gap-4 w-full px-4 py-2">
    //       <div className="flex gap-4 w-full justify-between">
    //         <h4>{collection.collection}</h4>

    //         <div
    //           onClick={onClose}
    //           className="group w-6 h-6 flex items-center justofy-center cursor-pointer"
    //         >
    //           <svg
    //             className="fill-white group-hover:fill-primary"
    //             width="25"
    //             height="24"
    //             viewBox="0 0 25 24"
    //             fill="none"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               d="M18.964 5.63604C18.7687 5.44078 18.4521 5.44078 18.2569 5.63604L12.6 11.2929L6.94315 5.63604C6.74789 5.44078 6.43131 5.44078 6.23605 5.63604C6.04078 5.8313 6.04078 6.14789 6.23605 6.34315L11.8929 12L6.23605 17.6569C6.04078 17.8521 6.04078 18.1687 6.23605 18.364C6.43131 18.5592 6.74789 18.5592 6.94315 18.364L12.6 12.7071L18.2569 18.364C18.4521 18.5592 18.7687 18.5592 18.964 18.364C19.1592 18.1687 19.1592 17.8521 18.964 17.6569L13.3071 12L18.964 6.34315C19.1592 6.14789 19.1592 5.8313 18.964 5.63604Z"
    //               fill=""
    //             />
    //           </svg>
    //         </div>
    //       </div>

    //       <div className="flex flex-col gap-1 w-full">
    //         <h5>Created by</h5>
    //         <p>{collection.creator}</p>
    //       </div>

    //       <p>{collection.desc}</p>

    //       <div className="w-full grid grid-cols-3 gap-4">
    //         <div className="flex flex-col gap-1 w-full">
    //           <h5>Staked</h5>
    //           <div className="flex gap-1">
    //             <p>{collection.staked}</p>
    //             <p className="text-textGray">
    //               {`(${(
    //                 (collection.staked / collection.quantity) *
    //                 100
    //               ).toFixed(2)}%)`}
    //             </p>
    //           </div>
    //         </div>

    //         <div className="flex flex-col gap-1 w-full">
    //           <h5>Ending date</h5>
    //           <p>{collection.endingDate}</p>
    //         </div>
    //       </div>

    //       <div className="flex flex-col gap-1 px-4 py-2 rounded bg-darkGray">
    //         <h5 className="text-primary">reward</h5>
    //         <div className="flex gap-2 items-end">
    //           <h4>{collection.reward}</h4>
    //           <h4>{collection.token}</h4>
    //           <p>/Day</p>
    //         </div>
    //       </div>

    //       {/* <div className="flex w-full items-end justify-between">
    //         <div className="flex flex-col gap-1 w-full">
    //           <h5>Token Quantity</h5>
    //           <div className="flex gap-4 w-fit">
    //             <div className="flex gap-4 w-fit p-1 rounded-lg border-[1px] border-white border-opacity-10 bg-black">
    //               <div
    //                 onClick={handleReduseToken}
    //                 className="group flex p-2 items-center justify-center bg-darkGray rounded cursor-pointer"
    //               >
    //                 <svg
    //                   className="fill-white group-hover:fill-[#FF8787] transition-all duration-300 ease-in-out"
    //                   width="10"
    //                   height="10"
    //                   viewBox="0 0 10 10"
    //                   fill="none"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <rect y="4" width="10" height="2" rx="1" fill="" />
    //                 </svg>
    //               </div>

    //               {tokenQuantity}

    //               <div
    //                 onClick={handleAddToken}
    //                 className="group flex p-2 items-center justify-center bg-darkGray rounded cursor-pointer"
    //               >
    //                 <svg
    //                   className="fill-white group-hover:fill-[#01EF9C] transition-all duration-300 ease-in-out"
    //                   width="10"
    //                   height="10"
    //                   viewBox="0 0 10 10"
    //                   fill="none"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     d="M6 1C6 0.447715 5.55228 0 5 0C4.44772 0 4 0.447715 4 1L4 4H1C0.447715 4 0 4.44772 0 5C0 5.55228 0.447716 6 1 6H4L4 9C4 9.55229 4.44771 10 5 10C5.55228 10 6 9.55228 6 9V6H9C9.55229 6 10 5.55228 10 5C10 4.44772 9.55228 4 9 4H6V1Z"
    //                     fill=""
    //                   />
    //                 </svg>
    //               </div>
    //             </div>
    //             <SecondaryButton onClick={handleHalfToken}>
    //               half
    //             </SecondaryButton>
    //             <SecondaryButton onClick={handleMaxToken}>max</SecondaryButton>
    //           </div>
    //         </div>

    //         <div className="flex flex-col gap-1 w-32">
    //           <div className="flex gap2">
    //             <p>{collection.price * tokenQuantity}</p>
    //             <p>{collection.token}</p>
    //           </div>
    //           <h5>{`Max ${maxToken} tokens`}</h5>
    //         </div>
    //       </div> */}

    //       <PrimaryStakeButton>stake</PrimaryStakeButton>
    //     </div>
    //   </div>
    // </div>

    <div className="z-10 fixed top-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm p-8">
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
              <h5>Staked</h5>
              <div className="flex gap-1">
                <p>{nft.staked}</p>
                <p className="text-textGray">
                  {`(${((nft.staked / nft.quantity) * 100).toFixed(2)}%)`}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <h5>Quantity</h5>
              <p>{nft.quantity}</p>
            </div>
          </div>
            <Link href={`/stake/${nft.address}`}>
              <PrimaryStakeButton>Stake</PrimaryStakeButton>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default StakePopup;