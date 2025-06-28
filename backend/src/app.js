import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

// Database bağlantısı
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
app.get('/api/health', async (req, res) => {
  try {
    res.json({
      status: 'success',
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Routes
app.use("/api", userRoutes);
app.use("/api", noteRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

app.get("/", (req, res) => {
  res.send("LingoNote API");
});

export default app;
