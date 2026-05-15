import { getVaultComponents } from "@/lib/actions";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, Zap } from "lucide-react";

// Yerel Bileşenler
import DeleteButton from "@/components/vault/DeleteButton";
import CopyButton from "@/components/vault/CopyButton";
import BulkExportButton from "@/components/vault/BulkExportButton";

export default async function VaultPage() {
  // Veritabanından (Neon) kullanıcının ikonlarını çekiyoruz
  const components = await getVaultComponents();

  return (
    <div className="min-h-screen bg-[#0B1120] bg-grid flex flex-col font-sans selection:bg-teal-500/30">
      
      {/* --- VAULT HEADER --- */}
      <header className="h-16 border-b border-slate-800/60 bg-[#0B1120]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-all group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </Link>
          <div className="h-4 w-px bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <LayoutGrid size={16} className="text-indigo-500" />
            <h1 className="text-sm font-bold tracking-[0.2em] text-white uppercase italic tracking-tighter">
              The_Vault
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Toplu Dışa Aktarma Butonu (JSZip entegrasyonu) */}
          <BulkExportButton components={components} />
          
          <div className="w-px h-6 bg-slate-800 hidden sm:block"></div>
          
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900/50 border border-slate-800 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              {components.length} Assets_Stored
            </span>
          </div>

          <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 border border-slate-700" } }} />
        </div>
      </header>

      {/* --- MAIN CONTENT (BENTO GRID) --- */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-6 lg:p-12">
        
        {components.length === 0 ? (
          /* Boş Durum (Empty State) */
          <div className="h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-900/50 rounded-3xl flex items-center justify-center border border-slate-800 mb-6 shadow-2xl">
              <Zap size={32} className="text-slate-700" />
            </div>
            <h2 className="text-slate-400 font-bold tracking-tight uppercase text-sm">Kütüphane Verisi Bulunamadı</h2>
            <p className="text-slate-600 text-[10px] uppercase tracking-widest mt-2 max-w-xs leading-relaxed">
              Dönüştürücü laboratuvarına dönerek ilk bileşeninizi oluşturun ve güvenli kasaya kaydedin.
            </p>
            <Link href="/" className="mt-8">
              <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-3 rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(20,184,166,0.2)]">
                Return to Lab
              </button>
            </Link>
          </div>
        ) : (
          /* İkon Grid Yapısı */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {components.map((item) => (
              <div 
                key={item.id} 
                className="group relative bg-slate-900/40 border border-slate-800/80 rounded-[2rem] overflow-hidden backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:shadow-[0_0_50px_rgba(79,70,229,0.1)] flex flex-col"
              >
                {/* Visual Preview Area */}
                <div className="aspect-square flex items-center justify-center p-14 bg-slate-950/20 relative">
                  <div 
                    className="w-full h-full text-indigo-400 group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100"
                    dangerouslySetInnerHTML={{ __html: item.rawSvg }}
                  />
                  <div className="absolute top-4 right-4 px-2 py-1 bg-slate-950/50 border border-slate-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">Preview_Mode</span>
                  </div>
                </div>

                {/* Info & Quick Actions Panel */}
                <div className="p-5 border-t border-slate-800/40 bg-slate-900/60 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-[10px] font-bold text-white tracking-[0.15em] uppercase truncate max-w-[120px]">
                        {item.name}
                      </h3>
                      <p className="text-[9px] text-slate-500 font-mono uppercase tracking-tighter">
                        {new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(item.createdAt))}
                      </p>
                    </div>
                    
                    {/* Dinamik Aksiyon Butonları (Client Components) */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <CopyButton 
                        code={item.optimizedTsx} 
                        name={item.name} 
                      />
                      <DeleteButton id={item.id} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- STATUS FOOTER --- */}
      <footer className="h-8 border-t border-slate-800/60 bg-[#0B1120] flex items-center px-6 text-[10px] uppercase font-mono tracking-[0.2em] text-slate-500 justify-between z-50">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.8)]"></div>
          <span className="opacity-80">Vault_Cloud_Synchronized</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline opacity-40">Latency: 14ms</span>
          <span className="text-indigo-400/70 font-bold tracking-[0.3em]">SVG-FLOW_VAULT_PRO</span>
        </div>
      </footer>

    </div>
  );
}