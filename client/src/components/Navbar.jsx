import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { LogOut, Home } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 shadow-xl border-b-4 border-purple-300">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">✨</span>
          </div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Resume Analyzer</h1>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-purple-700 hover:text-purple-900 flex items-center gap-2 font-bold hover:bg-purple-100 px-3 py-2 rounded-lg transition"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </Link>

          <div className="flex items-center gap-3 pl-6 border-l-2 border-purple-300">
            <div className="text-right">
              <p className="text-sm font-black text-purple-900">{user?.name}</p>
              <p className="text-xs text-purple-600">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-bold bg-red-100 hover:bg-red-200 px-3 py-2 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
