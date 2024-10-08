"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { SecondaryButton } from "@/app/components/Buttons";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { getUserOneInfo, withdrawAll, withdrawOne } from "@/app/utils/contracts";
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
  const [unstakedAt, setUnstakedAt] = useState<number>(0);
  const [selectedNfts, setSelectedNfts] = useState<number[]>([]);

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
  }, [unstakedAt]);

  const toggleNftSelection = (tokenId: number) => {
    setSelectedNfts(prev => 
      prev.includes(tokenId) 
        ? prev.filter(id => id !== tokenId)
        : [...prev, tokenId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedNfts.length === nfts.length) {
      setSelectedNfts([]);
    } else {
      setSelectedNfts(nfts.map(nft => nft.tokenId));
    }
  };

  const unstakeNfts = async () => {
    if (selectedNfts.length === 0) return;

    if (selectedNfts.length === nfts.length) {
      // Unstake all
      withdrawAll(collection.address, 0, REACT_APP_NETWORK_ID, library.getSigner(), account).then(async (success) => {
        if (success) {
          setUnstakedAt(Date.now());
          setSelectedNfts([]);
        }
      });
    } else {
      // Unstake one by one
      for (const tokenId of selectedNfts) {
        await withdrawOne(collection.address, tokenId, 0, REACT_APP_NETWORK_ID, library.getSigner(), account);
      }
      setUnstakedAt(Date.now());
      setSelectedNfts([]);
    }
  }

  return (
    <div className="page">
      <div className="flex flex-col gap-2 sm:w-1/2">
        <h1>{collection.collection}</h1>
        <p className="text-textGray">{collection.desc}</p>
      </div>
      <div className="flex justify-between items-center">
        <h2>My NFT's</h2>
        <div className="flex gap-4">
          <SecondaryButton onClick={toggleSelectAll}>
            {selectedNfts.length === nfts.length ? "Deselect All" : "Select All"}
          </SecondaryButton>
          <SecondaryButton onClick={unstakeNfts} disabled={selectedNfts.length === 0}>
            Unstake Selected ({selectedNfts.length})
          </SecondaryButton>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {nfts.map((nft, index) => {
          const isSelected = selectedNfts.includes(nft.tokenId);
          return (
            <motion.div
              key={index}
              style={{
                border: isSelected ? "1px solid rgba(1, 239, 156, 1)" : "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: isSelected ? "8px 8px 0px #01EF9C" : "none",
              }}
              whileHover={{
                border: "1px solid rgba(1, 239, 156, 1)",
                boxShadow: "8px 8px 0px #01EF9C",
              }}
              className="flex flex-col gap-2 p-4 rounded-lg cursor-pointer"
              onClick={() => toggleNftSelection(nft.tokenId)}
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Collection;