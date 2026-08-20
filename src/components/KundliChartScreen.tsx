import React, { useState } from 'react';
import {
  UserProfile,
  PlanetaryPosition,
  KundliHouse,
  WireframeFidelity,
  ThemeMode
} from '../types/astrology';
import { DEFAULT_PLANETARY_POSITIONS, DEFAULT_KUNDLI_HOUSES } from '../utils/astrologyEngine';
import { WIREFRAME_SPEC_CATALOG } from '../data/mockData';
import {
  Sparkles,
  Compass,
  Star,
  Layers,
  ChevronRight,
  Info,
  Sliders,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  RefreshCw
} from 'lucide-react';

interface KundliChartScreenProps {
  profile: UserProfile;
  fidelity: WireframeFidelity;
  themeMode: ThemeMode;
  isInspectorActive: boolean;
  onSelectSpec: (spec: any) => void;
}

export const KundliChartScreen: React.FC<KundliChartScreenProps> = ({
  profile,
  fidelity,
  themeMode,
  isInspectorActive,
  onSelectSpec
}) => {
  const [chartStyle, setChartStyle] = useState<'North' | 'South'>('North');
  const [selectedHouse, setSelectedHouse] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'chart' | 'planets' | 'dasha' | 'houses'>('chart');

  const [planets] = useState<PlanetaryPosition[]>(DEFAULT_PLANETARY_POSITIONS);
  const [houses] = useState<KundliHouse[]>(DEFAULT_KUNDLI_HOUSES);

  const activeHouseData = houses.find(h => h.houseNumber === selectedHouse) || houses[0];

  const isLoFi = fidelity === 'lo-fi';
  const isMidFi = fidelity === 'mid-fi';

  // North Indian Chart House placement definitions (SVG polygon vertices and labels)
  // Standard North Indian Diamond Kundli coordinate grid 400x400
  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 w-full max-w-full overflow-x-hidden">
      {/* Top Controls: Chart Style, Active Tab, Birth Metadata */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-serif font-bold text-amber-100 flex items-center gap-1.5 truncate">
                Vedic Kundli Natal Matrix
                <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded shrink-0">
                  D1 Rashi
                </span>
              </h2>
              <div className="text-[11px] text-amber-300/70 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                <span>{profile.birthDate} ({profile.birthTime})</span>
                <span>•</span>
                <span className="text-amber-400 font-medium">Lagna: {profile.ascendant}</span>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher: North Indian vs South Indian + Sub-tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-amber-500/10">
          <div className="flex items-center bg-black/60 p-0.5 rounded-xl border border-amber-900/40 text-[11px]">
            <button
              onClick={() => setChartStyle('North')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                chartStyle === 'North' ? 'bg-amber-600 text-white' : 'text-amber-300/70 hover:text-amber-100'
              }`}
            >
              North Diamond
            </button>
            <button
              onClick={() => setChartStyle('South')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                chartStyle === 'South' ? 'bg-amber-600 text-white' : 'text-amber-300/70 hover:text-amber-100'
              }`}
            >
              South Box
            </button>
          </div>

          <div className="flex items-center bg-black/60 p-0.5 rounded-xl border border-amber-900/40 text-[11px]">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                activeTab === 'chart' ? 'bg-amber-500/30 text-amber-200 font-bold' : 'text-amber-300/70 hover:text-amber-100'
              }`}
            >
              Kundli
            </button>
            <button
              onClick={() => setActiveTab('planets')}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                activeTab === 'planets' ? 'bg-amber-500/30 text-amber-200 font-bold' : 'text-amber-300/70 hover:text-amber-100'
              }`}
            >
              Planets
            </button>
            <button
              onClick={() => setActiveTab('dasha')}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                activeTab === 'dasha' ? 'bg-amber-500/30 text-amber-200 font-bold' : 'text-amber-300/70 hover:text-amber-100'
              }`}
            >
              Dasha
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Kundli Stage */}
      {activeTab === 'chart' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* SVG Visual Kundli Matrix (7 Columns on Large) */}
          <div
            onClick={() => isInspectorActive && onSelectSpec(WIREFRAME_SPEC_CATALOG['kundli-interactive-chart'])}
            className={`lg:col-span-7 p-3.5 sm:p-5 rounded-2xl border transition-all relative w-full max-w-full overflow-hidden ${
              isInspectorActive ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black' : ''
            } ${
              isLoFi
                ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
                : 'border-amber-500/20 bg-[#140D09]/90 backdrop-blur-sm'
            }`}
          >
            {isInspectorActive && (
              <div className="absolute top-2 right-2 bg-amber-500 text-black font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow">
                Inspect: kundli-chart
              </div>
            )}

            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-serif font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400" />
                {chartStyle === 'North' ? 'North Diamond' : 'South Square'} (Tap house)
              </span>
              <span className="font-mono text-amber-400 text-[11px] font-bold">
                House #{selectedHouse}
              </span>
            </div>

            {/* North Indian Diamond Kundli SVG */}
            {chartStyle === 'North' ? (
              <div className="w-full flex items-center justify-center py-1">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full max-w-[340px] aspect-square select-none drop-shadow-xl"
                >
                  {/* Outer Frame */}
                  <rect
                    x="4"
                    y="4"
                    width="392"
                    height="392"
                    fill="#0B0705"
                    stroke="#D97706"
                    strokeWidth="2"
                  />

                  {/* Main Cross & Diamond Lines */}
                  <line x1="4" y1="4" x2="396" y2="396" stroke="#92400E" strokeWidth="1.5" />
                  <line x1="4" y1="396" x2="396" y2="4" stroke="#92400E" strokeWidth="1.5" />

                  {/* Inner Diamond */}
                  <polygon
                    points="200,4 396,200 200,396 4,200"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="1.8"
                  />

                  {/* House 1: Top Center Diamond (Lagna) */}
                  <polygon
                    points="200,4 298,102 200,200 102,102"
                    className={`cursor-pointer transition-colors ${selectedHouse === 1 ? 'fill-amber-500/30' : 'fill-amber-950/20 hover:fill-amber-500/10'}`}
                    stroke={selectedHouse === 1 ? '#FCD34D' : '#D97706'}
                    strokeWidth={selectedHouse === 1 ? '2.5' : '1'}
                    onClick={() => setSelectedHouse(1)}
                  />
                  <text x="200" y="85" textAnchor="middle" fill="#FCD34D" fontSize="13" fontWeight="bold">1 (Lagna)</text>
                  <text x="200" y="115" textAnchor="middle" fill="#FDE68A" fontSize="11" fontWeight="600">Asc • ☿(R) • ♀</text>
                  <text x="200" y="135" textAnchor="middle" fill="#A16207" fontSize="10">Taurus (2)</text>

                  {/* House 2: Top Left Triangle */}
                  <polygon
                    points="4,4 200,4 102,102"
                    className={`cursor-pointer transition-colors ${selectedHouse === 2 ? 'fill-amber-500/30' : 'fill-transparent hover:fill-amber-500/10'}`}
                    onClick={() => setSelectedHouse(2)}
                  />
                  <text x="90" y="45" textAnchor="middle" fill="#FDE68A" fontSize="11">2</text>
                  <text x="90" y="65" textAnchor="middle" fill="#A16207" fontSize="9">Gemini</text>

                  {/* House 3: Far Left Upper Triangle */}
                  <polygon
                    points="4,4 102,102 4,200"
                    className={`cursor-pointer transition-colors ${selectedHouse === 3 ? 'fill-amber-500/30' : 'fill-transparent hover:fill-amber-500/10'}`}
                    onClick={() => setSelectedHouse(3)}
                  />
                  <text x="45" y="95" textAnchor="middle" fill="#FDE68A" fontSize="11">3</text>
                  <text x="45" y="115" textAnchor="middle" fill="#A16207" fontSize="9">Cancer</text>

                  {/* House 4: Left Diamond */}
                  <polygon
                    points="4,200 102,102 200,200 102,298"
                    className={`cursor-pointer transition-colors ${selectedHouse === 4 ? 'fill-amber-500/30' : 'fill-amber-950/20 hover:fill-amber-500/10'}`}
                    stroke={selectedHouse === 4 ? '#FCD34D' : '#D97706'}
                    strokeWidth={selectedHouse === 4 ? '2.5' : '1'}
                    onClick={() => setSelectedHouse(4)}
                  />
                  <text x="90" y="195" textAnchor="middle" fill="#FCD34D" fontSize="13" fontWeight="bold">4 (Sukha)</text>
                  <text x="90" y="220" textAnchor="middle" fill="#FDE68A" fontSize="11">Ketu ☋</text>
                  <text x="90" y="240" textAnchor="middle" fill="#A16207" fontSize="10">Leo (5)</text>

                  {/* House 5: Far Left Lower Triangle */}
                  <polygon
                    points="4,200 102,298 4,396"
                    className={`cursor-pointer transition-colors ${selectedHouse === 5 ? 'fill-amber-500/30' : 'fill-transparent hover:fill-amber-500/10'}`}
                    onClick={() => setSelectedHouse(5)}
                  />
                  <text x="45" y="305" textAnchor="middle" fill="#FDE68A" fontSize="11">5</text>
                  <text x="45" y="325" textAnchor="middle" fill="#A16207" fontSize="9">Virgo</text>

                  {/* House 6: Bottom Left Triangle */}
                  <polygon
                    points="4,396 102,298 200,396"
                    className={`cursor-pointer transition-colors ${selectedHouse === 6 ? 'fill-amber-500/30' : 'fill-transparent hover:fill-amber-500/10'}`}
                    onClick={() => setSelectedHouse(6)}
                  />
                  <text x="90" y="355" textAnchor="middle" fill="#FDE68A" fontSize="11">6</text>
                  <text x="90" y="375" textAnchor="middle" fill="#A16207" fontSize="9">Libra</text>

                  {/* House 7: Bottom Diamond */}
                  <polygon
                    points="200,200 102,298 200,396 298,298"
                    className={`cursor-pointer transition-colors ${selectedHouse === 7 ? 'fill-amber-500/30' : 'fill-amber-950/20 hover:fill-amber-500/10'}`}
                    stroke={selectedHouse === 7 ? '#FCD34D' : '#D97706'}
                    strokeWidth={selectedHouse === 7 ? '2.5' : '1'}
                    onClick={() => setSelectedHouse(7)}
                  />
                  <text x="200" y="295" textAnchor="middle" fill="#FCD34D" fontSize="13" fontWeight="bold">7 (Yuvati)</text>
                  <text x="200" y="320" textAnchor="middle" fill="#FDE68A" fontSize="11">Moon ☽ (Deb)</text>
                  <text x="200" y="340" textAnchor="middle" fill="#A16207" fontSize="10">Scorpio (8)</text>

                  {/* House 8: Bottom Right Triangle */}
                  <polygon
                    points="200,396 298,298 396,396"
                    className={`cursor-pointer transition-colors ${selectedHouse === 8 ? 'fill-amber-500/30' : 'fill-transparent hover:fill-amber-500/10'}`}
                    onClick={() => setSelectedHouse(8)}
                  />
                  <text x="310" y="355" textAnchor="middle" fill="#FDE68A" fontSize="11">8 • ♃</text>
                  <text x="310" y="375" textAnchor="middle" fill="#A16207" fontSize="9">Sagittarius</text>

                  {/* House 9: Far Right Lower Triangle */}
                  <polygon
                    points="396,200 298,298 396,396"
                    className={`cursor-pointer transition-colors ${selectedHouse === 9 ? 'fill-amber-500/30' : 'fill-transparent hover:fill-amber-500/10'}`}
                    onClick={() => setSelectedHouse(9)}
                  />
                  <text x="355" y="305" textAnchor="middle" fill="#FDE68A" fontSize="11">9</text>
                  <text x="355" y="325" textAnchor="middle" fill="#A16207" fontSize="9">Capricorn</text>

                  {/* House 10: Right Diamond */}
                  <polygon
                    points="200,200 298,102 396,200 298,298"
                    className={`cursor-pointer transition-colors ${selectedHouse === 10 ? 'fill-amber-500/30' : 'fill-amber-950/20 hover:fill-amber-500/10'}`}
                    stroke={selectedHouse === 10 ? '#FCD34D' : '#D97706'}
                    strokeWidth={selectedHouse === 10 ? '2.5' : '1'}
                    onClick={() => setSelectedHouse(10)}
                  />
                  <text x="305" y="195" textAnchor="middle" fill="#FCD34D" fontSize="13" fontWeight="bold">10 (Karma)</text>
                  <text x="305" y="220" textAnchor="middle" fill="#FDE68A" fontSize="11">Rahu ☊</text>
                  <text x="305" y="240" textAnchor="middle" fill="#A16207" fontSize="10">Aquarius (11)</text>

                  {/* House 11: Far Right Upper Triangle */}
                  <polygon
                    points="396,4 298,102 396,200"
                    className={`cursor-pointer transition-colors ${selectedHouse === 11 ? 'fill-amber-500/30' : 'fill-transparent hover:fill-amber-500/10'}`}
                    onClick={() => setSelectedHouse(11)}
                  />
                  <text x="355" y="95" textAnchor="middle" fill="#FDE68A" fontSize="11">11 • ♄</text>
                  <text x="355" y="115" textAnchor="middle" fill="#A16207" fontSize="9">Pisces</text>

                  {/* House 12: Top Right Triangle */}
                  <polygon
                    points="200,4 396,4 298,102"
                    className={`cursor-pointer transition-colors ${selectedHouse === 12 ? 'fill-amber-500/30' : 'fill-transparent hover:fill-amber-500/10'}`}
                    onClick={() => setSelectedHouse(12)}
                  />
                  <text x="310" y="45" textAnchor="middle" fill="#FDE68A" fontSize="11">12 • ☉ ♂</text>
                  <text x="310" y="65" textAnchor="middle" fill="#A16207" fontSize="9">Aries (Ex)</text>
                </svg>
              </div>
            ) : (
              /* South Indian Fixed Box Format */
              <div className="grid grid-cols-4 gap-1 p-1.5 bg-[#0B0705] rounded-xl border border-amber-700/50 w-full max-w-[340px] mx-auto aspect-square text-xs font-mono">
                {[
                  { sign: 'Pisces (11)', planets: 'Saturn ♄', house: 11 },
                  { sign: 'Aries (12)', planets: '☉, ♂', house: 12 },
                  { sign: 'Taurus (1)', planets: 'Asc, ☿, ♀', house: 1 },
                  { sign: 'Gemini (2)', planets: '-', house: 2 },
                  { sign: 'Aquarius (10)', planets: 'Rahu ☊', house: 10 },
                  { center: true },
                  { center: true },
                  { sign: 'Cancer (3)', planets: '-', house: 3 },
                  { sign: 'Capricorn (9)', planets: '-', house: 9 },
                  { center: true },
                  { center: true },
                  { sign: 'Leo (4)', planets: 'Ketu ☋', house: 4 },
                  { sign: 'Sagittarius (8)', planets: 'Jupiter ♃', house: 8 },
                  { sign: 'Scorpio (7)', planets: 'Moon ☽', house: 7 },
                  { sign: 'Libra (6)', planets: '-', house: 6 },
                  { sign: 'Virgo (5)', planets: '-', house: 5 }
                ].map((box, idx) => {
                  if (box.center) {
                    return idx === 5 ? (
                      <div key={idx} className="col-span-2 row-span-2 bg-amber-950/20 border border-amber-500/20 flex flex-col items-center justify-center text-center p-1">
                        <span className="font-serif font-bold text-amber-200 text-xs">D1 Rashi</span>
                        <span className="text-[9px] text-amber-400">South Indian</span>
                      </div>
                    ) : null;
                  }
                  return (
                    <div
                      key={idx}
                      onClick={() => box.house && setSelectedHouse(box.house)}
                      className={`p-1 border rounded transition-all cursor-pointer flex flex-col justify-between ${
                        selectedHouse === box.house
                          ? 'bg-amber-500/20 border-amber-400 text-amber-100'
                          : 'border-amber-900/40 bg-black/40 hover:bg-amber-500/10 text-amber-300/80'
                      }`}
                    >
                      <span className="text-[9px] font-bold text-amber-400 truncate">{box.sign}</span>
                      <span className="text-[10px] text-amber-100 font-semibold truncate">{box.planets}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* House Details Inspector (5 Columns on Large) */}
          <div className="lg:col-span-5 space-y-3.5 w-full max-w-full">
            <div className={`p-4 rounded-2xl border ${
              isLoFi
                ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
                : 'border-amber-500/20 bg-[#140D09]/90 backdrop-blur-sm'
            }`}>
              <div className="flex items-center justify-between border-b border-amber-500/10 pb-2.5 mb-2.5">
                <div>
                  <span className="text-[10px] uppercase font-mono text-amber-400 font-bold">
                    House #{activeHouseData.houseNumber} Analysis
                  </span>
                  <h3 className="text-base font-serif font-bold text-amber-100">
                    {activeHouseData.sanskritName} • {activeHouseData.name}
                  </h3>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  activeHouseData.status === 'Raja Yoga'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {activeHouseData.status}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-black/30 p-2 rounded-lg border border-amber-500/10">
                    <span className="text-amber-400/80 block text-[10px]">Zodiac Sign:</span>
                    <span className="font-bold text-amber-100">{activeHouseData.sign}</span>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg border border-amber-500/10">
                    <span className="text-amber-400/80 block text-[10px]">House Lord:</span>
                    <span className="font-bold text-amber-100">{activeHouseData.lord}</span>
                  </div>
                </div>

                <div>
                  <span className="text-amber-400/80 font-medium block mb-1 text-[11px]">Occupant Planets:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeHouseData.planets.length > 0 ? (
                      activeHouseData.planets.map((p, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-200 font-bold border border-amber-500/30 text-xs">
                          {p}
                        </span>
                      ))
                    ) : (
                      <span className="text-amber-300/50 italic text-[11px]">Lordship & drishti aspects apply</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-amber-400/80 font-medium block mb-1 text-[11px]">Core Portfolio:</span>
                  <p className="text-amber-100/90 leading-relaxed bg-black/30 p-2.5 rounded-lg border border-amber-500/10 text-xs">
                    {activeHouseData.significance}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-600/30 text-amber-200 text-[11px]">
                  <span className="font-bold text-amber-400 block mb-0.5">☕ Coffee Ritual:</span>
                  Brew pour-over during hour of {activeHouseData.lord} to strengthen life objectives.
                </div>
              </div>
            </div>

            {/* Quick 12 Houses Selector */}
            <div className="p-3 rounded-2xl bg-black/40 border border-amber-500/20">
              <span className="text-[10px] font-mono text-amber-400 block mb-1.5 font-semibold">
                Jump to Bhava (House 1-12):
              </span>
              <div className="grid grid-cols-6 gap-1">
                {houses.map(h => (
                  <button
                    key={h.houseNumber}
                    onClick={() => setSelectedHouse(h.houseNumber)}
                    className={`py-1 rounded font-mono text-xs font-bold transition-all ${
                      selectedHouse === h.houseNumber
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-black/40 text-amber-300/70 hover:bg-amber-500/20 hover:text-amber-100'
                    }`}
                  >
                    H{h.houseNumber}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ephemeris / Shadbala Mobile-First Responsive Matrix */}
      {activeTab === 'planets' && (
        <div className={`p-3.5 sm:p-5 rounded-2xl border w-full max-w-full overflow-hidden ${
          isLoFi
            ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
            : 'border-amber-500/20 bg-[#140D09]/90'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-amber-100">
                Planetary Ephemeris & Shadbala Matrix
              </h3>
              <p className="text-[10px] text-amber-300/60 font-mono">
                Lahiri Ayanamsha (Chitra Paksha)
              </p>
            </div>
          </div>

          {/* Mobile Card View for Planets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:hidden">
            {planets.map((p, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-amber-500/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-200 text-xs flex items-center gap-1.5">
                    <span className="text-amber-400 text-sm">{p.symbol}</span> {p.planet}
                    {p.isRetrograde && <span className="text-red-400 text-[10px] font-mono">(R)</span>}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-semibold ${
                    p.dignity === 'Exalted' || p.dignity === 'Moolatrikona' || p.dignity === 'Own Sign'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : p.dignity === 'Debilitated'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {p.dignity}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-amber-300/80">
                  <div className="bg-black/30 p-1 rounded">
                    <span className="text-amber-500/70 block text-[8px]">Sign:</span>
                    {p.sign} {p.degree}°
                  </div>
                  <div className="bg-black/30 p-1 rounded">
                    <span className="text-amber-500/70 block text-[8px]">House:</span>
                    H#{p.house}
                  </div>
                  <div className="bg-black/30 p-1 rounded">
                    <span className="text-amber-500/70 block text-[8px]">Shadbala:</span>
                    {p.shadbalaScore} Rupas
                  </div>
                </div>
                <div className="text-[10px] text-amber-300/70 flex items-center justify-between">
                  <span>Nakshatra: {p.nakshatra} (P{p.pada})</span>
                  <span className="text-amber-400 font-mono">{p.karaka}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (Scrollable on tablet/desktop) */}
          <div className="hidden sm:block overflow-x-auto w-full max-w-full">
            <table className="w-full text-left text-xs border-collapse min-w-[540px]">
              <thead>
                <tr className="border-b border-amber-500/20 text-amber-400 font-mono text-[11px]">
                  <th className="py-2 px-2.5">Planet</th>
                  <th className="py-2 px-2.5">Sign & Degree</th>
                  <th className="py-2 px-2.5">House</th>
                  <th className="py-2 px-2.5">Nakshatra</th>
                  <th className="py-2 px-2.5">Dignity</th>
                  <th className="py-2 px-2.5">Shadbala</th>
                  <th className="py-2 px-2.5">Karaka</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/10 text-amber-100">
                {planets.map((p, idx) => (
                  <tr key={idx} className="hover:bg-amber-500/10 transition-colors">
                    <td className="py-2 px-2.5 font-bold text-amber-200 flex items-center gap-1.5">
                      <span className="text-amber-400">{p.symbol}</span>
                      {p.planet} {p.isRetrograde && <span className="text-red-400 text-[10px] font-mono">(R)</span>}
                    </td>
                    <td className="py-2 px-2.5 font-mono text-[11px]">
                      {p.sign} {p.degree}° {p.minute}'
                    </td>
                    <td className="py-2 px-2.5 font-mono font-bold text-amber-300">
                      H{p.house}
                    </td>
                    <td className="py-2 px-2.5 text-[11px]">
                      {p.nakshatra} (P{p.pada})
                    </td>
                    <td className="py-2 px-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        p.dignity === 'Exalted' || p.dignity === 'Moolatrikona' || p.dignity === 'Own Sign'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : p.dignity === 'Debilitated'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {p.dignity}
                      </span>
                    </td>
                    <td className="py-2 px-2.5 font-mono font-bold text-amber-200">
                      {p.shadbalaScore} R
                    </td>
                    <td className="py-2 px-2.5 text-amber-300/80 text-[11px]">
                      {p.karaka}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vimshottari Dasha Timeline */}
      {activeTab === 'dasha' && (
        <div className={`p-3.5 sm:p-5 rounded-2xl border space-y-3 w-full max-w-full overflow-hidden ${
          isLoFi
            ? 'border-2 border-dashed border-blue-400 bg-blue-950/20'
            : 'border-amber-500/20 bg-[#140D09]/90'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/10 pb-2.5">
            <div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-amber-100">
                Vimshottari Dasha (120-Yr Lifespan)
              </h3>
              <p className="text-xs text-amber-300/70">
                Current Ruling: <span className="font-bold text-amber-200">{profile.currentDasha}</span>
              </p>
            </div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
              Active: 2024 - 2027
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { dasha: 'Jupiter Mahadasha (16 Yrs)', period: '2018 - 2034', status: 'Active (Current)', progress: 55, focus: 'Higher wisdom, financial elevation, spiritual expansion' },
              { dasha: '└ Venus Antardasha', period: 'Jan 2025 - Sep 2027', status: 'Active Sub-Period', progress: 42, focus: 'Creative mastery, relationship harmony, espresso rituals' },
              { dasha: '└ Sun Antardasha', period: 'Sep 2027 - Jul 2028', status: 'Upcoming', progress: 0, focus: 'Public recognition, leadership breakthrough, authority' },
              { dasha: 'Saturn Mahadasha (19 Yrs)', period: '2034 - 2053', status: 'Future', progress: 0, focus: 'Long-term legacy building, structural mastery' }
            ].map((d, i) => (
              <div key={i} className="p-3 rounded-xl bg-black/40 border border-amber-500/10 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-200 truncate">{d.dasha}</span>
                  <span className="font-mono text-amber-400 text-[10px] shrink-0">{d.period}</span>
                </div>
                <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all" style={{ width: `${d.progress}%` }}></div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] text-amber-300/70">
                  <span className="line-clamp-1">Focus: {d.focus}</span>
                  <span className="font-mono text-amber-300 font-semibold">{d.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
