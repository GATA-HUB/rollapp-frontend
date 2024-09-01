"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import NavButton from "@/app/components/NavBar/NavButton";
import { WalletButton } from "../Buttons";
import {AbstractConnector} from "@web3-react/abstract-connector";
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {connectorLocalStorageKey, connectors, getConnector} from "@/app/utils/connectors";
import {setupNetwork} from "@/app/utils/wallet";
import {getErrorMessage} from "@/app/utils/ethereum";
import {useInactiveListener} from "@/app/hooks/useInactiveListener";

const page = () => {
  const [errorModalOpen, setErrorModalOpen] = useState<boolean | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [activatingConnector, setActivatingConnector] = useState<AbstractConnector | undefined>();

  const { account, library, activate, active, connector } = useWeb3React();

  const connectAccount = () => {
    if(typeof window !== "undefined") {
      window.localStorage.setItem(connectorLocalStorageKey, connectors[0].key);
      connectToProvider(connectors[0].connectorId);
    }
  };

  console.log("account", account);
  const connectToProvider = (connector: AbstractConnector) => {
    let _tried = false;
    let _triedError: Error | undefined = undefined;
    const connectorKey = typeof window !== "undefined" ? window.localStorage.getItem(connectorLocalStorageKey) : "";
    if (connectorKey && connectorKey !== "") {
      const currentConnector = getConnector(connectorKey);
      if (connectorKey === "injectedConnector") {
        currentConnector.isAuthorized().then((isAuthorized: boolean) => {
          if (isAuthorized) {
            activate(currentConnector, undefined, true).catch((error: Error) => {
              if (error instanceof UnsupportedChainIdError) {
                setupNetwork().then((hasSetup: boolean) => {
                  if (hasSetup) activate(currentConnector);
                });
              }
              _triedError = error;
              _tried = true;
            });
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

  useEffect(() => {
    const connectorKey = window.localStorage.getItem(connectorLocalStorageKey);
    if (connectorKey && connectorKey !== "") {
      const currentConnector = getConnector(connectorKey);
      if (connectorKey === "injectedConnector") {
        currentConnector.isAuthorized().then((isAuthorized: boolean) => {
          if (isAuthorized) activate(currentConnector);
        });
      } else {
        activate(currentConnector);
      }
    } else if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activate, activatingConnector, connector]);

  const { activateError } = useInactiveListener(!!activatingConnector);

  useEffect(() => {
    if (activateError && errorModalOpen === null) {
      const errorMsg = getErrorMessage(activateError);
      setNetworkError(errorMsg);
      setErrorModalOpen(true);
    }
  }, [activateError, errorModalOpen]);
  return (
    <nav className="z-40 fixed top-0 w-full flex px-8 py-4 bg-black bg-opacity-60 backdrop-blur-sm border-b-[1px] border-white border-opacity-10 items-center justify-center">
      <div className="w-full max-w-[1856px] flex items-center justify-between">
        <div className="flex">
          <Image width={126} height={32} alt="" src="/mainLogo.svg" />
        </div>
        <div className="flex items-center gap-4">
          <NavButton icon="/navIcons/dashboard.svg" href="/">
            Explore
          </NavButton>

          <NavButton icon="/navIcons/mint.svg" href="/mint">
            Mint
          </NavButton>

          <NavButton icon="/navIcons/stake.svg" href="/stake">
            Staked
          </NavButton>

          <NavButton icon="/navIcons/assets.svg" href="/myAssets">
            Assets
          </NavButton>
        </div>

        <WalletButton onClick={connectAccount}>
          {account ? `${account.substring(0, 3)}...${account.substring(0, 3)}`: 'Connect Wallet'}
        </WalletButton>
      </div>
    </nav>
  );
};

export default page;