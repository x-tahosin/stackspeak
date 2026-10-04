import React from 'react';
import { 
  Sparkles, 
  Eye, 
  Home, 
  Terminal, 
  BookOpen, 
  Activity,
  Key,
  Check,
  Sun,
  Moon,
  Volume2,
  Cpu
} from 'lucide-react';

export function Navbar({ 
  activeTab, 
  setActiveTab, 
  dyslexiaMode, 
  setDyslexiaMode, 
  hasApiKey, 
  onOpenKeyModal,
  onOpenGemmaModal,
  onTriggerDemo
}) {
  return (
    <header className="w-full border-b border-[rgba(255,255,255,0.08)] bg-[#070A13]/90 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo (Matching Adviser Screenshots) */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#38BDF8] via-[#6366F1] to-[#A855F7] p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#070A13] rounded-[10px] flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M4 8C7 5 10 11 13 8C16 5 19 11 20 11" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M3 13C6 10 9 16 12 13C15 10 18 16 19 16" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M4 18C7 15 10 21 13 18C16 15 19 21 20 21" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                StackSpeak
              </span>
            </div>
          </div>
        </div>

        {/* Center Navigation Tabs (Home, Debugger, Story, Demo) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
              activeTab === 'home'
                ? 'text-teal-300 bg-teal-500/10 border border-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
            {activeTab === 'home' && (
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse ml-0.5"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('debugger')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'debugger'
                ? 'text-purple-300 bg-purple-500/10 border border-purple-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>Debugger</span>
          </button>

          <button
            onClick={() => setActiveTab('story')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'story'
                ? 'text-indigo-300 bg-indigo-500/10 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Story</span>
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'insights'
                ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Demo</span>
          </button>

        </nav>

        {/* Right Controls: Accessibility, Theme, Key, Marcus */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* ElevenLabs API Key Modal trigger */}
          <button
            onClick={onOpenKeyModal}
            className={`hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
              hasApiKey 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
            title="Configure ElevenLabs Voice Key"
          >
            <Key className="w-3.5 h-3.5 text-sky-400" />
            <span>ElevenLabs</span>
            {hasApiKey && <Check className="w-3 h-3 text-emerald-400" />}
          </button>

          {/* Gemma 2 Offline Core Inspector */}
          <button
            onClick={onOpenGemmaModal}
            className="hidden md:flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all font-semibold"
            title="Inspect Gemma 2 Causal AST Architecture"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gemma 2</span>
          </button>

          {/* Accessibility Toggle Button (Matching Adviser Screenshot 4) */}
          <button
            onClick={() => setDyslexiaMode(!dyslexiaMode)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${
              dyslexiaMode
                ? 'bg-sky-500/20 border-sky-400/50 text-sky-200 shadow-sm shadow-sky-500/20'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
            title="Toggle OpenDyslexic Typography & High Contrast"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Accessibility</span>
            <span className={`text-[10px] px-1 rounded ${dyslexiaMode ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-700 text-slate-300'}`}>
              {dyslexiaMode ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Dark / Light Toggle Icon */}
          <button 
            onClick={() => alert("StackSpeak is permanently calibrated to deep obsidian dark mode for zero visual glare.")}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="Display Mode: Obsidian Dark"
          >
            <Sun className="w-4 h-4 text-amber-400" />
          </button>

          {/* Marcus Profile Avatar */}
          <div 
            onClick={() => setActiveTab('story')}
            className="flex items-center pl-1 cursor-pointer group"
            title="Marcus T. : Built for a Friend"
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" 
              alt="Marcus" 
              className="w-8 h-8 rounded-full border border-purple-500/40 object-cover group-hover:ring-2 ring-purple-400 transition-all"
            />
          </div>

        </div>

      </div>
    </header>
  );
}
