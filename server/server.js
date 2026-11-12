
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import admAuthRoutes from './routes/admAuthRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import mongoose from 'mongoose';
//import cookieParser from 'cookie-parser';
 

const app = express();

const PORT = process.env.PORT || 5000;
const requiredEnvVars = [
  'CLIENT_URL',
  'MONGO_URI',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(
  (key) => !process.env[key]?.trim()
);

if (missingEnvVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`
  );
  process.exit(1);
}

// Validate frontend URL
try {
  const clientUrl = new URL(process.env.CLIENT_URL);

  if (!['http:', 'https:'].includes(clientUrl.protocol)) {
    throw new Error('Invalid protocol');
  }
} catch {
  console.error('CLIENT_URL must be a valid HTTP or HTTPS URL.');
  process.exit(1);
}

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json({ limit: '10kb' }));
// app.use(express.json({ limit: '10kb' }));
// app.use(cookieParser());


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.'
  }
});

app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => {
  const isDatabaseConnected = mongoose.connection.readyState === 1;

  res.status(isDatabaseConnected ? 200 : 503).json({
    success: isDatabaseConnected,
    message: isDatabaseConnected
      ? 'Portfolio API is running successfully.'
      : 'Database connection is unavailable.',
    database: isDatabaseConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', admAuthRoutes);
app.use('/api/images', imageRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.'
  });
});

// Connect database before starting the server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('MongoDB database is ready.');
  });
};

startServer();
