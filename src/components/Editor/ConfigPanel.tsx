"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings2, Zap } from "lucide-react";
import { SvgoConfig } from "@/types";

interface ConfigPanelProps {
  config: SvgoConfig;
  onChange: (config: SvgoConfig) => void;
}

export default function ConfigPanel({ config, onChange }: ConfigPanelProps) {
  const updateConfig = (key: keyof SvgoConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="p-6 bg-slate-900/40 border-l border-slate-800 h-full backdrop-blur-md">
      <div className="flex items-center gap-2 mb-8">
        <Settings2 size={18} className="text-teal-500" />
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Engine_Config</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-xs text-slate-200 uppercase tracking-wider">Remove Dimensions</Label>
            <p className="text-[10px] text-slate-500 italic uppercase">Strip width/height</p>
          </div>
          <Switch 
            checked={config.removeDimensions} 
            onCheckedChange={(val) => updateConfig("removeDimensions", val)} 
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-xs text-slate-200 uppercase tracking-wider">Prettify Output</Label>
            <p className="text-[10px] text-slate-500 italic uppercase">Formatted XML code</p>
          </div>
          <Switch 
            checked={config.pretty} 
            onCheckedChange={(val) => updateConfig("pretty", val)} 
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-xs text-slate-200 uppercase tracking-wider">Prefix IDs</Label>
            <p className="text-[10px] text-slate-500 italic uppercase">Avoid ID collisions</p>
          </div>
          <Switch 
            checked={config.prefixIds} 
            onCheckedChange={(val) => updateConfig("prefixIds", val)} 
          />
        </div>

        <div className="pt-6 border-t border-slate-800">
           <div className="bg-teal-500/5 border border-teal-500/20 rounded-xl p-4 flex items-start gap-3">
              <Zap size={14} className="text-teal-400 mt-1" />
              <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-tighter">
                Config changes apply instantly on the next convert cycle.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}