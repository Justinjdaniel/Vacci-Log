// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Vaccination {
    enum Gender {
        Male,
        Female,
        Other
    }

    struct Patient {
        uint256 id;
        string name;
        uint256 age;
        string location;
        Gender gender;
    }

    struct Vaccine {
        uint256 id;
        string vaccineFor;
        string manufacturer;
        uint256 batchId;
        string expireDate;
    }

    struct Vaccinator {
        uint256 id;
        uint256 licenseNumber;
        string name;
    }

    struct VaccinationDose {
        string date;
        uint256 vaccineId;
        uint256 vaccinatorId;
    }

    mapping(uint256 => Patient) public patients;
    mapping(uint256 => Vaccine) public vaccines;
    mapping(uint256 => Vaccinator) public vaccinators;
    mapping(uint256 => VaccinationDose[]) public patientVaccinations;

    event PatientAdded(uint256 indexed id);
    event VaccineAdded(uint256 indexed id);
    event VaccinatorAdded(uint256 indexed id);
    event VaccinationDoseAdded(
        uint256 indexed patientId,
        uint256 indexed vaccineId,
        uint256 indexed vaccinatorId
    );

    uint256 public patientsCount;
    uint256 public vaccinesCount;
    uint256 public vaccinatorsCount;
    uint256 public vaccinationDoseCount;

    function addPatient(
        uint256 _id,
        string memory _name,
        uint256 _age,
        string memory _location,
        Gender _gender
    ) private {
        patientsCount++;
        patients[_id] = Patient(_id, _name, _age, _location, _gender);
        emit PatientAdded(_id);
    }

    function addVaccine(
        uint256 _id,
        string memory _vaccineFor,
        string memory _manufacturer,
        uint256 _batchId,
        string memory _expireDate
    ) private {
        vaccinesCount++;
        vaccines[_id] = Vaccine(
            _id,
            _vaccineFor,
            _manufacturer,
            _batchId,
            _expireDate
        );
        emit VaccineAdded(_id);
    }

    function addVaccinator(
        uint256 _id,
        uint256 _licenseNumber,
        string memory _name
    ) private {
        vaccinatorsCount++;
        vaccinators[_id] = Vaccinator(_id, _licenseNumber, _name);
        emit VaccinatorAdded(_id);
    }

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

        vaccinationDoseCount++;
        patientVaccinations[_patientId].push(
            VaccinationDose(_date, _vaccineId, _vaccinatorId)
        );
        emit VaccinationDoseAdded(_patientId, _vaccineId, _vaccinatorId);
    }

    function getPatient(
        uint256 _id
    )
        public
        view
        returns (string memory, uint256, uint256, string memory, Gender)
    {
        Patient storage patient = patients[_id];
        return (
            patient.name,
            patient.age,
            patient.id,
            patient.location,
            patient.gender
        );
    }

    function getVaccine(
        uint256 _id
    )
        public
        view
        returns (uint256, string memory, string memory, uint256, string memory)
    {
        Vaccine storage vaccine = vaccines[_id];
        return (
            vaccine.id,
            vaccine.vaccineFor,
            vaccine.manufacturer,
            vaccine.batchId,
            vaccine.expireDate
        );
    }

    function getVaccinator(
        uint256 _id
    ) public view returns (uint256, uint256, string memory) {
        Vaccinator storage vaccinator = vaccinators[_id];
        return (vaccinator.id, vaccinator.licenseNumber, vaccinator.name);
    }

    function getPatientVaccinations(
        uint256 _patientId
    ) public view returns (VaccinationDose[] memory) {
        return patientVaccinations[_patientId];
    }

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

    function validatePatientData(
        uint256 _id,
        string memory _name,
        uint256 _age,
        string memory _location,
        Gender _gender
    ) private pure returns (bool) {
        if (
            _id == 0 ||
            bytes(_name).length == 0 ||
            _age == 0 ||
            bytes(_location).length == 0 ||
            uint256(_gender) > 2
        ) {
            return false;
        }
        return true;
    }

    function validateVaccineData(
        uint256 _id,
        string memory _vaccineFor,
        string memory _manufacturer,
        uint256 _batchId,
        string memory _expireDate
    ) public pure returns (bool) {
        if (
            _id == 0 ||
            bytes(_vaccineFor).length == 0 ||
            bytes(_manufacturer).length == 0 ||
            _batchId == 0 ||
            bytes(_expireDate).length == 0
        ) {
            return false;
        }
        return true;
    }

    function validateVaccinatorData(
        uint256 _id,
        uint256 _licenseNumber,
        string memory _name
    ) public pure returns (bool) {
        if (_id == 0 || _licenseNumber == 0 || bytes(_name).length == 0) {
            return false;
        }
        return true;
    }

    function validateVaccinationDoseData(
        uint256 _patientId,
        string memory _date,
        uint256 _vaccineId,
        uint256 _vaccinatorId
    ) public view returns (bool) {
        if (
            patients[_patientId].id == 0 ||
            vaccines[_vaccineId].id == 0 ||
            vaccinators[_vaccinatorId].id == 0 ||
            bytes(_date).length == 0
        ) {
            return false;
        }
        return true;
    }

    function addPatientWithValidation(
        uint256 _id,
        string memory _name,
        uint256 _age,
        string memory _location,
        Gender _gender
    ) public {
        require(
            validatePatientData(_id, _name, _age, _location, _gender),
            'Invalid patient data'
        );
        addPatient(_id, _name, _age, _location, _gender);
    }

    function addVaccineWithValidation(
        uint256 _id,
        string memory _vaccineFor,
        string memory _manufacturer,
        uint256 _batchId,
        string memory _expireDate
    ) public {
        require(
            validateVaccineData(
                _id,
                _vaccineFor,
                _manufacturer,
                _batchId,
                _expireDate
            ),
            'Invalid vaccine data'
        );
        addVaccine(_id, _vaccineFor, _manufacturer, _batchId, _expireDate);
    }

    function addVaccinatorWithValidation(
        uint256 _id,
        uint256 _licenseNumber,
        string memory _name
    ) public {
        require(
            validateVaccinatorData(_id, _licenseNumber, _name),
            'Invalid vaccinator data'
        );
        addVaccinator(_id, _licenseNumber, _name);
    }

    function addVaccinationDoseWithValidation(
        uint256 _patientId,
        string memory _date,
        uint256 _vaccineId,
        uint256 _vaccinatorId
    ) public {
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
    }
}

// This is a smart contract for vaccination. It includes functions to add patient data, vaccine data, vaccinator data, and multiple vaccine doses to patients. It also includes functions to get all data individually and combined. The contract checks if the vaccineId and vaccinatorId is already there before adding vaccination dose to patient. It validates all data before adding and adds events.

// The contract uses an enum for gender and includes mappings for patients, vaccines, vaccinators, and patientVaccinations. It also includes functions to validate patient data, vaccine data, vaccinator data, and vaccination dose data.

// The contract also includes functions to add patient data, vaccine data, vaccinator data, and vaccination doses with validation.
