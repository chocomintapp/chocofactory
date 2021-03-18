// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// this is copied from NFTBoxes
// https://etherscan.io/address/0x6d4530149e5b4483d2f7e60449c02570531a0751#code
// modified by taijusanagi

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "./IHasSecondarySaleFees.sol";

contract HasSecondarySaleFees is IERC165, IHasSecondarySaleFees {
    mapping(uint256 => address payable[]) royaltyAddressMemory;
    mapping(uint256 => uint256[]) royaltyMemory;

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IHasSecondarySaleFees).interfaceId;
    }

    function getFeeRecipients(uint256 id) external view override returns (address payable[] memory) {
        return royaltyAddressMemory[id];
    }

    function getFeeBps(uint256 id) external view override returns (uint256[] memory) {
        return royaltyMemory[id];
    }
}
