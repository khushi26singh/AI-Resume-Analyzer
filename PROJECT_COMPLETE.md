# AI Resume Analyzer

A full-stack web application that uses AI to analyze resumes and provide actionable feedback on ATS compatibility, strengths, weaknesses, and improvement suggestions.

## Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Resume Upload**: Support for PDF, DOC, and DOCX files
- **AI Analysis**: Powered by Google's Gemini API for intelligent resume analysis
- **ATS Score**: Get your Applicant Tracking System compatibility score
- **Detailed Feedback**: Strengths, weaknesses, improvements, and keyword suggestions
- **Resume History**: View and manage all your uploaded resumes
- **Secure Storage**: MongoDB-backed secure storage of resumes and analyses
- **Responsive UI**: Modern, mobile-friendly interface with Tailwind CSS

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for data persistence
- **JWT** for authentication
- **Google Generative AI** (Gemini) for resume analysis
- **Multer** for file uploads
- **Bcryptjs** for password hashing

### Frontend
- **React 19** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Lucide React** for icons

## Project Structure

```
AI-Resume-Analyzer/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (register, login, getMe)
│   │   ├── analyzeController.js  # Resume analysis logic
│   │   └── resumeController.js   # Resume CRUD operations
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── uploadMiddleware.js   # File upload configuration
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Resume.js             # Resume schema
│   │   └── AnalysisReport.js     # Analysis report schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── analyzeRoutes.js      # Analysis endpoint
│   │   └── resumeRoutes.js       # Resume endpoints
│   ├── uploads/                  # Uploaded files storage
│   ├── utils/
│   │   ├── analyzeResume.js      # Resume analysis utility
│   │   └── extractText.js        # Text extraction from files
│   ├── .env                      # Environment variables
│   ├── server.js                 # Entry point
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation component
    │   │   └── ResumeUpload.jsx  # Upload and analysis component
    │   ├── context/
    │   │   └── AuthContext.jsx   # Auth state management
    │   ├── pages/
    │   │   ├── Home.jsx          # Landing page
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   └── Dashboard.jsx     # User dashboard
    │   ├── App.jsx               # Main app with routing
    │   ├── App.css               # Global styles
    │   ├── index.css             # Tailwind import
    │   └── main.jsx              # Entry point
    ├── package.json
    ├── vite.config.js
    └── index.html
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)
- Google Generative AI API key

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (use `.env.example` as reference):
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

4. Start the server:
```bash
npm start          # Production
npm run dev        # Development with nodemon
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or next available port)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Resume Analysis
- `POST /api/analyze` - Upload and analyze resume (requires auth)

### Resume Management
- `GET /api/resumes` - Get all resumes for user (requires auth)
- `GET /api/resumes/:id` - Get specific resume (requires auth)
- `DELETE /api/resumes/:id` - Delete resume (requires auth)

## Usage

1. **Sign Up**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Upload Resume**: Click "Analyze Resume" to upload your resume file
4. **View Analysis**: Get instant feedback with ATS score and recommendations
5. **Manage Resumes**: View history of all uploaded resumes in dashboard
6. **Delete**: Remove any resume from your history

## Features Explained

### ATS Score
Measures how well your resume will be parsed by Applicant Tracking Systems. Score range: 0-100. Higher scores mean better ATS compatibility.

### Strengths
Positive aspects of your resume that help with ATS and recruiter screening.

### Weaknesses
Areas that could hinder ATS parsing or recruiter review.

### Improvements
Specific, actionable recommendations to enhance your resume.

### Keywords
Suggested industry-specific keywords to boost your ATS score.

## Environment Variables

```
MONGO_URI          - MongoDB connection string
JWT_SECRET         - Secret key for JWT signing
GEMINI_API_KEY     - Google Generative AI API key
PORT               - Server port (default: 5000)
```

## Error Handling

The application includes comprehensive error handling:
- Invalid file types are rejected
- Large files are handled gracefully
- Database errors are logged and user-friendly messages are returned
- Missing or invalid authentication tokens are caught

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens expire after 30 days
- Protected routes require valid authentication
- Resume files are only accessible to the owner
- CORS is enabled for frontend-backend communication

## Performance Optimizations

- Lazy loading of resume details
- Efficient MongoDB queries with indexing
- File caching strategies
- Optimized React component rendering

## Future Enhancements

- Batch resume upload
- Resume templates and examples
- Export analysis as PDF
- Multiple resume comparison
- Skills assessment
- Interview preparation tips
- Premium features with analytics
- Resume editor with AI suggestions

## Troubleshooting

### MongoDB Connection Issues
- Verify your MONGO_URI is correct
- Check if MongoDB Atlas cluster is active
- Ensure IP address is whitelisted in MongoDB Atlas

### Gemini API Errors
- Verify GEMINI_API_KEY is valid
- Check API quota and rate limits
- The app has fallback analysis when API is unavailable

### CORS Issues
- Ensure frontend and backend URLs match CORS configuration
- Check that requests include proper headers

### File Upload Issues
- Ensure file size is under limit
- Check file format is PDF, DOC, or DOCX
- Verify uploads folder has write permissions

## License

MIT License

## Support

For issues or questions, please open an issue on the repository.

## Contributors

- Khushi Singh

## Deployed URLs

- Frontend: (not deployed)
- Backend: (not deployed)
