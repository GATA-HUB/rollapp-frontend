"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavButton from "@/app/components/NavBar/NavButton";
import { WalletButton } from "../Buttons";
import Link from "next/link";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  connectorLocalStorageKey,
  connectors,
  getConnector,
} from "@/app/utils/connectors";
import { setupNetwork } from "@/app/utils/wallet";
import { getErrorMessage } from "@/app/utils/ethereum";
import { useInactiveListener } from "@/app/hooks/useInactiveListener";

const Page = () => {
  const [errorModalOpen, setErrorModalOpen] = useState<boolean | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [activatingConnector, setActivatingConnector] = useState<
    AbstractConnector | undefined
  >();

  const { account, activate, active, connector, deactivate } = useWeb3React();

  const connectAccount = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(connectorLocalStorageKey, connectors[0].key);
      connectToProvider(connectors[0].connectorId);
    }
  };

  const disconnectAccount = () => {
    if (deactivate) {
      deactivate();
    }
    window.localStorage.removeItem(connectorLocalStorageKey);
  };

  // console.log("account", account);
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

  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`z-40 fixed top-0 w-full flex flex-col px-8 py-4 ${
        menuOpen ? "gap-8" : "gap-0"
      } bg-black bg-opacity-60 backdrop-blur-sm border-b-[1px] border-white border-opacity-10 items-center justify-center transition-all duration-300 ease-in-out`}
    >
      <div className="w-full max-w-[1856px] flex items-center justify-between">
        <Link href="https://gatahub.zone">
          <div className="flex">
            <Image width={126} height={32} alt="" src="/mainLogo.svg" />
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-4">
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

        <div className="hidden lg:flex">
          {account ? (
            <div className="flex items-center gap-2">
              <div
                onClick={disconnectAccount}
                className={`group max-h-10 flex px-4 rounded-lg gap-2 bg-darkGray bg-opacity-100 hover:bg-primary hover:bg-opacity-10 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden`}
              >
                <div className="flex flex-col gap-2 py-2 group-hover:mt-[-32px] transition-all duration-300 ease-in-out">
                  <div className="flex gap-2 items-center">
                    <div
                      className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ease-in-out`}
                    >
                      <svg
                        className="fill-white group-hover:fill-primary transition-all duration-300 ease-in-out"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19 6H5C4.44772 6 4 6.44772 4 7V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V15H16C14.3431 15 13 13.6569 13 12C13 10.3431 14.3431 9 16 9H20V7C20 6.44772 19.5523 6 19 6ZM16 10H20V14H16C14.8954 14 14 13.1046 14 12C14 10.8954 14.8954 10 16 10ZM21 17V15V9V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z"
                          fill=""
                        />
                      </svg>
                    </div>

                    <span
                      className={`accent text-white group-hover:text-primary transition-all duration-300 ease-in-out`}
                    >
                      {shortenAddress(account)}
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <div
                      className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ease-in-out`}
                    >
                      <svg
                        className="fill-white group-hover:fill-primary transition-all duration-300 ease-in-out"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.06066 9.64645C5.25592 9.84171 5.25592 10.1583 5.06066 10.3536L3.91421 11.5H9.70711C9.98325 11.5 10.2071 11.7239 10.2071 12C10.2071 12.2761 9.98325 12.5 9.70711 12.5H3.91421L5.06066 13.6464C5.25592 13.8417 5.25592 14.1583 5.06066 14.3536C4.8654 14.5488 4.54882 14.5488 4.35355 14.3536L2 12L4.35355 9.64645C4.54882 9.45118 4.8654 9.45118 5.06066 9.64645Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18 5L18 19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19L6 16H5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19L19 5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V8H6L6 5C6 4.44772 6.44772 4 7 4L17 4C17.5523 4 18 4.44772 18 5Z"
                          fill=""
                        />
                      </svg>
                    </div>

                    <span
                      className={`accent text-white group-hover:text-primary transition-all duration-300 ease-in-out`}
                    >
                      Disconnect
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <WalletButton onClick={connectAccount}>Connect Wallet</WalletButton>
          )}
        </div>

        <div
          onClick={handleMenu}
          className="flex lg:hidden flex-col items-center justify-center w-8 h-8"
        >
          <span
            className={`w-6 h-[2px] rounded bg-white ${
              menuOpen ? "rotate-[225deg] mb-[-2px]" : "rotate-0 mb-[6px]"
            } transition-all ease-in-out duration-300`}
          />
          <span
            className={`w-6 h-[2px] rounded bg-white ${
              menuOpen ? "rotate-[315deg]" : "rotate-0"
            } transition-all ease-in-out duration-300`}
          />
          <span
            className={`w-6 h-[2px] rounded bg-white ${
              menuOpen ? "rotate-[225deg] mt-[-2px]" : "rotate-0 mt-[6px]"
            } transition-all ease-in-out duration-300`}
          />
        </div>
      </div>

      <div
        className={`w-full flex lg:hidden flex-col justify-between ${
          menuOpen ? "h-[256px]" : "h-0"
        } overflow-hidden transition-all ease-in-out duration-300`}
      >
        <div className="w-full flex flex-col items-center gap-1">
          <NavButton width="full" icon="/navIcons/dashboard.svg" href="/">
            Explore
          </NavButton>

          <NavButton width="full" icon="/navIcons/mint.svg" href="/mint">
            Mint
          </NavButton>

          <NavButton width="full" icon="/navIcons/stake.svg" href="/stake">
            Staked
          </NavButton>

          <NavButton width="full" icon="/navIcons/assets.svg" href="/myAssets">
            Assets
          </NavButton>
        </div>
        {account ? (
          <div className="w-full flex items-center gap-2">
            <div
              onClick={disconnectAccount}
              className={`group justify-center items-center w-full max-h-10 flex px-4 rounded-lg gap-2 bg-darkGray bg-opacity-100 hover:bg-primary hover:bg-opacity-10 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden`}
            >
              <div className="flex flex-col gap-2 py-2 transition-all duration-300 ease-in-out">
                <div className="flex gap-2 items-center justify-center">
                  <div
                    className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ease-in-out`}
                  >
                    <svg
                      className="fill-white group-hover:fill-primary transition-all duration-300 ease-in-out"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.06066 9.64645C5.25592 9.84171 5.25592 10.1583 5.06066 10.3536L3.91421 11.5H9.70711C9.98325 11.5 10.2071 11.7239 10.2071 12C10.2071 12.2761 9.98325 12.5 9.70711 12.5H3.91421L5.06066 13.6464C5.25592 13.8417 5.25592 14.1583 5.06066 14.3536C4.8654 14.5488 4.54882 14.5488 4.35355 14.3536L2 12L4.35355 9.64645C4.54882 9.45118 4.8654 9.45118 5.06066 9.64645Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18 5L18 19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19L6 16H5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19L19 5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V8H6L6 5C6 4.44772 6.44772 4 7 4L17 4C17.5523 4 18 4.44772 18 5Z"
                        fill=""
                      />
                    </svg>
                  </div>

                  <span
                    className={`accent text-white group-hover:text-primary transition-all duration-300 ease-in-out`}
                  >
                    Disconnect
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 items-center justify-center w-full">
              <div
                className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ease-in-out`}
              >
                <svg
                  className="fill-white group-hover:fill-primary transition-all duration-300 ease-in-out"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 6H5C4.44772 6 4 6.44772 4 7V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V15H16C14.3431 15 13 13.6569 13 12C13 10.3431 14.3431 9 16 9H20V7C20 6.44772 19.5523 6 19 6ZM16 10H20V14H16C14.8954 14 14 13.1046 14 12C14 10.8954 14.8954 10 16 10ZM21 17V15V9V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z"
                    fill=""
                  />
                </svg>
              </div>

              <span
                className={`accent text-white group-hover:text-primary transition-all duration-300 ease-in-out`}
              >
                {shortenAddress(account)}
              </span>
            </div>
          </div>
        ) : (
          <WalletButton onClick={connectAccount}>Connect Wallet</WalletButton>
        )}
      </div>
    </nav>
  );
};

export default Page;