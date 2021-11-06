const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();
Web3 = require("web3");

// web3 path
web3 = new Web3('http://localhost:7545');
// contract JSON
const VaccineJSON = require(path.join(__dirname, 'build/contracts/Vaccine.json'));
contractAddress = VaccineJSON.networks['5777'].address;
const contractAbi = VaccineJSON.abi;
VaccineContract = new web3.eth.Contract(contractAbi, contractAddress);

// // Infura configuration
// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "19634170f79a4486b23a666f351ac38f";
// const mnemonic = "fresh cost return patrol kid tool canvas aim once snack owner fame";
// const address_index = 0;
// const num_addresses = 5;
// const provider = new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`, address_index, num_addresses);
// web3 = new Web3(provider);
// const VaccineJSON = require(path.join(__dirname, 'build/contracts/Vaccine.json'));
// contractAddress = VaccineJSON.networks['3'].address;
// const contractAbi = VaccineJSON.abi;
// VaccineContract = new web3.eth.Contract(contractAbi, contractAddress);

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const vaccineRouter = require('./routes/vaccine');
const patientsRouter = require('./routes/patient');
const paymentRouter = require('./routes/payment');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routing paths
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vaccine', vaccineRouter);
app.use('/patient', patientsRouter);
app.use('/payment', paymentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
