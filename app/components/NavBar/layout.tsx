"use client";
import React, { useState } from "react";
import Image from "next/image";
import NavButton from "@/app/components/NavBar/NavButton";
import { WalletButton } from "../Buttons";

const page = () => {
  return (
    <nav className="z-40 fixed top-0 w-full flex px-8 py-4 bg-black bg-opacity-60 backdrop-blur-sm border-b-[1px] border-white border-opacity-10 items-center justify-center">
      <div className="w-full max-w-[1856px] flex items-center justify-between">
        <div className="flex">
          <Image width={126} height={32} alt="" src="/mainLogo.svg" />
        </div>
        <div className="flex items-center gap-4">
          <NavButton icon="/navIcons/dashboard.svg" href="/">
            Dashboard
          </NavButton>

          <NavButton icon="/navIcons/mint.svg" href="/mint">
            Mint
          </NavButton>

          <NavButton icon="/navIcons/stake.svg" href="/stake">
            Stake
          </NavButton>

          <NavButton icon="/navIcons/assets.svg" href="/myAssets">
            Assets
          </NavButton>
        </div>

        <WalletButton>Connect Wallet</WalletButton>
      </div>
    </nav>
  );
};

export default page;
