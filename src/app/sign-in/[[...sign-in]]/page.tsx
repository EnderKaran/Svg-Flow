import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] bg-grid flex items-center justify-center p-4">
      <div className="w-full max-w-md relative group">
        {/* Terminal Header Decorator */}
        <div className="absolute -top-10 left-0 right-0 h-10 bg-slate-900 border border-slate-800 border-b-0 rounded-t-xl flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-teal-500/80"></div>
          </div>
          <span className="ml-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            secure_access_v2.4.0
          </span>
        </div>
        
        <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-xl rounded-b-xl overflow-hidden shadow-2xl">
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none w-full p-8",
                headerTitle: "text-white text-xl font-bold tracking-tight",
                headerSubtitle: "text-slate-400 text-sm",
                socialButtonsBlockButton: "bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-white transition-all h-11",
                formButtonPrimary: "bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all h-11 shadow-[0_0_20px_rgba(20,184,166,0.2)]",
                formFieldLabel: "text-slate-400 text-xs uppercase tracking-wider font-semibold",
                formFieldInput: "bg-slate-950/50 border-slate-800 text-white focus:border-teal-500/50 transition-all",
                footerActionLink: "text-teal-400 hover:text-teal-300 font-medium",
                identityPreviewText: "text-slate-300",
                dividerLine: "bg-slate-800",
                dividerText: "text-slate-500 uppercase text-[10px] font-bold"
              }
            }}
          />
        </div>
        
        {/* Terminal Footer Status */}
        <div className="mt-4 flex items-center justify-between px-2 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
          <span>Latency: 12ms</span>
          <span className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-teal-500 animate-pulse"></div>
            Encrypted Connection
          </span>
        </div>
      </div>
    </div>
  );
}