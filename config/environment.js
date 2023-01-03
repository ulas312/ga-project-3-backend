import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_URI =
  process.env.DB_URI || 'mongodb://127.0.0.1:27017/full-stacked-db';
export const SECRET = process.env.SECRET || 'chiseled';
