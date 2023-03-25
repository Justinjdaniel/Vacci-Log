import httpStatus from 'http-status';
import Patient from '../models/patient.model.js';

export const registerPatient = async (req, res) => {
  try {
    const { username, firstName, lastName, email } = req.body;
    if (!username || !firstName || !lastName || !email)
      return res
        .status(400)
        .json({ status: 'warning', message: 'Please add all field' });

    const userExist = await userModel.findOne({ email });
    if (userExist)
      return res
        .status(400)
        .json({ status: 'error', message: 'User already exist' });

    // generate random password
    const password = generatePassword();
    console.log(password);

    // Hash password
    const hashedPassword = encryptPassword(password);

    // Create user
    const user = await userModel.create({
      username,
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
    });

    // TODO: add email service

    if (user) {
      return res.status(201).json({
        status: 'success',
        message: 'User added and email sent successfully',
        user: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    }
    return res
      .status(400)
      .json({ status: 'error', message: 'Failed to add to DB' });
  } catch (error) {
    return res
      .status(400)
      .json({ status: 'error', message: 'User registration failed', error });
  }
};

export const getPatient = async (req, res) => {
  try {
    const patient = await Patient.find({ patientId: req.query.id });
    res.status(httpStatus[200]).json({
      status: 'success',
      message: 'Patient fetched successfully',
      patient,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error while fetching patient data',
      error,
    });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { patientId, ...vaccineObject } = req.body;

    // TODO: add vaccine details to contract

    // TODO: get receipt

    const patient = await Patient.findOneAndUpdate(
      { patientId },
      { $push: { vaccinated: vaccineObject } },
      { new: true, upsert: true }
    );
    res.status(200).json({
      status: 'success',
      message: 'User data updated successfully',
      patient,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error while fetching users',
      error,
    });
  }
};
