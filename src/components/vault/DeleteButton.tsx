"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteVaultComponent } from "@/lib/actions";
import { toast } from "sonner";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Bu bileşeni silmek istediğinize emin misiniz?")) return;

    setIsDeleting(true);
    try {
      const result = await deleteVaultComponent(id);
      if (result.success) {
        toast.success("Silindi", { description: "Bileşen Vault'tan kaldırıldı." });
      } else {
        toast.error("Hata", { description: result.error });
      }
    } catch (err) {
      toast.error("Hata", { description: "Bir şeyler ters gitti." });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 hover:bg-slate-800 rounded-md text-slate-400 hover:text-rose-400 transition-colors disabled:opacity-50"
    >
      {isDeleting ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Trash2 size={14} />
      )}
    </button>
  );
}