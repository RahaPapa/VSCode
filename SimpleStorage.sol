// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8; // 0.8.12 comment everywhere on your code

contract SimpleStorage {
    //have to name your contract

    //this gets initialized to zero!
    uint256 favoriteNumber;

    mapping(string => uint256) public nameToFavoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    //uint 256[] public  favoriteNumberList;
    People[] public people;

    // 0: 2, Gert, 1: 3, Jon

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    //view, pure
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // calldata, memory and storage
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
// 0xd9145CCE52D386f254917e481eB44e9943F39138
