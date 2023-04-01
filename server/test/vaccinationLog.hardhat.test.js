const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('VaccinationLog', () => {
  let vaccinationLog;

  before(async () => {
    const VaccinationLog = await ethers.getContractFactory('VaccinationLog');
    vaccinationLog = await VaccinationLog.deploy();
    await vaccinationLog.deployed();
  });

  it('should add a new patient', async () => {
    const id = 1;
    const name = 'John Doe';
    const age = 25;
    const location = '123 Main St';
    const gender = 0; // 0 for Male, 1 for Female, 2 for Other

    await vaccinationLog.addPatientWithValidation(name, age, location, gender);

    const patient = await vaccinationLog.patients(id);

    expect(Number(patient.id)).to.equal(id);
    expect(patient.name).to.equal(name);
    expect(Number(patient.age)).to.equal(age);
    expect(patient.location).to.equal(location);
    expect(Number(patient.gender)).to.equal(gender);
  });

  it('should add a new vaccine', async () => {
    const id = 1;
    const vaccineFor = 'COVID-19';
    const manufacturer = 'Pfizer';
    const batchId = 'AB12345';
    const expireDate = '2023-04-01';

    await vaccinationLog.addVaccineWithValidation(
      vaccineFor,
      manufacturer,
      batchId,
      expireDate
    );

    const vaccine = await vaccinationLog.vaccines(id);

    expect(Number(vaccine.id)).to.equal(id);
    expect(vaccine.vaccineFor).to.equal(vaccineFor);
    expect(vaccine.manufacturer).to.equal(manufacturer);
    expect(vaccine.batchId).to.equal(batchId);
    expect(vaccine.expireDate).to.equal(expireDate);
  });

  it('should add a new vaccinator', async () => {
    const id = 1;
    const licenseNumber = 123456;
    const name = 'Dr. Jane Doe';

    await vaccinationLog.addVaccinatorWithValidation(licenseNumber, name);

    const vaccinator = await vaccinationLog.vaccinators(id);

    expect(Number(vaccinator.id)).to.equal(id);
    expect(Number(vaccinator.licenseNumber)).to.equal(licenseNumber);
    expect(vaccinator.name).to.equal(name);
  });

  it('should add a new vaccination dose', async () => {
    const patientId = 1;
    const vaccineId = 1;
    const vaccinatorId = 1;
    const date = '2023-04-01';

    await vaccinationLog.addVaccinationDoseWithValidation(
      patientId,
      date,
      vaccineId,
      vaccinatorId
    );

    const vaccinationDose = await vaccinationLog.patientVaccinations(
      patientId,
      0
    );

    expect(vaccinationDose.date).to.equal(date);
    expect(Number(vaccinationDose.vaccineId)).to.equal(vaccineId);
    expect(Number(vaccinationDose.vaccinatorId)).to.equal(vaccinatorId);
  });
});
