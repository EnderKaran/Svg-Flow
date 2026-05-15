"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Database, Terminal, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060913] text-slate-200 font-sans selection:bg-teal-500/30 overflow-hidden relative">
      
      {/* Arka Plan Efektleri (Sessiz ve Derin) */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-slate-800/40 bg-[#060913]/60 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
              <Zap size={14} className="text-slate-950 fill-slate-950" />
            </div>
            <span className="font-bold tracking-tighter text-slate-100">SVG-Flow</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="https://github.com" target="_blank" className="text-[11px] font-mono text-slate-400 hover:text-white transition-colors uppercase tracking-widest hidden sm:block">
              GitHub
            </Link>
            <Link href="/lab">
              <button className="h-8 px-4 bg-white hover:bg-slate-200 text-slate-950 text-[11px] font-bold uppercase tracking-widest rounded-md transition-all">
                Enter Lab
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* --- HERO SECTION --- */}
          <section className="max-w-3xl mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-teal-500/80 font-mono text-xs uppercase tracking-[0.3em] mb-6">Developer Tooling</h2>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tighter leading-[1.1] mb-8">
                Production-grade <br className="hidden sm:block" />
                <span className="text-slate-400">React components from raw SVGs.</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-xl leading-relaxed mb-10 font-light">
                SVG-Flow is an AST-based optimization engine. It strips unnecessary metadata, standardizes attributes, and generates type-safe TSX components instantly. No manual formatting required.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/lab">
                  <button className="h-12 px-8 bg-teal-500 hover:bg-teal-400 text-slate-950 text-sm font-bold rounded-lg transition-all flex items-center gap-3 group">
                    Start Converting
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <div className="flex items-center gap-3 px-6 h-12 border border-slate-800 rounded-lg bg-slate-900/30">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">v2.1 Stable Release</span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* --- BENTO GRID FEATURES --- */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            
            {/* Feature 1: Engine (Large) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 aspect-[2/1] bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 lg:p-12 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <Code2 size={24} className="text-teal-500 mb-6" />
              <h3 className="text-2xl font-bold text-white tracking-tight mb-3">SVGO Core Engine</h3>
              <p className="text-slate-400 max-w-md leading-relaxed text-sm">
                Powered by SVGO, the engine performs multipass optimizations. It removes invisible elements, minifies paths, and converts properties to strict React camelCase standards.
              </p>
              
              {/* Dekoratif Kod Bloğu */}
              <div className="absolute bottom-[-20px] right-8 w-72 bg-[#020617] border border-slate-800 rounded-t-xl p-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl">
                <pre className="text-[9px] font-mono text-slate-500">
                  <code>
                    {`export const Icon = (props) => (
  <svg 
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >...
                  `}
                  </code>
                </pre>
              </div>
            </motion.div>

            {/* Feature 2: Vault */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 relative overflow-hidden group"
            >
              <Database size={24} className="text-indigo-500 mb-6" />
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">Cloud Vault</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Securely store your generated components. Powered by Neon serverless PostgreSQL for instant retrieval across sessions.
              </p>
            </motion.div>

            {/* Feature 3: CLI */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 relative overflow-hidden"
            >
              <Terminal size={24} className="text-slate-300 mb-6" />
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">CLI Automation</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Run batch conversions directly from your terminal. Point to a directory, and let the engine handle the rest.
              </p>
              <div className="mt-6 bg-slate-950 border border-slate-800 rounded-lg p-3">
                <p className="text-[10px] font-mono text-slate-500">
                  <span className="text-teal-500">$</span> npx svg-flow ./icons
                </p>
              </div>
            </motion.div>

            {/* Feature 4: Extensibility */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 flex flex-col justify-center"
            >
              <h3 className="text-lg font-bold text-white tracking-tight mb-2">Zero Configuration, Absolute Control</h3>
              <p className="text-slate-400 text-sm max-w-xl">
                Works out of the box with sensible defaults, but provides a granular configuration panel for developers who need specific AST manipulations, precision controls, or custom attributes.
              </p>
            </motion.div>

          </section>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-800/40 bg-[#060913] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-slate-600 uppercase tracking-widest">
            Built for modern engineering teams.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono text-slate-600">Next.js 16</span>
            <span className="text-[11px] font-mono text-slate-600">TypeScript</span>
            <span className="text-[11px] font-mono text-slate-600">Tailwind</span>
          </div>
        </div>
      </footer>
    </div>
  );
}