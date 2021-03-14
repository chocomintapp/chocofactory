// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "hardhat/console.sol";

contract Chocofactory {
    using Address for address;
    using Clones for address;
    using ECDSA for bytes32;

    event Deployed(address indexed owner, address indexed implementation, address indexed deployedContract, bytes data);

    function deploy(address implementation, bytes memory data) public payable {
        _deploy(msg.sender, implementation, data);
    }

    function deployWithSig(
        address implementation,
        bytes memory data,
        bytes memory signature
    ) public payable {
        bytes32 hash =
            keccak256(abi.encodePacked(block.chainid, address(this), implementation, data)).toEthSignedMessageHash();
        address owner = hash.recover(signature);
        _deploy(owner, implementation, data);
    }

    function predictDeployResult(
        address owner,
        address implementation,
        bytes memory data
    ) public view returns (address) {
        bytes32 salt = keccak256(abi.encodePacked(data, owner));
        return implementation.predictDeterministicAddress(salt, address(this));
    }

    function _deploy(
        address owner,
        address implementation,
        bytes memory data
    ) internal {
        bytes32 salt = keccak256(abi.encodePacked(data, owner));
        address deployedContract = implementation.cloneDeterministic(salt);
        deployedContract.functionCallWithValue(data, msg.value);
        emit Deployed(owner, implementation, deployedContract, data);
    }
}
