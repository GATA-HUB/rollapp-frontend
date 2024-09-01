"use client";

import React, { useEffect, useState } from "react";
import StakeCollCard from "../components/Cards/StakeCollCard";
import collectionData from "../../public/collections.json";
import { useWeb3React } from "@web3-react/core";
import {
  fetchNFTCollectionDetails,
  getPoolContracts,
  getUserInfoFromAddresses,
} from "@/app/utils/contracts";
import { StakedCollection } from "@/app/types/nft";
import { ENV } from "@/env";

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

const page = () => {
  const stakedNfts: CollectionNfts[] = collectionData;
  const {account, chainId } = useWeb3React();
  const [stakedCollections, setStakedCollections] = useState<StakedCollection[]>([]);

  const getStakedCollections = async () => {
    if (!account) {
      return;
    }
    const poolContracts = await getPoolContracts();
    let infoList = await getUserInfoFromAddresses(account, poolContracts);
    console.log('getStakedCollections', infoList);
    let stakedList = [];
    let stakedAddrList = [];
    for (let i = 0; i < infoList.length; i++) {
      if (infoList[i].info.amount.toNumber() > 0) {
        const data = await fetchNFTCollectionDetails(infoList[i].address);
        const ipfsGatewayMetadata = data?.uri.replace('ipfs://', ENV.ipfsGateway)
        console.log('getStakedCollections ipfsGatewayMetadata', ipfsGatewayMetadata);
        const {description, image} = await fetch(ipfsGatewayMetadata).then(response => response.json());
        let _item = {
          description,
          address: infoList[i].address,
          userInfo: infoList[i].info,
          poolIndex: infoList[i].poolIndex,
          image: image.replace('ipfs://', ENV.ipfsGateway),
          staked: infoList[i].info.amount.toNumber(),
        };
        stakedList.push(_item);
        stakedAddrList.push(_item.address);
      }
    }
    setStakedCollections(stakedList);
    console.log("stakedCollections", stakedList);
  };
  useEffect(() => {
    getStakedCollections();
  }, [account]);
  return (
    <div className="page">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-4 items-center justify-between">
          <div className="flex gap-4">
            <h2>staked collections</h2>
            <h2 className="text-textGray">{`(0${stakedCollections.length})`}</h2>
          </div>
        </div>

        <div className="w-full grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {stakedCollections.map((nft, i) => {
            return <StakeCollCard key={i} index={i} stakedNfts={nft} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default page;