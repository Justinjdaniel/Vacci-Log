var express = require('express');
const VaccineRouter = express.Router();
const VaccineData = require('../model/vaccineData');
const vaccineBCTxn = require("./vaccineBCTxn");

/* POST vaccine details. */
VaccineRouter.post('/get', function (req, res, next) {
  const data = req.body;
  VaccineData.find({ uid: data.uid }, (err, vaccineRecords) => {
    if (err) {
      console.log(err)
    } else {
      if (!vaccineRecords) {
        res.status(404).send("Record Not Found");
      }
      else {
        console.log(vaccineRecords);
        res.status(200).render('previousVRs', { vRecords: vaccineRecords });
        // .catch(_err => {
        //   res.status(400).send("Unable to Read the Database");
        // });
      }
    }
  });
});

/* POST add vaccine. */
VaccineRouter.post('/add', function (req, res, next) {
  data = req.body;
  console.log(data);
  const recordData = {
    uid: data.uid,
    vaccineName: data.vaccineName,
    manufacturer: data.manufacturer,
    batch: data.batch,
    slNo: data.slNo,
    mfd: data.mfd
  }

  const vData = data.vaccineName + '-' + data.manufacturer + '-' + data.batch + '-' + data.slNo + '-' + data.mfd; // all the datas are joined together to form a unique data

  record = new VaccineData(recordData);
  record.save((err, record) => {

    web3.eth.getAccounts().then((accounts) => {
      VaccineContract.methods
        .setVaccineData(data.uid, vData)
        .send({ from: accounts[0], gas: 257685 })
        .then((txn) => {
          console.log(txn);
        })
    })

    // // Infura Txn call
    // const functionCall = VaccineContract.methods
    //   .setVaccineData(data.uid, vData);
    // vaccineBCTxn.sendTransaction(functionCall, (response) => {
    //   if (response == true) console.log("Vaccine Record Added !");
    //   else res.send("Transaction failed... Check Console for error...");
    // });


    if (err) {
      console.log(err);
    } else {
      console.log(record);
      // res.status(200).send(record);
      res.status(200).render('vaccineRecord', { vRecord: record });
    }
  });

});

/* POST verify vaccine. */
VaccineRouter.post('/verify', function (req, res, next) {
  const data = req.body;
  const uid = data.uid;
  const count = data.vaccineCount;
  web3.eth.getAccounts().then((accounts) => {
    VaccineContract.methods
      .getData(uid, count)
      .call({ from: accounts[0], gas: 257685 })
      .then((txn) => {
        // res.status(200).send(txn);
        res.status(200).render("verifyVaccine", { VVD: txn });
      })
  })
});

module.exports = VaccineRouter;











/* Code Desposal

  expDate: data.expDate

  const name = data.vaccineName.substring(0, 3);
  const company = data.manufacturer.substring(0, 3);
  const batch = data.batch.substring(0, 4);
  const slNo = data.slNo.substring(0, 3);
  const mfd = data.mfd.substring(0, 3);
  const expDate = data.expDate.substring(0, 3);

*/