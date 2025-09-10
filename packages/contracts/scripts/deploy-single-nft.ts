import { task } from "hardhat/config";
import { writeFileSync } from "fs";
import { join } from "path";
import type { TaskArgs, HardhatRuntimeEnvironment } from "./types";

task("deploy-single-nft", "Deploys a single NFT contract for Base")
  .setAction(async (taskArgs: TaskArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      console.log("Deploying single NFT contract for Base...");
      
      // Get the contract factory
      const NFTContract = await hre.ethers.getContractFactory("GataNFT");
      
      // Deploy contract with specific parameters for Base
      const nft = await NFTContract.deploy(
        "GATA NFT Collection",
        "GATA",
        "ipfs://QmPC9t91yqmBvQ3A169QfP4cFJmwU9iKUCPnFs4o6YAYWM/Gata_NFT_metadata_gg7.json",
        "ipfs://QmPC9t91yqmBvQ3A169QfP4cFJmwU9iKUCPnFs4o6YAYWM/Gata_NFT_metadata_gg7.json"
      );
      
      // Wait for deployment
      await nft.deployed();
      const deployedAddress = nft.address;
      
      // Verify contract on etherscan if not on local network and API key is available
      if (hre.network.name !== "localhost" && hre.network.name !== "hardhat" && hre.network.name !== "customnet" && process.env.BASESCAN_API_KEY) {
        console.log("Verifying contract on Etherscan...");
        try {
          await hre.run("verify:verify", {
            address: deployedAddress,
            constructorArguments: [
              "GATA NFT Collection",
              "GATA",
              "ipfs://QmPC9t91yqmBvQ3A169QfP4cFJmwU9iKUCPnFs4o6YAYWM/Gata_NFT_metadata_gg7.json",
              "ipfs://QmPC9t91yqmBvQ3A169QfP4cFJmwU9iKUCPnFs4o6YAYWM/Gata_NFT_metadata_gg7.json"
            ],
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
        nft: {
          name: "GATA NFT Collection",
          symbol: "GATA",
          address: deployedAddress
        }
      };
      
      writeFileSync(
        join(process.cwd(), "nft-deployment.json"),
        JSON.stringify(deploymentInfo, null, 2)
      );
      
      console.log("GATA NFT Collection deployed to:", deployedAddress);
      
    } catch (error) {
      console.error("Deployment failed:", error);
      process.exit(1);
    }
}); 
