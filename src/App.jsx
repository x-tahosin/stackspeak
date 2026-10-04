import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { DebuggerWorkspace } from './components/DebuggerWorkspace.jsx';
import { PersonalStory } from './components/PersonalStory.jsx';
import { AnalysisResultsModal } from './components/AnalysisResultsModal.jsx';
import { GemmaArchitectureModal } from './components/GemmaArchitectureModal.jsx';
import { ApiKeyModal } from './components/ApiKeyModal.jsx';
import { audioEngine, VOICES } from './components/AudioEngine.js';
import { ERROR_PRESETS } from './data/presets.js';
import { Heart, Github } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('stackspeak_elevenlabs_key') || '');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isGemmaModalOpen, setIsGemmaModalOpen] = useState(false);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [currentPreset, setCurrentPreset] = useState(ERROR_PRESETS[0]);

  // Apply dyslexia-mode CSS class to body
  useEffect(() => {
    if (dyslexiaMode) {
      document.body.classList.add('dyslexia-mode');
    } else {
      document.body.classList.remove('dyslexia-mode');
    }
  }, [dyslexiaMode]);

  const handleSaveKey = (key) => {
    setApiKey(key);
    localStorage.setItem('stackspeak_elevenlabs_key', key);
  };

  const handleListenDemo = () => {
    if (isPlayingDemo) {
      audioEngine.stop();
      setIsPlayingDemo(false);
      return;
    }

    setIsPlayingDemo(true);
    const demoText = "Marcus, line 42 is fine: take a deep breath. You don't have to rewrite your entire auth function. Just drop an optional chaining question mark: user?.name. It makes it completely safe and stops the crash.";

    audioEngine.speak(
      demoText,
      VOICES[0].id,
      apiKey,
      null,
      () => setIsPlayingDemo(false)
    );
  };

  return (
    <div className="app-viewport min-h-screen flex flex-col justify-between bg-[#070A13]">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dyslexiaMode={dyslexiaMode}
        setDyslexiaMode={setDyslexiaMode}
        hasApiKey={Boolean(apiKey)}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        onOpenGemmaModal={() => setIsGemmaModalOpen(true)}
        onTriggerDemo={handleListenDemo}
      />

      {/* Main Dynamic View */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HeroSection
            onStartDebugging={() => setActiveTab('debugger')}
            onListenDemo={handleListenDemo}
            isPlayingDemo={isPlayingDemo}
          />
        )}

        {activeTab === 'debugger' && (
          <DebuggerWorkspace
            apiKey={apiKey}
            onOpenInsights={() => setActiveTab('insights')}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'insights' && (
          <AnalysisResultsModal
            activePreset={currentPreset}
            onBack={() => setActiveTab('debugger')}
            onApplyFix={() => setActiveTab('debugger')}
          />
        )}

        {activeTab === 'story' && (
          <PersonalStory
            onContinueToDashboard={() => setActiveTab('debugger')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-[#050811] py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">StackSpeak</span>
            <span>&bull;</span>
            <span>Built with open-source Gemma 2 and ElevenLabs for Hacktoberfest 2026 (Build for a Friend)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              Made with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> for Marcus T.
            </span>
            <span>&bull;</span>
            <a 
              href="https://github.com/x-tahosin" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>@x-tahosin</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveKey}
      />

      <GemmaArchitectureModal
        isOpen={isGemmaModalOpen}
        onClose={() => setIsGemmaModalOpen(false)}
      />

    </div>
  );
}
