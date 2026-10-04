import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  User, 
  Target, 
  TrendingUp, 
  Clock, 
  Settings, 
  Heart, 
  Code2, 
  Users,
  ChevronDown,
  Quote
} from 'lucide-react';
import { STORY_DATA } from '../data/storyData.js';

export function PersonalStory({ onContinueToDashboard }) {
  const [activeSidebar, setActiveSidebar] = useState('story');

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#070A13] text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar Navigation (Matching Adviser Screenshot 1) */}
        <aside className="lg:col-span-3 glass-panel p-4 flex flex-col justify-between min-h-[620px]">
          <div className="space-y-6">
            
            {/* Logo */}
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 p-[1.5px]">
                <div className="w-full h-full bg-[#070A13] rounded-[10px] flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M4 8C7 5 10 11 13 8C16 5 19 11 20 11" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M3 13C6 10 9 16 12 13C15 10 18 16 19 16" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M4 18C7 15 10 21 13 18C16 15 19 21 20 21" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">StackSpeak</span>
            </div>

            {/* Sidebar Menu Items */}
            <nav className="space-y-1.5 pt-2">
              <button
                onClick={() => setActiveSidebar('story')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'story'
                    ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Personal Story</span>
              </button>

              <button
                onClick={() => setActiveSidebar('goals')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'goals'
                    ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Target className="w-4 h-4 text-slate-400" />
                <span>Your Goals</span>
              </button>

              <button
                onClick={() => setActiveSidebar('impact')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'impact'
                    ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-slate-400" />
                <span>Impact &amp; Progress</span>
              </button>

              <button
                onClick={() => setActiveSidebar('memory')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'memory'
                    ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Memory Lane</span>
              </button>

              <button
                onClick={() => setActiveSidebar('settings')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'settings'
                    ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </button>
            </nav>

            {/* Adaptability Card in Sidebar */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-2 mt-4">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                StackSpeak adapts to you. Your stories. Your growth. Your way.
              </p>
            </div>

          </div>

          {/* User Bottom Profile Card */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src={STORY_DATA.hero.author.avatar} 
                alt="Marcus" 
                className="w-8 h-8 rounded-full object-cover border border-indigo-400/40"
              />
              <div>
                <div className="text-xs font-bold text-white">Marcus</div>
                <div className="text-[10px] text-slate-400">Builder &amp; Problem Solver</div>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

        </aside>

        {/* Main Content (lg:col-span-9) */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Pill & Action Button */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Personal Story &amp; Impact</span>
            </div>

            <button
              onClick={onContinueToDashboard}
              className="btn-secondary text-xs py-2 px-4 group"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Hero Story Grid: Title + Description + Quote + Picture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Built for Marcus
                </h1>
                <div className="w-12 h-1 bg-indigo-500 rounded-full mt-3 mb-4"></div>
              </div>

              <div className="space-y-2 text-sm text-slate-300 font-normal leading-relaxed">
                <p>
                  This is more than a tool: it's a space for your journey, your ideas, and the impact you're making.
                </p>
                <p>
                  Let's build what matters.
                </p>
              </div>

              {/* Quote Card (Matching Adviser Screenshot 1) */}
              <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3 mt-6">
                <div className="text-2xl font-serif text-indigo-400 font-bold leading-none">“</div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  StackSpeak feels like it was built for how I think. It listens, it remembers, and it helps me turn ideas into clarity and progress.
                </p>
                
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <img 
                    src={STORY_DATA.hero.author.avatar} 
                    alt="Marcus T." 
                    className="w-8 h-8 rounded-full object-cover border border-indigo-400/40"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Marcus T.</div>
                    <div className="text-[10px] text-slate-400">Full-Stack Builder &amp; Community Mentor</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Picture Column with Glowing Code Floating Tags */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                  alt="Marcus and teammate collaborating"
                  className="w-full h-full object-cover opacity-85"
                />

                {/* Ambient glow vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A13] via-transparent to-transparent"></div>

                {/* Floating Glowing Code Badges (Matching Screenshot 1) */}
                <div className="absolute top-6 left-6 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-indigo-400/40 text-indigo-300 font-mono text-xs backdrop-blur-md shadow-lg animate-pulse">
                  &lt;/&gt;
                </div>
                <div className="absolute top-14 right-8 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-purple-400/40 text-purple-300 font-mono text-xs backdrop-blur-md shadow-lg">
                  &#123;&#125;
                </div>
                <div className="absolute bottom-10 right-10 px-2 py-0.5 rounded-lg bg-slate-900/80 border border-emerald-400/40 text-emerald-300 font-mono text-xs backdrop-blur-md shadow-lg">
                  &lt;/&gt;
                </div>
              </div>
            </div>

          </div>

          {/* 4 Bottom Metric Cards (Matching Adviser Screenshot 1) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            
            {/* Card 1: 120+ */}
            <div className="glass-panel p-4 flex items-center gap-3 glass-panel-hover">
              <div className="font-mono text-indigo-400 text-base font-bold shrink-0">&lt;/&gt;</div>
              <div>
                <div className="text-xl font-black text-white tracking-tight">120+</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">Projects &amp; Ideas</div>
                <div className="text-[10px] text-slate-400">Captured</div>
              </div>
            </div>

            {/* Card 2: 8 */}
            <div className="glass-panel p-4 flex items-center gap-3 glass-panel-hover">
              <Users className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <div className="text-xl font-black text-white tracking-tight">8</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">People Inspired</div>
                <div className="text-[10px] text-slate-400">Along the way</div>
              </div>
            </div>

            {/* Card 3: Real Impact */}
            <div className="glass-panel p-4 flex items-center gap-3 glass-panel-hover">
              <Heart className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <div className="text-sm font-black text-white tracking-tight">Real Impact</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">Communities &amp;</div>
                <div className="text-[10px] text-slate-400">Opportunities</div>
              </div>
            </div>

            {/* Card 4: Growing */}
            <div className="glass-panel p-4 flex items-center gap-3 glass-panel-hover">
              <TrendingUp className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <div className="text-sm font-black text-white tracking-tight">Growing</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">Every week,</div>
                <div className="text-[10px] text-slate-400">By showing up</div>
              </div>
            </div>

          </div>

        </main>

      </div>
    </div>
  );
}
