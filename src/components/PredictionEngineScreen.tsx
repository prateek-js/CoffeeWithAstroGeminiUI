import React, { useState } from 'react';
import {
  UserProfile,
  WireframeFidelity,
  ThemeMode,
  PlanetaryTransitEvent
} from '../types/astrology';
import { UPCOMING_TRANSITS_2026_2027 } from '../utils/astrologyEngine';
import { WIREFRAME_SPEC_CATALOG } from '../data/mockData';
import {
  Sparkles,
  Compass,
  Calendar,
  Clock,
  Send,
  RefreshCw,
  TrendingUp,
  Briefcase,
  Heart,
  Coins,
  Shield,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PredictionEngineScreenProps {
  profile: UserProfile;
  fidelity: WireframeFidelity;
  themeMode: ThemeMode;
  isInspectorActive: boolean;
  onSelectSpec: (spec: any) => void;
}

export const PredictionEngineScreen: React.FC<PredictionEngineScreenProps> = ({
  profile,
  fidelity,
  themeMode,
  isInspectorActive,
  onSelectSpec
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'career' | 'love' | 'health' | 'wealth'>('career');
  const [customQuestion, setCustomQuestion] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResponse, setPredictionResponse] = useState<{
    prediction: string;
    cosmicCoffeePairing: string;
    auspiciousCoffeeHour: string;
    astrologicalHighlights: string[];
    affirmation: string;
  }>({
    prediction: `Based on your Ascendant in ${profile.ascendant} and Sun in ${profile.sunSign}, the upcoming Jupiter transit in royal Leo triggers your 4th/10th house karmic axis. Expect a high-octane expansion in professional authority starting October 2026. Saturn's transit ensures that all structured preparations and disciplined daily routines pay massive long-term dividends.`,
    cosmicCoffeePairing: 'Single-Origin Gesha Pour-Over (Notes: Honeycomb & Bergamot)',
    auspiciousCoffeeHour: '08:15 AM - 09:30 AM (Sun / Jupiter Hora)',
    astrologicalHighlights: [
      'Jupiter transit illuminates 10th house of public career status',
      'Venus-Mercury conjunction favors contract negotiations and product launches',
      'Saturn aspect demands consistent craftsmanship over rushed shortcuts'
    ],
    affirmation: 'I brew my day with focused purpose, knowing the cosmic tides support my highest evolution.'
  });

  const handleRunPrediction = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsPredicting(true);
    try {
      const res = await fetch('/api/gemini/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthDetails: {
            name: profile.name,
            sunSign: profile.sunSign,
            moonSign: profile.moonSign,
            ascendant: profile.ascendant,
            nakshatra: profile.nakshatra,
            currentDasha: profile.currentDasha
          },
          question: customQuestion || `Comprehensive astrological forecast for ${selectedCategory} during upcoming transits`,
          category: selectedCategory,
          transitContext: '2026-2027 Planetary Transits'
        })
      });
      const data = await res.json();
      if (data && data.prediction) {
        setPredictionResponse({
          prediction: data.prediction,
          cosmicCoffeePairing: data.cosmicCoffeePairing || 'Ethiopian Yirgacheffe Pour-Over',
          auspiciousCoffeeHour: data.auspiciousCoffeeHour || '08:30 AM - 09:45 AM (Sun Hora)',
          astrologicalHighlights: data.astrologicalHighlights || [
            'Transit alignment strengthens personal authority',
            'Optimal timing for strategic career steps',
            'Coffee ritual acts as daily grounding anchor'
          ],
          affirmation: data.affirmation || 'I align with celestial harmony.'
        });
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#D97706', '#FCD34D', '#8B5CF6']
        });
      }
    } catch (err) {
      console.warn('Fallback prediction due to network:', err);
    } finally {
      setIsPredicting(false);
    }
  };

  const isLoFi = fidelity === 'lo-fi';
  const isMidFi = fidelity === 'mid-fi';

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 w-full max-w-full overflow-x-hidden">
      {/* Header Banner */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-serif font-bold text-amber-100 flex items-center gap-1.5 truncate">
                Planetary Transit Engine
                <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded shrink-0">
                  2026–2027
                </span>
              </h2>
              <p className="text-[11px] text-amber-300/70 truncate">
                Correlate outer planet ingresses & dashas with life events.
              </p>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-amber-900/40 text-xs">
          {[
            { key: 'career', label: 'Career', icon: Briefcase },
            { key: 'love', label: 'Love', icon: Heart },
            { key: 'wealth', label: 'Wealth', icon: Coins },
            { key: 'health', label: 'Energy', icon: Shield }
          ].map(c => {
            const Icon = c.icon;
            return (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key as any)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all text-[11px] ${
                  selectedCategory === c.key
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-amber-300/70 hover:text-amber-100 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Upcoming Major Transits (Left) & AI Deep Prediction Generator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Left: Transit Timeline (6 Columns) */}
        <div
          onClick={() => isInspectorActive && onSelectSpec(WIREFRAME_SPEC_CATALOG['prediction-engine-simulator'])}
          className={`lg:col-span-6 p-3.5 sm:p-5 rounded-2xl border space-y-3 relative w-full max-w-full ${
            isInspectorActive ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black' : ''
          } ${
            isLoFi
              ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
              : 'border-amber-500/20 bg-[#140D09]/90 backdrop-blur-sm'
          }`}
        >
          {isInspectorActive && (
            <div className="absolute top-2 right-2 bg-amber-500 text-black font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow">
              Inspect: prediction-engine
            </div>
          )}

          <div className="flex items-center justify-between border-b border-amber-500/10 pb-2.5">
            <h3 className="text-sm sm:text-base font-serif font-bold text-amber-100 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              Major Planetary Ingresses (2026–2027)
            </h3>
            <span className="text-[10px] font-mono text-amber-400 shrink-0">4 Ingresses</span>
          </div>

          <div className="space-y-2.5">
            {UPCOMING_TRANSITS_2026_2027.map(t => (
              <div
                key={t.id}
                className="p-3 rounded-xl bg-black/40 border border-amber-500/10 space-y-1.5 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-bold text-amber-200 text-xs truncate">{t.planet}</span>
                    <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded truncate">
                      {t.signFrom} ➔ {t.signTo}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400/80 shrink-0">{t.date}</span>
                </div>

                <div className="text-xs font-bold text-amber-100">{t.title}</div>
                <p className="text-[11px] text-amber-300/80 leading-relaxed">{t.description}</p>

                <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-600/20 text-[10px] text-amber-200 flex items-start gap-1.5">
                  <Coffee className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{t.coffeeRemedy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Prediction Query & Output (6 Columns) */}
        <div className="lg:col-span-6 space-y-3.5 w-full max-w-full">
          {/* Query Input Box */}
          <form
            onSubmit={handleRunPrediction}
            className={`p-5 rounded-2xl border space-y-3 ${
              isLoFi
                ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
                : 'border-amber-500/20 bg-[#140D09]/90 backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-amber-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Ask the Astrological Prediction Engine
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Gemini 3.7 Flash Active</span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={customQuestion}
                onChange={e => setCustomQuestion(e.target.value)}
                placeholder="e.g. When is the best time for my job switch or product release?"
                className="w-full bg-black/60 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-xs text-amber-100 placeholder:text-amber-300/40 focus:outline-none focus:border-amber-400 pr-10"
              />
              <button
                type="submit"
                disabled={isPredicting}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white disabled:opacity-50 transition-all cursor-pointer"
              >
                {isPredicting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 text-[11px] text-amber-300/70">
              <span>Quick Prompts:</span>
              <button
                type="button"
                onClick={() => setCustomQuestion('Career trajectory for Q4 2026')}
                className="text-amber-400 hover:underline"
              >
                "Career Q4 2026"
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setCustomQuestion('Relationship transit harmony')}
                className="text-amber-400 hover:underline"
              >
                "Love Harmony"
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setCustomQuestion('Saturn transit in Aries timing')}
                className="text-amber-400 hover:underline"
              >
                "Saturn Transit Timing"
              </button>
            </div>
          </form>

          {/* Structured Prediction Output Dossier */}
          <div className={`p-5 rounded-2xl border space-y-4 ${
            isLoFi
              ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
              : 'border-amber-500/20 bg-[#140D09]/90 backdrop-blur-sm'
          }`}>
            <div className="flex items-center justify-between border-b border-amber-500/10 pb-3">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                  Prediction Dossier • {selectedCategory.toUpperCase()}
                </span>
                <h4 className="text-base font-serif font-bold text-amber-100">
                  Synthesized Ephemeris Forecast
                </h4>
              </div>
              <span className="text-xs font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                Lagna: {profile.ascendant}
              </span>
            </div>

            <div className="text-xs text-amber-100/90 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-amber-500/10 font-serif">
              "{predictionResponse.prediction}"
            </div>

            {/* Highlights */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-amber-400 font-semibold block">
                Astrological Ingress Highlights:
              </span>
              {predictionResponse.astrologicalHighlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-amber-200/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Coffee Pairing & Horary Timing */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-500/10 text-xs">
              <div className="p-2.5 rounded-xl bg-black/40 border border-amber-500/10">
                <span className="text-[10px] text-amber-400 font-mono block">☕ Coffee Pairing:</span>
                <span className="font-bold text-amber-100 text-[11px]">{predictionResponse.cosmicCoffeePairing}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-amber-500/10">
                <span className="text-[10px] text-amber-400 font-mono block">⏰ Auspicious Hour:</span>
                <span className="font-bold text-amber-100 text-[11px]">{predictionResponse.auspiciousCoffeeHour}</span>
              </div>
            </div>

            {/* Affirmation */}
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-950/40 to-amber-900/20 border border-amber-500/20 text-center text-xs italic text-amber-200 font-serif">
              "{predictionResponse.affirmation}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
