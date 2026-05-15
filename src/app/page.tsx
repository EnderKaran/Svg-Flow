"use client";

import { useState , useEffect } from "react";
import Link from "next/link";
import { 
  Play, 
  Copy, 
  Trash2, 
  Share2, 
  Loader2, 
  Sparkles, 
  BookmarkPlus, 
  Eye, 
  Code2,
  LayoutGrid,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import { toast } from "sonner";

// Yerel Bileşenler, Aksiyonlar ve Tipler
import CodeEditor from "@/components/Editor/CodeEditor";
import ConfigPanel from "@/components/Editor/ConfigPanel";
import { convertSvgToComponent, saveToVault } from "@/lib/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SvgoConfig, defaultSvgoConfig } from "@/types";

export default function LabPage() {
  // --- STATE YÖNETİMİ ---
  const [sourceCode, setSourceCode] = useState(
`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
  <polyline points="13 11 9 17 15 17 11 23" />
</svg>`
  );

  const [outputCode, setOutputCode] = useState("// Dönüştürülen TSX kodu burada görünecek...");
  const [isConverting, setIsConverting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState<SvgoConfig>(defaultSvgoConfig);

  useEffect(() => {
    const savedConfig = localStorage.getItem("svg-flow-config");
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error("Config yükleme hatası:", error);
      }
    }
  }, []);

  // 2. Config her değiştiğinde LocalStorage'ı güncelle
  useEffect(() => {
    localStorage.setItem("svg-flow-config", JSON.stringify(config));
  }, [config]);

  // --- FONKSİYONLAR ---

  // 1. SVG -> TSX Dönüştürme (Server Action + Config)
  const handleConvert = async () => {
    if (!sourceCode.trim()) {
      toast.error("Hata", { description: "Lütfen önce geçerli bir SVG kodu girin." });
      return;
    }
    
    setIsConverting(true);
    try {
      // Config artık server action'a parametre olarak gidiyor
      const result = await convertSvgToComponent(sourceCode, config);
      setOutputCode(result);
      toast.success("Dönüştürüldü", {
        description: "Bileşen konfigürasyona göre optimize edildi.",
        icon: <Zap className="h-4 w-4 text-teal-400" />,
      });
    } catch (err) {
      toast.error("Motor Hatası", { description: "SVG işlenirken bir sorun oluştu." });
    } finally {
      setIsConverting(false);
    }
  };

  // 2. Neon Veritabanına Kaydetme
  const handleSave = async () => {
    if (outputCode.startsWith("//")) return;

    setIsSaving(true);
    try {
      const result = await saveToVault({
        name: "NewIcon", 
        rawSvg: sourceCode,
        optimizedTsx: outputCode,
      });

      if (result.success) {
        toast.success("Vault'a Eklendi", { description: "İkon başarıyla kaydedildi." });
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      toast.error("Kaydedilemedi", { description: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] bg-grid flex flex-col font-sans selection:bg-teal-500/30 overflow-hidden text-slate-300">
      
      {/* --- HEADER --- */}
      <header className="h-16 border-b border-slate-800/60 bg-[#0B1120]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="font-bold text-lg text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)]">
              <Share2 size={18} className="text-white rotate-12" />
            </div>
            <span className="hidden sm:inline tracking-tighter uppercase font-black italic">SVG-Flow</span>
          </div>
          <div className="h-4 w-px bg-slate-800 hidden md:block"></div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mt-1 hidden md:block italic">Engine_v2.1_Stable</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/vault">
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-slate-400 hover:text-indigo-400 transition-all group"
            >
              <LayoutGrid size={16} className="group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-[10px] font-bold tracking-wider uppercase hidden lg:block">The Vault</span>
            </motion.button>
          </Link>

          <div className="w-px h-6 bg-slate-800"></div>

          <motion.button 
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleConvert}
            disabled={isConverting}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-2 rounded-lg transition-all shadow-[0_0_25px_rgba(20,184,166,0.3)] disabled:opacity-50 min-w-[140px] justify-center"
          >
            {isConverting ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" />}
            <span>{isConverting ? "SYNCING..." : "GENERATE"}</span>
          </motion.button>
          
          <div className="w-px h-6 bg-slate-800 hidden sm:block"></div>
          <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 border border-slate-700" } }} />
        </div>
      </header>

      {/* --- MAIN WORKSPACE (BENTO GRID 3-COLUMN) --- */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        
        {/* SOL: SOURCE INPUT (4/12) */}
        <section className="lg:col-span-4 flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl h-[calc(100vh-160px)]">
          <div className="h-12 border-b border-slate-800/60 bg-slate-900/50 flex items-center px-4 justify-between">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"></div>
               <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Input_SVG</span>
            </div>
          </div>
          <div className="flex-1 relative">
            <CodeEditor language="xml" value={sourceCode} onChange={(val) => setSourceCode(val || "")} />
            <button onClick={() => setSourceCode("")} className="absolute bottom-6 right-6 p-3 bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 rounded-xl transition-all z-20 shadow-xl backdrop-blur-md">
              <Trash2 size={18} />
            </button>
          </div>
        </section>

        {/* ORTA: OUTPUT & PREVIEW (5/12) */}
        <section className="lg:col-span-5 flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl h-[calc(100vh-160px)]">
          <Tabs defaultValue="code" className="flex-1 flex flex-col">
            <div className="h-12 border-b border-slate-800/60 bg-slate-900/50 flex items-center px-4 justify-between">
              <TabsList className="bg-slate-950/50 border border-slate-800/60 h-8">
                <TabsTrigger value="code" className="text-[10px] uppercase font-bold tracking-wider gap-2 italic">Code</TabsTrigger>
                <TabsTrigger value="preview" className="text-[10px] uppercase font-bold tracking-wider gap-2 italic">Preview</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]"></div>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest italic">Stable</span>
              </div>
            </div>
            
            <TabsContent value="code" className="flex-1 m-0 relative">
               <CodeEditor language="typescript" value={outputCode} readOnly={true} />
              <div className="absolute top-6 right-6 flex flex-col gap-3 z-20">
                <button onClick={() => { navigator.clipboard.writeText(outputCode); toast.success("Kopyalandı"); }} className="p-3 bg-slate-800/80 hover:bg-teal-500/10 text-teal-400 border border-slate-700 rounded-xl transition-all backdrop-blur-md">
                  <Copy size={18} />
                </button>
                <button onClick={handleSave} disabled={isSaving || outputCode.startsWith("//")} className="p-3 bg-slate-800/80 hover:bg-indigo-500/10 text-indigo-400 border border-slate-700 rounded-xl transition-all backdrop-blur-md disabled:opacity-50">
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <BookmarkPlus size={18} />}
                </button>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 m-0 flex items-center justify-center bg-[#020617] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]">
              <div className="p-20 bg-slate-900/40 rounded-[40px] border border-slate-800/50 backdrop-blur-2xl">
                 <div className="w-32 h-32 text-teal-400" dangerouslySetInnerHTML={{ __html: sourceCode }} />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* SAĞ: CONFIG PANEL (3/12) */}
        <aside className="lg:col-span-3 h-[calc(100vh-160px)]">
           <ConfigPanel config={config} onChange={setConfig} />
        </aside>

      </main>

      {/* --- FOOTER --- */}
      <footer className="h-8 border-t border-slate-800/60 bg-[#0B1120] flex items-center px-6 text-[10px] uppercase font-mono tracking-[0.2em] text-slate-500 justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div> 
            Neon_Cloud_Active
          </span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span>Drizzle_ORM_Engine</span>
        </div>
        <span className="text-teal-500/70 font-bold tracking-widest italic">SVG-FLOW_V2.1</span>
      </footer>
    </div>
  );
}