import React, { useState } from 'react';
import { SENSORY_PATHWAYS, SensoryPathway } from './data/pathwayData';
import { Navbar } from './components/Navbar';
import { ThreePathwayViewer } from './components/ThreePathwayViewer';
import { TwoDPathwayViewer } from './components/TwoDPathwayViewer';
import { PathwayExplorer } from './components/PathwayExplorer';
import { BiochemistryDeepDive } from './components/BiochemistryDeepDive';
import { QuizPlatform } from './components/QuizPlatform';
import { soundEffects } from './audio/soundEffects';
import { 
  Eye, 
  Thermometer, 
  Wind, 
  Smile, 
  Compass, 
  Volume2, 
  Sparkles, 
  GraduationCap, 
  ArrowRight,
  HelpCircle,
  BookOpen,
  Layers,
  Box
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'pathways' | 'deepdive' | 'quiz'>('pathways');
  const [visMode, setVisMode] = useState<'2d' | '3d'>('2d'); // Default 2D upon initial load
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('optik');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

  const currentPathway = SENSORY_PATHWAYS.find((p) => p.id === selectedPathwayId) || SENSORY_PATHWAYS[0];

  const handleSelectPathway = (pathwayId: string) => {
    setSelectedPathwayId(pathwayId);
    setCurrentStepIndex(0);
    setAutoPlay(false);
    soundEffects.playStepSound('stimulus');
  };

  const getPathwayIcon = (id: string) => {
    switch (id) {
      case 'optik': return <Eye className="w-4 h-4 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />;
      case 'integumen': return <Thermometer className="w-4 h-4 text-rose-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />;
      case 'olfaktori': return <Wind className="w-4 h-4 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />;
      case 'gustatori': return <Smile className="w-4 h-4 text-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]" />;
      case 'vestibular': return <Compass className="w-4 h-4 text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />;
      case 'koklear': return <Volume2 className="w-4 h-4 text-indigo-300 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" />;
      default: return null;
    }
  };

  const getPathwayAccentBorder = (id: string, isSelected: boolean) => {
    if (!isSelected) return 'border-white/10 hover:border-white/20 bg-slate-900/40 hover:bg-slate-900/60';
    switch (id) {
      case 'optik': return 'border-amber-400/60 bg-amber-950/40 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/40';
      case 'integumen': return 'border-rose-400/60 bg-rose-950/40 shadow-[0_0_20px_rgba(244,63,94,0.25)] ring-1 ring-rose-400/40';
      case 'olfaktori': return 'border-emerald-400/60 bg-emerald-950/40 shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/40';
      case 'gustatori': return 'border-pink-400/60 bg-pink-950/40 shadow-[0_0_20px_rgba(236,72,153,0.25)] ring-1 ring-pink-400/40';
      case 'vestibular': return 'border-sky-400/60 bg-sky-950/40 shadow-[0_0_20px_rgba(14,165,233,0.25)] ring-1 ring-sky-400/40';
      case 'koklear': return 'border-indigo-400/60 bg-indigo-950/40 shadow-[0_0_20px_rgba(99,102,241,0.25)] ring-1 ring-indigo-400/40';
      default: return 'border-sky-400/60 bg-sky-950/40';
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200 overflow-x-hidden">
      {/* Dynamic Ambient Background Canvas for Glassmorphic Light Refraction */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Top-left Cyan / Blue Orb */}
        <div className="absolute -top-32 -left-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br from-sky-500/25 to-blue-600/15 blur-[120px] animate-orb-1" />
        
        {/* Top-right Purple / Indigo Orb */}
        <div className="absolute top-12 -right-24 w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-bl from-purple-600/20 to-indigo-600/15 blur-[130px] animate-orb-2" />
        
        {/* Mid-center Warm Rose Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-tr from-pink-500/10 via-rose-500/5 to-amber-500/10 blur-[150px]" />
        
        {/* Bottom Emerald Orb */}
        <div className="absolute -bottom-32 left-1/4 w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-t from-emerald-500/20 to-teal-600/10 blur-[130px]" />

        {/* Delicate Glass Mesh Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" />
      </div>

      {/* Top Bar Navigation (Frosted Glass) */}
      <Navbar activeView={activeView} onNavigate={setActiveView} />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Sensory Pathway Selector Bar (Always visible in Pathways view) */}
        {activeView === 'pathways' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-300 tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                6 JALUR MEKANISME BIOKIMIA SISTEM INDRA
              </span>
              <span className="text-xs text-sky-300/80 font-mono hidden sm:inline">
                Pilih modalitas indra untuk simulasi
              </span>
            </div>

            {/* 6 Pathway Selector Buttons (Frosted Glass Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {SENSORY_PATHWAYS.map((p) => {
                const isSelected = p.id === selectedPathwayId;
                const accentClasses = getPathwayAccentBorder(p.id, isSelected);
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPathway(p.id)}
                    className={`flex flex-col p-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 cursor-pointer shadow-lg relative overflow-hidden group ${accentClasses}`}
                  >
                    {/* Top Specular Edge Highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                    <div className="flex items-center justify-between mb-2">
                      <div className="p-1.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-inner group-hover:scale-110 transition-transform">
                        {getPathwayIcon(p.id)}
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 font-bold bg-white/[0.04] px-1.5 py-0.5 rounded-md border border-white/5">
                        0{p.number}
                      </span>
                    </div>

                    <span className="font-bold text-xs text-white truncate block tracking-tight">
                      {p.title}
                    </span>
                    <span className="text-[11px] text-slate-300/75 truncate block mt-0.5">
                      {p.indonesianSense.split(' ')[0]} {p.indonesianSense.split(' ')[1] || ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 1: PATHWAYS 2D/3D & DETAILED EXPLORER */}
        {activeView === 'pathways' && (
          <div className="flex flex-col gap-6">
            {/* Mode Visualisasi Selector: 2D vs 3D (Glass Pill Bar) */}
            <div className="flex items-center justify-between flex-wrap gap-3 glass-card rounded-2xl px-4 py-2.5 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-200">Mode Visualisasi:</span>
                <div className="flex items-center bg-slate-950/60 p-1 rounded-xl border border-white/10 backdrop-blur-md shadow-inner">
                  <button
                    onClick={() => setVisMode('2d')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      visMode === '2d'
                        ? 'bg-sky-500/80 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)] border border-sky-300/40'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>2D Diagram Skematis (Default)</span>
                  </button>

                  <button
                    onClick={() => setVisMode('3d')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      visMode === '3d'
                        ? 'bg-sky-500/80 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)] border border-sky-300/40'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>3D Simulasi Spasial</span>
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-300/80 font-mono flex items-center gap-1.5 bg-white/[0.04] px-3 py-1 rounded-lg border border-white/5">
                <Sparkles className="w-3 h-3 text-sky-400" />
                <span>
                  {visMode === '2d' 
                    ? 'Diagram sirkuit biokimia seluler interaktif 2D' 
                    : 'Model spasial molekuler Three.js WebGL 3D'}
                </span>
              </div>
            </div>

            {/* Dynamic Viewer Section: 2D or 3D */}
            {visMode === '2d' ? (
              <section aria-label="Visualisasi 2D Jalur Biokimia">
                <TwoDPathwayViewer
                  pathway={currentPathway}
                  currentStepIndex={currentStepIndex}
                  onStepChange={setCurrentStepIndex}
                  autoPlay={autoPlay}
                  onToggleAutoPlay={() => setAutoPlay(!autoPlay)}
                  onSwitchTo3D={() => setVisMode('3d')}
                />
              </section>
            ) : (
              <section aria-label="Visualisasi 3D Jalur Biokimia">
                <ThreePathwayViewer
                  pathway={currentPathway}
                  currentStepIndex={currentStepIndex}
                  onStepChange={setCurrentStepIndex}
                  autoPlay={autoPlay}
                  onToggleAutoPlay={() => setAutoPlay(!autoPlay)}
                  onSwitchTo2D={() => setVisMode('2d')}
                />
              </section>
            )}

            {/* Pathway Flow Diagram & Details Section */}
            <section aria-label="Penjelasan Tahap Transduksi">
              <PathwayExplorer
                pathway={currentPathway}
                currentStepIndex={currentStepIndex}
                onSelectStep={setCurrentStepIndex}
              />
            </section>
          </div>
        )}

        {/* VIEW 2: BIOCHEMISTRY DEEP DIVE & COMPARISON */}
        {activeView === 'deepdive' && (
          <section aria-label="Kajian Ilmiah Biokimia">
            <BiochemistryDeepDive />
          </section>
        )}

        {/* VIEW 3: AUTOMATIC EVALUATION QUIZ */}
        {activeView === 'quiz' && (
          <section aria-label="Kuis Evaluasi Otomatis">
            <QuizPlatform />
          </section>
        )}
      </main>

      {/* Clean Glassmorphic Footer */}
      <footer className="relative z-10 border-t border-white/10 glass-card-subtle py-6 px-6 text-center text-xs text-slate-400 mt-12 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            BioSense 3D · Platform Edukasi Mekanisme Transduksi Biokimia Sistem Indra Manusia
          </p>
          <div className="flex items-center gap-3 text-slate-400 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5">Retina</span>
            <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5">TRPV1</span>
            <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5">Golf/ANO2</span>
            <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5">CALHM1/3</span>
            <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5">MET K+</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
