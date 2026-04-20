"use client";

import { useState } from "react";
import { Play, Copy, Trash2, Share2, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CodeEditor from "./components/editor/CodeEditor";
import { convertSvgToComponent } from "@/lib/actions";

// Sonner ve Shadcn Bileşenleri
import { toast, Toaster } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LabPage() {
  const [sourceCode, setSourceCode] = useState(
`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
  <polyline points="13 11 9 17 15 17 11 23" />
</svg>`
  );

  const [outputCode, setOutputCode] = useState("// Dönüştürülen TSX kodu burada görünecek...");
  const [isConverting, setIsConverting] = useState(false);

  // Dönüştürme İşlemi
  const handleConvert = async () => {
    if (!sourceCode.trim()) {
      toast.error("Hata", { description: "Lütfen önce bir SVG kodu girin." });
      return;
    }

    setIsConverting(true);
    try {
      const result = await convertSvgToComponent(sourceCode);
      setOutputCode(result);
      
      // Sonner Başarı Bildirimi
      toast.success("Dönüşüm Tamamlandı", {
        description: "Bileşen başarıyla oluşturuldu ve hazır.",
        icon: <Sparkles className="h-4 w-4 text-teal-400" />,
      });
    } catch (err) {
      toast.error("Dönüştürme Hatası", {
        description: "SVG kodu işlenirken bir sorun oluştu."
      });
    } finally {
      setIsConverting(false);
    }
  };

  // Kopyalama İşlemi
  const handleCopy = () => {
    if (outputCode.startsWith("//")) return;
    
    navigator.clipboard.writeText(outputCode);
    toast.success("Kopyalandı", {
      description: "Kod panoya başarıyla eklendi.",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-[#0B1120] bg-grid flex flex-col font-sans selection:bg-teal-500/30 overflow-hidden">
      
      <Toaster 
        theme="dark" 
        position="bottom-right" 
        toastOptions={{
          style: { 
            background: '#0F172A', 
            border: '1px solid rgba(30, 41, 59, 0.7)',
            color: '#F8FAFC'
          },
        }}
      />

      <header className="h-16 border-b border-slate-800/60 bg-[#0B1120]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="font-bold text-lg text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)]">
              <Share2 size={18} className="text-white rotate-12" />
            </div>
            <span className="font-bold tracking-tight">SVG-Flow</span>
          </div>
          <div className="h-4 w-px bg-slate-800 hidden md:block"></div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mt-1 hidden md:block">Engine v1.1.0</span>
        </div>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConvert}
            disabled={isConverting}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-2 rounded-lg transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] disabled:opacity-50"
          >
            {isConverting ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            <span>{isConverting ? "PROCESSING" : "CONVERT"}</span>
          </motion.button>
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
          </div>
          <div className="flex-1 relative overflow-hidden">
            <CodeEditor 
              language="xml" 
              value={sourceCode} 
              onChange={(val) => setSourceCode(val || "")} 
            />
          </div>
        </section>

        {/* SAĞ PANEL: OUTPUT + PREVIEW (TABS) */}
        <section className="flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl h-[calc(100vh-160px)]">
          <Tabs defaultValue="code" className="flex-1 flex flex-col">
            <div className="h-12 border-b border-slate-800/60 bg-slate-900/50 flex items-center px-4 justify-between">
              <TabsList className="bg-slate-950/50 border border-slate-800/60 h-8">
                <TabsTrigger value="code" className="text-[10px] uppercase font-bold tracking-wider data-[state=active]:bg-teal-500 data-[state=active]:text-slate-950">Code</TabsTrigger>
                <TabsTrigger value="preview" className="text-[10px] uppercase font-bold tracking-wider data-[state=active]:bg-teal-500 data-[state=active]:text-slate-950">Preview</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="code" className="flex-1 m-0 relative overflow-hidden">
               <CodeEditor 
                language="typescript" 
                value={outputCode} 
                readOnly={true} 
              />
              <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-teal-500/20 text-teal-400 border border-slate-700 rounded-lg transition-all z-20 group"
              >
                <Copy size={16} className="group-active:scale-90 transition-transform" />
              </button>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 m-0 flex items-center justify-center relative bg-[#020617] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]">
              <div className="relative p-12 bg-slate-900/50 rounded-3xl border border-slate-800/50 backdrop-blur-xl">
                 <div 
                  className="w-32 h-32 text-teal-400 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: sourceCode }}
                 />
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <footer className="h-8 border-t border-slate-800/60 bg-[#0B1120] flex items-center px-6 text-[10px] uppercase font-mono tracking-[0.2em] text-slate-500 justify-between">
        <span className="text-teal-500/70 font-bold tracking-widest text-[9px]">SVG-FLOW // SONNER READY</span>
        <div className="flex items-center gap-4">
          <span>{sourceCode.length} chars</span>
          <span className="w-px h-3 bg-slate-800"></span>
          <span>UTF-8</span>
        </div>
      </footer>
    </div>
  );
}