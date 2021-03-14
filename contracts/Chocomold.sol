// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Chocomold is AccessControlEnumerable, Initializable, ERC721, ERC721Burnable {
    bytes32 constant MAINTAINER_ROLE = keccak256("MAINTAINER_ROLE");
    string constant DEFAULT_BASE_URL = "https://localhost:8080/";
    string constant SLASH = "/";

    mapping(uint256 => string) internal _tokenURIs;

    string internal _name;
    string internal _symbol;
    string internal _customBaseTokenURI;

    modifier onlyMaintainer() {
        require(hasRole(MAINTAINER_ROLE, _msgSender()), "must have maintainer role");
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        address owner_
    ) ERC721("", "") {
        initialize(name_, symbol_, owner_);
    }

    function initialize(
        string memory name_,
        string memory symbol_,
        address owner_
    ) public initializer {
        _name = name_;
        _symbol = symbol_;
        _setupRole(DEFAULT_ADMIN_ROLE, owner_);
        _setupRole(MAINTAINER_ROLE, owner_);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControlEnumerable, ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory _tokenURI = _tokenURIs[tokenId];
        if (bytes(_tokenURI).length > 0) {
            return _tokenURI;
        }
        return super.tokenURI(tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return
            bytes(_customBaseTokenURI).length > 0
                ? _customBaseTokenURI
                : string(abi.encodePacked(DEFAULT_BASE_URL, _bytesToString(abi.encodePacked(address(this))), SLASH));
    }

    function setCustomBaseTokenURI(string memory customBaseTokenURI) public onlyMaintainer {
        _customBaseTokenURI = customBaseTokenURI;
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public onlyMaintainer {
        _setTokenURI(tokenId, _tokenURI);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(_exists(tokenId), "URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function mint(address to, uint256 tokenId) public onlyMaintainer {
        _mint(to, tokenId);
    }

    function mint(
        address to,
        uint256 tokenId,
        string memory _tokenURI
    ) public onlyMaintainer {
        _mint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    function burn(uint256 tokenId) public override {
        super._burn(tokenId);
        if (bytes(_tokenURIs[tokenId]).length > 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function _bytesToString(bytes memory input) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory output = new bytes(2 + input.length * 2);
        output[0] = "0";
        output[1] = "x";
        for (uint256 i = 0; i < input.length; i++) {
            output[2 + i * 2] = alphabet[uint256(uint8(input[i] >> 4))];
            output[3 + i * 2] = alphabet[uint256(uint8(input[i] & 0x0f))];
        }
        return string(output);
    }
}
