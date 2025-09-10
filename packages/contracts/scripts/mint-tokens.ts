import { task } from "hardhat/config";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { TaskArgs, HardhatRuntimeEnvironment } from "./types";

task("mint-tokens", "Mints GATA tokens to specified addresses")
  .setAction(async (taskArgs: TaskArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      console.log("Minting GATA tokens...");
      
      // Read token deployment info
      const tokenDeployment = JSON.parse(
        readFileSync(join(process.cwd(), "token-deployment.json"), "utf8")
      );
      
      const stakeDeployment = JSON.parse(
        readFileSync(join(process.cwd(), "stake-deployment.json"), "utf8")
      );

      console.log("Token Address:", tokenDeployment.token.address);
      console.log("Stake Contract:", stakeDeployment.stake.address);

      // Get the token contract
      const tokenContract = await hre.ethers.getContractAt(
        "Gata",
        tokenDeployment.token.address
      );

      // Define recipients and amounts
      const userAddress = "0x7D22817D106f0a12dD117Ed9AF1A2496Bf106D07";
      const stakeAddress = stakeDeployment.stake.address;
      const mintAmount = hre.ethers.utils.parseEther("1000000000"); // 1 billion tokens

      console.log(`Minting ${hre.ethers.utils.formatEther(mintAmount)} GATA tokens to each address...`);

      // Mint to user address
      console.log(`Minting to user address: ${userAddress}`);
      const tx1 = await tokenContract.mint(userAddress, mintAmount);
      console.log("Transaction sent, waiting for confirmation...");
      await tx1.wait();
      console.log("✅ Minted to user address");

      // Mint to stake contract for rewards
      console.log(`Minting to stake contract: ${stakeAddress}`);
      const tx2 = await tokenContract.mint(stakeAddress, mintAmount);
      console.log("Transaction sent, waiting for confirmation...");
      await tx2.wait();
      console.log("✅ Minted to stake contract");

      // Check balances
      const userBalance = await tokenContract.balanceOf(userAddress);
      const stakeBalance = await tokenContract.balanceOf(stakeAddress);

      console.log("=== Minting Complete ===");
      console.log(`User balance: ${hre.ethers.utils.formatEther(userBalance)} GATA`);
      console.log(`Stake contract balance: ${hre.ethers.utils.formatEther(stakeBalance)} GATA`);
      console.log(`Total minted: ${hre.ethers.utils.formatEther(userBalance.add(stakeBalance))} GATA`);

      // Write minting info
      const mintingInfo = {
        network: hre.network.name,
        tokenContract: tokenDeployment.token.address,
        recipients: [
          {
            address: userAddress,
            amount: hre.ethers.utils.formatEther(mintAmount),
            purpose: "User allocation"
          },
          {
            address: stakeAddress,
            amount: hre.ethers.utils.formatEther(mintAmount),
            purpose: "Staking rewards pool"
          }
        ],
        totalMinted: hre.ethers.utils.formatEther(mintAmount.mul(2)),
        timestamp: new Date().toISOString()
      };
      
      writeFileSync(
        join(process.cwd(), "token-minting.json"),
        JSON.stringify(mintingInfo, null, 2)
      );

      console.log("Minting details saved to token-minting.json");
      
    } catch (error) {
      console.error("Token minting failed:", error);
      process.exit(1);
    }
}); 
