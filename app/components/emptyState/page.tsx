import React, { useState } from "react";
import Image from "next/image";
import { WalletButton } from "../Buttons";
import {
  connectorLocalStorageKey,
  connectors,
  getConnector,
} from "@/app/utils/connectors";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { getErrorMessage } from "@/app/utils/ethereum";
import { setupNetwork } from "@/app/utils/wallet";
import { AbstractConnector } from "@web3-react/abstract-connector";

interface Props {
  title: string;
}

const page = ({ title }: Props) => {
  const { account, activate } = useWeb3React();
  const [errorModalOpen, setErrorModalOpen] = useState<boolean | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const [activatingConnector, setActivatingConnector] = useState<
    AbstractConnector | undefined
  >();

  const connectAccount = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(connectorLocalStorageKey, connectors[0].key);
      connectToProvider(connectors[0].connectorId);
    }
  };

  const connectToProvider = (connector: AbstractConnector) => {
    let _tried = false;
    let _triedError: Error | undefined = undefined;
    const connectorKey =
      typeof window !== "undefined"
        ? window.localStorage.getItem(connectorLocalStorageKey)
        : "";
    if (connectorKey && connectorKey !== "") {
      const currentConnector = getConnector(connectorKey);
      if (connectorKey === "injectedConnector") {
        currentConnector.isAuthorized().then((isAuthorized: boolean) => {
          if (isAuthorized) {
            activate(currentConnector, undefined, true).catch(
              (error: Error) => {
                if (error instanceof UnsupportedChainIdError) {
                  setupNetwork().then((hasSetup: boolean) => {
                    if (hasSetup) activate(currentConnector);
                  });
                }
                _triedError = error;
                _tried = true;
              }
            );
          } else _tried = true;
        });
      } else {
        activate(currentConnector);
        _tried = true;
      }
    }
    if (_tried) {
      const errorMsg = getErrorMessage(_triedError);
      setNetworkError(errorMsg);
      setErrorModalOpen(true);
    }
    activate(connector);
  };
  return (
    <div className="relative w-full aspect-auto p-12 text-white border-[1px] border-darkGray rounded-2xl flex items-center justify-center overflow-hidden">
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt=""
        src="/bg/0StateBg.jpg"
        quality={100}
      />
      <div className="flex flex-col items-center gap-4 z-10 w-full md:w-1/2 lg:w-1/3 text-center">
        <div className="w-40 h-40">
          <Image width={160} height={160} alt="" src="/bg/emptyWallet.png" />
        </div>
        <h4>{title}</h4>
        <p className="text-textGray">
          Your Wallet is not connected at the moment. Please connect your wallet
          and start your journey.
        </p>
        <WalletButton onClick={connectAccount}>
          {account
            ? `${account.substring(0, 3)}...${account.substring(0, 3)}`
            : "Connect Wallet"}
        </WalletButton>
      </div>
    </div>
  );
};

export default page;
