import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Zap, BarChart3, Shield, ArrowRight, Upload } from 'lucide-react'

export default function Home() {
  const { user, token } = useContext(AuthContext)
  const navigate = useNavigate()

  if (user && token) {
    navigate('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen bg-[#0D0D12] text-slate-200">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0D0D12]/80 backdrop-blur-md border-b border-purple-950">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-purple-950 border border-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-purple-400 text-xs font-bold">iR</span>
            </div>
            <span className="font-bold text-base text-purple-200 tracking-tight">
              i<span className="text-purple-500">Resume</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-slate-400 hover:text-slate-200 px-4 py-2 rounded-lg hover:bg-purple-950/40 transition-colors font-medium"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate('/register')}
              className="text-sm bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-purple-100 font-semibold px-4 py-2 rounded-lg transition-all shadow-[0_0_16px_rgba(124,58,237,0.2)]"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20 sm:pb-28 text-center relative">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-purple-900/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-950/60 border border-purple-800/50 rounded-full text-xs text-purple-300 font-medium mb-8">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            Powered by Gemini AI
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-slate-100 leading-tight mb-6 tracking-tight">
            Your resume,{' '}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              ATS-optimized
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed mb-10">
            Upload your resume and get an instant AI-powered score with keyword suggestions,
            strengths analysis, and actionable improvements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 active:scale-95 text-purple-100 font-semibold py-3 px-8 rounded-lg transition-all text-sm shadow-[0_0_24px_rgba(124,58,237,0.3)] hover:shadow-[0_0_32px_rgba(124,58,237,0.5)]"
            >
              Analyze your resume
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 border border-purple-900/40 hover:border-purple-700 active:scale-95 px-8 py-3 rounded-lg transition-all"
            >
              Sign in
            </button>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-purple-950 bg-purple-950/10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-center">
          {[
            { value: '94%', label: 'Average score lift' },
            { value: '< 2s', label: 'Analysis time' },
            { value: '12k+', label: 'Resumes analyzed' },
          ].map(({ value, label }) => (
            <div key={label} className="group">
              <p className="text-4xl font-extrabold text-purple-200 group-hover:text-purple-400 transition-colors duration-300">{value}</p>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-slate-100 text-center mb-12 tracking-tight">Everything you need to get hired faster</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap className="w-5 h-5 text-purple-400" />,
              title: 'Instant analysis',
              desc: 'Get real-time AI feedback with a full breakdown in under two seconds — no waiting, no queues.',
            },
            {
              icon: <BarChart3 className="w-5 h-5 text-purple-400" />,
              title: 'ATS score',
              desc: 'See exactly how your resume performs against Applicant Tracking Systems with a 0–100 compatibility score.',
            },
            {
              icon: <Shield className="w-5 h-5 text-purple-400" />,
              title: 'Secure & private',
              desc: 'Your documents are stored with encryption and are only ever accessible by you.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-[#12101E]/60 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6 hover:border-purple-500/30 hover:bg-[#1a1625] hover:-translate-y-1 transition-all duration-300">
              <div className="w-9 h-9 bg-purple-950 border border-purple-800/50 rounded-lg flex items-center justify-center mb-4 transition-all group-hover:scale-110">
                {icon}
              </div>
              <h3 className="text-base font-semibold text-slate-200 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#12101E]/60 backdrop-blur-sm border border-purple-900/20 rounded-2xl p-6 sm:p-10 lg:p-14">
          <h2 className="text-3xl font-bold text-slate-100 text-center mb-12 tracking-tight">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: '01', title: 'Upload your resume', desc: 'Drag and drop or browse for a PDF or DOCX file.' },
              { step: '02', title: 'AI analysis runs', desc: 'Gemini reads your resume and scores it against ATS patterns.' },
              { step: '03', title: 'Act on feedback', desc: 'Get a detailed report with keywords, strengths, and improvements.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-950 border border-purple-800/50 group-hover:border-purple-500/40 rounded-xl mb-5 transition-all duration-300">
                  <span className="text-sm font-bold text-purple-400">{step}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-200 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed px-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="border-t border-purple-950">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-3">Ready to improve your resume?</h2>
          <p className="text-sm text-slate-500 mb-8">Join thousands of job seekers already using iResume.</p>
          <button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 active:scale-95 text-purple-100 font-semibold py-3 px-8 rounded-lg transition-all text-sm shadow-[0_0_24px_rgba(124,58,237,0.3)]"
          >
            <Upload className="w-4 h-4" />
            Get started free
          </button>
        </div>
      </section>
    </div>
  )
}
