import { model, Schema } from 'mongoose';

const vaccineSchema = Schema({
  vaccinatedFor: {
    type: String,
    required: true,
    trim: true,
  },
  vaccineName: {
    type: String,
    required: true,
    trim: true,
  },
  vaccineManufacturer: {
    type: String,
    required: true,
    trim: true,
  },
  vaccineBatchId: {
    type: String,
    required: true,
    trim: true,
  },
  vaccineBottleNumber: {
    type: String,
    required: true,
    trim: true,
  },
  vaccinatedDate: {
    type: String,
    required: true,
    trim: true,
  },
  vaccinatorId: {
    type: String,
    required: true,
    trim: true,
  },
  transactionHash: {
    type: String,
    required: true,
  },
});

export default vaccineSchema;
