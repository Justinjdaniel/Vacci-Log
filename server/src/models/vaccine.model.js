import { model, Schema } from 'mongoose';

const vaccineSchema = Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    vaccineFor: {
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
    expireDate: {
      type: String,
      required: true,
      trim: true,
    },
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

const Vaccine = model('Vaccine', vaccineSchema);

export default Vaccine;
