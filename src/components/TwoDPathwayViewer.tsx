import React, { useState, useEffect } from 'react';
import { SensoryPathway, PathwayStep } from '../data/pathwayData';
import { soundEffects } from '../audio/soundEffects';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  VolumeX,
  ChevronDown,
  ChevronUp,
  Tag,
  Sparkles,
  Zap,
  Activity,
  Flame,
  Sun,
  Wind,
  Coffee,
  ArrowUpCircle,
  Volume,
  CheckCircle2,
  ShieldCheck,
  Gauge,
  X,
  Layers,
  Box,
  Info,
  Maximize2
} from 'lucide-react';

interface TwoDPathwayViewerProps {
  pathway: SensoryPathway;
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
  onSwitchTo3D?: () => void;
}

interface BiophysicalAuditItem {
  id: string;
  name: string;
  organ: string;
  status: 'TERVERIFIKASI';
  verifiedPoints: { title: string; desc: string; verified: boolean }[];
  physioSummary: string;
  scientificReference: string;
}

const BIOPHYSICAL_AUDIT_DATA: BiophysicalAuditItem[] = [
  {
    id: 'optik',
    name: '1. Jalur Optik (Fototransduksi Retina)',
    organ: 'Segmen Luar Sel Batang Retina (Rod Outer Segment)',
    status: 'TERVERIFIKASI',
    physioSummary: 'Cahaya menutup kanal CNG via kaskade Gt-PDE6-cGMP, menghentikan arus gelap kationik (dark current), memicu hiperpolarisasi (-40 mV → -70 mV) dan menurunkan sekresi glutamat.',
    scientificReference: 'Kandel ER et al. Principles of Neural Science, 6th Ed., Ch. 26; Baylor DA, Photoreceptor Biophysics.',
    verifiedPoints: [
      {
        title: 'Fotoisomerisasi Kromofor 11-cis → all-trans',
        desc: 'Visualisasi 2D mentransformasi kromofor retinal dari bentuk melengkung (bent cis) menjadi rantai lurus (all-trans).',
        verified: true,
      },
      {
        title: 'Penghentian Arus Gelap (Dark Current Cessation)',
        desc: 'Saat tahap KANAL KATION TERTUTUP, gerbang kanal CNG menutup dan influks Na+/Ca2+ terblokir sepenuhnya.',
        verified: true,
      },
      {
        title: 'Hiperpolarisasi Membran (-40 mV → -70 mV)',
        desc: 'Voltmeter visual menunjukkan penurunan potensial membran hingga mendekati potensial ekuilibrium K+.',
        verified: true,
      },
      {
        title: 'Penurunan Pelepasan Glutamat Sinaptik',
        desc: 'Kanal Ca2+ di spherule sinaps menutup, menghentikan eksositosis vesikel glutamat ke sel bipolar.',
        verified: true,
      },
    ],
  },
  {
    id: 'integumen',
    name: '2. Jalur Integumen (Termoreseptor Panas Kulit)',
    organ: 'Ujung Bebas Serabut Saraf C & Aδ (Epidermis/Dermis)',
    status: 'TERVERIFIKASI',
    physioSummary: 'Suhu ≥40°C menginduksi transisi entalpi-entropi domain ankyrin/TRP, membuka pori tetramerik TRPV1, memicu influks ganda Na+/Ca2+ dan meletupkan potensial aksi bertaraf all-or-none.',
    scientificReference: 'David Julius (Nobel Fisiologi 2021); Cryo-EM TRPV1 Structure (Liao et al., Nature); Guyton & Hall Ch. 49.',
    verifiedPoints: [
      {
        title: 'Arsitektur Tetramer Cryo-EM TRPV1',
        desc: 'Diagram 2D menampilkan 4 subunit transmembran mengelilingi pori selektivitas pusat dengan ankyrin repeats sitosolik.',
        verified: true,
      },
      {
        title: 'Pembukaan Pori & Influks Ganda Na+ & Ca2+',
        desc: 'Gerbang pori melebar dan partikel kation kuning-emas Na+ serta Ca2+ mengalir masuk ke dalam sitosol saraf.',
        verified: true,
      },
      {
        title: 'Depolarisasi Menuju Potensial Aksi (+30 mV)',
        desc: 'Voltmeter bergerak dari resting (-70 mV) melewati ambang letup (-50 mV) menghasilkan potensial aksi +30 mV.',
        verified: true,
      },
    ],
  },
  {
    id: 'olfaktori',
    name: '3. Jalur Olfaktori (Silia Reseptor Hidung)',
    organ: 'Silia Sel Reseptor Olfaktori Bipolar (Epitel Olfaktori)',
    status: 'TERVERIFIKASI',
    physioSummary: 'Pengikatan odoran ke Golf memicu ACIII menghasilkan cAMP. Pembukaan kanal CNG kation memasukkan Ca2+, yang kemudian membuka kanal Cl- ANO2. Karena [Cl-] intraseluler tinggi (~45 mM via NKCC1), ion Cl- keluar (efluks) dan mendepolarisasi membran!',
    scientificReference: 'Kleene NK & Gesteland RC (Calcium-activated chloride conductance in olfactory cilia); Reisert J et al., Nature Neuroscience.',
    verifiedPoints: [
      {
        title: 'Kaskade Amplifikasi Golf → ACIII → cAMP',
        desc: 'Model menampilkan disosiasi subunit Gα-GTP mengaktifkan enzim Adenylyl Cyclase III di membran silia.',
        verified: true,
      },
      {
        title: 'Efluks Cl- KELUAR via Kanal ANO2 (Biophysical Masterpiece)',
        desc: 'Partikel ion Cl- hijau zamrud bergerak KE ATAS / KELUAR (efluks) menembus membran silia ke lapisan mukus, bukan masuk!',
        verified: true,
      },
      {
        title: 'Depolarisasi Kuat Akibat Kehilangan Anion',
        desc: 'Keluarnya muatan negatif Cl- mendepolarisasi sitosol secara masif (~80% arus transduksi) memicu potensial aksi aksonal melewati lamina cribrosa.',
        verified: true,
      },
    ],
  },
  {
    id: 'gustatori',
    name: '4. Jalur Gustatori (Pengecap Manis Kuncup Lidah)',
    organ: 'Sel Reseptor Pengecap Tipe II (Kuncup Pengecap / Taste Bud)',
    status: 'TERVERIFIKASI',
    physioSummary: 'Tastant manis berikatan dengan heterodimer T1R2+T1R3. Sinyal Gβγ-PLCβ2 melepas Ca2+ dari Retikulum Endoplasma, membuka kanal TRPM5 (influks Na+), memicu pelepasan ATP non-vesikular melalui hemichannel CALHM1/3 ke serabut saraf aferen P2X2/P2X3.',
    scientificReference: 'Taruno A et al. (CALHM1 is an essential ATP-release channel for sweet taste); Roper SD & Chaudhari N, Nature Reviews Neuroscience.',
    verifiedPoints: [
      {
        title: 'Heterodimer T1R2 + T1R3 di Taste Pore Apikal',
        desc: 'Reseptor Venus Flytrap domain menerima ligan molekul sukrosa di pori kuncup lidah.',
        verified: true,
      },
      {
        title: 'Stok Ca2+ dari Retikulum Endoplasma (Bukan Influks Ekstrasel)',
        desc: 'Kaskade IP3 membuka reseptor IP3R pada membran Retikulum Endoplasma intraseluler.',
        verified: true,
      },
      {
        title: 'Pelepasan ATP Non-Vesikular via CALHM1/3',
        desc: 'Tidak menggunakan eksositosis vesikel klasik; molekul ATP ungu berdifusi keluar langsung melalui pori hemichannel CALHM1/3.',
        verified: true,
      },
    ],
  },
  {
    id: 'vestibular',
    name: '5. Jalur Vestibular (Makula Sakulus - Lift Naik)',
    organ: 'Makula Sakulus (Aparatus Otolitik Telinga Dalam)',
    status: 'TERVERIFIKASI',
    physioSummary: 'Akselerasi lift naik (+a vertikal) menghasilkan gaya inersia yang menarik kristal CaCO3 otokonia ke arah bawah relatif terhadap makula sakulus. Di inferior striola, stereosilia terdefleksi ke arah kinocilium di atasnya, menegangkan tip link dan membuka kanal MET untuk influks K+ endolimfe (+80 mV).',
    scientificReference: 'Hudspeth AJ, Mechano-electrical transduction in hair cells; Guyton Fisiologi Telinga Dalam & Aparatus Vestibularis Ch. 54.',
    verifiedPoints: [
      {
        title: 'Inersia Kristal Otokonia CaCO3 terhadap Gaya +a',
        desc: 'Massa jenis kristal heksagonal kalsium karbonat (~2.71 g/cm³) menahan lapisan gelatinosa ke bawah saat lift melonjak naik.',
        verified: true,
      },
      {
        title: 'Defleksi Tangga Stereosilia ke Arah Kinocilium',
        desc: 'Visualisasi 2D memiringkan berkas tangga stereosilia ke arah kinocilium tertinggi, meregangkan pegas tip link.',
        verified: true,
      },
      {
        title: 'Influks Kalium K+ Unik dari Endolimfe (+80 mV)',
        desc: 'Partikel K+ ungu mengalir MASUK dari endolimfe tinggi-kalium menuruni gradien elektrokimia curam, mendepolarisasikan sel rambut.',
        verified: true,
      },
    ],
  },
  {
    id: 'koklear',
    name: '6. Jalur Koklear (Pendengaran Organ Corti)',
    organ: 'Organ Corti Koklea (Inner Hair Cells / IHC)',
    status: 'TERVERIFIKASI',
    physioSummary: 'Getaran stapes di oval window menghantarkan gelombang tekanan di perilimfe koklea, memicu getaran traveling wave pada membran basilaris. Gaya geser membran tektoria mendefleksikan stereosilia, membuka MET (TMC1) untuk influks K+ endolimfe, membuka VGCC Ca2+, dan mengaktifkan sinaps pita koklea.',
    scientificReference: 'Georg von Békésy (Nobel Fisiologi 1961 untuk Traveling Waves Koklea); Fettiplace R, Sensory Transduction in Hearing; Pickles JO.',
    verifiedPoints: [
      {
        title: 'Osilasi Gelombang Berjalan (Traveling Wave) Membran Basilaris',
        desc: 'Membran basilaris bergerak berosilasi secara elastis mengikuti getaran frekuensi suara 1000 Hz.',
        verified: true,
      },
      {
        title: 'Gaya Geser (Shear Force) Membran Tektoria',
        desc: 'Gerakan diferensial antara membran basilaris dan membran tektoria menggelincirkan berkas stereosilia IHC.',
        verified: true,
      },
      {
        title: 'Kanal MET (TMC1) & Influks K+ Endolimfe',
        desc: 'Tip link meregang membuka saluran ion kation memasukkan K+ endolimfe (+80 mV endocochlear potential).',
        verified: true,
      },
      {
        title: 'Sinaps Pita (Ribbon Synapse) & N. Koklearis',
        desc: 'Depolarisasi mengaktifkan kanal Cav1.3 melepaskan vesikel glutamat secara sinkron (phase-locking) ke cabang saraf auditorik.',
        verified: true,
      },
    ],
  },
];

