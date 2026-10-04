import React, { useState } from 'react';
import { 
  FileCode, 
  Trash2, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  Layers, 
  Info,
  Wand2,
  ChevronRight,
  Clock,
  Settings,
  Star
} from 'lucide-react';
import { VisualAstFlow } from './VisualAstFlow.jsx';
import { VoiceDebugger } from './VoiceDebugger.jsx';
import { ERROR_PRESETS } from '../data/presets.js';

export function DebuggerWorkspace({ apiKey, onOpenInsights, onSelectTab }) {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const activePreset = ERROR_PRESETS[activePresetIndex];
  const [customInput, setCustomInput] = useState(activePreset.errorCode);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('debugger');

  const handleSelectPreset = (index) => {
    setActivePresetIndex(index);
    setCustomInput(ERROR_PRESETS[index].errorCode);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 400);
  };

  const handleClear = () => {
    setCustomInput('');
  };

  // Generate line numbers for editor
  const lineNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#070A13] text-white">
      
      {/* Sub-Header Tabs (Matching Adviser Screenshot 2) */}
      <div className="border-b border-white/5 bg-[#090D18]/90 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Workspace Title */}
        <div className="flex items-center gap-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
            Debugger Workspace
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px] border border-purple-500/20 font-mono">
            <span>Preset:</span>
            <span className="font-semibold text-white">{activePreset.language}</span>
          </div>
        </div>

        {/* Center Tab Navigation (Debugger, History, Insights, Settings) */}
        <div className="flex items-center gap-6 text-xs font-medium">
          <button
            onClick={() => setActiveSubTab('debugger')}
            className={`flex items-center gap-1.5 pb-1 relative transition-all ${
              activeSubTab === 'debugger'
                ? 'text-purple-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span>Debugger</span>
            {activeSubTab === 'debugger' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveSubTab('history');
              alert("History: 14 recent compiler stacktraces saved in local zero-telemetry storage.");
            }}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>History</span>
          </button>

          <button
            onClick={onOpenInsights}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Insights</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab('settings');
              alert("Settings: OpenDyslexic typography, contrast filters, ElevenLabs voice rate, and Gemma temperature.");
            }}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>

        {/* Pro Plan Badge & User Avatar */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 text-purple-200 text-xs font-semibold">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Pro Plan</span>
          </div>

          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" 
            alt="User" 
            className="w-7 h-7 rounded-full object-cover border border-purple-500/40"
          />
        </div>

      </div>

      {/* Main 3-Column Workspace Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5 space-y-4">
        
        {/* Preset Selector Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-900/50 border border-white/5 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="font-semibold text-white">Load Compiler Incident:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {ERROR_PRESETS.map((preset, idx) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(idx)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activePresetIndex === idx
                    ? 'bg-purple-600/30 text-purple-200 border border-purple-500/50 shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {preset.language}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Grid Matching Adviser Screenshot 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[580px] items-stretch">
          
          {/* Column 1: Paste Code or Error (lg:col-span-4) */}
          <div className="lg:col-span-4 glass-panel p-5 flex flex-col justify-between h-full">
            <div>
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-sky-400" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Paste Code or Error
                  </h2>
                </div>
                <button 
                  onClick={handleClear}
                  className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                  title="Clear Editor"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-2">
                Paste your compiler error or stacktrace here...
              </p>

              {/* Code Box with Line Numbers 1 to 12 */}
              <div className="mt-3 relative rounded-xl bg-[#080C16] border border-white/10 overflow-hidden flex font-mono text-xs shadow-inner">
                
                {/* Line Numbers Gutter */}
                <div className="w-8 py-3 bg-[#050811] text-slate-400 select-none text-right pr-2 space-y-[2px] border-r border-white/5 font-mono text-[11px]">
                  {lineNumbers.map((n) => (
                    <div key={n} className={n === activePreset.line ? 'text-sky-400 font-bold' : ''}>
                      {n}
                    </div>
                  ))}
                </div>

                {/* Textarea */}
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Paste your compiler error or stacktrace here..."
                  rows={12}
                  className="flex-1 p-3 bg-transparent text-slate-200 resize-none focus:outline-none font-mono text-xs leading-[1.35] selection:bg-purple-500/30"
                  spellCheck="false"
                />
              </div>

              {/* Language Support Indicator */}
              <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Supports TypeScript, Python, Java, Go, Rust, and more.</span>
              </div>

            </div>

            {/* Bottom Actions for Column 1 */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="btn-gradient-purple flex-1 py-2.5 text-xs justify-center"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAnalyzing ? 'Parsing AST...' : 'Analyze & Visualize'}</span>
                </button>

                <button
                  onClick={handleClear}
                  className="btn-secondary py-2.5 px-3 text-xs"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>{customInput.length} characters</span>
                <button
                  onClick={onOpenInsights}
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-0.5 transition-colors font-medium"
                >
                  <span>Detailed Breakdown</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          {/* Column 2: VISUAL AST FLOW (lg:col-span-4) */}
          <div className="lg:col-span-4 h-full">
            <VisualAstFlow activePreset={activePreset} />
          </div>

          {/* Column 3: VOICE DEBUGGER (lg:col-span-4) */}
          <div className="lg:col-span-4 h-full">
            <VoiceDebugger activePreset={activePreset} apiKey={apiKey} />
          </div>

        </div>

        {/* Footer Status Bar (Matching Adviser Screenshot 2) */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span>Ready to help you debug with clarity and kindness.</span>
            <span className="text-pink-400">♥</span>
          </div>
          <div className="flex items-center gap-4">
            <span>AST Depth: {activePreset.astDepth}</span>
            <span>•</span>
            <span>Nodes: {activePreset.nodesCount}</span>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy First</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
