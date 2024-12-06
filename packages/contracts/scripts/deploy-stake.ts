import { task } from "hardhat/config";
import { writeFileSync } from "fs";
import { join } from "path";
import type { TaskArgs, HardhatRuntimeEnvironment } from "./types";

task("deploy-stake", "Deploys the TycheStake contract")
  .setAction(async (taskArgs: TaskArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      console.log("Deploying TycheStake contract...");
      
      // Get the contract factory
      const StakeContract = await hre.ethers.getContractFactory("TycheStakeMultiPoolSupport");
      
      // Deploy contract
      const stake = await StakeContract.deploy();
      
      // Wait for deployment
      await stake.deployed();
      const deployedAddress = stake.address;
      
      // Verify contract on etherscan if not on local network
      if (hre.network.name !== "localhost" && hre.network.name !== "hardhat" && hre.network.name !== "customnet") {
        console.log("Verifying contract on Etherscan...");
        await hre.run("verify:verify", {
          address: deployedAddress,
          constructorArguments: [],
        });
      }
      
      // Write deployment info to file
      const deploymentInfo = {
        network: hre.network.name,
        stake: {
          name: "TycheStakeMultiPoolSupport",
          address: deployedAddress
        }
      };
      
      writeFileSync(
        join(process.cwd(), "stake-deployment.json"),
        JSON.stringify(deploymentInfo, null, 2)
      );
      
      console.log("TycheStake contract deployed to:", deployedAddress);
      
    } catch (error) {
      console.error("Deployment failed:", error);
      process.exit(1);
    }
}); 