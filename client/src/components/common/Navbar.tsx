import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Shield, BookOpen, Users, LogOut, LayoutDashboard, Settings } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <Shield className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Acad<span className="text-blue-600">Link</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          {user && (
            <>
              <Link to="/dashboard" className="hover:text-blue-600 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-blue-50">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/my-enrollments" className="hover:text-blue-600 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-blue-50">
                <BookOpen className="w-4 h-4" /> My Courses
              </Link>
              <Link to="/teachers" className="hover:text-blue-600 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-blue-50">
                <Users className="w-4 h-4" /> Faculty
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 text-sm font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">{user.name}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1 uppercase tracking-tight">{user.role}</div>
                </div>
              </div>
              <button onClick={logout} className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Log In</Link>
              <Link to="/register" className="btn-primary py-2 px-6">Sign Up Free</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
