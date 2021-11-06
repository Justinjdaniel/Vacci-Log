const express = require('express');
const { default: Web3 } = require('web3');
const PatientRouter = express.Router();
const PatientData = require('../model/patientData');
const vaccineBCTxn = require("./vaccineBCTxn");

/* POST patient details. */
PatientRouter.post('/get', function (req, res, next) {
  const data = req.body;
  PatientData.findOne({ uid: data.uid }, (err, patientRecords) => {
    if (err) {
      console.log(err)
    } else {
      if (!patientRecords) {
        res.status(404).send("Record Not Found");
        console.log(err);
      }
      else {
        console.log(patientRecords);
        res.status(200).render('revisit', { pRecord: patientRecords });
          // .catch(_err => {
          //   res.status(400).send("Unable to Read the Database");
          // });
      }
    }
  });
});

/* POST add patient. */
PatientRouter.post('/add', function (req, res, next) {
  const data = req.body;
  const name = data.firstName + ' ' + data.lastName;
  const address = data.city + ', ' + data.state + ', ' + data.pincode;
  const recordData = {
    uid: data.uid,
    name: name,
    age: data.age,
    gender: data.gender,
    dateOfBirth: data.dob,
    phone: data.phone,
    address: address
  }

  // Gender variable for contract
  if (data.gender == 'male') {
    sex = 0;
  }
  else if (data.gender == 'female') {
    sex = 1;
  }
  else { sex = 2; }

  record = new PatientData(recordData);
  record.save((err, patientRecord) => {

    web3.eth.getAccounts().then((accounts) => {
      VaccineContract.methods
        .setPatient(data.uid, name, data.age, sex, address)
        .send({ from: accounts[0], gas: 257685 })
        .then((txn) => {
          console.log(txn);
        })
    })

    // //Infura Txn call
    // const functionCall = VaccineContract.methods
    //   .setPatient(data.uid, name, data.age, sex, address);
    // vaccineBCTxn.sendTransaction(functionCall, (response) => {
    //   if (response == true) console.log("Patient Record Added !");
    //   else res.send("Transaction failed... Check Console for error...");
    // });

    if (err) {
      console.log(err);
    } else {
      console.log(patientRecord);
      res.status(200).render('revisit',{pRecord: patientRecord});
    }
  });

});

/* POST verify patient. */
PatientRouter.post('/verify', function (req, res, next) {
  const data = req.body;
  web3.eth.getAccounts().then((accounts) => {
    VaccineContract.methods
      .getPatient(data.uid, data.patientCount)
      .call({ from: accounts[0], gas: 257685 })
      .then((txn) => {
        console.log(txn);
        // res.status(200).send(txn);
        res.status(200).render("verifyPatient",{VPD : txn});
      })
  })
});

/* POST Update patient. */
PatientRouter.post('/update', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = PatientRouter;










/* Code Desposal

  PatientData.find({ uid: data.uid },{$sort:{createdOn: -1}}, (err, patientRecords) => {

  const nameB32 = web3.utils.rightPad(web3.utils.fromAscii(data.name), 64); // Name: string is converted to hex and then to bytes32

  res.status(200).send(txn);

  res.status(200).redirect('/revisit',{
    uniqueID: patientRecord.uid,
    name: patientRecord.name,
    age: patientRecord.age,
    gender: patientRecord.gender,
    dob: patientRecord.dateOfBirth.toLocaleDateString(),
    phone: patientRecord.phone,
    address: patientRecord.address,
    recordAdded: patientRecord.recordAdded.toLocaleDateString() + ' ' + patientRecord.recordAdded.toLocaleTimeString()
  });

*/