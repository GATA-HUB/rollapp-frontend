import { task } from "hardhat/config";
import { writeFileSync } from "fs";
import { join } from "path";
import type { TaskArgs, HardhatRuntimeEnvironment } from "./types";

task("deploy-free-nft", "Deploys a free NFT contract for Base")
  .setAction(async (taskArgs: TaskArgs, hre: HardhatRuntimeEnvironment) => {
    try {
      console.log("Deploying free NFT contract for Base...");
      
      // Get the contract factory
      const NFTContract = await hre.ethers.getContractFactory("GataFreeNFT");
      
      // Deploy contract with free minting parameters
      const nft = await NFTContract.deploy(
        "GATA Free Collection",
        "GFREE",
        "ipfs://QmPC9t91yqmBvQ3A169QfP4cFJmwU9iKUCPnFs4o6YAYWM/Gata_NFT_metadata_free.json",
        "ipfs://QmPC9t91yqmBvQ3A169QfP4cFJmwU9iKUCPnFs4o6YAYWM/Gata_NFT_metadata_free.json"
      );
      
      // Wait for deployment
      await nft.deployed();
      const deployedAddress = nft.address;
      
      console.log("Free NFT deployed with freeMint() function available!");
      console.log("Users can call freeMint() for free minting or mint() with 0 ETH required");
      
      // Verify contract on etherscan if not on local network and API key is available
      if (hre.network.name !== "localhost" && hre.network.name !== "hardhat" && hre.network.name !== "customnet" && process.env.BASESCAN_API_KEY) {
        console.log("Verifying contract on Etherscan...");
        try {
          await hre.run("verify:verify", {
            address: deployedAddress,
            constructorArguments: [
              "GATA Free Collection",
              "GFREE",
              "ipfs://QmPC9t91yqmBvQ3A169QfP4cFJmwU9iKUCPnFs4o6YAYWM/Gata_NFT_metadata_free.json",
              "ipfs://QmPC9t91yqmBvQ3A169QfP4cFJmwU9iKUCPnFs4o6YAYWM/Gata_NFT_metadata_free.json"
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
          name: "GATA Free Collection",
          symbol: "GFREE",
          address: deployedAddress,
          mintPrice: "0", // Free minting
          note: "Free minting available via freeMint() function"
        }
      };
      
      writeFileSync(
        join(process.cwd(), "free-nft-deployment.json"),
        JSON.stringify(deploymentInfo, null, 2)
      );
      
      console.log("GATA Free Collection deployed to:", deployedAddress);
      
    } catch (error) {
      console.error("Deployment failed:", error);
      process.exit(1);
    }
}); 
