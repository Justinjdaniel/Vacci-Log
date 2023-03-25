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
        string vaccinatedFor; // Type of disease vaccinated for
        string vaccineName; // vaccine name
        string vaccineManufacturer; // vaccine manufacturer
        string vaccineBatchId; // vaccine batch id
        string vaccineBottleNumber; // serial number of vaccine bottle
        string vaccinatedDate; // vaccination date
        string vaccinatorId; // vaccinator id
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
     * @param vaccinatedFor Type of disease vaccinated for
     * @param vaccineName vaccine name
     * @param vaccineManufacturer  vaccine manufacturer
     * @param vaccineBatchId vaccine batch id
     * @param vaccineBottleNumber vaccine bottle number
     * @param vaccinatedDate vaccination date
     * @param vaccinatorId vaccinator id
     */
    function setVaccineData(
        uint256 patientUID,
        string memory vaccinatedFor,
        string memory vaccineName,
        string memory vaccineManufacturer,
        string memory vaccineBatchId,
        string memory vaccineBottleNumber,
        string memory vaccinatedDate,
        string memory vaccinatorId
    ) public {
        _vaccineCount[patientUID] += 1;
        _patientId[patientUID][_vaccineCount[patientUID]] = Vaccine(
            patientUID,
            vaccinatedFor,
            vaccineName,
            vaccineManufacturer,
            vaccineBatchId,
            vaccineBottleNumber,
            vaccinatedDate,
            vaccinatorId
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
     * @return vaccinatedFor vaccine for which type of diease
     * @return vaccineName vaccine name
     * @return vaccineManufacturer  vaccine manufacturer
     * @return vaccineBatchId vaccine batch id
     * @return vaccineBottleNumber vaccine bottle number
     * @return vaccinatedDate vaccination date
     * @return vaccinatorId vaccination date
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
            string memory vaccinatedFor,
            string memory vaccineName,
            string memory vaccineManufacturer,
            string memory vaccineBatchId,
            string memory vaccineBottleNumber,
            string memory vaccinatedDate,
            string memory vaccinatorId
        )
    {
        patientUID = _patientId[patientId][vaccineCount].patientUID;
        patientName = PatientUID[patientId].name;
        patientAge = PatientUID[patientId].age;
        patientGender = PatientUID[patientId].gender;
        patientLocation = PatientUID[patientId].location;
        vaccinatedFor = _patientId[patientId][vaccineCount].vaccinatedFor;
        vaccineName = _patientId[patientId][vaccineCount].vaccineName;
        vaccineManufacturer = _patientId[patientId][vaccineCount]
            .vaccineManufacturer;
        vaccineBatchId = _patientId[patientId][vaccineCount].vaccineBatchId;
        vaccineBottleNumber = _patientId[patientId][vaccineCount]
            .vaccineBottleNumber;
        vaccinatedDate = _patientId[patientId][vaccineCount].vaccinatedDate;
        vaccinatorId = _patientId[patientId][vaccineCount].vaccinatorId;
    }
}
