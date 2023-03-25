import bcryptjs from 'bcryptjs';
import { model, Schema } from 'mongoose';
import validator from 'validator';
import { toJSON } from './plugins/index.js';
import Vaccine from './vaccine.model.js';

const { compare, hash } = bcryptjs;
const { isEmail, isNumeric } = validator;

const patientSchema = Schema(
  {
    patientId: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!isNumeric(value)) {
          throw new Error('Invalid vaccinator ID');
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    vaccinated: [Vaccine],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
patientSchema.plugin(toJSON);

/**
 * Check if email is taken
 * @param {string} email - The patient's email
 * @param {ObjectId} [excludePatientId] - The id of the patient to be excluded
 * @returns {Promise<boolean>}
 */
patientSchema.statics.isEmailTaken = async function (email, excludePatientId) {
  const patient = await this.findOne({
    email,
    _id: { $ne: excludePatientId },
  });
  return !!patient;
};

/**
 * Check if password matches the patient's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
patientSchema.methods.isPasswordMatch = async function (password) {
  const patient = this;
  return compare(password, patient.password);
};

patientSchema.pre('save', async function (next) {
  const patient = this;
  if (patient.isModified('password')) {
    patient.password = await hash(patient.password, 8);
  }
  next();
});

/**
 * @typedef Patient
 */
const Patient = model('Patient', patientSchema);

export default Patient;
