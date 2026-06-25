import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { AlertCircle, Loader } from 'lucide-react'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState(null)
  const { register, loading, error } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError(null)

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters')
      return
    }

    const success = await register(name, email, password)
    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D12] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-bold text-xl text-purple-200 tracking-tight">
            i<span className="text-purple-500">Resume</span>
          </span>
        </div>

        <div className="bg-[#12101E] border border-purple-950 rounded-2xl p-8">

          {/* Header */}
          <div className="mb-7">
            <div className="w-10 h-10 bg-purple-950 border border-purple-800 rounded-xl flex items-center justify-center mb-5">
              <span className="text-purple-400 text-lg">✦</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-1">Create account</h1>
            <p className="text-sm text-slate-500">Start optimizing your resume for free</p>
          </div>

          {/* Error */}
          {(error || localError) && (
            <div className="flex items-center gap-2 p-3 bg-red-950/50 border border-red-800/50 rounded-xl mb-5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-red-400 text-sm">{error || localError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#0D0D12] border border-purple-950 rounded-lg text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-purple-600 transition-colors"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#0D0D12] border border-purple-950 rounded-lg text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-purple-600 transition-colors"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#0D0D12] border border-purple-950 rounded-lg text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-purple-600 transition-colors"
                placeholder="Min. 6 characters"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#0D0D12] border border-purple-950 rounded-lg text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-purple-600 transition-colors"
                placeholder="Repeat password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 text-purple-100 disabled:text-slate-500 font-semibold py-2.5 px-4 rounded-lg transition-all text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.25)]"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
