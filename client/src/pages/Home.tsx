import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Terminal, Database, Activity, Cpu } from "lucide-react";

const Home = () => {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="text-center mb-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-8">
            <Activity className="w-3.5 h-3.5" /> RE-IMAGINING ACADEMIC MANAGEMENT
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Empower Your <br />
            <span className="text-blue-600">Learning Journey.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-600 text-xl font-medium mb-12 leading-relaxed">
            The next-generation nexus for students and faculty. Sync your curriculum, analyze faculty feedback, and take control of your educational growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/register" className="btn-primary py-4 px-10 text-lg shadow-xl shadow-blue-500/20">
              Get Started for Free
            </Link>
            <button className="btn-secondary py-4 px-10 text-lg">
              View Platform Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 app-card group p-10 bg-slate-900 text-white border-none overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Database className="w-8 h-8 text-white" />
              </div>
              <span className="label-mono text-slate-400">Integrated Course Data</span>
            </div>
            <h3 className="text-4xl font-bold mb-6 group-hover:translate-x-2 transition-transform">Course Discovery Intelligence</h3>
            <p className="text-slate-400 text-lg mb-8 max-w-lg">Navigate complex academic pathways with ease. Our intelligent matching system helps you find the right courses at the right time.</p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium">Prerequisite Mapping</div>
              <div className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium">Real-time Availability</div>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="app-card group flex flex-col justify-between">
          <div>
            <div className="p-3 bg-teal-100 rounded-xl w-fit mb-12">
              <Cpu className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Faculty Analytics</h3>
            <p className="text-slate-500 leading-relaxed">Make informed choices with verified data on teaching styles and grading history from a global directory of expertise.</p>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 text-blue-600 font-bold flex items-center gap-2 group/btn">
            Explore Faculty <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="app-card group">
          <div className="p-3 bg-amber-100 rounded-xl w-fit mb-12">
            <Activity className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Anonymous Feedback</h3>
          <p className="text-slate-500 leading-relaxed">Join a transparent community where honest feedback fuels institutional improvement and empowers future generations.</p>
        </div>

        <div className="md:col-span-2 app-card flex flex-col sm:flex-row items-center justify-around gap-12 bg-white/50 backdrop-blur">
          <div className="text-center">
            <div className="label-mono mb-2">Network Uptime</div>
            <div className="text-5xl font-black text-slate-900">99.9%</div>
          </div>
          <div className="text-center">
            <div className="label-mono mb-2">Active Scholars</div>
            <div className="text-5xl font-black text-blue-600">12k+</div>
          </div>
          <div className="text-center">
            <div className="label-mono mb-2">Verified Reviews</div>
            <div className="text-5xl font-black text-slate-900">45k</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import helper
import { ChevronRight } from "lucide-react";

export default Home;
