import React from 'react';
import { 
  X, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  Code2, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export function GemmaArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#090E1A] border border-white/10 p-6 shadow-2xl space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Gemma 2 Open-Weight AI Core
              </h2>
              <p className="text-xs text-slate-400">
                Offline AST Extraction & Causal Diagnosis Engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Offline & Private</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Proprietary compiler dumps and token keys never leave Marcus's laptop. Zero cloud telemetry.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Causal AST Graphing</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Transforms 50 lines of scary terminal error dumps into an intuitive 3-node lifecycle graph.
            </p>
          </div>
        </div>

        {/* Structured Prompt & Schema */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Structured Gemma 2 Schema Output</span>
            <span className="font-mono text-[10px] text-emerald-400">gemma-2-9b-it</span>
          </div>

          <div className="p-4 rounded-xl bg-[#050811] border border-white/5 font-mono text-[11px] text-slate-300 overflow-x-auto space-y-1 leading-relaxed">
            <span className="text-slate-500">// Prompt: De-structure compiler crash into empathetic guidance</span>
            <pre className="text-sky-300">{`{
  "rootCauseHeadline": "The user object is evaluated as undefined at line 42",
  "astLifecycleNodes": [
    { "type": "Definition", "identifier": "user", "scope": "optional" },
    { "type": "MemberAccess", "property": "name", "guarded": false }
  ],
  "seniorEngineerVoiceScript": "Marcus, line 42 is fine... just add a question mark.",
  "surgicalDiff": "- user.name\\n+ user?.name ?? 'Guest'"
}`}</pre>
          </div>
        </div>

        {/* Why Open Innovation Matters */}
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-xs text-indigo-200 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-white">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Why Open Innovation Matters</span>
          </div>
          <p className="leading-relaxed text-slate-300">
            Closed proprietary APIs charge per token and send private bugs across external networks. By running open-weights (Gemma 2 via Ollama or WebAssembly), any neurodivergent developer can code anywhere: on planes, remote trains, or secure corporate air-gaps: without subscription barriers.
          </p>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary text-xs py-2 px-5"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
}
