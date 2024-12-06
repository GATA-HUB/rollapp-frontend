"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import collections from "../../../../public/mintColl.json";
import Image from "next/image";
import { motion } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "@/app/components/Buttons";

interface NftsInCollection {
  image: string;
  name: string;
  minted: boolean;
}

interface CollectionNfts {
  nfts: NftsInCollection[];
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

const Collection = () => {
  const params = useParams();
  const { id } = params;
  const collection: CollectionNfts | undefined = collections[Number(id)];

  if (!collection) {
    return <div>Collection not found</div>;
  }

  console.log(collection.endingDate);

  return (
    <div className="page">
      <div className="flex flex-col gap-2 sm:w-1/2">
        <h1>{collection.collection}</h1>
        <p className="text-textGray">{collection.desc}</p>
      </div>
      <div className="flex">
        <h2>NFT</h2>
        <h2 className="lowercase">s</h2>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {collection.nfts.map((nft, index) => (
          <motion.div
            key={index}
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            // whileHover={{
            //   border: "1px solid rgba(1, 239, 156, 1)",
            //   boxShadow: "8px 8px 0px #01EF9C",
            // }}
            className="flex flex-col gap-2 p-4 rounded-lg "
          >
            <div className="w-full aspect-square relative overflow-hidden rounded">
              {collection.endingDate ? (
                <div className="absolute z-10 top-1 right-1 text-darkGray flex rounded-full bg-primary px-3 py-1">
                  <p>on progress</p>
                </div>
              ) : (
                <div className="absolute z-10 top-1 right-1 text-darkGray flex rounded-full bg-[#FF6F6F] px-3 py-1">
                  <p>ended mint</p>
                </div>
              )}
              <Image
                src={nft.image}
                alt={nft.name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
            <p>{nft.name}</p>
            {collection.endingDate && <SecondaryButton>mint</SecondaryButton>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
