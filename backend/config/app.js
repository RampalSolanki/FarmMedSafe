import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const createApp = ({ serveFrontend = false, frontendBuildPath = '' } = {}) => {
  const app = express();

  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.get('/', (req, res) => {
    if (serveFrontend && frontendBuildPath && fs.existsSync(frontendBuildPath)) {
      return res.sendFile(path.join(frontendBuildPath, 'index.html'));
    }

    res.json({ message: 'Farm Management API is running', status: 'ok' });
  });

  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected'
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/animals', animalRoutes);
  app.use('/api/medicines', medicineRoutes);
  app.use('/api/admin', adminRoutes);

  if (serveFrontend && frontendBuildPath && fs.existsSync(frontendBuildPath)) {
    app.use(express.static(frontendBuildPath));

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }

      res.sendFile(path.join(frontendBuildPath, 'index.html'));
    });
  }

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use(errorHandler);

  return app;
};

export default createApp;