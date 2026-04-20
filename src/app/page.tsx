"use client";

import { useState } from "react";
import { Play, Copy, Trash2, Eye, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CodeEditor from "./components/editor/CodeEditor";

export default function LabPage() {
  // Başlangıç için örnek bir SVG (Cloud Lightning ikonun)
  const [sourceCode, setSourceCode] = useState(
`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
  <polyline points="13 11 9 17 15 17 11 23" />
</svg>`
  );

  const [outputCode, setOutputCode] = useState("// Dönüştürülen TSX kodu burada görünecek...");
  const [isConverting, setIsConverting] = useState(false);

  // Dönüştürme Simülasyonu (Server Action gelmeden önceki hali)
  const handleConvert = async () => {
    setIsConverting(true);
    // Buraya Server Action gelecek. Şimdilik küçük bir gecikme ekleyelim.
    setTimeout(() => {
      setIsConverting(false);
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    // TODO: Add toast notification
  };

  const handleClear = () => {
    setSourceCode("");
    setOutputCode("// Dönüştürülen TSX kodu burada görünecek...");
  };

  return (
    <div className="min-h-screen bg-grid flex flex-col font-sans selection:bg-teal-500/30">
      
      {/* --- HEADER --- */}
      <header className="h-16 border-b border-slate-800/60 bg-[#0B1120]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)]">
              <Share2 size={18} className="text-white rotate-12" />
            </div>
            <span>SVG-Flow</span>
          </div>
          <div className="h-4 w-px bg-slate-800 hidden md:block"></div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mt-1 hidden md:block">Engine v4.2.0</span>
        </div>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConvert}
            disabled={isConverting}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-5 py-2 rounded-lg transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={16} fill="currentColor" className={isConverting ? "animate-ping" : ""} />
            <span>{isConverting ? "CONVERTING..." : "CONVERT"}</span>
          </motion.button>
          
          <div className="w-px h-6 bg-slate-800"></div>
          <div className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center cursor-pointer hover:border-teal-500/50 transition-colors">
             <div className="w-6 h-6 bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <main className="flex-1 w-full max-w-[1800px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 overflow-hidden">
        
        {/* SOL PANEL: SOURCE */}
        <section className="flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl relative group">
          <div className="h-12 border-b border-slate-800/60 bg-slate-900/50 flex items-center px-4 justify-between z-10">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-rose-500"></div>
               <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Source (SVG)</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              {(new Blob([sourceCode]).size / 1024).toFixed(1)} KB
            </span>
          </div>
          
          <div className="flex-1 relative min-h-[500px]">
            <CodeEditor 
              language="xml" 
              value={sourceCode} 
              onChange={(val) => setSourceCode(val || "")} 
            />
            
            <AnimatePresence>
              {sourceCode.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-6 right-6 flex flex-col gap-2 z-10"
                >
                  <button 
                    onClick={handleClear} 
                    className="p-3 bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 rounded-xl transition-all backdrop-blur-md shadow-xl"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* SAĞ PANEL: OUTPUT */}
        <section className="flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl relative group">
          <div className="h-12 border-b border-slate-800/60 bg-slate-900/50 flex items-center px-4 justify-between z-10">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]"></div>
               <span className="text-[11px] font-bold tracking-widest text-teal-400 uppercase">React + Tailwind</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-slate-500 font-mono uppercase">TSX</span>
            </div>
          </div>
          
          <div className="flex-1 relative min-h-[500px]">
             <CodeEditor 
              language="typescript" 
              value={outputCode} 
              readOnly={true} 
            />
            
            <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all z-10">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy} 
                className="p-3 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-xl transition-all backdrop-blur-md shadow-xl"
              >
                <Copy size={18} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-slate-800/80 hover:bg-slate-700 text-slate-400 border border-slate-700 rounded-xl transition-all backdrop-blur-md shadow-xl"
              >
                <Eye size={18} />
              </motion.button>
            </div>
          </div>
        </section>

      </main>

      {/* --- STATUS BAR --- */}
      <footer className="h-8 border-t border-slate-800/60 bg-[#0B1120] flex items-center px-6 text-[10px] uppercase font-mono tracking-[0.2em] text-slate-500 justify-between z-50">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 underline underline-offset-4 decoration-teal-500/30 cursor-pointer">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div> 
            Connected: Main
          </span>
          <span className="hidden sm:inline">0 Errors</span>
          <span className="hidden sm:inline">0 Warnings</span>
        </div>
        <div className="flex items-center gap-6">
          <span>UTF-8</span>
          <span className="text-teal-500/70 font-bold">SVG-FLOW v1.0.0</span>
        </div>
      </footer>

    </div>
  );
}