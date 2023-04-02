import { Schema } from 'mongoose';

const vaccinationDoseSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
    },
    vaccineId: { type: Schema.Types.ObjectId, ref: 'Vaccine' },
    vaccinatorId: { type: Schema.Types.ObjectId, ref: 'Vaccinator' },
  },
  {
    timestamps: true,
  }
);

export default vaccinationDoseSchema;
