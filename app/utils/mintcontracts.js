import {ethers} from "ethers";
import {chainInfo, REACT_APP_NETWORK_ID} from "../chainInfo";
import {Contract} from "@ethersproject/contracts";
import NFTABI from "../contracts/NFT.json";
import {ENV} from "@/env";

export const defaultProvider = new ethers.providers.JsonRpcProvider(chainInfo[REACT_APP_NETWORK_ID].REACT_APP_NODE_1);
export const defaultSigner = defaultProvider.getSigner();

export async function mint(contractAddress, quantity, price, provider, signerAddress) {
    const stakeContract = new Contract(contractAddress, NFTABI, provider);
    try {
        // Estimate gas for the transaction
        const estimatedGas = await stakeContract.estimateGas.mint(quantity, {from: signerAddress, value: ethers.utils.parseEther(price).mul(quantity)});
        // Prepare the transaction options
        const txOptions = {
            gasLimit: estimatedGas, // Use the estimated gas value
            gasPrice: await provider.getGasPrice(),
            from: signerAddress,
            value: ethers.utils.parseEther(price).mul(quantity)
        };

        // Send the transaction
        const tx = await stakeContract.mint(quantity, txOptions);
        await tx.wait(1);
        return true;
    } catch (err) {
        console.log("MintError: ", err);
        return false;
    }
}

export async function getAllCollectionsMetadata(liveMints, provider = defaultProvider) {
    const allCollectionsMetadata = [];
    for (let i = 0; i < liveMints.length; i++) {
        const collectionAddress = liveMints[i];
        const contract = new Contract(collectionAddress, NFTABI, provider);
        const metadataMethods = ['totalSupply', 'name', 'owner', '_publicSalePrice', 'metadataURI', '_publicSaleEndTime', 'maxSupply'];
        const [
            totalSupply,
            name,
            owner,
            _publicSalePrice,
            metadataURI,
            _publicSaleEndTime,
            maxSupply
        ] = await Promise.all(metadataMethods.map(method => contract[method]()));
        const ipfsGatewayMetadata = metadataURI.replace('ipfs://', ENV.ipfsGateway)
        const {description, image} = await fetch(ipfsGatewayMetadata).then(response => response.json());
        const collectionData = {
            image: image.replace('ipfs://', ENV.ipfsGateway),
            collection: name,
            creator: owner,
            price: ethers.utils.formatEther(_publicSalePrice),
            minted: totalSupply.toNumber(),
            royalties: '5%',
            endingDate: _publicSaleEndTime.toNumber(),
            desc: description,
            quantity: maxSupply.toNumber(),
            address: collectionAddress,
        }
        allCollectionsMetadata.push(collectionData);
    }
    console.log("All collections metadata: ", allCollectionsMetadata);
    return allCollectionsMetadata;
}

export const registerMintListeners = (contracts, handleTransfer) => {
    console.log("Registering mint listeners");
    const nftContracts = contracts.map(address => new Contract(address, NFTABI, defaultProvider));

    nftContracts.forEach((contract, index) => {
        contract.on('Transfer', handleTransfer(index));
    });

    return () => {
        nftContracts.forEach((contract, index) => {
            contract.off('Transfer', handleTransfer(index));
        });
    };
}

export const getNftsOwnedByUser = async (address, collectionAddress, provider = defaultProvider) => {
    const contract = new Contract(collectionAddress, NFTABI, provider);
    const nfts = await contract.balanceOf(address);
    const ownedNfts = [];
    for (let i = 0; i < nfts.toNumber(); i++) {
        const [tokenId] = await contract.tokenOfOwnerByIndex(address, i);
        ownedNfts.push(tokenId.toNumber());
    }
    return ownedNfts;
}

export const balanceOfUser = async (address, collectionAddress, provider = defaultProvider) => {
    const contract = new Contract(collectionAddress, NFTABI, provider);
    return (await contract.balanceOf(address)).toNumber();
}