"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {SecondaryButton} from "../components/Buttons";
import ExploreNftCardDummy from "../components/Cards/ExploreNftCardDummy";
import collectionData from "../../../public/collections.json";
import {claimRewards,} from "@/app/utils/contracts";
import ExploreNftCard from "@/app/components/Cards/ExploreNftCard";
import {useWeb3React} from "@web3-react/core";
import {useOwnedNFTCount} from "@/app/hooks/useOwnedNFTCount";
import Link from "next/link";
import {useAppContext} from "@/app/context/AppContext";
import CardLoader from "../components/loaders/CardLoader";
import OStateCard from "../components/EmptyState/OState";

const Page = () => {
  const endedIncentiveCollections = collectionData;
  const { account, chainId, library } = useWeb3React();
  const { totalBalance: totalNFTBalance } = useOwnedNFTCount();
  const { state } = useAppContext();

  const [showBalance, setShowBalance] = useState(false);
  const handleShowBalance = () => {
    setShowBalance(!showBalance);
  };

  useEffect(() => {
    // You can still update the UI or perform other actions when the dashboard data changes
  }, [state.dashboard]);

  const handleClaim = async () => {
    state.dashboard?.activeIncentivizedCollections?.forEach(
      async (collection) => {
        claimRewards(
          collection.address,
          collection.poolIndex,
          chainId,
          library.getSigner(),
          account
        ).then(async (tx) => {
          // Handle successful claim
          // fetchDashboardData(true);
        });
      }
    );
  };

  return (
    <div className="page">
      <div className="w-full grid grid-cols-4 gap-4">
        {/* Loyalty */}
        <div className="flex flex-col gap-2 col-span-1">
          <h2 className="text-white">loyalty</h2>
          <Link href="https://gatahub-loyalty.netlify.app/">
            <div className="group relative w-full h-full max-h-[87.48px] flex flex-col gap-1 justify-end p-4 rounded-lg gradient-background border-[1px] border-white border-opacity-10 overflow-hidden cursor-pointer">
              <div className="flex flex-col h-full justify-start group-hover:mb-[86px] z-10 gap-8 transition-all duration-300 ease-in-out">
                <div className="flex flex-col gap-1">
                  <h5>total points</h5>
                  <h1>1000</h1>
                </div>
                <div className="flex gap-2 items-center justify-center w-full min-h-[54px]">
                  <p>Increase your points</p>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12L21.5 2.5M21.5 2.5H17M21.5 2.5V7"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2.5C12 2.77614 11.7761 3 11.5 3H6C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V12.5C21 12.2239 21.2239 12 21.5 12V12C21.7761 12 22 12.2239 22 12.5V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H11.5C11.7761 2 12 2.22386 12 2.5V2.5Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 mb-[-18px] group-hover:mb-[-48px] transition-all duration-300 ease-in-out">
                <Image
                  width={192}
                  height={131}
                  alt=""
                  src="/bg/pointsGreen.png"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Assets */}
        <div className="flex flex-col gap-2 col-span-3">
          <h2 className="text-white">Assets</h2>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 w-full flex flex-col gap-1 justify-end p-4 rounded-lg bg-black border-[1px] border-white border-opacity-10 overflow-hidden">
              <div className="flex flex-col gap-1 z-10">
                <h5>total USD</h5>
                <div className="flex gap-4 items-center">
                  <h1>{showBalance ? "$10,000" : "*****"}</h1>
                  <div onClick={handleShowBalance} className="group w-6 h-6">
                    {showBalance ? (
                      <svg
                        className="fill-white group-hover:fill-primary"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.35355 3.64645C4.15829 3.45118 3.84171 3.45118 3.64645 3.64645C3.45118 3.84171 3.45118 4.15829 3.64645 4.35355L6.80579 7.5129C5.25119 8.50225 3.98803 9.92251 3.17745 11.6095C3.05884 11.8564 3.05887 12.1437 3.17749 12.3906C4.77363 15.7124 8.12456 18 12 18C13.5383 18 14.9939 17.6396 16.29 16.9971L19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L4.35355 3.64645ZM15.5386 16.2457L14.4527 15.1598C14.3181 15.2643 14.1774 15.3597 14.0315 15.4457C13.4212 15.8056 12.7206 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 11.2794 8.19444 10.5788 8.55427 9.96848C8.64026 9.82262 8.7357 9.6819 8.84019 9.5473L7.53227 8.23938C6.19934 9.04046 5.08953 10.1898 4.32418 11.5682C4.175 11.8369 4.17503 12.1632 4.32422 12.4319C5.84275 15.1666 8.71728 17 12 17C13.2571 17 14.4544 16.7311 15.5386 16.2457ZM9.55479 10.2619C9.45456 10.4029 9.36701 10.5519 9.29289 10.7071C9.10187 11.1071 9 11.5483 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.4517 15 12.8929 14.8981 13.2929 14.7071C13.4481 14.633 13.5971 14.5454 13.7381 14.4452L13.0158 13.7229C12.7106 13.9028 12.3603 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0392 10 12.5305 10 12C10 11.6397 10.0972 11.2894 10.2771 10.9843L9.55479 10.2619Z"
                          fill=""
                        />
                        <path
                          d="M18.3669 14.9527C18.5587 15.1445 18.8695 15.1489 19.0563 14.9523C19.7688 14.202 20.3671 13.3383 20.8226 12.3905C20.9412 12.1436 20.9411 11.8563 20.8225 11.6095C19.2264 8.28757 15.8754 6 12 6C11.5249 6 11.0577 6.03438 10.6006 6.10083C10.1984 6.15931 10.0594 6.64523 10.3469 6.93264C10.4665 7.05224 10.6365 7.10537 10.804 7.08216C11.1953 7.02797 11.5945 7 12 7C15.2827 7 18.1573 8.8334 19.6758 11.5681C19.825 11.8368 19.825 12.1631 19.6758 12.4318C19.3125 13.0862 18.8715 13.6889 18.3659 14.2273C18.1737 14.432 18.1684 14.7542 18.3669 14.9527Z"
                          fill=""
                        />
                      </svg>
                    ) : (
                      <svg
                        className="fill-white group-hover:fill-primary"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.8225 11.6095C20.9411 11.8563 20.9411 12.1437 20.8225 12.3906C19.2264 15.7124 15.8754 18 12 18C8.12455 18 4.77361 15.7124 3.17747 12.3906C3.05885 12.1437 3.05885 11.8563 3.17747 11.6094C4.77361 8.28756 8.12455 6 12 6C15.8754 6 19.2264 8.28757 20.8225 11.6095ZM4.32421 12.4319C4.17502 12.1632 4.17502 11.8368 4.32421 11.5681C5.84274 8.8334 8.71727 7 12 7C15.2827 7 18.1573 8.8334 19.6758 11.5681C19.825 11.8368 19.825 12.1632 19.6758 12.4319C18.1573 15.1666 15.2827 17 12 17C8.71727 17 5.84274 15.1666 4.32421 12.4319Z"
                          fill=""
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 col-span-1 w-full gap-4">
              <div className="flex flex-col gap-1 z-10 p-4 rounded-lg bg-black border-[1px] border-white border-opacity-10 overflow-hidden">
                <h5>NFTs</h5>
                <h1>{state.dashboard?.totalBalance || 0}</h1>
              </div>
            </div>
            {/* Rewards */}
            <div className="flex flex-col gap-2 col-span-2">
              <div className="w-full flex gap-1 justify-between items-center p-4 rounded-lg gradient-background border-[1px] border-white border-opacity-10">
                <div className="flex flex-col gap-1 z-10">
                  <h5>Rewards</h5>
                  <h1>{state.dashboard?.totalReward.toFixed(2) || "0"}</h1>
                </div>
                <div className="flex gap-2">
                  <SecondaryButton onClick={handleClaim}>claim</SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* my staked NFT's */}

      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-4 items-center justify-between">
          <div className="flex gap-4">
            <h2>Incentives</h2>
            <h2 className="text-textGray">{`(0${
              state.dashboard?.activeIncentivizedCollections?.length || 0
            })`}</h2>
          </div>
          {/*<SecondaryButton>view all</SecondaryButton>*/}
        </div>

        {account ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {state.loading.dashboard ? (
              <>
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
              </>
            ) : (
              state.dashboard?.activeIncentivizedCollections?.map((nft, i) => (
                <ExploreNftCard key={i} index={i} stakedNfts={nft} />
              ))
            )}
          </div>
        ) : (
          <OStateCard title="Connect your wallet & get Incentivize!" />
        )}
      </div>

      {/* my minted NFT's */}

      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-4 items-center justify-between">
          <div className="flex gap-4">
            <h2>Rewards Ended</h2>
            <h2 className="text-textGray">{`(0${endedIncentiveCollections.length})`}</h2>
          </div>
          {/*<SecondaryButton>view all</SecondaryButton>*/}
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {endedIncentiveCollections.map((nft, i) => (
            <ExploreNftCardDummy key={i} index={i} stakedNfts={nft} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;