import { task } from "hardhat/config";
import { readFileSync } from "fs";
import { join } from "path";
import type { TaskArgs, PoolConfig, DeploymentInfo, TokenDeployment, StakeDeployment, HardhatRuntimeEnvironment } from "./types";

task("create-pools", "Creates staking pools for each NFT contract")
  .setAction(async (taskArgs: TaskArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      // Read deployment files
      const nftDeployment: DeploymentInfo = JSON.parse(
        readFileSync(join(process.cwd(), "deployments.json"), "utf8")
      );
      
      const tokenDeployment: TokenDeployment = JSON.parse(
        readFileSync(join(process.cwd(), "token-deployment.json"), "utf8")
      );
      
      const stakeDeployment: StakeDeployment = JSON.parse(
        readFileSync(join(process.cwd(), "stake-deployment.json"), "utf8")
      );
      
      const poolConfig: { poolTemplate: PoolConfig } = JSON.parse(
        readFileSync(join(process.cwd(), "pools.json"), "utf8")
      );

      // Get the staking contract
      const stakeContract = await hre.ethers.getContractAt(
        "GataStakeMultiPoolSupport",
        stakeDeployment.stake.address
      );

      // Update pool template with reward token address
      poolConfig.poolTemplate.rewardToken1 = tokenDeployment.token.address;
      
      // Set end time to 2 months from now
      const TWO_MONTHS_IN_SECONDS = 60 * 60 * 24 * 60; // 60 days
      const endTimeSeconds = Math.floor(Date.now() / 1000) + TWO_MONTHS_IN_SECONDS;
      poolConfig.poolTemplate.endTime = endTimeSeconds.toString();

      // Create pools for each NFT contract
      for (const nft of nftDeployment.contracts) {
        console.log(`Creating pool for ${nft.name}...`);
        
        const tx = await stakeContract.createPool(
          nft.address,
          poolConfig.poolTemplate.rewardToken1,
          poolConfig.poolTemplate.rewardPerSecond1,
          poolConfig.poolTemplate.startTime,
          poolConfig.poolTemplate.endTime,
          poolConfig.poolTemplate.rewardToken2,
          poolConfig.poolTemplate.rewardPerSecond2
        );

        await tx.wait();
        console.log(`Pool created for ${nft.name}`);
        console.log("--------------------");
      }

      console.log("All pools created successfully!");
      
    } catch (error) {
      console.error("Pool creation failed:", error);
      process.exit(1);
    }
}); 