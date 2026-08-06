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

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000"
];

if (process.env.FRONTEND_URL) {
  // Strip trailing slash if present
  const cleanFrontendUrl = process.env.FRONTEND_URL.replace(/\/$/, "");
  allowedOrigins.push(cleanFrontendUrl);
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin) || 
                      origin.endsWith(".vercel.app") || 
                      origin.endsWith(".app.github.dev") || 
                      /^https?:\/\/localhost:\d+$/.test(origin);
                      
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true
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