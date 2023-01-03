import mongoose from 'mongoose';
import { DB_URI } from '../config/environment.js';

export const connectDb = () => {
  mongoose.set('strictQuery', false);
  return mongoose.connect(DB_URI);
};

export const disconnectDb = () => {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect();
  }
};
