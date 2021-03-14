// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Chocomold is AccessControlEnumerable, Initializable, ERC721, ERC721Burnable {
    bytes32 public constant MAINTAINER_ROLE = keccak256("MAINTAINER_ROLE");
    string public constant defaultBaseUrl = "https://localhost:8080/";

    mapping(uint256 => string) private _tokenURIs;

    string private _name;
    string private _symbol;
    string private _customBaseTokenURI;

    modifier onlyMaintainer() {
        require(hasRole(MAINTAINER_ROLE, _msgSender()), "must have maintainer role");
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        string memory customBaseTokenURI_,
        address owner_
    ) ERC721("", "") {
        initialize(name_, symbol_, customBaseTokenURI_, owner_);
    }

    function initialize(
        string memory name_,
        string memory symbol_,
        string memory customBaseTokenURI_,
        address owner_
    ) public initializer {
        _name = name_;
        _symbol = symbol_;
        if (bytes(customBaseTokenURI_).length > 0) {
            _customBaseTokenURI = customBaseTokenURI_;
        }
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
        return bytes(_customBaseTokenURI).length > 0 ? _customBaseTokenURI : defaultBaseUrl;
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
}
