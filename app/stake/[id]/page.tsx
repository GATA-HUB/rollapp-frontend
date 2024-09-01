"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import collections from "../../../public/collections.json";
import Image from "next/image";
import { motion } from "framer-motion";
import { SecondaryButton } from "@/app/components/Buttons";
import {StakedCollection} from "@/app/types/nft";
import {store} from "@/app/store";
import {deposit, fetchUserNFTs} from "@/app/utils/contracts";
import {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {REACT_APP_NETWORK_ID} from "@/app/chainInfo";

interface NftsInCollection {
  image: string;
  name: string;
  staked: boolean;
}

interface CollectionNfts {
  nfts: NftsInCollection[];
  collection: string;
  creator: string;
  desc: string;
  quantity: number;
  staked: number;
  endingDate: string;
  reward: number;
  token: string;
}

const Collection = () => {
  const params = useParams();
  const { id } = params;
  let collection = store.ActiveIncentivizedCollections.find((c) => c.address === id);
  const [nfts, setNfts] = useState<NftsInCollection[]>([]);
  const {account, library} = useWeb3React();
  const [stakedAt, setStakedAt] = useState<number>(0);

  if (!collection) {
    return <div>Collection not found</div>;
  }

  if(!account) {
    return <div>Need to connect wallet</div>;
  }

  useEffect(() => {
    fetchUserNFTs(id, account).then(setNfts)
  }, [stakedAt]);

  const stakeNfts = async (tokenIds: string[]) => {
    deposit(account, collection.address, 0, tokenIds, REACT_APP_NETWORK_ID, library.getSigner(), account).then(async (tx) => {
      setStakedAt(Date.now());
    });
  }

  return (
    <div className="page">
      <div className="flex flex-col gap-2 sm:w-1/2">
        <h1>{collection.collection}</h1>
        <p className="text-textGray">{collection.desc}</p>
      </div>
      <div className="flex">
        <h2>My NFT</h2>
        <h2 className="lowercase">s</h2>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {nfts.map((nft, index) => {
            return (
              <motion.div
                key={index}
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                whileHover={{
                  border: "1px solid rgba(1, 239, 156, 1)",
                  boxShadow: "8px 8px 0px #01EF9C",
                }}
                className="flex flex-col gap-2 p-4 rounded-lg "
              >
                <div className="w-full aspect-square relative overflow-hidden rounded">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <p>{nft.name}</p>
                <SecondaryButton onClick={() => stakeNfts([nft.tokenId])}>Stake</SecondaryButton>
              </motion.div>
            );
          }
        }
      </div>
    </div>
  );
};

export default Collection;