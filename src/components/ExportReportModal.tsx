import React, { useState } from 'react';
import { UserProfile } from '../types/astrology';
import { generateAstrologyReport, DEFAULT_PLANETARY_POSITIONS, DEFAULT_KUNDLI_HOUSES } from '../utils/astrologyEngine';
import { X, FileDown, Copy, Check, Printer, FileText } from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ isOpen, onClose, profile }) => {
  const [copied, setCopied] = useState(false);
  const reportText = generateAstrologyReport(profile, DEFAULT_PLANETARY_POSITIONS, DEFAULT_KUNDLI_HOUSES);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#120D0A] border border-amber-500/40 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 text-amber-100 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-100">
                Cosmic Astrological Coffee Dossier
              </h3>
              <p className="text-xs text-amber-300/70">
                Printable and exportable Kundli & Coffee analysis for {profile.name}
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

        {/* Action Bar */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-xl bg-black/50 hover:bg-black/80 text-amber-200 border border-amber-500/30 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Markdown'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Dossier</span>
          </button>
        </div>

        {/* Report Content Preview */}
        <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/20 font-mono text-xs text-amber-100 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
          {reportText}
        </div>
      </div>
    </div>
  );
};
