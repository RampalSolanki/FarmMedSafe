import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import serverless from 'serverless-http';
import createApp from '../backend/config/app.js';
import connectDB from '../backend/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../backend/config/.env') });

const app = createApp();
const handler = serverless(app);

let dbConnectionPromise = null;

const ensureDatabaseConnection = async () => {
  if (!dbConnectionPromise) {
    dbConnectionPromise = connectDB({ exitOnFailure: false }).catch((error) => {
      dbConnectionPromise = null;
      throw error;
    });
  }

  return dbConnectionPromise;
};

export default async function vercelHandler(req, res) {
  try {
    await ensureDatabaseConnection();
    return handler(req, res);
  } catch (error) {
    return res.status(500).json({
      message: 'Serverless function failed to initialize',
      error: error.message
    });
  }
}