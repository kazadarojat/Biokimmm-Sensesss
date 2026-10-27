import React, { useState } from 'react';
import { SENSORY_PATHWAYS, SensoryPathway } from '../data/pathwayData';
import { 
  BookOpen, 
  HelpCircle, 
  Activity, 
  Stethoscope, 
  ChevronRight, 
  CheckCircle2, 
  Layers,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';

export const BiochemistryDeepDive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mysteries' | 'comparison' | 'clinical'>('mysteries');
  const [selectedSenseId, setSelectedSenseId] = useState<string>('optik');

  const selectedPathway = SENSORY_PATHWAYS.find((p) => p.id === selectedSenseId) || SENSORY_PATHWAYS[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Tab Selector Header (Frosted Glass Panel) */}
      <div className="flex items-center justify-between flex-wrap gap-4 glass-card border border-white/12 rounded-3xl p-5 shadow-xl backdrop-blur-2xl relative overflow-hidden">
        {/* Top specular reflection line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>Kajian Ilmiah & Komparasi Biokimia Sistem Indra</span>
          </h2>
          <p className="text-xs text-slate-300/80 mt-0.5">
            Eksplorasi fenomena transduksi unik, paradoks gradien ionik, dan relevansi farmakologi klinis
          </p>
        </div>

        {/* Tab Buttons (Frosted Glass Pills) */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] rounded-2xl border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('mysteries')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              activeTab === 'mysteries'
                ? 'bg-sky-500/30 text-sky-200 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Misteri Biokimia Unik
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              activeTab === 'comparison'
                ? 'bg-sky-500/30 text-sky-200 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Tabel Komparasi 6 Indra
          </button>
          <button
            onClick={() => setActiveTab('clinical')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              activeTab === 'clinical'
                ? 'bg-sky-500/30 text-sky-200 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Korelasi Klinis & Obat
          </button>
        </div>
      </div>

      {/* Tab 1: Misteri Biokimia Unik */}
      {activeTab === 'mysteries' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sense Selection List */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 px-1">
              Pilih Jalur Indra:
            </span>
            {SENSORY_PATHWAYS.map((p) => {
              const isSelected = p.id === selectedSenseId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedSenseId(p.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer backdrop-blur-xl ${
                    isSelected
                      ? 'glass-glow-sky border-sky-400/60 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)] ring-1 ring-sky-400/40'
                      : 'glass-card border-white/10 text-slate-300 hover:border-white/20 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-sky-300">{p.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono bg-white/[0.04] px-1.5 py-0.5 rounded-md border border-white/5">0{p.number}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-200">{p.indonesianSense}</div>
                </button>
              );
            })}
          </div>

          {/* Deep Explanation Panel (Frosted Glass Strong Card) */}
          <div className="lg:col-span-2 glass-card-strong border border-white/18 rounded-3xl p-6 flex flex-col gap-5 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
            {/* Top specular reflection line */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-sky-300 bg-sky-950/80 px-2.5 py-1 rounded-xl border border-sky-400/40 font-semibold inline-block mb-2 shadow-sm">
                Paradoks & Keunikan Molekuler {selectedPathway.title}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {selectedPathway.uniqueBiochemicalMystery.question}
              </h3>
            </div>

            <div className="p-4 glass-card-subtle rounded-2xl border border-white/10 leading-relaxed text-slate-200 text-sm shadow-inner">
              {selectedPathway.uniqueBiochemicalMystery.explanation}
            </div>

            {/* Step Highlights */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Ringkasan Jalur Transduksi:
              </span>
              <div className="p-3.5 glass-card-subtle rounded-2xl border border-sky-500/20 font-mono text-xs text-sky-200 leading-relaxed overflow-x-auto shadow-inner">
                {selectedPathway.tagline}
              </div>
            </div>

            {/* Special highlight for Cochlear 6 Mechanical Pillars */}
            {selectedPathway.id === 'koklear' && selectedPathway.detailedDescriptions && (
              <div className="mt-2 flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 block">
                  6 Deskripsi Rinci Mekanika Koklea:
                </span>
                <div className="space-y-2.5">
                  {selectedPathway.detailedDescriptions.map((desc, i) => (
                    <div key={i} className="text-xs p-3 rounded-2xl glass-card-subtle border border-white/10 text-slate-200">
                      <strong className="text-sky-300">{desc.split(':')[0]}:</strong>
                      <span>{desc.split(':')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Tabel Komparasi 6 Jalur Biokimia Indra */}
      {activeTab === 'comparison' && (
        <div className="glass-card border border-white/12 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl overflow-x-auto relative">
          {/* Top specular reflection line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-300 uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-3.5 font-semibold">Sistem Indra</th>
                <th className="py-3.5 px-3.5 font-semibold">Organ & Sel Reseptor</th>
                <th className="py-3.5 px-3.5 font-semibold">Reseptor Utama</th>
                <th className="py-3.5 px-3.5 font-semibold">Second Messenger / Enzim</th>
                <th className="py-3.5 px-3.5 font-semibold">Kanal Ion Kunci</th>
                <th className="py-3.5 px-3.5 font-semibold">Arus Ionik Utama</th>
                <th className="py-3.5 px-3.5 font-semibold">Potensial Membran</th>
                <th className="py-3.5 px-3.5 font-semibold">Neurotransmitter Akhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-slate-200">
              <tr className="hover:bg-white/[0.04] transition-colors">
                <td className="py-3.5 px-3.5 font-bold text-amber-300 whitespace-nowrap">1. Optik</td>
                <td className="py-3.5 px-3.5">Retina (Sel Batang / Kerucut)</td>
                <td className="py-3.5 px-3.5">Rhodopsin (11-cis-retinal)</td>
                <td className="py-3.5 px-3.5">Transducin (Gt) → PDE6 (cGMP ↓)</td>
                <td className="py-3.5 px-3.5">Kanal Kation CNG (Tertutup)</td>
                <td className="py-3.5 px-3.5">Blokade influks Na+ & Ca2+</td>
                <td className="py-3.5 px-3.5 font-mono text-purple-300 font-semibold">Hiperpolarisasi (-40 → -70 mV)</td>
                <td className="py-3.5 px-3.5 text-rose-300">Glutamat ↓ (Menurun)</td>
              </tr>
              <tr className="hover:bg-white/[0.04] transition-colors">
                <td className="py-3.5 px-3.5 font-bold text-rose-300 whitespace-nowrap">2. Integumen</td>
                <td className="py-3.5 px-3.5">Kulit (Ujung Saraf C & Aδ)</td>
                <td className="py-3.5 px-3.5">Kanal Termal TRPV1-4</td>
                <td className="py-3.5 px-3.5">Aktivasi Langsung Termal / Entalpi</td>
                <td className="py-3.5 px-3.5">TRPV1 Pori Kation Terbuka</td>
                <td className="py-3.5 px-3.5">Influks Na+ & Ca2+</td>
                <td className="py-3.5 px-3.5 font-mono text-teal-300 font-semibold">Depolarisasi Generator (+30 mV)</td>
                <td className="py-3.5 px-3.5">Substansi P & Glutamat</td>
              </tr>
              <tr className="hover:bg-white/[0.04] transition-colors">
                <td className="py-3.5 px-3.5 font-bold text-emerald-300 whitespace-nowrap">3. Olfaktori</td>
                <td className="py-3.5 px-3.5">Silia Reseptor Olfaktori</td>
                <td className="py-3.5 px-3.5">Olfactory GPCR (Ribuan tipe)</td>
                <td className="py-3.5 px-3.5">Golf → Adenylyl Cyclase III (cAMP ↑)</td>
                <td className="py-3.5 px-3.5">CNG Kation + ANO2 (Kanal Cl-)</td>
                <td className="py-3.5 px-3.5">Influks Ca2+/Na+ + Efluks Cl- Keluar</td>
                <td className="py-3.5 px-3.5 font-mono text-teal-300 font-semibold">Depolarisasi Kuat</td>
                <td className="py-3.5 px-3.5">Glutamat (ke Bulbus Olfaktorius)</td>
              </tr>
              <tr className="hover:bg-white/[0.04] transition-colors">
                <td className="py-3.5 px-3.5 font-bold text-pink-300 whitespace-nowrap">4. Gustatori (Manis)</td>
                <td className="py-3.5 px-3.5">Kuncup Pengecap (Sel Tipe II)</td>
                <td className="py-3.5 px-3.5">Heterodimer T1R2 + T1R3</td>
                <td className="py-3.5 px-3.5">Gustducin → PLCβ2 → IP3 → Ca2+ RE</td>
                <td className="py-3.5 px-3.5">TRPM5 + Hemichannel CALHM1/3</td>
                <td className="py-3.5 px-3.5">Influks Na+ (TRPM5)</td>
                <td className="py-3.5 px-3.5 font-mono text-teal-300 font-semibold">Depolarisasi Sel</td>
                <td className="py-3.5 px-3.5 font-bold text-amber-300">ATP Non-vesikular (ke P2X2/3)</td>
              </tr>
              <tr className="hover:bg-white/[0.04] transition-colors">
                <td className="py-3.5 px-3.5 font-bold text-sky-300 whitespace-nowrap">5. Vestibular</td>
                <td className="py-3.5 px-3.5">Makula Sakulus (Sel Rambut)</td>
                <td className="py-3.5 px-3.5">Kompleks MET (TMC1/2 + Tip Links)</td>
                <td className="py-3.5 px-3.5">Mekanik Langsung (Inersia Otolit)</td>
                <td className="py-3.5 px-3.5">MET Channel + Cav1.3 (VGCC)</td>
                <td className="py-3.5 px-3.5 font-bold text-sky-300">Influks K+ Endolimfe (+80 mV)</td>
                <td className="py-3.5 px-3.5 font-mono text-teal-300 font-semibold">Depolarisasi Bertahap</td>
                <td className="py-3.5 px-3.5 text-rose-300">Glutamat (Ribbon Synapse)</td>
              </tr>
              <tr className="hover:bg-white/[0.04] transition-colors">
                <td className="py-3.5 px-3.5 font-bold text-indigo-300 whitespace-nowrap">6. Koklear</td>
                <td className="py-3.5 px-3.5">Organ Corti (Inner Hair Cell)</td>
                <td className="py-3.5 px-3.5">Tangga Stereosilia + Tip Links (TMC1)</td>
                <td className="py-3.5 px-3.5">Mekanik Geser (Shear Membran)</td>
                <td className="py-3.5 px-3.5">Kanal MET + Cav1.3 (VGCC)</td>
                <td className="py-3.5 px-3.5 font-bold text-sky-300">Influks K+ Endolimfe (+80 mV)</td>
                <td className="py-3.5 px-3.5 font-mono text-teal-300 font-semibold">Depolarisasi Cepat Phase-Lock</td>
                <td className="py-3.5 px-3.5 text-rose-300">Glutamat (ke N. Koklearis)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Relevansi Klinis & Farmakologi */}
      {activeTab === 'clinical' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SENSORY_PATHWAYS.map((p) => (
            <div key={p.id} className="glass-card border border-white/12 rounded-3xl p-5 flex flex-col gap-3 shadow-xl backdrop-blur-2xl relative overflow-hidden">
              {/* Top specular reflection line */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-400/40 text-rose-300">
                    <Stethoscope className="w-4 h-4 drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                  </div>
                  <span className="font-bold text-white text-sm">{p.title}</span>
                </div>
                <span className="text-xs font-mono text-slate-300 bg-white/[0.04] px-2 py-0.5 rounded-lg border border-white/10">{p.primaryOrgan}</span>
              </div>
              <p className="text-xs text-slate-200/90 leading-relaxed">
                {p.keyClinicalRelevance}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
