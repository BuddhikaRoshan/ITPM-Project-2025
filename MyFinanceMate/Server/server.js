import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000

const allowedOrigins =['http://localhost:5176']

// Middleware
app.use(cors({origin:allowedOrigins,credentials:true}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
  .then(() => console.log("MongoDB connection success!"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if the connection fails
  });

// Routes
app.get('/', (req, res) => res.send("Welcome to MyFinanceMate API!"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Start Server with port fallback
const startServer = (port) => {
  try {
    const server = app.listen(port, () => {
      console.log(`Server is up and running on port number: ${port}`);
    });
    
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use, trying port ${port + 1}`);
        startServer(port + 1);
      } else {
        console.error('Server error:', error);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

// Start the server on the initial port
startServer(PORT);