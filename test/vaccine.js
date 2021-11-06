const Vaccine = artifacts.require("Vaccine");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Vaccine", function (/* accounts */) {
  it("should assert true", async function () {
    await Vaccine.deployed();
    return assert.isTrue(true);
  });

  /* Pateint functions testing */
  it('Add patient Details', async function () {
    const patient = await Vaccine.deployed();

    /* Test data declaration */
    uid = 1011;
    name1 = "This is a test";
    age = 12;
    gender = 0;
    location = "SandBox, Kerala , IND";
    patientCount = 1;

    await patient.setPatient(uid, name1, age, gender, location); //setPatient method for adding patient details to blockchain
    patientDeatails = await patient.getPatient(uid, patientCount); //getPatient method for getting data from the blockchain
    assert.equal(patientDeatails[0], uid, "Test fail"); //Unique ID testing
    assert.equal(patientDeatails[1], name1, "Test fail"); //Patient name testing
    assert.equal(patientDeatails[2], age, "Test fail"); //Patinet age testing
    assert.equal(patientDeatails[3], gender, "Test fail"); //Patient gender data testing
    assert.equal(patientDeatails[4], location, "Test fail");//loaction data testing
  });

  /* Vaccine Functions testing */
  it('Add vaccine Details', async function () {
    const vaccine = await Vaccine.deployed();

    /* Test data declaration */
    uid = 1011;
    vaccineData = "This is a test";
    vaccineCount = 1;

    await vaccine.setVaccineData(uid, vaccineData); //setVaccineData method for adding vaccine data to blockchain
    vaccineDetails = await vaccine.getData(uid, vaccineCount); //getData method for getting data from the blockchain
    assert.equal(patientDeatails[0], uid, "Test fail"); //Unique ID testing
    assert.equal(patientDeatails[1], vaccineData, "Test fail"); //Vaccine data testing
  });

});
