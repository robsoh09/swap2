//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TERC20 is ERC20 {
    uint8 private _decimals;

    constructor(string memory name, string memory symbol, uint8 decimals) ERC20(name, symbol) {
        _decimals = decimals;
    }

    function _mintTERC(uint256 amount) public {
        if (amount <= 10 * (10**_decimals)) {
            _mint(msg.sender, amount);
        }
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}
