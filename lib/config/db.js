import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const ConnectDB = async () => {
  const dbConnectionString = process.env.MONGO_URL;
  await mongoose.connect(dbConnectionString);
  console.log("DB Connected");
}