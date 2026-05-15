import { getVaultComponents } from "@/lib/actions";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, Trash2, Copy, Eye } from "lucide-react";

export default async function VaultPage() {
  const components = await getVaultComponents();

  return (
    <div className="min-h-screen bg-[#0B1120] bg-grid flex flex-col font-sans selection:bg-teal-500/30">
      
      {/* --- VAULT HEADER --- */}
      <header className="h-16 border-b border-slate-800/60 bg-[#0B1120]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors">
              <ArrowLeft size={18} />
            </button>
          </Link>
          <div className="h-4 w-px bg-slate-800"></div>
          <h1 className="text-sm font-bold tracking-[0.2em] text-white uppercase italic">The Vault</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            {components.length} Items Stored
          </span>
          <UserButton />
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-12">
        
        {components.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 mb-4">
              <LayoutGrid size={32} className="text-slate-700" />
            </div>
            <h2 className="text-slate-400 font-bold tracking-tight">Kütüphaneniz Henüz Boş</h2>
            <p className="text-slate-600 text-xs mt-2 max-w-xs">
              Dönüştürücüye gidip ilk ikonunuzu oluşturun ve kütüphanenize kaydedin.
            </p>
            <Link href="/" className="mt-6">
              <button className="bg-teal-500 text-slate-950 font-bold px-6 py-2 rounded-lg text-xs hover:bg-teal-400 transition-all">
                Dönüştürücüye Git
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {components.map((item) => (
              <div 
                key={item.id} 
                className="group relative bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden backdrop-blur-sm transition-all hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(79,70,229,0.05)] flex flex-col"
              >
                {/* Visual Preview Area */}
                <div className="aspect-square flex items-center justify-center p-12 bg-slate-950/20">
                  <div 
                    className="w-full h-full text-indigo-400 group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    dangerouslySetInnerHTML={{ __html: item.rawSvg }}
                  />
                </div>

                {/* Info & Actions */}
                <div className="p-4 border-t border-slate-800/40 bg-slate-900/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[11px] font-bold text-white tracking-widest uppercase truncate max-w-[120px]">
                        {item.name}
                      </h3>
                      <span className="text-[9px] text-slate-500 font-mono uppercase">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-slate-800 rounded-md text-slate-400 hover:text-teal-400 transition-colors">
                        <Copy size={14} />
                      </button>
                      <button className="p-2 hover:bg-slate-800 rounded-md text-slate-400 hover:text-rose-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- STATUS FOOTER --- */}
      <footer className="h-8 border-t border-slate-800/60 bg-[#0B1120] flex items-center px-6 text-[10px] uppercase font-mono tracking-[0.2em] text-slate-500 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.6)]"></div>
          Secure_Vault_Linked
        </div>
        <span>Storage: Active</span>
      </footer>

    </div>
  );
}