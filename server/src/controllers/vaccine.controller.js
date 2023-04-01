import { Vaccine } from '../models/index.js';
import { contractInstance } from '../services/index.js';
import getEventValue from '../utils/getEventValue.js';

/**
 * Registers a vaccine in the blockchain and database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Express response object
 */
export const registerVaccine = async (req, res) => {
  try {
    // Destructure the vaccine details from the request body
    const { vaccineFor, vaccineManufacturer, vaccineBatchId, expireDate } =
      req.body;

    // Validate that all fields are present
    if (!vaccineFor || !vaccineManufacturer || !vaccineBatchId || !expireDate) {
      return res.status(400).json({
        status: 'warning',
        message: 'Please add all fields',
      });
    }

    // Check if a vaccine with the same email already exists in the database
    const existingVaccine = await Vaccine.findOne({
      vaccineFor,
      vaccineManufacturer,
      vaccineBatchId,
      expireDate,
    });
    if (existingVaccine) {
      return res.status(400).json({
        status: 'error',
        message: 'Vaccine already exists',
      });
    }

    // Call the addVaccineWithValidation function from the contract instance to register the vaccine in the blockchain
    const vaccineTxn = await contractInstance.addVaccineWithValidation(
      vaccineFor,
      vaccineManufacturer,
      vaccineBatchId,
      expireDate
    );
    // Wait for the transaction to be confirmed and get the transaction hash
    const { transactionHash } = await vaccineTxn.wait();

    const vaccineId = await getEventValue(contractInstance, 'VaccineAdded');

    // Create a new vaccine document in the database with the vaccine details and the transaction hash
    const newVaccine = await Vaccine.create({
      id: Number(vaccineId),
      vaccineFor,
      vaccineManufacturer,
      vaccineBatchId,
      expireDate,
      transactionHash,
    });

    // If the vaccine document is created successfully, send back a success message with the vaccine data
    if (newVaccine) {
      return res.status(201).json({
        status: 'success',
        message: 'Vaccine added successfully',
        vaccine: newVaccine,
      });
    }

    // If the vaccine document is not created, send back an error message
    return res.status(400).json({
      status: 'error',
      message: 'Failed to add to DB',
    });
  } catch (error) {
    // If any error occurs during the process, send back an error message with the error details
    return res.status(400).json({
      status: 'error',
      message: 'Vaccine registration failed',
      error,
    });
  }
};

/**
 * Fetches a vaccine from the blockchain and database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Express response object
 */
export const getVaccine = async (req, res) => {
  try {
    // Get the vaccine ID from the query parameters
    const vaccineId = req.query.id;

    // Check if the vaccine ID is provided
    if (!vaccineId) {
      // If not, send back a bad request response with an error message
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a vaccine ID',
      });
    }

    // Find the vaccine document in the database by ID
    const vaccine = await Vaccine.find({ id: vaccineId });

    // Check if the vaccine document exists
    if (vaccine) {
      // If yes, get the vaccine details from the blockchain contract using the contract instance
      const vaccineDetails = await contractInstance.vaccines(vaccineId);
      // Send back a success response with the vaccine and vaccine details
      return res.status(200).json({
        status: 'success',
        message: 'Vaccine fetched successfully',
        vaccineDetails,
        txnHash: vaccine.transactionHash,
      });
    } else {
      // If no, send back a not found response with an error message
      return res.status(404).json({
        status: 'error',
        message: 'Vaccine not found',
      });
    }
  } catch (error) {
    // If there is any error during the process, send back a server error response with the error details
    return res.status(500).json({
      status: 'error',
      message: 'Error while fetching vaccine data',
      error,
    });
  }
};
