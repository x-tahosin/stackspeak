import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  Check, 
  Sparkles,
  Plus
} from 'lucide-react';
import { audioEngine, VOICES } from './AudioEngine.js';

export function VoiceDebugger({ activePreset, apiKey }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(7);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const animFrameRef = useRef(null);
  const [waveBins, setWaveBins] = useState(new Array(24).fill(15));

  // Reset audio on preset change
  useEffect(() => {
    audioEngine.stop();
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(7);
  }, [activePreset]);

  // Waveform animation loop
  useEffect(() => {
    const updateWaveform = () => {
      if (isPlaying) {
        const newBins = Array.from({ length: 24 }, (_, i) => {
          const base = Math.sin((Date.now() / 150) + i * 0.4) * 20 + 35;
          return Math.max(10, Math.min(65, base + (Math.random() * 10 - 5)));
        });
        setWaveBins(newBins);
      } else {
        setWaveBins(new Array(24).fill(12));
      }
      animFrameRef.current = requestAnimationFrame(updateWaveform);
    };

    animFrameRef.current = requestAnimationFrame(updateWaveform);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioEngine.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const spokenText = "Marcus, line 42 is fine... just add a ? Optional chaining makes this safe and concise.";
      
      audioEngine.speak(
        spokenText,
        VOICES[0].id,
        apiKey,
        (curr, dur) => {
          setCurrentTime(curr);
          if (dur) setDuration(dur);
        },
        () => {
          setIsPlaying(false);
          setCurrentTime(0);
        }
      );
    }
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText("Marcus, line 42 is fine... just add a ?\nOptional chaining makes this safe and concise.");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-panel p-5 flex flex-col h-full justify-between">
      
      <div>
        {/* Top Header (Matching Adviser Screenshot 2) */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Voice Debugger</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-normal">
              Empathetic. Clear. Human.
            </p>
          </div>

          <button
            onClick={() => {
              audioEngine.playTone(660, 'sine', 0.15);
              alert("StackSpeak uses custom ElevenLabs Voice Clones trained for calm code pair-programming.");
            }}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all font-medium"
          >
            <Plus className="w-3 h-3 text-purple-400" />
            <span>New Voice</span>
          </button>
        </div>

        {/* Marcus Voice Profile with Golden Glowing Ring */}
        <div className="flex items-center gap-3.5 pt-4 pb-4">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
              alt="Marcus (Voice)"
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/80 shadow-lg shadow-amber-500/20"
            />
            {isPlaying && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0B0F19] animate-pulse"></span>
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Marcus (Voice)
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Calm • Encouraging • Precise
            </p>
          </div>
        </div>

        {/* Audio Player Controls & Waveform */}
        <div className="p-3.5 rounded-xl bg-[#090D18] border border-white/5 space-y-2.5">
          
          <div className="flex items-center gap-3">
            
            {/* Play Button */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
            </button>

            {/* Equalizer Waveform Bars (Cyan to Purple) */}
            <div className="flex-1 h-8 flex items-center justify-between gap-[3px] px-2 bg-slate-950/60 rounded-lg">
              {waveBins.map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-all duration-100"
                  style={{
                    height: `${height}%`,
                    background: `linear-gradient(to top, #22D3EE, #C084FC)`
                  }}
                ></div>
              ))}
            </div>

            <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
          </div>

          {/* Time & Play Again */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1">
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            <button
              onClick={() => {
                audioEngine.stop();
                setIsPlaying(false);
                setTimeout(togglePlay, 100);
              }}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Play Again</span>
            </button>
          </div>

        </div>

        {/* TRANSCRIPT Section (Matching Adviser Screenshot 2) */}
        <div className="mt-4 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Transcript
          </div>
          
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 relative">
            <div className="text-xl font-serif text-teal-400 font-bold leading-none">“</div>
            
            <blockquote className="text-xs sm:text-sm font-semibold text-white leading-snug">
              Marcus, line 42 is fine... <span className="text-teal-300">just add a ?</span>
            </blockquote>

            <p className="text-xs text-slate-400 font-normal leading-relaxed">
              Optional chaining makes this safe and concise.
            </p>

            {/* Action Buttons: Thumbs Up, Down, Copy */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5 text-slate-400">
              <button 
                onClick={() => setFeedback('up')}
                className={`p-1 rounded hover:text-white transition-colors ${feedback === 'up' ? 'text-emerald-400' : ''}`}
                title="Helpful"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setFeedback('down')}
                className={`p-1 rounded hover:text-white transition-colors ${feedback === 'down' ? 'text-rose-400' : ''}`}
                title="Needs Improvement"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCopyTranscript}
                className="p-1 rounded hover:text-white transition-colors ml-1"
                title="Copy Transcript"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>
        </div>

      </div>

      <div className="pt-2 text-center text-[10px] text-slate-400 font-mono">
        ElevenLabs Audio Clone • Zero Latency
      </div>

    </div>
  );
}
