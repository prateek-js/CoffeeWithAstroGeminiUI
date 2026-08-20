import React from 'react';
import {
  ViewportMode,
  WireframeFidelity,
  ThemeMode,
  UserProfile
} from '../types/astrology';
import {
  Coffee,
  Sparkles,
  Smartphone,
  Monitor,
  Columns2,
  Layers,
  Palette,
  FileDown,
  Info,
  UserCheck,
  Zap,
  SlidersHorizontal
} from 'lucide-react';

interface HeaderProps {
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  fidelity: WireframeFidelity;
  setFidelity: (f: WireframeFidelity) => void;
  themeMode: ThemeMode;
  setThemeMode: (t: ThemeMode) => void;
  isInspectorActive: boolean;
  setIsInspectorActive: (active: boolean) => void;
  currentProfile: UserProfile;
  presetProfiles: UserProfile[];
  onSelectProfile: (p: UserProfile) => void;
  onOpenDesignSystem: () => void;
  onOpenExportReport: () => void;
  onOpenProfileEditor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewportMode,
  setViewportMode,
  fidelity,
  setFidelity,
  themeMode,
  setThemeMode,
  isInspectorActive,
  setIsInspectorActive,
  currentProfile,
  presetProfiles,
  onSelectProfile,
  onOpenDesignSystem,
  onOpenExportReport,
  onOpenProfileEditor
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-900/30 bg-[#0F0B09]/95 backdrop-blur-md px-4 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Project Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-900 text-amber-100 shadow-md border border-amber-500/30">
            <Coffee className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-serif font-bold text-amber-100 tracking-wide flex items-center gap-1.5">
                Coffee with Astro
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Prediction Engine v2.4
                </span>
              </h1>
            </div>
            <p className="text-xs text-amber-200/60 flex items-center gap-1.5">
              <span>Interactive UI & Wireframe Studio</span>
              <span className="text-amber-500/40">•</span>
              <span className="text-amber-400 font-medium">polaris/prediction-engine</span>
            </p>
          </div>
        </div>

        {/* Center Control Group: Viewport Mode & Wireframe Fidelity */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Viewport Switcher */}
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-amber-900/40">
            <button
              onClick={() => setViewportMode('web')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewportMode === 'web'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-300/70 hover:text-amber-100 hover:bg-white/5'
              }`}
              title="Web Desktop Portal"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Web UI</span>
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewportMode === 'mobile'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-300/70 hover:text-amber-100 hover:bg-white/5'
              }`}
              title="Mobile App Frame"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile App</span>
            </button>
            <button
              onClick={() => setViewportMode('split')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewportMode === 'split'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-300/70 hover:text-amber-100 hover:bg-white/5'
              }`}
              title="Side-by-Side Dual Studio"
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Dual View</span>
            </button>
          </div>

          {/* Wireframe Fidelity Switcher */}
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-amber-900/40">
            <button
              onClick={() => setFidelity('lo-fi')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                fidelity === 'lo-fi'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-amber-300/70 hover:text-amber-100 hover:bg-white/5'
              }`}
              title="Low-Fi Blueprint Wireframe"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Lo-Fi</span>
            </button>
            <button
              onClick={() => setFidelity('mid-fi')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                fidelity === 'mid-fi'
                  ? 'bg-zinc-700 text-white shadow-sm'
                  : 'text-amber-300/70 hover:text-amber-100 hover:bg-white/5'
              }`}
              title="Mid-Fi Interactive Grayscale Wireframe"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Mid-Fi</span>
            </button>
            <button
              onClick={() => setFidelity('hi-fi')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                fidelity === 'hi-fi'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-sm'
                  : 'text-amber-300/70 hover:text-amber-100 hover:bg-white/5'
              }`}
              title="High-Fi Cosmic UI (Production Art)"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hi-Fi Cosmic</span>
            </button>
          </div>
        </div>

        {/* Right Tools Group: Theme, Seeker Profile, Inspector, Export */}
        <div className="flex items-center gap-2">
          {/* Active Seeker Profile Selector */}
          <div className="relative">
            <select
              value={currentProfile.id}
              onChange={(e) => {
                const found = presetProfiles.find(p => p.id === e.target.value);
                if (found) onSelectProfile(found);
              }}
              className="bg-black/50 text-amber-200 border border-amber-900/50 rounded-xl px-2.5 py-1.5 text-xs font-medium appearance-none pr-7 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {presetProfiles.map(p => (
                <option key={p.id} value={p.id} className="bg-[#120D0A] text-amber-100">
                  {p.name} ({p.sunSign} ☉ / {p.ascendant} Asc)
                </option>
              ))}
            </select>
            <button
              onClick={onOpenProfileEditor}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-200 text-xs"
              title="Edit Birth Details"
            >
              <UserCheck className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme Selector */}
          <select
            value={themeMode}
            onChange={(e) => setThemeMode(e.target.value as ThemeMode)}
            className="bg-black/50 text-amber-200 border border-amber-900/50 rounded-xl px-2 py-1.5 text-xs font-medium focus:outline-none focus:border-amber-500 cursor-pointer hidden lg:inline-block"
            title="Theme Palette"
          >
            <option value="cosmic-dark" className="bg-[#120D0A]">🌌 Cosmic Dark</option>
            <option value="roasted-mocha" className="bg-[#120D0A]">☕ Roasted Mocha</option>
            <option value="paper-blueprint" className="bg-[#120D0A]">📐 Blueprint</option>
            <option value="starlight-light" className="bg-[#120D0A]">☀️ Starlight Light</option>
          </select>

          {/* Wireframe Inspector Toggle */}
          <button
            onClick={() => setIsInspectorActive(!isInspectorActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isInspectorActive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-sm'
                : 'bg-black/40 text-amber-300/70 border-amber-900/40 hover:text-amber-100'
            }`}
            title="Toggle Wireframe Component Spec Inspector"
          >
            <Zap className={`w-3.5 h-3.5 ${isInspectorActive ? 'text-amber-400 fill-amber-400' : ''}`} />
            <span className="hidden sm:inline">Inspect Specs</span>
          </button>

          {/* Design System Modal */}
          <button
            onClick={onOpenDesignSystem}
            className="p-1.5 rounded-xl bg-black/40 text-amber-300/80 border border-amber-900/40 hover:text-amber-100 hover:bg-white/5 transition-all"
            title="Design System & Token Library"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Export Report */}
          <button
            onClick={onOpenExportReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600/90 hover:bg-amber-600 text-white font-medium text-xs shadow-md hover:shadow-amber-500/20 border border-amber-500/30 transition-all"
            title="Export Cosmic Dossier"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Dossier</span>
          </button>
        </div>
      </div>
    </header>
  );
};
