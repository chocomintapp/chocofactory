// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./extentions/HasSecondarySaleFees.sol";
import "./utils/IPFS.sol";
import "./utils/String.sol";

import "hardhat/console.sol";

contract Chocomold is
    AccessControlEnumerable,
    Initializable,
    ERC721,
    ERC721Burnable,
    HasSecondarySaleFees,
    IPFS,
    String
{
    using Strings for uint256;

    bytes32 constant MAINTAINER_ROLE = keccak256("MAINTAINER_ROLE");

    mapping(uint256 => bytes32) public ipfsHashes;

    string private name_;
    string private symbol_;

    // this is intentionally set as constant value with hard coding
    // because if you set this as initialize parameter, user needs to pay more gas cost
    string public constant defaultBaseURI = "https://asia-northeast1-chocofactory-prod.cloudfunctions.net/metadata/";
    string public customBaseURI;

    // this is template contract
    // so original contract is created with fixed null value
    constructor() ERC721("", "") {
        initialize("", "", address(0x0));
    }

    function initialize(
        string memory _name,
        string memory _symbol,
        address _owner
    ) public initializer {
        name_ = _name;
        symbol_ = _symbol;
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(MAINTAINER_ROLE, _owner);
    }

    function validateIsMaintainer(address _maintainer) internal view {
        require(hasRole(MAINTAINER_ROLE, _maintainer), "must have maintainer role");
    }

    modifier onlyMaintainer() {
        validateIsMaintainer(msg.sender);
        _;
    }

    function supportsInterface(bytes4 _interfaceId)
        public
        view
        override(AccessControlEnumerable, ERC721, HasSecondarySaleFees)
        returns (bool)
    {
        return super.supportsInterface(_interfaceId);
    }

    function name() public view override returns (string memory) {
        return name_;
    }

    function symbol() public view override returns (string memory) {
        return symbol_;
    }

    function _baseURI() internal view override returns (string memory) {
        if (bytes(customBaseURI).length > 0) {
            return customBaseURI;
        } else {
            return defaultBaseURI;
        }
    }

    function setCustomBaseURI(string memory _customBaseURI) public onlyMaintainer {
        customBaseURI = _customBaseURI;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "token must exist");
        bytes32 ipfsHash = ipfsHashes[_tokenId];
        if (ipfsHash != "") {
            return string(_addIpfsBaseUrlPrefix(_bytesToBase58(_addSha256FunctionCodePrefix(ipfsHashes[_tokenId]))));
        } else {
            if (bytes(customBaseURI).length == 0) {
                string memory utf8Address = bytesToString(abi.encodePacked(address(this)));
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

    function setIpfsHash(uint256[] memory _tokenIdList, bytes32[] memory _ipfsHashList) public onlyMaintainer {
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            _setIpfsHash(_tokenIdList[i], _ipfsHashList[i]);
        }
    }

    function _setRoyality(
        uint256 _tokenId,
        address payable[] memory _royaltyAddress,
        uint256[] memory _royalty
    ) internal {
        royaltyAddressMemory[_tokenId] = _royaltyAddress;
        royaltyMemory[_tokenId] = _royalty;
    }

    function setRoyality(
        uint256[] memory _tokenIdList,
        address payable[][] memory _royaltyAddressList,
        uint256[][] memory _royaltyList
    ) public onlyMaintainer {
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

    function mint(address _to, uint256 _tokenId) public onlyMaintainer {
        _mint(_to, _tokenId);
    }

    function mint(address[] memory _toList, uint256[] memory _tokenIdList) public onlyMaintainer {
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            _mint(_toList[i], _tokenIdList[i]);
        }
    }

    function mint(
        address _to,
        uint256 _tokenId,
        bytes32 _ipfsHash
    ) public onlyMaintainer {
        _mint(_to, _tokenId, _ipfsHash);
    }

    function mint(
        address[] memory _toList,
        uint256[] memory _tokenIdList,
        bytes32[] memory _ipfsHashList
    ) public onlyMaintainer {
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            _mint(_toList[i], _tokenIdList[i], _ipfsHashList[i]);
        }
    }

    function mint(
        address _to,
        uint256 _tokenId,
        address payable[] memory _royaltyAddressMemory,
        uint256[] memory _royaltyMemory
    ) public onlyMaintainer {
        _mint(_to, _tokenId, _royaltyAddressMemory, _royaltyMemory);
    }

    function mint(
        address[] memory _toList,
        uint256[] memory _tokenIdList,
        address payable[][] memory _royaltyAddressMemory,
        uint256[][] memory _royaltyMemory
    ) public onlyMaintainer {
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
    ) public onlyMaintainer {
        _mint(_to, _tokenId, _ipfsHash, _royaltyAddressMemory, _royaltyMemory);
    }

    function mint(
        address[] memory _toList,
        uint256[] memory _tokenIdList,
        bytes32[] memory _ipfsHashList,
        address payable[][] memory _royaltyAddressMemory,
        uint256[][] memory _royaltyMemory
    ) public onlyMaintainer {
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            _mint(_toList[i], _tokenIdList[i], _ipfsHashList[i], _royaltyAddressMemory[i], _royaltyMemory[i]);
        }
    }

    function _burn(uint256 _tokenId) internal virtual override {
        super._burn(_tokenId);
        if (ipfsHashes[_tokenId] != "") {
            delete ipfsHashes[_tokenId];
        }
    }
}
