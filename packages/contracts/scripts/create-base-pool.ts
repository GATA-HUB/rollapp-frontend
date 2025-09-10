import { task } from "hardhat/config";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { TaskArgs, HardhatRuntimeEnvironment } from "./types";

task("create-base-pool", "Creates a staking pool for Base NFT contract")
  .setAction(async (taskArgs: TaskArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      // Read deployment files
      const nftDeployment = JSON.parse(
        readFileSync(join(process.cwd(), "nft-deployment.json"), "utf8")
      );
      
      const tokenDeployment = JSON.parse(
        readFileSync(join(process.cwd(), "token-deployment.json"), "utf8")
      );
      
      const stakeDeployment = JSON.parse(
        readFileSync(join(process.cwd(), "stake-deployment.json"), "utf8")
      );

      console.log("Creating pool for Base NFT collection...");
      console.log("NFT Address:", nftDeployment.nft.address);
      console.log("Token Address:", tokenDeployment.token.address);
      console.log("Stake Address:", stakeDeployment.stake.address);

      // Get the staking contract
      const stakeContract = await hre.ethers.getContractAt(
        "GataStakeMultiPoolSupport",
        stakeDeployment.stake.address
      );

      // Set pool parameters
      const rewardToken1 = tokenDeployment.token.address;
      const rewardPerSecond1 = "1000000000000000000"; // 1 token per second
      const startTime = Math.floor(Date.now() / 1000).toString(); // Start now
      const TWO_MONTHS_IN_SECONDS = 60 * 60 * 24 * 60; // 60 days
      const endTime = (Math.floor(Date.now() / 1000) + TWO_MONTHS_IN_SECONDS).toString();
      const rewardToken2 = "0x0000000000000000000000000000000000000000"; // No second reward
      const rewardPerSecond2 = "0";

      // Create the pool
      console.log("Creating pool...");
      const tx = await stakeContract.createPool(
        nftDeployment.nft.address,
        rewardToken1,
        rewardPerSecond1,
        startTime,
        endTime,
        rewardToken2,
        rewardPerSecond2
      );

      console.log("Transaction sent, waiting for confirmation...");
      await tx.wait();
      
      // Write pool info
      const poolInfo = {
        network: hre.network.name,
        nftContract: nftDeployment.nft.address,
        rewardToken: rewardToken1,
        stakeContract: stakeDeployment.stake.address,
        poolIndex: 0, // First pool for this collection
        startTime,
        endTime,
        rewardPerSecond: rewardPerSecond1
      };
      
      writeFileSync(
        join(process.cwd(), "base-pool.json"),
        JSON.stringify(poolInfo, null, 2)
      );

      console.log("Pool created successfully!");
      console.log("Pool details saved to base-pool.json");
      
    } catch (error) {
      console.error("Pool creation failed:", error);
      process.exit(1);
    }
}); 
