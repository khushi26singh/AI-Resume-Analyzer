import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Upload, Trash2, Loader, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import ResumeUpload from '../components/ResumeUpload'

export default function Dashboard() {
  const { user, token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedResume, setSelectedResume] = useState(null)
  const [showUpload, setShowUpload] = useState(false)

  const API_BASE_URL = 'http://localhost:5000'

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchResumes()
  }, [user, token])

  const fetchResumes = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/resumes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setResumes(data.resumes)
      } else {
        setError('Failed to fetch resumes')
      }
    } catch (err) {
      setError('Error fetching resumes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this resume?')) return

    try {
      const response = await fetch(`${API_BASE_URL}/api/resumes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        setResumes(resumes.filter(r => r._id !== id))
        setSelectedResume(null)
      } else {
        alert('Failed to delete resume')
      }
    } catch (err) {
      alert('Error deleting resume')
    }
  }

  const handleUploadSuccess = () => {
    setShowUpload(false)
    fetchResumes()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Dashboard 💖</h1>
            <p className="text-purple-600 font-bold mt-2">Welcome back, {user?.name}! ✨</p>
          </div>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Upload className="w-5 h-5" />
            Analyze Resume
          </button>
        </div>

        {showUpload && (
          <div className="mb-8">
            <ResumeUpload onSuccess={handleUploadSuccess} onCancel={() => setShowUpload(false)} />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-100 border-2 border-red-300 rounded-2xl mb-8">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 font-semibold">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl shadow-lg p-12 text-center border-4 border-purple-200">
            <div className="text-7xl mb-4">📄</div>
            <h2 className="text-3xl font-black text-purple-900 mb-2">No resumes yet</h2>
            <p className="text-purple-700 font-semibold mb-6">Upload your first resume to get started with AI analysis ✨</p>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition"
            >
              Upload Resume 🚀
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-purple-200">
                <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-4 font-bold text-purple-900">
                  📁 Your Resumes
                </div>
                <div className="grid grid-cols-1 gap-0">
                  {resumes.map((resume, idx) => (
                    <div
                      key={resume._id}
                      className={`p-4 border-b-2 cursor-pointer transition ${
                        selectedResume?._id === resume._id
                          ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-l-purple-600'
                          : 'hover:bg-purple-50'
                      }`}
                      onClick={() => setSelectedResume(resume)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-purple-900">📄 {resume.fileName}</h3>
                          <p className="text-sm text-purple-600 font-semibold">
                            {new Date(resume.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        {resume.analysisReport && (
                          <div className="text-right">
                            <p className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                              {resume.analysisReport.atsScore}
                            </p>
                            <p className="text-xs text-purple-600 font-bold">ATS Score</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedResume && (
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-xl p-6 h-fit border-4 border-pink-200">
                <h2 className="text-2xl font-black text-purple-900 mb-4">✨ Analysis Details</h2>

                {selectedResume.analysisReport ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-yellow-200 to-orange-200 p-4 rounded-2xl shadow">
                      <p className="text-sm text-orange-700 font-bold">🎯 ATS Score</p>
                      <p className="text-4xl font-black text-orange-600">
                        {selectedResume.analysisReport.atsScore}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-black text-purple-900 mb-2">📝 Summary</h3>
                      <p className="text-purple-700 text-sm font-semibold">
                        {selectedResume.analysisReport.summary}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-black text-green-700 mb-2">✅ Strengths</h3>
                      <ul className="space-y-1">
                        {selectedResume.analysisReport.strengths?.slice(0, 3).map((s, i) => (
                          <li key={i} className="text-sm text-green-700 font-semibold">💚 {s}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-black text-blue-700 mb-2">🚀 Improvements</h3>
                      <ul className="space-y-1">
                        {selectedResume.analysisReport.improvements?.slice(0, 3).map((imp, i) => (
                          <li key={i} className="text-sm text-blue-700 font-semibold">💙 {imp}</li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleDelete(selectedResume._id)}
                      className="w-full bg-red-300 hover:bg-red-400 text-red-900 font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow mt-4"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Resume
                    </button>
                  </div>
                ) : (
                  <p className="text-purple-700 text-sm font-semibold">No analysis data available</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
