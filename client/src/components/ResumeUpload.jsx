import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react'

export default function ResumeUpload({ onSuccess, onCancel }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { token } = useContext(AuthContext)

  const API_BASE_URL = ''

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setResult(null)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!file) {
      setError('Please select a file to upload')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('resume', file)

      const response = await axios.post(`${API_BASE_URL}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })

      setResult(response.data.report)
      setFile(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze resume')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-800">Analysis Complete</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <p className="text-gray-600 text-sm font-semibold mb-2">ATS SCORE</p>
            <p className="text-5xl font-bold text-blue-600">{result.atsScore}</p>
            <p className="text-gray-600 text-xs mt-1">/100</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
            <p className="text-gray-600 text-sm font-semibold mb-2">SUMMARY</p>
            <p className="text-gray-700 text-sm">{result.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Strengths</h3>
            <ul className="space-y-2">
              {result.strengths?.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2 text-green-700 bg-green-50 p-2 rounded">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Weaknesses</h3>
            <ul className="space-y-2">
              {result.weaknesses?.map((weakness, idx) => (
                <li key={idx} className="flex items-start gap-2 text-red-700 bg-red-50 p-2 rounded">
                  <AlertCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Improvements</h3>
          <ul className="space-y-2">
            {result.improvements?.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-2 text-blue-700 bg-blue-50 p-3 rounded">
                <span className="text-lg font-semibold text-blue-600 flex-shrink-0">{idx + 1}.</span>
                <span className="text-sm">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Keyword Suggestions</h3>
          <div className="flex flex-wrap gap-2">
            {result.keywordSuggestions?.map((keyword, idx) => (
              <span key={idx} className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => {
              setResult(null)
              setFile(null)
              onSuccess()
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
          >
            Analyze Another
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <form onSubmit={handleUpload} className="space-y-6">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-blue-500 mb-2" />
              <p className="text-sm text-gray-500">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-400">PDF, DOC, or DOCX</p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              disabled={loading}
            />
          </label>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!file || loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Resume'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
