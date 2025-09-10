import { task } from "hardhat/config";
import { writeFileSync } from "fs";
import { join } from "path";
import type { TaskArgs, HardhatRuntimeEnvironment } from "./types";

task("deploy-stake", "Deploys the GataStake contract")
  .setAction(async (taskArgs: TaskArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      console.log("Deploying GataStake contract...");
      
      // Get the contract factory
      const StakeContract = await hre.ethers.getContractFactory("GataStakeMultiPoolSupport");
      
      // Deploy contract
      const stake = await StakeContract.deploy();
      
      // Wait for deployment
      await stake.deployed();
      const deployedAddress = stake.address;
      
      // Verify contract on etherscan if not on local network and API key is available
      if (hre.network.name !== "localhost" && hre.network.name !== "hardhat" && hre.network.name !== "customnet" && process.env.BASESCAN_API_KEY) {
        console.log("Verifying contract on Etherscan...");
        try {
          await hre.run("verify:verify", {
            address: deployedAddress,
            constructorArguments: [],
          });
        } catch (error) {
          console.log("Verification failed:", error.message);
        }
      } else {
        console.log("Skipping verification (no API key or local network)");
      }
      
      // Write deployment info to file
      const deploymentInfo = {
        network: hre.network.name,
        stake: {
          name: "GataStakeMultiPoolSupport",
          address: deployedAddress
        }
      };
      
      writeFileSync(
        join(process.cwd(), "stake-deployment.json"),
        JSON.stringify(deploymentInfo, null, 2)
      );
      
      console.log("GataStake contract deployed to:", deployedAddress);
      
    } catch (error) {
      console.error("Deployment failed:", error);
      process.exit(1);
    }
}); 