import { model, Schema } from 'mongoose';

const vaccinatorSchema = Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    licenseNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
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

const Vaccinator = model('Vaccinator', vaccinatorSchema);

export default Vaccinator;
