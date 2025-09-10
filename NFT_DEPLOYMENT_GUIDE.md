# NFT Deployment Guide for GATA Rollapp

This guide explains how to deploy NFT contracts to Base network and integrate them into the GATA rollapp for minting and staking functionality.

## Prerequisites

- Node.js 18+ and pnpm installed
- A wallet with Base network ETH for deployment gas fees
- Private key of the deploying wallet
- Basic understanding of smart contracts and blockchain deployment

## Project Structure

```
packages/
├── contracts/          # Smart contracts and deployment scripts
│   ├── contracts/      # Solidity contract files
│   ├── scripts/        # Deployment and management scripts
│   └── hardhat.config.ts
└── web/               # Frontend application
    └── src/app/
        ├── utils/index.js  # Contract configurations
        └── env.ts          # Environment settings
```

## Step 1: Prepare the NFT Contract

The NFT contract (`packages/contracts/contracts/nft.sol`) is a standard ERC721 with the following features:
- **Enumerable**: Supports token enumeration
- **Ownable**: Has owner-only functions
- **Configurable pricing**: Set mint price in constructor
- **Supply limit**: Maximum 5,000 NFTs per collection
- **IPFS metadata support**: Metadata stored on IPFS

### Key Contract Parameters:
- `_name`: Collection name (e.g., "GATA NFT Collection")
- `_symbol`: Collection symbol (e.g., "GATA")
- `_baseURI`: IPFS URI for metadata
- `_metadataURI`: IPFS URI for collection metadata

## Step 2: Configure Network Settings

Ensure Base network is configured in `packages/contracts/hardhat.config.ts`:

```typescript
networks: {
  base: {
    url: "https://mainnet.base.org",
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    chainId: 8453
  }
}
```

## Step 3: Create Deployment Script

Create a deployment script (example: `deploy-single-nft.ts`):

```typescript
const nft = await NFTContract.deploy(
  "Your Collection Name",
  "SYMBOL",
  "ipfs://your-metadata-hash/metadata.json",
  "ipfs://your-metadata-hash/metadata.json"
);
```

## Step 4: Deploy the NFT Contract

1. **Navigate to contracts directory:**
   ```bash
   cd packages/contracts
   ```

2. **Set your private key:**
   ```bash
   export PRIVATE_KEY=your_private_key_without_0x_prefix
   ```

3. **Compile contracts:**
   ```bash
   pnpm compile
   ```

4. **Deploy to Base:**
   ```bash
   npx hardhat deploy-single-nft --network base
   ```

5. **Record the deployed address** from the output (e.g., `0xCB55Cb70ed4965Db3A219D316b6c41d4Ac49bBB8`)

## Step 5: Create Staking Pool

1. **Create pool for the NFT collection:**
   ```bash
   npx hardhat create-base-pool --network base
   ```

   This creates a staking pool with:
   - Reward token: GATA token
   - Reward rate: 1 GATA per second
   - Duration: 60 days
   - Pool index: 0 (first pool for this collection)

## Step 6: Create a Staking Pool

After deploying your NFT contract, you need to create a staking pool so users can stake their NFTs and earn rewards.

### 6.1 Understand Pool Parameters

A staking pool requires these parameters:
- **NFT Contract Address**: The collection that can be staked
- **Reward Token**: Token used for rewards (usually GATA token)
- **Reward Rate**: Tokens per second (e.g., "1000000000000000000" = 1 token/second)
- **Start Time**: When staking becomes active (Unix timestamp)
- **End Time**: When rewards stop (Unix timestamp)
- **Secondary Reward**: Optional second reward token (use zero address if none)

### 6.2 Create Pool Script

Create a deployment script for your pool (example: `create-my-nft-pool.ts`):

```typescript
// Read your deployment files
const nftDeployment = JSON.parse(
  readFileSync(join(process.cwd(), "nft-deployment.json"), "utf8")
);
const tokenDeployment = JSON.parse(
  readFileSync(join(process.cwd(), "token-deployment.json"), "utf8")
);
const stakeDeployment = JSON.parse(
  readFileSync(join(process.cwd(), "stake-deployment.json"), "utf8")
);

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
const tx = await stakeContract.createPool(
  nftDeployment.nft.address,
  rewardToken1,
  rewardPerSecond1,
  startTime,
  endTime,
  rewardToken2,
  rewardPerSecond2
);
```

