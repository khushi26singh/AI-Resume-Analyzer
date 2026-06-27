import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Upload, Trash2, Loader, AlertCircle, FileText, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import ResumeUpload from '../components/ResumeUpload'

/* ── Score ring ─────────────────────────────────────────── */
function ScoreRing({ score }) {
  const radius = 52
  const circ = 2 * Math.PI * radius
  const offset = circ - (score / 100) * circ
  const isHigh = score >= 75
  const isMid = score >= 50
  const color = isHigh ? '#a855f7' : isMid ? '#f59e0b' : '#ef4444'
  const glow = isHigh ? 'rgba(168,85,247,0.35)' : isMid ? 'rgba(245,158,11,0.35)' : 'rgba(239,68,68,0.35)'
  const label = isHigh ? 'Strong match' : isMid ? 'Needs work' : 'Low match'
  const labelColor = isHigh ? 'text-purple-400' : isMid ? 'text-amber-400' : 'text-red-400'
  const bgAccent = isHigh ? 'bg-purple-950/30 border-purple-800/30' : isMid ? 'bg-amber-950/30 border-amber-800/30' : 'bg-red-950/30 border-red-800/30'

  return (
    <div className="flex flex-col items-center pt-8 pb-6 px-6">
      {/* Ring */}
      <div className="relative w-40 h-40 mb-5">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#1e0a3c" strokeWidth="9" />
          <circle
            cx="60" cy="60" r={radius} fill="none"
            stroke={color} strokeWidth="9"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)',
              filter: `drop-shadow(0 0 10px ${glow})`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-slate-100 leading-none">{score}</span>
          <span className="text-xs text-slate-500 mt-1.5 tracking-wide">/ 100</span>
        </div>
      </div>

      {/* Status badge */}
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${bgAccent} ${labelColor}`}>
        <TrendingUp className="w-3 h-3" />
        {label}
      </span>

      <p className="text-xs text-slate-500 mt-3 text-center leading-relaxed">
        {isHigh
          ? 'Your resume is well-optimized for ATS systems.'
          : isMid
            ? 'A few targeted changes could significantly boost your score.'
            : 'Consider a major revision to improve ATS compatibility.'}
      </p>
    </div>
  )
}

/* ── Stat card ───────────────────────────────────────────── */
function StatCard({ label, value, sub, accent }) {
  return (
    <div className="bg-[#1a1625] border border-purple-900/20 rounded-2xl p-6 flex flex-col gap-3 hover:border-purple-800/40 transition-colors duration-200">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{label}</p>
      <p className={`text-4xl font-bold leading-none ${accent || 'text-purple-200'}`}>{value}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  )
}

/* ── Section card ────────────────────────────────────────── */
function SectionCard({ title, titleColor = 'text-slate-400', borderColor = 'border-purple-900/20', children }) {
  return (
    <div className={`bg-[#1a1625] border ${borderColor} rounded-2xl p-6 hover:border-purple-800/30 transition-colors duration-200`}>
      <p className={`text-[11px] font-bold ${titleColor} uppercase tracking-widest mb-4`}>{title}</p>
      {children}
    </div>
  )
}

