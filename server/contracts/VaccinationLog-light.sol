// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title VaccinationLogLight
 * @dev Store & retrieve data of vaccination and related participants.
 */
contract VaccinationLogLight {
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
        uint256 id; // vaccine unique id
        string vaccineFor; // Type of disease vaccinated for
        string vaccineName; // vaccine name
        string vaccineManufacturer; // vaccine manufacturer
    }

    struct VaccineDose {
        uint256 patientUID; // patient unique id
        uint256 vaccineId; // vaccine unique id
        string vaccineBatchId; // vaccine batch id
        string vaccineBottleNumber; // serial number of vaccine bottle
        string vaccinatedDate; // vaccination date
        string vaccinatorId; // vaccinator id
    }

    // Linking Patient UID to the patient details
    mapping(uint256 => Patient) public PatientUID;

    // Linking Vaccine UID to the vaccine details
    mapping(uint256 => Vaccine) public VaccineUID;

    // Mapping to patient UID to vaccination data
    mapping(uint256 => mapping(uint256 => VaccineDose))
        public PatientDoseDetails;

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
        require(
            id > 0 &&
                bytes(name).length > 0 &&
                age > 0 &&
                bytes(location).length > 0,
            'All fields are mandatory'
        );
        PatientUID[id] = Patient(id, name, age, gender, location);
    }

    /**
     * @dev Create a new vaccine with unique id
     * @param id unique id of patient
     * @param vaccineFor Type of disease vaccinated for
     * @param vaccineName Name of the vaccine used for vaccination
     * @param vaccineManufacturer Name of the manufacturer who produced the vaccine
     */
    function createVaccine(
        uint256 id,
        string memory vaccineFor,
        string memory vaccineName,
        string memory vaccineManufacturer
    ) public {
        require(
            id > 0 &&
                bytes(vaccineFor).length > 0 &&
                bytes(vaccineName).length > 0 &&
                bytes(vaccineManufacturer).length > 0,
            'All fields are mandatory'
        );
        VaccineUID[id] = Vaccine(
            id,
            vaccineFor,
            vaccineName,
            vaccineManufacturer
        );
    }

    /**
     * @dev Create vaccination details of patient
     * @param patientUID unique id of patient
     * @param vaccineId Vaccine id
     * @param vaccineBatchId Batch ID of the vaccine used for vaccination
     * @param vaccineBottleNumber Serial number of the bottle used for vaccination
     * @param vaccinatedDate Date when the vaccination was done
     * @param vaccinatorId ID of the person who administered the vaccination
     */
    function createVaccineDose(
        uint256 patientUID,
        uint256 vaccineId,
        string memory vaccineBatchId,
        string memory vaccineBottleNumber,
        string memory vaccinatedDate,
        string memory vaccinatorId
    ) public {
        require(
            patientUID > 0 &&
                vaccineId > 0 &&
                bytes(vaccineBatchId).length > 0 &&
                bytes(vaccineBottleNumber).length > 0 &&
                bytes(vaccinatedDate).length > 0 &&
                bytes(vaccinatorId).length > 0,
            'All fields are mandatory'
        );

        _vaccineCount[patientUID]++;
        PatientDoseDetails[patientUID][_vaccineCount[patientUID]] = VaccineDose(
            patientUID,
            vaccineId,
            vaccineBatchId,
            vaccineBottleNumber,
            vaccinatedDate,
            vaccinatorId
        );
    }
}
