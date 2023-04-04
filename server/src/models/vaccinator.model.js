import { model, Schema } from 'mongoose';

const vaccinatorSchema = Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
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
  }
);

const Vaccinator = model('Vaccinator', vaccinatorSchema);

export default Vaccinator;
