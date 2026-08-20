import React, { useState } from 'react';
import {
  ViewportMode,
  WireframeFidelity,
  ThemeMode,
  ActiveScreenTab,
  UserProfile,
  ComponentSpecAnnotation
} from './types/astrology';
import { PRESET_PROFILES } from './data/mockData';
import { Header } from './components/Header';
import { WebLayout } from './components/WebLayout';
import { MobileFrame } from './components/MobileFrame';
import { SpecInspectorOverlay } from './components/SpecInspectorOverlay';
import { DesignSystemModal } from './components/DesignSystemModal';
import { ExportReportModal } from './components/ExportReportModal';
import { ProfileEditorModal } from './components/ProfileEditorModal';

export default function App() {
  const [viewportMode, setViewportMode] = useState<ViewportMode>('web');
  const [fidelity, setFidelity] = useState<WireframeFidelity>('hi-fi');
  const [themeMode, setThemeMode] = useState<ThemeMode>('cosmic-dark');
  const [activeTab, setActiveTab] = useState<ActiveScreenTab>('daily-brew');
  const [presetProfiles, setPresetProfiles] = useState<UserProfile[]>(PRESET_PROFILES);
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(PRESET_PROFILES[0]);

  // Inspector & Modals state
  const [isInspectorActive, setIsInspectorActive] = useState<boolean>(false);
  const [selectedSpec, setSelectedSpec] = useState<ComponentSpecAnnotation | null>(null);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);
  const [isExportReportOpen, setIsExportReportOpen] = useState(false);
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);

  const handleSaveProfile = (updated: UserProfile) => {
    setCurrentProfile(updated);
    setPresetProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const getThemeClass = () => {
    switch (themeMode) {
      case 'roasted-mocha':
        return 'bg-[#180F0A] text-amber-50';
      case 'paper-blueprint':
        return 'bg-[#0B132B] text-sky-100 font-mono';
      case 'starlight-light':
        return 'bg-[#FAF7F2] text-[#241711]';
      case 'cosmic-dark':
      default:
        return 'bg-[#0C0806] text-amber-50';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClass()} flex flex-col`}>
      {/* Studio Header */}
      <Header
        viewportMode={viewportMode}
        setViewportMode={setViewportMode}
        fidelity={fidelity}
        setFidelity={setFidelity}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        isInspectorActive={isInspectorActive}
        setIsInspectorActive={setIsInspectorActive}
        currentProfile={currentProfile}
        presetProfiles={presetProfiles}
        onSelectProfile={setCurrentProfile}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
        onOpenExportReport={() => setIsExportReportOpen(true)}
        onOpenProfileEditor={() => setIsProfileEditorOpen(true)}
      />

      {/* Main Content Area based on Viewport */}
      <div className="flex-1 w-full">
        {viewportMode === 'web' && (
          <WebLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            profile={currentProfile}
            fidelity={fidelity}
            themeMode={themeMode}
            isInspectorActive={isInspectorActive}
            onSelectSpec={setSelectedSpec}
            onOpenProfileEditor={() => setIsProfileEditorOpen(true)}
          />
        )}

        {viewportMode === 'mobile' && (
          <div className="py-6 flex items-center justify-center">
            <MobileFrame
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              profile={currentProfile}
              fidelity={fidelity}
              themeMode={themeMode}
              isInspectorActive={isInspectorActive}
              onSelectSpec={setSelectedSpec}
            />
          </div>
        )}

        {viewportMode === 'split' && (
          <div className="max-w-[1600px] mx-auto p-4 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            <div className="xl:col-span-8 border-b xl:border-b-0 xl:border-r border-amber-500/20 pb-8 xl:pb-0 xl:pr-6">
              <div className="mb-3 px-2 flex items-center justify-between text-xs text-amber-400 font-mono">
                <span>🌐 [VIEWPORT 1: Desktop Web Portal Studio]</span>
                <span>Responsive 12-Column Grid</span>
              </div>
              <WebLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                profile={currentProfile}
                fidelity={fidelity}
                themeMode={themeMode}
                isInspectorActive={isInspectorActive}
                onSelectSpec={setSelectedSpec}
                onOpenProfileEditor={() => setIsProfileEditorOpen(true)}
              />
            </div>
            <div className="xl:col-span-4 flex flex-col items-center justify-center">
              <div className="mb-3 px-2 w-full flex items-center justify-between text-xs text-amber-400 font-mono">
                <span>📱 [VIEWPORT 2: Mobile App Wireframe]</span>
                <span>iOS / Android Shell</span>
              </div>
              <MobileFrame
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                profile={currentProfile}
                fidelity={fidelity}
                themeMode={themeMode}
                isInspectorActive={isInspectorActive}
                onSelectSpec={setSelectedSpec}
              />
            </div>
          </div>
        )}
      </div>

      {/* Floating Wireframe Spec Inspector */}
      {isInspectorActive && selectedSpec && (
        <SpecInspectorOverlay
          spec={selectedSpec}
          onClose={() => setSelectedSpec(null)}
        />
      )}

      {/* Modals */}
      <DesignSystemModal
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />

      <ExportReportModal
        isOpen={isExportReportOpen}
        onClose={() => setIsExportReportOpen(false)}
        profile={currentProfile}
      />

      <ProfileEditorModal
        isOpen={isProfileEditorOpen}
        onClose={() => setIsProfileEditorOpen(false)}
        currentProfile={currentProfile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
