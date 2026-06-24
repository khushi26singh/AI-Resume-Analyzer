# Quick Start Guide - AI Resume Analyzer

## Run in 3 Steps

### 1. Start Backend
```bash
cd server
npm install        # First time only
npm start
```
Backend runs on: **http://localhost:5000**

### 2. Start Frontend
```bash
cd client
npm install        # First time only
npm run dev
```
Frontend runs on: **http://localhost:5173** (or similar)

### 3. Open in Browser
Visit: **http://localhost:5173**

## First Time Setup

### Set Environment Variables

Create `server/.env` file:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-analyzer
JWT_SECRET=your-secret-key-here
GEMINI_API_KEY=your-api-key-here
PORT=5000
```

### Get Your API Keys

1. **MongoDB**: 
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free cluster
   - Copy connection string

2. **Gemini API**:
   - Go to https://aistudio.google.com/apikey
   - Create new API key
   - Copy and paste into .env

## Test User Account

After backend starts, you can:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Your Name","email":"you@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password123"}'
```

Or use the web interface to sign up.

## Common Issues

### "Cannot connect to MongoDB"
- Check internet connection
- Verify MONGO_URI in .env
- Check MongoDB Atlas cluster is active

### "Gemini API Error"
- Verify API key is correct
- Check if quota exceeded
- App will use fallback analysis if API unavailable

### "Port already in use"
- Backend: Kill process on port 5000
- Frontend: Vite will automatically use next available port

### "CORS Error"
- Make sure backend is running on :5000
- Frontend makes requests to http://localhost:5000

## Project Features

✅ User authentication with JWT
✅ Resume upload (PDF, DOC, DOCX)
✅ AI-powered resume analysis
✅ ATS score calculation
✅ Resume history tracking
✅ Secure MongoDB storage
✅ Modern React UI with Tailwind CSS
✅ Protected routes and endpoints

## File Structure

```
server/          - Express.js backend
├── controllers  - Business logic
├── models       - MongoDB schemas
├── routes       - API endpoints
└── middleware   - Auth & upload

client/          - React frontend
├── components   - Reusable components
├── context      - Auth state management
├── pages        - Full page components
└── App.jsx      - Main router
```

## Next Steps

1. Register an account
2. Upload a resume (PDF, DOC, or DOCX)
3. Get instant AI analysis
4. View past resumes in dashboard
5. Improve your resume based on suggestions

## Support

Check [PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md) for detailed documentation.

Enjoy analyzing your resume! 🚀
