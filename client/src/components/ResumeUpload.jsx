import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Upload, CheckCircle, AlertCircle, Loader, FileText, X } from 'lucide-react'

export default function ResumeUpload({ onSuccess, onCancel }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
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

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) {
      setFile(dropped)
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

  /* ── Result view ── */
  if (result) {
    return (
      <div className="bg-[#12101E] border border-purple-950 rounded-2xl p-6 space-y-6">

        {/* Result header */}
        <div className="flex items-center gap-3 pb-5 border-b border-purple-950">
          <div className="w-8 h-8 bg-purple-950 border border-purple-700 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-100">Analysis complete</h2>
            <p className="text-xs text-slate-500">Your resume has been scored</p>
          </div>
        </div>

        {/* Score + Summary row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#0D0D12] border border-purple-950 rounded-xl p-5 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">ATS score</p>
            <p
              className="text-5xl font-bold text-purple-400 leading-none"
              style={{ textShadow: '0 0 30px rgba(168,85,247,0.4)' }}
            >
              {result.atsScore}
            </p>
            <p className="text-xs text-slate-500 mt-2">out of 100</p>
          </div>

          <div className="bg-[#0D0D12] border border-purple-950 rounded-xl p-5">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Summary</p>
            <p className="text-sm text-slate-400 leading-relaxed">{result.summary}</p>
          </div>
        </div>

        {/* Strengths + Weaknesses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Strengths</p>
            <ul className="space-y-2">
              {result.strengths?.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-500 mt-0.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Weaknesses</p>
            <ul className="space-y-2">
              {result.weaknesses?.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <AlertCircle className="w-3.5 h-3.5 text-fuchsia-500 mt-0.5 shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Improvements */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Improvements</p>
          <ol className="space-y-2">
            {result.improvements?.map((imp, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                <span className="text-xs font-bold text-purple-500 mt-0.5 w-4 shrink-0">{i + 1}.</span>
                {imp}
              </li>
            ))}
          </ol>
        </div>

        {/* Keywords */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Keyword suggestions</p>
          <div className="flex flex-wrap gap-2">
            {result.keywordSuggestions?.map((kw, i) => (
              <span key={i} className="px-3 py-1 bg-purple-950/60 border border-purple-800/50 rounded-full text-xs text-purple-300 font-medium">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => { setResult(null); setFile(null); onSuccess() }}
            className="flex-1 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-purple-100 font-semibold py-2.5 px-4 rounded-lg transition-all text-sm"
          >
            Analyze another
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-[#0D0D12] hover:bg-purple-950/30 border border-purple-950 text-slate-300 font-semibold py-2.5 px-4 rounded-lg transition-all text-sm"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  /* ── Upload form ── */
  return (
    <div className="bg-[#12101E] border border-purple-950 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-slate-100">Analyze resume</h2>
          <p className="text-xs text-slate-500 mt-0.5">Upload a PDF or Word document</p>
        </div>
        <button onClick={onCancel} className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleUpload} className="space-y-4">

        {/* Drop zone */}
        <label
          className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            dragOver
              ? 'border-purple-500 bg-purple-950/20'
              : file
              ? 'border-purple-700 bg-purple-950/10'
              : 'border-purple-950 hover:border-purple-700 hover:bg-purple-950/10'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex items-center gap-3 px-6">
              <FileText className="w-5 h-5 text-purple-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB · ready to analyze</p>
              </div>
            </div>
          ) : (
            <div className="text-center px-6">
              <Upload className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-slate-300 font-medium">Drop your resume here</p>
              <p className="text-xs text-slate-500 mt-1">or click to browse · PDF or DOCX · max 5 MB</p>
            </div>
          )}
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            disabled={loading}
          />
        </label>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-800/40 rounded-xl">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!file || loading}
            className="flex-1 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 text-purple-100 disabled:text-slate-500 font-semibold py-2.5 px-4 rounded-lg transition-all text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze resume'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-[#0D0D12] hover:bg-purple-950/30 border border-purple-950 text-slate-300 font-semibold py-2.5 px-4 rounded-lg transition-all text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
