// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

contract Vaccine {
    //enum for gender
    enum Sex {male, female, other}

    // struct for saving the data of patient
    struct patientData {
        uint256 uid;
        string name;
        uint256 age;
        Sex gender;
        string location;
    }

    //mapping to retrieve patient data stored in the blockchian
    mapping(uint256 => mapping(uint256 => patientData)) private pData;
    // Iterable variable declaration for patient data count
    mapping(uint256 => uint256) patientCount;

    //function to set patient data
    function setPatient(
        uint256 _uid,
        string memory _name,
        uint256 _age,
        Sex _gender,
        string memory _location
    ) public {
        patientCount[_uid] += 1;
        pData[_uid][patientCount[_uid]] = patientData(
            _uid,
            _name,
            _age,
            _gender,
            _location
        );
    }

    // function to retrieve data of patient from blockchain
    function getPatient(uint256 _uid, uint256 _patientCount)
        public
        view
        returns (
            uint256,
            string memory,
            uint256,
            Sex,
            string memory
        )
    {
        return (
            pData[_uid][_patientCount].uid,
            pData[_uid][_patientCount].name,
            pData[_uid][_patientCount].age,
            pData[_uid][_patientCount].gender,
            pData[_uid][_patientCount].location
        );
    }

    //mapping to retrieve vaccine data stored in the blockchian
    mapping(uint256 => mapping(uint256 => string)) private vaccineData;
    // Iterable variable declaration for vaccine data count
    mapping(uint256 => uint256) vaccineCount;

    //function to set vaccine data
    function setVaccineData(uint256 _uid, string memory _vaccineData) public {
        vaccineCount[_uid] += 1;
        vaccineData[_uid][vaccineCount[_uid]] = _vaccineData;
    }

    // function to retrieve data of vaccine from blockchain
    function getData(uint256 _uid, uint256 _vaccineCount)
        public
        view
        returns (string memory)
    {
        return vaccineData[_uid][_vaccineCount];
    }
}
