import { Play, Copy, Trash2, Eye } from "lucide-react";

export default function LabPage() {
  return (
    <div className="min-h-screen bg-grid flex flex-col font-sans">
      
      {/* --- HEADER --- */}
      <header className="h-16 border-b border-slate-800/60 bg-[#0B1120]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
            <span className="text-teal-400">{'</>'}</span>
            SVG-Flow
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-1">Workspace</span>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-6 py-2 rounded-md transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)]">
            <Play size={16} fill="currentColor" />
            <span>CONVERT</span>
          </button>
          
          <div className="w-px h-6 bg-slate-800"></div>
          <button className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
             {/* Profil Avatarı Placeholder */}
             <div className="w-full h-full bg-gradient-to-tr from-teal-500 to-purple-500 opacity-80"></div>
          </button>
        </div>
      </header>

      {/* --- MAIN WORKSPACE (BENTO GRID) --- */}
      <main className="flex-1 w-full max-w-[1800px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        
        {/* SOL PANEL: SOURCE (SVG) */}
        <section className="flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl relative group">
          {/* Panel Header */}
          <div className="h-12 border-b border-slate-800/60 bg-slate-900/50 flex items-center px-4 justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 flex items-center gap-2">
              <span className="text-slate-500">{'</>'}</span> SOURCE (SVG)
            </span>
            <span className="text-xs text-slate-500 font-mono">0.0 KB</span>
          </div>
          
          {/* Editör Alanı (Placeholder) */}
          <div className="flex-1 relative min-h-[500px] flex items-center justify-center">
            <div className="text-slate-600 font-mono text-sm border border-dashed border-slate-700/50 p-8 rounded-lg">
              [ Monaco Editor: XML ]
            </div>
            
            {/* Alt Sağ Aksiyon Butonları */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/50 rounded-lg transition-colors backdrop-blur-sm">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* SAĞ PANEL: OUTPUT (TSX) */}
        <section className="flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl relative group">
          {/* Panel Header */}
          <div className="h-12 border-b border-slate-800/60 bg-slate-900/50 flex items-center px-4 justify-between">
            <span className="text-xs font-semibold tracking-wider text-teal-400 flex items-center gap-2">
              <span className="text-teal-500">{'{}'}</span> REACT + TAILWIND
            </span>
            <span className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div> TSX
            </span>
          </div>
          
          {/* Editör Alanı (Placeholder) */}
          <div className="flex-1 relative min-h-[500px] flex items-center justify-center">
             <div className="text-slate-600 font-mono text-sm border border-dashed border-slate-700/50 p-8 rounded-lg">
              [ Monaco Editor: TypeScript ]
            </div>
            
            {/* Üst Sağ Aksiyon Butonları */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/20 rounded-lg transition-colors backdrop-blur-sm">
                <Copy size={16} />
              </button>
              <button className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-400 border border-slate-700/50 rounded-lg transition-colors backdrop-blur-sm">
                <Eye size={16} />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* --- STATUS BAR --- */}
      <footer className="h-8 border-t border-slate-800/60 bg-[#0B1120] flex items-center px-6 text-[10px] uppercase font-mono tracking-widest text-slate-500 justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> main*</span>
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> 0</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 1, Col 1</span>
          <span>UTF-8</span>
          <span className="text-teal-500/70">SVG-FLOW v1.0.0-MVP</span>
        </div>
      </footer>

    </div>
  );
}