"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { SecondaryButton } from "@/app/components/Buttons";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { getUserOneInfo, withdrawOne } from "@/app/utils/contracts";
import { REACT_APP_NETWORK_ID } from "@/app/chainInfo";
import { useAppContext } from "@/app/context/AppContext";

interface NftsInCollection {
  image: string;
  name: string;
  tokenId: number;
}

const Collection = () => {
  const params = useParams();
  const { id } = params;
  const { state } = useAppContext();
  let collection = state.dashboard?.activeIncentivizedCollections.find((c) => c.address === id);
  const [nfts, setNfts] = useState<NftsInCollection[]>([]);
  const { account, library } = useWeb3React();
  const [stakedAt, setStakedAt] = useState<number>(0);

  if (!collection) {
    return <div>Collection not found</div>;
  }

  if (!account) {
    return <div>Need to connect wallet</div>;
  }

  useEffect(() => {
    getUserOneInfo(account, id).then(info => {
      const nfts = info.tokenIds.map(tokenId => ({
        tokenId: tokenId.toNumber(),
        image: collection.image,
        name: `${collection.collection} #${tokenId}`,
      }));
      setNfts(nfts);
    });
  }, [stakedAt]);

  const unstakeNfts = async (tokenId: number) => {
    withdrawOne(collection.address, tokenId, 0, REACT_APP_NETWORK_ID, library.getSigner(), account).then(async (tx) => {
      setStakedAt(Date.now());
    });
  }

  return (
    <div className="page">
      <div className="flex flex-col gap-2 sm:w-1/2">
        <h1>{collection.collection}</h1>
        <p className="text-textGray">{collection.desc}</p>
      </div>
      <h2>My NFT's</h2>
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
              <SecondaryButton onClick={() => unstakeNfts(nft.tokenId)}>
                Unstake
              </SecondaryButton>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Collection;