import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Zap, BarChart3, Shield, ArrowRight } from 'lucide-react'

export default function Home() {
  const { user, token } = useContext(AuthContext)
  const navigate = useNavigate()

  if (user && token) {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b-4 border-purple-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">✨</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Resume Analyzer</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-purple-600 hover:text-purple-700 font-bold px-4 py-2 rounded-full hover:bg-purple-100 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">🌸</div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Your Resume, Perfected with AI ✨
          </h1>
          <p className="text-xl text-purple-700 font-semibold mb-8">
            💫 Get instant, AI-powered feedback on your resume<br/>
            🎯 Improve your ATS score and land more interviews
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-full flex items-center gap-2 shadow-xl hover:shadow-2xl transition transform hover:scale-105"
            >
              Get Started 🚀 <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-purple-200 to-blue-200 hover:from-purple-300 hover:to-blue-300 text-purple-700 font-bold py-4 px-10 rounded-full hover:shadow-lg transition transform hover:scale-105"
            >
              Sign In 💕
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition transform hover:scale-105">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-yellow-900 mb-2">Instant Analysis</h3>
            <p className="text-yellow-800 font-semibold">Get real-time AI analysis with detailed feedback and suggestions.</p>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition transform hover:scale-105">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-pink-900 mb-2">ATS Score</h3>
            <p className="text-pink-800 font-semibold">Check your compatibility score instantly with detailed breakdown.</p>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition transform hover:scale-105">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Secure & Private</h3>
            <p className="text-blue-800 font-semibold">Your resumes are encrypted and only accessible by you.</p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl shadow-xl p-12 mt-12 border-4 border-purple-200">
          <h2 className="text-4xl font-black text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-12">How it Works ✨</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-400 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                1️⃣
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Upload Resume</h3>
              <p className="text-purple-700 font-semibold">Upload your resume in PDF, DOC, or DOCX format</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-pink-400 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                2️⃣
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">AI Analysis</h3>
              <p className="text-purple-700 font-semibold">Our AI analyzes your resume and generates insights</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-400 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                3️⃣
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Get Feedback</h3>
              <p className="text-purple-700 font-semibold">Receive detailed feedback and actionable recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
