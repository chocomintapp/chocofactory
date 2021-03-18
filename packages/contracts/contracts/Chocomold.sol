// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

import "./extentions/HasSecondarySaleFees.sol";
import "./utils/IPFS.sol";
import "./utils/LiteralStrings.sol";

contract Chocomold is
    Initializable,
    OwnableUpgradeable,
    ERC721Upgradeable,
    ERC721BurnableUpgradeable,
    // ERC721PausableUpgradeable,
    HasSecondarySaleFees
{
    using StringsUpgradeable for uint256;
    using IPFS for bytes32;
    using IPFS for bytes;
    using LiteralStrings for bytes;

    mapping(uint256 => bytes32) public ipfsHashes;

    string public constant defaultBaseURI = "https://asia-northeast1-chocofactory-prod.cloudfunctions.net/metadata/";
    string public customBaseURI;

    function initialize(
        string memory _name,
        string memory _symbol,
        address _owner
    ) public initializer {
        __Ownable_init_unchained();
        __ERC721_init_unchained(_name, _symbol);
        transferOwnership(_owner);
    }

    function supportsInterface(bytes4 _interfaceId)
        public
        view
        override(ERC721Upgradeable, HasSecondarySaleFees)
        returns (bool)
    {
        return super.supportsInterface(_interfaceId);
    }

    function _baseURI() internal view override returns (string memory) {
        if (bytes(customBaseURI).length > 0) {
            return customBaseURI;
        } else {
            return defaultBaseURI;
        }
    }

    function setCustomBaseURI(string memory _customBaseURI) public onlyOwner {
        customBaseURI = _customBaseURI;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "token must exist");
        bytes32 ipfsHash = ipfsHashes[_tokenId];

        if (ipfsHash != "") {
            return string(ipfsHashes[_tokenId].addSha256FunctionCodePrefix().toBase58().addIpfsBaseUrlPrefix());
        } else {
            if (bytes(customBaseURI).length == 0) {
                string memory utf8Address = abi.encodePacked(address(this)).toLiteralString();
                return
                    string(
                        abi.encodePacked(
                            defaultBaseURI,
                            block.chainid.toString(),
                            "/",
                            utf8Address,
                            "/",
                            _tokenId.toString()
                        )
                    );
            } else {
                return super.tokenURI(_tokenId);
            }
        }
    }

    function _setIpfsHash(uint256 _tokenId, bytes32 _ipfsHash) internal {
        ipfsHashes[_tokenId] = _ipfsHash;
    }

    function setIpfsHash(uint256[] memory _tokenIdList, bytes32[] memory _ipfsHashList) public onlyOwner {
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            _setIpfsHash(_tokenIdList[i], _ipfsHashList[i]);
        }
    }

    function setRoyality(
        uint256[] memory _tokenIdList,
        address payable[][] memory _royaltyAddressList,
        uint256[][] memory _royaltyList
    ) public onlyOwner {
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            _setRoyality(_tokenIdList[i], _royaltyAddressList[i], _royaltyList[i]);
        }
    }

    function _mint(
        address _to,
        uint256 _tokenId,
        bytes32 _ipfsHash
    ) internal {
        _mint(_to, _tokenId);
        _setIpfsHash(_tokenId, _ipfsHash);
    }

    function _mint(
        address _to,
        uint256 _tokenId,
        address payable[] memory _royaltyAddressMemory,
        uint256[] memory _royaltyMemory
    ) internal {
        _mint(_to, _tokenId);
        _setRoyality(_tokenId, _royaltyAddressMemory, _royaltyMemory);
    }

    function _mint(
        address _to,
        uint256 _tokenId,
        bytes32 _ipfsHash,
        address payable[] memory _royaltyAddressMemory,
        uint256[] memory _royaltyMemory
    ) internal {
        _mint(_to, _tokenId);
        _setIpfsHash(_tokenId, _ipfsHash);
        _setRoyality(_tokenId, _royaltyAddressMemory, _royaltyMemory);
    }

    function mint(address _to, uint256 _tokenId) public onlyOwner {
        _mint(_to, _tokenId);
    }

    function mint(address[] memory _toList, uint256[] memory _tokenIdList) public onlyOwner {
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            _mint(_toList[i], _tokenIdList[i]);
        }
    }

    function mint(
        address _to,
        uint256 _tokenId,
        bytes32 _ipfsHash
    ) public onlyOwner {
        _mint(_to, _tokenId, _ipfsHash);
    }

    function mint(
        address[] memory _toList,
        uint256[] memory _tokenIdList,
        bytes32[] memory _ipfsHashList
    ) public onlyOwner {
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            _mint(_toList[i], _tokenIdList[i], _ipfsHashList[i]);
        }
    }

    function mint(
        address _to,
        uint256 _tokenId,
        address payable[] memory _royaltyAddressMemory,
        uint256[] memory _royaltyMemory
    ) public onlyOwner {
        _mint(_to, _tokenId, _royaltyAddressMemory, _royaltyMemory);
    }

    function mint(
        address[] memory _toList,
        uint256[] memory _tokenIdList,
        address payable[][] memory _royaltyAddressMemory,
        uint256[][] memory _royaltyMemory
    ) public onlyOwner {
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            _mint(_toList[i], _tokenIdList[i], _royaltyAddressMemory[i], _royaltyMemory[i]);
        }
    }

    function mint(
        address _to,
        uint256 _tokenId,
        bytes32 _ipfsHash,
        address payable[] memory _royaltyAddressMemory,
        uint256[] memory _royaltyMemory
    ) public onlyOwner {
        _mint(_to, _tokenId, _ipfsHash, _royaltyAddressMemory, _royaltyMemory);
    }

    function mint(
        address[] memory _toList,
        uint256[] memory _tokenIdList,
        bytes32[] memory _ipfsHashList,
        address payable[][] memory _royaltyAddressMemory,
        uint256[][] memory _royaltyMemory
    ) public onlyOwner {
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            _mint(_toList[i], _tokenIdList[i], _ipfsHashList[i], _royaltyAddressMemory[i], _royaltyMemory[i]);
        }
    }

    // function _beforeTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 tokenId
    // ) internal virtual override(ERC721Upgradeable, ERC721PausableUpgradeable) {
    //     super._beforeTokenTransfer(from, to, tokenId);
    // }

    function _burn(uint256 _tokenId) internal virtual override {
        super._burn(_tokenId);
        if (ipfsHashes[_tokenId] != "") {
            delete ipfsHashes[_tokenId];
        }
    }
}
