import React from 'react';
import { Sparkles, Brain, Compass } from 'lucide-react';

interface NavbarProps {
  activeView: 'pathways' | 'deepdive' | 'quiz';
  onNavigate: (view: 'pathways' | 'deepdive' | 'quiz') => void;
  onOpenQuizModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-6 px-6 py-3.5 border-b border-white/10 bg-slate-950/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
      {/* Top subtle specular reflection line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Zone 1: Wordmark with glowing icon badge */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('pathways');
        }}
        className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group transition-all"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500/30 to-indigo-600/30 border border-sky-400/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.35)] group-hover:scale-105 transition-transform">
          <Brain className="w-4 h-4 text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
        </div>
        <div className="flex flex-col">
          <span className="leading-tight bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent">
            BioSense 3D
          </span>
          <span className="text-[10px] text-sky-400/80 font-mono tracking-wider font-normal">
            BIOKIMIA SISTEM INDRA
          </span>
        </div>
      </a>

      {/* Zone 2: Frosted Glass Navigation Pills */}
      <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-inner">
        <button
          onClick={() => onNavigate('pathways')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'pathways'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          Visualisasi 2D / 3D Jalur Indra
        </button>
        <button
          onClick={() => onNavigate('deepdive')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'deepdive'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          Kajian & Komparasi Biokimia
        </button>
        <button
          onClick={() => onNavigate('quiz')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'quiz'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          Kuis Evaluasi Otomatis
        </button>
      </nav>

      {/* Zone 3: Glowing Glass CTA button */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onNavigate('quiz')}
          className="relative group overflow-hidden px-4 py-2 text-xs font-semibold text-white rounded-xl backdrop-blur-xl bg-gradient-to-r from-sky-500/80 to-blue-600/80 hover:from-sky-500 hover:to-blue-600 border border-sky-300/40 shadow-[0_0_20px_rgba(14,165,233,0.35)] transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40 pointer-events-none" />
          <span className="relative flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-200 animate-pulse" />
            <span>Mulai Uji Kompetensi</span>
          </span>
        </button>
      </div>
    </header>
  );
};
