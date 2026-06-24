import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { AlertCircle, Loader } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-purple-200">
        <div className="text-5xl text-center mb-4">💕</div>
        <h1 className="text-4xl font-black text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Welcome Back!</h1>
        <p className="text-center text-purple-600 font-semibold mb-6">Sign in to your account ✨</p>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-100 border-2 border-red-300 rounded-2xl mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 text-sm font-semibold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-purple-700 mb-2">📧 Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-purple-50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-purple-700 mb-2">🔐 Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-purple-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              '💜 Sign In'
            )}
          </button>
        </form>

        <p className="text-center text-purple-700 font-semibold mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-pink-500 hover:underline font-black">
            Sign up here!
          </Link>
        </p>
      </div>
    </div>
  )
}
