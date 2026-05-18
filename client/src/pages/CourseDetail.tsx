import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  ChevronLeft, 
  Cpu, 
  Clock, 
  Users, 
  Layers, 
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Plus
} from "lucide-react";
import { motion } from "motion/react";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, teachersRes] = await Promise.all([
          axios.get(`/api/courses/${id}`),
          axios.get("/api/teachers")
        ]);
        setCourse(courseRes.data);
        setTeachers(teachersRes.data);
      } catch (err) {
        console.error("Error fetching course data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEnroll = async () => {
    if (!selectedTeacher) {
      alert("Please select a faculty member for this course.");
      return;
    }
    setEnrolling(true);
    try {
      await axios.post("/api/enrollments", { 
        courseId: id, 
        teacherId: selectedTeacher 
      });
      navigate("/my-enrollments");
    } catch (err: any) {
      alert(err.response?.data?.message || "Enrollment failed. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  if (!course) return <div className="text-center py-20 font-bold text-slate-500">Course not found.</div>;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-12 font-bold text-xs uppercase tracking-widest group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      {/* Hero Section */}
      <div className="app-card !p-12 mb-12 border-none bg-slate-900 text-white relative overflow-hidden">
         <div className="relative z-10">
           <div className="flex flex-wrap gap-4 mb-8">
             <span className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider">Core Course</span>
             <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-wider">{course.credits} Credits</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
             {course.title}
           </h1>
           <p className="max-w-3xl text-slate-400 text-xl font-medium leading-relaxed">
             {course.description}
           </p>
         </div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Syllabus Section */}
          <section className="app-card">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Curriculum Overview</h2>
            </div>
            <div className="space-y-8">
               {[
                 { m: "Module 01", title: "Foundational Principles", desc: "Introduction to the core methodologies and theoretical frameworks." },
                 { m: "Module 02", title: "Practical Application", desc: "Hands-on projects focusing on real-world implementation strategies." },
                 { m: "Module 03", title: "Advanced Integration", desc: "Complex system design and multi-disciplinary project coordination." }
               ].map((mod, i) => (
                 <div key={i} className="flex gap-8 group">
                   <div className="text-blue-600 font-black text-xs uppercase tracking-widest mt-1.5 whitespace-nowrap">{mod.m}</div>
                   <div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{mod.title}</h3>
                     <p className="text-slate-500 font-medium leading-relaxed">{mod.desc}</p>
                   </div>
                 </div>
               ))}
            </div>
          </section>

          {/* Teacher Selection */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                  <Users className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Assign Faculty</h2>
              </div>
              <span className="label-mono">Required Step</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {teachers.map((t) => (
                 <div 
                   key={t._id} 
                   onClick={() => setSelectedTeacher(t._id)}
                   className={`app-card !p-8 cursor-pointer transition-all border-2 ${selectedTeacher === t._id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100'}`}
                 >
                   <div className="text-center">
                     <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-sm">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} alt={t.name} className="w-full h-full object-cover" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-1">{t.title} {t.name}</h3>
                     <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">{t.department}</p>
                     
                     <div className="flex justify-center gap-1 mb-8">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(t.rating) ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}`} />
                        ))}
                     </div>
                     
                     {selectedTeacher === t._id ? (
                        <div className="bg-blue-600 text-white py-2 rounded-lg text-xs font-black flex items-center justify-center gap-2">
                           <CheckCircle2 className="w-4 h-4" /> Selected
                        </div>
                     ) : (
                        <div className="bg-white border-2 border-slate-100 text-slate-400 py-2 rounded-lg text-xs font-black group-hover:border-slate-200 transition-colors">Select Faculty</div>
                     )}
                   </div>
                 </div>
               ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
           <section className="app-card !bg-amber-50 border-amber-100">
             <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Prerequisites</h2>
             </div>
             <ul className="space-y-4">
                {[
                  "Completion of Introductory Core 101",
                  "Verified Departmental Ethics Clearance",
                  "Minimum Cumulative GPA 3.2"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm font-semibold text-slate-600 items-start">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
             </ul>
           </section>

           <section className="app-card">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Course Schedule</h2>
              </div>
              <div className="space-y-3 font-bold text-xs uppercase tracking-wider">
                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400">Tuesdays</span>
                    <span className="text-slate-900 font-black">18:00 — 21:00</span>
                 </div>
                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400">Thursdays</span>
                    <span className="text-slate-900 font-black">18:00 — 21:00</span>
                 </div>
              </div>
           </section>

           <button 
             onClick={handleEnroll}
             disabled={enrolling || !selectedTeacher}
             className="w-full btn-primary py-6 flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/20 text-xl disabled:grayscale"
           >
             {enrolling ? "Processing..." : <>Enroll in Course <Plus className="w-6 h-6" /></>}
           </button>
        </div>
      </div>
    </div>
  );
};

import { Star } from "lucide-react";

export default CourseDetail;
