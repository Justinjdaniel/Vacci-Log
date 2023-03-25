import { expect } from 'chai';
import { contractDeployer } from '../src/services/ethers.service.js';
// const { ethers } = require('hardhat'); //use this if testing using remix Ide

describe('VaccinationLog', async function () {
  it('Should create a new patient', async function () {
    // use this if testing using remix Ide
    /* // Create a contract factory
    const VaccinationLog = await ethers.getContractFactory('VaccinationLog');
    const vaccinationLog = await VaccinationLog.deploy();
    */
    const vaccinationLog = await contractDeployer();

    await vaccinationLog.createPatient(1, 'John Doe', 30, 0, '123 Main St.');

    const patient = await vaccinationLog.PatientUID(1);

    expect(patient.id).to.equal(1);
    expect(patient.name).to.equal('John Doe');
    expect(patient.age).to.equal(30);
    expect(patient.gender).to.equal(0);
    expect(patient.location).to.equal('123 Main St.');
  });

  it('Should create a new vaccine', async function () {
    // use this if testing using remix Ide
    /* // Create a contract factory
    const VaccinationLog = await ethers.getContractFactory('VaccinationLog');
    const vaccinationLog = await VaccinationLog.deploy();
    */
    const vaccinationLog = await contractDeployer();

    await vaccinationLog.createVaccine(
      1,
      'COVID-19',
      'Pfizer-BioNTech',
      'Comirnaty'
    );

    const vaccine = await vaccinationLog.VaccineUID(1);

    expect(vaccine.id).to.equal(1);
    expect(vaccine.vaccineFor).to.equal('COVID-19');
    expect(vaccine.vaccineName).to.equal('Pfizer-BioNTech');
    expect(vaccine.vaccineManufacturer).to.equal('Comirnaty');
  });

  it('Should add a new vaccination record', async function () {
    // use this if testing using remix Ide
    /* // Create a contract factory
    const VaccinationLog = await ethers.getContractFactory('VaccinationLog');
    const vaccinationLog = await VaccinationLog.deploy();
    */
    const vaccinationLog = await contractDeployer();

    await vaccinationLog.createVaccineDose(
      1,
      1,
      'ABC123',
      'XYZ456',
      '2022-03-25',
      'Dr. Jane Smith'
    );

    const patientDoseDetails = await vaccinationLog.PatientDoseDetails(1, 1);

    expect(patientDoseDetails.patientUID).to.equal(1);
    expect(patientDoseDetails.vaccineId).to.equal(1);
    expect(patientDoseDetails.vaccineBatchId).to.equal('ABC123');
    expect(patientDoseDetails.vaccineBottleNumber).to.equal('XYZ456');
    expect(patientDoseDetails.vaccinatedDate).to.equal('2022-03-25');
    expect(patientDoseDetails.vaccinatorId).to.equal('Dr. Jane Smith');
  });
});
