import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Users, Search, Filter, Mail, MapPin, Star, ChevronRight } from "lucide-react";

const FacultyDirectory = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("/api/teachers");
        setTeachers(res.data);
      } catch (err) {
        console.error("Error fetching faculty", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="py-12">
      <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="max-w-2xl">
          <div className="label-mono mb-3 text-blue-600">Expertise Network</div>
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Academic Faculty</h1>
          <p className="text-lg text-slate-500 font-medium">Browse our world-class faculty members, researchers, and subject matter experts.</p>
        </div>
        <div className="w-full md:w-[400px] relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 font-bold" />
          <input 
            type="text" 
            placeholder="Search by name, department..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-14 pr-6 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {teachers.map((t) => (
          <Link to={`/teachers/${t._id}`} key={t._id} className="app-card group !p-0 overflow-hidden flex flex-col h-full hover:translate-y-[-4px]">
            <div className="h-64 bg-slate-100 relative overflow-hidden">
               <img 
                 src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} 
                 alt={t.name} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
               <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 shadow-sm uppercase tracking-tight">
                    {t.department}
                  </div>
               </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {t.title} {t.name}
                </h3>
                <p className="text-sm text-slate-500 font-medium line-clamp-3 leading-relaxed mb-8 italic">
                  {t.bio || "Bringing decades of research and industry experience to the classroom environment."}
                </p>
                
                <div className="space-y-3 mb-10 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                    <Mail className="w-4 h-4 text-slate-300" />
                    <span>{t.contact?.email || 'faculty@acadlink.edu'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                    <MapPin className="w-4 h-4 text-slate-300" />
                    <span>{t.contact?.office || 'Academic Hall, Room 302'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                 <div className="flex items-center gap-1.5">
                    {[1,2,3,4,5].map(s => (
                      <Star 
                        key={s} 
                        className={`w-3.5 h-3.5 ${s <= Math.round(t.rating) ? 'fill-blue-600 text-blue-600' : 'text-slate-200'}`} 
                      />
                    ))}
                    <span className="text-xs font-black text-slate-900 ml-2">{t.rating > 0 ? t.rating.toFixed(1) : "N/A"}</span>
                 </div>
                 <div className="text-xs font-black text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-tight">
                   Profile <ChevronRight className="w-3.5 h-3.5" />
                 </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FacultyDirectory;
