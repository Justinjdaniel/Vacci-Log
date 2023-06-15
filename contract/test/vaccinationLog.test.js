const VaccinationLog = artifacts.require('VaccinationLog');

contract('VaccinationLog', (accounts) => {
  let vaccinationLog;

  before(async () => {
    vaccinationLog = await VaccinationLog.deployed();
  });

  it('should add a new patient', async () => {
    const id = 1;
    const name = 'John Doe';
    const age = 25;
    const location = '123 Main St';
    const gender = 0; // 0 for Male, 1 for Female, 2 for Other

    await vaccinationLog.addPatientWithValidation(name, age, location, gender);

    const patient = await vaccinationLog.patients(id);

    assert.equal(patient.id, id, 'ID should be equal');
    assert.equal(patient.name, name, 'Name should be equal');
    assert.equal(patient.age, age, 'Age should be equal');
    assert.equal(patient.location, location, 'Location should be equal');
    assert.equal(patient.gender, gender, 'Gender should be equal');
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

    assert.equal(vaccine.id, id, 'ID should be equal');
    assert.equal(vaccine.vaccineFor, vaccineFor, 'Vaccine for should be equal');
    assert.equal(
      vaccine.manufacturer,
      manufacturer,
      'Manufacturer should be equal'
    );
    assert.equal(vaccine.batchId, batchId, 'Batch ID should be equal');
    assert.equal(vaccine.expireDate, expireDate, 'Expire date should be equal');
  });

  it('should add a new vaccinator', async () => {
    const id = 1;
    const licenseNumber = 123456;
    const name = 'Dr. Jane Doe';

    await vaccinationLog.addVaccinatorWithValidation(licenseNumber, name);

    const vaccinator = await vaccinationLog.vaccinators(id);

    assert.equal(vaccinator.id, id, 'ID should be equal');
    assert.equal(
      vaccinator.licenseNumber,
      licenseNumber,
      'License number should be equal'
    );
    assert.equal(vaccinator.name, name, 'Name should be equal');
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

    assert.equal(vaccinationDose.date, date, 'Date should be equal');
    assert.equal(
      vaccinationDose.vaccineId,
      vaccineId,
      'Vaccine ID should be equal'
    );
    assert.equal(
      vaccinationDose.vaccinatorId,
      vaccinatorId,
      'Vaccinator ID should be equal'
    );
  });
});
