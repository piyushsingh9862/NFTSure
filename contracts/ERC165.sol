// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './interfaces/IERC165.sol';

contract ERC165 is IERC165
{
    //hash table to keep track of contract fingerprint data of byte function conversions
    mapping(bytes4 => bool) private _supportedInterfaces;

    function supportsInterface(bytes4 interfaceId) public override view returns(bool)
    {
        return _supportedInterfaces[interfaceId];
    }

    // function balanceOf(address _owner) external override view returns(uint256)
    // {
    //     return 5;
    // }


    //function for byte calculation of interface 
    function calcFingerPrint() public pure  returns(bytes4)
    {
        // return bytes4(keccak256('supportsInterface(bytes4)')^keccak256('balanceOf(bytes4)'));
        //function supports interface value : 0x01ffc9a7

        return bytes4(keccak256('supportsInterface(bytes4)'));
    }

    function _registerInterface(bytes4 interfaceId) public
    {
        require(interfaceId!=0xffffffff,"ERC165: Invalid Interface");
        _supportedInterfaces[interfaceId]=true;
    }
    constructor()
    {
        // _registerInterface(0x01ffc9a7);
        _registerInterface(bytes4(keccak256('supportsInterface(bytes4)')));
    }
}