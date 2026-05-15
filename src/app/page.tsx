"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Code2, Database, Terminal, Layers, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";


export default function LandingPage() {
  // Stagger animasyonu için varyantlar
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as any 
      } 
    }
  };

  return (
    <div className="min-h-screen bg-[#02040A] text-slate-200 font-sans selection:bg-teal-500/30 overflow-hidden relative">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 inset-x-0 h-14 border-b border-white/[0.05] bg-[#02040A]/60 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
              <Layers size={12} className="text-black" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">SVG-Flow</span>
          </div>
          
          <div className="flex items-center gap-5">
            <Link href="https://github.com/EnderKaran/Svg-Flow" target="_blank" className="flex items-center gap-2 text-[13px] font-medium text-slate-400 hover:text-white transition-colors">
              <FaGithub size={14} />
              <span className="hidden sm:inline">Source</span>
            </Link>
            <div className="w-px h-4 bg-white/10 hidden sm:block"></div>
            <Link href="/lab">
              <button className="h-8 px-4 bg-white hover:bg-slate-200 text-black text-[12px] font-semibold rounded transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Enter Workspace
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-36 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* --- HERO SECTION --- */}
          <section className="max-w-4xl mx-auto text-center mb-32 flex flex-col items-center">
            <motion.div 
              initial="hidden" animate="show" variants={containerVariants}
              className="flex flex-col items-center"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-teal-500"></span>
                <span className="text-[11px] font-mono text-slate-300 uppercase tracking-widest">Engine Core v2.1</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-[1.1] mb-6">
                Engineer your icons.
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed font-light mb-10">
                An AST-driven pipeline that strips bloated metadata, normalizes attributes, and outputs strict, type-safe TSX. Built for modern frontend architecture.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <Link href="/lab">
                  <button className="h-12 px-6 bg-white hover:bg-slate-200 text-black text-sm font-semibold rounded-lg transition-all flex items-center gap-2 group">
                    Start Optimization
                    <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform text-slate-600" />
                  </button>
                </Link>
                <div className="flex items-center justify-between px-4 h-12 border border-white/10 rounded-lg bg-white/[0.02] w-full sm:w-auto font-mono text-xs text-slate-400 group cursor-copy hover:border-white/20 transition-colors">
                  <span className="mr-6"><span className="text-teal-500/70 mr-2">$</span>npx svg-flow-cli</span>
                  <CopyIcon className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 transition-colors" />
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* --- BENTO GRID ARCHITECTURE --- */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            
            {/* Bento 1: AST Engine (Span 8) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-8 bg-[#0A0D14] border border-white/[0.05] rounded-3xl p-8 lg:p-10 relative overflow-hidden group hover:border-white/[0.1] transition-colors"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <Code2 size={20} className="text-slate-400 mb-6" />
              <h3 className="text-xl font-semibold text-white tracking-tight mb-2">AST Optimization Engine</h3>
              <p className="text-slate-400 max-w-md leading-relaxed text-sm">
                Performs multi-pass SVGO optimizations. Removes invisible elements, minifies paths, and forces React camelCase compliance instantly.
              </p>
              
              {/* Fake IDE Window */}
              <div className="mt-8 border border-white/10 rounded-xl bg-[#02040A] overflow-hidden shadow-2xl">
                <div className="h-8 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <span className="ml-2 text-[9px] font-mono text-slate-500">Output.tsx</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-[11px] font-mono leading-loose">
                    <span className="text-pink-400">export const</span> <span className="text-blue-400">Icon</span> <span className="text-slate-300">=</span> <span className="text-yellow-200">(props)</span> <span className="text-pink-400">=&gt;</span> <span className="text-slate-300">(</span>
                    <br/>
                    <span className="text-slate-500">  // Automatically stripped width/height</span>
                    <br/>
                    <span className="text-slate-300">  &lt;</span><span className="text-teal-400">svg</span> <span className="text-blue-300">fill</span><span className="text-slate-300">=</span><span className="text-green-300">"currentColor"</span> <span className="text-blue-300">viewBox</span><span className="text-slate-300">=</span><span className="text-green-300">"0 0 24 24"</span> <span className="text-yellow-200">{`{...props}`}</span><span className="text-slate-300">&gt;</span>
                    <br/>
                    <span className="text-slate-300">    &lt;</span><span className="text-teal-400">path</span> <span className="text-blue-300">d</span><span className="text-slate-300">=</span><span className="text-green-300">"M12 2L2 22h20L12 2z"</span> <span className="text-slate-300">/&gt;</span>
                    <br/>
                    <span className="text-slate-300">  &lt;/</span><span className="text-teal-400">svg</span><span className="text-slate-300">&gt;</span>
                    <br/>
                    <span className="text-slate-300">);</span>
                  </pre>
                </div>
              </div>
            </motion.div>

            {/* Bento 2: Cloud Vault (Span 4) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="md:col-span-4 bg-[#0A0D14] border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden group hover:border-white/[0.1] transition-colors flex flex-col"
            >
              <Database size={20} className="text-slate-400 mb-6" />
              <h3 className="text-xl font-semibold text-white tracking-tight mb-2">Cloud Vault</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Powered by Neon serverless PostgreSQL. Your components are synced, searchable, and ready for bulk export.
              </p>
              
              <div className="mt-auto pt-8 flex justify-center">
                <div className="relative flex items-center justify-center w-24 h-24">
                  <div className="absolute inset-0 border-2 border-dashed border-slate-700 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-2 border border-slate-800 rounded-full"></div>
                  <Database size={24} className="text-teal-500/80" />
                </div>
              </div>
            </motion.div>

            {/* Bento 3: CLI (Span 5) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="md:col-span-5 bg-[#0A0D14] border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden group hover:border-white/[0.1] transition-colors"
            >
              <Terminal size={20} className="text-slate-400 mb-6" />
              <h3 className="text-xl font-semibold text-white tracking-tight mb-2">Terminal Native</h3>
              <p className="text-slate-400 leading-relaxed text-sm mb-8">
                Run batch conversions locally. Point the CLI to a directory and watch hundreds of SVGs compile in milliseconds.
              </p>
              
              <div className="bg-[#02040A] border border-white/5 rounded-lg p-4 font-mono text-[10px] sm:text-xs">
                <div className="flex gap-2 mb-2">
                  <span className="text-teal-500">➜</span>
                  <span className="text-blue-300">~/project</span>
                  <span className="text-white">npx svg-flow ./icons</span>
                </div>
                <div className="text-slate-500 pl-4 space-y-1">
                  <p>✔ Found 42 SVG files</p>
                  <p>✔ Optimized AST structures</p>
                  <p className="text-teal-400/80">✨ Generated 42 TSX components</p>
                </div>
              </div>
            </motion.div>

            {/* Bento 4: Config (Span 7) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="md:col-span-7 bg-[#0A0D14] border border-white/[0.05] rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-white/[0.1] transition-colors"
            >
              <div className="max-w-md z-10">
                <h3 className="text-xl font-semibold text-white tracking-tight mb-2">Absolute Control</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Works out of the box with sensible defaults. Need granular control? Toggle dimensions, force prefixes, and map custom attributes via the Lab config panel.
                </p>
              </div>
              
              {/* Abstract UI Toggles */}
              <div className="absolute right-0 bottom-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 translate-x-1/4 translate-y-1/4 pointer-events-none">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 w-64">
                      <div className="flex-1 h-2 bg-white/20 rounded-full"></div>
                      <div className={`w-8 h-4 rounded-full ${i === 2 ? 'bg-teal-500' : 'bg-white/20'} relative`}>
                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${i === 2 ? 'right-0.5' : 'left-0.5'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </section>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/[0.05] bg-[#02040A] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest flex items-center gap-2">
            SVG-Flow <span className="opacity-50">|</span> Built for Engineering Teams
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono text-slate-600 hover:text-slate-400 transition-colors cursor-default">Next.js 16</span>
            <span className="text-[11px] font-mono text-slate-600 hover:text-slate-400 transition-colors cursor-default">Neon DB</span>
            <span className="text-[11px] font-mono text-slate-600 hover:text-slate-400 transition-colors cursor-default">SVGO</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Yardımcı İkon Componenti (CLI Copy butonu için)
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  );
}