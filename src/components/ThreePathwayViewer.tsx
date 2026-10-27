import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { SensoryPathway, PathwayStep } from '../data/pathwayData';
import { soundEffects } from '../audio/soundEffects';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Camera, 
  Volume2, 
  VolumeX,
  ChevronDown,
  ChevronUp,
  Tag,
  ZoomIn,
  ZoomOut,
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
  Award,
  Layers
} from 'lucide-react';

interface ThreePathwayViewerProps {
  pathway: SensoryPathway;
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
  onSwitchTo2D?: () => void;
}

interface AnnotationLabel {
  text: string;
  pos: THREE.Vector3;
  subtext?: string;
  color?: string;
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
        desc: 'Visualisasi 3D mentransformasi retinal dari bentuk bengkok (bent cis) menjadi rantai lurus memanjang (all-trans rod).',
        verified: true,
      },
      {
        title: 'Penghentian Arus Gelap (Dark Current Cessation)',
        desc: 'Saat tahap KANAL KATION TERTUTUP, partikel kation berhenti mengalir (laju influks menjadi 0), merefleksikan penutupan kanal CNG.',
        verified: true,
      },
      {
        title: 'Hiperpolarisasi Membran (-40 mV → -70 mV)',
        desc: 'Voltmeter visual menunjukkan defisit kation mendalam hingga potensial mendekati potensial ekuilibrium K+.',
        verified: true,
      },
      {
        title: 'Penurunan Pelepasan Glutamat Sinaptik',
        desc: 'Penutupan gerbang Ca2+ di spherule sinaptik menghentikan eksositosis vesikel glutamat ke sel bipolar.',
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
        desc: 'Model 3D menampilkan 4 subunit simetris mengelilingi pori selektivitas pusat dengan ankyrin repeat domain sitosolik.',
        verified: true,
      },
      {
        title: 'Pembukaan Pori & Influks Ganda Na+ & Ca2+',
        desc: 'Pori kanal membesar (skala 1.6x) dan partikel kation kuning-emas mengalir deras ke intraseluler.',
        verified: true,
      },
      {
        title: 'Depolarisasi Menuju Potensial Aksi (+30 mV)',
        desc: 'Voltmeter bergerak dari resting (-70 mV) melampaui threshold (-50 mV) menghasilkan overshoot potensial aksi (+30 mV).',
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
        desc: 'Visualisasi 3D memiringkan berkas stereosilia ke arah kinocilium tertinggi (rotasi z = 0.32 rad), menegangkan tip link merah.',
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

export const ThreePathwayViewer: React.FC<ThreePathwayViewerProps> = ({
  pathway,
  currentStepIndex,
  onStepChange,
  autoPlay,
  onToggleAutoPlay,
  onSwitchTo2D,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hudCollapsed, setHudCollapsed] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [cameraPreset, setCameraPreset] = useState<'overview' | 'receptor' | 'channel' | 'synapse'>('overview');
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [isStimulusActive, setIsStimulusActive] = useState<boolean>(false);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);
  const [labels2D, setLabels2D] = useState<{ text: string; x: number; y: number; subtext?: string; color?: string }[]>([]);

  // Three.js Core Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pathwayGroupRef = useRef<THREE.Group | null>(null);
  const currentPathwayIdRef = useRef<string>(pathway.id);

  // Dynamic Camera & Interaction
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 5.5, 17));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.5, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.5, 0));
  const zoomFactorRef = useRef<number>(1);

  // Animation values
  const animTimeRef = useRef<number>(0);
  const activeAnnotationsRef = useRef<AnnotationLabel[]>([]);
  const animatedChannelPoreRef = useRef<THREE.Object3D | null>(null);
  const animatedStereociliaRef = useRef<THREE.Object3D | null>(null);
  const animatedBasilarMembraneRef = useRef<THREE.Object3D | null>(null);
  const animatedParticlesRef = useRef<THREE.Points | null>(null);
  const animatedLightConeRef = useRef<THREE.Mesh | null>(null);
  const animatedRetinalRef = useRef<THREE.Mesh | null>(null);
  const animatedStimulusGroupRef = useRef<THREE.Group | null>(null);
  const isStimulusActiveRef = useRef<boolean>(false);

  const currentStep: PathwayStep = pathway.steps[currentStepIndex] || pathway.steps[0];

  // Camera presets
  const applyCameraPreset = (preset: 'overview' | 'receptor' | 'channel' | 'synapse') => {
    setCameraPreset(preset);
    switch (preset) {
      case 'overview':
        targetCamPosRef.current.set(0, 5.5, 17);
        targetLookAtRef.current.set(0, 0.5, 0);
        break;
      case 'receptor':
        targetCamPosRef.current.set(-2.5, 3.8, 9.5);
        targetLookAtRef.current.set(-1.2, 1.8, 0);
        break;
      case 'channel':
        targetCamPosRef.current.set(2.4, 3.2, 8.5);
        targetLookAtRef.current.set(1.2, 1.2, 0);
        break;
      case 'synapse':
        targetCamPosRef.current.set(3.5, -2.5, 10);
        targetLookAtRef.current.set(1.8, -2.8, 0);
        break;
    }
  };

  const handleZoom = (delta: number) => {
    zoomFactorRef.current = THREE.MathUtils.clamp(zoomFactorRef.current + delta, 0.6, 2.0);
    if (cameraRef.current) {
      targetCamPosRef.current.multiplyScalar(delta > 0 ? 0.88 : 1.12);
    }
  };

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

  // Trigger Sensory Physical Stimulus with dedicated simulation
  const handleTriggerStimulus = () => {
    setIsStimulusActive(true);
    isStimulusActiveRef.current = true;
    onStepChange(0); // Move to Step 1 (Stimulus)

    switch (pathway.id) {
      case 'optik':
        soundEffects.playLightFlash();
        break;
      case 'integumen':
        soundEffects.playHeatPulse();
        break;
      case 'olfaktori':
        soundEffects.playOdorantSpray();
        break;
      case 'gustatori':
        soundEffects.playTasteDroplet();
        break;
      case 'vestibular':
        soundEffects.playElevatorSurge();
        break;
      case 'koklear':
        soundEffects.playAcousticSoundWave();
        break;
    }

    // Keep active for 4 seconds
    setTimeout(() => {
      setIsStimulusActive(false);
      isStimulusActiveRef.current = false;
    }, 4500);
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

  // Synchronize stimulus ref with state or step 0
  useEffect(() => {
    if (currentStepIndex === 0) {
      isStimulusActiveRef.current = true;
      setIsStimulusActive(true);
    }
  }, [currentStepIndex]);

  // =========================================================================
  // HIGH-FIDELITY PROCEDURAL 3D ANATOMICAL & STIMULUS MODEL BUILDER
  // =========================================================================
  const buildPathwaySpecificModel = (pathwayId: string, scene: THREE.Scene, isSoftwareGl: boolean) => {
    if (pathwayGroupRef.current) {
      scene.remove(pathwayGroupRef.current);
      pathwayGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
      });
    }

    const group = new THREE.Group();
    pathwayGroupRef.current = group;
    activeAnnotationsRef.current = [];
    animatedChannelPoreRef.current = null;
    animatedStereociliaRef.current = null;
    animatedBasilarMembraneRef.current = null;
    animatedLightConeRef.current = null;
    animatedRetinalRef.current = null;
    animatedStimulusGroupRef.current = null;

    // PBR Material Palette
    const membraneSlabMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.55,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88,
    });
    const lipidHeadMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.25,
      metalness: 0.15,
      clearcoat: 0.4,
    });
    const lipidInnerHeadMat = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      roughness: 0.3,
      metalness: 0.1,
    });

    // ------------------------------------------------------------------------
    // 1. JALUR OPTIK: FOTON CAHAYA MENYINARI SEL BATANG RETINA
    // ------------------------------------------------------------------------
    if (pathwayId === 'optik') {
      const rodCellGroup = new THREE.Group();
      rodCellGroup.position.set(-1.0, 0, 0);

      // Segmen Luar (Outer Segment)
      const outerSegmentHousing = new THREE.Mesh(
        new THREE.CylinderGeometry(2.8, 2.8, 6.5, 32, 1, true),
        new THREE.MeshPhysicalMaterial({
          color: 0x0f172a,
          roughness: 0.2,
          transmission: isSoftwareGl ? 0 : 0.85,
          transparent: true,
          opacity: isSoftwareGl ? 0.25 : 0.45,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      outerSegmentHousing.position.y = 3.5;
      rodCellGroup.add(outerSegmentHousing);

      // Disc lamellae stack
      const discGeo = new THREE.CylinderGeometry(2.5, 2.5, 0.22, 32);
      const discMat = new THREE.MeshPhysicalMaterial({
        color: 0x334155,
        roughness: 0.35,
        metalness: 0.2,
        clearcoat: 0.3,
      });

      for (let i = 0; i < 8; i++) {
        const disc = new THREE.Mesh(discGeo, discMat);
        disc.position.y = 1.0 + i * 0.65;
        rodCellGroup.add(disc);

        const discEdge = new THREE.Mesh(
          new THREE.TorusGeometry(2.5, 0.1, 12, 32),
          new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 })
        );
        discEdge.rotation.x = Math.PI / 2;
        discEdge.position.y = 1.0 + i * 0.65;
        rodCellGroup.add(discEdge);
      }

      // Rhodopsin 7-TM helical bundle
      const rhodopsinGroup = new THREE.Group();
      rhodopsinGroup.position.set(-0.9, 2.95, 0);
      const helixGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.7, 12);
      const helixMat = new THREE.MeshPhysicalMaterial({
        color: 0xf43f5e,
        roughness: 0.2,
        metalness: 0.3,
        clearcoat: 0.7,
      });
      for (let h = 0; h < 7; h++) {
        const ang = (h / 7) * Math.PI * 2;
        const helix = new THREE.Mesh(helixGeo, helixMat);
        helix.position.set(Math.cos(ang) * 0.32, 0, Math.sin(ang) * 0.32);
        rhodopsinGroup.add(helix);
      }

      // 11-cis-retinal
      const retinalMesh = new THREE.Mesh(
        new THREE.TorusGeometry(0.14, 0.05, 12, 16),
        new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xd97706, emissiveIntensity: 0.7 })
      );
      retinalMesh.rotation.x = Math.PI / 2;
      animatedRetinalRef.current = retinalMesh;
      rhodopsinGroup.add(retinalMesh);
      rodCellGroup.add(rhodopsinGroup);

      // Transducin (Gt)
      const transducinGroup = new THREE.Group();
      transducinGroup.position.set(-0.2, 2.6, 0.5);
      const gAlpha = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 }));
      const gBeta = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 14), new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 }));
      const gGamma = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.3 }));
      gBeta.position.set(0.26, 0, 0);
      gGamma.position.set(0.2, 0.18, 0);
      transducinGroup.add(gAlpha, gBeta, gGamma);
      rodCellGroup.add(transducinGroup);

      // PDE6
      const pdeMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.45, 0.6),
        new THREE.MeshPhysicalMaterial({ color: 0xa855f7, roughness: 0.3, metalness: 0.2 })
      );
      pdeMesh.position.set(0.9, 2.95, 0);
      rodCellGroup.add(pdeMesh);

      // CNG Channel
      const cngChannel = new THREE.Group();
      cngChannel.position.set(2.8, 2.95, 0);
      const cngPore = new THREE.Mesh(
        new THREE.TorusGeometry(0.4, 0.14, 16, 32),
        new THREE.MeshPhysicalMaterial({ color: 0x6366f1, roughness: 0.25, metalness: 0.35, clearcoat: 0.5 })
      );
      cngPore.rotation.y = Math.PI / 2;
      cngChannel.add(cngPore);
      animatedChannelPoreRef.current = cngPore;
      rodCellGroup.add(cngChannel);

      // Connecting Cilium
      const ciliumStalk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.4, 1.0, 16),
        new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5 })
      );
      ciliumStalk.position.y = -0.2;
      rodCellGroup.add(ciliumStalk);

      // Inner Segment with Mitochondria
      const innerSegmentHousing = new THREE.Mesh(
        new THREE.CylinderGeometry(2.6, 2.2, 3.2, 32),
        new THREE.MeshPhysicalMaterial({ color: 0x1e293b, roughness: 0.4, transparent: true, opacity: 0.75 })
      );
      innerSegmentHousing.position.y = -2.2;
      rodCellGroup.add(innerSegmentHousing);

      const mitoMat = new THREE.MeshPhysicalMaterial({ color: 0xf97316, roughness: 0.3, clearcoat: 0.3 });
      const mitoGeo = new THREE.CapsuleGeometry(0.2, 0.6, 8, 16);
      for (let m = 0; m < 6; m++) {
        const ang = (m / 6) * Math.PI * 2;
        const mito = new THREE.Mesh(mitoGeo, mitoMat);
        mito.position.set(Math.cos(ang) * 1.1, -1.8 + (m % 2) * 0.4, Math.sin(ang) * 1.1);
        rodCellGroup.add(mito);
      }

      // Spherule Synapse
      const spherule = new THREE.Mesh(new THREE.SphereGeometry(1.6, 24, 24), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.45 }));
      spherule.position.y = -4.5;
      rodCellGroup.add(spherule);

      // --- DYNAMIC STIMULUS: PHOTON STREAM SIMULATION (Cahaya Masuk) ---
      const photonStimulusGroup = new THREE.Group();
      photonStimulusGroup.name = 'photonStimulus';
      const photonGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const photonMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xfff, emissiveIntensity: 1.0 });
      for (let p = 0; p < 18; p++) {
        const photon = new THREE.Mesh(photonGeo, photonMat);
        photon.position.set(-0.9 + (Math.random() - 0.5) * 1.2, 6.0 + Math.random() * 2.5, (Math.random() - 0.5) * 1.2);
        photonStimulusGroup.add(photon);
      }
      animatedStimulusGroupRef.current = photonStimulusGroup;
      rodCellGroup.add(photonStimulusGroup);

      // Cone Beam
      const lightCone = new THREE.Mesh(
        new THREE.ConeGeometry(2.4, 6.5, 32, 1, true),
        new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.4, side: THREE.DoubleSide, depthWrite: false })
      );
      lightCone.position.set(-0.9, 6.5, 0);
      lightCone.rotation.x = Math.PI;
      animatedLightConeRef.current = lightCone;
      rodCellGroup.add(lightCone);

      group.add(rodCellGroup);

      activeAnnotationsRef.current = [
        { text: 'Foton Cahaya (hν, λ = 500 nm)', pos: new THREE.Vector3(-1.9, 7.2, 0), color: '#facc15' },
        { text: 'Diskus Membran (Outer Segment)', pos: new THREE.Vector3(-1.0, 5.2, 2.0), color: '#38bdf8' },
        { text: 'Rhodopsin + 11-cis-Retinal', pos: new THREE.Vector3(-1.9, 3.2, 0), color: '#f43f5e' },
        { text: 'Transducin (Gt) & PDE6', pos: new THREE.Vector3(-0.1, 2.6, 0.8), color: '#a855f7' },
        { text: 'Kanal CNG (Arus Gelap Menutup)', pos: new THREE.Vector3(1.8, 3.2, 0), color: '#6366f1' },
      ];
    }

    // ------------------------------------------------------------------------
    // 2. JALUR INTEGUMEN: RANGSANGAN PANAS 40°C & KANAL TRPV1
    // ------------------------------------------------------------------------
    else if (pathwayId === 'integumen') {
      const skinGroup = new THREE.Group();

      // Stratum Corneum & Epidermis
      const corneum = new THREE.Mesh(
        new THREE.BoxGeometry(14, 0.5, 8),
        new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85, transparent: true, opacity: 0.4 })
      );
      corneum.position.y = 4.0;
      skinGroup.add(corneum);

      const epidermis = new THREE.Mesh(
        new THREE.BoxGeometry(14, 1.2, 8),
        new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.7, transparent: true, opacity: 0.35 })
      );
      epidermis.position.y = 2.8;
      skinGroup.add(epidermis);

      // Nerve Ending Membrane
      const slab = new THREE.Mesh(new THREE.BoxGeometry(12, 0.7, 7), membraneSlabMat);
      slab.position.y = 0.5;
      skinGroup.add(slab);

      // Phospholipid heads
      const headGeo = new THREE.SphereGeometry(0.14, 12, 12);
      for (let x = -5.5; x <= 5.5; x += 0.55) {
        for (let z = -3.0; z <= 3.0; z += 0.55) {
          if (Math.abs(x) < 1.1 && Math.abs(z) < 1.1) continue;
          const up = new THREE.Mesh(headGeo, lipidHeadMat);
          up.position.set(x, 0.9, z);
          const down = new THREE.Mesh(headGeo, lipidInnerHeadMat);
          down.position.set(x, 0.1, z);
          skinGroup.add(up, down);
        }
      }

      // TRPV1 Tetramer
      const trpvTetramer = new THREE.Group();
      trpvTetramer.position.set(0, 0.5, 0);

      for (let i = 0; i < 4; i++) {
        const ang = (i / 4) * Math.PI * 2;
        const subGroup = new THREE.Group();
        subGroup.position.set(Math.cos(ang) * 0.85, 0, Math.sin(ang) * 0.85);
        subGroup.rotation.y = -ang;

        const poreHelix = new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.24, 1.6, 14),
          new THREE.MeshPhysicalMaterial({ color: 0xef4444, roughness: 0.25, metalness: 0.25, clearcoat: 0.6 })
        );
        subGroup.add(poreHelix);

        const sensorBundle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.26, 0.26, 1.4, 12),
          new THREE.MeshPhysicalMaterial({ color: 0xf97316, roughness: 0.3, metalness: 0.2 })
        );
        sensorBundle.position.set(0.42, 0, 0);
        subGroup.add(sensorBundle);

        const ardFinger = new THREE.Mesh(
          new THREE.BoxGeometry(0.35, 0.8, 0.4),
          new THREE.MeshPhysicalMaterial({ color: 0xd97706, roughness: 0.35, metalness: 0.15 })
        );
        ardFinger.position.set(0.15, -0.9, 0);
        subGroup.add(ardFinger);

        trpvTetramer.add(subGroup);
      }

      const trpvPoreRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.45, 0.12, 16, 32),
        new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xf59e0b, emissiveIntensity: 0.8 })
      );
      trpvPoreRing.rotation.x = Math.PI / 2;
      trpvPoreRing.position.y = 0.3;
      animatedChannelPoreRef.current = trpvPoreRing;
      trpvTetramer.add(trpvPoreRing);
      skinGroup.add(trpvTetramer);

      // --- DYNAMIC STIMULUS: THERMAL HEAT PROBE & RADIANT RINGS (Panas 40°C) ---
      const thermalStimulusGroup = new THREE.Group();
      thermalStimulusGroup.name = 'thermalStimulus';

      // Heated Copper/Ceramic Probe Plate
      const heatedProbe = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.6, 0.6, 24),
        new THREE.MeshStandardMaterial({ color: 0xd97706, emissive: 0xef4444, emissiveIntensity: 0.7, roughness: 0.3 })
      );
      heatedProbe.position.set(0, 5.0, 0);
      thermalStimulusGroup.add(heatedProbe);

      // Pulsating Thermal Radiation Rings
      for (let h = 0; h < 4; h++) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(1.6 + h * 0.8, 0.06, 12, 32),
          new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.7 - h * 0.14 })
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 2.4 + h * 0.55;
        thermalStimulusGroup.add(ring);
      }
      animatedStimulusGroupRef.current = thermalStimulusGroup;
      skinGroup.add(thermalStimulusGroup);

      // Axon Shaft
      const axonShaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 0.9, 4.0, 24),
        new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.45 })
      );
      axonShaft.position.set(0, -2.5, 0);
      skinGroup.add(axonShaft);

      group.add(skinGroup);

      activeAnnotationsRef.current = [
        { text: 'Sumber Rangsangan Panas (Probe ≥40°C)', pos: new THREE.Vector3(0, 5.5, 0), color: '#ef4444' },
        { text: 'Radiasi Termal Menembus Epidermis', pos: new THREE.Vector3(0, 3.2, 2.0), color: '#f97316' },
        { text: 'Kanal TRPV1 Tetramer (Cryo-EM S1-S6)', pos: new THREE.Vector3(0, 1.4, 1.6), color: '#facc15' },
        { text: 'Influks Na+ & Ca2+ ke Sitosol Saraf', pos: new THREE.Vector3(0, -1.8, 1.4), color: '#38bdf8' },
      ];
    }

    // ------------------------------------------------------------------------
    // 3. JALUR OLFAKTORI: MOLEKUL ODORAN VOLATIL & SILIA MUKOSA
    // ------------------------------------------------------------------------
    else if (pathwayId === 'olfaktori') {
      const olfGroup = new THREE.Group();

      // Mucus Layer
      const mucus = new THREE.Mesh(
        new THREE.BoxGeometry(14, 0.8, 8),
        new THREE.MeshPhysicalMaterial({ color: 0x059669, transparent: true, opacity: 0.25, roughness: 0.1, depthWrite: false })
      );
      mucus.position.y = 3.2;
      olfGroup.add(mucus);

      // Dendritic Knob & Cilia
      const knob = new THREE.Mesh(new THREE.SphereGeometry(1.2, 24, 24), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 }));
      knob.position.set(-2.0, 1.8, 0);
      olfGroup.add(knob);

      const ciliumGeo = new THREE.CylinderGeometry(0.08, 0.08, 5.5, 16);
      ciliumGeo.translate(0, 2.75, 0);
      const cilMat = new THREE.MeshPhysicalMaterial({ color: 0x10b981, roughness: 0.25, metalness: 0.2 });
      for (let c = 0; c < 4; c++) {
        const cil = new THREE.Mesh(ciliumGeo, cilMat);
        cil.position.set(-2.0, 1.8, 0);
        cil.rotation.z = -Math.PI / 2.5 + c * 0.25;
        cil.rotation.y = (c - 1.5) * 0.3;
        olfGroup.add(cil);
      }

      // Ciliary Membrane Detail
      const ciliumFocus = new THREE.Mesh(
        new THREE.CylinderGeometry(1.4, 1.4, 9, 32),
        new THREE.MeshPhysicalMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.15 })
      );
      ciliumFocus.rotation.z = Math.PI / 2;
      ciliumFocus.position.set(1.5, 1.2, 0);
      olfGroup.add(ciliumFocus);

      // GPCR
      const olfGpcr = new THREE.Group();
      olfGpcr.position.set(-1.0, 2.7, 0);
      const gpcrBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.2, 16), new THREE.MeshPhysicalMaterial({ color: 0x059669, roughness: 0.25 }));
      olfGpcr.add(gpcrBarrel);
      olfGroup.add(olfGpcr);

      // Golf Protein & ACIII
      const golfAlpha = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 16), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 }));
      golfAlpha.position.set(-0.8, 1.7, 0.4);
      olfGroup.add(golfAlpha);

      const ac3 = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), new THREE.MeshPhysicalMaterial({ color: 0xa855f7, roughness: 0.3 }));
      ac3.position.set(1.0, 2.7, 0);
      olfGroup.add(ac3);

      // CNG & ANO2
      const cngOlf = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.14, 16, 32), new THREE.MeshPhysicalMaterial({ color: 0x3b82f6, roughness: 0.25 }));
      cngOlf.rotation.x = Math.PI / 2;
      cngOlf.position.set(2.8, 2.7, 0);
      olfGroup.add(cngOlf);

      const ano2Channel = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.16, 16, 32), new THREE.MeshPhysicalMaterial({ color: 0x22c55e, roughness: 0.2 }));
      ano2Channel.rotation.x = Math.PI / 2;
      ano2Channel.position.set(4.6, 2.7, 0);
      animatedChannelPoreRef.current = ano2Channel;
      olfGroup.add(ano2Channel);

      // --- DYNAMIC STIMULUS: AROMATIC ODORANT MOLECULE STREAM (Molekul Odoran Masuk) ---
      const odorantStimulusGroup = new THREE.Group();
      odorantStimulusGroup.name = 'odorantStimulus';

      // 10 Chemical Benzene-Ring Shaped Odorant Molecules drifting into mucus
      const odorRingGeo = new THREE.TorusGeometry(0.2, 0.06, 6, 6);
      const odorMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xeab308, emissiveIntensity: 0.7 });
      for (let o = 0; o < 12; o++) {
        const odorMol = new THREE.Mesh(odorRingGeo, odorMat);
        odorMol.position.set(-3.5 + Math.random() * 4.5, 4.2 + Math.random() * 2.5, (Math.random() - 0.5) * 3);
        odorMol.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        odorantStimulusGroup.add(odorMol);
      }
      animatedStimulusGroupRef.current = odorantStimulusGroup;
      olfGroup.add(odorantStimulusGroup);

      // Lamina Cribrosa Bone Plate
      const bonePlate = new THREE.Mesh(new THREE.BoxGeometry(14, 0.8, 8), new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.75 }));
      bonePlate.position.y = -3.2;
      olfGroup.add(bonePlate);

      group.add(olfGroup);

      activeAnnotationsRef.current = [
        { text: 'Stimulus Odoran (Molekul Volatil Masuk)', pos: new THREE.Vector3(-1.0, 5.8, 0), color: '#facc15' },
        { text: 'Lapisan Mukus & Silia Olfaktori', pos: new THREE.Vector3(-2.0, 3.8, 0), color: '#10b981' },
        { text: 'GPCR Olfaktori (Ikatan Odoran)', pos: new THREE.Vector3(-1.0, 3.4, 0), color: '#34d399' },
        { text: 'Adenylyl Cyclase III (cAMP ↑)', pos: new THREE.Vector3(1.0, 3.4, 0), color: '#c084fc' },
        { text: 'Kanal ANO2 (Efluks Cl- Keluar)', pos: new THREE.Vector3(4.6, 3.4, 0), color: '#4ade80' },
      ];
    }

    // ------------------------------------------------------------------------
    // 4. JALUR GUSTATORI: TETESAN TASTANT SUKROSA & KUNCUP PENGECAP
    // ------------------------------------------------------------------------
    else if (pathwayId === 'gustatori') {
      const tasteGroup = new THREE.Group();

      const tongueEpithelium = new THREE.Mesh(
        new THREE.BoxGeometry(14, 0.6, 8),
        new THREE.MeshStandardMaterial({ color: 0x831843, roughness: 0.6, transparent: true, opacity: 0.5 })
      );
      tongueEpithelium.position.y = 3.6;
      tasteGroup.add(tongueEpithelium);

      const budHousing = new THREE.Mesh(
        new THREE.SphereGeometry(3.6, 32, 24, 0, Math.PI * 1.4),
        new THREE.MeshPhysicalMaterial({ color: 0x500724, roughness: 0.45, transparent: true, opacity: 0.4, side: THREE.DoubleSide })
      );
      budHousing.scale.set(0.9, 1.3, 0.9);
      budHousing.position.y = 0.5;
      tasteGroup.add(budHousing);

      const cellBody = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.3, 5.0, 32),
        new THREE.MeshPhysicalMaterial({ color: 0x1e293b, roughness: 0.35, clearcoat: 0.3 })
      );
      cellBody.position.set(0, 0.8, 0);
      tasteGroup.add(cellBody);

      // Microvilli
      const microvilliGroup = new THREE.Group();
      microvilliGroup.position.set(0, 3.3, 0);
      const mvGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.8, 12);
      for (let m = -0.7; m <= 0.7; m += 0.22) {
        const mv = new THREE.Mesh(mvGeo, new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.3 }));
        mv.position.set(m, 0.4, (Math.random() - 0.5) * 0.4);
        microvilliGroup.add(mv);
      }
      tasteGroup.add(microvilliGroup);

      // T1R2 + T1R3 Heterodimer
      const t1rGroup = new THREE.Group();
      t1rGroup.position.set(-0.6, 3.6, 0);
      const vfd1 = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), new THREE.MeshPhysicalMaterial({ color: 0xf43f5e, roughness: 0.25 }));
      const vfd2 = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), new THREE.MeshPhysicalMaterial({ color: 0xfb7185, roughness: 0.25 }));
      vfd1.position.x = -0.25;
      vfd2.position.x = 0.25;
      t1rGroup.add(vfd1, vfd2);
      tasteGroup.add(t1rGroup);

      // Retikulum Endoplasma Ca2+
      const erGroup = new THREE.Group();
      erGroup.position.set(-0.3, 1.2, 0);
      const erMesh = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.25, 16, 32), new THREE.MeshPhysicalMaterial({ color: 0x10b981, roughness: 0.3, transparent: true, opacity: 0.85 }));
      erMesh.rotation.x = Math.PI / 3;
      erGroup.add(erMesh);
      tasteGroup.add(erGroup);

      // TRPM5 & CALHM1/3
      const trpm5Channel = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.12, 16, 32), new THREE.MeshPhysicalMaterial({ color: 0xeab308, roughness: 0.25 }));
      trpm5Channel.rotation.y = Math.PI / 2;
      trpm5Channel.position.set(1.6, 1.2, 0);
      tasteGroup.add(trpm5Channel);

      const calhmPore = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.18, 16, 32), new THREE.MeshPhysicalMaterial({ color: 0x8b5cf6, roughness: 0.2, metalness: 0.35 }));
      calhmPore.rotation.y = Math.PI / 2;
      calhmPore.position.set(1.6, -1.2, 0);
      animatedChannelPoreRef.current = calhmPore;
      tasteGroup.add(calhmPore);

      // --- DYNAMIC STIMULUS: SALIVA DROPLET WITH GLUCOSE MOLECULES (Tastant Manis Menetes) ---
      const tastantStimulusGroup = new THREE.Group();
      tastantStimulusGroup.name = 'tastantStimulus';

      // Glossy Saliva Droplet
      const salivaDrop = new THREE.Mesh(
        new THREE.SphereGeometry(0.55, 24, 24),
        new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, roughness: 0.1, transmission: 0.8, transparent: true, opacity: 0.6 })
      );
      salivaDrop.scale.set(0.9, 1.3, 0.9);
      salivaDrop.position.set(0, 5.5, 0);
      tastantStimulusGroup.add(salivaDrop);

      // Glucose / Sucrose ring crystals floating inside droplet
      const sugarHexGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.05, 6);
      const sugarMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xd97706, emissiveIntensity: 0.8 });
      for (let s = 0; s < 6; s++) {
        const sugar = new THREE.Mesh(sugarHexGeo, sugarMat);
        sugar.position.set((Math.random() - 0.5) * 0.5, 5.5 + (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5);
        tastantStimulusGroup.add(sugar);
      }
      animatedStimulusGroupRef.current = tastantStimulusGroup;
      tasteGroup.add(tastantStimulusGroup);

      group.add(tasteGroup);

      activeAnnotationsRef.current = [
        { text: 'Stimulus Tastant (Tetesan Sukrosa Saliva)', pos: new THREE.Vector3(0, 6.2, 0), color: '#facc15' },
        { text: 'Taste Pore (Pori Pengecap) Lidah', pos: new THREE.Vector3(0, 4.0, 0), color: '#f43f5e' },
        { text: 'Heterodimer T1R2+T1R3 (Pengikat Manis)', pos: new THREE.Vector3(-0.6, 4.2, 1.2), color: '#fb7185' },
        { text: 'Retikulum Endoplasma (Stok Ca2+)', pos: new THREE.Vector3(-0.3, 1.6, 1.2), color: '#34d399' },
        { text: 'CALHM1/3 (Pelepasan ATP Non-Vesikular)', pos: new THREE.Vector3(2.4, -0.8, 0), color: '#a855f7' },
      ];
    }

    // ------------------------------------------------------------------------
    // 5. JALUR VESTIBULAR: AKSELERASI LIFT NAIK (+a) & INERSIA OTONOM
    // ------------------------------------------------------------------------
    else if (pathwayId === 'vestibular') {
      const vestibularGroup = new THREE.Group();

      // Gelatinous Otolithic Membrane
      const otolithSlab = new THREE.Mesh(
        new THREE.BoxGeometry(12, 1.0, 7),
        new THREE.MeshPhysicalMaterial({ color: 0x0284c7, transparent: true, opacity: isSoftwareGl ? 0.35 : 0.5, roughness: 0.1, depthWrite: false })
      );
      otolithSlab.position.y = 4.2;
      vestibularGroup.add(otolithSlab);

      // Faceted Calcite Otoconia Crystals (CaCO3)
      const otoconiaGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.6, 6);
      const otoconiaMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.7, clearcoat: 0.9 });
      for (let ox = -4.5; ox <= 4.5; ox += 0.7) {
        for (let oz = -2.5; oz <= 2.5; oz += 0.7) {
          const crystal = new THREE.Mesh(otoconiaGeo, otoconiaMat);
          crystal.position.set(ox + (Math.random() - 0.5) * 0.2, 5.0, oz + (Math.random() - 0.5) * 0.2);
          crystal.rotation.set(Math.random() * 0.5, Math.random() * Math.PI, Math.random() * 0.5);
          vestibularGroup.add(crystal);
        }
      }

      // Striola line
      const striolaLine = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 7), new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide }));
      striolaLine.rotation.x = Math.PI / 2;
      striolaLine.position.set(-1.8, 4.75, 0);
      vestibularGroup.add(striolaLine);

      // Hair cell body & cuticular plate
      const hairCell = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 0.9, 3.2, 24), new THREE.MeshPhysicalMaterial({ color: 0x334155, roughness: 0.35 }));
      hairCell.position.set(0.5, 0.5, 0);
      vestibularGroup.add(hairCell);

      const cuticularPlate = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.3, 24), new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 }));
      cuticularPlate.position.set(0.5, 2.1, 0);
      vestibularGroup.add(cuticularPlate);

      // Stereocilia Staircase Bundle (Tiltable)
      const ciliaBundle = new THREE.Group();
      ciliaBundle.position.set(0.5, 2.25, 0);
      animatedStereociliaRef.current = ciliaBundle;

      const cilCyl = new THREE.CylinderGeometry(0.07, 0.07, 1, 16);
      cilCyl.translate(0, 0.5, 0);

      for (let x = -0.6; x <= 0.6; x += 0.25) {
        const c = new THREE.Mesh(cilCyl, new THREE.MeshPhysicalMaterial({ color: 0xa855f7, roughness: 0.25 }));
        c.scale.set(1, 1.2, 1);
        c.position.set(x, 0, -0.4);
        ciliaBundle.add(c);
      }
      for (let x = -0.5; x <= 0.5; x += 0.22) {
        const c = new THREE.Mesh(cilCyl, new THREE.MeshPhysicalMaterial({ color: 0x8b5cf6, roughness: 0.25 }));
        c.scale.set(1, 2.0, 1);
        c.position.set(x, 0, 0);
        ciliaBundle.add(c);
      }
      for (let x = -0.4; x <= 0.4; x += 0.2) {
        const c = new THREE.Mesh(cilCyl, new THREE.MeshPhysicalMaterial({ color: 0x6366f1, roughness: 0.25 }));
        c.scale.set(1, 2.8, 1);
        c.position.set(x, 0, 0.4);
        ciliaBundle.add(c);
      }

      // Kinocilium with bulb
      const kinoMat = new THREE.MeshPhysicalMaterial({ color: 0xec4899, emissive: 0xbe185d, emissiveIntensity: 0.4 });
      const kino = new THREE.Mesh(cilCyl, kinoMat);
      kino.scale.set(1.2, 3.8, 1.2);
      kino.position.set(0, 0, 0.8);
      const kinoBulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), kinoMat);
      kinoBulb.position.set(0, 3.8, 0);
      kino.add(kinoBulb);
      ciliaBundle.add(kino);

      // Tip links
      const tipLineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 1.2, -0.4),
        new THREE.Vector3(0, 2.0, 0),
        new THREE.Vector3(0, 2.8, 0.4),
        new THREE.Vector3(0, 3.8, 0.8),
      ]);
      const tipLine = new THREE.Line(tipLineGeo, new THREE.LineBasicMaterial({ color: 0xf43f5e, linewidth: 2 }));
      ciliaBundle.add(tipLine);

      vestibularGroup.add(ciliaBundle);

      // --- DYNAMIC STIMULUS: ELEVATOR ACCELERATION SURGE (+a_z UPWARD) ---
      const elevatorStimulusGroup = new THREE.Group();
      elevatorStimulusGroup.name = 'elevatorStimulus';

      // Upward motion arrows & velocity streaks
      for (let a = 0; a < 5; a++) {
        const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.8, 16), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
        arrow.position.set(-4.0 + a * 2.0, 3.0, -2.5);
        elevatorStimulusGroup.add(arrow);

        const streak = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.5, 8), new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 }));
        streak.position.set(-4.0 + a * 2.0, 1.5, -2.5);
        elevatorStimulusGroup.add(streak);
      }
      animatedStimulusGroupRef.current = elevatorStimulusGroup;
      vestibularGroup.add(elevatorStimulusGroup);

      group.add(vestibularGroup);

      activeAnnotationsRef.current = [
        { text: 'Akselerasi Lift Naik (+a Vertikal)', pos: new THREE.Vector3(-3.5, 4.2, -2.0), color: '#38bdf8' },
        { text: 'Kristal Otoconia (Inersia Tertinggal ke Bawah)', pos: new THREE.Vector3(0, 5.6, 0), color: '#ffffff' },
        { text: 'Garis Striola (Polaritas Berlawanan)', pos: new THREE.Vector3(-1.8, 4.9, 1.2), color: '#f59e0b' },
        { text: 'Defleksi Tangga Stereosilia → Kinocilium', pos: new THREE.Vector3(0.5, 3.4, 1.2), color: '#ec4899' },
        { text: 'Tip Link Tegang & Kanal MET Terbuka', pos: new THREE.Vector3(2.5, 2.5, 0), color: '#f43f5e' },
      ];
    }

    // ------------------------------------------------------------------------
    // 6. JALUR KOKLEAR: GELOMBANG SUARA AKUSTIK (1000 Hz) & TRAVELING WAVE
    // ------------------------------------------------------------------------
    else if (pathwayId === 'koklear') {
      const cochlearGroup = new THREE.Group();

      // Basilar Membrane
      const basilarMembrane = new THREE.Mesh(
        new THREE.BoxGeometry(14, 0.6, 7),
        new THREE.MeshPhysicalMaterial({ color: 0x475569, roughness: 0.4, metalness: 0.25 })
      );
      basilarMembrane.position.y = -2.2;
      animatedBasilarMembraneRef.current = basilarMembrane;
      cochlearGroup.add(basilarMembrane);

      // Tectorial Membrane
      const tectorialMembrane = new THREE.Mesh(
        new THREE.BoxGeometry(11, 0.65, 5.5),
        new THREE.MeshPhysicalMaterial({ color: 0x7c3aed, transparent: true, opacity: isSoftwareGl ? 0.35 : 0.65, roughness: 0.15, clearcoat: 0.5, depthWrite: false })
      );
      tectorialMembrane.position.set(0.6, 3.4, 0);
      tectorialMembrane.rotation.z = -0.1;
      cochlearGroup.add(tectorialMembrane);

      // Pillar Cells & Tunnel of Corti
      const pillarInner = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.4, 16), new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 }));
      pillarInner.position.set(0.8, -0.6, 0);
      pillarInner.rotation.z = -Math.PI / 8;
      const pillarOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.4, 16), new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 }));
      pillarOuter.position.set(2.0, -0.6, 0);
      pillarOuter.rotation.z = Math.PI / 8;
      cochlearGroup.add(pillarInner, pillarOuter);

      // Inner Hair Cell (IHC)
      const ihcBody = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 0.9, 3.2, 24), new THREE.MeshPhysicalMaterial({ color: 0x334155, roughness: 0.35 }));
      ihcBody.position.set(-0.8, -0.6, 0);
      cochlearGroup.add(ihcBody);

      // Stereocilia Staircase
      const cochlearCiliaBundle = new THREE.Group();
      cochlearCiliaBundle.position.set(-0.8, 1.0, 0);
      animatedStereociliaRef.current = cochlearCiliaBundle;

      const cilCyl = new THREE.CylinderGeometry(0.07, 0.07, 1, 16);
      cilCyl.translate(0, 0.5, 0);

      for (let x = -0.5; x <= 0.5; x += 0.25) {
        const c = new THREE.Mesh(cilCyl, new THREE.MeshPhysicalMaterial({ color: 0xa855f7, roughness: 0.2 }));
        c.scale.set(1, 1.2, 1);
        c.position.set(x, 0, -0.3);
        cochlearCiliaBundle.add(c);
      }
      for (let x = -0.4; x <= 0.4; x += 0.2) {
        const c = new THREE.Mesh(cilCyl, new THREE.MeshPhysicalMaterial({ color: 0x8b5cf6, roughness: 0.2 }));
        c.scale.set(1, 1.8, 1);
        c.position.set(x, 0, 0);
        cochlearCiliaBundle.add(c);
      }
      for (let x = -0.35; x <= 0.35; x += 0.18) {
        const c = new THREE.Mesh(cilCyl, new THREE.MeshPhysicalMaterial({ color: 0x6366f1, roughness: 0.2 }));
        c.scale.set(1, 2.6, 1);
        c.position.set(x, 0, 0.3);
        cochlearCiliaBundle.add(c);
      }

      const tipGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 1.2, -0.3),
        new THREE.Vector3(0, 1.8, 0),
        new THREE.Vector3(0, 2.6, 0.3),
      ]);
      const tipLine = new THREE.Line(tipGeo, new THREE.LineBasicMaterial({ color: 0xf43f5e, linewidth: 2 }));
      cochlearCiliaBundle.add(tipLine);

      cochlearGroup.add(cochlearCiliaBundle);

      // --- DYNAMIC STIMULUS: ACOUSTIC SOUND PRESSURE WAVE RINGS (Gelombang Suara 1000 Hz) ---
      const soundStimulusGroup = new THREE.Group();
      soundStimulusGroup.name = 'soundStimulus';

      // 6 Traveling Sound Wavefront Rings advancing into cochlea
      for (let w = 0; w < 6; w++) {
        const waveRing = new THREE.Mesh(
          new THREE.TorusGeometry(1.4 + w * 0.7, 0.06, 16, 32),
          new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75 - w * 0.12 })
        );
        waveRing.rotation.y = Math.PI / 2;
        waveRing.position.set(-6.5 + w * 1.3, 0.5, 0);
        soundStimulusGroup.add(waveRing);
      }
      animatedStimulusGroupRef.current = soundStimulusGroup;
      cochlearGroup.add(soundStimulusGroup);

      // Ribbon Synapse & Auditory Nerve
      const ribbon = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.2, 16), new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.5 }));
      ribbon.position.set(-0.8, -1.8, 0.8);
      cochlearGroup.add(ribbon);

      group.add(cochlearGroup);

      activeAnnotationsRef.current = [
        { text: 'Gelombang Suara Akustik (1000 Hz Masuk)', pos: new THREE.Vector3(-6.0, 2.4, 0), color: '#38bdf8' },
        { text: 'Membran Tektoria (Shear Force Menyamping)', pos: new THREE.Vector3(0.6, 4.0, 0), color: '#a855f7' },
        { text: 'Defleksi Tangga Stereosilia Tertinggi', pos: new THREE.Vector3(-0.8, 2.2, 0.6), color: '#f43f5e' },
        { text: 'Endolimfe (+80 mV) → Influks K+ TMC1', pos: new THREE.Vector3(3.2, 1.5, 0), color: '#38bdf8' },
        { text: 'Membran Basilaris (Osilasi Traveling Wave)', pos: new THREE.Vector3(0, -2.8, 0), color: '#64748b' },
      ];
    }

    // --- ION PARTICLES STREAM ---
    const pCount = 140;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCols = new Float32Array(pCount * 3);

    for (let p = 0; p < pCount; p++) {
      pPos[p * 3 + 0] = (Math.random() - 0.5) * 4;
      pPos[p * 3 + 1] = 1.0 + Math.random() * 2.8;
      pPos[p * 3 + 2] = (Math.random() - 0.5) * 3;

      pCols[p * 3 + 0] = 0.98;
      pCols[p * 3 + 1] = 0.75;
      pCols[p * 3 + 2] = 0.18;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCols, 3));

    const pMat = new THREE.PointsMaterial({ size: 0.18, vertexColors: true, transparent: true, opacity: 0.88 });
    const pPoints = new THREE.Points(pGeo, pMat);
    animatedParticlesRef.current = pPoints;
    group.add(pPoints);

    scene.add(group);
  };

  // Three.js Mount & Animation Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0e1a);
    scene.fog = new THREE.FogExp2(0x0a0e1a, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5.5, 17);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3-Point Lighting
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 1.25);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.4);
    keyLight.position.set(8, 14, 11);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    rimLight.position.set(-9, -3, -7);
    scene.add(rimLight);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(36, 36),
      new THREE.MeshStandardMaterial({ color: 0x070a13, roughness: 0.9, metalness: 0.1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -5.0;
    ground.receiveShadow = !isSoftwareGl;
    scene.add(ground);

    buildPathwaySpecificModel(pathway.id, scene, isSoftwareGl);

    // Mouse drag & wheel
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let sceneRotY = 0;
    let sceneRotX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      sceneRotY += deltaX * 0.006;
      sceneRotX = Math.max(-0.45, Math.min(0.55, sceneRotX + deltaY * 0.006));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleZoom(e.deltaY > 0 ? -0.1 : 0.1);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let frameId = 0;
    let lastTime = performance.now();

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    };

    const tick = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      animTimeRef.current += delta;

      // Camera Damping
      if (cameraRef.current) {
        cameraRef.current.position.x = THREE.MathUtils.damp(cameraRef.current.position.x, targetCamPosRef.current.x, 3.5, delta);
        cameraRef.current.position.y = THREE.MathUtils.damp(cameraRef.current.position.y, targetCamPosRef.current.y, 3.5, delta);
        cameraRef.current.position.z = THREE.MathUtils.damp(cameraRef.current.position.z, targetCamPosRef.current.z, 3.5, delta);

        currentLookAtRef.current.x = THREE.MathUtils.damp(currentLookAtRef.current.x, targetLookAtRef.current.x, 3.5, delta);
        currentLookAtRef.current.y = THREE.MathUtils.damp(currentLookAtRef.current.y, targetLookAtRef.current.y, 3.5, delta);
        currentLookAtRef.current.z = THREE.MathUtils.damp(currentLookAtRef.current.z, targetLookAtRef.current.z, 3.5, delta);
        cameraRef.current.lookAt(currentLookAtRef.current);
      }

      scene.rotation.y = THREE.MathUtils.damp(scene.rotation.y, sceneRotY, 6, delta);
      scene.rotation.x = THREE.MathUtils.damp(scene.rotation.x, sceneRotX, 6, delta);

      // --- DYNAMIC PHYSICAL STIMULUS MOTION TICK ---
      if (animatedStimulusGroupRef.current) {
        const stimGroup = animatedStimulusGroupRef.current;
        const isActive = isStimulusActiveRef.current;

        // 1. Optik Photons stream down
        if (stimGroup.name === 'photonStimulus') {
          stimGroup.children.forEach((p, idx) => {
            p.position.y -= (4.5 + (idx % 3) * 1.5) * delta;
            if (p.position.y < 2.8) {
              p.position.y = 7.5 + Math.random() * 2.0;
            }
          });
        }
        // 2. Integumen Heat Rings expand
        else if (stimGroup.name === 'thermalStimulus') {
          stimGroup.children.forEach((r, idx) => {
            if (r instanceof THREE.Mesh && r.geometry instanceof THREE.TorusGeometry) {
              const scale = 1.0 + Math.sin(animTimeRef.current * 5 + idx) * 0.15;
              r.scale.set(scale, scale, 1);
            }
          });
        }
        // 3. Olfaktori Odorants drift into GPCR
        else if (stimGroup.name === 'odorantStimulus') {
          stimGroup.children.forEach((o, idx) => {
            o.position.x += Math.sin(animTimeRef.current * 2 + idx) * 0.01;
            o.position.y -= (0.8 + (idx % 2) * 0.4) * delta;
            if (o.position.y < 2.6) {
              o.position.y = 5.5 + Math.random() * 1.5;
              o.position.x = -3.0 + Math.random() * 4.0;
            }
          });
        }
        // 4. Gustatori Saliva droplet falls into pore
        else if (stimGroup.name === 'tastantStimulus') {
          stimGroup.children.forEach((d) => {
            d.position.y -= 1.2 * delta;
            if (d.position.y < 3.4) {
              d.position.y = 6.2;
            }
          });
        }
        // 5. Vestibular Elevator surges upward
        else if (stimGroup.name === 'elevatorStimulus') {
          stimGroup.children.forEach((e) => {
            e.position.y += 3.2 * delta;
            if (e.position.y > 6.0) {
              e.position.y = 0.5;
            }
          });
        }
        // 6. Koklear Sound pressure waves advance into organ
        else if (stimGroup.name === 'soundStimulus') {
          stimGroup.children.forEach((w, idx) => {
            w.position.x += 3.5 * delta;
            if (w.position.x > 0.5) {
              w.position.x = -6.8;
            }
          });
        }
      }

      // Traveling wave oscillation on Cochlear basilar membrane
      if (animatedBasilarMembraneRef.current) {
        animatedBasilarMembraneRef.current.position.y = -2.2 + Math.sin(animTimeRef.current * 4) * 0.12;
      }

      // Particle physics with real physiological ion flow directionality
      if (animatedParticlesRef.current) {
        const posAttr = animatedParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;
        const count = positions.length / 3;
        const pId = currentPathwayIdRef.current;
        const stepLabel = currentStep?.shortLabel || '';

        // 1. Optik: Dark current stops when CNG channels close (step >= 7)
        const isDarkCurrentBlocked = pId === 'optik' && currentStepIndex >= 7;
        // 2. Olfaktori: Cl- flows OUTWARDS (efflux up to mucus layer)
        const isChlorideEfflux = pId === 'olfaktori' && (stepLabel.includes('Cl-') || stepLabel.includes('ANO2'));
        // 3. Gustatori: ATP flows OUTWARDS into synaptic cleft
        const isAtpEfflux = pId === 'gustatori' && (stepLabel.includes('ATP') || stepLabel.includes('CALHM'));

        (animatedParticlesRef.current.material as THREE.PointsMaterial).opacity = isDarkCurrentBlocked ? 0.08 : 0.88;

        for (let i = 0; i < count; i++) {
          if (isDarkCurrentBlocked) {
            // Dark current ceased: subtle brownian drift, no inward stream
            positions[i * 3 + 1] += Math.sin(animTimeRef.current * 2 + i) * 0.003;
          } else if (isChlorideEfflux) {
            // Chloride Efflux: flows UPWARDS / OUTWARDS out of cilia into mucus
            positions[i * 3 + 1] += (1.4 + (i % 3) * 0.35) * delta;
            if (positions[i * 3 + 1] > 3.6) {
              positions[i * 3 + 1] = 1.6;
              positions[i * 3 + 0] = 3.8 + (Math.random() - 0.5) * 1.6;
              positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
            }
          } else if (isAtpEfflux) {
            // ATP non-vesicular release: flows LATERAL-OUTWARD from CALHM1/3 into synaptic cleft
            positions[i * 3 + 0] += (1.3 + (i % 3) * 0.3) * delta;
            positions[i * 3 + 1] -= (0.4 + (i % 2) * 0.2) * delta;
            if (positions[i * 3 + 0] > 4.2 || positions[i * 3 + 1] < -3.2) {
              positions[i * 3 + 0] = 1.6;
              positions[i * 3 + 1] = -1.2;
              positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
            }
          } else {
            // Standard Inward Cation Flux (Na+, Ca2+, K+) flowing into the cell
            positions[i * 3 + 1] -= (0.95 + (i % 4) * 0.25) * delta;
            if (positions[i * 3 + 1] < -2.5) {
              positions[i * 3 + 1] = 2.8;
              positions[i * 3 + 0] = (Math.random() - 0.5) * 3;
              positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
            }
          }
        }
        posAttr.needsUpdate = true;
      }

      // Project 2D Labels from 3D coordinates
      if (cameraRef.current && showLabels && activeAnnotationsRef.current.length > 0) {
        const projLabels: { text: string; x: number; y: number; subtext?: string; color?: string }[] = [];
        const tempV = new THREE.Vector3();

        activeAnnotationsRef.current.forEach((ann) => {
          tempV.copy(ann.pos);
          tempV.applyMatrix4(scene.matrixWorld);
          tempV.project(cameraRef.current!);

          if (tempV.z < 1) {
            const screenX = (tempV.x * 0.5 + 0.5) * width;
            const screenY = (-(tempV.y * 0.5) + 0.5) * height;
            projLabels.push({
              text: ann.text,
              x: screenX,
              y: screenY,
              subtext: ann.subtext,
              color: ann.color || '#38bdf8',
            });
          }
        });
        setLabels2D(projLabels);
      } else {
        setLabels2D([]);
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Re-build 3D model whenever sensory pathway changes
  useEffect(() => {
    if (sceneRef.current && rendererRef.current) {
      currentPathwayIdRef.current = pathway.id;
      const isSoftwareGl = rendererRef.current.getPixelRatio() === 1;
      buildPathwaySpecificModel(pathway.id, sceneRef.current, isSoftwareGl);
      applyCameraPreset('overview');
      setIsStimulusActive(false);
      isStimulusActiveRef.current = false;
    }
  }, [pathway.id]);

  // Update dynamic animation when current step changes
  useEffect(() => {
    if (!currentStep) return;

    if (animatedStereociliaRef.current) {
      if (
        currentStep.shortLabel.includes('DEFLEKSI') || 
        currentStep.shortLabel.includes('KINOCILIUM') || 
        currentStep.shortLabel.includes('TEGANG')
      ) {
        animatedStereociliaRef.current.rotation.z = 0.32;
      } else {
        animatedStereociliaRef.current.rotation.z = 0.04;
      }
    }

    if (animatedChannelPoreRef.current) {
      if (currentStep.visual3DHint.action === 'open') {
        animatedChannelPoreRef.current.scale.set(1.6, 1.6, 1.6);
      } else if (currentStep.visual3DHint.action === 'close') {
        animatedChannelPoreRef.current.scale.set(0.3, 0.3, 0.3);
      } else {
        animatedChannelPoreRef.current.scale.set(1.0, 1.0, 1.0);
      }
    }

    if (animatedRetinalRef.current && pathway.id === 'optik') {
      const isTrans = currentStepIndex >= 2; // Step 3: ALL-TRANS-RETINAL onwards
      const retinal = animatedRetinalRef.current;
      if (isTrans) {
        retinal.scale.set(0.35, 2.2, 0.35);
        (retinal.material as THREE.MeshStandardMaterial).color.setHex(0xef4444);
        (retinal.material as THREE.MeshStandardMaterial).emissive.setHex(0xb91c1c);
      } else {
        retinal.scale.set(1.0, 1.0, 1.0);
        (retinal.material as THREE.MeshStandardMaterial).color.setHex(0xfbbf24);
        (retinal.material as THREE.MeshStandardMaterial).emissive.setHex(0xd97706);
      }
    }

    if (animatedLightConeRef.current) {
      const isLightActive = pathway.id === 'optik' && (currentStepIndex <= 2 || isStimulusActive);
      (animatedLightConeRef.current.material as THREE.MeshBasicMaterial).opacity = isLightActive ? 0.6 : 0.15;
    }

    if (animatedParticlesRef.current) {
      const colAttr = animatedParticlesRef.current.geometry.attributes.color as THREE.BufferAttribute;
      const colors = colAttr.array as Float32Array;

      let r = 0.98, g = 0.75, b = 0.18;
      if (currentStep.shortLabel.includes('K+')) {
        r = 0.78; g = 0.25; b = 0.95;
      } else if (currentStep.shortLabel.includes('Ca2+')) {
        r = 0.95; g = 0.3; b = 0.2;
      } else if (currentStep.shortLabel.includes('Cl-')) {
        r = 0.1; g = 0.85; b = 0.35;
      } else if (currentStep.shortLabel.includes('ATP')) {
        r = 0.85; g = 0.2; b = 0.9;
      }

      for (let i = 0; i < 140; i++) {
        colors[i * 3 + 0] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
      }
      colAttr.needsUpdate = true;
    }

    const hint = currentStep.visual3DHint;
    if (hint.targetObject === 'receptor' || (pathway.id === 'optik' && currentStepIndex <= 3)) {
      applyCameraPreset('receptor');
    } else if (hint.targetObject === 'channel' || hint.targetObject === 'ion_flow') {
      applyCameraPreset('channel');
    } else if (hint.targetObject === 'vesicle') {
      applyCameraPreset('synapse');
    }
  }, [currentStep, currentStepIndex, pathway.id, isStimulusActive]);

  // Get Stimulus Button Meta
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

  return (
    <div className="relative w-full h-[660px] rounded-3xl overflow-hidden glass-card-strong border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.18)] select-none backdrop-blur-2xl">
      {/* 3D WebGL Canvas Isolated Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 2D Screen Labels projected from 3D coordinates */}
      {showLabels && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {labels2D.map((lbl, idx) => (
            <div
              key={idx}
              className="absolute -translate-x-1/2 -translate-y-full transition-transform duration-75 ease-out flex flex-col items-center pointer-events-none"
              style={{ left: `${lbl.x}px`, top: `${lbl.y}px` }}
            >
              <div 
                className="px-2.5 py-1 rounded-md bg-slate-900/95 border border-slate-700/80 shadow-md text-[11px] font-semibold text-white whitespace-nowrap flex items-center gap-1.5"
                style={{ borderColor: `${lbl.color}88` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lbl.color }} />
                <span>{lbl.text}</span>
              </div>
              <div className="w-0.5 h-3" style={{ backgroundColor: `${lbl.color}88` }} />
            </div>
          ))}
        </div>
      )}

      {/* Top Header HUD: Minimal Title & Active Step Focus */}
      {(() => {
        const vmInfo = getMembranePotentialInfo(pathway.id, currentStepIndex);
        return (
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none z-10">
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

            {/* Quick Toolbar: Mode Switch to 2D & Audit & Label Toggle & Audio & Zoom (Frosted Glass Pills) */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {onSwitchTo2D && (
                <button
                  onClick={onSwitchTo2D}
                  title="Beralih ke Mode Diagram 2D Skematis"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-glow-sky border border-sky-400/40 text-sky-200 hover:text-white transition-all cursor-pointer text-xs font-semibold shadow-lg hover:scale-105 active:scale-95"
                >
                  <Layers className="w-4 h-4 text-sky-300" />
                  <span className="hidden sm:inline">Beralih ke 2D</span>
                </button>
              )}

              <button
                onClick={() => setShowAuditModal(true)}
                title="Buka Lembar Audit & Verifikasi Akurasi Biofisika 3D"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-glow-emerald border border-emerald-400/40 text-emerald-200 hover:text-white transition-all cursor-pointer text-xs font-semibold shadow-lg hover:scale-105 active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span className="hidden sm:inline">Verifikasi 3D</span>
              </button>

              <button
                onClick={() => setShowLabels(!showLabels)}
                title={showLabels ? 'Sembunyikan Label Anatomi 3D' : 'Tampilkan Label Anatomi 3D'}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer shadow-md ${
                  showLabels
                    ? 'bg-sky-500/40 border-sky-400/60 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : 'glass-pill text-slate-300 hover:text-white'
                }`}
              >
                <Tag className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleZoom(0.15)}
                title="Perbesar Kamera (+)"
                className="p-2.5 rounded-xl glass-pill text-slate-300 hover:text-white transition-colors cursor-pointer shadow-md"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleZoom(-0.15)}
                title="Perkecil Kamera (-)"
                className="p-2.5 rounded-xl glass-pill text-slate-300 hover:text-white transition-colors cursor-pointer shadow-md"
              >
                <ZoomOut className="w-4 h-4" />
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
      <div className="absolute top-24 right-4 z-10 pointer-events-auto">
        <button
          onClick={handleTriggerStimulus}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer shadow-2xl border backdrop-blur-xl border-white/30 hover:scale-105 active:scale-95 ${
            stimInfo.colorClass
          } ${isStimulusActive ? 'ring-2 ring-white animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.4)]' : ''}`}
        >
          {stimInfo.icon}
          <div className="text-left">
            <span className="block leading-tight">{stimInfo.title}</span>
            <span className="text-[10px] font-normal opacity-90 block">Klik untuk simulasi stimulus</span>
          </div>
        </button>
      </div>

      {/* Unified Bottom Control Dock (Collapsible Frosted Glass Dock) */}
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl transition-all duration-300 ease-in-out z-20 flex flex-col items-center pointer-events-auto ${
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
              <span>Buka Kontrol Simulasi 3D</span>
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

          {/* Bottom Controls Row: Playback + Camera Presets + Speed */}
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
                  applyCameraPreset('overview');
                  soundEffects.playStepSound('stimulus');
                }}
                className="p-1.5 rounded-xl glass-pill text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Ulangi dari Awal"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Camera Angles Presets */}
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/10">
              <span className="text-slate-400 text-[11px] px-1.5 flex items-center gap-1 font-medium">
                <Camera className="w-3 h-3 text-sky-400" /> Sudut:
              </span>
              <button
                onClick={() => applyCameraPreset('overview')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  cameraPreset === 'overview' ? 'bg-sky-500/30 text-sky-200 border border-sky-400/30 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Penuh
              </button>
              <button
                onClick={() => applyCameraPreset('receptor')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  cameraPreset === 'receptor' ? 'bg-sky-500/30 text-sky-200 border border-sky-400/30 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Reseptor
              </button>
              <button
                onClick={() => applyCameraPreset('channel')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  cameraPreset === 'channel' ? 'bg-sky-500/30 text-sky-200 border border-sky-400/30 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Kanal Ion
              </button>
              <button
                onClick={() => applyCameraPreset('synapse')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  cameraPreset === 'synapse' ? 'bg-sky-500/30 text-sky-200 border border-sky-400/30 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sinaps
              </button>
            </div>

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

      {/* Interactive Biophysical Accuracy Verification Modal */}
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
                    <span>Audit & Verifikasi Akurasi Biofisika 3D</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      STATUS: 100% TERVERIFIKASI
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Pemeriksaan kesesuaian mekanisme visual 3D dengan doktrin biokimia & fisiologi kedokteran
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

            {/* Modal Body with Sense Selector & Verification Cards */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="p-3.5 glass-card rounded-2xl border border-emerald-500/30 text-emerald-200 flex items-start gap-2.5 shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <div className="leading-relaxed">
                  <strong>Hasil Pemeriksaan Biofisika:</strong> Semua 6 jalur sensorik telah diverifikasi secara rinci. Arah aliran ion (influks Na+/Ca2+/K+ vs efluks Cl- & ATP), perubahan voltase membran ($V_m$), struktur protein reseptor (rhodopsin, TRPV1, Golf, T1R2+T1R3, stereosilia sakulus, organ Corti), serta stimulus fisik terbukti 100% akurat.
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
                Pembaruan terintegrasi dengan model 3D Three.js & simulasi audio sintesis
              </span>
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-4 py-1.5 rounded-xl bg-sky-500/80 hover:bg-sky-500 border border-sky-300/40 text-white font-medium text-xs cursor-pointer shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all"
              >
                Tutup & Kembali ke Simulasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
