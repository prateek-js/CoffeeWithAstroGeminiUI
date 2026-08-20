import React from 'react';
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
  Clock,
  Sun,
  Moon,
  Flame,
  ShieldCheck,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface WebLayoutProps {
  activeTab: ActiveScreenTab;
  setActiveTab: (tab: ActiveScreenTab) => void;
  profile: UserProfile;
  fidelity: WireframeFidelity;
  themeMode: ThemeMode;
  isInspectorActive: boolean;
  onSelectSpec: (spec: any) => void;
  onOpenProfileEditor: () => void;
}

export const WebLayout: React.FC<WebLayoutProps> = ({
  activeTab,
  setActiveTab,
  profile,
  fidelity,
  themeMode,
  isInspectorActive,
  onSelectSpec,
  onOpenProfileEditor
}) => {
  const isLoFi = fidelity === 'lo-fi';
  const isMidFi = fidelity === 'mid-fi';

  const navItems = [
    { key: 'daily-brew', label: 'Daily Cosmic Brew & Ritual', icon: Coffee, desc: 'Roast archetype & diurnal forecast' },
    { key: 'kundli-chart', label: 'Vedic Kundli & Natal Chart', icon: Compass, desc: '12 Bhavas, Ephemeris & Dasha' },
    { key: 'coffee-scanner', label: 'AI Coffee Grounds Scanner', icon: Sparkles, desc: 'Tasseography symbol vision oracle' },
    { key: 'predictions', label: 'Planetary Transit Engine', icon: TrendingUp, desc: '2026-2027 Ingresses & AI forecast' },
    { key: 'synastry', label: 'Cosmic Synastry & Blends', icon: Heart, desc: '36-Guna Ashta Koota chemistry' },
    { key: 'barista-chat', label: 'Barista Astro AI Consult', icon: MessageSquare, desc: 'Conversational astrologer oracle' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation Sidebar (3 Columns on Large) */}
        <aside className="lg:col-span-3 space-y-4">
          {/* Seeker Profile Summary Widget */}
          <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-950 flex items-center justify-center font-serif font-bold text-amber-200 border border-amber-500/30">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-amber-100">{profile.name}</h3>
                  <p className="text-[11px] text-amber-400 font-mono">{profile.birthCity}</p>
                </div>
              </div>
              <button
                onClick={onOpenProfileEditor}
                className="text-xs text-amber-300 hover:text-white p-1 rounded hover:bg-amber-500/20"
                title="Edit Birth Details"
              >
                <UserCheck className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-amber-500/10 text-center">
              <div className="bg-black/30 p-1.5 rounded-lg border border-amber-500/10">
                <span className="text-[9px] uppercase font-mono text-amber-400 block">Sun</span>
                <span className="text-xs font-bold text-amber-100">{profile.sunSign}</span>
              </div>
              <div className="bg-black/30 p-1.5 rounded-lg border border-amber-500/10">
                <span className="text-[9px] uppercase font-mono text-amber-400 block">Moon</span>
                <span className="text-xs font-bold text-amber-100">{profile.moonSign}</span>
              </div>
              <div className="bg-black/30 p-1.5 rounded-lg border border-amber-500/10">
                <span className="text-[9px] uppercase font-mono text-amber-400 block">Lagna</span>
                <span className="text-xs font-bold text-amber-300">{profile.ascendant}</span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-300 flex items-center justify-between font-mono">
              <span>Dasha: {profile.currentDasha.split(' ')[0]}</span>
              <span className="text-amber-400 font-bold">2024-2027</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key as ActiveScreenTab)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                    isActive
                      ? 'bg-amber-600/90 text-white font-semibold shadow-md shadow-amber-950/40 border border-amber-400/30'
                      : 'text-amber-200/70 hover:bg-white/5 hover:text-amber-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-black/40 text-amber-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium">{item.label}</div>
                      <div className={`text-[10px] ${isActive ? 'text-white/80' : 'text-amber-300/50'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-amber-400/40'}`} />
                </button>
              );
            })}
          </nav>

          {/* Quick Cosmic Advice Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/30 via-black/40 to-black border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-amber-200">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              Diurnal Hora Timing
            </div>
            <p className="text-[11px] text-amber-300/80 leading-relaxed font-serif">
              "Sun Hora governs today’s zenith (11:45 AM - 01:00 PM). Schedule decisive negotiations or pitch presentations during this window."
            </p>
          </div>
        </aside>

        {/* Center/Main Screen Viewport (9 Columns on Large) */}
        <main className="lg:col-span-9 space-y-6">
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
        </main>
      </div>
    </div>
  );
};
