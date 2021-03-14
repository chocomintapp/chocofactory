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

    string public name_;
    string public symbol_;
    string public customBaseTokenURI;

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

    constructor(
        string memory _name,
        string memory _symbol,
        address _owner
    ) ERC721("", "") {
        initialize(_name, _symbol, _owner);
    }

    function validateIsMaintainer(address _maintainer) internal view {
        require(hasRole(MAINTAINER_ROLE, _maintainer), "must have maintainer role");
    }

    modifier onlyMaintainer() {
        validateIsMaintainer(msg.sender);
        _;
    }

    function name() public view override returns (string memory) {
        return name_;
    }

    function symbol() public view override returns (string memory) {
        return symbol_;
    }

    function supportsInterface(bytes4 _interfaceId)
        public
        view
        override(AccessControlEnumerable, ERC721)
        returns (bool)
    {
        return super.supportsInterface(_interfaceId);
    }

    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal {
        _tokenURIs[_tokenId] = _tokenURI;
    }

    function setCustomBaseTokenURI(string memory _customBaseTokenURI) public onlyMaintainer {
        customBaseTokenURI = _customBaseTokenURI;
    }

    function setTokenURI(uint256 _tokenId, string memory _tokenURI) public onlyMaintainer {
        require(_exists(_tokenId), "URI set of nonexistent token");
        _setTokenURI(_tokenId, _tokenURI);
    }

    function bulkSetTokenURI(uint256[] memory _tokenIdList, string[] memory _tokenURIList) public onlyMaintainer {
        require(_tokenIdList.length == _tokenURIList.length, "input must have same length");
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            _setTokenURI(_tokenIdList[i], _tokenURIList[i]);
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return
            bytes(customBaseTokenURI).length > 0
                ? customBaseTokenURI
                : string(abi.encodePacked(DEFAULT_BASE_URL, _bytesToString(abi.encodePacked(address(this))), SLASH));
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        string memory _tokenURI = _tokenURIs[_tokenId];
        if (bytes(_tokenURI).length > 0) {
            return _tokenURI;
        }
        return super.tokenURI(_tokenId);
    }

    function _mint(
        address _to,
        uint256 _tokenId,
        string memory _tokenURI
    ) internal {
        _mint(_to, _tokenId);
        if (bytes(_tokenURI).length > 0) {
            _setTokenURI(_tokenId, _tokenURI);
        }
    }

    function mint(
        address _to,
        uint256 _tokenId,
        string memory _tokenURI
    ) public {
        _mint(_to, _tokenId, _tokenURI);
    }

    function bulkMint(
        address[] memory _toList,
        uint256[] memory _tokenIdList,
        string[] memory _tokenURIList
    ) public onlyMaintainer {
        require(
            _toList.length == _tokenIdList.length && _toList.length == _tokenURIList.length,
            "input must have same length"
        );
        for (uint256 i = 0; i < _toList.length; i++) {
            _mint(_toList[i], _tokenIdList[i], _tokenURIList[i]);
        }
    }

    function burn(uint256 _tokenId) public override {
        super._burn(_tokenId);
        if (bytes(_tokenURIs[_tokenId]).length > 0) {
            delete _tokenURIs[_tokenId];
        }
    }

    function _bytesToString(bytes memory _input) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory output = new bytes(2 + _input.length * 2);
        output[0] = "0";
        output[1] = "x";
        for (uint256 i = 0; i < _input.length; i++) {
            output[2 + i * 2] = alphabet[uint256(uint8(_input[i] >> 4))];
            output[3 + i * 2] = alphabet[uint256(uint8(_input[i] & 0x0f))];
        }
        return string(output);
    }
}
