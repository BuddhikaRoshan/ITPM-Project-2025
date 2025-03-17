// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';    // Ensure this exists or comment out if not used
import userRouter from './routes/userRoutes.js';    // Ensure this exists or comment out if not used
import paymentRoutes from './routes/paymentRoutes.js'; // Import the payment routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:5173'];

// Middleware
app.use(
  cors({ origin: allowedOrigins, credentials: true })
);
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const MONGODB_URL = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("MongoDB connection success!"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Basic route
app.get('/', (req, res) => res.send("Welcome to MyFinanceMate API!"));

// Use routers
// Uncomment the following lines if these routers are implemented
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/payments', paymentRoutes);

// Start the server, and if the port is in use try subsequent ports
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

startServer(PORT);