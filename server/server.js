const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes');
const analyzeRoutes = require('./routes/analyzeRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = process.env.FRONTEND_URL
  ? [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:3000"
  ]
  : "*";

app.use(cors({
  origin: allowedOrigins,
  credentials: allowedOrigins !== "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public route
app.get("/", (req, res) => {
  res.json({
    message: "Resume Analyzer API is running",
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/analyze', protect, analyzeRoutes);
app.use('/api/resumes', resumeRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});