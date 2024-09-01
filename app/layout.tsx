import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/NavBar/layout";
import {Providers} from "@/app/providers";
import {RewardTracker} from "@/app/components/RewardTracker";
import {OwnedNFTTracker} from "@/app/components/OwnedNFTTracker";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "GataHub Rollapp",
  description:
    "Explore the GATAHUB dApp rollapp and empower your digital journey. Seamlessly access and interact with decentralized applications on any device, revolutionizing your blockchain experience. Dive into a world of possibilities, from finance to gaming, with our intuitive platform. Unlock the full potential of decentralized technologies with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`w-full bg-black flex flex-col p-8 items-center ${jost.className}`}
      >
      <Providers>
        <RewardTracker />
        <OwnedNFTTracker />
        <NavBar />
        <div className="w-full max-w-[1440px] flex flex-col items-center">
          {children}
        </div>
      </Providers>
      </body>
    </html>
  );
}