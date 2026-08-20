import React, { useState } from 'react';
import {
  ActiveScreenTab,
  UserProfile,
  WireframeFidelity,
  ThemeMode
} from '../types/astrology';
import { DailyBrewScreen } from './DailyBrewScreen';
import { KundliChartScreen } from './KundliChartScreen';
import { CoffeeCupReaderScreen } from './CoffeeCupReaderScreen';
import { PredictionEngineScreen } from './PredictionEngineScreen';
import { SynastryScreen } from './SynastryScreen';
import { BaristaChatScreen } from './BaristaChatScreen';
import {
  Coffee,
  Compass,
  Sparkles,
  TrendingUp,
  Heart,
  MessageSquare,
  Wifi,
  Battery,
  Signal,
  Bell,
  X
} from 'lucide-react';

interface MobileFrameProps {
  activeTab: ActiveScreenTab;
  setActiveTab: (tab: ActiveScreenTab) => void;
  profile: UserProfile;
  fidelity: WireframeFidelity;
  themeMode: ThemeMode;
  isInspectorActive: boolean;
  onSelectSpec: (spec: any) => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  activeTab,
  setActiveTab,
  profile,
  fidelity,
  themeMode,
  isInspectorActive,
  onSelectSpec
}) => {
  const [showPushToast, setShowPushToast] = useState(true);
  const [mobileChassisMode, setMobileChassisMode] = useState<'iphone' | 'compact'>('iphone');

  const isLoFi = fidelity === 'lo-fi';
  const isMidFi = fidelity === 'mid-fi';

  return (
    <div className="flex flex-col items-center justify-center p-1 sm:p-4 w-full max-w-full overflow-x-hidden">
      {/* Mobile Mode Switcher Bar */}
      <div className="mb-3 flex items-center gap-2 bg-black/50 p-1 rounded-xl border border-amber-900/40 text-xs">
        <button
          onClick={() => setMobileChassisMode('iphone')}
          className={`px-3 py-1 rounded-lg font-medium transition-all ${
            mobileChassisMode === 'iphone'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-amber-300/70 hover:text-amber-100'
          }`}
        >
          📱 iPhone 16 Mockup Frame
        </button>
        <button
          onClick={() => setMobileChassisMode('compact')}
          className={`px-3 py-1 rounded-lg font-medium transition-all ${
            mobileChassisMode === 'compact'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-amber-300/70 hover:text-amber-100'
          }`}
        >
          📲 Native Mobile Width
        </button>
      </div>

      {/* Mobile Device Chassis */}
      <div
        className={`relative w-full max-w-[400px] bg-[#0A0705] transition-all flex flex-col justify-between overflow-x-hidden ${
          mobileChassisMode === 'iphone'
            ? 'h-[820px] rounded-[44px] p-3 shadow-2xl border-[3px] border-zinc-800 ring-1 ring-white/10'
            : 'min-h-[720px] rounded-2xl p-2.5 border border-amber-500/30 shadow-xl'
        }`}
      >
        {/* Dynamic Island / Speaker Pill (in iPhone Mode) */}
        {mobileChassisMode === 'iphone' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 w-28 h-5.5 bg-black rounded-full flex items-center justify-between px-2.5 border border-zinc-800/80">
            <div className="w-2 h-2 rounded-full bg-amber-500/80 animate-pulse"></div>
            <div className="text-[9px] font-mono text-amber-300/80">☕ Astro Live</div>
          </div>
        )}

        {/* Status Bar */}
        <div className="w-full flex items-center justify-between px-4 pt-2 pb-1 text-[11px] font-semibold text-zinc-300 z-40 select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Push Notification Banner Mockup */}
        {showPushToast && (
          <div className="mx-1 mb-2 p-2.5 rounded-2xl bg-[#1C120D]/95 border border-amber-500/40 text-amber-100 shadow-xl flex items-start gap-2 text-xs z-30 animate-in slide-in-from-top-4 duration-300">
            <div className="p-1 rounded-lg bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
              <Coffee className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 text-[11px] leading-tight min-w-0">
              <div className="font-bold text-amber-200 flex items-center justify-between gap-1">
                <span className="truncate">Coffee with Astro • Auspicious Hora</span>
                <button
                  onClick={() => setShowPushToast(false)}
                  className="text-zinc-400 hover:text-white p-0.5 shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="text-amber-300/80 mt-0.5 line-clamp-2">
                Sun Hora is active! Brew your <span className="text-amber-200 font-semibold">{profile.favoriteBrew}</span> now for maximum clarity.
              </p>
            </div>
          </div>
        )}

        {/* Scrollable Mobile Screen Content (Strictly no horizontal overflow) */}
        <div className="flex-1 w-full max-w-full overflow-y-auto overflow-x-hidden px-1 py-1 space-y-4 scrollbar-thin scrollbar-thumb-amber-900/40">
          {activeTab === 'daily-brew' && (
            <DailyBrewScreen
              profile={profile}
              fidelity={fidelity}
              themeMode={themeMode}
              isInspectorActive={isInspectorActive}
              onSelectSpec={onSelectSpec}
            />
          )}
          {activeTab === 'kundli-chart' && (
            <KundliChartScreen
              profile={profile}
              fidelity={fidelity}
              themeMode={themeMode}
              isInspectorActive={isInspectorActive}
              onSelectSpec={onSelectSpec}
            />
          )}
          {activeTab === 'coffee-scanner' && (
            <CoffeeCupReaderScreen
              profile={profile}
              fidelity={fidelity}
              themeMode={themeMode}
              isInspectorActive={isInspectorActive}
              onSelectSpec={onSelectSpec}
            />
          )}
          {activeTab === 'predictions' && (
            <PredictionEngineScreen
              profile={profile}
              fidelity={fidelity}
              themeMode={themeMode}
              isInspectorActive={isInspectorActive}
              onSelectSpec={onSelectSpec}
            />
          )}
          {activeTab === 'synastry' && (
            <SynastryScreen
              profile={profile}
              fidelity={fidelity}
              themeMode={themeMode}
              isInspectorActive={isInspectorActive}
              onSelectSpec={onSelectSpec}
            />
          )}
          {activeTab === 'barista-chat' && (
            <BaristaChatScreen
              profile={profile}
              fidelity={fidelity}
              themeMode={themeMode}
              isInspectorActive={isInspectorActive}
              onSelectSpec={onSelectSpec}
            />
          )}
        </div>

        {/* Mobile Bottom Tab Navigation */}
        <div className="w-full bg-[#120B08]/95 backdrop-blur-xl border-t border-amber-900/40 rounded-2xl p-1 px-1.5 flex items-center justify-between z-40 mt-1">
          {[
            { key: 'daily-brew', label: 'Brew', icon: Coffee },
            { key: 'kundli-chart', label: 'Kundli', icon: Compass },
            { key: 'coffee-scanner', label: 'Scanner', icon: Sparkles },
            { key: 'predictions', label: 'Forecast', icon: TrendingUp },
            { key: 'synastry', label: 'Synastry', icon: Heart },
            { key: 'barista-chat', label: 'Barista', icon: MessageSquare }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as ActiveScreenTab)}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all min-h-[44px] ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/15 font-semibold'
                    : 'text-zinc-400 hover:text-amber-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400 stroke-[2.5]' : 'stroke-[1.75]'}`} />
                <span className="text-[9px] mt-0.5 leading-none whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Home Indicator Bar */}
        {mobileChassisMode === 'iphone' && (
          <div className="w-28 h-1 bg-zinc-600 rounded-full mx-auto my-1"></div>
        )}
      </div>
    </div>
  );
};
