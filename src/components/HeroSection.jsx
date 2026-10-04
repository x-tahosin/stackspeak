import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Mic, 
  Volume2, 
  Share2, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  Code2
} from 'lucide-react';

export function HeroSection({ onStartDebugging, onListenDemo, isPlayingDemo }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  const astNodes = [
    { id: 'binary', label: 'BinaryExpr', value: '+', x: '18%', y: '18%', border: 'border-cyan-400/40' },
    { id: 'ident', label: 'Identifier', value: 'user', x: '82%', y: '18%', border: 'border-purple-400/40' },
    { id: 'literal', label: 'Literal', value: '42', x: '18%', y: '78%', border: 'border-teal-400/40' },
    { id: 'callexpr', label: 'CallExpr', value: 'fn()', x: '82%', y: '78%', border: 'border-indigo-400/40' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      {/* Top Grid: Hero Content + Interactive AST Constellation (Matching Adviser Screenshot 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">
        
        {/* Left Column: Hero Text */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Debugging for Dyslexic Developers</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
            StackSpeak
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight leading-snug">
            Your calm voice pair-programmer for compiler chaos
          </p>

          {/* Description (Lean and high-impact) */}
          <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed font-normal">
            StackSpeak turns cryptic compiler errors into spoken explanations, visual stories, and plain English clarity: built for brains that work differently.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartDebugging}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-teal-500/20 hover:scale-105 transition-all group cursor-pointer"
            >
              <span>Try StackSpeak Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onListenDemo}
              className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all cursor-pointer ${
                isPlayingDemo ? 'border-teal-400/50 text-teal-300 ring-2 ring-teal-500/20' : ''
              }`}
            >
              <Mic className={`w-4 h-4 ${isPlayingDemo ? 'text-teal-400 animate-pulse' : 'text-slate-400'}`} />
              <span>{isPlayingDemo ? 'Playing Voice Demo...' : 'Listen to a Demo'}</span>
            </button>
          </div>

          {/* Trust Badge */}
          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Built with accessibility at the core</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
              <span>OpenDyslexic-inspired UI</span>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive AST Node Constellation Diagram (Matching Adviser Screenshot 4) */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px]">
          
          {/* Blurred Glow Orbs */}
          <div className="absolute w-64 h-64 rounded-full bg-teal-500/15 blur-3xl pointer-events-none -top-6 -right-6"></div>
          <div className="absolute w-64 h-64 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none -bottom-6 -left-6"></div>
          <div className="absolute w-48 h-48 rounded-full bg-purple-500/10 blur-2xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

          {/* Diagram Canvas Box */}
          <div className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-slate-900/40 border border-white/10 p-6 flex items-center justify-center backdrop-blur-xl shadow-2xl">
            
            {/* SVG Connecting Cables */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {/* Connector to BinaryExpr */}
              <line x1="50" y1="50" x2="28" y2="28" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6"/>
              <circle cx="39" cy="39" r="1.5" fill="#38BDF8" className="animate-ping"/>
              
              {/* Connector to Identifier */}
              <line x1="50" y1="50" x2="72" y2="28" stroke="#A855F7" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6"/>
              <circle cx="61" cy="39" r="1.5" fill="#A855F7"/>

              {/* Connector to Literal */}
              <line x1="50" y1="50" x2="28" y2="72" stroke="#2DD4BF" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6"/>
              <circle cx="39" cy="61" r="1.5" fill="#2DD4BF"/>

              {/* Connector to CallExpr */}
              <line x1="50" y1="50" x2="72" y2="72" stroke="#6366F1" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6"/>
              <circle cx="61" cy="61" r="1.5" fill="#6366F1"/>
            </svg>

            {/* Central Node: </> */}
            <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#0A1120] border-2 border-teal-400/60 p-2 shadow-2xl shadow-teal-500/25 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-all">
              <span className="font-mono text-2xl font-black text-teal-300">&lt;/&gt;</span>
            </div>

            {/* 4 Satellite AST Nodes */}
            {astNodes.map((node) => (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute z-10 p-3 rounded-xl bg-slate-900/90 border ${node.border} backdrop-blur-md shadow-xl cursor-pointer transition-all duration-300 ${
                  hoveredNode === node.id ? 'scale-110 ring-2 ring-white/30' : 'hover:scale-105'
                }`}
                style={{ top: node.y, left: node.x, transform: 'translate(-50%, -50%)' }}
              >
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{node.label}</div>
                <div className="text-xs font-bold text-white font-mono mt-0.5">{node.value}</div>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Bottom 4 Feature Cards (Matching Adviser Screenshot 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-16">
        
        {/* Card 1: Voice-First Debugging */}
        <div className="glass-panel p-5 glass-panel-hover flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center shrink-0">
            <Volume2 className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Voice-First Debugging</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Hear errors explained in calm, clear language.
            </p>
          </div>
        </div>

        {/* Card 2: AST Visualized */}
        <div className="glass-panel p-5 glass-panel-hover flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center shrink-0">
            <Share2 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">AST Visualized</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              See the structure. Understand the flow.
            </p>
          </div>
        </div>

        {/* Card 3: Story Mode */}
        <div className="glass-panel p-5 glass-panel-hover flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-400/20 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Story Mode</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Errors turned into short, logical stories.
            </p>
          </div>
        </div>

        {/* Card 4: Built for Dyslexic Minds */}
        <div className="glass-panel p-5 glass-panel-hover flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-400/20 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Built for Dyslexic Minds</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Less noise. More clarity. You set the pace.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
