import { task } from "hardhat/config";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { TaskArgs, NFTConfig, HardhatRuntimeEnvironment } from "./types";

task("deploy-nfts", "Deploys NFT contracts from config")
  .setAction(async (taskArgs: TaskArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      // Get the contract factory using HRE's ethers
      const NFTContract = await hre.ethers.getContractFactory("GataNFT");
      
      // Read and parse the NFTs configuration file
      const nftsConfig = JSON.parse(readFileSync(join(process.cwd(), "nfts.json"), "utf8"));
      const deployedContracts = [];
      
      for (const nftConfig of nftsConfig.nfts) {
        console.log(`Deploying NFT contract for ${nftConfig.name}...`);
        
        // Deploy contract
        const nft = await NFTContract.deploy(
          nftConfig.name,
          nftConfig.symbol,
          nftConfig.baseURI,
          nftConfig.metadataURI
        );
        
        // Wait for deployment
        await nft.deployed();
        const deployedAddress = nft.address;
        
        // Verify contract on etherscan if not on local network
        if (hre.network.name !== "localhost" && hre.network.name !== "hardhat" && hre.network.name !== "customnet") {
          console.log("Verifying contract on Etherscan...");
          await hre.run("verify:verify", {
            address: deployedAddress,
            constructorArguments: [
              nftConfig.name,
              nftConfig.symbol, 
              nftConfig.baseURI,
              nftConfig.metadataURI
            ],
          });
        }
        
        deployedContracts.push({
          name: nftConfig.name,
          address: deployedAddress
        });
        
        console.log(`${nftConfig.name} deployed to:`, deployedAddress);
        console.log("--------------------");
      }
      
      // Write deployed addresses to a file for frontend use
      const deploymentInfo = {
        network: hre.network.name,
        contracts: deployedContracts
      };
      
      writeFileSync(
        join(process.cwd(), "deployments.json"),
        JSON.stringify(deploymentInfo, null, 2)
      );
      
    } catch (error) {
      console.error("Deployment failed:", error);
      process.exit(1);
    }
}); 