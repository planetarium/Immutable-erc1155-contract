// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TEST1155 is ERC1155, Ownable {
    using Strings for uint256;

    string public name;
    string public symbol;
    bool public transferEnabled;
    address public MINTER;
    string private baseURI;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    )
    ERC1155(_baseURI)
    Ownable()
    {
        name = _name;
        symbol = _symbol;
        transferEnabled = false;
        MINTER = owner();
        baseURI = _baseURI; // baseURI 초기화
    }

    modifier onlyMinter() {
        require(msg.sender == owner() || msg.sender == MINTER, "Not authorized");
        _;
    }

    function setMinter(address _minter) external onlyOwner {
        MINTER = _minter;
    }

    // Change the base URI
    function setURI(string memory newURI) public onlyOwner {
        baseURI = newURI; // baseURI 업데이트
        _setURI(newURI);
    }

    // uri function override
    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
    }

    function setTransferEnabled(bool _enabled) external onlyOwner {
        transferEnabled = _enabled;
    }

    function mint(address account, uint256 tokenId, uint256 amount, bytes memory data) public onlyMinter {
        _mint(account, tokenId, amount, data);
    }

    function burn(address account, uint256 id, uint256 amount) public onlyMinter {
        _burn(account, id, amount);
    }

    function burnBatch(address account, uint256[] memory ids, uint256[] memory amounts) public onlyMinter {
        _burnBatch(account, ids, amounts);
    }

    // Override  _beforeTokenTransfer to customize the transfer behavior
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override {
        if (!transferEnabled) {
            // allow mint and burn
            require(from == address(0) || to == address(0), "Token cannot be transferred");
        }
    }
}
