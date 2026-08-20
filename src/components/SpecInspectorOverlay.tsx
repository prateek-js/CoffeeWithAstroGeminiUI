import React from 'react';
import { ComponentSpecAnnotation } from '../types/astrology';
import { X, Code2, Layers, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface SpecInspectorOverlayProps {
  spec: ComponentSpecAnnotation | null;
  onClose: () => void;
}

export const SpecInspectorOverlay: React.FC<SpecInspectorOverlayProps> = ({ spec, onClose }) => {
  if (!spec) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-lg w-full bg-[#17110E]/95 backdrop-blur-xl border-2 border-amber-500/50 rounded-2xl shadow-2xl p-5 text-amber-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-start justify-between border-b border-amber-500/20 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Wireframe Spec Inspector
            </div>
            <h4 className="text-base font-bold text-amber-100">{spec.name}</h4>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-amber-300 hover:text-white p-1 rounded-lg hover:bg-amber-500/20 transition-colors"
          title="Close Inspector"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <span className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> UX Purpose & Intent:
          </span>
          <p className="text-amber-100/90 leading-relaxed bg-black/30 p-2.5 rounded-lg border border-amber-500/10">
            {spec.uxIntent}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black/30 p-2 rounded-lg border border-amber-500/10">
            <span className="font-mono text-[11px] text-amber-400 block mb-0.5">Figma Node:</span>
            <span className="font-mono text-[11px] text-amber-200 truncate block">{spec.figmaLayer}</span>
          </div>
          <div className="bg-black/30 p-2 rounded-lg border border-amber-500/10">
            <span className="font-mono text-[11px] text-amber-400 block mb-0.5">API Contract:</span>
            <span className="font-mono text-[11px] text-emerald-300 truncate block">{spec.apiBinding}</span>
          </div>
        </div>

        <div>
          <span className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
            <Code2 className="w-3.5 h-3.5 text-amber-400" /> Props & State Machine:
          </span>
          <div className="bg-black/40 p-2 rounded-lg font-mono text-[11px] text-amber-200/90 space-y-1">
            <div className="text-amber-400/80 font-semibold">State: {spec.stateMachine}</div>
            <div className="text-zinc-400 text-[10px]">Props: {spec.propsSchema.join(' • ')}</div>
          </div>
        </div>

        <div>
          <span className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
            <Cpu className="w-3.5 h-3.5 text-amber-400" /> Responsive Behavior:
          </span>
          <p className="text-amber-200/80 text-[11px] bg-black/30 p-2 rounded-lg border border-amber-500/10">
            {spec.responsiveBehavior}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-amber-400/70 font-mono">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Validated Architecture
        </span>
        <span>ID: {spec.id}</span>
      </div>
    </div>
  );
};
