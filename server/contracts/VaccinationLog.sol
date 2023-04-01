// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

/**
 * @title Vaccination Log
 * @dev A smart contract that tracks and logs the vaccination status of patients.
 * @notice This contract allows adding and retrieving data about patients, vaccines, vaccinators, and vaccination doses. It stores the data in mappings, validates the data, and emits events for each addition.
 * @author Justin J Daniel
 */
contract VaccinationLog {
    /**
     * @dev An enum to represent the gender of a patient
     */
    enum Gender {
        Male,
        Female,
        Other
    }

    /**
     * @dev A struct to store the data of a patient
     * @param id The ID of the patient
     * @param name The name of the patient
     * @param age The age of the patient
     * @param location The location of the patient
     * @param gender The gender of the patient
     */
    struct Patient {
        uint256 id;
        string name;
        uint256 age;
        string location;
        Gender gender;
    }

    /**
     * @dev A struct to store the data of a vaccine
     * @param id The ID of the vaccine
     * @param vaccineFor The disease that the vaccine prevents
     * @param manufacturer The name of the vaccine manufacturer
     * @param batchId The batch ID of the vaccine
     * @param expireDate The expiry date of the vaccine
     */
    struct Vaccine {
        uint256 id;
        string vaccineFor;
        string manufacturer;
        string batchId;
        string expireDate;
    }

    /**
     * @dev A struct to store the data of a vaccinator
     * @param id The ID of the vaccinator
     * @param licenseNumber The license number of the vaccinator
     * @param name The name of the vaccinator
     */
    struct Vaccinator {
        uint256 id;
        uint256 licenseNumber;
        string name;
    }

    /**
     * @dev A struct to store the data of a vaccination dose
     * @param date The date of the vaccination dose
     * @param vaccineId The ID of the vaccine used for the dose
     * @param vaccinatorId The ID of the vaccinator who administered the dose
     */
    struct VaccinationDose {
        string date;
        uint256 vaccineId;
        uint256 vaccinatorId;
    }

    /**
     * @dev A mapping from patient ID to Patient struct
     */
    mapping(uint256 => Patient) public patients;

    /**
     * @dev A mapping from vaccine ID to Vaccine struct
     */
    mapping(uint256 => Vaccine) public vaccines;

    /**
     * @dev A mapping from vaccinator ID to Vaccinator struct
     */
    mapping(uint256 => Vaccinator) public vaccinators;

    /**
     * @dev A mapping from patient ID to an array of VaccinationDose structs
     */
    mapping(uint256 => VaccinationDose[]) public patientVaccinations;

    /**
     * @dev An event that is emitted when a new patient is added to the contract
     * @param id The ID of the added patient
     */
    event PatientAdded(uint256 indexed id);

    /**
     * @dev An event that is emitted when a new vaccine is added to the contract
     * @param id The ID of the added vaccine
     */
    event VaccineAdded(uint256 indexed id);

    /**
     * @dev An event that is emitted when a new vaccinator is added to the contract
     * @param id The ID of the added vaccinator
     */
    event VaccinatorAdded(uint256 indexed id);

    /**
     * @dev An event that is emitted when a new vaccination dose is added to the contract
     * @param patientId The ID of the patient who received the dose
     * @param vaccineId The ID of the vaccine used for the dose
     * @param vaccinatorId The ID of the vaccinator who administered the dose
     */
    event VaccinationDoseAdded(
        uint256 indexed patientId,
        uint256 indexed vaccineId,
        uint256 indexed vaccinatorId
    );

    uint256 public patientsCount;
    uint256 public vaccinesCount;
    uint256 public vaccinatorsCount;
    uint256 public vaccinationDoseCount;

    /**
     * @dev Create a new patient with unique id
     * @param _id unique id of patient
     * @param _name name of patient
     * @param _age age of patient
     * @param _gender sex of patient
     * @param _location address of patient
     */
    function addPatient(
        uint256 _id,
        string memory _name,
        uint256 _age,
        string memory _location,
        Gender _gender
    ) private {
        patients[_id] = Patient(_id, _name, _age, _location, _gender);
        emit PatientAdded(_id);
    }

    /**
     * @dev Adds a new vaccine to the contract
     * @param _id The ID of the vaccine
     * @param _vaccineFor The disease that the vaccine prevents
     * @param _manufacturer The name of the vaccine manufacturer
     * @param _batchId The batch ID of the vaccine
     * @param _expireDate The expiry date of the vaccine
     */
    function addVaccine(
        uint256 _id,
        string memory _vaccineFor,
        string memory _manufacturer,
        string memory _batchId,
        string memory _expireDate
    ) private {
        vaccines[_id] = Vaccine(
            _id,
            _vaccineFor,
            _manufacturer,
            _batchId,
            _expireDate
        );
        emit VaccineAdded(_id);
    }

    /**
     * @dev Add a new vaccinator with unique id
     * @param _id unique id of vaccinator
     * @param _licenseNumber license number of vaccinator
     * @param _name name of vaccinator
     */
    function addVaccinator(
        uint256 _id,
        uint256 _licenseNumber,
        string memory _name
    ) private {
        vaccinators[_id] = Vaccinator(_id, _licenseNumber, _name);
        emit VaccinatorAdded(_id);
    }

    /**
     * @dev Add a new vaccination dose for a patient
     * @param _patientId id of patient
     * @param _date date of vaccination dose
     * @param _vaccineId id of vaccine used for dose
     * @param _vaccinatorId id of vaccinator who administered dose
     */
    function addVaccinationDose(
        uint256 _patientId,
        string memory _date,
        uint256 _vaccineId,
        uint256 _vaccinatorId
    ) private {
        require(vaccines[_vaccineId].id != 0, 'Invalid vaccine id');
        require(vaccinators[_vaccinatorId].id != 0, 'Invalid vaccinator id');

        for (uint256 i = 0; i < patientVaccinations[_patientId].length; i++) {
            require(
                patientVaccinations[_patientId][i].vaccineId != _vaccineId ||
                    patientVaccinations[_patientId][i].vaccinatorId !=
                    _vaccinatorId,
                'Vaccine already added for patient'
            );
        }

        patientVaccinations[_patientId].push(
            VaccinationDose(_date, _vaccineId, _vaccinatorId)
        );
        emit VaccinationDoseAdded(_patientId, _vaccineId, _vaccinatorId);
    }

    /**
     * @dev Returns an array of vaccination doses for a given patient ID
     * @param _patientId The ID of the patient
     * @return An array of VaccinationDose structs
     */
    function getPatientVaccinations(
        uint256 _patientId
    ) public view returns (VaccinationDose[] memory) {
        return patientVaccinations[_patientId];
    }

    /**
     * @dev Returns all the data stored in the contract
     * @return Four arrays of structs: Patient, Vaccine, Vaccinator and VaccinationDose
     */
    function getAllData()
        public
        view
        returns (
            Patient[] memory,
            Vaccine[] memory,
            Vaccinator[] memory,
            VaccinationDose[] memory
        )
    {
        Patient[] memory _patients = new Patient[](patientsCount);
        Vaccine[] memory _vaccines = new Vaccine[](vaccinesCount);
        Vaccinator[] memory _vaccinators = new Vaccinator[](vaccinatorsCount);
        VaccinationDose[] memory _vaccinationDoses = new VaccinationDose[](
            vaccinationDoseCount
        );

        for (uint256 i = 0; i < patientsCount; i++) {
            _patients[i] = patients[i + 1];
        }

        for (uint256 i = 0; i < vaccinesCount; i++) {
            _vaccines[i] = vaccines[i + 1];
        }

        for (uint256 i = 0; i < vaccinatorsCount; i++) {
            _vaccinators[i] = vaccinators[i + 1];
        }

        uint256 index = 0;
        for (uint256 i = 0; i < patientsCount; i++) {
            VaccinationDose[] storage vaccinationDoses = patientVaccinations[
                i + 1
            ];
            for (uint256 j = 0; j < vaccinationDoses.length; j++) {
                _vaccinationDoses[index] = vaccinationDoses[j];
                index++;
            }
        }

        return (_patients, _vaccines, _vaccinators, _vaccinationDoses);
    }

    /**
     * @dev Checks if the patient data is valid
     * @param _name The name of the patient
     * @param _age The age of the patient
     * @param _location The location of the patient
     * @param _gender The gender of the patient
     * @return A boolean value indicating if the data is valid or not
     */
    function validatePatientData(
        string memory _name,
        uint256 _age,
        string memory _location,
        Gender _gender
    ) private pure returns (bool) {
        if (
            bytes(_name).length == 0 ||
            _age == 0 ||
            bytes(_location).length == 0 ||
            uint256(_gender) > 2
        ) {
            return false;
        }
        return true;
    }

    /**
     * @dev Checks if the vaccine data is valid
     * @param _vaccineFor The disease that the vaccine prevents
     * @param _manufacturer The name of the vaccine manufacturer
     * @param _batchId The batch ID of the vaccine
     * @param _expireDate The expiry date of the vaccine
     * @return A boolean value indicating if the data is valid or not
     */
    function validateVaccineData(
        string memory _vaccineFor,
        string memory _manufacturer,
        string memory _batchId,
        string memory _expireDate
    ) private pure returns (bool) {
        if (
            bytes(_vaccineFor).length == 0 ||
            bytes(_manufacturer).length == 0 ||
            bytes(_batchId).length == 0 ||
            bytes(_expireDate).length == 0
        ) {
            return false;
        }
        return true;
    }

    /**
     * @dev Checks if the vaccinator data is valid
     * @param _licenseNumber The license number of the vaccinator
     * @param _name The name of the vaccinator
     * @return A boolean value indicating if the data is valid or not
     */
    function validateVaccinatorData(
        uint256 _licenseNumber,
        string memory _name
    ) private pure returns (bool) {
        if (_licenseNumber == 0 || bytes(_name).length == 0) {
            return false;
        }
        return true;
    }

    /**
     * @dev Checks if the vaccination dose data is valid
     * @param _patientId The ID of the patient who received the dose
     * @param _date The date of the vaccination dose
     * @param _vaccineId The ID of the vaccine used for the dose
     * @param _vaccinatorId The ID of the vaccinator who administered the dose
     * @return A boolean value indicating if the data is valid or not
     */
    function validateVaccinationDoseData(
        uint256 _patientId,
        string memory _date,
        uint256 _vaccineId,
        uint256 _vaccinatorId
    ) private view returns (bool) {
        if (
            patients[_patientId].id == 0 ||
            bytes(_date).length == 0 ||
            vaccines[_vaccineId].id == 0 ||
            vaccinators[_vaccinatorId].id == 0
        ) {
            return false;
        }
        return true;
    }

    /**
     * @dev Adds a new patient to the contract with validation
     * @param _name The name of the patient
     * @param _age The age of the patient
     * @param _location The location of the patient
     * @param _gender The gender of the patient
     * @return The ID of the added patient
     */
    function addPatientWithValidation(
        string memory _name,
        uint256 _age,
        string memory _location,
        Gender _gender
    ) public returns (uint256) {
        patientsCount++;
        require(
            validatePatientData(_name, _age, _location, _gender),
            'Invalid patient data'
        );
        addPatient(patientsCount, _name, _age, _location, _gender);
        return patientsCount;
    }

    /**
     * @dev Adds a new vaccine to the contract with validation
     * @param _vaccineFor The disease that the vaccine prevents
     * @param _manufacturer The name of the vaccine manufacturer
     * @param _batchId The batch ID of the vaccine
     * @param _expireDate The expiry date of the vaccine
     * @return The ID of the added vaccine
     */
    function addVaccineWithValidation(
        string memory _vaccineFor,
        string memory _manufacturer,
        string memory _batchId,
        string memory _expireDate
    ) public returns (uint256) {
        vaccinesCount++;
        require(
            validateVaccineData(
                _vaccineFor,
                _manufacturer,
                _batchId,
                _expireDate
            ),
            'Invalid vaccine data'
        );
        addVaccine(
            vaccinesCount,
            _vaccineFor,
            _manufacturer,
            _batchId,
            _expireDate
        );
        return vaccinesCount;
    }

    /**
     * @dev Adds a new vaccinator to the contract with validation
     * @param _licenseNumber The license number of the vaccinator
     * @param _name The name of the vaccinator
     * @return The ID of the added vaccinator
     */
    function addVaccinatorWithValidation(
        uint256 _licenseNumber,
        string memory _name
    ) public returns (uint256) {
        vaccinatorsCount++;
        require(
            validateVaccinatorData(_licenseNumber, _name),
            'Invalid vaccinator data'
        );
        addVaccinator(vaccinatorsCount, _licenseNumber, _name);
        return vaccinatorsCount;
    }

    /**
     * @dev Adds a new vaccination dose to the contract with validation
     * @param _patientId The ID of the patient who received the dose
     * @param _date The date of the vaccination dose
     * @param _vaccineId The ID of the vaccine used for the dose
     * @param _vaccinatorId The ID of the vaccinator who administered the dose
     * @return The number of vaccination doses for the patient
     */
    function addVaccinationDoseWithValidation(
        uint256 _patientId,
        string memory _date,
        uint256 _vaccineId,
        uint256 _vaccinatorId
    ) public returns (uint256) {
        vaccinationDoseCount++;
        require(
            validateVaccinationDoseData(
                _patientId,
                _date,
                _vaccineId,
                _vaccinatorId
            ),
            'Invalid vaccination dose data'
        );
        addVaccinationDose(_patientId, _date, _vaccineId, _vaccinatorId);
        return patientVaccinations[_patientId].length;
    }
}
