"use client";
export let REACT_APP_NETWORK_ID = 1234;
if (typeof window !== 'undefined') {
  REACT_APP_NETWORK_ID = window.localStorage.getItem('selectedNetworkID') || REACT_APP_NETWORK_ID;
}

export const setNetworkId = (newId) => REACT_APP_NETWORK_ID = newId;

export const SUPPORTED_CHAINS = [324, 8453, 1234, 100004];
export const chainInfo = {
  280: {
    REACT_APP_NETWORK_ID: 280,
    REACT_APP_BLOCK_EXPLORER: "https://goerli.explorer.zksync.io",
    REACT_APP_NETWORK_ICON: "https://goerli.explorer.zksync.io/images/icons/zksync-arrows.svg",
    REACT_APP_NETWORK: "zkSync Era Testnet",
    REACT_APP_COIN: "ETH",
    REACT_APP_NODE_1: "https://zksync2-testnet.zksync.dev",
    REACT_APP_NODE_2: "https://testnet.era.zksync.dev",
    REACT_APP_NODES: ["https://zksync2-testnet.zksync.dev", "https://testnet.era.zksync.dev"],
    REACT_APP_SUBGRAPH:
      "https://api.thegraph.com/subgraphs/name/kroim/erc721-zksync-testnet",
    REACT_APP_BASE_URL: "https://weave.tyche.zone",
  },
  324: {
    REACT_APP_NETWORK_ID: 324,
    REACT_APP_BLOCK_EXPLORER: "https://explorer.zksync.io",
    REACT_APP_NETWORK_ICON: "https://goerli.explorer.zksync.io/images/icons/zksync-arrows.svg",
    REACT_APP_NETWORK: "zkSync Era",
    REACT_APP_COIN: "ETH",
    REACT_APP_NODE_1: "https://mainnet.era.zksync.io",
    REACT_APP_NODE_2: "https://zksync-era.blockpi.network/v1/rpc/public",
    REACT_APP_NODES: ["https://mainnet.era.zksync.io","https://zksync-era.blockpi.network/v1/rpc/public"],
    REACT_APP_SUBGRAPH:
      "https://api.studio.thegraph.com/query/50580/tyche-stake-all-nfts/0.0.1",
    REACT_APP_BASE_URL: "https://weave.tyche.zone",
  },
  84531: {
    REACT_APP_NETWORK_ID: 84531,
    REACT_APP_BLOCK_EXPLORER: "https://goerli.basescan.org",
    REACT_APP_NETWORK_ICON: "https://goerli.basescan.org/images/svg/brands/main.svg?v=23.08.01.1",
    REACT_APP_NETWORK: "Base Testnet",
    REACT_APP_COIN: "ETH",
    REACT_APP_NODE_1: "https://base-goerli.public.blastapi.io",
    REACT_APP_NODE_2: "https://1rpc.io/base-goerli",
    REACT_APP_NODES: ["https://base-goerli.public.blastapi.io", "https://1rpc.io/base-goerli"],
    REACT_APP_SUBGRAPH:
      "https://api.studio.thegraph.com/query/50580/base-nfts/version/latest",
    REACT_APP_BASE_URL: "https://weave.tyche.zone",
  },
  8453: {
    REACT_APP_NETWORK_ID: 8453,
    REACT_APP_BLOCK_EXPLORER: "https://basescan.org",
    REACT_APP_NETWORK_ICON: "https://goerli.basescan.org/images/svg/brands/main.svg?v=23.08.01.1",
    REACT_APP_NETWORK: "Base",
    REACT_APP_COIN: "ETH",
    REACT_APP_NODE_1: "https://base-mainnet.public.blastapi.io",
    REACT_APP_NODE_2: "https://base.blockpi.network/v1/rpc/public",
    REACT_APP_NODES: ["https://base-mainnet.public.blastapi.io", "https://base.blockpi.network/v1/rpc/public"],
    REACT_APP_SUBGRAPH:
      "https://api.studio.thegraph.com/query/50580/base-selected-contracts-only/1.0.0",
    REACT_APP_BASE_URL: "https://weave.tyche.zone",
  },
  // 1234: { // local
  //   REACT_APP_NETWORK_ID: 1234,
  //   REACT_APP_BLOCK_EXPLORER: "https://basescan.org",
  //   REACT_APP_NETWORK_ICON: "https://goerli.basescan.org/images/svg/brands/main.svg?v=23.08.01.1",
  //   REACT_APP_NETWORK: "Dymension",
  //   REACT_APP_COIN: "agata",
  //   REACT_APP_NODE_1: "http://0.0.0.0:8545",
  //   REACT_APP_NODES: ["http://0.0.0.0:8545"],
  //   REACT_APP_SUBGRAPH:
  //       "https://api.studio.thegraph.com/query/50580/base-selected-contracts-only/1.0.0",
  //   REACT_APP_BASE_URL: "https://weave.tyche.zone",
  // },
  1234: {
    REACT_APP_NETWORK_ID: 1234,
    REACT_APP_BLOCK_EXPLORER: "https://basescan.org",
    REACT_APP_NETWORK_ICON: "https://goerli.basescan.org/images/svg/brands/main.svg?v=23.08.01.1",
    REACT_APP_NETWORK: "Gata",
    REACT_APP_COIN: "agata",
    REACT_APP_NODE_1: "https://rpc-dym-roller-testnet.gatahub.zone",
    REACT_APP_NODES: ["https://rpc-dym-roller-testnet.gatahub.zone"],
    REACT_APP_SUBGRAPH:
      "https://api.studio.thegraph.com/query/50580/base-selected-contracts-only/1.0.0",
    REACT_APP_BASE_URL: "https://weave.tyche.zone",
  },
  100004: {
    REACT_APP_NETWORK_ID: 100004,
    REACT_APP_BLOCK_EXPLORER: "https://bb.dym.fyi/r/dev-rolxtwo",
    REACT_APP_NETWORK_ICON: "https://goerli.basescan.org/images/svg/brands/main.svg?v=23.08.01.1",
    REACT_APP_NETWORK: "Gata",
    REACT_APP_COIN: "agata",
    REACT_APP_NODE_1: "https://json-rpc.rolxtwo.evm.ra.blumbus.noisnemyd.xyz",
    REACT_APP_NODES: ["https://json-rpc.rolxtwo.evm.ra.blumbus.noisnemyd.xyz"],
    REACT_APP_SUBGRAPH:
      "https://api.studio.thegraph.com/query/50580/base-selected-contracts-only/1.0.0",
    REACT_APP_BASE_URL: "https://weave.tyche.zone",
  },
};