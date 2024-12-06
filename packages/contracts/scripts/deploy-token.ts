import { task } from "hardhat/config";
import { writeFileSync } from "fs";
import { join } from "path";
import type { TaskArgs, HardhatRuntimeEnvironment } from "./types";

task("deploy-token", "Deploys the Gata token contract")
  .setAction(async (taskArgs: TaskArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      console.log("Deploying Gata token contract...");
      
      // Get the contract factory
      const GataToken = await hre.ethers.getContractFactory("Gata");
      
      // Deploy contract
      const token = await GataToken.deploy();
      
      // Wait for deployment
      await token.deployed();
      const deployedAddress = token.address;
      
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
        token: {
          name: "Gata",
          symbol: "GATA",
          address: deployedAddress
        }
      };
      
      writeFileSync(
        join(process.cwd(), "token-deployment.json"),
        JSON.stringify(deploymentInfo, null, 2)
      );
      
      console.log("Gata token deployed to:", deployedAddress);
      
    } catch (error) {
      console.error("Deployment failed:", error);
      process.exit(1);
    }
}); 