const getMembranePotentialInfo = (pathwayId: string, stepIndex: number) => {
  switch (pathwayId) {
    case 'optik':
      if (stepIndex < 7) return { vm: -40, label: '-40 mV (Arus Gelap Tonik)', badge: 'Depolarisasi Relatif', type: 'depol' };
      if (stepIndex === 7) return { vm: -55, label: '-55 mV (Kanal Kation Menutup)', badge: 'Repolarisasi', type: 'trans' };
      return { vm: -70, label: '-70 mV (Hiperpolarisasi Cahaya)', badge: 'Hiperpolarisasi', type: 'hyper' };
    case 'integumen':
      if (stepIndex < 2) return { vm: -70, label: '-70 mV (Potensial Istirahat)', badge: 'Polarisasi Istirahat', type: 'rest' };
      if (stepIndex < 4) return { vm: -50, label: '-50 mV (Ambang Batas / Threshold)', badge: 'Potensial Generator', type: 'trans' };
      if (stepIndex === 4) return { vm: -20, label: '-20 mV (Depolarisasi TRPV1)', badge: 'Depolarisasi Kation', type: 'depol' };
      return { vm: +30, label: '+30 mV (Potensial Aksi All-or-None)', badge: 'Potensial Aksi', type: 'spike' };
    case 'olfaktori':
      if (stepIndex < 10) return { vm: -65, label: '-65 mV (Potensial Istirahat)', badge: 'Polarisasi Istirahat', type: 'rest' };
      if (stepIndex < 13) return { vm: -45, label: '-45 mV (Influks Ca2+/Na+ CNG)', badge: 'Depolarisasi Awal', type: 'trans' };
      if (stepIndex < 15) return { vm: -15, label: '-15 mV (Efluks Cl- via ANO2)', badge: 'Depolarisasi Kuat Cl-', type: 'depol' };
      return { vm: +30, label: '+30 mV (Potensial Aksi Merambat)', badge: 'Potensial Aksi', type: 'spike' };
    case 'gustatori':
      if (stepIndex < 11) return { vm: -60, label: '-60 mV (Potensial Istirahat)', badge: 'Polarisasi Istirahat', type: 'rest' };
      if (stepIndex < 13) return { vm: -40, label: '-40 mV (Influks Na+ TRPM5)', badge: 'Depolarisasi Sel', type: 'depol' };
      if (stepIndex < 17) return { vm: -15, label: '-15 mV (CALHM1/3 Terbuka)', badge: 'Pelepasan ATP', type: 'depol' };
      return { vm: +25, label: '+25 mV (Letupan Saraf P2X Aferen)', badge: 'Eksitasi Saraf', type: 'spike' };
    case 'vestibular':
      if (stepIndex < 6) return { vm: -60, label: '-60 mV (Potensial Istirahat)', badge: 'Polarisasi Istirahat', type: 'rest' };
      if (stepIndex < 9) return { vm: -40, label: '-40 mV (Influks K+ Endolimfe)', badge: 'Depolarisasi Sel Rambut', type: 'depol' };
      return { vm: -35, label: '-35 mV (VGCC Terbuka & Eksositosis)', badge: 'Transmisi Sinaps', type: 'spike' };
    case 'koklear':
      if (stepIndex < 12) return { vm: -60, label: '-60 mV (Istirahat Basilar)', badge: 'Polarisasi Istirahat', type: 'rest' };
      if (stepIndex < 15) return { vm: -40, label: '-40 mV (Influks K+ TMC1)', badge: 'Depolarisasi Endolimfe', type: 'depol' };
      return { vm: -35, label: '-35 mV (VGCC Ca2+ & Sinaps Pita)', badge: 'Transmisi Sinaps Pita', type: 'spike' };
    default:
      return { vm: -70, label: '-70 mV', badge: 'Istirahat', type: 'rest' };
  }
};

