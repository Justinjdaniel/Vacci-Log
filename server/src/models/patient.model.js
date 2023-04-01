import { model, Schema } from 'mongoose';
import validator from 'validator';
import { toJSON } from './plugins/index.js';
import vaccinationDoseSchema from './vaccinationDose.model.js';

const patientSchema = Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.Number.isInteger(value)) {
          throw new Error('Invalid patient id');
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
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
      default: 'male',
    },
    vaccinationDoses: [vaccinationDoseSchema],
    transactionHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: false,
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
 * @typedef Patient
 */
const Patient = model('Patient', patientSchema);

export default Patient;
