// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GataNFT is ERC721Enumerable, Ownable {
    uint256 public currentTokenId;
    uint256 public maxSupply = 5000;
    uint256 public _publicSalePrice = 0.019 ether;
    uint256 public _publicSaleEndTime = 1783353736;
    string public baseURI;
    string public metadataURI;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        string memory _metadataURI
    ) ERC721(_name, _symbol) {
        baseURI = _baseURI;
        metadataURI = _metadataURI;
    }

    function mint(uint256 _amount) public payable {
        require(_amount > 0, "Amount has to be greater than 0");
        require(currentTokenId + _amount <= maxSupply, "Max supply exceeded");
        require(_publicSalePrice * _amount <= msg.value, "Not enough tokens sent");

        for (uint i = 0; i < _amount; i++) {
            uint256 newItemId = currentTokenId + 1;
            currentTokenId = newItemId;
            _safeMint(msg.sender, newItemId);
        }
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return baseURI;
        // return string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"));
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }
}