import { model, Schema } from 'mongoose';

const vaccineSchema = Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
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
  }
);

const Vaccine = model('Vaccine', vaccineSchema);

export default Vaccine;
