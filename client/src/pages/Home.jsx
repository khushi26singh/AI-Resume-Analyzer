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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Resume Analyzer</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-gray-800 font-semibold"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Optimize Your Resume with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get instant, AI-powered feedback on your resume. Improve your ATS score and land more interviews.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg border border-blue-600"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Zap className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Analysis</h3>
            <p className="text-gray-600">Get real-time AI analysis of your resume with detailed feedback and suggestions.</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <BarChart3 className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">ATS Score</h3>
            <p className="text-gray-600">Check your Applicant Tracking System (ATS) compatibility score instantly.</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <Shield className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your resumes are securely stored and only accessible by you.</p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-lg shadow-lg p-12 mt-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Resume</h3>
              <p className="text-gray-600">Upload your resume in PDF, DOC, or DOCX format</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our AI analyzes your resume and generates insights</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Get Feedback</h3>
              <p className="text-gray-600">Receive detailed feedback and actionable recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
