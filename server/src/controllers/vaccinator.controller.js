import { Vaccinator } from '../models/index.js';
import { contractInstance } from '../services/index.js';
import getEventValue from '../utils/getEventValue.js';

/**
 * Registers a vaccinator in the blockchain and database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Express response object
 */
export const registerVaccinator = async (req, res) => {
  try {
    // Destructure the vaccinator details from the request body
    const { licenseNumber, name } = req.body;

    // Validate that all fields are present
    if (!licenseNumber || !name) {
      return res.status(400).json({
        status: 'warning',
        message: 'Please add all fields',
      });
    }

    // Check if a vaccinator with the same email already exists in the database
    const existingVaccinator = await Vaccinator.findOne({
      licenseNumber,
      name,
    });
    if (existingVaccinator) {
      return res.status(400).json({
        status: 'error',
        message: 'Vaccinator already exists',
      });
    }

    // Call the addVaccinatorWithValidation function from the contract instance to register the vaccinator in the blockchain
    const vaccinatorTxn = await contractInstance.addVaccinatorWithValidation(
      licenseNumber,
      name
    );
    // Wait for the transaction to be confirmed and get the transaction hash
    const { transactionHash } = await vaccinatorTxn.wait();

    const vaccinatorId = await getEventValue(contractInstance, 'VaccinatorAdded');

    // Create a new vaccinator document in the database with the vaccinator details and the transaction hash
    const newVaccinator = await Vaccinator.create({
      id: Number(vaccinatorId),
      licenseNumber,
      name,
      transactionHash,
    });

    // If the vaccinator document is created successfully, send back a success message with the vaccinator data
    if (newVaccinator) {
      return res.status(201).json({
        status: 'success',
        message: 'Vaccinator added successfully',
        vaccinator: newVaccinator,
      });
    }

    // If the vaccinator document is not created, send back an error message
    return res.status(400).json({
      status: 'error',
      message: 'Failed to add to DB',
    });
  } catch (error) {
    // If any error occurs during the process, send back an error message with the error details
    return res.status(400).json({
      status: 'error',
      message: 'Vaccinator registration failed',
      error,
    });
  }
};

/**
 * Fetches a vaccinator from the blockchain and database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Express response object
 */
export const getVaccinator = async (req, res) => {
  try {
    // Get the vaccinator ID from the query parameters
    const vaccinatorId = req.query.id;

    // Check if the vaccinator ID is provided
    if (!vaccinatorId) {
      // If not, send back a bad request response with an error message
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a vaccinator ID',
      });
    }

    // Find the vaccinator document in the database by ID
    const vaccinator = await Vaccinator.find({ id: vaccinatorId });

    // Check if the vaccinator document exists
    if (vaccinator) {
      // If yes, get the vaccinator details from the blockchain contract using the contract instance
      const vaccineDetails = await contractInstance.vaccines(vaccinatorId);
      // Send back a success response with the vaccinator and vaccinator details
      return res.status(200).json({
        status: 'success',
        message: 'Vaccinator fetched successfully',
        vaccineDetails,
        txnHash: vaccine.transactionHash,
      });
    } else {
      // If no, send back a not found response with an error message
      return res.status(404).json({
        status: 'error',
        message: 'Vaccinator not found',
      });
    }
  } catch (error) {
    // If there is any error during the process, send back a server error response with the error details
    return res.status(500).json({
      status: 'error',
      message: 'Error while fetching vaccinator data',
      error,
    });
  }
};
