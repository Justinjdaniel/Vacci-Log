import { Vaccinator } from '../models/index.js';
import { contractInstance } from '../services/index.js';
import getEventValue from '../utils/getEventValue.js';
import { sendError, sendResponse } from '../utils/helpers.util.js';
import { intToObjectId } from '../utils/objectIdConverter.js';

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
      // Return a 400 response with an error message
      return sendError(res, 400, 'Please add all fields');
    }

    // Check if a vaccinator  already exists in the database
    const existingVaccinator = await Vaccinator.findOne({
      licenseNumber,
      name,
    });
    if (existingVaccinator) {
      return sendError(res, 400, 'Vaccinator already exists');
    }

    // Call the addVaccinatorWithValidation function from the contract instance to register the vaccinator in the blockchain
    const vaccinatorTxn = await contractInstance.addVaccinatorWithValidation(
      licenseNumber,
      name
    );

    // Listening to event that emits vaccinatorId when new vaccinator is registered.
    const vaccinatorId = await getEventValue(
      contractInstance,
      'VaccinatorAdded'
    );

    // Wait for the transaction to be confirmed and get the transaction hash
    const { transactionHash } = await vaccinatorTxn.wait();

    // Create a new vaccinator document in the database with the vaccinator details and the transaction hash
    const vaccinator = new Vaccinator({
      _id: intToObjectId(Number(vaccinatorId)),
      licenseNumber,
      name,
      transactionHash,
    });

    // Save the document to the database
    const newVaccinator = await vaccinator.save();

    // If the vaccinator document is created successfully, send back a success message with the vaccinator data
    if (newVaccinator) {
      // Return a 201 response with a success message and the vaccinator data
      return sendResponse(res, 201, 'Vaccinator added successfully', {
        vaccinator: newVaccinator,
      });
    }

    // Return a 400 response with an error message
    return sendError(res, 400, 'Failed to add to DB');
  } catch (error) {
    // Return a 400 response with an error message and the error object
    return sendError(res, 500, 'Vaccinator registration failed', error);
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
    const { vaccinatorId } = req.query;

    // Check if the vaccinator ID is provided
    if (!vaccinatorId) {
      // If not, send back a bad request response with an error message
      return sendError(res, 400, 'Please provide a vaccinator ID');
    }

    // Find the vaccinator document in the database by ID
    const vaccinator = await Vaccinator.find({
      _id: intToObjectId(Number(vaccinatorId)),
    });

    // Check if the vaccinator document exists
    if (vaccinator.length > 0) {
      // If yes, get the vaccinator details from the blockchain contract using the contract instance
      const vaccinatorDetails = await contractInstance.vaccinators(
        vaccinatorId
      );
      // Send back a success response with the vaccinator and vaccinator details
      return sendResponse(res, 201, 'Vaccinator fetched successfully', {
        vaccinatorDetails,
        txnHash: vaccinator.transactionHash,
      });
    } else {
      // If no, send back a not found response with an error message
      return sendError(res, 404, 'Vaccinator not found');
    }
  } catch (error) {
    // Return a 400 response with an error message and the error object
    return sendError(res, 400, 'Error while fetching vaccinator data', error);
  }
};
