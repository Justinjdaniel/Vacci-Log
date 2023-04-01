import { Patient } from '../models/index.js';
import { contractInstance } from '../services/index.js';
import getEventValue from '../utils/getEventValue.js';

/**
 * Register a new patient in the blockchain and the database
 * @async
 * @param {Object} req - Express request object with patient details in the body
 * @param {Object} res - Express response object to send back the JSON response
 * @returns {Object} JSON response with patient data or error message
 */
export const registerPatient = async (req, res) => {
  try {
    // Destructure the patient details from the request body
    const { email, name, age, location, gender } = req.body;

    // Validate that all fields are present
    if (!email || !name || !age || !location || !gender) {
      return res.status(400).json({
        status: 'warning',
        message: 'Please add all fields',
      });
    }

    // Check if a patient with the same email already exists in the database
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({
        status: 'error',
        message: 'Patient already exists',
      });
    }

    // Call the addPatientWithValidation function from the contract instance to register the patient in the blockchain
    const patientTxn = await contractInstance.addPatientWithValidation(
      name,
      age,
      location,
      gender
    );
    // Wait for the transaction to be confirmed and get the transaction hash
    const { transactionHash } = await patientTxn.wait();

    const patientId = await getEventValue(contractInstance, 'PatientAdded');

    // Create a new patient document in the database with the patient details and the transaction hash
    const newPatient = await Patient.create({
      id: Number(patientId),
      email,
      name,
      age,
      location,
      gender,
      vaccinated: [],
      transactionHash,
    });

    // If the patient document is created successfully, send back a success message with the patient data
    if (newPatient) {
      return res.status(201).json({
        status: 'success',
        message: 'Patient added successfully',
        patient: newPatient,
      });
    }

    // If the patient document is not created, send back an error message
    return res.status(400).json({
      status: 'error',
      message: 'Failed to add to DB',
    });
  } catch (error) {
    // If any error occurs during the process, send back an error message with the error details
    return res.status(400).json({
      status: 'error',
      message: 'Patient registration failed',
      error,
    });
  }
};

/**
 * Get patient data from the database and the blockchain contract
 * @async
 * @param {Object} req - Express request object with query parameters
 * @param {Object} res - Express response object to send back JSON data
 * @returns {Object} JSON response with patient data or error message
 */
export const getPatient = async (req, res) => {
  try {
    // Get the patient ID from the query parameters
    const patientId = req.query.id;

    // Check if the patient ID is provided
    if (!patientId) {
      // If not, send back a bad request response with an error message
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a patient ID',
      });
    }

    // Find the patient document in the database by ID
    const patient = await Patient.find({ id: patientId });

    // Check if the patient document exists
    if (patient) {
      // If yes, get the patient details from the blockchain contract using the contract instance
      const patientVaccineDetails = await contractInstance.patients(patientId);
      // Send back a success response with the patient and vaccine details
      return res.status(200).json({
        status: 'success',
        message: 'Patient fetched successfully',
        patientVaccineDetails,
        txnHash: patient.transactionHash,
        vaccinatedCount: patient.vaccinated?.length,
      });
    } else {
      // If no, send back a not found response with an error message
      return res.status(404).json({
        status: 'error',
        message: 'Patient not found',
      });
    }
  } catch (error) {
    // If there is any error during the process, send back a server error response with the error details
    return res.status(500).json({
      status: 'error',
      message: 'Error while fetching patient data',
      error,
    });
  }
};

/**
 * Add vaccine dose data in the database and on the blockchain contract
 * @async
 * @param {Object} req - Express request object with patient and vaccine details
 * @param {Object} res - Express response object to send back JSON response
 * @returns {Object} JSON response with updated patient data or error message
 */
export const addVaccineDose = async (req, res) => {
  try {
    // Destructure the request body to get the required fields
    const { patientId, date, vaccineId, vaccinatorId } = req.body;

    // Check if any of the fields are missing and send a bad request response if so
    if (!patientId || !date || !vaccineId || !vaccinatorId)
      return res
        .status(400)
        .json({ status: 'error', message: 'Please add all field' });

    // Check if a patient with the same email already exists in the database
    const patient = await Patient.findOne({ id: patientId });
    if (!patient) {
      return res.status(404).json({
        status: 'error',
        message: 'Patient details not found',
      });
    }

    // Add vaccine details to the blockchain contract and get the transaction hash
    const txn = await contractInstance.addVaccinationDoseWithValidation(
      patientId,
      date,
      vaccineId,
      vaccinatorId
    );
    const { transactionHash } = await txn.wait();

    // Create a vaccine object with all the details and the transaction hash
    const vaccineObject = {
      date,
      vaccineId,
      vaccinatorId,
    };

    if (transactionHash) {
      // Add vaccine data to the database by updating the patient document or creating a new one if not found
      const updatedPatient = await Patient.findOneAndUpdate(
        { id: patientId },
        { $push: { vaccinated: vaccineObject } },
        { new: true, upsert: true }
      );

      // Send a success response with the updated patient data
      res.status(200).json({
        status: 'success',
        message: 'Patient data updated successfully',
        updatedPatient,
      });
    }
  } catch (error) {
    // Send an error response with the error message and stack trace
    return res.status(500).json({
      status: 'error',
      message: 'Error while updating patient data',
      error,
    });
  }
};
