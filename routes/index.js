var express = require('express');
var router = express.Router();
const store = require('store2');

/* authentication for loading the pages */
function authentiction() {
  return !!localStorage.getItem('token');
}

/* GET welcome route. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Vacci-Log' });
});

// GET signIn route
router.get('/signIn', function (req, res, next) {
  res.render('signIn', { title: 'Vacci-Log' });
});

// GET signUp route
router.get('/signUp', function (req, res, next) {
  res.render('signUp', { title: 'Vacci-Log' });
});

// GET signOut route
router.get('/signOut', function (req, res, next) {
  store.clear();
  res.render('index', { title: 'Vacci-Log' });
});

/* GET home route. */
router.get('/home', function (req, res, next) {
  res.render('home', { title: 'Vacci-Log' });
});

/* GET new patient route. */
router.get('/new', function (req, res, next) {
  res.render('new', { title: 'Vacci-Log' });
});

/* GET revist patient route. */
router.get('/revisit', function (req, res, next) {
  res.render('revisit', { title: 'Vacci-Log' });
});

/* GET user route. */
router.get('/user', function (req, res, next) {
  const user = store.getAll().user;
  const name = user.fname + " " + user.lname;
  const phone = user.phone;
  const email = user.email;
  res.render('user', {
    title: 'Vacci-Log',
    name: name,
    phone: phone,
    email: email
  });
});

/* GET dashboard route. */
router.get('/dashboard', function (req, res, next) {
  res.render('dashboard', { title: 'Vacci-Log' });
});

/* GET verify patient route. */
router.get('/verifyPatientData', function (req, res, next) {
  res.render('verifyPatient', { title: 'Vacci-Log' });
});

/* GET vaccineRecord route. */
router.get('/vaccineRecord', function (req, res, next) {
  res.render('vaccineRecord', { title: 'Vacci-Log' });
});
/* GET vaccineRecord route. */
router.get('/verifyVaccineRecord', function (req, res, next) {
  res.render('verifyVaccine', { title: 'Vacci-Log' });
});

/* GET vaccineRecords route. */
router.get('/previousVRs', function (req, res, next) {
  res.render('previousVRs', { title: 'Vacci-Log' });
});

module.exports = router;
