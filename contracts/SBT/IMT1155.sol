// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { OperatorAllowlistEnforced } from '@imtbl/contracts/contracts/allowlist/OperatorAllowlistEnforced.sol';

contract IMT1155 is ERC1155, Ownable, OperatorAllowlistEnforced {
    string public name;
    string public symbol;
    bool public transferEnabled;
    address public MINTER;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        address operatorAllowlist
    )
    ERC1155(_uri)
    Ownable()
    {
        name = _name;
        symbol = _symbol;
        transferEnabled = false;
        MINTER = owner();

        _setOperatorAllowlistRegistry(operatorAllowlist);
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
        _setURI(newURI);
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
            require(from == address(0) || to == address(0), "Token cannot be transferred");
        }
    }

    // Overrides _safeTransferFrom function to include `validateTransfer` modifier for OAL
    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes memory data
    ) internal override validateTransfer(from, to) {
        super._safeTransferFrom(from, to, id, value, data);
    }

    // Overrides _safeBatchTransferFrom function to include `validateTransfer` modifier for OAL
    function _safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) internal override validateTransfer(from, to) {
        super._safeBatchTransferFrom(from, to, ids, values, data);
    }

    // Overrides setApprovalForAll function to include `validateApproval` modifier for OAL
    function setApprovalForAll(
        address operator,
        bool approved
    ) public override(ERC1155) validateApproval(operator) {
        super.setApprovalForAll(operator, approved);
    }
}
