import React, { useState } from 'react';
import {
  UserProfile,
  WireframeFidelity,
  ThemeMode,
  ZodiacSign
} from '../types/astrology';
import { COFFEE_ROAST_PROFILES, ZODIAC_SIGNS } from '../utils/astrologyEngine';
import { WIREFRAME_SPEC_CATALOG } from '../data/mockData';
import {
  Coffee,
  Sparkles,
  Clock,
  Flame,
  Droplets,
  Wind,
  Compass,
  CheckCircle2,
  Share2,
  RefreshCw,
  Sun,
  Moon,
  Feather,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyBrewScreenProps {
  profile: UserProfile;
  fidelity: WireframeFidelity;
  themeMode: ThemeMode;
  isInspectorActive: boolean;
  onSelectSpec: (spec: any) => void;
}

export const DailyBrewScreen: React.FC<DailyBrewScreenProps> = ({
  profile,
  fidelity,
  themeMode,
  isInspectorActive,
  onSelectSpec
}) => {
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewedCount, setBrewedCount] = useState(1);
  const [isTarotFlipped, setIsTarotFlipped] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);

  const roast = COFFEE_ROAST_PROFILES[profile.sunSign as ZodiacSign] || COFFEE_ROAST_PROFILES['Aries'];
  const sunData = ZODIAC_SIGNS.find(z => z.name === profile.sunSign);

  const handleBrewCup = () => {
    setIsBrewing(true);
    setTimeout(() => {
      setIsBrewing(false);
      setBrewedCount(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D97706', '#FCD34D', '#8B5CF6', '#FBBF24']
      });
    }, 1200);
  };

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(i => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const isLoFi = fidelity === 'lo-fi';
  const isMidFi = fidelity === 'mid-fi';

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 w-full max-w-full overflow-x-hidden">
      {/* Wireframe Tag Banner if in Lo-Fi */}
      {isLoFi && (
        <div className="p-2 border-2 border-dashed border-blue-500 bg-blue-500/10 text-blue-300 font-mono text-xs rounded-lg flex items-center justify-between">
          <span>[VIEW: DailyCosmicBrew_Screen / Mode: LoFi_Wireframe]</span>
          <span>Target: Mobile & Web Synchronized</span>
        </div>
      )}

      {/* Hero: Signature Astro Coffee Roast Profile */}
      <div
        onClick={() => isInspectorActive && onSelectSpec(WIREFRAME_SPEC_CATALOG['daily-brew-hero'])}
        className={`relative overflow-hidden rounded-2xl p-4 sm:p-6 transition-all cursor-pointer w-full max-w-full ${
          isInspectorActive ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black' : ''
        } ${
          isLoFi
            ? 'border-2 border-dashed border-blue-400 bg-blue-950/20 text-blue-100'
            : isMidFi
            ? 'border border-zinc-700 bg-zinc-900 text-zinc-100'
            : 'border border-amber-500/30 bg-gradient-to-br from-[#1C120C] via-[#150E09] to-[#0D0907] text-amber-50 shadow-xl shadow-amber-950/30'
        }`}
      >
        {/* Wireframe Spec Tag */}
        {isInspectorActive && (
          <div className="absolute top-2 right-2 bg-amber-500 text-black font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow">
            Inspect: daily-brew-hero
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2.5 max-w-xl min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sun className="w-3 h-3 text-amber-400" />
                {profile.sunSign} Roast • {roast.archetype}
              </span>
              <span className="text-[11px] text-amber-300/60 font-mono">
                {profile.nakshatra}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 tracking-tight">
              {roast.name}
            </h2>

            <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
              Today’s transit of the Moon through <span className="font-semibold text-amber-300">{profile.moonSign}</span> amplifies your <span className="text-amber-200 font-medium">{roast.chakraAlignment}</span>. Brew with intention during the auspicious window to anchor your vitality.
            </p>

            {/* Flavor Notes Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-amber-400/80 font-medium">Tasting Notes:</span>
              {roast.flavorNotes.map((note, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[11px] bg-amber-900/40 text-amber-200 border border-amber-700/40 font-medium"
                >
                  {note}
                </span>
              ))}
            </div>

            {/* Auspicious Hour & Caffeine Level */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              <div className="bg-black/30 p-2 rounded-xl border border-amber-500/10 min-w-0">
                <div className="text-[10px] text-amber-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Auspicious Hour
                </div>
                <div className="text-xs font-bold text-amber-100 font-mono mt-0.5 truncate">
                  {roast.auspiciousHour}
                </div>
              </div>
              <div className="bg-black/30 p-2 rounded-xl border border-amber-500/10 min-w-0">
                <div className="text-[10px] text-amber-400 flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Planetary Ruler
                </div>
                <div className="text-xs font-bold text-amber-100 mt-0.5 truncate">
                  {roast.planetaryGovernor}
                </div>
              </div>
              <div className="bg-black/30 p-2 rounded-xl border border-amber-500/10 col-span-2 sm:col-span-1 min-w-0">
                <div className="text-[10px] text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Intensity
                </div>
                <div className="text-xs font-bold text-amber-300 mt-0.5 truncate">
                  {roast.caffeineIntensity}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Brewing Cup Visualizer */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-black/40 border border-amber-500/20 text-center w-full md:w-auto md:min-w-[220px]">
            <div className="relative mb-3">
              {/* Steaming Animation */}
              <div className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center border-2 border-amber-500/40 bg-gradient-to-t from-amber-950 to-amber-900 shadow-inner ${isBrewing ? 'animate-pulse scale-105' : ''}`}>
                <Coffee className={`w-10 h-10 text-amber-300 ${isBrewing ? 'animate-bounce' : ''}`} />
              </div>
              {/* Floating steam ring */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex gap-1">
                <span className="w-1 h-3 bg-amber-300/40 rounded-full animate-pulse"></span>
                <span className="w-1 h-4 bg-amber-300/60 rounded-full animate-pulse delay-100"></span>
                <span className="w-1 h-2 bg-amber-300/30 rounded-full animate-pulse delay-200"></span>
              </div>
            </div>

            <button
              onClick={handleBrewCup}
              disabled={isBrewing}
              className="w-full py-2 px-3 rounded-xl font-medium text-xs text-white bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isBrewing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Extracting Crema...
                </>
              ) : (
                <>
                  <Coffee className="w-3.5 h-3.5" />
                  Brew Cup (Day #{brewedCount})
                </>
              )}
            </button>
            <p className="text-[10px] text-amber-300/60 mt-1.5 italic font-serif line-clamp-2">
              "{roast.quote}"
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Daily Planetary Weather & Tarot Card of the Brew */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1: Planetary Weather & Energy Meter */}
        <div className={`p-5 rounded-2xl border ${
          isLoFi
            ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
            : 'border-amber-500/20 bg-[#140D09]/80 backdrop-blur-sm'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-serif font-bold text-amber-100 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              Diurnal Cosmic Energy Weather
            </h3>
            <span className="text-xs font-mono text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded">
              Hora: {roast.planetaryGovernor}
            </span>
          </div>

          <div className="space-y-3">
            {/* Elemental Energy Bars */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-200 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-red-400" /> Fire (Willpower & Drive)
                </span>
                <span className="font-mono text-amber-300 font-bold">88%</span>
              </div>
              <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: '88%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-200 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" /> Water (Intuition & Receptivity)
                </span>
                <span className="font-mono text-amber-300 font-bold">72%</span>
              </div>
              <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full transition-all duration-500" style={{ width: '72%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-200 flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-amber-400" /> Air (Intellect & Banter)
                </span>
                <span className="font-mono text-amber-300 font-bold">64%</span>
              </div>
              <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: '64%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-amber-500/10 flex items-center justify-between text-xs text-amber-200/80">
            <div className="flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-amber-400" />
              <span>Waxing Gibbous (84% illumination)</span>
            </div>
            <span className="font-mono text-amber-300">Tithi: Shukla Navami</span>
          </div>
        </div>

        {/* Column 2: Interactive Tarot / Rune of the Brew (Flip Card) */}
        <div className={`p-5 rounded-2xl border ${
          isLoFi
            ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
            : 'border-amber-500/20 bg-[#140D09]/80 backdrop-blur-sm'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-serif font-bold text-amber-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Tarot of the Daily Brew
            </h3>
            <span className="text-xs text-amber-400/80 italic">Click card to reveal</span>
          </div>

          <div
            onClick={() => setIsTarotFlipped(!isTarotFlipped)}
            className="relative h-44 rounded-xl border border-amber-500/30 bg-black/40 p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-transform hover:scale-[1.01]"
          >
            {!isTarotFlipped ? (
              <div className="space-y-2 animate-in fade-in">
                <div className="w-12 h-12 rounded-full mx-auto bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                  <Coffee className="w-6 h-6" />
                </div>
                <div className="text-sm font-serif font-bold text-amber-200">
                  The Alchemical Roast (Card #XIV)
                </div>
                <p className="text-xs text-amber-300/70 max-w-xs">
                  Tap to flip the mystical coffee grounds card and receive today’s karmic catalyst oracle.
                </p>
              </div>
            ) : (
              <div className="space-y-2 animate-in fade-in">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] uppercase font-mono font-bold">
                  Oracle Revealed • Major Arcana
                </span>
                <div className="text-base font-serif font-bold text-amber-100">
                  "The Master Brewer of Temperance"
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed max-w-sm">
                  Blends fire and water with perfect calibration. What felt bitter yesterday matures into a rich, caramel-noted breakthrough today. Speak your boundaries with calm authority.
                </p>
                <div className="text-[11px] text-amber-400 font-mono pt-1">
                  Lucky Number: 8 • Lucky Note: Ceylon Cinnamon
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Horary Coffee Ritual Checklist */}
      <div className={`p-5 rounded-2xl border ${
        isLoFi
          ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
          : 'border-amber-500/20 bg-[#140D09]/80 backdrop-blur-sm'
      }`}>
        <h3 className="text-base font-serif font-bold text-amber-100 mb-3 flex items-center gap-2">
          <Feather className="w-4 h-4 text-amber-400" />
          Mindful Astrological Coffee Calibration Steps
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              title: '1. Morning Awakening',
              time: '07:30 AM',
              desc: 'Inhale roast aroma, align with your Ascendant, state 1 priority.'
            },
            {
              title: '2. Midday Solar Focus',
              time: '12:45 PM',
              desc: 'Hydrate with crystal-infused water; review morning creative output.'
            },
            {
              title: '3. Evening Twilight Decaf',
              time: '06:30 PM',
              desc: 'Chamomile or herbal brew; journal insights revealed during the day.'
            }
          ].map((step, idx) => (
            <div
              key={idx}
              onClick={() => toggleStep(idx)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                completedSteps.includes(idx)
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-100'
                  : 'bg-black/30 border-amber-500/10 text-amber-300/60 hover:bg-black/50'
              }`}
            >
              <div className={`mt-0.5 rounded-full p-1 ${completedSteps.includes(idx) ? 'text-amber-400' : 'text-zinc-600'}`}>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                  {step.title}
                  <span className="text-[10px] font-mono text-amber-400/70">({step.time})</span>
                </div>
                <div className="text-[11px] leading-relaxed text-amber-300/80">
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