### 6.3 Deploy the Pool

1. **Add script to index.ts:**
   ```typescript
   require("./create-my-nft-pool");
   ```

2. **Run pool creation:**
   ```bash
   npx hardhat create-my-nft-pool --network base
   ```

### 6.4 Pool Configuration Examples

**Standard Pool (1 GATA/second for 60 days):**
```javascript
rewardPerSecond1: "1000000000000000000"  // 1 token
duration: 60 * 60 * 24 * 60              // 60 days
```

**High Reward Pool (5 GATA/second for 30 days):**
```javascript
rewardPerSecond1: "5000000000000000000"  // 5 tokens
duration: 60 * 60 * 24 * 30              // 30 days
```

**Free NFT Pool (2x rewards to incentivize):**
```javascript
rewardPerSecond1: "2000000000000000000"  // 2 tokens
duration: 60 * 60 * 24 * 60              // 60 days
```

### 6.5 Verify Pool Creation

After creation, verify your pool:
```bash
echo "Pool Index: $(cat my-nft-pool.json | jq -r '.poolIndex')"
echo "Reward Rate: $(cat my-nft-pool.json | jq -r '.rewardPerSecond')"
```

**Important Notes:**
- Pool index starts at 0 for first pool per collection
- You can create multiple pools for the same NFT collection
- Reward tokens must be transferred to the staking contract
- Pool parameters cannot be changed after creation (except end time)

## Step 7: Integrate NFT into the App

### 7.1 Update Live Mints Configuration

Edit `packages/web/src/env.ts`:

```typescript
export const ENV = {
  liveMints: ['0xYourNFTContractAddress'],
  // ... other settings
}
```

### 7.2 Update Network Configuration

Edit `packages/web/src/app/utils/index.js`:

```javascript
// Add to CONTRACTS_BY_NETWORK for Base (8453)
8453: {
  ERC721: {
    address: "0xYourNFTContractAddress",
    abi: ERC721ABI,
  },
  // ... other contracts
}
```

### 7.3 Update Contract ABIs

Copy the latest NFT ABI:
```bash
jq .abi artifacts/contracts/nft.sol/GataNFT.json > ../web/src/app/contracts/ERC721.json
```

## Step 8: Verify Integration

After deployment and configuration:

1. **Mint Page**: NFT will appear in `/mint` for users to mint
2. **Staking**: Users can stake NFTs at `/stake`
3. **Dashboard**: Staked NFTs show in `/dashboard` and `/myAssets`

## Customizing NFT Parameters

### Free Minting NFT

To create a free-to-mint NFT, modify the deployment script:

```typescript
// In your deployment script, the price is set in the constructor
// For free minting, you can override the mint function or set price to 0
```

### Different Pricing

Modify the `_publicSalePrice` in the contract or deployment parameters:

```solidity
uint256 public _publicSalePrice = 0; // Free
uint256 public _publicSalePrice = 0.01 ether; // 0.01 ETH
```

## File Structure After Deployment

```
packages/contracts/
├── nft-deployment.json     # Contains deployed NFT address
├── base-pool.json         # Contains pool configuration
├── token-deployment.json  # GATA token address
└── stake-deployment.json  # Staking contract address
```

## Troubleshooting

### Common Issues:

1. **Gas Fee Too Low**: Increase gas limit in hardhat config
2. **RPC Connection Failed**: Check Base network RPC endpoints
3. **NFT Not Showing**: Verify `liveMints` array and network ID (8453)
4. **Staking Not Working**: Ensure pool was created and addresses match

### Verification:

Check deployment with:
```bash
echo "NFT: $(cat nft-deployment.json | jq -r '.nft.address')"
echo "Pool: $(cat base-pool.json | jq -r '.poolIndex')"
echo "Live Mints: $(grep liveMints ../web/src/env.ts)"
```

## Network Configuration Summary

- **Network**: Base Mainnet
- **Chain ID**: 8453
- **RPC**: https://mainnet.base.org
- **Block Explorer**: https://basescan.org
- **Default Network ID in App**: 8453

## Support

For technical issues:
1. Check console logs in browser developer tools
2. Verify contract addresses match in all configuration files
3. Ensure wallet is connected to Base network
4. Confirm sufficient ETH balance for transactions

---

*This guide covers the complete NFT deployment and integration process for the GATA rollapp on Base network.*