/* ── Main dashboard ──────────────────────────────────────── */
export default function Dashboard() {
  const { user, token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedResume, setSelectedResume] = useState(null)
  const [showUpload, setShowUpload] = useState(false)

  const API_BASE_URL = import.meta.env.VITE_API_URL || ''

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchResumes()
  }, [user, token])

  const fetchResumes = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/api/resumes`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setResumes(data.resumes)
      } else {
        setError('Failed to fetch resumes')
      }
    } catch {
      setError('Error fetching resumes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this resume?')) return
    try {
      const res = await fetch(`${API_BASE_URL}/api/resumes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        setResumes(prev => prev.filter(r => r._id !== id))
        setSelectedResume(null)
      }
    } catch {
      alert('Error deleting resume')
    }
  }

  const handleUploadSuccess = () => {
    setShowUpload(false)
    fetchResumes()
  }

  const bestScore = resumes.length
    ? Math.max(...resumes.map(r => r.analysisReport?.atsScore || 0))
    : null

  const report = selectedResume?.analysisReport

  return (
    <div className="min-h-screen w-full bg-[#0D0D12] text-slate-200 flex flex-col">
      <Navbar />

      <main className="w-full flex-1 px-4 sm:px-6 lg:px-10 py-10">

        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">
              Welcome back, <span className="text-purple-400 font-medium">{user?.name}</span>
            </p>
          </div>
          <button
            onClick={() => setShowUpload(v => !v)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 active:scale-95 text-purple-100 font-semibold py-2.5 px-5 rounded-xl transition-all duration-150 text-sm shadow-[0_0_24px_rgba(124,58,237,0.25)] hover:shadow-[0_0_32px_rgba(124,58,237,0.4)]"
          >
            <Upload className="w-4 h-4" />
            Analyze resume
          </button>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total analyzed" value={resumes.length} sub="resumes uploaded" />
          <StatCard
            label="Best ATS score"
            value={bestScore ?? '—'}
            sub="out of 100"
            accent={bestScore >= 75 ? 'text-purple-300' : bestScore >= 50 ? 'text-amber-300' : 'text-slate-300'}
          />
          <StatCard
            label="Latest upload"
            value={resumes.length
              ? new Date(resumes[0].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              : '—'}
            sub={resumes.length
              ? new Date(resumes[0].createdAt).toLocaleDateString('en-US', { weekday: 'long' })
              : 'no uploads yet'}
          />
        </div>

        {/* ── Upload panel ── */}
        {showUpload && (
          <div className="mb-8">
            <ResumeUpload onSuccess={handleUploadSuccess} onCancel={() => setShowUpload(false)} />
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-950/40 border border-red-800/40 rounded-xl mb-8">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}

        {/* ── Loading ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader className="w-7 h-7 animate-spin text-purple-500" />
            <p className="text-sm text-slate-500">Loading your resumes…</p>
          </div>

          /* ── Empty state ── */
        ) : resumes.length === 0 ? (
          <div className="bg-[#1a1625] border border-purple-900/20 rounded-2xl py-24 px-8 text-center">
            <div className="w-16 h-16 bg-purple-950/60 border border-purple-800/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-7 h-7 text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-200 mb-2">No resumes yet</h2>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
              Upload your first resume to get an AI-powered ATS compatibility score,
              keyword suggestions, and actionable improvements.
            </p>
            <button
              onClick={() => setShowUpload(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 active:scale-95 text-purple-100 font-semibold py-2.5 px-6 rounded-xl transition-all duration-150 text-sm shadow-[0_0_20px_rgba(124,58,237,0.2)]"
            >
              <Upload className="w-4 h-4" />
              Upload your first resume
            </button>
          </div>

          /* ── Main content ── */
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch min-h-full">

            {/* ── Left column ── */}
            <div className="lg:col-span-1 flex flex-col gap-5">

              {/* Resume list */}
              <div className="bg-[#1a1625] border border-purple-900/20 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-purple-900/20">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Your resumes</p>
                </div>

                <div className="divide-y divide-[#0F0A1E] max-h-[380px] overflow-y-auto custom-scrollbar">
                  {resumes.map((resume) => {
                    const isSelected = selectedResume?._id === resume._id
                    const score = resume.analysisReport?.atsScore
                    const scoreColor = score >= 75 ? 'text-purple-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'

                    return (
                      <div
                        key={resume._id}
                        onClick={() => setSelectedResume(resume)}
                        className={`group flex items-center justify-between px-5 py-4 cursor-pointer transition-all duration-150 ${isSelected
                          ? 'bg-purple-950/30 border-l-2 border-l-purple-500 pl-[18px]'
                          : 'hover:bg-purple-950/15 border-l-2 border-l-transparent'
                          }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150 ${isSelected ? 'bg-purple-900/50' : 'bg-purple-950/40 group-hover:bg-purple-900/40'
                            }`}>
                            <FileText className="w-3.5 h-3.5 text-purple-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-200 truncate leading-tight">{resume.fileName}</p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {new Date(resume.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        {resume.analysisReport && (
                          <div className="shrink-0 ml-4 text-right">
                            <p className={`text-lg font-bold leading-none ${scoreColor}`}>{score}</p>
                            <p className="text-[10px] text-slate-600 mt-0.5 uppercase tracking-wide">ATS</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Score ring card */}
              {report && (
                <div className="bg-[#1a1625] border border-purple-900/20 rounded-2xl overflow-hidden">
                  <ScoreRing score={report.atsScore} />

                  {/* Keywords */}
                  {report.keywordSuggestions?.length > 0 && (
                    <div className="px-6 pb-5 border-t border-purple-900/20 pt-5">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Suggested keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {report.keywordSuggestions.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-purple-950/50 border border-purple-800/40 hover:border-purple-600/60 hover:bg-purple-900/40 rounded-full text-xs text-purple-300 transition-colors duration-150 cursor-default"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Delete */}
                  <div className="px-6 pb-6 pt-4 border-t border-purple-900/20">
                    <button
                      onClick={() => handleDelete(selectedResume._id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-red-950/20 hover:bg-red-950/50 border border-red-900/30 hover:border-red-700/50 text-red-500 hover:text-red-300 rounded-xl transition-all duration-150 text-sm font-medium active:scale-95"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete resume
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Right column ── */}
            <div className="lg:col-span-3 flex flex-col gap-5">

              {/* Placeholder */}
              {!selectedResume ? (
                <div className="bg-[#1a1625] border border-purple-900/20 rounded-2xl min-h-[280px] flex flex-col items-center justify-center gap-3 px-8 text-center">
                  <div className="w-12 h-12 bg-purple-950/40 border border-purple-800/30 rounded-xl flex items-center justify-center mb-1">
                    <FileText className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-400">No resume selected</p>
                  <p className="text-xs text-slate-600 max-w-xs leading-relaxed">Click any resume on the left to view its full AI analysis report here.</p>
                </div>

              ) : !report ? (
                <div className="bg-[#1a1625] border border-purple-900/20 rounded-2xl p-8">
                  <p className="text-sm text-slate-500">No analysis data available for this resume.</p>
                </div>

              ) : (
                <>
                  {/* Summary */}
                  <SectionCard title="Summary">
                    <p className="text-sm text-slate-300 leading-relaxed">{report.summary}</p>
                  </SectionCard>

                  {/* Strengths + Weaknesses side by side on wider screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {report.strengths?.length > 0 && (
                      <SectionCard title="Strengths" titleColor="text-emerald-400/80" borderColor="border-emerald-900/20">
                        <ul className="space-y-3">
                          {report.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                              </div>
                              <span className="text-sm text-slate-300 leading-relaxed">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </SectionCard>
                    )}

                    {report.weaknesses?.length > 0 && (
                      <SectionCard title="Weaknesses" titleColor="text-amber-400/80" borderColor="border-amber-900/20">
                        <ul className="space-y-3">
                          {report.weaknesses.map((w, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-amber-950/60 border border-amber-800/40 flex items-center justify-center shrink-0 mt-0.5">
                                <AlertTriangle className="w-3 h-3 text-amber-400" />
                              </div>
                              <span className="text-sm text-slate-300 leading-relaxed">{w}</span>
                            </li>
                          ))}
                        </ul>
                      </SectionCard>
                    )}
                  </div>

                  {/* Improvements */}
                  {report.improvements?.length > 0 && (
                    <SectionCard title="Recommended improvements" titleColor="text-purple-400/80" borderColor="border-purple-900/20">
                      <ol className="space-y-4">
                        {report.improvements.map((imp, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <span className="w-6 h-6 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold text-purple-400">
                              {i + 1}
                            </span>
                            <span className="text-sm text-slate-300 leading-relaxed">{imp}</span>
                          </li>
                        ))}
                      </ol>
                    </SectionCard>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
