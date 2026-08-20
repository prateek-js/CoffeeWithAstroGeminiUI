import React, { useState } from 'react';
import {
  UserProfile,
  WireframeFidelity,
  ThemeMode,
  CoffeeGroundSymbol
} from '../types/astrology';
import { SAMPLE_COFFEE_CUPS, WIREFRAME_SPEC_CATALOG } from '../data/mockData';
import {
  Coffee,
  Sparkles,
  Camera,
  Upload,
  RefreshCw,
  Eye,
  MapPin,
  Flame,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CoffeeCupReaderScreenProps {
  profile: UserProfile;
  fidelity: WireframeFidelity;
  themeMode: ThemeMode;
  isInspectorActive: boolean;
  onSelectSpec: (spec: any) => void;
}

export const CoffeeCupReaderScreen: React.FC<CoffeeCupReaderScreenProps> = ({
  profile,
  fidelity,
  themeMode,
  isInspectorActive,
  onSelectSpec
}) => {
  const [selectedPreset, setSelectedPreset] = useState(SAMPLE_COFFEE_CUPS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [activeSymbolId, setActiveSymbolId] = useState<string>('sym-crescent-moon');
  const [readingResult, setReadingResult] = useState<{
    reading: string;
    dominantSymbol: string;
    fortuneScore: number;
    guidance: string;
  }>({
    reading: `The sand-brewed coffee grounds reveal a distinct Crescent Moon pattern at the upper rim, perfectly synchronized with your Sun in ${profile.sunSign}. Near the midpoint, a rising mountain silhouette indicates decisive career elevation over the next 4 months. The clear bottom sediment confirms shedding of old relational fatigue.`,
    dominantSymbol: 'Crescent Moon & Mountain Apex',
    fortuneScore: 94,
    guidance: 'Drink mindfully during morning sunrise; execute key creative decisions between 08:30 AM and 10:15 AM.'
  });

  const handleRunAiReading = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/gemini/coffee-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbolsDetected: selectedPreset.symbols,
          userSign: profile.sunSign,
          focusArea: 'Career, Love & Karmic Timing',
          notes: `Cup style: ${selectedPreset.title}`
        })
      });
      const data = await res.json();
      if (data && (data.reading || data.dominantSymbol)) {
        setReadingResult({
          reading: data.reading || data.prediction || 'Reading generated successfully.',
          dominantSymbol: data.dominantSymbol || selectedPreset.symbols[0],
          fortuneScore: data.fortuneScore || 92,
          guidance: data.guidance || 'Ground your morning energy with intentional breathing before the first sip.'
        });
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.6 },
          colors: ['#D97706', '#FCD34D', '#8B5CF6']
        });
      }
    } catch (err) {
      console.warn('Fallback local reading due to network:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const isLoFi = fidelity === 'lo-fi';
  const isMidFi = fidelity === 'mid-fi';

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 w-full max-w-full overflow-x-hidden">
      {/* Top Banner */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-serif font-bold text-amber-100 flex items-center gap-1.5 truncate">
                AI Tasseography Scanner
                <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded shrink-0">
                  Grounds Oracle
                </span>
              </h2>
              <p className="text-[11px] text-amber-300/70 truncate">
                Transform sediment geometry into astrological predictions.
              </p>
            </div>
          </div>

          {/* Scan / Upload Controls */}
          <button
            onClick={handleRunAiReading}
            disabled={isScanning}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Analyzing Celestial Sediment...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Run AI Cup Reading
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Cups Gallery */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-amber-400 font-semibold uppercase tracking-wider">
          Select Brewed Sample:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {SAMPLE_COFFEE_CUPS.map(cup => (
            <div
              key={cup.id}
              onClick={() => setSelectedPreset(cup)}
              className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer ${
                selectedPreset.id === cup.id
                  ? 'bg-amber-500/20 border-amber-400 shadow-md text-amber-100'
                  : 'bg-black/40 border-amber-900/30 text-amber-300/70 hover:bg-black/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-amber-200 truncate">{cup.title}</span>
                <span className="text-[9px] font-mono text-amber-400 shrink-0">{cup.confidence}%</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-amber-300/70 line-clamp-1">{cup.subtitle}</p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {cup.symbols.map((sym, i) => (
                  <span key={i} className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-amber-300 border border-amber-700/30 truncate">
                    {sym}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Scanner & Cup Interactive Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Left: Cup Visualizer (7 Columns) */}
        <div
          onClick={() => isInspectorActive && onSelectSpec(WIREFRAME_SPEC_CATALOG['coffee-scanner-tasseography'])}
          className={`lg:col-span-7 p-3.5 sm:p-6 rounded-2xl border relative flex flex-col items-center justify-center w-full max-w-full overflow-hidden ${
            isInspectorActive ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black' : ''
          } ${
            isLoFi
              ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
              : 'border-amber-500/20 bg-[#140D09]/90 backdrop-blur-sm'
          }`}
        >
          {isInspectorActive && (
            <div className="absolute top-2 right-2 bg-amber-500 text-black font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow">
              Inspect: coffee-scanner
            </div>
          )}

          <div className="w-full flex items-center justify-between mb-2 text-xs">
            <span className="font-serif font-bold text-amber-200 flex items-center gap-1 text-[11px] sm:text-xs">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              Cup Topography (Tap symbols)
            </span>
            <span className="text-amber-400 font-mono text-[10px] sm:text-xs truncate">
              {selectedPreset.dominantArchetype}
            </span>
          </div>

          {/* Interactive Coffee Cup Rim & Grounds SVG */}
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square flex items-center justify-center my-1 sm:my-2">
            <svg viewBox="0 0 360 360" className="w-full h-full drop-shadow-2xl select-none">
              {/* Cup Outer Ceramic Rim */}
              <circle cx="180" cy="180" r="170" fill="#1C1410" stroke="#D97706" strokeWidth="4" />
              <circle cx="180" cy="180" r="162" fill="#0D0907" stroke="#78350F" strokeWidth="2" />

              {/* Cup Handle (Right) */}
              <path
                d="M 345,140 C 375,140 375,220 345,220"
                fill="none"
                stroke="#D97706"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Cup Sediment Rings (Rim, Body, Base) */}
              <circle cx="180" cy="180" r="135" fill="none" stroke="#B45309" strokeWidth="1" strokeDasharray="4,4" />
              <circle cx="180" cy="180" r="85" fill="none" stroke="#B45309" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="180" cy="180" r="40" fill="#1E130D" stroke="#D97706" strokeWidth="1.5" />

              {/* Liquid Coffee Dark Grounds Textures */}
              <ellipse cx="180" cy="180" rx="145" ry="145" fill="url(#coffeeGradient)" opacity="0.9" />

              {/* SVG Gradients */}
              <defs>
                <radialGradient id="coffeeGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0B0604" />
                  <stop offset="60%" stopColor="#1E100A" />
                  <stop offset="90%" stopColor="#3B1C10" />
                  <stop offset="100%" stopColor="#693019" />
                </radialGradient>
              </defs>

              {/* Ground Swirls & Nebula Texture */}
              <path
                d="M 120,100 Q 180,60 240,110 T 260,200 T 160,260 T 100,180 Z"
                fill="#2E170E"
                opacity="0.7"
              />
              <path
                d="M 140,160 Q 200,120 220,180 T 170,220 Z"
                fill="#452316"
                opacity="0.8"
              />

              {/* Interactive Symbol Hotspot 1: Crescent Moon (Top Rim) */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveSymbolId('sym-crescent-moon')}
              >
                <circle cx="180" cy="65" r="18" fill="rgba(217, 119, 6, 0.3)" stroke="#FCD34D" strokeWidth="1.5" className="animate-pulse" />
                <path d="M 175,55 A 10,10 0 0,0 185,75 A 12,12 0 0,1 175,55 Z" fill="#FCD34D" />
                <text x="180" y="95" textAnchor="middle" fill="#FDE68A" fontSize="9" fontWeight="bold">Crescent Moon (96%)</text>
              </g>

              {/* Interactive Symbol Hotspot 2: Mountain Apex (Left Mid) */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveSymbolId('sym-mountain-peak')}
              >
                <circle cx="85" cy="170" r="18" fill="rgba(217, 119, 6, 0.3)" stroke="#FCD34D" strokeWidth="1.5" />
                <polygon points="85,158 95,178 75,178" fill="#FCD34D" />
                <text x="85" y="198" textAnchor="middle" fill="#FDE68A" fontSize="9" fontWeight="bold">Mountain (89%)</text>
              </g>

              {/* Interactive Symbol Hotspot 3: Starlight (Right Mid) */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveSymbolId('sym-starlight-cluster')}
              >
                <circle cx="275" cy="165" r="18" fill="rgba(217, 119, 6, 0.3)" stroke="#FCD34D" strokeWidth="1.5" />
                <circle cx="275" cy="165" r="3" fill="#FCD34D" />
                <circle cx="268" cy="160" r="2" fill="#FDE68A" />
                <circle cx="282" cy="170" r="2" fill="#FDE68A" />
                <text x="275" y="195" textAnchor="middle" fill="#FDE68A" fontSize="9" fontWeight="bold">Star Cluster (92%)</text>
              </g>

              {/* Interactive Symbol Hotspot 4: Golden Key (Bottom Base) */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveSymbolId('sym-golden-key')}
              >
                <circle cx="180" cy="275" r="18" fill="rgba(217, 119, 6, 0.3)" stroke="#FCD34D" strokeWidth="1.5" />
                <rect x="178" y="265" width="4" height="18" rx="2" fill="#FCD34D" />
                <circle cx="180" cy="265" r="4" fill="none" stroke="#FCD34D" strokeWidth="2" />
                <text x="180" y="305" textAnchor="middle" fill="#FDE68A" fontSize="9" fontWeight="bold">Golden Key (94%)</text>
              </g>
            </svg>
          </div>

          <div className="w-full flex items-center justify-between text-[11px] text-amber-300/70 border-t border-amber-500/10 pt-3">
            <span>Rim: Immediate (0-30d)</span>
            <span>•</span>
            <span>Body: Mid-term (3-6mo)</span>
            <span>•</span>
            <span>Base: Karmic Core</span>
          </div>
        </div>

        {/* Right: AI Prediction & Symbol Detail (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          {/* AI Oracle Reading Card */}
          <div className={`p-5 rounded-2xl border ${
            isLoFi
              ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
              : 'border-amber-500/20 bg-[#140D09]/90 backdrop-blur-sm'
          }`}>
            <div className="flex items-center justify-between border-b border-amber-500/10 pb-3 mb-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-amber-400 font-bold">
                  Gemini Tasseography Synthesis
                </span>
                <h3 className="text-base font-serif font-bold text-amber-100">
                  {readingResult.dominantSymbol}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-amber-400 block font-mono">Fortune Score</span>
                <span className="text-lg font-mono font-bold text-amber-200">
                  {readingResult.fortuneScore}/100
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-amber-300 font-semibold block mb-1">
                  Astrological Ground Interpretation:
                </span>
                <p className="text-amber-100/90 leading-relaxed bg-black/30 p-3 rounded-xl border border-amber-500/10 font-serif">
                  "{readingResult.reading}"
                </p>
              </div>

              <div>
                <span className="text-amber-300 font-semibold block mb-1">
                  Daily Cosmic Guidance & Ritual:
                </span>
                <p className="text-amber-200/80 leading-relaxed bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20">
                  {readingResult.guidance}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-amber-500/10 text-[11px] text-amber-300/70">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Ground Geometry Verified
                </span>
                <span>Sun: {profile.sunSign} • Lagna: {profile.ascendant}</span>
              </div>
            </div>
          </div>

          {/* Temporal Zone Breakdown */}
          <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-2 text-xs">
            <span className="font-mono text-amber-400 font-semibold uppercase tracking-wider block text-[11px]">
              Tasseography Temporal Layers:
            </span>
            <div className="space-y-1.5">
              <div className="p-2 rounded-lg bg-black/50 flex items-center justify-between border border-amber-500/10">
                <span className="text-amber-200 font-medium">1. Rim (The Lip)</span>
                <span className="text-amber-400 font-mono text-[11px]">Now to 4 Weeks</span>
              </div>
              <div className="p-2 rounded-lg bg-black/50 flex items-center justify-between border border-amber-500/10">
                <span className="text-amber-200 font-medium">2. Body (The Slope)</span>
                <span className="text-amber-400 font-mono text-[11px]">3 to 6 Months Ahead</span>
              </div>
              <div className="p-2 rounded-lg bg-black/50 flex items-center justify-between border border-amber-500/10">
                <span className="text-amber-200 font-medium">3. Base (The Ground)</span>
                <span className="text-amber-400 font-mono text-[11px]">Karmic Root & Home</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
