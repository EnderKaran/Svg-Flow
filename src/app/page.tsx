"use client";

import { useState } from "react";
import { 
  Play, 
  Copy, 
  Trash2, 
  Share2, 
  Loader2, 
  Sparkles, 
  BookmarkPlus, 
  Eye, 
  Code2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import { toast } from "sonner";

// Yerel Bileşenler ve Aksiyonlar
import CodeEditor from "@/components/Editor/CodeEditor";
import { convertSvgToComponent, saveToVault } from "@/lib/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  // --- FONKSİYONLAR ---

  // 1. SVG -> TSX Dönüştürme
  const handleConvert = async () => {
    if (!sourceCode.trim()) {
      toast.error("Hata", { description: "Lütfen önce geçerli bir SVG kodu girin." });
      return;
    }
    
    setIsConverting(true);
    try {
      const result = await convertSvgToComponent(sourceCode);
      setOutputCode(result);
      toast.success("Dönüştürüldü", {
        description: "Bileşen başarıyla optimize edildi.",
        icon: <Sparkles className="h-4 w-4 text-teal-400" />,
      });
    } catch (err) {
      toast.error("Motor Hatası", { description: "SVG işlenirken bir sorun oluştu." });
    } finally {
      setIsConverting(false);
    }
  };

  // 2. Neon Veritabanına Kaydetme (The Vault)
  const handleSave = async () => {
    if (outputCode.startsWith("//")) {
      toast.error("Hata", { description: "Önce bir bileşen oluşturmalısınız." });
      return;
    }

    setIsSaving(true);
    try {
      const result = await saveToVault({
        name: "NewIcon", // İleride bir input ile kullanıcıdan alınabilir
        rawSvg: sourceCode,
        optimizedTsx: outputCode,
      });

      if (result.success) {
        toast.success("Vault'a Eklendi", {
          description: "İkon kütüphanenize başarıyla kaydedildi.",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      toast.error("Kaydedilemedi", { description: err.message || "Bir hata oluştu." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    toast.success("Kopyalandı", { description: "Kod panoya eklendi." });
  };

  const handleClear = () => {
    setSourceCode("");
    setOutputCode("// Dönüştürülen TSX kodu burada görünecek...");
  };

  return (
    <div className="min-h-screen bg-[#0B1120] bg-grid flex flex-col font-sans selection:bg-teal-500/30 overflow-hidden text-slate-300">
      
      {/* --- HEADER --- */}
      <header className="h-16 border-b border-slate-800/60 bg-[#0B1120]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="font-bold text-lg text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)]">
              <Share2 size={18} className="text-white rotate-12" />
            </div>
            <span className="hidden sm:inline tracking-tighter">SVG-Flow</span>
          </div>
          <div className="h-4 w-px bg-slate-800 hidden md:block"></div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mt-1 hidden md:block">Engine v1.2.0</span>
        </div>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConvert}
            disabled={isConverting}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-2 rounded-lg transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] disabled:opacity-50 min-w-[140px] justify-center"
          >
            {isConverting ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" />}
            <span>{isConverting ? "PROCESS" : "CONVERT"}</span>
          </motion.button>
          
          <div className="w-px h-6 bg-slate-800"></div>
          
          {/* User Profile (Clerk) */}
          <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 border border-slate-700" } }} />
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <main className="flex-1 w-full max-w-[1800px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        
        {/* SOL PANEL: SOURCE */}
        <section className="flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl h-[calc(100vh-160px)]">
          <div className="h-12 border-b border-slate-800/60 bg-slate-900/50 flex items-center px-4 justify-between z-10">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"></div>
               <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Input SVG</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">{(new Blob([sourceCode]).size / 1024).toFixed(1)} KB</span>
          </div>
          
          <div className="flex-1 relative overflow-hidden">
            <CodeEditor 
              language="xml" 
              value={sourceCode} 
              onChange={(val: any) => setSourceCode(val || "")} 
            />
            <AnimatePresence>
              {sourceCode.length > 5 && (
                <motion.button 
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                  onClick={handleClear}
                  className="absolute bottom-6 right-6 p-3 bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 rounded-xl transition-all z-20"
                >
                  <Trash2 size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* SAĞ PANEL: OUTPUT + PREVIEW (TABS) */}
        <section className="flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl h-[calc(100vh-160px)]">
          <Tabs defaultValue="code" className="flex-1 flex flex-col">
            <div className="h-12 border-b border-slate-800/60 bg-slate-900/50 flex items-center px-4 justify-between">
              <TabsList className="bg-slate-950/50 border border-slate-800/60 h-8">
                <TabsTrigger value="code" className="text-[10px] uppercase font-bold tracking-wider gap-2">
                  <Code2 size={12} /> Code
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-[10px] uppercase font-bold tracking-wider gap-2">
                  <Eye size={12} /> Preview
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]"></div>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">TSX Ready</span>
              </div>
            </div>
            
            <TabsContent value="code" className="flex-1 m-0 relative overflow-hidden">
               <CodeEditor 
                language="typescript" 
                value={outputCode} 
                readOnly={true} 
              />
              
              <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="p-3 bg-slate-800/80 hover:bg-teal-500/10 text-teal-400 border border-slate-700 hover:border-teal-500/30 rounded-xl transition-all backdrop-blur-md"
                  title="Copy Code"
                >
                  <Copy size={18} />
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={isSaving || outputCode.startsWith("//")}
                  className="p-3 bg-slate-800/80 hover:bg-indigo-500/10 text-indigo-400 border border-slate-700 hover:border-indigo-500/30 rounded-xl transition-all backdrop-blur-md disabled:opacity-50"
                  title="Save to Vault"
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <BookmarkPlus size={18} />}
                </motion.button>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 m-0 flex items-center justify-center relative bg-[#020617] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]">
              <div className="relative group p-16 bg-slate-900/50 rounded-3xl border border-slate-800/50 backdrop-blur-xl shadow-inner">
                 <div 
                  className="w-32 h-32 text-teal-400 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  dangerouslySetInnerHTML={{ __html: sourceCode }}
                 />
                 <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-600 uppercase tracking-[0.4em] whitespace-nowrap">
                    VIRTUAL_RENDER_ACTIVE
                 </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="h-8 border-t border-slate-800/60 bg-[#0B1120] flex items-center px-6 text-[10px] uppercase font-mono tracking-[0.2em] text-slate-500 justify-between z-50">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div> 
            Node: Neon_DB_Ready
          </span>
          <span className="hidden sm:inline opacity-40">Connected via Drizzle ORM</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-teal-500/70 font-bold">SVG-FLOW v1.2.0</span>
        </div>
      </footer>

    </div>
  );
}