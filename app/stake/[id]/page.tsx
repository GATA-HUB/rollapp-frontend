"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import collections from "../../../public/collections.json";
import Image from "next/image";
import { motion } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "@/app/components/Buttons";

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
  const collection: CollectionNfts | undefined = collections[Number(id)];

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div className="page">
      <div className="flex flex-col gap-2 sm:w-1/2">
        <h1>{collection.collection}</h1>
        <p className="text-textGray">{collection.desc}</p>
      </div>
      <h2>My NFT's</h2>
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {collection.nfts.map((nft, index) => {
          if (nft.staked) {
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
                <SecondaryButton>
                  {nft.staked ? "Unstake" : "Stake"}
                </SecondaryButton>
              </motion.div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Collection;
