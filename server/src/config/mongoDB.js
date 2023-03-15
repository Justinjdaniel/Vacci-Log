import { createConnection, set } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

set('strictQuery', false);

const connectDB = async () => {
  try {
    const db = await createConnection(MONGO_URI);
    console.log(
      `\x1b[4m\u001b[46;1m MongoDB Connected:\u001b[44;1m ${db.name} DB \u001b[0m`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
