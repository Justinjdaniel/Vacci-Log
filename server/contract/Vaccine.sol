// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Vaccine
 * @dev Store & retrieve value in a vaccine and patients details
 */
contract VaccinationLog {
    enum Sex {
        male,
        female,
        other
    }

    struct Patient {
        uint256 id; // unique id of patient
        string name; // name of patient
        uint256 age; // age of patient
        Sex gender; // gender of patient
        string location; // address of patient
    }

    struct Vaccine {
        uint256 patientUID; // patient unique id
        string vaccineName; // vaccine name
        string vaccineManufacturer; // vaccine manufacturer
        string vaccineBatchId; // vaccine batch id
        string vaccineBottleNumber; // serial number of vaccine bottle
        string vaccinationDate; // vaccination date
    }

    // Linking Patient UID to the patient details
    mapping(uint256 => Patient) public PatientUID;

    // Mapping to patient UID to vaccine data
    mapping(uint256 => mapping(uint256 => Vaccine)) private _patientId;

    // Iterable variable declaration for vaccine data count
    mapping(uint256 => uint256) private _vaccineCount;

    /**
     * @dev Create a new patient with unique id
     * @param id unique id of patient
     * @param name name of patient
     * @param age age of patient
     * @param gender sex of patient
     * @param location address of patient
     */
    function createPatient(
        uint256 id,
        string memory name,
        uint256 age,
        Sex gender,
        string memory location
    ) public {
        PatientUID[id] = Patient(id, name, age, gender, location);
    }

    /**
     * @dev Create vaccination details of patient
     * @param patientUID unique id of patient
     * @param vaccineName vaccine name
     * @param vaccineManufacturer  vaccine manufacturer
     * @param vaccineBatchId vaccine batch id
     * @param vaccineBottleNumber vaccine bottle number
     * @param vaccinationDate vaccination date
     */
    function setVaccineData(
        uint256 patientUID,
        string memory vaccineName,
        string memory vaccineManufacturer,
        string memory vaccineBatchId,
        string memory vaccineBottleNumber,
        string memory vaccinationDate
    ) public {
        _vaccineCount[patientUID] += 1;
        _patientId[patientUID][_vaccineCount[patientUID]] = Vaccine(
            patientUID,
            vaccineName,
            vaccineManufacturer,
            vaccineBatchId,
            vaccineBottleNumber,
            vaccinationDate
        );
    }

    /**
     * @dev Get vaccination details of patient
     * @param patientId unique id of patient
     * @param vaccineCount vaccination count
     * @return patientUID unique id of patient
     * @return patientName patient name,
     * @return patientAge patient age,
     * @return patientGender patient gender,
     * @return patientLocation patient location,
     * @return vaccineManufacturer  vaccine manufacturer
     * @return vaccineBatchId vaccine batch id
     * @return vaccineName vaccine name
     * @return vaccineBottleNumber vaccine bottle number
     * @return vaccinationDate vaccination date
     */
    function getVaccineDetails(
        uint256 patientId,
        uint256 vaccineCount
    )
        public
        view
        returns (
            uint256 patientUID,
            string memory patientName,
            uint256 patientAge,
            Sex patientGender,
            string memory patientLocation,
            string memory vaccineManufacturer,
            string memory vaccineBatchId,
            string memory vaccineName,
            string memory vaccineBottleNumber,
            string memory vaccinationDate
        )
    {
        patientUID = _patientId[patientId][vaccineCount].patientUID;
        patientName = PatientUID[patientId].name;
        patientAge = PatientUID[patientId].age;
        patientGender = PatientUID[patientId].gender;
        patientLocation = PatientUID[patientId].location;
        vaccineManufacturer = _patientId[patientId][vaccineCount]
            .vaccineManufacturer;
        vaccineBatchId = _patientId[patientId][vaccineCount].vaccineBatchId;
        vaccineName = _patientId[patientId][vaccineCount].vaccineName;
        vaccineBottleNumber = _patientId[patientId][vaccineCount]
            .vaccineBottleNumber;
        vaccinationDate = _patientId[patientId][vaccineCount].vaccinationDate;
    }
}
