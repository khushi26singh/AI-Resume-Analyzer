import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { LogOut, LayoutDashboard } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0D0D12]/80 backdrop-blur-md border-b border-purple-950">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-purple-950 border border-purple-700 rounded-lg flex items-center justify-center">
            <span className="text-purple-400 text-xs font-bold">iR</span>
          </div>
          <span className="font-bold text-base text-purple-200 tracking-tight">
            i<span className="text-purple-500">Resume</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className="hidden sm:flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-purple-950/40 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>

          <div className="hidden sm:flex items-center gap-3 pl-3 ml-1 border-l border-purple-950">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-300 leading-none">{user?.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-950/30 transition-colors ml-1"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
