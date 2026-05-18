import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Star,
  ExternalLink
} from "lucide-react";

const MyEnrollments = () => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get("/api/enrollments/my");
        setEnrollments(res.data);
      } catch (err) {
        console.error("Error fetching enrollments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-12">
      <header className="mb-16">
        <div className="label-mono mb-3 text-blue-600">Personalized Learning</div>
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">My Course Enrollments</h1>
        <p className="text-lg text-slate-500 font-medium mt-4">Manage your current academic schedule and assigned faculty members.</p>
      </header>

      <div className="space-y-8">
        {enrollments.length > 0 ? (
          enrollments.map((enr) => (
            <div key={enr._id} className="app-card group !p-0 flex flex-col md:flex-row overflow-hidden hover:shadow-xl transition-all">
              <div className="md:w-56 bg-slate-50 p-10 flex flex-col items-center justify-center border-r border-slate-100 group-hover:bg-blue-50 transition-colors">
                <BookOpen className="w-16 h-16 text-slate-300 group-hover:text-blue-500 transition-colors mb-4" />
                <span className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest">{enr.course.code || "CRS-100"}</span>
              </div>
              <div className="p-10 flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-tight">{enr.course.title}</h3>
                    <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-300" /> Academic Block D</span>
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-300" /> Tue / Thu • 18:00</span>
                    </div>
                  </div>
                  <div className="md:text-right border-l md:border-l-0 md:border-r border-slate-100 pl-6 md:pl-0 md:pr-6 h-fit">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Academic Advisor</div>
                    <Link to={`/teachers/${enr.preferredTeacher?._id}`} className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                      {enr.preferredTeacher ? `Prof. ${enr.preferredTeacher.name}` : "Not Assigned"}
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                   <div className="flex gap-4">
                      <Link to={`/courses/${enr.course._id}`} className="text-xs font-black text-slate-400 hover:text-blue-600 flex items-center gap-2 transition-colors uppercase tracking-widest">
                        View Resources <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link to={`/teachers/${enr.preferredTeacher?._id}`} className="text-xs font-black text-slate-400 hover:text-blue-600 flex items-center gap-2 transition-colors uppercase tracking-widest">
                        Send Feedback <Star className="w-4 h-4" />
                      </Link>
                   </div>
                   <div className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                     Session Active
                   </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="app-card text-center py-32 border-dashed border-2">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <BookOpen className="w-10 h-10 text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold text-xl mb-12">You haven't enrolled in any courses yet.</p>
            <Link to="/dashboard" className="btn-primary py-4 px-10">Browse Courses</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrollments;
