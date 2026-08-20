import React from 'react';
import { DESIGN_TOKENS } from '../data/mockData';
import { X, Palette, Type, Layers, Box, Check, Copy } from 'lucide-react';

interface DesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSystemModal: React.FC<DesignSystemModalProps> = ({ isOpen, onClose }) => {
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#120D0A] border border-amber-500/40 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 text-amber-100 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-100">
                Coffee with Astro • UI Design System & Tokens
              </h3>
              <p className="text-xs text-amber-300/70">
                Figma Spec Tokens, Color Archetypes, Mathematical Scales & Elevation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-amber-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Color Palette Tokens */}
        <div className="space-y-3">
          <h4 className="text-sm font-serif font-bold text-amber-300 flex items-center gap-2">
            <Palette className="w-4 h-4" /> Color Tokens & Roles
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DESIGN_TOKENS.colors.map(color => (
              <div
                key={color.name}
                onClick={() => copyToClipboard(color.hex)}
                className="p-3 rounded-2xl bg-black/40 border border-amber-500/10 hover:border-amber-500/40 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl border border-white/20 shadow-inner shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-amber-100 truncate">{color.name}</div>
                    <div className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
                      {color.hex}
                      {copiedToken === color.hex ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-amber-300/70 leading-normal">{color.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Typography Scale */}
        <div className="space-y-3">
          <h4 className="text-sm font-serif font-bold text-amber-300 flex items-center gap-2">
            <Type className="w-4 h-4" /> Typography Scales & Pairing
          </h4>
          <div className="space-y-2">
            {DESIGN_TOKENS.typography.map(typo => (
              <div key={typo.name} className="p-3 rounded-xl bg-black/40 border border-amber-500/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-amber-200">{typo.name}</div>
                  <div className="text-[11px] text-amber-300/60 font-mono">{typo.family}</div>
                </div>
                <span className="text-[11px] text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  {typo.usage}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Radii & Elevations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-serif font-bold text-amber-300 flex items-center gap-2">
              <Box className="w-4 h-4" /> Border Radius Hierarchy
            </h4>
            <div className="space-y-1.5 text-xs">
              {DESIGN_TOKENS.radii.map(r => (
                <div key={r.name} className="p-2.5 rounded-lg bg-black/40 border border-amber-500/10 flex items-center justify-between">
                  <span className="text-amber-200">{r.name}</span>
                  <span className="font-mono text-amber-400">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-serif font-bold text-amber-300 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Elevation & Shadows
            </h4>
            <div className="space-y-1.5 text-xs">
              {DESIGN_TOKENS.elevation.map(e => (
                <div key={e.name} className="p-2.5 rounded-lg bg-black/40 border border-amber-500/10 flex items-center justify-between">
                  <span className="text-amber-200">{e.name}</span>
                  <span className="font-mono text-amber-400 text-[10px] truncate max-w-[150px]">{e.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
