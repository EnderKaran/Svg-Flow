"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { exportVaultAsZip } from "@/lib/export";
import { toast } from "sonner";

export default function BulkExportButton({ components }: { components: any[] }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (components.length === 0) {
      toast.error("Hata", { description: "Dışa aktarılacak ikon bulunamadı." });
      return;
    }

    setIsExporting(true);
    try {
      await exportVaultAsZip(components);
      toast.success("Hazır!", { description: "İkon paketi başarıyla oluşturuldu." });
    } catch (err) {
      toast.error("Hata", { description: "Paket oluşturulurken bir sorun çıktı." });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
    >
      {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
      <span>{isExporting ? "PACKING..." : "EXPORT BUNDLE"}</span>
    </button>
  );
}