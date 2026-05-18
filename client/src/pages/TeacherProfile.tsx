import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  ShieldCheck, 
  Star, 
  MessageSquare, 
  Send, 
  Info,
  Clock,
  BookOpen,
  ChevronLeft,
  Users
} from "lucide-react";
import { motion } from "motion/react";

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({
    rating: 0,
    difficulty: 5,
    comment: "",
    anonymous: true,
    courseId: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`/api/teachers/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching teacher", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeacher();
  }, [id]);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.courseId || feedback.rating === 0) {
      alert("Please select a course and provide a rating.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post("/api/feedback", {
        teacherId: id,
        courseId: feedback.courseId,
        rating: feedback.rating,
        comment: feedback.comment,
        difficulty: feedback.difficulty,
        anonymous: feedback.anonymous
      });
      alert("Your feedback has been submitted successfully.");
      // Refresh teacher data
      const res = await axios.get(`/api/teachers/${id}`);
      setData(res.data);
      setFeedback({ ...feedback, rating: 0, comment: "", difficulty: 5 });
    } catch (err) {
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  if (!data) return <div className="text-center py-20 font-bold text-slate-500">Faculty member not found.</div>;

  const { teacher, feedback: reviews } = data;

  return (
    <div className="max-w-6xl mx-auto py-12">
       <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-12 font-bold text-xs uppercase tracking-widest group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Directory
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Profile Column */}
        <div className="lg:col-span-4 space-y-8">
          <div className="app-card !p-12 text-center shadow-xl shadow-slate-100">
             <div className="w-40 h-40 rounded-full bg-slate-50 border-4 border-white shadow-md mx-auto mb-8 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher.name}`} alt={teacher.name} className="w-full h-full object-cover" />
             </div>
             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">{teacher.title} {teacher.name}</h1>
             <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-10">{teacher.department}</p>
             
             <div className="flex justify-center gap-2 mb-12">
                <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase tracking-tight">Tenured</span>
                <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase tracking-tight">Department Head</span>
             </div>

             <div className="pt-10 border-t border-slate-100">
                <div className="text-6xl font-black text-slate-900 mb-3">{teacher.rating > 0 ? teacher.rating.toFixed(1) : "N/A"}</div>
                <div className="flex justify-center gap-1.5 mb-3">
                   {[1, 2, 3, 4, 5].map((s) => (
                     <Star key={s} className={`w-4 h-4 ${s <= Math.round(teacher.rating) ? 'fill-blue-600 text-blue-600' : 'text-slate-200'}`} />
                   ))}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Aggregate Rating</div>
             </div>

             <div className="flex gap-4 mt-12 pt-10 border-t border-slate-100">
                <button className="flex-1 btn-secondary !py-3 flex items-center justify-center gap-2 text-xs">
                   <MessageSquare className="w-4 h-4" /> Message
                </button>
                <button className="flex-1 btn-primary !py-3 text-xs">Book Office Hours</button>
             </div>
          </div>

          <div className="app-card space-y-6">
             <div className="label-mono mb-4">Faculty Analytics</div>
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 font-medium text-sm">Courses Taught</span>
                <span className="text-slate-900 font-black">24</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 font-medium text-sm">Active Students</span>
                <span className="text-slate-900 font-black">112</span>
             </div>
             <div className="flex justify-between items-center py-2">
                <span className="text-slate-500 font-medium text-sm">Avg. Response Time</span>
                <span className="text-blue-600 font-black">2.4 hrs</span>
             </div>
          </div>
        </div>

        {/* Right Details Column */}
        <div className="lg:col-span-8 space-y-12">
          <section className="app-card">
            <div className="flex items-center gap-3 mb-8">
               <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <ShieldCheck className="w-6 h-6" />
               </div>
               <h2 className="text-2xl font-bold text-slate-900">Professional Biography</h2>
            </div>
            <p className="text-slate-600 text-lg font-medium leading-relaxed mb-10">
              {teacher.bio || "Dedicated to advancing the frontiers of knowledge through rigorous research and student mentorship. With over 15 years of academic excellence, their courses bridge the gap between theoretical frameworks and industrial application."}
            </p>
            <div className="flex flex-wrap gap-3">
               {(teacher.specialization || ["Academic Research", "Systems Design", "Technical Leadership", "Industry Ethics"]).map((s: string) => (
                 <span key={s} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-tight">{s}</span>
               ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
               <div className="p-2 bg-teal-50 rounded-xl text-teal-600">
                  <BookOpen className="w-6 h-6" />
               </div>
               <h2 className="text-2xl font-bold text-slate-900">Current Semester Classes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="app-card p-6 hover:shadow-lg transition-all border-slate-100 group">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-black text-slate-500">CS-401</span>
                    <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Advanced Cybernetics</h4>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-tighter">
                     <span className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> 42 Students</span>
                     <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Mon / Wed</span>
                  </div>
               </div>
               <div className="app-card p-6 hover:shadow-lg transition-all border-slate-100 group opacity-70">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-black text-slate-500">ETH-550</span>
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Ethics in AI</h4>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-tighter">
                     <span className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> 30 Students</span>
                     <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Tue / Thu</span>
                  </div>
               </div>
            </div>
          </section>

          {/* Feedback Form */}
          <section className="app-card !p-12 border-none bg-blue-600 text-white shadow-2xl shadow-blue-200 overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight">Submit Feedback</h2>
                  <p className="text-blue-100 font-medium mt-1">Your response is encrypted and private.</p>
                </div>
              </div>

              <form onSubmit={handleSubmitFeedback} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label className="block text-xs font-black uppercase tracking-widest text-blue-100">Quality of Instruction</label>
                     <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button 
                            key={star}
                            type="button"
                            onClick={() => setFeedback({ ...feedback, rating: star })}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${feedback.rating >= star ? 'bg-white text-blue-600 scale-110 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
                          >
                             <Star className={`w-6 h-6 ${feedback.rating >= star ? 'fill-blue-600' : ''}`} />
                          </button>
                        ))}
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <label className="text-xs font-black uppercase tracking-widest text-blue-100">Course Difficulty</label>
                        <span className="text-lg font-black">{feedback.difficulty}/10</span>
                     </div>
                     <input 
                       type="range" min="1" max="10" 
                       value={feedback.difficulty}
                       onChange={(e) => setFeedback({ ...feedback, difficulty: parseInt(e.target.value) })}
                       className="w-full accent-white h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
                     />
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-blue-200">
                        <span>Introductory</span>
                        <span>Advanced</span>
                     </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase tracking-widest text-blue-100">Associate with Course</label>
                  <select 
                    value={feedback.courseId}
                    onChange={(e) => setFeedback({ ...feedback, courseId: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_1.5rem_center] bg-no-repeat"
                  >
                    <option value="" className="text-slate-900">Select a course module...</option>
                    <option value="60d21b4667d0d8992e610c85" className="text-slate-900">CS-401 Applied Cybernetics</option>
                    <option value="60d21b4667d0d8992e610c86" className="text-slate-900">ETH-550 AI Ethics</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase tracking-widest text-blue-100">Detailed Evaluation</label>
                  <textarea 
                    value={feedback.comment}
                    onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                    rows={4}
                    placeholder="Provide constructive feedback for future scholars..."
                    className="w-full bg-white text-slate-900 rounded-2xl p-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-white/20 resize-none shadow-inner shadow-slate-100"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-8 justify-between">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={feedback.anonymous}
                      onChange={(e) => setFeedback({ ...feedback, anonymous: e.target.checked })}
                      className="w-5 h-5 rounded-md border-2 border-white/30 bg-transparent text-white checked:bg-white focus:ring-0 appearance-none relative checked:before:content-['✓'] checked:before:absolute checked:before:inset-0 checked:before:flex checked:before:items-center checked:before:justify-center checked:before:text-blue-600 checked:before:font-bold" 
                    />
                    <span className="text-[10px] font-black uppercase tracking-widest">Submit Anonymously</span>
                  </label>
                  
                  <button 
                    disabled={submitting}
                    className="w-full sm:w-auto px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-lg shadow-xl hover:shadow-white/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {submitting ? "Sending..." : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
          </section>

          {/* Past Feedback */}
          <section className="space-y-8">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Verified Student Testimonials</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews?.length > 0 ? reviews.map((rev: any) => (
                  <div key={rev._id} className="app-card border-none bg-white shadow-lg shadow-slate-100/50 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(s => <Star key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-100'}`} />)}
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{new Date(rev.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-600 font-medium italic leading-relaxed mb-6">"{rev.comment}"</p>
                    </div>
                    <div className="pt-6 border-t border-slate-50 flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-[10px] font-black">
                         {rev.anonymous ? '?' : rev.student.name.charAt(0)}
                       </div>
                       <span className="text-xs font-bold text-slate-900">{rev.anonymous ? 'Anonymous Scholar' : rev.student.name}</span>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full app-card text-center py-20 bg-slate-50 border-dashed border-2 border-slate-200">
                    <p className="text-slate-400 font-bold italic tracking-tight uppercase">No logs currently stored in local cache.</p>
                  </div>
                )}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
