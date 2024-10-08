"use client";

import React from "react";
import Image from "next/image";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import Link from "next/link";

interface Props {
  title: string;
  desc: string;
  href?: string;
  buttonTitle?: string;
}

const EmptyState = ({ title, desc, href, buttonTitle }: Props) => {
  return (
    <div className="relative w-full aspect-auto p-12 text-white border-[1px] border-darkGray rounded-2xl flex items-center justify-center overflow-hidden">
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt=""
        src="/bg/emptyStateBg.jpg"
        quality={100}
      />
      <div className="flex flex-col items-center gap-4 z-10 w-full md:w-1/2 lg:w-1/3 text-center">
        <div className="w-40 h-40">
          <Image width={160} height={160} alt="" src="/bg/dummyNfts.png" />
        </div>
        <h4>{title}</h4>
        <p className="text-textGray">{desc}</p>
        <Link href={`${href}`}>
          <PrimaryButton>{buttonTitle}</PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
