import React, { useState } from 'react';
import { SensoryPathway, PathwayStep } from '../data/pathwayData';
import { soundEffects } from '../audio/soundEffects';
import { 
  ArrowRight, 
  Activity, 
  Info, 
  FileText, 
  ListOrdered, 
  Zap, 
  Layers, 
  HelpCircle,
  Eye,
  Thermometer,
  Wind,
  Smile,
  Compass,
  Volume2
} from 'lucide-react';

interface PathwayExplorerProps {
  pathway: SensoryPathway;
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
}

export const PathwayExplorer: React.FC<PathwayExplorerProps> = ({
  pathway,
  currentStepIndex,
  onSelectStep,
}) => {
  const [koklearViewMode, setKoklearViewMode] = useState<'pendek' | 'lengkap'>('pendek');
  const activeStep: PathwayStep = pathway.steps[currentStepIndex] || pathway.steps[0];

  const getCategoryColor = (cat: PathwayStep['category']) => {
    switch (cat) {
      case 'stimulus':
        return 'border-amber-400/40 bg-amber-500/10 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'receptor':
        return 'border-rose-400/40 bg-rose-500/10 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.2)]';
      case 'g-protein':
        return 'border-blue-400/40 bg-blue-500/10 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]';
      case 'enzyme':
        return 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]';
      case 'second-messenger':
        return 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      case 'channel':
        return 'border-indigo-400/40 bg-indigo-500/10 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]';
      case 'ion':
        return 'border-yellow-400/40 bg-yellow-500/10 text-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.2)]';
      case 'potential':
        return 'border-teal-400/40 bg-teal-500/10 text-teal-300 shadow-[0_0_10px_rgba(20,184,166,0.2)]';
      case 'neurotransmitter':
      case 'vesicle':
        return 'border-purple-400/40 bg-purple-500/10 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]';
      default:
        return 'border-white/10 bg-white/[0.04] text-slate-300';
    }
  };

  const getSenseIcon = (id: string) => {
    switch (id) {
      case 'optik': return <Eye className="w-5 h-5 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />;
      case 'integumen': return <Thermometer className="w-5 h-5 text-rose-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />;
      case 'olfaktori': return <Wind className="w-5 h-5 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />;
      case 'gustatori': return <Smile className="w-5 h-5 text-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]" />;
      case 'vestibular': return <Compass className="w-5 h-5 text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />;
      case 'koklear': return <Volume2 className="w-5 h-5 text-indigo-300 drop-shadow-[0_0_8px_rgba(129,140,248,0.6)]" />;
      default: return <Activity className="w-5 h-5 text-slate-300" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Overview Card (Frosted Glass Panel) */}
      <div className="glass-card border border-white/12 rounded-3xl p-6 shadow-xl backdrop-blur-2xl relative overflow-hidden">
        {/* Top specular reflection line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/15 backdrop-blur-md shadow-inner">
              {getSenseIcon(pathway.id)}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-sky-400">{pathway.title}</span>
                <span aria-hidden="true">·</span>
                <span>{pathway.sensoryType}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-amber-300">{pathway.steps.length} Langkah Biokimia</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">{pathway.indonesianSense}</h2>
            </div>
          </div>

          {/* Koklear Version Switcher if viewing Koklear */}
          {pathway.id === 'koklear' && (
            <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] rounded-xl border border-white/10 backdrop-blur-md self-start md:self-auto">
              <button
                onClick={() => setKoklearViewMode('pendek')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  koklearViewMode === 'pendek'
                    ? 'bg-sky-500/30 text-sky-200 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Label Pendek (19 Tahap)
              </button>
              <button
                onClick={() => setKoklearViewMode('lengkap')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  koklearViewMode === 'lengkap'
                    ? 'bg-sky-500/30 text-sky-200 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Deskripsi Lengkap (6 Pilar Mekanika)
              </button>
            </div>
          )}
        </div>

        {/* Tagline Flow summary */}
        <div className="mt-4 p-3.5 glass-card-subtle rounded-2xl border border-sky-500/20 font-mono text-xs text-sky-200 leading-relaxed overflow-x-auto whitespace-pre-wrap shadow-inner">
          {pathway.tagline}
        </div>

        {/* Biological context specs (Glass Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4 text-xs">
          <div className="p-3.5 glass-card-subtle rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-0.5 font-medium">Organ Reseptor</span>
            <span className="text-white font-semibold text-sm">{pathway.primaryOrgan}</span>
          </div>
          <div className="p-3.5 glass-card-subtle rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-0.5 font-medium">Sel Tranduser</span>
            <span className="text-white font-semibold text-sm">{pathway.receptorCell}</span>
          </div>
          <div className="p-3.5 glass-card-subtle rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-0.5 font-medium">Bentuk Stimulus Fisik</span>
            <span className="text-white font-semibold text-sm">{pathway.stimulusType}</span>
          </div>
        </div>
      </div>

      {/* Koklear Special Full Mechanical Description Mode */}
      {pathway.id === 'koklear' && koklearViewMode === 'lengkap' && pathway.detailedDescriptions && (
        <div className="glass-card border border-indigo-400/20 rounded-3xl p-6 shadow-xl backdrop-blur-2xl">
          <div className="flex items-center gap-2 mb-4 text-sm font-bold text-indigo-300">
            <FileText className="w-4 h-4" />
            <span>Versi Deskripsi Lengkap: 6 Pilar Mekanika & Transduksi Koklea</span>
          </div>
          <div className="flex flex-col gap-3">
            {pathway.detailedDescriptions.map((desc, idx) => {
              const [header, ...body] = desc.split(': ');
              return (
                <div key={idx} className="p-4 glass-card-subtle rounded-2xl border border-white/10 flex items-start gap-3.5">
                  <span className="font-mono text-xs font-bold text-sky-300 bg-sky-950/80 px-2.5 py-1 rounded-xl border border-sky-500/40 shrink-0 mt-0.5 shadow-sm">
                    {idx + 1}
                  </span>
                  <div className="text-xs leading-relaxed">
                    <span className="font-bold text-white block mb-1 uppercase tracking-tight text-[11px] text-sky-300">
                      {header}
                    </span>
                    <span className="text-slate-200">{body.join(': ')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Step-by-Step Flow Grid */}
      <div className="glass-card border border-white/12 rounded-3xl p-6 shadow-xl backdrop-blur-2xl relative overflow-hidden">
        {/* Top specular reflection line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <ListOrdered className="w-4 h-4 text-sky-400" />
            <span>Diagram Alir Jalur Biokimia (Klik untuk Simulasi)</span>
          </div>
          <span className="text-xs text-slate-400">
            Aktif: <strong className="text-sky-300">{activeStep.shortLabel}</strong>
          </span>
        </div>

        {/* Step Buttons Chain with Clean Scrolling Track */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2.5 pt-1 scrollbar-thin scrollbar-thumb-white/20">
          {pathway.steps.map((step, idx) => {
            const isSelected = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => {
                    onSelectStep(idx);
                    soundEffects.playStepSound(step.category);
                  }}
                  className={`group relative text-left py-3 px-4 rounded-2xl border transition-all duration-200 cursor-pointer shrink-0 min-w-[140px] ${
                    isSelected
                      ? 'glass-glow-sky border-sky-400/60 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] ring-1 ring-sky-400/40'
                      : isCompleted
                      ? 'bg-white/[0.05] border-white/15 text-slate-200 hover:bg-white/[0.09]'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-sky-400">
                      0{idx + 1}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]' : isCompleted ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]' : 'bg-slate-600'}`} />
                  </div>
                  <span className="font-bold text-xs tracking-tight block truncate text-white">
                    {step.shortLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                    {step.cellularLocation}
                  </span>
                </button>
                {idx < pathway.steps.length - 1 && (
                  <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isCompleted ? 'text-sky-400' : 'text-slate-600'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Step Deep-Dive Inspector Card */}
      <div className="glass-card-strong border border-white/18 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        {/* Top specular reflection line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-sky-950/80 text-sky-300 border border-sky-400/40 font-bold shadow-sm">
              Tahap {currentStepIndex + 1}
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">{activeStep.fullName}</h3>
          </div>
          <span className={`text-xs px-3 py-1 rounded-xl border font-semibold capitalize ${getCategoryColor(activeStep.category)}`}>
            {activeStep.category}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-slate-400 block mb-1.5 font-bold uppercase tracking-wider text-[10px]">
                Deskripsi Fisiologis
              </span>
              <p className="text-slate-200 leading-relaxed text-sm">
                {activeStep.description}
              </p>
            </div>

            <div>
              <span className="text-slate-400 block mb-1.5 font-bold uppercase tracking-wider text-[10px]">
                Mekanisme Molekuler & Biokimia
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activeStep.biochemicalDetails}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3.5 glass-card-subtle p-4 rounded-2xl border border-white/10">
            <div>
              <span className="text-slate-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                Lokalisasi Seluler
              </span>
              <span className="text-white font-medium flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                {activeStep.cellularLocation}
              </span>
            </div>

            {activeStep.ionOrMolecule && (
              <div>
                <span className="text-slate-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                  Ion / Molekul Terlibat
                </span>
                <span className="font-mono text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-500/40 inline-block shadow-sm">
                  {activeStep.ionOrMolecule}
                </span>
              </div>
            )}

            {activeStep.membranePotentialChange && (
              <div>
                <span className="text-slate-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                  Perubahan Potensial Membran (ΔV)
                </span>
                <span className="font-mono text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-xl border border-amber-500/40 font-semibold inline-flex items-center gap-1.5 shadow-sm">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  {activeStep.membranePotentialChange}
                </span>
              </div>
            )}

            <div>
              <span className="text-slate-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                Aksi Visualisasi
              </span>
              <span className="text-slate-300 capitalize">
                Objek: <strong className="text-white">{activeStep.visual3DHint.targetObject}</strong> · Aksi: <strong className="text-sky-300">{activeStep.visual3DHint.action}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