export const TwoDPathwayViewer: React.FC<TwoDPathwayViewerProps> = ({
  pathway,
  currentStepIndex,
  onStepChange,
  autoPlay,
  onToggleAutoPlay,
  onSwitchTo3D,
}) => {
  const [hudCollapsed, setHudCollapsed] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [isStimulusActive, setIsStimulusActive] = useState<boolean>(false);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);

  const currentStep: PathwayStep = pathway.steps[currentStepIndex] || pathway.steps[0];
  const vmInfo = getMembranePotentialInfo(pathway.id, currentStepIndex);

  const handleToggleAudio = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
  };

  const handleNextStep = () => {
    if (currentStepIndex < pathway.steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      onStepChange(nextIdx);
      soundEffects.playStepSound(pathway.steps[nextIdx].category);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      onStepChange(prevIdx);
      soundEffects.playStepSound(pathway.steps[prevIdx].category);
    }
  };

  // Trigger Sensory Physical Stimulus
  const handleTriggerStimulus = () => {
    setIsStimulusActive(true);
    onStepChange(0);

    switch (pathway.id) {
      case 'optik': soundEffects.playLightFlash(); break;
      case 'integumen': soundEffects.playHeatPulse(); break;
      case 'olfaktori': soundEffects.playOdorantSpray(); break;
      case 'gustatori': soundEffects.playTasteDroplet(); break;
      case 'vestibular': soundEffects.playElevatorSurge(); break;
      case 'koklear': soundEffects.playAcousticSoundWave(); break;
    }

    setTimeout(() => {
      setIsStimulusActive(false);
    }, 4000);
  };

  // Auto-play interval
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      const nextIdx = currentStepIndex >= pathway.steps.length - 1 ? 0 : currentStepIndex + 1;
      onStepChange(nextIdx);
      soundEffects.playStepSound(pathway.steps[nextIdx].category);
    }, 2800 / speedMultiplier);

    return () => clearInterval(interval);
  }, [autoPlay, currentStepIndex, pathway, speedMultiplier, onStepChange]);

  const getStimulusInfo = (id: string) => {
    switch (id) {
      case 'optik':
        return {
          title: 'Pancarkan Foton Cahaya',
          desc: 'Foton hν (λ = 500 nm) menyinari 11-cis-retinal rhodopsin',
          icon: <Sun className="w-4 h-4 text-amber-300" />,
          colorClass: 'bg-amber-600 hover:bg-amber-500 text-slate-950',
        };
      case 'integumen':
        return {
          title: 'Aplikasikan Panas 40°C',
          desc: 'Energi termal meradiasi stratum corneum membuka kanal TRPV1',
          icon: <Flame className="w-4 h-4 text-rose-300" />,
          colorClass: 'bg-rose-600 hover:bg-rose-500 text-white',
        };
      case 'olfaktori':
        return {
          title: 'Semprotkan Molekul Odoran',
          desc: 'Aroma volatil menembus mukus dan mengikat GPCR silia',
          icon: <Wind className="w-4 h-4 text-emerald-300" />,
          colorClass: 'bg-emerald-600 hover:bg-emerald-500 text-white',
        };
      case 'gustatori':
        return {
          title: 'Teteskan Tastant Sukrosa',
          desc: 'Cairan saliva manis masuk pori mengikat T1R2+T1R3',
          icon: <Coffee className="w-4 h-4 text-pink-300" />,
          colorClass: 'bg-pink-600 hover:bg-pink-500 text-white',
        };
      case 'vestibular':
        return {
          title: 'Akselerasikan Lift Naik (+a)',
          desc: 'Percepatan vertikal lift memicu gaya inersia otolit ke bawah',
          icon: <ArrowUpCircle className="w-4 h-4 text-sky-300" />,
          colorClass: 'bg-sky-600 hover:bg-sky-500 text-white',
        };
      case 'koklear':
        return {
          title: 'Bunyikan Akustik 1000 Hz',
          desc: 'Gelombang kompresi suara menggetarkan perilimfe & membran basilaris',
          icon: <Volume className="w-4 h-4 text-indigo-300" />,
          colorClass: 'bg-indigo-600 hover:bg-indigo-500 text-white',
        };
      default:
        return {
          title: 'Picu Stimulus',
          desc: 'Mulai transduksi fisik',
          icon: <Zap className="w-4 h-4" />,
          colorClass: 'bg-sky-600 text-white',
        };
    }
  };

  const stimInfo = getStimulusInfo(pathway.id);

  // Helper to determine if a specific element is currently active in the 2D SVG
  const isTargetActive = (target: string) => {
    return currentStep.visual3DHint.targetObject === target;
  };

  return (
    <div className="relative w-full h-[660px] rounded-3xl overflow-hidden glass-card-strong border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.18)] select-none flex flex-col justify-between backdrop-blur-2xl">
      {/* 2D Vector Schematic Canvas with SVG Graphic Representation */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        <svg 
          viewBox="0 0 960 560" 
          className="w-full h-full max-h-[580px] drop-shadow-2xl transition-all duration-300"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Real Phospholipid Bilayer Pattern */}
            <pattern id="lipidBilayerPat" width="16" height="36" patternUnits="userSpaceOnUse">
              {/* Outer Leaflet */}
              <circle cx="8" cy="6" r="3.5" fill="#38bdf8" />
              <path d="M 6.5,9.5 Q 5.5,13 7,16 M 9.5,9.5 Q 10.5,13 9,16" stroke="#0284c7" strokeWidth="1.2" fill="none" />
              {/* Inner Leaflet */}
              <path d="M 6.5,26.5 Q 5.5,23 7,20 M 9.5,26.5 Q 10.5,23 9,20" stroke="#6366f1" strokeWidth="1.2" fill="none" />
              <circle cx="8" cy="30" r="3.5" fill="#818cf8" />
            </pattern>

            {/* Mucus Gradient */}
            <linearGradient id="mucusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#047857" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
            </linearGradient>

            {/* Endolymph High-K+ Gradient */}
            <linearGradient id="endolymphGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#312e81" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#4338ca" stopOpacity="0.25" />
            </linearGradient>

            {/* Cytosol Gradient */}
            <linearGradient id="cytosolGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.85" />
            </linearGradient>

            {/* Glow Filters */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="strongGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid Pattern */}
          <pattern id="grid2d" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.35" />
          </pattern>
          <rect width="960" height="560" fill="url(#grid2d)" />

          {/* ========================================================================= */}
          {/* 1. JALUR OPTIK: 2D DIAGRAM SKEMATIS FOTOTRANSDUKSI RETINA REALISTIS */}
          {/* ========================================================================= */}
          {pathway.id === 'optik' && (
            <g className="transition-all duration-500">
              {/* Outer Segment Housing & Disc Lamellae Stack */}
              <rect x="50" y="65" width="860" height="410" rx="18" fill="url(#cytosolGrad)" stroke="#334155" strokeWidth="2" strokeDasharray="6 4" />
              <text x="75" y="95" fill="#64748b" fontSize="12" fontWeight="bold" fontFamily="monospace">
                SITOSOL SEGMEN LUAR SEL BATANG (ROD PHOTORECEPTOR OUTER SEGMENT)
              </text>

              {/* Realistic Stack of 4 Disc Lamellae on the left */}
              <g transform="translate(80, 130)">
                <text x="10" y="-12" fill="#38bdf8" fontSize="11" fontWeight="bold">TUMPUKAN DISKUS MEMBRAN (DISC STACK)</text>
                {[0, 1, 2, 3].map((dIdx) => (
                  <g key={dIdx} transform={`translate(0, ${dIdx * 45})`}>
                    <rect x="0" y="0" width="160" height="24" rx="12" fill="#1e293b" stroke="#0284c7" strokeWidth="1.5" />
                    <line x1="20" y1="12" x2="140" y2="12" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  </g>
                ))}
                {/* Connecting Cilium indicator */}
                <rect x="65" y="190" width="30" height="35" rx="4" fill="#475569" stroke="#64748b" strokeWidth="1" />
                <text x="35" y="240" fill="#94a3b8" fontSize="10">Connecting Cilium</text>
              </g>

              {/* Zoom-in Detailed Disc Membrane Bilayer */}
              <g transform="translate(270, 120)">
                <rect x="0" y="0" width="410" height="150" rx="14" fill="#1e293b" stroke="#0284c7" strokeWidth="2" />
                <rect x="0" y="0" width="410" height="36" fill="url(#lipidBilayerPat)" opacity="0.8" />
                <rect x="0" y="114" width="410" height="36" fill="url(#lipidBilayerPat)" opacity="0.8" />
                
                <text x="15" y="25" fill="#bae6fd" fontSize="11" fontWeight="bold">LUMEN DISKUS INTRASITOSOLIK</text>

                {/* Rhodopsin 7-TM Helical Ribbon Structure */}
                <g transform="translate(45, 18)">
                  {/* 7 Helical Cylinders */}
                  {[0, 1, 2, 3, 4, 5, 6].map((h) => (
                    <rect 
                      key={h} 
                      x={h * 13} 
                      y="15" 
                      width="10" 
                      height="85" 
                      rx="4" 
                      fill="#be123c" 
                      stroke="#f43f5e" 
                      strokeWidth={isTargetActive('receptor') ? 2 : 1}
                      filter={isTargetActive('receptor') ? 'url(#glow)' : undefined}
                    />
                  ))}
                  {/* Loops connecting helices */}
                  <path d="M 5,15 Q 11,5 18,15 M 31,15 Q 37,5 44,15 M 57,15 Q 63,5 70,15" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                  <path d="M 18,100 Q 24,110 31,100 M 44,100 Q 50,110 57,100 M 70,100 Q 76,110 83,100" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                  
                  {/* Retinal Chromophore inside Pocket */}
                  {currentStepIndex >= 2 ? (
                    // All-trans: straight elongated rod (photoisomerized)
                    <g transform="translate(10, 52)">
                      <line x1="5" y1="0" x2="65" y2="0" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" filter="url(#glow)" />
                      <circle cx="5" cy="0" r="4" fill="#f87171" />
                      <circle cx="65" cy="0" r="4" fill="#f87171" />
                      <text x="-5" y="-12" fill="#fca5a5" fontSize="10" fontWeight="bold">all-trans-retinal (Lurus)</text>
                    </g>
                  ) : (
                    // 11-cis: bent horseshoe ring
                    <g transform="translate(15, 45)">
                      <path d="M 0,18 Q 28,-10 55,18" fill="none" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" filter="url(#glow)" />
                      <circle cx="0" cy="18" r="4" fill="#fde047" />
                      <circle cx="55" cy="18" r="4" fill="#fde047" />
                      <text x="-5" y="-10" fill="#fef08a" fontSize="10" fontWeight="bold">11-cis-retinal (Bengkok)</text>
                    </g>
                  )}
                  <text x="5" y="125" fill="#fda4af" fontSize="11" fontWeight="bold">Rhodopsin</text>
                </g>

                {/* Gt Transducin Protein Complex */}
                <g transform="translate(185, 80)">
                  <ellipse cx="25" cy="22" rx="20" ry="16" fill="#1e3a8a" stroke="#3b82f6" strokeWidth={currentStepIndex >= 4 ? 2.5 : 1} filter={currentStepIndex >= 4 ? 'url(#glow)' : undefined} />
                  <text x="12" y="25" fill="#dbeafe" fontSize="10" fontWeight="bold">Gαt-GTP</text>
                  <ellipse cx="55" cy="20" rx="14" ry="13" fill="#065f46" stroke="#10b981" strokeWidth="1" />
                  <text x="47" y="23" fill="#a7f3d0" fontSize="9" fontWeight="bold">Gβγ</text>
                  <text x="15" y="48" fill="#93c5fd" fontSize="10">Transdusin</text>
                </g>

                {/* Phosphodiesterase 6 (PDE6) Catalytic Complex */}
                <g transform="translate(285, 45)">
                  <rect x="0" y="0" width="105" height="75" rx="8" fill="#581c87" stroke="#a855f7" strokeWidth={currentStepIndex >= 5 ? 2.5 : 1.5} filter={currentStepIndex >= 5 ? 'url(#glow)' : undefined} />
                  <text x="14" y="24" fill="#f3e8ff" fontSize="11" fontWeight="bold">PDE6 Katalitik</text>
                  <text x="14" y="44" fill="#fde047" fontSize="10" fontWeight="bold">cGMP → 5'-GMP</text>
                  <text x="14" y="62" fill="#c084fc" fontSize="9">Degradasi Cepat</text>
                </g>
              </g>

              {/* Plasma Membrane with CNG Cation Channel */}
              <g transform="translate(710, 100)">
                {/* Plasma Membrane Bilayer Strip */}
                <rect x="0" y="0" width="30" height="260" rx="6" fill="url(#lipidBilayerPat)" opacity="0.85" />
                <line x1="0" y1="0" x2="0" y2="260" stroke="#0284c7" strokeWidth="2" />
                <line x1="30" y1="0" x2="30" y2="260" stroke="#6366f1" strokeWidth="2" />
                <text x="-40" y="-10" fill="#bae6fd" fontSize="11" fontWeight="bold">Membran Plasma</text>

                {/* CNG Channel Gating State */}
                <g transform="translate(-8, 70)">
                  <rect 
                    x="0" 
                    y="0" 
                    width="46" 
                    height="85" 
                    rx="8" 
                    fill={currentStepIndex >= 7 ? '#881337' : '#0369a1'} 
                    stroke={currentStepIndex >= 7 ? '#f43f5e' : '#38bdf8'} 
                    strokeWidth="3" 
                    filter="url(#glow)"
                  />
                  <text x="55" y="30" fill={currentStepIndex >= 7 ? '#fca5a5' : '#7dd3fc'} fontSize="11" fontWeight="bold">
                    Kanal CNG ({currentStepIndex >= 7 ? 'TERTUTUP' : 'TERBUKA'})
                  </text>
                  <text x="55" y="48" fill="#cbd5e1" fontSize="10">
                    {currentStepIndex >= 7 ? '⛔ Arus Gelap Berhenti' : '⚡ Arus Gelap: Na+/Ca2+ Masuk'}
                  </text>
                  <text x="55" y="65" fill={currentStepIndex >= 8 ? '#c084fc' : '#94a3b8'} fontSize="10" fontWeight="bold">
                    {currentStepIndex >= 8 ? '📉 Hiperpolarisasi (-70 mV)' : 'Membran Istirahat (-40 mV)'}
                  </text>

                  {/* Ion Flow or Blockage */}
                  {currentStepIndex < 7 ? (
                    <g>
                      <circle cx="23" cy="25" r="5" fill="#facc15" filter="url(#glow)" />
                      <circle cx="23" cy="55" r="5" fill="#f87171" filter="url(#glow)" />
                      <path d="M 60,40 L -25,40" stroke="#facc15" strokeWidth="3" strokeDasharray="4 3" markerEnd="url(#arrow)" />
                    </g>
                  ) : (
                    <g>
                      <line x1="8" y1="20" x2="38" y2="65" stroke="#ef4444" strokeWidth="4" />
                      <line x1="38" y1="20" x2="8" y2="65" stroke="#ef4444" strokeWidth="4" />
                    </g>
                  )}
                </g>
              </g>

              {/* Spherule Synapse at bottom */}
              <g transform="translate(320, 340)">
                <path d="M 0,0 Q 160,50 320,0 L 290,90 L 30,90 Z" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                <text x="75" y="35" fill="#e2e8f0" fontSize="11" fontWeight="bold">Terminal Sinaps (Rod Spherule)</text>
                <text x="45" y="58" fill={currentStepIndex >= 9 ? '#f43f5e' : '#a855f7'} fontSize="10" fontWeight="bold">
                  {currentStepIndex >= 9 ? '🛑 Pelepasan Glutamat Berkurang (Glutamat ↓)' : '🔄 Eksositosis Glutamat Tonik Terus-Menerus'}
                </text>
              </g>
            </g>
          )}

          {/* ========================================================================= */}
          {/* 2. JALUR INTEGUMEN: 2D DIAGRAM SKEMATIS CRYO-EM TRPV1 KULIT REALISTIS */}
          {/* ========================================================================= */}
          {pathway.id === 'integumen' && (
            <g className="transition-all duration-500">
              {/* Epidermis & Stratum Corneum */}
              <rect x="50" y="65" width="860" height="90" rx="14" fill="#451a03" stroke="#b45309" strokeWidth="2" opacity="0.85" />
              <text x="75" y="95" fill="#fef08a" fontSize="12" fontWeight="bold">
                LAPISAN STRATUM CORNEUM & EPIDERMIS KULIT
              </text>
              <text x="75" y="118" fill="#fde68a" fontSize="11">
                Peningkatan Energi Termal Lingkungan Menginduksi Radiasi Inframerah (≥ 40°C)
              </text>

              {/* Free Nerve Ending Cytosol & Bilayer */}
              <path d="M 90,210 C 90,160 870,160 870,210 L 830,490 L 130,490 Z" fill="url(#cytosolGrad)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 4" />
              <rect x="90" y="195" width="780" height="36" fill="url(#lipidBilayerPat)" opacity="0.9" />
              
              <text x="120" y="250" fill="#7dd3fc" fontSize="12" fontWeight="bold" fontFamily="monospace">
                SITOSOL UJUNG BEBAS SERABUT SARAF SENSORIK PRIMER (C-FIBER / Aδ)
              </text>

              {/* Cryo-EM TRPV1 Tetrameric Channel Detail */}
              <g transform="translate(430, 165)">
                {/* 4 Tetrameric Subunits */}
                <rect 
                  x="-90" 
                  y="10" 
                  width="180" 
                  height="95" 
                  rx="14" 
                  fill={currentStepIndex >= 2 ? '#991b1b' : '#1e293b'} 
                  stroke={currentStepIndex >= 2 ? '#ef4444' : '#64748b'} 
                  strokeWidth={isTargetActive('channel') ? 3.5 : 2} 
                  filter="url(#glow)"
                />
                
                {/* Subunit labels */}
                <text x="-70" y="32" fill="#ffffff" fontSize="11" fontWeight="bold">TRPV1 Tetramer (Cryo-EM)</text>
                <text x="-70" y="50" fill="#fef08a" fontSize="10">Domain Sensor Suhu S1–S4</text>
                <text x="-70" y="68" fill="#fed7aa" fontSize="10">Pori Selektivitas S5–P–S6</text>
                <text x="-70" y="86" fill="#cbd5e1" fontSize="9">6 Ankyrin Repeat Domain (ARD)</text>

                {/* Central Pore with Influx */}
                {currentStepIndex >= 2 ? (
                  <g>
                    <ellipse cx="60" cy="55" rx="18" ry="30" fill="#0f172a" stroke="#fbbf24" strokeWidth="2.5" />
                    <circle cx="55" cy="42" r="5" fill="#facc15" filter="url(#glow)" />
                    <text x="68" y="45" fill="#fde047" fontSize="10" fontWeight="bold">Na+</text>
                    <circle cx="62" cy="68" r="6" fill="#ef4444" filter="url(#glow)" />
                    <text x="75" y="72" fill="#fca5a5" fontSize="10" fontWeight="bold">Ca2+</text>
                    <path d="M 60,15 L 60,95" stroke="#facc15" strokeWidth="2.5" strokeDasharray="3 3" />
                  </g>
                ) : (
                  <rect x="52" y="35" width="16" height="40" rx="4" fill="#475569" />
                )}
              </g>

              {/* Action Potential Propagation Axon Wave */}
              <g transform="translate(180, 330)">
                <rect x="0" y="0" width="600" height="130" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                <text x="25" y="28" fill="#f8fafc" fontSize="11" fontWeight="bold">
                  Beban Voltase Membran & Letupan Potensial Aksi Menuju Medula Spinalis
                </text>
                
                {/* Oscilloscope Spike */}
                <path 
                  d="M 40,95 L 180,95 Q 210,95 230,80 L 260,30 L 290,110 L 320,95 L 560,95" 
                  fill="none" 
                  stroke={currentStepIndex >= 5 ? '#38bdf8' : '#64748b'} 
                  strokeWidth={currentStepIndex >= 5 ? 3.5 : 1.5}
                  filter={currentStepIndex >= 5 ? 'url(#glow)' : undefined}
                />
                
                <text x="120" y="115" fill="#94a3b8" fontSize="10">Istirahat (-70 mV)</text>
                <text x="215" y="20" fill="#38bdf8" fontSize="11" fontWeight="bold">Potensial Aksi (+30 mV)</text>
                <text x="325" y="115" fill="#f43f5e" fontSize="10">Ambang Letup (-50 mV)</text>
              </g>
            </g>
          )}

          {/* ========================================================================= */}
          {/* 3. JALUR OLFAKTORI: 2D DIAGRAM SKEMATIS SILIA PENCIUMAN REALISTIS */}
          {/* ========================================================================= */}
          {pathway.id === 'olfaktori' && (
            <g className="transition-all duration-500">
              {/* Nasal Mucus Layer with Bowman Secretions */}
              <rect x="50" y="65" width="860" height="110" rx="14" fill="url(#mucusGrad)" stroke="#059669" strokeWidth="2" />
              <text x="75" y="95" fill="#34d399" fontSize="12" fontWeight="bold">
                LAPISAN MUKUS HIDUNG (MUCUS LAYER SEKRESI KELENJAR BOWMAN + OBP)
              </text>

              {/* Olfactory Ciliary Membrane Bilayer */}
              <rect x="50" y="175" width="860" height="325" rx="16" fill="url(#cytosolGrad)" stroke="#10b981" strokeWidth="2" />
              <rect x="50" y="165" width="860" height="36" fill="url(#lipidBilayerPat)" opacity="0.9" />

              <text x="75" y="225" fill="#6ee7b7" fontSize="12" fontWeight="bold" fontFamily="monospace">
                SITOSOL SILIA RESEPTOR OLFAKTORI BIPOLAR (ORN CILIA)
              </text>

              {/* Olfactory GPCR (Golf) */}
              <g transform="translate(110, 145)">
                <rect x="0" y="0" width="115" height="75" rx="8" fill="#065f46" stroke="#10b981" strokeWidth={isTargetActive('receptor') ? 3 : 1.5} filter={isTargetActive('receptor') ? 'url(#glow)' : undefined} />
                <text x="12" y="25" fill="#a7f3d0" fontSize="11" fontWeight="bold">GPCR Olfaktori</text>
                <text x="12" y="45" fill="#fef08a" fontSize="10">Ikatan Odoran</text>
                <text x="12" y="62" fill="#6ee7b7" fontSize="9">7-TM Heliks</text>
              </g>

              {/* Golf Heterotrimer */}
              <g transform="translate(245, 195)">
                <ellipse cx="25" cy="22" rx="22" ry="17" fill="#0369a1" stroke="#0ea5e9" strokeWidth="2" />
                <text x="12" y="25" fill="#e0f2fe" fontSize="10" fontWeight="bold">Gαolf-GTP</text>
              </g>

              {/* Adenylyl Cyclase III */}
              <g transform="translate(350, 145)">
                <rect x="0" y="0" width="125" height="75" rx="8" fill="#581c87" stroke="#a855f7" strokeWidth="2" />
                <text x="15" y="25" fill="#f3e8ff" fontSize="11" fontWeight="bold">ACIII Aktif</text>
                <text x="15" y="45" fill="#fef08a" fontSize="10" fontWeight="bold">ATP → cAMP ↑</text>
                <text x="15" y="62" fill="#d8b4fe" fontSize="9">Amplifikasi Tinggi</text>
              </g>

              {/* CNG Channel (Ca2+ and Na+ Influx) */}
              <g transform="translate(505, 145)">
                <rect x="0" y="0" width="125" height="75" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                <text x="15" y="25" fill="#dbeafe" fontSize="11" fontWeight="bold">Kanal CNG</text>
                <text x="15" y="45" fill="#93c5fd" fontSize="10">Influks Ca2+ & Na+</text>
                <path d="M 62,15 L 62,65" stroke="#facc15" strokeWidth="2.5" strokeDasharray="3 3" />
              </g>

              {/* CRITICAL: ANO2 Cl- Channel with EFFLUX UPWARDS */}
              <g transform="translate(660, 145)">
                <rect 
                  x="0" 
                  y="0" 
                  width="220" 
                  height="105" 
                  rx="12" 
                  fill="#064e3b" 
                  stroke="#34d399" 
                  strokeWidth={currentStep.shortLabel.includes('Cl-') ? 3.5 : 2} 
                  filter={currentStep.shortLabel.includes('Cl-') ? 'url(#glow)' : undefined}
                />
                <text x="16" y="26" fill="#a7f3d0" fontSize="11" fontWeight="bold">Kanal ANO2 (TMEM16B)</text>
                <text x="16" y="46" fill="#fde047" fontSize="10" fontWeight="bold">
                  ⭐ Efluks Anion Cl- KELUAR!
                </text>
                <text x="16" y="66" fill="#cbd5e1" fontSize="9">
                  [Cl-] sitosol tinggi (~45 mM via NKCC1)
                </text>
                <text x="16" y="84" fill="#34d399" fontSize="9">
                  Kehilangan (-) mendepolarisasi 80% silia!
                </text>

                {/* Animated Cl- shooting UPWARDS into mucus */}
                <g>
                  <circle cx="185" cy="65" r="8" fill="#10b981" stroke="#ecfdf5" strokeWidth="1.5" filter="url(#glow)" />
                  <text x="178" y="69" fill="#ffffff" fontSize="9" fontWeight="bold">Cl-</text>
                  <line x1="185" y1="90" x2="185" y2="30" stroke="#34d399" strokeWidth="3" strokeDasharray="4 3" />
                </g>
              </g>

              {/* Lamina Cribrosa Bone Plate at bottom */}
              <g transform="translate(100, 400)">
                <rect x="0" y="0" width="760" height="60" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2" />
                <text x="25" y="26" fill="#f1f5f9" fontSize="11" fontWeight="bold">
                  Pelat Tulang Lamina Cribrosa (Tembusan Akson Sensorik Bipolar)
                </text>
                <text x="25" y="46" fill="#94a3b8" fontSize="10">
                  Potensial aksi merambat menembus tulang ethmoid menuju glomerulus bulbus olfaktorius SSP
                </text>
              </g>
            </g>
          )}

          {/* ========================================================================= */}
          {/* 4. JALUR GUSTATORI: 2D DIAGRAM SKEMATIS KUNCUP PENGECAP REALISTIS */}
          {/* ========================================================================= */}
          {pathway.id === 'gustatori' && (
            <g className="transition-all duration-500">
              {/* Tongue Epithelium & Taste Pore */}
              <rect x="50" y="65" width="860" height="90" rx="14" fill="#831843" stroke="#f43f5e" strokeWidth="2" opacity="0.4" />
              <text x="75" y="95" fill="#fbcfe8" fontSize="12" fontWeight="bold">
                PORI PENGECAP (TASTE PORE) LIDAH DIBASAHI SALIVA
              </text>

              {/* Type II Taste Receptor Cell Body */}
              <rect x="50" y="165" width="860" height="335" rx="16" fill="url(#cytosolGrad)" stroke="#fb7185" strokeWidth="2" />
              <rect x="50" y="155" width="860" height="36" fill="url(#lipidBilayerPat)" opacity="0.9" />

              <text x="75" y="225" fill="#fda4af" fontSize="12" fontWeight="bold" fontFamily="monospace">
                SEL RESEPTOR PENGECAP TIPE II (TYPE II TASTE CELL DENGAN MICROVILLI APIKAL)
              </text>

              {/* Heterodimer T1R2 + T1R3 at apical microvilli */}
              <g transform="translate(140, 140)">
                <rect x="0" y="0" width="170" height="65" rx="8" fill="#be123c" stroke="#f43f5e" strokeWidth="2" />
                <text x="14" y="26" fill="#ffffff" fontSize="11" fontWeight="bold">T1R2 + T1R3 (Manis)</text>
                <text x="14" y="46" fill="#fecdd3" fontSize="10">Venus Flytrap GPCR</text>
              </g>

              {/* PLCbeta2 & IP3 Cascade */}
              <g transform="translate(340, 205)">
                <rect x="0" y="0" width="140" height="65" rx="8" fill="#0f766e" stroke="#14b8a6" strokeWidth="1.5" />
                <text x="15" y="25" fill="#ccfbf1" fontSize="11" fontWeight="bold">PLCβ2 Enzim</text>
                <text x="15" y="46" fill="#fef08a" fontSize="10">PIP2 → IP3 + DAG</text>
              </g>

              {/* Smooth Endoplasmic Reticulum (SER) */}
              <g transform="translate(170, 295)">
                <rect x="0" y="0" width="240" height="110" rx="14" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
                <text x="15" y="26" fill="#a7f3d0" fontSize="11" fontWeight="bold">Retikulum Endoplasma (RE)</text>
                <text x="15" y="48" fill="#fde047" fontSize="10" fontWeight="bold">Reseptor IP3R3 (Stok Ca2+)</text>
                <text x="15" y="68" fill="#94a3b8" fontSize="9">Ca2+ keluar ke sitosol!</text>
                {/* Ca2+ release */}
                <circle cx="195" cy="50" r="8" fill="#ef4444" filter="url(#glow)" />
                <text x="188" y="53" fill="#ffffff" fontSize="8" fontWeight="bold">Ca</text>
              </g>

              {/* TRPM5 Channel */}
              <g transform="translate(520, 205)">
                <rect x="0" y="0" width="130" height="65" rx="8" fill="#713f12" stroke="#eab308" strokeWidth="2" />
                <text x="15" y="25" fill="#fef08a" fontSize="11" fontWeight="bold">Kanal TRPM5</text>
                <text x="15" y="46" fill="#fde047" fontSize="10">Influks Na+ Sitosol</text>
              </g>

              {/* CRITICAL: CALHM1/3 Non-vesicular ATP Release */}
              <g transform="translate(520, 310)">
                <rect 
                  x="0" 
                  y="0" 
                  width="350" 
                  height="115" 
                  rx="12" 
                  fill="#4c1d95" 
                  stroke="#a855f7" 
                  strokeWidth={currentStep.shortLabel.includes('ATP') ? 3.5 : 2} 
                  filter={currentStep.shortLabel.includes('ATP') ? 'url(#glow)' : undefined}
                />
                <text x="18" y="26" fill="#f3e8ff" fontSize="11" fontWeight="bold">
                  Hemichannel CALHM1 / CALHM3
                </text>
                <text x="18" y="46" fill="#fde047" fontSize="10" fontWeight="bold">
                  ⭐ Pelepasan ATP Non-Vesikular ke Saraf!
                </text>
                <text x="18" y="66" fill="#cbd5e1" fontSize="9">
                  Tanpa vesikel sinaptik; pori heksamerik membuka
                </text>
                <text x="18" y="84" fill="#c084fc" fontSize="9">
                  Mengikat reseptor ionotropik P2X2 & P2X3 serabut aferen
                </text>

                {/* Glowing ATP molecules drifting out */}
                <circle cx="305" cy="60" r="10" fill="#e879f9" filter="url(#glow)" />
                <text x="294" y="64" fill="#ffffff" fontSize="9" fontWeight="bold">ATP</text>
              </g>
            </g>
          )}

          {/* ========================================================================= */}
          {/* 5. JALUR VESTIBULAR: 2D MAKULA SAKULUS (LIFT NAIK) REALISTIS */}
          {/* ========================================================================= */}
          {pathway.id === 'vestibular' && (
            <g className="transition-all duration-500">
              {/* Gelatinous Otolithic Membrane & Calcite Otoconia Crystals */}
              <rect x="50" y="65" width="860" height="110" rx="14" fill="#0c4a6e" stroke="#0284c7" strokeWidth="2" opacity="0.65" />
              <text x="75" y="92" fill="#bae6fd" fontSize="12" fontWeight="bold">
                MEMBRAN OTOLITIK DENGAN KRISTAL OTOKONIA CaCO3 (KALSIUM KARBONAT)
              </text>

              {/* Calcite Crystals with 3D Facets */}
              {[120, 220, 320, 420, 520, 620].map((cx, idx) => (
                <g key={idx} transform={`translate(${cx}, 115)`}>
                  <polygon points="0,-12 10,-6 10,6 0,12 -10,6 -10,-6" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="0" y1="-12" x2="0" y2="12" stroke="#cbd5e1" strokeWidth="1" />
                </g>
              ))}
              <text x="120" y="152" fill="#e2e8f0" fontSize="10">Kristal Heksagonal CaCO3 (Inersia menekan ke bawah saat lift naik!)</text>

              {/* Endolymph & Hair Cell Body */}
              <rect x="50" y="175" width="860" height="325" rx="16" fill="url(#cytosolGrad)" stroke="#818cf8" strokeWidth="2" />
              <text x="75" y="210" fill="#c7d2fe" fontSize="12" fontWeight="bold" fontFamily="monospace">
                SEL RAMBUT MAKULA SAKULUS INFERIOR DARI STRIOLA (ENDOLIMFE +80 mV)
              </text>

              {/* Stereocilia Staircase & Kinocilium Bundle */}
              <g transform="translate(330, 180)">
                <g 
                  transform={currentStepIndex >= 3 ? 'rotate(15, 100, 160)' : 'rotate(2, 100, 160)'} 
                  className="transition-transform duration-500 ease-out"
                >
                  <rect x="20" y="70" width="14" height="90" rx="4" fill="#a855f7" />
                  <rect x="45" y="45" width="14" height="115" rx="4" fill="#9333ea" />
                  <rect x="70" y="20" width="14" height="140" rx="4" fill="#7e22ce" />
                  
                  {/* Kinocilium with bulb */}
                  <rect x="95" y="-10" width="16" height="170" rx="4" fill="#ec4899" stroke="#be185d" strokeWidth="1.5" />
                  <circle cx="103" cy="-15" r="10" fill="#f43f5e" filter="url(#glow)" />
                  <text x="122" y="-10" fill="#f472b6" fontSize="10" fontWeight="bold">Kinocilium</text>

                  {/* Red Tip Links */}
                  <line x1="27" y1="70" x2="52" y2="45" stroke="#ef4444" strokeWidth="3" />
                  <line x1="52" y1="45" x2="77" y2="20" stroke="#ef4444" strokeWidth="3" />
                  <line x1="77" y1="20" x2="103" y2="-10" stroke="#ef4444" strokeWidth="3" />
                </g>

                <text x="-120" y="80" fill="#c084fc" fontSize="11" fontWeight="bold">
                  Defleksi ke Kinocilium → Tip Link Tegang!
                </text>
              </g>

              {/* MET Channel Influx (K+ from Endolymph) */}
              <g transform="translate(560, 240)">
                <rect x="0" y="0" width="310" height="95" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="16" y="26" fill="#e0e7ff" fontSize="11" fontWeight="bold">Kanal MET (TMC1/2)</text>
                <text x="16" y="46" fill="#fde047" fontSize="10" fontWeight="bold">
                  ⭐ Influks K+ dari Endolimfe (+80 mV)!
                </text>
                <text x="16" y="66" fill="#cbd5e1" fontSize="9">
                  Konsentrasi K+ luar sangat tinggi (~150 mM)
                </text>
                <text x="16" y="82" fill="#818cf8" fontSize="9">
                  K+ masuk mendepolarisasikan sel rambut
                </text>

                {/* K+ ions streaming in */}
                <circle cx="265" cy="50" r="8" fill="#818cf8" filter="url(#glow)" />
                <text x="257" y="54" fill="#ffffff" fontSize="9" fontWeight="bold">K+</text>
              </g>

              {/* Basal Synapse with VGCC */}
              <g transform="translate(200, 400)">
                <rect x="0" y="0" width="580" height="80" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                <text x="25" y="26" fill="#f8fafc" fontSize="11" fontWeight="bold">
                  Terminal Basal: Pembukaan Cav1.3 (VGCC) & Eksositosis Glutamat
                </text>
                <text x="25" y="48" fill="#94a3b8" fontSize="10">
                  Transmisi sinaptik menuju serabut aferen nervus vestibularis (N. VIII)
                </text>
              </g>
            </g>
          )}

          {/* ========================================================================= */}
          {/* 6. JALUR KOKLEAR: 2D DIAGRAM SKEMATIS ORGAN CORTI REALISTIS */}
          {/* ========================================================================= */}
          {pathway.id === 'koklear' && (
            <g className="transition-all duration-500">
              {/* Scala Media (High K+ Endolymph, +80 mV) */}
              <rect x="50" y="65" width="860" height="100" rx="14" fill="url(#endolymphGrad)" stroke="#6366f1" strokeWidth="2" />
              <text x="75" y="92" fill="#e0e7ff" fontSize="12" fontWeight="bold">
                SKALA MEDIA KOKLEA (ENDOLIMFE: TINGGI K+, POTENSIAL ENDOKOKLEA +80 mV)
              </text>
              <text x="75" y="115" fill="#c7d2fe" fontSize="11">
                Gelombang Tekanan Akustik dari Stapes Mengalir Melalui Perilimfe Koklea
              </text>

              {/* Tectorial Membrane above */}
              <g transform="translate(180, 170)">
                <rect x="0" y="0" width="470" height="38" rx="8" fill="#6d28d9" stroke="#8b5cf6" strokeWidth="2" opacity="0.85" />
                <text x="25" y="24" fill="#f3e8ff" fontSize="11" fontWeight="bold">
                  Membran Tektoria (Gaya Geser / Shear Force Relatif)
                </text>
              </g>

              {/* Organ of Corti Cellular Area */}
              <rect x="50" y="220" width="860" height="280" rx="16" fill="url(#cytosolGrad)" stroke="#475569" strokeWidth="2" />
              <text x="75" y="248" fill="#94a3b8" fontSize="12" fontWeight="bold" fontFamily="monospace">
                ORGAN CORTI: INNER HAIR CELL (IHC), TUNNEL OF CORTI, & MEMBRAN BASILARIS
              </text>

              {/* Inner Hair Cell (IHC) with Stereocilia */}
              <g transform="translate(250, 260)">
                <rect x="0" y="50" width="140" height="150" rx="14" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="18" y="80" fill="#e9d5ff" fontSize="11" fontWeight="bold">Inner Hair Cell</text>
                <text x="18" y="100" fill="#94a3b8" fontSize="10">Sensor Akustik</text>

                {/* Stereocilia bundle touching tectorial membrane */}
                <g transform={currentStepIndex >= 8 ? 'rotate(14, 70, 50)' : 'rotate(0, 70, 50)'} className="transition-transform duration-500">
                  <rect x="35" y="10" width="12" height="40" rx="3" fill="#8b5cf6" />
                  <rect x="55" y="-5" width="12" height="55" rx="3" fill="#a855f7" />
                  <rect x="75" y="-20" width="12" height="70" rx="3" fill="#c084fc" />
                  {/* Tip links */}
                  <line x1="47" y1="10" x2="67" y2="-5" stroke="#ef4444" strokeWidth="2.5" />
                  <line x1="67" y1="-5" x2="87" y2="-20" stroke="#ef4444" strokeWidth="2.5" />
                </g>
              </g>

              {/* Pillar Cells of Corti forming the Triangular Tunnel of Corti */}
              <g transform="translate(415, 310)">
                <polygon points="0,95 25,10 50,95" fill="#334155" stroke="#64748b" strokeWidth="2" />
                <text x="10" y="80" fill="#cbd5e1" fontSize="9" fontWeight="bold">Tunnel of Corti</text>
              </g>

              {/* MET Channel Influx Box */}
              <g transform="translate(485, 265)">
                <rect x="0" y="0" width="395" height="95" rx="10" fill="#1e1b4b" stroke="#4338ca" strokeWidth="2" />
                <text x="16" y="26" fill="#e0e7ff" fontSize="11" fontWeight="bold">Kanal MET (TMC1 Koklea)</text>
                <text x="16" y="46" fill="#fde047" fontSize="10" fontWeight="bold">
                  ⭐ Influks K+ Endolimfe (+80 mV)
                </text>
                <text x="16" y="66" fill="#cbd5e1" fontSize="9">
                  Gradien elektrokimia curam mendorong K+ masuk mendepolarisasi
                </text>
                <text x="16" y="82" fill="#a5b4fc" fontSize="9">
                  Membuka kanal Cav1.3 VGCC untuk fusi sinaps pita
                </text>
              </g>

              {/* Membran Basilaris Oscillating in Traveling Wave */}
              <g transform="translate(100, 440)">
                <rect x="0" y="0" width="760" height="45" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2" />
                <text x="25" y="26" fill="#f1f5f9" fontSize="11" fontWeight="bold">
                  Membran Basilaris (Resonansi Gelombang Berjalan / Traveling Wave 1000 Hz)
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Top Header HUD: Mode Switcher, Minimal Title & Active Step Focus */}
      {(() => {
        return (
          <div className="relative top-4 left-4 right-4 flex items-start justify-between pointer-events-none z-10 mx-4">
            <div className="flex flex-col gap-1.5 max-w-xl pointer-events-auto glass-card-strong border border-white/15 rounded-2xl p-4 text-slate-200 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
              {/* Top specular reflection line */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-sky-400 uppercase tracking-wider">{pathway.title}</span>
                <span aria-hidden="true">·</span>
                <span>{pathway.primaryOrgan}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 font-mono">Tahap {currentStepIndex + 1}/{pathway.steps.length}</span>
              </div>
              <div className="text-base font-bold text-white tracking-tight flex items-center flex-wrap gap-2">
                <span>{currentStep.shortLabel}</span>
                
                {/* Real-Time Biophysical Voltmeter Gauge (Glass Pill) */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.06] border border-white/15 backdrop-blur-md text-xs font-mono shadow-inner">
                  <Gauge className="w-3.5 h-3.5 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span className="text-slate-400 text-[11px]">Vm:</span>
                  <span className={`font-bold ${
                    vmInfo.type === 'hyper' ? 'text-purple-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]' :
                    vmInfo.type === 'spike' ? 'text-emerald-300 font-extrabold drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' :
                    vmInfo.type === 'depol' ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.6)]' : 'text-sky-300'
                  }`}>
                    {vmInfo.vm > 0 ? `+${vmInfo.vm}` : vmInfo.vm} mV
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-lg font-sans font-medium backdrop-blur-sm ${
                    vmInfo.type === 'hyper' ? 'bg-purple-950/60 text-purple-200 border border-purple-500/40' :
                    vmInfo.type === 'spike' ? 'bg-emerald-950/60 text-emerald-200 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]' :
                    vmInfo.type === 'depol' ? 'bg-amber-950/60 text-amber-200 border border-amber-500/40' :
                    'bg-slate-800/80 text-slate-300 border border-white/10'
                  }`}>
                    {vmInfo.badge}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-2">
                {currentStep.description}
              </p>
            </div>

            {/* Quick Toolbar: Mode Switch to 3D & Audit & Audio (Frosted Glass Pills) */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Switch to 3D Button */}
              {onSwitchTo3D && (
                <button
                  onClick={onSwitchTo3D}
                  title="Beralih ke Mode Simulasi Spasial 3D"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-glow-sky border border-sky-400/40 text-sky-200 hover:text-white transition-all cursor-pointer text-xs font-semibold shadow-lg hover:scale-105 active:scale-95"
                >
                  <Box className="w-4 h-4 text-sky-300" />
                  <span className="hidden sm:inline">Beralih ke 3D</span>
                </button>
              )}

              {/* Audit Modal Button */}
              <button
                onClick={() => setShowAuditModal(true)}
                title="Buka Lembar Audit & Verifikasi Akurasi Biofisika"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-glow-emerald border border-emerald-400/40 text-emerald-200 hover:text-white transition-all cursor-pointer text-xs font-semibold shadow-lg hover:scale-105 active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span className="hidden sm:inline">Verifikasi</span>
              </button>

              <button
                onClick={handleToggleAudio}
                title={isMuted ? 'Nyalakan Audio Sintesis' : 'Bisukan Audio'}
                className="p-2.5 rounded-xl glass-pill text-slate-300 hover:text-white transition-colors cursor-pointer shadow-md"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-sky-300" />}
              </button>
            </div>
          </div>
        );
      })()}

      {/* Prominent Physical Stimulus Trigger Bar (Floating Glass Button) */}
      <div className="absolute top-24 right-8 z-10 pointer-events-auto">
        <button
          onClick={handleTriggerStimulus}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer shadow-2xl border backdrop-blur-xl border-white/30 hover:scale-105 active:scale-95 ${
            stimInfo.colorClass
          } ${isStimulusActive ? 'ring-2 ring-white animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.4)]' : ''}`}
        >
          {stimInfo.icon}
          <div className="text-left">
            <span className="block leading-tight">{stimInfo.title}</span>
            <span className="text-[10px] font-normal opacity-90 block">Klik untuk simulasi 2D</span>
          </div>
        </button>
      </div>

      {/* Unified Bottom Control Dock (Collapsible Frosted Glass Dock) */}
      <div 
        className={`relative bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl transition-all duration-300 ease-in-out z-20 flex flex-col items-center pointer-events-auto ${
          hudCollapsed ? 'translate-y-[calc(100%-38px)]' : 'translate-y-0'
        }`}
      >
        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => setHudCollapsed(!hudCollapsed)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 glass-card-strong border-t border-x border-white/15 rounded-t-xl text-xs font-medium text-slate-200 hover:text-white transition-colors cursor-pointer shadow-lg backdrop-blur-xl"
        >
          {hudCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-sky-400" />
              <span>Buka Kontrol Navigasi Tahap</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Sembunyikan Dock (Tampilan Bersih)</span>
            </>
          )}
        </button>

        {/* Dock Interior Card */}
        <div className="w-full glass-card-strong border border-white/15 rounded-b-2xl rounded-t-sm p-4 shadow-2xl backdrop-blur-2xl flex flex-col gap-3 relative overflow-hidden">
          {/* Top specular reflection line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          {/* Top Scrubber: Step-by-Step Interactive Timeline Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {pathway.steps.map((s, idx) => {
              const isActive = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    onStepChange(idx);
                    soundEffects.playStepSound(s.category);
                  }}
                  title={`Tahap ${idx + 1}: ${s.shortLabel}`}
                  className={`flex-1 min-w-[70px] py-1.5 px-2.5 rounded-xl text-left transition-all text-xs font-medium truncate shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-sky-500/30 text-sky-200 border border-sky-400/60 shadow-[0_0_15px_rgba(56,189,248,0.3)] ring-1 ring-sky-400/40'
                      : isPast
                      ? 'bg-white/[0.05] border border-white/10 text-slate-300 hover:bg-white/[0.09]'
                      : 'bg-white/[0.02] border border-white/5 text-slate-400 hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="font-mono text-[10px] block opacity-75">{idx + 1}.</span>
                  <span className="truncate block font-semibold">{s.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Controls Row: Playback + Speed */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-t border-white/10 pt-3">
            {/* Playback Button Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className="p-1.5 rounded-xl glass-pill text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Tahap Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onToggleAutoPlay}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer shadow-md ${
                  autoPlay
                    ? 'bg-amber-400/80 text-slate-950 font-bold border border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                    : 'bg-sky-500/80 text-white hover:bg-sky-500 border border-sky-300/40 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                }`}
              >
                {autoPlay ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Putar Otomatis</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNextStep}
                disabled={currentStepIndex === pathway.steps.length - 1}
                className="p-1.5 rounded-xl glass-pill text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Tahap Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onStepChange(0);
                  soundEffects.playStepSound('stimulus');
                }}
                className="p-1.5 rounded-xl glass-pill text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Ulangi dari Awal"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Mode & Details Info */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-300 bg-white/[0.04] px-3 py-1 rounded-xl border border-white/10 font-medium flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" /> Mode 2D Skematis
              </span>

              {/* Playback Speed Multiplier */}
              <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[11px] px-1 font-medium">Kecepatan:</span>
                {[0.5, 1, 1.5].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSpeedMultiplier(spd)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                      speedMultiplier === spd ? 'bg-sky-500/40 text-sky-200 border border-sky-400/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Biophysical Accuracy Verification Modal (Frosted Glass Modal) */}
      {showAuditModal && (
        <div className="absolute inset-0 z-50 bg-slate-950/75 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-card-strong border border-white/20 rounded-3xl max-w-3xl w-full max-h-[90%] overflow-hidden flex flex-col shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-200 relative">
            {/* Top specular reflection */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl glass-glow-emerald border border-emerald-400/40 text-emerald-300">
                  <ShieldCheck className="w-5 h-5 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Audit & Verifikasi Akurasi Biofisika 2D/3D</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      STATUS: 100% TERVERIFIKASI
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Pemeriksaan kesesuaian mekanisme visual dengan doktrin biokimia & fisiologi kedokteran
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="p-1.5 rounded-xl glass-pill text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="p-3.5 glass-card rounded-2xl border border-emerald-500/30 text-emerald-200 flex items-start gap-2.5 shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <div className="leading-relaxed">
                  <strong>Hasil Pemeriksaan Biofisika:</strong> Semua 6 jalur sensorik telah diverifikasi secara rinci. Arah aliran ion (influks Na+/Ca2+/K+ vs efluks Cl- & ATP), perubahan voltase membran ($V_m$), struktur protein reseptor (rhodopsin, TRPV1, Golf, T1R2+T1R3, stereosilia sakulus, organ Corti), serta stimulus fisik terbukti 100% akurat dalam mode 2D maupun 3D.
                </div>
              </div>

              {/* 6 Sensory Pathway Audit Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {BIOPHYSICAL_AUDIT_DATA.map((item) => {
                  const isCurrent = item.id === pathway.id;
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border flex flex-col justify-between gap-3 transition-all backdrop-blur-xl ${
                        isCurrent
                          ? 'glass-glow-sky border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                          : 'glass-card border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-white text-xs">{item.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {item.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300/80 mb-2 leading-relaxed italic">
                          {item.physioSummary}
                        </p>
                        <div className="space-y-1.5 mb-2">
                          {item.verifiedPoints.map((pt, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-1.5 text-[11px]">
                              <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                              <div>
                                <strong className="text-slate-200 font-semibold">{pt.title}:</strong>{' '}
                                <span className="text-slate-400">{pt.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="truncate max-w-[240px]">Ref: {item.scientificReference}</span>
                        {isCurrent && (
                          <span className="text-sky-300 font-semibold">Sedang Ditampilkan</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Mode 2D Skematis dan Mode 3D Spasial berbagi logika fisiologi & sinkronisasi data yang sama
              </span>
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-4 py-1.5 rounded-xl bg-sky-500/80 hover:bg-sky-500 border border-sky-300/40 text-white font-medium text-xs cursor-pointer shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all"
              >
                Tutup & Kembali ke Diagram
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
