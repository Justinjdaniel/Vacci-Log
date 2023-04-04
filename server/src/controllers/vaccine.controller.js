import { Vaccine } from '../models/index.js';
import { contractInstance } from '../services/index.js';
import getEventValue from '../utils/getEventValue.js';
import { sendError, sendResponse } from '../utils/helpers.util.js';

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
      return sendError(res, 400, 'Please add all fields');
    }

    // Check if a vaccine with the same email already exists in the database
    const existingVaccine = await Vaccine.findOne({
      vaccineFor,
      vaccineManufacturer,
      vaccineBatchId,
      expireDate,
    });
    if (existingVaccine) {
      return sendError(res, 400, 'Vaccine already exists');
    }

    // Call the addVaccineWithValidation function from the contract instance to register the vaccine in the blockchain
    const vaccineTxn = await contractInstance.addVaccineWithValidation(
      vaccineFor,
      vaccineManufacturer,
      vaccineBatchId,
      expireDate
    );

    // Listening to event that emits vaccineId when new vaccine is registered.
    const vaccineId = await getEventValue(contractInstance, 'VaccineAdded');

    // Wait for the transaction to be confirmed and get the transaction hash
    const { transactionHash } = await vaccineTxn.wait();

    // Create a new vaccine document in the database with the vaccine details and the transaction hash
    const vaccine = new Vaccine({
      id: intToObjectId(Number(vaccineId)),
      vaccineFor,
      vaccineManufacturer,
      vaccineBatchId,
      expireDate,
      transactionHash,
    });

    // Save the document to the database
    const newVaccine = await vaccine.save();

    // If the vaccine document is created successfully, send back a success message with the vaccine data
    if (newVaccine) {
      return sendResponse(res, 201, 'Vaccine added successfully', {
        vaccineId,
        vaccine: newVaccine,
      });
    }

    // If the vaccine document is not created, send back an error message
    return sendError(res, 400, 'Failed to add to DB');
  } catch (error) {
    // If any error occurs during the process, send back an error message with the error details
    return sendError(res, 400, 'Vaccinator registration failed', error);
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
    const { vaccineId } = req.query;

    // Check if the vaccine ID is provided
    if (!vaccineId) {
      // If not, send back a bad request response with an error message
      return sendError(res, 400, 'Please provide a vaccine ID');
    }
    // Find the vaccinator document in the database by ID
    const vaccine = await Vaccine.find({
      _id: intToObjectId(Number(vaccineId)),
    });

    // Check if the vaccine document exists
    if (vaccine.length > 0) {
      // If yes, get the vaccine details from the blockchain contract using the contract instance
      const vaccineDetails = await contractInstance.vaccines(vaccineId);
      // Send back a success response with the vaccine and vaccine details
      return sendResponse(res, 201, 'Vaccine fetched successfully', {
        vaccineDetails,
        txnHash: vaccine.transactionHash,
      });
    } else {
      // If no, send back a not found response with an error message
      return sendError(res, 404, 'Vaccine not found');
    }
  } catch (error) {
    // Return a 400 response with an error message and the error object
    return sendError(res, 400, 'Error while fetching vaccine data', error);
  }
};
