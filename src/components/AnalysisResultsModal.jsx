import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Wand2, 
  Info, 
  Download,
  Heart,
  ChevronDown,
  Bell,
  Layers,
  Activity,
  ListTree,
  Radio,
  Settings,
  Code2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine, VOICES } from './AudioEngine.js';

export function AnalysisResultsModal({ activePreset, onBack, onApplyFix }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fixApplied, setFixApplied] = useState(false);
  const [speed, setSpeed] = useState('1.0x');
  const [activeSideNav, setActiveSideNav] = useState('results');

  const spokenText = "Hi! So the issue here is that the user hit their order limit for the month. They're on the Starter plan, which allows up to 100 orders, but they've already placed 103. That's why the request was rejected with a 429. It's a safeguard to keep usage within plan limits. Upgrading their plan or waiting for the next billing cycle will resolve this.";

  const toggleVoice = () => {
    if (isPlaying) {
      audioEngine.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      audioEngine.speak(
        spokenText,
        VOICES[0].id,
        '',
        null,
        () => setIsPlaying(false)
      );
    }
  };

  const handleApply = () => {
    setFixApplied(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.85 }
    });
    audioEngine.playTone(880, 'sine', 0.25);
    setTimeout(() => {
      if (onApplyFix) onApplyFix();
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#070A13] text-white">
      
      {/* Sub-Header Bar (Matching Adviser Screenshot 3) */}
      <div className="border-b border-white/5 bg-[#090D18]/90 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Project Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all">
            <span className="text-xs font-semibold text-white">Project Nova</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Analysis complete</span>
          </div>
        </div>

        {/* Right Utility Navigation */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <button 
            onClick={() => setActiveSideNav('results')}
            className="hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Insights</span>
          </button>
          <a href="#docs" className="hover:text-white transition-colors">Docs</a>
          <button className="relative text-slate-400 hover:text-white transition-colors p-1">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-sky-400 rounded-full"></span>
          </button>
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-[11px] text-slate-200">
            AK
          </div>
        </div>

      </div>

      {/* Main Container with Sidebar + Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sub-Navigation Sidebar (lg:col-span-2) */}
        <aside className="lg:col-span-2 glass-panel p-3 space-y-1">
          <button
            onClick={() => setActiveSideNav('results')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeSideNav === 'results'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4 text-teal-400" />
            <span>Results</span>
          </button>

          <button
            onClick={() => setActiveSideNav('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeSideNav === 'overview'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4 text-slate-400" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveSideNav('issues')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeSideNav === 'issues'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-slate-400" />
            <span>Issues</span>
          </button>

          <button
            onClick={() => setActiveSideNav('traces')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeSideNav === 'traces'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ListTree className="w-4 h-4 text-slate-400" />
            <span>Traces</span>
          </button>

          <button
            onClick={() => setActiveSideNav('alerts')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeSideNav === 'alerts'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Radio className="w-4 h-4 text-slate-400" />
            <span>Alerts</span>
          </button>

          <button
            onClick={() => setActiveSideNav('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeSideNav === 'settings'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </button>

          <div className="pt-4 border-t border-white/5">
            <button
              onClick={onBack}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to projects</span>
            </button>
          </div>
        </aside>

        {/* Center Main Analysis Panel (lg:col-span-10) */}
        <div className="lg:col-span-10 space-y-6">
          
          {/* Title Header with Root Cause Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Analysis Results
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Detailed breakdown of the detected issue and guidance to resolve it.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Root cause identified</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
          </div>

          {/* 3-Column Diagnostic Cards (Visual Error Flow, Root Cause, Voice Explanation) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            
            {/* Card 1: Visual Error Flow */}
            <div className="glass-panel p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-200">
                  <span>Visual Error Flow</span>
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Simplified path from trigger to failure
                </p>

                {/* Vertical Step Nodes */}
                <div className="space-y-2.5 pt-4">
                  
                  {/* Step 1: API Request Received */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-400/40 shadow-sm shadow-cyan-500/10 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">API Request Received</div>
                      <div className="text-[10px] text-cyan-300 font-mono">POST /v1/orders</div>
                    </div>
                  </div>

                  {/* Step 2: Input Validation */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-teal-500/30 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Input Validation</div>
                      <div className="text-[10px] text-teal-300 font-mono">validateOrderPayload()</div>
                    </div>
                  </div>

                  {/* Step 3: Load User & Plan (Error Origin) */}
                  <div className="relative p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Load User &amp; Plan</div>
                        <div className="text-[10px] text-purple-300 font-mono">fetchUser(userId)</div>
                      </div>
                    </div>
                    
                    {/* Attached Error Origin Badge */}
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-400/40 text-[10px] font-semibold">
                      <AlertTriangle className="w-3 h-3 text-purple-300" />
                      <span>Error Origin</span>
                    </div>
                  </div>

                  {/* Step 4: Plan Limit Exceeded */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-purple-600/30 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-purple-600/20 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Plan Limit Exceeded</div>
                      <div className="text-[10px] text-slate-400 font-mono">userPlan.orderLimit = 100, orders = 103</div>
                    </div>
                  </div>

                  {/* Step 5: Request Rejected */}
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center shrink-0">
                      <X className="w-4 h-4 text-rose-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Request Rejected</div>
                      <div className="text-[10px] text-rose-300 font-mono">429 Too Many Requests</div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="pt-3 border-t border-white/5 text-center text-[10px] text-slate-400">
                ✦ Hover nodes for more details
              </div>
            </div>

            {/* Card 2: Root Cause */}
            <div className="glass-panel p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                
                {/* Header */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Root Cause</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  The core reason behind the failure
                </p>

                {/* Big Headline */}
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  The user's current plan limit for orders was exceeded.
                </h2>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  The request failed because the user had already placed 103 orders this month, surpassing their plan limit of 100.
                </p>

                {/* Why it happened */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Why it happened</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-semibold border border-purple-500/30">
                      Most likely cause
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The user is on a Starter plan which restricts users to 100 orders per month. Their usage reached 103 before this request, and no additional capacity or upgrade was available.
                  </p>
                </div>

                {/* Evidence */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-bold text-white">Evidence</span>
                  <ul className="space-y-1 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></span>
                      <span>Order count for user "usr_8f3a7c" in billing cycle May 2025: 103</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0"></span>
                      <span>Plan limit for "starter" tier: 100 orders per month</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Card 3: Voice Explanation (New) */}
            <div className="glass-panel p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-200">
                    <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>Voice Explanation</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold">
                    New
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Listen to a clear, empathetic explanation.
                </p>

                {/* Audio Player Box */}
                <div className="p-4 rounded-xl bg-[#090D18] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleVoice}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                      </button>
                      <div>
                        <div className="text-xs font-semibold text-white">Root cause explanation</div>
                        <div className="text-[10px] text-slate-400 font-mono">1:24 • 182 words</div>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-white transition-colors" title="Download Audio">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Cyan to Purple Waveform Equalizer */}
                  <div className="h-9 flex items-center gap-1 px-2 bg-slate-950/70 rounded-lg">
                    {Array.from({ length: 24 }, (_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-full bg-gradient-to-t from-cyan-400 via-sky-400 to-purple-400 transition-all duration-150"
                        style={{
                          height: isPlaying 
                            ? `${Math.max(15, Math.sin(i * 0.45 + Date.now()/180) * 45 + 50)}%` 
                            : '20%'
                        }}
                      ></div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <button 
                      onClick={() => setSpeed(speed === '1.0x' ? '1.25x' : speed === '1.25x' ? '1.5x' : '1.0x')}
                      className="hover:text-white transition-colors font-mono"
                    >
                      {speed} &gt;
                    </button>
                    <span className="flex items-center gap-1 text-slate-300 font-medium">
                      <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                      Calm
                    </span>
                  </div>
                </div>

                {/* Empathetic Transcript Card */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>Empathetic Transcript</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
                    "{spokenText}"
                  </p>
                  <div className="flex justify-end pt-1">
                    <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Sticky Action Bar (Suggested Fix, Increase order limit, Apply Fix, Dismiss) */}
          <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
            
            {/* Left: Suggested Fix */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center shrink-0">
                <Wand2 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Suggested Fix</div>
                <div className="text-xs text-slate-400 mt-0.5">Resolve this issue in one click.</div>
              </div>
            </div>

            {/* Center: Fix action description */}
            <div className="flex items-center gap-3 max-w-md">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-400/20 flex items-center justify-center shrink-0 font-mono text-teal-400 text-xs">
                &lt;/&gt;
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  Increase order limit or prompt plan upgrade
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Update plan limit or guide user to upgrade their subscription.
                </div>
              </div>
            </div>

            {/* Right: Apply Fix + Dismiss */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleApply}
                disabled={fixApplied}
                className={`btn-primary text-xs py-2.5 px-5 flex items-center gap-2 !bg-gradient-to-r !from-teal-600 !to-emerald-500 !border-teal-400/40 shadow-lg shadow-teal-500/20 ${
                  fixApplied ? '!bg-emerald-600 !border-emerald-400' : ''
                }`}
              >
                {fixApplied ? <Check className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-white" />}
                <span className="font-semibold">{fixApplied ? 'Fix Applied!' : 'Apply Fix'}</span>
                <span className="text-[10px] opacity-80 font-normal">Safe • Reversible • Takes &lt; 30s</span>
              </button>

              <button
                onClick={onBack}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
              >
                <X className="w-3.5 h-3.5" />
                <span>Dismiss</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
