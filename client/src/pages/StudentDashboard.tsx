import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  Terminal, 
  Search, 
  Filter, 
  ChevronRight, 
  Clock, 
  Layers, 
  Star,
  Bell,
  Cpu,
  Zap,
  Users,
  PlusCircle,
  LayoutDashboard,
  BookOpen,
  Activity
} from "lucide-react";
import { motion } from "motion/react";

const StudentDashboard = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const currentCourses = [
    { id: "1", code: "CS-401", title: "Artificial Intelligence", teacher: "Dr. Sarah Mitchell", progress: 85, color: "bg-blue-600" },
    { id: "2", code: "ENG-320", title: "Technical Writing", teacher: "Prof. Robert Chen", progress: 45, color: "bg-teal-500" }
  ];

  const notifications = [
    { type: "Assignment", msg: "AI Lab 3 submission verified.", time: "2 hours ago", color: "bg-blue-500" },
    { type: "Announcement", msg: "Term finals schedule published.", time: "5 hours ago", color: "bg-amber-500" },
    { type: "Faculty", msg: "Prof. Mitchell shared new reading material.", time: "1 day ago", color: "bg-teal-500" }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Side Navigation */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="space-y-1">
          <label className="label-mono mb-4 px-4 block">Navigation</label>
          <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold flex items-center gap-3 transition-all">
            <LayoutDashboard className="w-5 h-5" /> Overview
          </button>
          <Link to="/my-enrollments" className="w-full text-left px-4 py-3 hover:bg-slate-100 rounded-xl text-slate-600 font-medium flex items-center gap-3 transition-all">
            <BookOpen className="w-5 h-5" /> My Courses
          </Link>
          <Link to="/teachers" className="w-full text-left px-4 py-3 hover:bg-slate-100 rounded-xl text-slate-600 font-medium flex items-center gap-3 transition-all">
            <Users className="w-5 h-5" /> Faculty Directory
          </Link>
          <button className="w-full text-left px-4 py-3 hover:bg-slate-100 rounded-xl text-slate-600 font-medium flex items-center gap-3 transition-all">
            <Activity className="w-5 h-5" /> Performance
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-slate-100 rounded-xl text-slate-600 font-medium flex items-center gap-3 transition-all">
            <Bell className="w-5 h-5" /> Notifications
          </button>
        </div>
        
        <div className="mt-12 p-6 bg-slate-900 rounded-2xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="font-bold mb-2">Upgrade to Pro</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">Get advanced AI course matching and early access.</p>
            <button className="w-full py-2 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">Learn More</button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/30 rounded-full blur-2xl"></div>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="label-mono mb-2 text-blue-600">Scholar Dashboard</div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Academic Overview</h1>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary flex items-center gap-2"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-primary flex items-center gap-2"><PlusCircle className="w-4 h-4" /> Enroll New</button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          <div className="xl:col-span-2 space-y-12">
            {/* Current Semester Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Current Semester</h2>
                <Link to="/my-enrollments" className="text-sm font-bold text-blue-600 hover:underline">View All</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentCourses.map((mod) => (
                  <div key={mod.id} className="app-card border-slate-100 shadow-md shadow-slate-100/50">
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 tracking-tight">{mod.code}</span>
                      <button className="text-slate-300 hover:text-slate-900 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{mod.title}</h3>
                    <p className="text-sm text-slate-500 font-medium mb-8">{mod.teacher}</p>
                    
                    <div>
                      <div className="flex justify-between items-end text-xs mb-2">
                        <span className="text-slate-400 font-bold uppercase tracking-tighter">Course Progress</span>
                        <span className="text-slate-900 font-black">{mod.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${mod.progress}%` }}
                          className={`h-full ${mod.color}`}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommendations */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Personalized for You</h2>
                <span className="label-mono !text-teal-600">AI Verified</span>
              </div>
              <div className="space-y-4">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-2xl"></div>)}
                  </div>
                ) : courses.slice(0, 3).map((course) => (
                  <Link to={`/courses/${course._id}`} key={course._id} className="app-card flex flex-col md:flex-row items-center !p-0 overflow-hidden group">
                    <div className="w-full md:w-32 h-32 bg-slate-50 flex-shrink-0 flex items-center justify-center border-r border-slate-100 group-hover:bg-blue-50 transition-colors">
                      <Layers className="w-8 h-8 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                        <span className="text-[10px] font-bold text-teal-600 px-2 py-0.5 bg-teal-50 rounded-full">98% Match</span>
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-1 italic">"{course.description}"</p>
                    </div>
                    <div className="p-6 md:border-l border-slate-100">
                       <ChevronRight className="w-6 h-6 text-slate-200 group-hover:translate-x-1 transition-transform group-hover:text-blue-500" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar Area */}
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h2>
              <div className="app-card !p-0 overflow-hidden divide-y divide-slate-100">
                {notifications.map((n, i) => (
                  <div key={i} className="p-5 flex gap-4 hover:bg-slate-50 transition-colors">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${n.color}`}></div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">{n.type}</div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed mb-1">{n.msg}</p>
                      <div className="text-[10px] font-bold text-slate-400">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="app-card bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none relative overflow-hidden group">
               <div className="relative z-10">
                 <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                   <Star className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Feedback Loop</h3>
                 <p className="text-blue-100 text-xs mb-8 leading-relaxed">Your honest reviews help shape a better university experience for everyone.</p>
                 <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">Review Classes</button>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
