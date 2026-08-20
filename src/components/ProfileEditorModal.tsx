import React, { useState } from 'react';
import { UserProfile, ZodiacSign } from '../types/astrology';
import { ZODIAC_SIGNS, NAKSHATRAS, COFFEE_ROAST_PROFILES } from '../utils/astrologyEngine';
import { X, User, Calendar, Clock, MapPin, Sparkles, Check } from 'lucide-react';

interface ProfileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
}

export const ProfileEditorModal: React.FC<ProfileEditorModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<UserProfile>({ ...currentProfile });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...formData,
      favoriteBrew: COFFEE_ROAST_PROFILES[formData.sunSign as ZodiacSign]?.name || 'Cosmic Blend'
    };
    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#120D0A] border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 text-amber-100 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-amber-100">
                Seeker Ephemeris & Birth Details
              </h3>
              <p className="text-xs text-amber-300/70">
                Recalculate Natal Kundli & Cosmic Coffee Pairings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-white/10 text-amber-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-amber-300 font-medium block mb-1">Seeker Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-amber-100 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-amber-300 font-medium block mb-1">Date of Birth</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-amber-100 focus:outline-none focus:border-amber-400"
                required
              />
            </div>
            <div>
              <label className="text-amber-300 font-medium block mb-1">Time of Birth</label>
              <input
                type="time"
                value={formData.birthTime}
                onChange={e => setFormData({ ...formData, birthTime: e.target.value })}
                className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-amber-100 focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-amber-300 font-medium block mb-1">Birth City / Location</label>
            <input
              type="text"
              value={formData.birthCity}
              onChange={e => setFormData({ ...formData, birthCity: e.target.value })}
              className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-amber-100 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-amber-300 font-medium block mb-1">Sun Sign</label>
              <select
                value={formData.sunSign}
                onChange={e => setFormData({ ...formData, sunSign: e.target.value })}
                className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-2 py-2 text-amber-100 focus:outline-none focus:border-amber-400"
              >
                {ZODIAC_SIGNS.map(z => (
                  <option key={z.name} value={z.name} className="bg-[#120D0A]">
                    {z.symbol} {z.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-amber-300 font-medium block mb-1">Moon Sign</label>
              <select
                value={formData.moonSign}
                onChange={e => setFormData({ ...formData, moonSign: e.target.value })}
                className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-2 py-2 text-amber-100 focus:outline-none focus:border-amber-400"
              >
                {ZODIAC_SIGNS.map(z => (
                  <option key={z.name} value={z.name} className="bg-[#120D0A]">
                    {z.symbol} {z.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-amber-300 font-medium block mb-1">Ascendant (Lagna)</label>
              <select
                value={formData.ascendant}
                onChange={e => setFormData({ ...formData, ascendant: e.target.value })}
                className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-2 py-2 text-amber-100 focus:outline-none focus:border-amber-400"
              >
                {ZODIAC_SIGNS.map(z => (
                  <option key={z.name} value={z.name} className="bg-[#120D0A]">
                    {z.symbol} {z.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-amber-300 font-medium block mb-1">Nakshatra</label>
            <select
              value={formData.nakshatra}
              onChange={e => setFormData({ ...formData, nakshatra: e.target.value })}
              className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-amber-100 focus:outline-none focus:border-amber-400"
            >
              {NAKSHATRAS.map(n => (
                <option key={n} value={n} className="bg-[#120D0A]">
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t border-amber-500/20 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-black/40 hover:bg-black/60 text-amber-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold flex items-center gap-1.5 shadow-md"
            >
              <Check className="w-4 h-4" />
              Save & Recalculate Chart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
