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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome, {user?.name}!</p>
          </div>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition"
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
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-8">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No resumes yet</h2>
            <p className="text-gray-600 mb-6">Upload your first resume to get started with AI analysis</p>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Upload Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 gap-0">
                  {resumes.map((resume, idx) => (
                    <div
                      key={resume._id}
                      className={`p-4 border-b cursor-pointer transition ${
                        selectedResume?._id === resume._id
                          ? 'bg-blue-50 border-l-4 border-l-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedResume(resume)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{resume.fileName}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(resume.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        {resume.analysisReport && (
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">
                              {resume.analysisReport.atsScore}
                            </p>
                            <p className="text-xs text-gray-500">ATS Score</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedResume && (
              <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Analysis Details</h2>

                {selectedResume.analysisReport ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">ATS Score</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {selectedResume.analysisReport.atsScore}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Summary</h3>
                      <p className="text-gray-700 text-sm">
                        {selectedResume.analysisReport.summary}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Strengths</h3>
                      <ul className="space-y-1">
                        {selectedResume.analysisReport.strengths?.slice(0, 3).map((s, i) => (
                          <li key={i} className="text-sm text-green-700">• {s}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Improvements</h3>
                      <ul className="space-y-1">
                        {selectedResume.analysisReport.improvements?.slice(0, 3).map((imp, i) => (
                          <li key={i} className="text-sm text-blue-700">• {imp}</li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleDelete(selectedResume._id)}
                      className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition mt-4"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">No analysis data available</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
