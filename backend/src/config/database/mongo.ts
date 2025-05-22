import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
const url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/db';
export const DatabaseName = process.env.DATABASE_NAME || 'template';
export const mongoClient = new MongoClient(url);
