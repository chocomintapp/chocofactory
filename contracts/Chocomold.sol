// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Chocomold is AccessControlEnumerable, Initializable, ERC721, ERC721Burnable, ERC721URIStorage {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    Counters.Counter private _tokenIdTracker;

    string private _name;
    string private _symbol;
    string private _baseTokenURI;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseTokenURI,
        address owner
    ) ERC721("", "") {
        initialize(name_, symbol_, baseTokenURI, owner);
    }

    function initialize(
        string memory name_,
        string memory symbol_,
        string memory baseTokenURI,
        address owner
    ) public initializer {
        _name = name_;
        _symbol = symbol_;
        _baseTokenURI = baseTokenURI;
        _setupRole(DEFAULT_ADMIN_ROLE, owner);
        _setupRole(MINTER_ROLE, owner);
    }

    function _mint(address to) internal returns (uint256) {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
        uint256 tokenId = _tokenIdTracker.current();
        _mint(to, _tokenIdTracker.current());
        _tokenIdTracker.increment();
        return tokenId;
    }

    function mint(address to) public {
        _mint(to);
    }

    function mint(address to, string memory _tokenURI) public {
        uint256 tokenId = _mint(to);
        _setTokenURI(tokenId, _tokenURI);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
        _setTokenURI(tokenId, _tokenURI);
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerable, ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
        ERC721URIStorage._burn(tokenId);
    }
}
