// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// this is copied from NFTBoxes
// https://etherscan.io/address/0x6d4530149e5b4483d2f7e60449c02570531a0751#code
// modified by taijusanagi

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "./IHasSecondarySaleFees.sol";

contract HasSecondarySaleFees is IERC165, IHasSecondarySaleFees {
    address payable[] defaultRoyaltyAddressMemory;
    uint256[] defaultRoyaltyMemory;

    mapping(uint256 => address payable[]) royaltyAddressMemory;
    mapping(uint256 => uint256[]) royaltyMemory;

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IHasSecondarySaleFees).interfaceId;
    }

    function getFeeRecipients(uint256 _tokenId) external view override returns (address payable[] memory) {
        return royaltyAddressMemory[_tokenId].length > 0 ? royaltyAddressMemory[_tokenId] : defaultRoyaltyAddressMemory;
    }

    function getFeeBps(uint256 _tokenId) external view override returns (uint256[] memory) {
        return royaltyMemory[_tokenId].length > 0 ? royaltyMemory[_tokenId] : defaultRoyaltyMemory;
    }

    function _setRoyality(
        uint256 _tokenId,
        address payable[] memory _royaltyAddress,
        uint256[] memory _royalty
    ) internal {
        royaltyAddressMemory[_tokenId] = _royaltyAddress;
        royaltyMemory[_tokenId] = _royalty;
    }

    function _setDefaultRoyality(address payable[] memory _royaltyAddress, uint256[] memory _royalty) internal {
        defaultRoyaltyAddressMemory = _royaltyAddress;
        defaultRoyaltyMemory = _royalty;
    }
}
