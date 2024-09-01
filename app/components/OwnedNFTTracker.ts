"use client";

import { useOwnedNFTCount } from "@/app/hooks/useOwnedNFTCount";

export function OwnedNFTTracker() {
  useOwnedNFTCount();
  return null;
}