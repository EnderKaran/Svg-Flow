import { UserButton } from "@clerk/nextjs";
import { Search, Filter, Grid2X2, List } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function VaultPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] bg-grid">
      {/* Vault Header */}
      <header className="h-20 border-b border-slate-800/60 bg-[#0B1120]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold tracking-tight text-white uppercase italic">The Vault</h1>
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <Input 
                placeholder="Search components..." 
                className="bg-slate-900/50 border-slate-800 pl-9 text-xs focus-visible:ring-teal-500/50"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Kontrol Paneli */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 rounded-full bg-teal-500 text-slate-950 text-xs font-bold transition-all">All</button>
            <button className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-medium hover:text-white transition-all">Icons</button>
            <button className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-medium hover:text-white transition-all">Illustrations</button>
          </div>
          
          <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button className="p-1.5 bg-slate-800 text-white rounded-md"><Grid2X2 size={14} /></button>
            <button className="p-1.5 text-slate-500 hover:text-white transition-all"><List size={14} /></button>
          </div>
        </div>

        {/* Bento Grid Sistemi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Component Örneği */}
          <div className="group relative aspect-square bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden backdrop-blur-sm transition-all hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]">
            <div className="absolute inset-0 flex items-center justify-center p-12">
               {/* SVG Preview Buraya Gelecek */}
               <div className="w-full h-full text-teal-400 group-hover:scale-110 transition-transform duration-500">
                  {/* Placeholder SVG */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
               </div>
            </div>
            
            {/* Card Info Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/90 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
               <p className="text-[10px] font-mono text-teal-500 font-bold uppercase tracking-widest">CubeComponent</p>
               <p className="text-[9px] text-slate-500 uppercase mt-0.5">Created 2h ago</p>
            </div>
          </div>
          
          {/* Gelecekte burası db.savedComponent.map(...) ile dönecek */}
        </div>
      </main>
    </div>
  );
}