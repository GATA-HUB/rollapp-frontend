import type { HardhatRuntimeEnvironment } from "hardhat/types";

interface ITaskArgs {
  network?: string;
}

interface INFTConfig {
  name: string;
  symbol: string;
  baseURI: string;
  metadataURI: string;
}

interface IPoolConfig {
  rewardToken1: string;
  rewardPerSecond1: string;
  startTime: string;
  endTime: string;
  rewardToken2: string;
  rewardPerSecond2: string;
}

interface IDeploymentInfo {
  network: string;
  contracts: Array<{
    name: string;
    address: string;
  }>;
}

interface ITokenDeployment {
  network: string;
  token: {
    name: string;
    symbol: string;
    address: string;
  };
}

interface IStakeDeployment {
  network: string;
  stake: {
    name: string;
    address: string;
  };
}

export {
  ITaskArgs as TaskArgs,
  INFTConfig as NFTConfig,
  IPoolConfig as PoolConfig,
  IDeploymentInfo as DeploymentInfo,
  ITokenDeployment as TokenDeployment,
  IStakeDeployment as StakeDeployment,
  HardhatRuntimeEnvironment
}; 