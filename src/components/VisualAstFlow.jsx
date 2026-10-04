import React from 'react';
import { 
  GitBranch, 
  Code2, 
  CheckCircle2, 
  AlertOctagon, 
  Lightbulb, 
  ShieldCheck,
  ArrowDown,
  User,
  AlertTriangle,
  Check,
  X
} from 'lucide-react';

export function VisualAstFlow({ activePreset }) {
  if (!activePreset) return null;

  return (
    <div className="glass-panel p-5 flex flex-col h-full justify-between">
      
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-purple-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Visual AST Flow
            </h2>
          </div>
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span>Line {activePreset.line}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </span>
        </div>

        {/* Visual Node Tree */}
        <div className="flex flex-col items-center gap-2.5 pt-5 pb-3">
          
          {/* Node 1: Identifier user */}
          <div className="w-full max-w-[280px] p-2.5 px-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 shadow-lg shadow-purple-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-purple-400 font-mono text-xs font-bold">&lt;/&gt;</span>
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider font-semibold text-purple-300">Identifier</div>
                <div className="text-xs font-bold font-mono text-white">user</div>
              </div>
            </div>
          </div>

          {/* Connector 1 */}
          <div className="w-0.5 h-4 bg-gradient-to-b from-purple-500 to-sky-500"></div>

          {/* Node 2: Member Access user.name */}
          <div className="w-full max-w-[280px] p-2.5 px-4 rounded-2xl bg-blue-950/40 border border-sky-500/40 shadow-lg shadow-sky-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-sky-400 font-mono text-xs font-bold">&lt;/&gt;</span>
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider font-semibold text-sky-300">Member Access</div>
                <div className="text-xs font-bold font-mono text-white">user.name</div>
              </div>
            </div>
          </div>

          {/* Connector 2 */}
          <div className="w-0.5 h-4 bg-gradient-to-b from-sky-500 to-teal-500"></div>

          {/* Node 3: Optional Chain user?.name */}
          <div className="w-full max-w-[280px] p-2.5 px-4 rounded-2xl bg-teal-950/40 border border-teal-400/40 shadow-lg shadow-teal-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-teal-300 font-mono text-xs font-bold">&#9873;</span>
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider font-semibold text-teal-300">Optional Chain</div>
                <div className="text-xs font-bold font-mono text-white">user?.name</div>
              </div>
            </div>
          </div>

          {/* Branch Decision Split (Exists vs Missing) */}
          <div className="w-full max-w-[320px] pt-1">
            
            {/* Split connector line */}
            <div className="flex justify-center mb-1.5">
              <div className="w-0.5 h-3 bg-slate-600"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              
              {/* Left Branch: Exists -> Proceed (No error) */}
              <div className="space-y-1 flex flex-col items-center">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold uppercase">
                  Exists
                </span>
                <div className="w-full p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col items-center text-center shadow-lg shadow-emerald-900/10">
                  <div className="flex items-center gap-1 text-xs font-bold text-white">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Proceed</span>
                  </div>
                  <span className="text-[10px] text-emerald-300/80 mt-0.5">No error</span>
                </div>
              </div>

              {/* Right Branch: Missing -> Potential Error (Cannot read property) */}
              <div className="space-y-1 flex flex-col items-center">
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-mono font-bold uppercase">
                  Missing
                </span>
                <div className="w-full p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 flex flex-col items-center text-center shadow-lg shadow-rose-900/10">
                  <div className="flex items-center gap-1 text-xs font-bold text-white">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Potential Error</span>
                  </div>
                  <span className="text-[10px] text-rose-300/80 mt-0.5">Cannot read property</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Footer Area: Legend & Helpful Tip */}
      <div className="space-y-2.5 pt-3 border-t border-white/5">
        
        {/* Color Legend (Matching Screenshot 2) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-[9px] text-slate-400 font-mono">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            <span>Definition</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>Access</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            <span>Check</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Safe Path</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            <span>Missing Check</span>
          </div>
        </div>

        {/* Tip Callout (Matching Screenshot 2) */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-start gap-2 text-xs text-slate-300">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-snug text-[11px]">
            <span className="font-semibold text-white">Tip:</span> Optional chaining prevents runtime errors when user is undefined or null.
          </p>
        </div>

      </div>

    </div>
  );
}
