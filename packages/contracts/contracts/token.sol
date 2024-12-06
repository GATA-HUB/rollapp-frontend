// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Gata is ERC20, ERC20Burnable, Ownable {
    bool public isTransferLocked = false;

    modifier canTransfer() {
        require(!isTransferLocked || _msgSender() == owner(), "Gata: Transfers are currently locked.");
        _;
    }

    constructor() ERC20("Gata", "GATA") Ownable() {
        // owner minting could be done here or later
        // _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function lockTransfers() public onlyOwner {
        isTransferLocked = true;
    }

    function unlockTransfers() public onlyOwner {
        isTransferLocked = false;
    }

    function transfer(address recipient, uint256 amount) public override canTransfer returns (bool) {
        return super.transfer(recipient, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override canTransfer returns (bool) {
        return super.transferFrom(sender, recipient, amount);
    }
}