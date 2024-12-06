"use client";

import { Web3ReactProvider } from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {children}
    </Web3ReactProvider>
  );
}