import React, { useState } from 'react';
import {
  UserProfile,
  WireframeFidelity,
  ThemeMode,
  ZodiacSign,
  SynastryScore
} from '../types/astrology';
import { calculateSynastry, ZODIAC_SIGNS } from '../utils/astrologyEngine';
import { PRESET_PROFILES, WIREFRAME_SPEC_CATALOG } from '../data/mockData';
import {
  Heart,
  Sparkles,
  Coffee,
  CheckCircle2,
  Users,
  Compass,
  Zap,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SynastryScreenProps {
  profile: UserProfile;
  fidelity: WireframeFidelity;
  themeMode: ThemeMode;
  isInspectorActive: boolean;
  onSelectSpec: (spec: any) => void;
}

export const SynastryScreen: React.FC<SynastryScreenProps> = ({
  profile,
  fidelity,
  themeMode,
  isInspectorActive,
  onSelectSpec
}) => {
  const [partnerName, setPartnerName] = useState('Julian Ross');
  const [partnerSign, setPartnerSign] = useState<ZodiacSign>('Leo');
  const [synastryResult, setSynastryResult] = useState<SynastryScore>(
    calculateSynastry(profile.name, profile.sunSign as ZodiacSign, 'Julian Ross', 'Leo')
  );

  const handleComputeCompatibility = () => {
    const res = calculateSynastry(profile.name, profile.sunSign as ZodiacSign, partnerName, partnerSign);
    setSynastryResult(res);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#EC4899', '#D97706', '#FCD34D']
    });
  };

  const isLoFi = fidelity === 'lo-fi';
  const isMidFi = fidelity === 'mid-fi';

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30 shrink-0">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-serif font-bold text-amber-100 flex items-center gap-1.5 truncate">
                Cosmic Synastry Engine
                <span className="text-[9px] font-mono uppercase bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded shrink-0">
                  36-Guna Matching
                </span>
              </h2>
              <p className="text-[11px] text-amber-300/70 truncate">
                Synthesize two birth charts into an astrological harmony score.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Comparison Input Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-black/40 border border-amber-500/20 grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center w-full max-w-full">
        {/* Person A (Current Seeker) */}
        <div className="md:col-span-4 p-2 rounded-xl bg-black/50 border border-amber-500/10 flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center font-serif font-bold text-amber-300 text-xs shrink-0">
            A
          </div>
          <div className="min-w-0 truncate">
            <div className="text-xs font-bold text-amber-100 truncate">{profile.name}</div>
            <div className="text-[10px] text-amber-400 truncate">
              {profile.sunSign} Sun • {profile.ascendant} Lagna
            </div>
          </div>
        </div>

        <div className="md:col-span-1 text-center font-bold text-pink-400 text-xs hidden md:block">
          +
        </div>

        {/* Person B Input */}
        <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            value={partnerName}
            onChange={e => setPartnerName(e.target.value)}
            placeholder="Partner Name"
            className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-2.5 py-1.5 text-xs text-amber-100 placeholder:text-amber-300/40 focus:outline-none focus:border-amber-400"
          />
          <select
            value={partnerSign}
            onChange={e => setPartnerSign(e.target.value as ZodiacSign)}
            className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-2 py-1.5 text-xs text-amber-200 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            {ZODIAC_SIGNS.map(z => (
              <option key={z.name} value={z.name} className="bg-[#120D0A]">
                {z.symbol} {z.name} ({z.element})
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            onClick={handleComputeCompatibility}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white font-medium text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Compute Blend
          </button>
        </div>
      </div>

      {/* Main Grid: Blend Synthesis (Left) & 8 Ashta Koota Gunas (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Left: Signature Relationship Coffee Blend (5 Columns) */}
        <div
          onClick={() => isInspectorActive && onSelectSpec(WIREFRAME_SPEC_CATALOG['synastry-coffee-blend'])}
          className={`lg:col-span-5 p-4 sm:p-5 rounded-2xl border space-y-3 relative w-full max-w-full ${
            isInspectorActive ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black' : ''
          } ${
            isLoFi
              ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
              : 'border-amber-500/20 bg-[#140D09]/90 backdrop-blur-sm'
          }`}
        >
          {isInspectorActive && (
            <div className="absolute top-2 right-2 bg-amber-500 text-black font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow">
              Inspect: synastry-blend
            </div>
          )}

          <div className="flex items-center justify-between border-b border-amber-500/10 pb-2.5">
            <span className="text-[11px] font-serif font-bold text-amber-200 uppercase tracking-wider">
              Signature Dual Blend
            </span>
            <span className="text-[11px] font-mono text-pink-400 font-bold">
              {synastryResult.totalScore} / {synastryResult.maxScore} Gunas ({synastryResult.percentage}%)
            </span>
          </div>

          <div className="text-center py-3 bg-gradient-to-b from-amber-950/30 to-black/40 rounded-xl border border-amber-500/20 space-y-1.5">
            <div className="w-12 h-12 rounded-full mx-auto bg-gradient-to-tr from-pink-600 to-amber-500 flex items-center justify-center text-white shadow-lg">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-amber-100">
              {synastryResult.coffeeBlendName}
            </h3>
            <p className="text-[11px] text-amber-300/80 max-w-xs mx-auto italic">
              "{synastryResult.flavorProfile}"
            </p>
          </div>

          <div className="text-xs text-amber-100/90 leading-relaxed bg-black/30 p-2.5 rounded-xl border border-amber-500/10 font-serif">
            {synastryResult.summary}
          </div>

          {/* Planetary Aspects Interconnection */}
          <div className="space-y-1.5 pt-1.5 border-t border-amber-500/10">
            <span className="text-[10px] font-mono text-amber-400 font-semibold block">
              Key Planetary Aspects:
            </span>
            {synastryResult.aspects.map((asp, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-black/40 text-[10px] border border-amber-500/10 space-y-0.5">
                <div className="flex items-center justify-between font-bold text-amber-200">
                  <span>{asp.planetA} {asp.aspectType} {asp.planetB}</span>
                  <span className="text-emerald-400 font-mono">{asp.nature}</span>
                </div>
                <p className="text-amber-300/70">{asp.meaning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 8 Ashta Koota Guna Breakdown (7 Columns) */}
        <div className={`lg:col-span-7 p-4 sm:p-5 rounded-2xl border space-y-2.5 w-full max-w-full ${
          isLoFi
            ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
            : 'border-amber-500/20 bg-[#140D09]/90 backdrop-blur-sm'
        }`}>
          <div className="flex items-center justify-between border-b border-amber-500/10 pb-2">
            <h3 className="text-sm sm:text-base font-serif font-bold text-amber-100 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400" />
              Ashta Koota Dimensions
            </h3>
            <span className="text-[10px] font-mono text-amber-400">Total: {synastryResult.totalScore}/36</span>
          </div>

          <div className="space-y-1.5">
            {synastryResult.categories.map((cat, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-black/40 border border-amber-500/10 space-y-1 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-200">{cat.name}</span>
                  <span className="font-mono text-amber-300 font-bold text-[11px]">
                    {cat.score} / {cat.max} Pts
                  </span>
                </div>
                <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-amber-400 h-full rounded-full transition-all"
                    style={{ width: `${(cat.score / cat.max) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-amber-300/70 leading-normal">{cat.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
