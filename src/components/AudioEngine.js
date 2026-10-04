/**
 * StackSpeak // Dual-Mode Audio Engine
 * Powers ElevenLabs Voice Synthesis with zero-fail Web Speech & Web Audio Synthesizer fallback.
 */

// Curated voices for empathetic debugging
export const VOICES = [
  {
    id: 'CwhRBWXzGAHq8TQ4Fs17',
    name: 'Marcus (Voice)',
    role: 'Peer & Reassuring Companion',
    traits: 'Calm • Encouraging • Precise',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    gender: 'male'
  },
  {
    id: 'ErXwobaYiN019PkySvjV',
    name: 'Antoni (Senior Mentor)',
    role: 'Senior Staff Engineer',
    traits: 'Grounding • Patient • Experienced',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    gender: 'male'
  },
  {
    id: 'XrExE9yKIg1WjnnlVkGX',
    name: 'Sarah (Staff Engineer)',
    role: 'Systems Architect',
    traits: 'Warm • Methodical • Lucid',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    gender: 'female'
  }
];

class AudioController {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.currentAudio = null;
    this.isPlaying = false;
    this.listeners = new Set();
  }

  initContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 64;
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Play gentle warm chime using pure Web Audio oscillator
  playTone(freq = 440, type = 'sine', duration = 0.25) {
    try {
      this.initContext();
      if (!this.audioContext) return;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
      gain.gain.setValueAtTime(0.08, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start();
      osc.stop(this.audioContext.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Synthesize via ElevenLabs or Browser Speech fallback
  async speak(text, voiceId = VOICES[0].id, apiKey = '', onProgress, onEnd) {
    this.stop();
    this.initContext();
    this.isPlaying = true;
    this.playTone(523.25, 'triangle', 0.15); // C5 cue chime

    // 1. If valid ElevenLabs API key provided, attempt live ElevenLabs TTS
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?optimize_streaming_latency=3&output_format=mp3_44100_128`, {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': apiKey.trim()
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.35,
              similarity_boost: 0.80,
              style: 0.65,
              use_speaker_boost: true
            }
          })
        });

        if (response.ok) {
          const blob = await response.blob();
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          this.currentAudio = audio;

          // Connect to analyser for real waveform
          if (this.audioContext) {
            try {
              const source = this.audioContext.createMediaElementSource(audio);
              source.connect(this.analyser);
              this.analyser.connect(this.audioContext.destination);
            } catch {
              // cross-origin audio routing fallback
            }
          }

          audio.ontimeupdate = () => {
            if (onProgress && audio.duration) {
              onProgress(audio.currentTime, audio.duration);
            }
          };

          audio.onended = () => {
            this.isPlaying = false;
            this.playTone(659.25, 'sine', 0.2); // E5 completion chord
            if (onEnd) onEnd();
          };

          await audio.play();
          return;
        }
      } catch (err) {
        console.warn('ElevenLabs API call failed, falling back to Web Speech engine:', err);
      }
    }

    // 2. Zero-fail Web Speech API fallback
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.90; // Slower, calmer cadence for dyslexic listening
      utterance.pitch = 0.95; // Warm grounding tone

      // Select warm natural voice if available in browser
      const sysVoices = window.speechSynthesis.getVoices();
      const preferred = sysVoices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (preferred) utterance.voice = preferred;

      const durationEstimate = Math.max(3, text.split(' ').length * 0.45);
      let startTime = Date.now();

      const progressInterval = setInterval(() => {
        if (!this.isPlaying) {
          clearInterval(progressInterval);
          return;
        }
        const elapsed = (Date.now() - startTime) / 1000;
        if (onProgress) {
          onProgress(Math.min(elapsed, durationEstimate), durationEstimate);
        }
      }, 100);

      utterance.onend = () => {
        clearInterval(progressInterval);
        this.isPlaying = false;
        this.playTone(659.25, 'sine', 0.2);
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        clearInterval(progressInterval);
        this.isPlaying = false;
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      if (onEnd) onEnd();
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Get current waveform frequency bins for animated canvas/SVG
  getWaveformData() {
    if (!this.analyser || !this.isPlaying) {
      return new Uint8Array(16).fill(12);
    }
    const buffer = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(buffer);
    return buffer.slice(0, 16);
  }
}

export const audioEngine = new AudioController();
