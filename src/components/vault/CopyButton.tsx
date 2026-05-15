"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function CopyButton({ code, name }: { code: string; name: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      toast.success("Kopyalandı", {
        description: `${name} bileşen kodu başarıyla panoya eklendi.`,
      });
      
      // 2 saniye sonra ikonu eski haline döndür
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Hata", { description: "Kod kopyalanamadı." });
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 hover:bg-slate-800 rounded-md text-slate-400 hover:text-teal-400 transition-colors"
      title="Copy TSX Code"
    >
      {isCopied ? (
        <Check size={14} className="text-teal-500" />
      ) : (
        <Copy size={14} />
      )}
    </button>
  );
}