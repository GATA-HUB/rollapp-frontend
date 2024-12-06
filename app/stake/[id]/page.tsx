"use client";

import {useParams} from "next/navigation";
import Image from "next/image";
import {motion} from "framer-motion";
import {SecondaryButton} from "@/app/components/Buttons";
import {deposit, fetchUserNFTs,} from "@/app/utils/contracts";
import {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {REACT_APP_NETWORK_ID} from "@/app/chainInfo";
import {useAppContext} from "@/app/context/AppContext";
import SmallCardLoader from "@/app/components/loaders/SmallCardLoader";
import EmptyState from "@/app/components/EmptyState/EmptyState";
import OStateCard from "@/app/components/EmptyState/OState";
import {balanceOfUser} from "@/app/utils/mintcontracts";

interface NftsInCollection {
  image: string;
  name: string;
  staked: boolean;
  balance: number;
  tokenId: string;
}

const Collection = () => {
  const params = useParams();
  const { id } = params;
  const { state } = useAppContext();
  const { account, library } = useWeb3React();

  const [collection, setCollection] = useState(null);
  const [nfts, setNfts] = useState<NftsInCollection[]>([]);
  const [stakedAt, setStakedAt] = useState<number>(0);
  const [selectedNfts, setSelectedNfts] = useState<string[]>([]);
  const [mintTokens, setMintTokens] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (state.dashboard?.activeIncentivizedCollections) {
      const foundCollection = state.dashboard.activeIncentivizedCollections.find(
        (c) => c.address === id
      );
      setCollection(foundCollection);
    }
  }, [id, state.dashboard]);

  useEffect(() => {
    if (!state.dashboard || !account || !id) {
      return;
    }

    const fetchNFTs = async () => {
      try {
        setLoading(true);
        const fetchedNFTs = await fetchUserNFTs(id, account);
        setNfts(fetchedNFTs);
      } catch (error) {
        console.error("Error fetching user NFTs:", error);
        setError("Failed to load NFTs. Please try again.");
        setNfts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [account, id, stakedAt, state.dashboard]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (account && id) {
        const balance = await balanceOfUser(account, id);
        setMintTokens(balance);
        if (balance > 0) {
          setLoading(true);
        } else {
          setLoading(false);
        }
      }
    };

    fetchBalance();
  }, [account, id, nfts]);

  const toggleNftSelection = (tokenId: string) => {
    setSelectedNfts((prev) =>
      prev.includes(tokenId)
        ? prev.filter((id) => id !== tokenId)
        : [...prev, tokenId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedNfts.length === nfts.length) {
      setSelectedNfts([]);
    } else {
      setSelectedNfts(nfts.map((nft) => nft.tokenId));
    }
  };

  const stakeNfts = async () => {
    if (selectedNfts.length === 0) return;

    deposit(
      account,
      collection.address,
      0,
      selectedNfts,
      REACT_APP_NETWORK_ID,
      library.getSigner(),
      account
    ).then(async (tx) => {
      if (tx) {
        setStakedAt(Date.now());
        setSelectedNfts([]);
      }
    });
  };

  if (!collection) {
    return (
      <div className="flex mt-[64px] w-full">
        <EmptyState
          title="No Collection Found!"
          desc="Mint some NFTs and try again."
          href="/"
          buttonTitle="Mint now"
        />
      </div>
    );
  }

  if (!account) {
    return (
      <div className="flex mt-[88px]">
        <OStateCard title="Connect your wallet" />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="flex flex-col gap-2 sm:w-1/2">
        <h1>{collection.collection}</h1>
        <p className="text-textGray">{collection.desc}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <h2>My NFT</h2>
          <h2 className="lowercase">s</h2>
        </div>
        <div className="flex gap-4">
          <SecondaryButton onClick={toggleSelectAll}>
            {selectedNfts.length === nfts.length
              ? "Deselect All"
              : "Select All"}
          </SecondaryButton>
          <SecondaryButton
            onClick={stakeNfts}
            disabled={selectedNfts.length === 0}
          >
            {selectedNfts.length > 0
              ? `Stake Selected (${selectedNfts.length})`
              : "Select to stake"}
          </SecondaryButton>
        </div>
      </div>
      {nfts.length ? (
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {nfts.map((nft, index) => {
            const isSelected = selectedNfts.includes(nft.tokenId);
            return (
              <motion.div
                key={index}
                style={{
                  border: isSelected
                    ? "1px solid rgba(1, 239, 156, 1)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
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
      ) : (
        <>
          {loading ? (
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {[...Array(24)].map((_, index) => (
                <SmallCardLoader key={index} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No NFT's available to stake!"
              desc="Mint some NFT's and try staking!"
              href="/mint"
              buttonTitle="Mint Now"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Collection;