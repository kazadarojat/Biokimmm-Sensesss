export interface PathwayStep {
  id: string;
  shortLabel: string;
  fullName: string;
  cellularLocation: string;
  category: 'stimulus' | 'receptor' | 'g-protein' | 'enzyme' | 'second-messenger' | 'channel' | 'ion' | 'potential' | 'neurotransmitter' | 'stereocilia' | 'vesicle' | 'membrane';
  description: string;
  biochemicalDetails: string;
  ionOrMolecule?: string;
  membranePotentialChange?: string; // e.g. "-40 mV → -70 mV"
  visual3DHint: {
    targetObject: 'receptor' | 'channel' | 'ion_flow' | 'membrane' | 'vesicle' | 'stereocilia' | 'er';
    action: 'activate' | 'open' | 'close' | 'bend' | 'fuse' | 'flow' | 'hyperpolarize' | 'depolarize';
    color: string;
  };
}

export interface SensoryPathway {
  id: string;
  number: number;
  title: string;
  indonesianSense: string;
  sensoryType: 'Penglihatan' | 'Peraba & Suhu' | 'Penciuman' | 'Pengecap' | 'Keseimbangan' | 'Pendengaran';
  primaryOrgan: string;
  receptorCell: string;
  stimulusType: string;
  tagline: string;
  summary: string;
  steps: PathwayStep[];
  detailedDescriptions?: string[]; // Specifically for Koklear full description
  keyClinicalRelevance: string;
  uniqueBiochemicalMystery: {
    question: string;
    explanation: string;
  };
}

export const SENSORY_PATHWAYS: SensoryPathway[] = [
  {
    id: 'optik',
    number: 1,
    title: 'JALUR OPTIK',
    indonesianSense: 'Fototransduksi Retina (Sel Batang & Kerucut)',
    sensoryType: 'Penglihatan',
    primaryOrgan: 'Retina Mata (Segmen Luar Sel Batang / Rod)',
    receptorCell: 'Sel Batang (Rod Photoreceptor)',
    stimulusType: 'Foton Cahaya (Panjang gelombang ~500 nm)',
    tagline: 'CAHAYA → 11-CIS-RETINAL → ALL-TRANS-RETINAL → FOTOPIGMEN AKTIF → TRANSDUCIN ↑ → PDE ↑ → cGMP ↓ → KANAL KATION TERTUTUP → HIPERPOLARISASI → GLUTAMAT ↓',
    summary: 'Proses biokimia fototransduksi unik di mana rangsangan cahaya justru menyebabkan HIPERPOLARISASI membran dan PENURUNAN pelepasan neurotransmitter glutamat, berlawanan dengan reseptor sensorik lainnya.',
    keyClinicalRelevance: 'Defisiensi Vitamin A mengganggu sintesis 11-cis-retinal (Rabun Senja / Nyctalopia). Mutasi pada gen rhodopsin atau PDE6 memicu Retinitis Pigmentosa. Sildenafil (Viagra) dosis tinggi dapat menghambat PDE6 retina secara silang, menimbulkan efek pandangan kebiruan (cyanopsia).',
    uniqueBiochemicalMystery: {
      question: 'Mengapa fotoreseptor mengalami hiperpolarisasi saat terkena cahaya, bukan depolarisasi?',
      explanation: 'Dalam kondisi gelap, kanal kation CNG terbuka secara tonik oleh tingginya kadar cGMP (arus gelap / dark current: influks Na+ & Ca2+), menjaga potensial membran agak terdepolarisasi (~-40 mV) dengan sekresi glutamat terus-menerus. Cahaya memicu penguraian cGMP oleh enzim PDE, sehingga kanal CNG tertutup, influks kation berhenti, membran terhiperpolarisasi ke ~-70 mV, dan pelepasan glutamat menurun. Sinyal "cahaya" diterjemahkan sebagai berkurangnya hambatan pada sel bipolar ON.'
    },
    steps: [
      {
        id: 'opt-1',
        shortLabel: 'CAHAYA',
        fullName: 'Foton Cahaya Masuk ke Retina',
        cellularLocation: 'Diskus Membran Segmen Luar Sel Batang',
        category: 'stimulus',
        description: 'Foton gelombang elektromagnetik menembus lapisan neuron retina dan diserap oleh kromofor fotopigmen rhodopsin pada segmen luar sel fotoreseptor.',
        biochemicalDetails: 'Energi kuantum foton (hν) diserap spesifik oleh ikatan rangkap terkonjugasi kromofor retinal yang terikat via ikatan basa Schiff terprotonasi pada residu Lys296 opsin.',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#FACC15' }
      },
      {
        id: 'opt-2',
        shortLabel: '11-CIS-RETINAL',
        fullName: 'Kromofor 11-cis-retinal Terikat Opsin',
        cellularLocation: 'Saku Pengikatan Intramembran Rhodopsin',
        category: 'receptor',
        description: 'Bentuk isomer cis dari turunan vitamin A (retinaldehyde) yang terpasang erat di dalam kantung hidrofobik protein opsin 7-transmembran.',
        biochemicalDetails: 'Dalam keadaan gelap (inaktif), 11-cis-retinal bertindak sebagai agonis invers, menahan konformasi heliks transmembran opsin tetap dalam keadaan tertutup/stabil.',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#FB923C' }
      },
      {
        id: 'opt-3',
        shortLabel: 'ALL-TRANS-RETINAL',
        fullName: 'Fotoisomerisasi Menjadi All-trans-retinal',
        cellularLocation: 'Saku Pengikatan Intramembran Rhodopsin',
        category: 'receptor',
        description: 'Penyerapan foton menginduksi fotoisomerisasi ultracepat (<200 femtodetik) ikatan rangkap C11=C12 dari bentuk cis menjadi rantai lurus all-trans.',
        biochemicalDetails: 'Perubahan geometri molekul memaksa rantai retinal melurus, mendistorsi residu asam amino di sekitarnya dan memicu transisi termal intermediate (Batho → Lumi → Meta I → Meta II).',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#EF4444' }
      },
      {
        id: 'opt-4',
        shortLabel: 'FOTOPIGMEN AKTIF',
        fullName: 'Aktivasi Fotopigmen Metarhodopsin II (R*)',
        cellularLocation: 'Permukaan Sitoplasmik Membran Diskus',
        category: 'receptor',
        description: 'Pergeseran heliks TM5 dan TM6 membuka kantung pengikatan sitoplasmik, membentuk bentuk aktif Metarhodopsin II (R*).',
        biochemicalDetails: 'Metarhodopsin II mengekspos domain yang memiliki afinitas tinggi terhadap protein G heterotrimerik spesifik retina (Transdusin / Gt).',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#A855F7' }
      },
      {
        id: 'opt-5',
        shortLabel: 'TRANSDUCIN ↑',
        fullName: 'Aktivasi Protein G Transdusin (Gαt-GTP)',
        cellularLocation: 'Lembar Sitoplasmik Membran Diskus',
        category: 'g-protein',
        description: 'Metarhodopsin II mengkatalisis pertukaran GDP dengan GTP pada subunit Gαt, menyebabkan disosiasi subunit Gαt-GTP dari kompleks Gβγ.',
        biochemicalDetails: 'Satu molekul R* dapat mengaktivasi hingga ratusan molekul transdusin (tahap amplifikasi biokimia pertama yang sangat efisien).',
        ionOrMolecule: 'GTP',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#3B82F6' }
      },
      {
        id: 'opt-6',
        shortLabel: 'PDE ↑',
        fullName: 'Aktivasi Enzim cGMP Phosphodiesterase 6 (PDE6)',
        cellularLocation: 'Permukaan Membran Diskus',
        category: 'enzyme',
        description: 'Subunit Gαt-GTP berikatan dengan subunit inhibitorik gamma (PDEγ), melepaskan inhibisi dan mengaktifkan subunit katalitik alfa/beta PDE6.',
        biochemicalDetails: 'PDE6 teraktivasi menghidrolisis ikatan fosfodiester siklik pada cGMP menjadi 5\'-GMP secara sangat cepat (katalisis difusi terbatas, ~2000 cGMP/detik).',
        visual3DHint: { targetObject: 'channel', action: 'activate', color: '#06B6D4' }
      },
      {
        id: 'opt-7',
        shortLabel: 'cGMP ↓',
        fullName: 'Penurunan Konsentrasi cGMP Sitosolik',
        cellularLocation: 'Sitosol Segmen Luar Sel Batang',
        category: 'second-messenger',
        description: 'Konsentrasi cGMP bebas di sitoplasma anjlok drastis akibat degradasi cepat oleh PDE6.',
        biochemicalDetails: 'Molekul cGMP terdisosiasi dari situs pengikatan alosterik pada subunit kanal kation gerbang siklik nukleotida (CNG).',
        ionOrMolecule: 'cGMP → 5\'-GMP',
        visual3DHint: { targetObject: 'channel', action: 'flow', color: '#10B981' }
      },
      {
        id: 'opt-8',
        shortLabel: 'KANAL KATION TERTUTUP',
        fullName: 'Penutupan Kanal Kation CNG (cGMP-gated Channel)',
        cellularLocation: 'Membran Plasma Segmen Luar',
        category: 'channel',
        description: 'Tanpa ikatan cGMP, kanal CNG menutup porinya, memblokir masuknya ion Na+ dan Ca2+ (menghentikan "arus gelap").',
        biochemicalDetails: 'Sementara itu, penukar Na+/Ca2+-K+ (NCKX) terus memompa Ca2+ keluar, dan kanal K+ segmen dalam terus membuang K+, menciptakan defisit muatan positif.',
        ionOrMolecule: 'Na+ / Ca2+ blocked',
        visual3DHint: { targetObject: 'channel', action: 'close', color: '#E11D48' }
      },
      {
        id: 'opt-9',
        shortLabel: 'HIPERPOLARISASI',
        fullName: 'Hiperpolarisasi Potensial Membran',
        cellularLocation: 'Seluruh Membran Sel Fotoreseptor',
        category: 'potential',
        description: 'Potensial membran bergeser dari kondisi istirahat gelap (-40 mV) menjadi sangat negatif mendekati potensial ekuilibrium kalium (-70 mV).',
        biochemicalDetails: 'Perubahan tegangan membran ini merambat secara elektrotonik sepanjang badan sel menuju terminal sinaptik di lapisan pleksiformis luar.',
        membranePotentialChange: '-40 mV → -70 mV',
        visual3DHint: { targetObject: 'membrane', action: 'hyperpolarize', color: '#6366F1' }
      },
      {
        id: 'opt-10',
        shortLabel: 'GLUTAMAT ↓',
        fullName: 'Penurunan Pelepasan Neurotransmitter Glutamat',
        cellularLocation: 'Terminal Sinaptik (Ribbon Synapse)',
        category: 'neurotransmitter',
        description: 'Hiperpolarisasi menutup kanal Ca2+ gerbang voltase di terminal sinaps, menurunkan fusi vesikel dan sekresi glutamat.',
        biochemicalDetails: 'Penurunan kadar glutamat mendepolarisasi sel bipolar ON (via reseptor mGluR6) dan menghiperpolarisasi sel bipolar OFF (via reseptor ionotropik AMPA/kainat).',
        ionOrMolecule: 'L-Glutamat',
        visual3DHint: { targetObject: 'vesicle', action: 'fuse', color: '#8B5CF6' }
      }
    ]
  },
  {
    id: 'integumen',
    number: 2,
    title: 'JALUR INTEGUMEN',
    indonesianSense: 'Termoreseptor Panas (TRPV Kulit)',
    sensoryType: 'Peraba & Suhu',
    primaryOrgan: 'Epidermis & Dermis Kulit (Ujung Saraf Bebas)',
    receptorCell: 'Ujung Bebas Serabut Saraf C & Aδ',
    stimulusType: 'Suhu Panas (>40°C - 43°C) / Zat Capsaicin',
    tagline: 'STIMULUS 40° → TERMORESEPTOR → KANAL TRPV TERBUKA → Na+ MASUK + Ca2+ MASUK → DEPOLARISASI → POTENSIAL AKSI',
    summary: 'Mekanisme persepsi suhu termal hangat hingga panas berbahaya yang dimediasi oleh kanal ion gerbang suhu keluarga Transient Receptor Potential (TRPV1-TRPV4).',
    keyClinicalRelevance: 'TRPV1 juga diaktivasi oleh kapsaisin (kandungan cabai pedas) dan proton asam (pH < 5.9 pada peradangan jaringan). Pemberian patch kapsaisin dosis tinggi digunakan untuk desensitisasi analgesik pada nyeri neuropati perifer diabetikum dan neuralgia paska herpes.',
    uniqueBiochemicalMystery: {
      question: 'Bagaimana protein kanal TRPV dapat merasakan kenaikan suhu fisik 40°C?',
      explanation: 'Kanal TRPV1 memiliki domain termodinamika terlipat khusus (C-terminal TRP domain dan ankyrin repeats) yang mengalami transisi perubahan entalpi dan entropi tinggi saat suhu mencapai ambang kritis (~40-43°C). Panas merusak ikatan non-kovalen tertentu, memicu perubahan konformasi pori selektivitas dari tertutup menjadi terbuka lebar untuk kation divalen dan monovalen.'
    },
    steps: [
      {
        id: 'int-1',
        shortLabel: 'STIMULUS 40°',
        fullName: 'Stimulus Termal Suhu Hangat/Panas (≥40°C)',
        cellularLocation: 'Lapisan Kulit (Dermis & Epidermis)',
        category: 'stimulus',
        description: 'Peningkatan energi termal lokal kontak dengan kulit melewati ambang batas fisiologis termoreseptor hangat/panas.',
        biochemicalDetails: 'Peningkatan energi kinetik termal molekuler menginduksi ketegangan termal pada membran sel ujung saraf bebas sensorik primer.',
        visual3DHint: { targetObject: 'membrane', action: 'activate', color: '#F97316' }
      },
      {
        id: 'int-2',
        shortLabel: 'TERMORESEPTOR',
        fullName: 'Termoreseptor Sensorik Primer Serabut Aδ dan C',
        cellularLocation: 'Membran Ujung Bebas Saraf Sensorik Kulit',
        category: 'receptor',
        description: 'Ujung dendrit saraf sensorik tidak bermielin (C-fiber) atau bermielin tipis (A-delta) mengekspresikan reseptor membran termodinamik.',
        biochemicalDetails: 'Sensor termal diintegrasikan oleh protein tetramer kanal ion integral membran TRPV1/TRPV3/TRPV4.',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#EA580C' }
      },
      {
        id: 'int-3',
        shortLabel: 'KANAL TRPV TERBUKA',
        fullName: 'Pembukaan Pori Kanal Ion TRPV (TRPV1/3/4)',
        cellularLocation: 'Membran Plasma Terminal Ujung Saraf',
        category: 'channel',
        description: 'Perubahan konformasi termal menggeser heliks S5-S6, membuka gerbang pori selektivitas ionik kation.',
        biochemicalDetails: 'Kanal TRPV merupakan tetramer kation non-selektif dengan permeabilitas relatif Ca2+:Na+ sekitar 10:1 pada keadaan teraktivasi penuh.',
        visual3DHint: { targetObject: 'channel', action: 'open', color: '#DC2626' }
      },
      {
        id: 'int-4',
        shortLabel: 'Na+ MASUK + Ca2+ MASUK',
        fullName: 'Influks Masuknya Kation Natrium (Na+) dan Kalsium (Ca2+)',
        cellularLocation: 'Celah Pori Kanal TRPV ke Intraseluler',
        category: 'ion',
        description: 'Gradien konsentrasi ekstraseluler dan potensial listrik negatif mendorong ion Na+ dan Ca2+ mengalir deras masuk ke dalam sitosol.',
        biochemicalDetails: 'Konsentrasi Na+ ekstraseluler (~145 mM vs 12 mM sitosol) dan Ca2+ (~2 mM vs 100 nM sitosol) memicu arus influks kationik masif (inward current).',
        ionOrMolecule: 'Na+ & Ca2+ Influx',
        visual3DHint: { targetObject: 'ion_flow', action: 'flow', color: '#FBBF24' }
      },
      {
        id: 'int-5',
        shortLabel: 'DEPOLARISASI',
        fullName: 'Depolarisasi Membran (Potensial Reseptor Generator)',
        cellularLocation: 'Ujung Bebas Sensorik Lokal',
        category: 'potential',
        description: 'Akumulasi muatan positif kation intraseluler menetralkan elektronegativitas sitosol membran, mendepolarisasi membran dari -70 mV menuju ambang letup.',
        biochemicalDetails: 'Potensial generator bertingkat (graded generator potential) terbentuk sebanding dengan besarnya intensitas dan durasi paparan panas.',
        membranePotentialChange: '-70 mV → -50 mV (Threshold)',
        visual3DHint: { targetObject: 'membrane', action: 'depolarize', color: '#38BDF8' }
      },
      {
        id: 'int-6',
        shortLabel: 'POTENSIAL AKSI',
        fullName: 'Letupan Potensial Aksi Merambat ke SSP',
        cellularLocation: 'Segmen Awal Akson Saraf Perifer ke Medula Spinalis',
        category: 'potential',
        description: 'Mencapai ambang batas voltase membuka kanal Na+ gerbang voltase (Nav1.7/Nav1.8), membangkitkan potensial aksi bertaraf "all-or-none".',
        biochemicalDetails: 'Sinyal didepolarisasikan dan dipropagasi sepanjang serabut saraf menuju kornu dorsalis medula spinalis, diteruskan via traktus spinotalamikus ke korteks somatosensorik.',
        membranePotentialChange: '-50 mV → +30 mV',
        visual3DHint: { targetObject: 'membrane', action: 'depolarize', color: '#4F46E5' }
      }
    ]
  },
  {
    id: 'olfaktori',
    number: 3,
    title: 'JALUR OLFAKTORI',
    indonesianSense: 'Penciuman (Silia Sel Reseptor Olfaktori)',
    sensoryType: 'Penciuman',
    primaryOrgan: 'Epitel Olfaktori Rongga Hidung Atas',
    receptorCell: 'Sel Reseptor Olfaktori Bipolar (ORN)',
    stimulusType: 'Molekul Odoran (Zat Volatil Lipofilik/Aromatik)',
    tagline: 'ODORANT → OLFACTORY GPCR ACTIVE → PROTEIN G → SUBUNIT Gβγ → GDP → SUBUNIT G α-GTP ACTIVE → GTP → ADENYLYL CYCLASE III ACTIVE → ATP → cAMP ↑ → cAMP-GATED CHANNEL OPEN → Ca2+ MASUK → Na+ MASUK → Ca2+-ACTIVATED Cl- CHANNEL OPEN → Cl- KELUAR → DEPOLARIZATION → ACTION POTENTIAL',
    summary: 'Kaskade transduksi olfaktori merupakan salah satu sistem amplifikasi amplisi kation dan anion paling peka di alam, memanfaatkan kaskade cAMP dan pembukaan kanal klorida yang unik memompa Cl- keluar sel.',
    keyClinicalRelevance: 'Anosmia (kehilangan penciuman) sering terjadi pada infeksi pernapasan atas (seperti COVID-19 yang merusak sel sustentakular penopang epitel olfaktori), cedera trauma kepala dengan robeknya filia olfaktoria di lamina cribrosa, atau tahap awal penyakit Parkinson dan Alzheimer.',
    uniqueBiochemicalMystery: {
      question: 'Mengapa keluarnya ion Cl- justru mendepolarisasi membran silia olfaktori?',
      explanation: 'Pada kebanyakan neuron tubuh dewasa, Cl- intraseluler sangat rendah, sehingga membuka kanal Cl- menyebabkan Cl- masuk (hiperpolarisasi/IPSP). Namun, pada silia reseptor olfaktori terdapat kotransporter aktif NKCC1 yang secara terus-menerus memompa Cl- masuk ke sitosol, mempertahankan [Cl-] intraseluler sangat tinggi (~40-50 mM, dengan E_Cl sekitar -15 hingga -20 mV). Saat kanal Cl- (Anoctamin-2) terbuka oleh Ca2+, ion Cl- mengalir KELUAR menuruni gradien konsentrasinya, membuang muatan negatif dari sitosol sehingga mendepolarisasi membran secara kuat!'
    },
    steps: [
      {
        id: 'olf-1',
        shortLabel: 'ODORANT',
        fullName: 'Molekul Bau (Odorant) Masuk ke Mukosa Olfaktori',
        cellularLocation: 'Lapisan Mukus Epitel Olfaktori',
        category: 'stimulus',
        description: 'Zat volatil bau terlarut dalam lapisan lendir yang disekresikan oleh kelenjar Bowman, dibantu oleh Odorant-Binding Proteins (OBP).',
        biochemicalDetails: 'Molekul ligan odoran berdifusi dan berinteraksi dengan residu saku pengikatan variabel reseptor membran olfaktori.',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#10B981' }
      },
      {
        id: 'olf-2',
        shortLabel: 'OLFACTORY GPCR ACTIVE',
        fullName: 'Aktivasi Reseptor GPCR Olfaktori',
        cellularLocation: 'Membran Plasma Silia Olfaktori',
        category: 'receptor',
        description: 'Pengikatan odoran memicu rotasi dan pergeseran heliks transmembran reseptor terkopel protein G (spesies GPCR kelas A).',
        biochemicalDetails: 'Kompleks aktif memfasilitasi docking protein G heterotrimerik spesifik olfaktori (Golf).',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#059669' }
      },
      {
        id: 'olf-3',
        shortLabel: 'PROTEIN G (Golf)',
        fullName: 'Kompleks Protein G Heterotrimerik Golf (Gαolf-βγ)',
        cellularLocation: 'Sisi Sitosolik Membran Silia',
        category: 'g-protein',
        description: 'Protein G heterotrimerik pengkhusus sinyal penciuman yang terdiri dari subunit Gαolf, Gβ, dan Gγ dalam kondisi terikat GDP.',
        biochemicalDetails: 'Struktur molekul siap mengalami pergantian guanosin nukleotida saat berikatan dengan GPCR aktif.',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#0D9488' }
      },
      {
        id: 'olf-4',
        shortLabel: 'SUBUNIT Gβγ',
        fullName: 'Pelepasan Subunit Gβγ',
        cellularLocation: 'Sisi Sitosolik Membran Silia',
        category: 'g-protein',
        description: 'Kompleks dimer Gβγ berdisosiasi saat subunit alfa mengalami aktivasi konformasi.',
        biochemicalDetails: 'Subunit beta-gamma dapat memodulasi jalur transduksi pendukung dan desensitisasi GRK.',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#14B8A6' }
      },
      {
        id: 'olf-5',
        shortLabel: 'GDP',
        fullName: 'Pelepasan Guanosin Difosfat (GDP)',
        cellularLocation: 'Kantung Nukleotida Subunit Gαolf',
        category: 'g-protein',
        description: 'GPCR bertindak sebagai faktor pertukaran nukleotida guanin (GEF), mendestabilisasi kantung pengikatan GDP.',
        biochemicalDetails: 'GDP berdisosiasi meninggalkan saku pengikatan nukleotida terbuka untuk mengikat GTP.',
        ionOrMolecule: 'GDP Exit',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#64748B' }
      },
      {
        id: 'olf-6',
        shortLabel: 'SUBUNIT G α-GTP ACTIVE',
        fullName: 'Aktivasi Subunit Gαolf-GTP',
        cellularLocation: 'Permukaan Dalam Membran Silia',
        category: 'g-protein',
        description: 'GTP sitosolik berikatan erat pada subunit Gαolf, memicu penutupan switch-loops I, II, dan III ke bentuk aktif stabil.',
        biochemicalDetails: 'Gαolf-GTP melepaskan diri dari reseptor dan berdifusi lateral di sepanjang membran plasma silia.',
        ionOrMolecule: 'Gαolf-GTP',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#0284C7' }
      },
      {
        id: 'olf-7',
        shortLabel: 'GTP',
        fullName: 'Pengikatan Guanosin Trifosfat (GTP)',
        cellularLocation: 'Situs Pengikatan Gαolf',
        category: 'g-protein',
        description: 'GTP berlimpah dalam sitosol mengisi situs afinitas tinggi pada subunit Gαolf terstimulasi.',
        biochemicalDetails: 'Energi ikatan fosfoanhidrida memicu transduksi alosterik aktivasi.',
        ionOrMolecule: 'GTP Bind',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#2563EB' }
      },
      {
        id: 'olf-8',
        shortLabel: 'ADENYLYL CYCLASE III ACTIVE',
        fullName: 'Aktivasi Enzim Adenylyl Cyclase Tipe III (ACIII)',
        cellularLocation: 'Membran Integral Silia Olfaktori',
        category: 'enzyme',
        description: 'Gαolf-GTP mengikat domain katalitik Adenylyl Cyclase III, menstimulasi sintesis pembawa pesan kedua cAMP.',
        biochemicalDetails: 'ACIII secara spesifik melimpah di silia olfaktori dan memiliki laju perputaran enzimatik yang sangat tinggi.',
        visual3DHint: { targetObject: 'channel', action: 'activate', color: '#9333EA' }
      },
      {
        id: 'olf-9',
        shortLabel: 'ATP',
        fullName: 'Substrat Adenosin Trifosfat (ATP)',
        cellularLocation: 'Sitosol Silia Olfaktori',
        category: 'second-messenger',
        description: 'Molekul energi universal ATP dikonversi secara enzimatik oleh ACIII.',
        biochemicalDetails: 'Pemotongan pirofosfat (PPi) dari molekul ATP membentuk ikatan ester siklik ribosa 3\',5\'-monofosfat.',
        ionOrMolecule: 'ATP → cAMP + PPi',
        visual3DHint: { targetObject: 'channel', action: 'activate', color: '#C026D3' }
      },
      {
        id: 'olf-10',
        shortLabel: 'cAMP ↑',
        fullName: 'Peningkatan Drastis Kadar cAMP Sitosolik',
        cellularLocation: 'Sitosol Silia Olfaktori',
        category: 'second-messenger',
        description: 'Konsentrasi siklik AMP meningkat tajam dalam mikrodomain silia olfaktori yang sempit.',
        biochemicalDetails: 'cAMP bertindak sebagai pembawa pesan kedua intraseluler langsung yang mengaktifkan kanal ion CNG.',
        ionOrMolecule: 'cAMP',
        visual3DHint: { targetObject: 'channel', action: 'flow', color: '#DB2777' }
      },
      {
        id: 'olf-11',
        shortLabel: 'cAMP-GATED CHANNEL OPEN',
        fullName: 'Pembukaan Kanal CNG (Cyclic Nucleotide-Gated)',
        cellularLocation: 'Membran Plasma Silia',
        category: 'channel',
        description: 'Pengikatan molekul cAMP pada subunit CNGA2/CNGA4/CNGB1b membuka gerbang konduktansi kationik.',
        biochemicalDetails: 'Kanal CNG olfaktori memiliki permeabilitas tinggi terhadap ion kalsium dan natrium.',
        visual3DHint: { targetObject: 'channel', action: 'open', color: '#E11D48' }
      },
      {
        id: 'olf-12',
        shortLabel: 'Ca2+ MASUK',
        fullName: 'Influks Ion Kalsium (Ca2+)',
        cellularLocation: 'Pori Kanal CNG ke Sitosol Silia',
        category: 'ion',
        description: 'Ion Ca2+ ekstraseluler masuk mengalir deras melalui kanal CNG ke dalam volume silia yang sangat kecil.',
        biochemicalDetails: 'Masuknya Ca2+ meningkatkan kadar Ca2+ bebas lokal dari ~100 nM menjadi >10 μM.',
        ionOrMolecule: 'Ca2+ Inward',
        visual3DHint: { targetObject: 'ion_flow', action: 'flow', color: '#F59E0B' }
      },
      {
        id: 'olf-13',
        shortLabel: 'Na+ MASUK',
        fullName: 'Influks Ion Natrium (Na+)',
        cellularLocation: 'Pori Kanal CNG ke Sitosol Silia',
        category: 'ion',
        description: 'Ion Na+ turut masuk bersama Ca2+, memberikan kontribusi arus masuk kationik awal.',
        biochemicalDetails: 'Influks Na+ memberikan depolarisasi awal pada membran silia sel reseptor olfaktori.',
        ionOrMolecule: 'Na+ Inward',
        visual3DHint: { targetObject: 'ion_flow', action: 'flow', color: '#EAB308' }
      },
      {
        id: 'olf-14',
        shortLabel: 'Ca2+-ACTIVATED Cl- CHANNEL OPEN',
        fullName: 'Pembukaan Kanal Klorida Teraktivasi Ca2+ (Anoctamin-2 / ANO2)',
        cellularLocation: 'Membran Plasma Silia',
        category: 'channel',
        description: 'Lonjakan Ca2+ sitosolik langsung mengikat dan membuka kanal klorida gerbang kalsium (Anoctamin-2 / TMEM16B).',
        biochemicalDetails: 'Kanal ANO2 bertanggung jawab atas hingga 80-90% dari total arus depolarisasi pada neuron olfaktori.',
        visual3DHint: { targetObject: 'channel', action: 'open', color: '#16A34A' }
      },
      {
        id: 'olf-15',
        shortLabel: 'Cl- KELUAR',
        fullName: 'Efluks Ion Klorida (Cl-) Keluar Sel',
        cellularLocation: 'Sitosol Silia ke Cairan Mukus Ekstraseluler',
        category: 'ion',
        description: 'Karena [Cl-] intraseluler sangat tinggi (~40-50 mM), ion Cl- terdorong KELUAR sel menuruni gradien kimianya.',
        biochemicalDetails: 'Keluarnya ion bermuatan negatif (Cl-) setara dengan masuknya muatan positif ke dalam sitosol!',
        ionOrMolecule: 'Cl- Outward (Eflux)',
        visual3DHint: { targetObject: 'ion_flow', action: 'flow', color: '#22C55E' }
      },
      {
        id: 'olf-16',
        shortLabel: 'DEPOLARIZATION',
        fullName: 'Depolarisasi Membran Kuat',
        cellularLocation: 'Membran Dendrit dan Soma Sel Bipolar Olfaktori',
        category: 'potential',
        description: 'Kombinasi influks kation dan efluks anion klorida mendepolarisasi membran sel secara masif.',
        biochemicalDetails: 'Potensial membran bergeser dari -65 mV menuju nilai mendekati -20 mV.',
        membranePotentialChange: '-65 mV → -20 mV',
        visual3DHint: { targetObject: 'membrane', action: 'depolarize', color: '#06B6D4' }
      },
      {
        id: 'olf-17',
        shortLabel: 'ACTION POTENTIAL',
        fullName: 'Pembentukan Potensial Aksi Menuju Bulbus Olfaktorius',
        cellularLocation: 'Akson Sel Olfaktori menembus Lamina Cribrosa',
        category: 'potential',
        description: 'Potensial aksi menjalar melalui akson tidak bermielin (Nervus Olfaktorius / N. I) menuju glomerulus bulbus olfaktorius.',
        biochemicalDetails: 'Di glomerulus bulbus olfaktorius, akson bersinaps dengan sel mitral dan sel tufted untuk diproses lebih lanjut di korteks piriformis.',
        membranePotentialChange: '-50 mV → +30 mV',
        visual3DHint: { targetObject: 'membrane', action: 'depolarize', color: '#4F46E5' }
      }
    ]
  },
  {
    id: 'gustatori',
    number: 4,
    title: 'JALUR GUSTATORI',
    indonesianSense: 'Pengecap Manis (T1R2 + T1R3)',
    sensoryType: 'Pengecap',
    primaryOrgan: 'Lidah (Papila Sirkumvalata, Foliata, Fungiformis)',
    receptorCell: 'Sel Reseptor Rasa Tipe II (Kuncup Pengecap)',
    stimulusType: 'Tastant Manis (Gukosa, Sukrosa, Fruktosa, Sukralosa, Sakarin)',
    tagline: 'TASTANT → TYPE II TASTE RECEPTOR CELL ACTIVE → T1R2 + T1R3 → SUBUNIT Gβγ → GDP → SUBUNIT G α-GTP ACTIVE → GTP → PLCβ2 ACTIVE → PIP2 → IP3 + DAG → IP3 RECEPTOR → RETIKULUM ENDOPLASMA → Ca2+ KELUAR → TRPM5 MEMBUKA → Na+ MASUK → DEPOLARIZATION → CALHM1/3 TERBUKA → ATP → ATP KELUAR → SERABUT AFFEREN → P2X2 / P2X3',
    summary: 'Transduksi rasa manis di lidah melibatkan reseptor heterodimer GPCR T1R2+T1R3, kaskade pelepasan Ca2+ dari retikulum endoplasma oleh IP3, dan transmisi sinaps non-konvensional tanpa vesikel menggunakan kanal hemichannel CALHM1/3 yang melepaskan ATP.',
    keyClinicalRelevance: 'Ageusia atau hipogeusia (penurunan kepekaan rasa manis) dapat mempengaruhi nutrisi pada diabetes, sindrom metabolik, atau defisiensi seng (Zinc). Jalur ini juga mendeteksi pemanis buatan berkalori rendah (seperti sukralosa dan aspartam) yang mengikat situs allosterik T1R2/T1R3 dengan afinitas ratusan kali lipat dibanding gula alami.',
    uniqueBiochemicalMystery: {
      question: 'Bagaimana ATP bertindak sebagai neurotransmitter rasa tanpa melibatkan vesikel sinaptik?',
      explanation: 'Sel pengecap Tipe II adalah sel non-neuronal khusus yang TIDAK memiliki vesikel sinaptik klasik dan aparatus fusi SNARE vesikular standar. Sebagai gantinya, depolarisasi hebat dan lonjakan Ca2+ sitosolik membuka saluran pori heksamerik besar bernama CALHM1/CALHM3 (Calcium Homeostasis Modulator). Karena konsentrasi ATP intraseluler sangat tinggi (~5-10 mM), ATP keluar langsung menembus saluran CALHM terbuka ke celah sinaps, mengikat reseptor purinergik P2X2/P2X3 pada serabut saraf kranial sensorik!'
    },
    steps: [
      {
        id: 'gus-1',
        shortLabel: 'TASTANT',
        fullName: 'Molekul Tastant Manis (Gula / Sukrosa / Pemanis)',
        cellularLocation: 'Pori Pengecap (Taste Pore) Kuncup Pengecap Lidah',
        category: 'stimulus',
        description: 'Molekul karbohidrat sederhana atau pemanis sintetik larut dalam saliva dan masuk melalui pori pengecap lidah.',
        biochemicalDetails: 'Molekul tastant berinteraksi dengan domain Venus Flytrap ekstraseluler dari heterodimer reseptor rasa manis.',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#EC4899' }
      },
      {
        id: 'gus-2',
        shortLabel: 'TYPE II TASTE RECEPTOR CELL ACTIVE',
        fullName: 'Aktivasi Sel Reseptor Rasa Tipe II (Light Cell)',
        cellularLocation: 'Kuncup Pengecap Lidah',
        category: 'receptor',
        description: 'Sel epitel sensorik tipe II yang mengekspresikan aparatus pensinyalan GPCR dan kanal TRPM5 terstimulasi.',
        biochemicalDetails: 'Sel ini berbeda dari sel tipe III (pengecap asam) yang memiliki sinaps vesikular klasik ber-serotonin.',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#F43F5E' }
      },
      {
        id: 'gus-3',
        shortLabel: 'T1R2 + T1R3',
        fullName: 'Heterodimer Reseptor GPCR Manis (TAS1R2 + TAS1R3)',
        cellularLocation: 'Membran Mikrovili Apikal Sel Tipe II',
        category: 'receptor',
        description: 'Reseptor pasangan heterodimer T1R2 dan T1R3 yang memiliki kantung pengikatan luas untuk berbagai jenis pemanis.',
        biochemicalDetails: 'Gula alami mengikat domain Venus Flytrap, sedangkan beberapa pemanis buatan mengikat domain kaya sistein atau transmembran.',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#FB7185' }
      },
      {
        id: 'gus-4',
        shortLabel: 'SUBUNIT Gβγ',
        fullName: 'Disosiasi Subunit Gβγ (Gβ3/Gγ13)',
        cellularLocation: 'Sisi Intraseluler Membran Apikal',
        category: 'g-protein',
        description: 'Aktivasi reseptor memicu pelepasan dimer heterodimerik Gβ3/Gγ13 dari subunit alfa.',
        biochemicalDetails: 'Pada transduksi rasa manis dan umami, justru subunit dimer Gβγ inilah yang secara langsung mengaktivasi enzim efektor PLCβ2!',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#A855F7' }
      },
      {
        id: 'gus-5',
        shortLabel: 'GDP',
        fullName: 'Pelepasan Guanosin Difosfat (GDP)',
        cellularLocation: 'Situs Nukleotida Subunit Gα-Gustducin',
        category: 'g-protein',
        description: 'Pertukaran nukleotida pada protein G gustducin (Gαgust) membebaskan molekul GDP.',
        biochemicalDetails: 'Perubahan konformasi memfasilitasi docking molekul GTP sitosol.',
        ionOrMolecule: 'GDP',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#64748B' }
      },
      {
        id: 'gus-6',
        shortLabel: 'SUBUNIT G α-GTP ACTIVE',
        fullName: 'Aktivasi Subunit Gα-Gustducin-GTP',
        cellularLocation: 'Membran Sitosolik Sel Tipe II',
        category: 'g-protein',
        description: 'Subunit Gα-Gustducin aktif dalam bentuk terikat GTP.',
        biochemicalDetails: 'Gα-GTP juga dapat meregulasi fosfodiesterase intraseluler untuk modulasi umpan balik.',
        ionOrMolecule: 'Gα-GTP',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#8B5CF6' }
      },
      {
        id: 'gus-7',
        shortLabel: 'GTP',
        fullName: 'Pengikatan Guanosin Trifosfat (GTP)',
        cellularLocation: 'Situs Nukleotida Protein G',
        category: 'g-protein',
        description: 'Molekul GTP sitosol terikat pada subunit Gα untuk menstabilkan konformasi aktif.',
        biochemicalDetails: 'Hidrolisis intrinsik GTP nantinya akan mengakhiri siklus pensinyalan.',
        ionOrMolecule: 'GTP',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#6366F1' }
      },
      {
        id: 'gus-8',
        shortLabel: 'PLCβ2 ACTIVE',
        fullName: 'Aktivasi Enzim Fosfolipase C Beta 2 (PLCβ2)',
        cellularLocation: 'Permukaan Sitosolik Membran Plasma',
        category: 'enzyme',
        description: 'Dimer Gβγ menstimulasi enzim PLCβ2 untuk menghidrolisis lipid membran fosfatidilinositol 4,5-bisfosfat.',
        biochemicalDetails: 'PLCβ2 adalah efektor sentral transduksi rasa manis, pahit, dan umami pada sel tipe II.',
        visual3DHint: { targetObject: 'channel', action: 'activate', color: '#3B82F6' }
      },
      {
        id: 'gus-9',
        shortLabel: 'PIP2',
        fullName: 'Substrat Fosfatidilinositol 4,5-Bisfosfat (PIP2)',
        cellularLocation: 'Lembar Dalam Membran Lipid Bilayer',
        category: 'second-messenger',
        description: 'Fosfolipid membran PIP2 dibelah oleh PLCβ2 pada ikatan fosfodiester gliserol.',
        biochemicalDetails: 'Reaksi pemecahan menghasilkan dua pembawa pesan kedua krusial: IP3 (larut air) dan DAG (terikat membran).',
        ionOrMolecule: 'PIP2',
        visual3DHint: { targetObject: 'membrane', action: 'activate', color: '#0EA5E9' }
      },
      {
        id: 'gus-10',
        shortLabel: 'IP3 + DAG',
        fullName: 'Pembentukan Inositol 1,4,5-Trisfosfat (IP3) & Diasilgliserol (DAG)',
        cellularLocation: 'Sitosol & Membran Plasma',
        category: 'second-messenger',
        description: 'Molekul hidrofilik IP3 berdifusi bebas di sitoplasma menuju membran retikulum endoplasma.',
        biochemicalDetails: 'IP3 berfungsi sebagai ligan pengaktif kanal pelepasan kalsium intraseluler.',
        ionOrMolecule: 'IP3 + DAG',
        visual3DHint: { targetObject: 'er', action: 'activate', color: '#06B6D4' }
      },
      {
        id: 'gus-11',
        shortLabel: 'IP3 RECEPTOR (IP3R3)',
        fullName: 'Pengikatan Reseptor IP3 Tipe 3 (IP3R3)',
        cellularLocation: 'Membran Retikulum Endoplasma',
        category: 'receptor',
        description: 'IP3 mengikat kanal reseptor tetramerik IP3R3 pada retikulum endoplasma sel pengecap.',
        biochemicalDetails: 'Kanal ini merupakan kanal ion pelepasan Ca2+ gerbang ligan intraseluler.',
        visual3DHint: { targetObject: 'er', action: 'open', color: '#14B8A6' }
      },
      {
        id: 'gus-12',
        shortLabel: 'RETIKULUM ENDOPLASMA',
        fullName: 'Penyimpanan Kalsium Intraseluler Retikulum Endoplasma',
        cellularLocation: 'Organel Retikulum Endoplasma',
        category: 'receptor',
        description: 'Lumen retikulum endoplasma menyimpan ion kalsium dalam konsentrasi tinggi (~500 μM).',
        biochemicalDetails: 'Aktivasi IP3R3 memicu pembukaan gerbang pelepasan kalsium dari lumen RE ke sitosol.',
        visual3DHint: { targetObject: 'er', action: 'flow', color: '#10B981' }
      },
      {
        id: 'gus-13',
        shortLabel: 'Ca2+ KELUAR',
        fullName: 'Pelepasan Ion Ca2+ dari Lumen RE ke Sitosol',
        cellularLocation: 'Lumen RE ke Sitosol Sel Pengecap',
        category: 'ion',
        description: 'Ion Ca2+ membanjiri sitosol sel pengecap, meningkatkan konsentrasi kalsium mikrodomain lokal secara dramatis.',
        biochemicalDetails: 'Peningkatan Ca2+ sitosolik bertindak sebagai aktivator alosterik esensial bagi kanal ion membran TRPM5.',
        ionOrMolecule: 'Ca2+ Efflux to cytosol',
        visual3DHint: { targetObject: 'ion_flow', action: 'flow', color: '#F59E0B' }
      },
      {
        id: 'gus-14',
        shortLabel: 'TRPM5 MEMBUKA',
        fullName: 'Pembukaan Kanal Kation TRPM5 (Transient Receptor Potential M5)',
        cellularLocation: 'Membran Plasma Basolateral Sel Tipe II',
        category: 'channel',
        description: 'Kanal kation monovalen teraktivasi Ca2+ (TRPM5) membuka porinya saat mengikat Ca2+ sitosol.',
        biochemicalDetails: 'TRPM5 secara selektif hanya melewatkan kation monovalen (seperti Na+ dan K+), tetapi tidak melewatkan kalsium.',
        visual3DHint: { targetObject: 'channel', action: 'open', color: '#EAB308' }
      },
      {
        id: 'gus-15',
        shortLabel: 'Na+ MASUK',
        fullName: 'Influks Masuknya Ion Natrium (Na+)',
        cellularLocation: 'Pori Kanal TRPM5 ke Sitosol',
        category: 'ion',
        description: 'Ion Na+ ekstraseluler mengalir deras masuk menuruni gradien elektrokimia ke dalam sel.',
        biochemicalDetails: 'Arus masuk Na+ monovalen menghasilkan lonjakan arus masuk depolarisasi cepat.',
        ionOrMolecule: 'Na+ Inward',
        visual3DHint: { targetObject: 'ion_flow', action: 'flow', color: '#84CC16' }
      },
      {
        id: 'gus-16',
        shortLabel: 'DEPOLARIZATION',
        fullName: 'Depolarisasi Membran Sel Pengecap',
        cellularLocation: 'Seluruh Membran Sel Reseptor Rasa',
        category: 'potential',
        description: 'Potensial membran sel tipe II bergeser naik dari kondisi istirahat menuju nilai sangat positif.',
        biochemicalDetails: 'Depolarisasi yang disertai konsentrasi Ca2+ sitosol tinggi merupakan pemicu sinergis pembukaan hemichannel CALHM.',
        membranePotentialChange: '-70 mV → -20 mV',
        visual3DHint: { targetObject: 'membrane', action: 'depolarize', color: '#06B6D4' }
      },
      {
        id: 'gus-17',
        shortLabel: 'CALHM1/3 TERBUKA',
        fullName: 'Pembukaan Hemichannel Tegangan/Ca2+ CALHM1/CALHM3',
        cellularLocation: 'Membran Basolateral Sel Pengecap',
        category: 'channel',
        description: 'Saluran heksamerik berpori lebar CALHM1/3 terbuka lebar di membran basolateral saat ada depolarisasi dan Ca2+.',
        biochemicalDetails: 'Pori CALHM1/3 memiliki diameter internal besar (~1.4 nm), cukup lebar untuk dilewati molekul metabolit besar seperti ATP.',
        visual3DHint: { targetObject: 'channel', action: 'open', color: '#6366F1' }
      },
      {
        id: 'gus-18',
        shortLabel: 'ATP',
        fullName: 'Penyediaan Molekul ATP Sitosol sebagai Neurotransmitter',
        cellularLocation: 'Sitosol Sel Reseptor Rasa Tipe II',
        category: 'neurotransmitter',
        description: 'ATP sitosol berkonsentrasi tinggi (~5-10 mM) siap dilepaskan secara non-vesikular keluar membran.',
        biochemicalDetails: 'Berbeda dari neurotransmitter klasik yang dikemas dalam vesikel, ATP di sini bertindak sebagai transmisi neurotransmisi purinergik pori langsung.',
        ionOrMolecule: 'ATP',
        visual3DHint: { targetObject: 'vesicle', action: 'activate', color: '#A855F7' }
      },
      {
        id: 'gus-19',
        shortLabel: 'ATP KELUAR',
        fullName: 'Pelepasan Efluks ATP ke Celah Sinaptik',
        cellularLocation: 'Celah Sinaps Interstisial Basolateral',
        category: 'neurotransmitter',
        description: 'ATP mengalir deras keluar menuruni gradien konsentrasinya menembus pori CALHM1/3 ke celah antar-sel.',
        biochemicalDetails: 'Efluks ATP non-vesikular ini mencapai konsentrasi mikromolar di dekat ujung saraf sensorik lidah.',
        ionOrMolecule: 'ATP Efflux',
        visual3DHint: { targetObject: 'vesicle', action: 'flow', color: '#D946EF' }
      },
      {
        id: 'gus-20',
        shortLabel: 'SERABUT AFFEREN',
        fullName: 'Ujung Serabut Saraf Gustatori Aferen (N. VII / N. IX)',
        cellularLocation: 'Ujung Akson Sensorik Aferen Lidah',
        category: 'potential',
        description: 'Serabut saraf kranial sensorik (Nervus Fasialis VII untuk 2/3 anterior, N. Glosofaringeus IX untuk 1/3 posterior).',
        biochemicalDetails: 'Membran akson aferen dipenuhi oleh reseptor ionotropik purinergik pengikat ATP.',
        visual3DHint: { targetObject: 'membrane', action: 'activate', color: '#EC4899' }
      },
      {
        id: 'gus-21',
        shortLabel: 'P2X2 / P2X3',
        fullName: 'Aktivasi Reseptor Purinergik Kanal Ion P2X2 / P2X3',
        cellularLocation: 'Membran Serabut Saraf Aferen Gustatori',
        category: 'receptor',
        description: 'ATP mengikat reseptor kanal kation P2X2 dan P2X3 (heterotrimer), mendepolarisasi serabut saraf aferen dan memicu potensial aksi rasa manis ke nukleus traktus solitarius di batang otak.',
        biochemicalDetails: 'P2X2/P2X3 menghantarkan influks kationik masif ke serabut saraf aferen, meneruskan persepsi kenikmatan rasa manis ke otak.',
        membranePotentialChange: '-70 mV → +30 mV',
        visual3DHint: { targetObject: 'receptor', action: 'activate', color: '#F43F5E' }
      }
    ]
  },
  {
    id: 'vestibular',
    number: 5,
    title: 'JALUR VESTIBULAR',
    indonesianSense: 'Sakulus (Percepatan Vertikal / Lift Naik)',
    sensoryType: 'Keseimbangan',
    primaryOrgan: 'Aparatus Vestibular Telinga Dalam (Makula Sakulus)',
    receptorCell: 'Sel Rambut Vestibular (Hair Cell Inferior Striola)',
    stimulusType: 'Akselerasi Linear Vertikal ke Atas (Lift Bergerak Naik)',
    tagline: 'LIFT NAIK → STIMULASI SAKULUS → HAIR CELL INFERIOR DARI STRIOLA → DEFLEKSI STEREOCILIA → KINOCILIUM → TIP LINKS TEGANG → KANAL MET TERBUKA → K+ MASUK DARI ENDOLIMFE → DEPOLARISASI → VCGC TERBUKA → Ca2+ MASUK → VESIKEL GLUTAMAT → EKSOSITOSIS',
    summary: 'Aparatus vestibular makula sakulus mendeteksi gaya gravitasi dan percepatan vertikal (seperti saat lift melesat ke atas). Inersia kristal kalsium karbonat (otoconia) menggeser membran gelatinosa, meregangkan tip-links stereosilia sel rambut dan memicu influks K+ dari endolimfe yang unik berpotensial tinggi.',
    keyClinicalRelevance: 'Gangguan aparatus otolitik memicu Benign Paroxysmal Positional Vertigo (BPPV) ketika partikel otoconia terlepas masuk ke kanalis semisirkularis. Disfungsi sakular juga dialami pada mabuk perjalanan (motion sickness / kinetosis) akibat disosiasi informasi visual dan vestibular lift.',
    uniqueBiochemicalMystery: {
      question: 'Mengapa sel rambut menggunakan ion K+ (bukan Na+) untuk mendepolarisasi membran?',
      explanation: 'Endolimfe yang membasahi stereosilia sel rambut diproduksi oleh stria vascularis dan memiliki komposisi cairan yang sangat luar biasa: tinggi kalium (~150 mM K+, sangat mirip sitosol) dan memiliki potensial endolimfatik positif (+80 mV). Karena sitosol sel rambut berpotensial sekitar -60 mV, gradien listrik bersih yang mendorong K+ masuk adalah sangat besar: 140 mV! Penggunaan K+ untuk depolarisasi sangat hemat energi metabolisme (ATP) karena tidak memerlukan pompa Na+/K+-ATPase sel rambut bekerja keras memompa ion keluar pasca-letupan.'
    },
    steps: [
      {
        id: 'ves-1',
        shortLabel: 'LIFT NAIK',
        fullName: 'Percepatan Linear Vertikal ke Atas (Akselerasi Lift)',
        cellularLocation: 'Lingkungan Fisik / Tubuh Manusia',
        category: 'stimulus',
        description: 'Saat lift bergerak naik dengan percepatan vertikal (+a_z), tubuh dan kepala terdorong ke atas.',
        biochemicalDetails: 'Gaya inersia (F = -m·a) bekerja ke arah bawah berlawanan dengan arah percepatan lift.',
        visual3DHint: { targetObject: 'membrane', action: 'activate', color: '#0284C7' }
      },
      {
        id: 'ves-2',
        shortLabel: 'STIMULASI SAKULUS',
        fullName: 'Stimulasi Makula Sakulus Telinga Dalam',
        cellularLocation: 'Makula Vertikal Sakulus Telinga Dalam',
        category: 'receptor',
        description: 'Makula sakulus terletak pada bidang vertikal sagital, menjadikannya sensor utama percepatan vertikal dan gravitasi.',
        biochemicalDetails: 'Membran otolitik yang sarat dengan kristal kalsium karbonat berat (otoconia, densitas ~2.7 g/cm³) tertinggal ke arah bawah akibat inersia.',
        visual3DHint: { targetObject: 'stereocilia', action: 'activate', color: '#0369A1' }
      },
      {
        id: 'ves-3',
        shortLabel: 'HAIR CELL INFERIOR DARI STRIOLA',
        fullName: 'Eksitasi Sel Rambut Inferior dari Garis Striola',
        cellularLocation: 'Epitel Sensorik Sakulus (Zona Inferior Striola)',
        category: 'receptor',
        description: 'Pada sakulus, polaritas morfologis sel rambut berorientasi menjauhi striola. Pada sisi inferior striola, kinocilium berada di bagian atas.',
        biochemicalDetails: 'Pergeseran membran otolitik ke arah bawah menarik berkas stereosilia membengkok ke arah kinociliumnya, menghasilkan efek eksitasi selektif.',
        visual3DHint: { targetObject: 'stereocilia', action: 'bend', color: '#0284C7' }
      },
      {
        id: 'ves-4',
        shortLabel: 'DEFLEKSI STEREOCILIA',
        fullName: 'Defleksi Berkas Stereosilia',
        cellularLocation: 'Permukaan Apikal Sel Rambut',
        category: 'stereocilia',
        description: 'Berkas silia aktin kaku (stereosilia) membengkok secara serentak karena terhubung oleh tautan lateral.',
        biochemicalDetails: 'Defleksi sebesar beberapa nanometer sudah cukup untuk mengubah probabilitas pembukaan kanal mekanosensitif.',
        visual3DHint: { targetObject: 'stereocilia', action: 'bend', color: '#2563EB' }
      },
      {
        id: 'ves-5',
        shortLabel: 'KINOCILIUM',
        fullName: 'Pembengkokan ke Arah Silia Tertinggi (Kinocilium)',
        cellularLocation: 'Kutub Polar Berkas Stereosilia',
        category: 'stereocilia',
        description: 'Defleksi yang mengarah ke kinocilium (silia sejati bertubulin tertinggi) meregangkan jembatan tip-link.',
        biochemicalDetails: 'Arah defleksi ke kinocilium adalah vektor eksitasi depolarisasi; defleksi menjauhi kinocilium menutup kanal (hiperpolarisasi).',
        visual3DHint: { targetObject: 'stereocilia', action: 'bend', color: '#4F46E5' }
      },
      {
        id: 'ves-6',
        shortLabel: 'TIP LINKS TEGANG',
        fullName: 'Peregangan Filamen Molekuler Tip Links',
        cellularLocation: 'Ujung Puncak Stereosilia Berdekatan',
        category: 'channel',
        description: 'Filamen heliks tip-links yang tersusun dari dimer protocadherin-15 (PCDH15) dan cadherin-23 (CDH23) mengalami tegangan mekanik tinggi.',
        biochemicalDetails: 'Tegangan mekanik ini menarik langsung gerbang penutup kanal mekanotransduksi (MET).',
        visual3DHint: { targetObject: 'channel', action: 'open', color: '#7C3AED' }
      },
      {
        id: 'ves-7',
        shortLabel: 'KANAL MET TERBUKA',
        fullName: 'Pembukaan Kanal Transduksi Mekano-Elektrik (MET)',
        cellularLocation: 'Ujung Apikal Stereosilia (TMC1 / TMC2)',
        category: 'channel',
        description: 'Kompleks kanal ion TMC1/TMC2 (Transmembrane Channel-like) membuka pori konduktansi kationik.',
        biochemicalDetails: 'Waktu aktivasi kanal MET sangat cepat (<10 mikrodetik), membuktikan mekanisme gerbang mekanik langsung tanpa kaskade enzimatik lambat.',
        visual3DHint: { targetObject: 'channel', action: 'open', color: '#9333EA' }
      },
      {
        id: 'ves-8',
        shortLabel: 'K+ MASUK DARI ENDOLIMFE',
        fullName: 'Influks Masuknya Ion Kalium (K+) dari Endolimfe',
        cellularLocation: 'Cairan Endolimfe ke Sitosol Sel Rambut',
        category: 'ion',
        description: 'Ion K+ mengalir deras masuk dari endolimfe (kaya K+, +80 mV) ke dalam sitosol sel rambut (-60 mV).',
        biochemicalDetails: 'Gradien elektrokimia netto sebesar ~140 mV mendorong masuknya K+ dengan kecepatan tinggi.',
        ionOrMolecule: 'K+ Inward',
        visual3DHint: { targetObject: 'ion_flow', action: 'flow', color: '#C026D3' }
      },
      {
        id: 'ves-9',
        shortLabel: 'DEPOLARISASI',
        fullName: 'Depolarisasi Membran Sel Rambut Vestibular',
        cellularLocation: 'Seluruh Membran Badan Sel Rambut',
        category: 'potential',
        description: 'Masuknya muatan positif K+ mendepolarisasi membran sel dari potensial istirahat -60 mV menjadi -40 mV hingga -30 mV.',
        biochemicalDetails: 'Depolarisasi elektrotonik merambat turun menuju membran basolateral sel rambut.',
        membranePotentialChange: '-60 mV → -35 mV',
        visual3DHint: { targetObject: 'membrane', action: 'depolarize', color: '#DB2777' }
      },
      {
        id: 'ves-10',
        shortLabel: 'VCGC TERBUKA',
        fullName: 'Pembukaan Voltage-Gated Calcium Channels (VGCC Cav1.3)',
        cellularLocation: 'Membran Basolateral Sel Rambut',
        category: 'channel',
        description: 'Depolarisasi mengaktifkan kanal kalsium gerbang voltase tipe L (Cav1.3) yang sensitif pada ambang rendah.',
        biochemicalDetails: 'Pori kanal kalsium terbuka memungkinkan influks ion kalsium ekstraseluler perilimfe ke zona aktif sinaptik.',
        visual3DHint: { targetObject: 'channel', action: 'open', color: '#E11D48' }
      },
      {
        id: 'ves-11',
        shortLabel: 'Ca2+ MASUK',
        fullName: 'Influks Ion Kalsium (Ca2+) ke Zona Aktif',
        cellularLocation: 'Zona Aktif Sinaps Pita (Ribbon Synapse)',
        category: 'ion',
        description: 'Mikrodomain Ca2+ terbentuk di sekitar struktur pita sinaptik (synaptic ribbon).',
        biochemicalDetails: 'Ca2+ mengikat sensor fusi kalsium (otoferlin / otoferlin-like proteins) yang memicu perakitan kompleks SNARE fusi membran.',
        ionOrMolecule: 'Ca2+ Inward',
        visual3DHint: { targetObject: 'ion_flow', action: 'flow', color: '#F43F5E' }
      },
      {
        id: 'ves-12',
        shortLabel: 'VESIKEL GLUTAMAT',
        fullName: 'Pengerahan Vesikel Sinaptik Bermuatan Glutamat',
        cellularLocation: 'Struktur Pita Sinaps Presinaptik (Synaptic Ribbon)',
        category: 'vesicle',
        description: 'Ratusan vesikel berdiameter 30-40 nm yang sarat neurotransmitter L-glutamat tertambat pada organel pita sinaps presinaptik.',
        biochemicalDetails: 'Organel ribbon bertindak seperti ban berjalan (conveyor belt) untuk pasokan vesikel berkecepatan tinggi.',
        visual3DHint: { targetObject: 'vesicle', action: 'activate', color: '#FB7185' }
      },
      {
        id: 'ves-13',
        shortLabel: 'EKSOSITOSIS',
        fullName: 'Eksositosis Glutamat ke Serabut Saraf Vestibular (N. VIII)',
        cellularLocation: 'Celah Sinaps Sel Rambut ke Neuron Ganglion Scarpa',
        category: 'neurotransmitter',
        description: 'Fusi vesikel melepaskan glutamat ke celah sinaps, mengaktifkan reseptor AMPA pada ujung serabut saraf vestibularis, memicu peningkatan frekuensi potensial aksi ke nukleus vestibularis batang otak.',
        biochemicalDetails: 'Transmisi sinaptik tonik dan bertahap ini memungkinkan pelaporan posisi kepala dan percepatan gravitasi secara real-time dan berkelanjutan.',
        ionOrMolecule: 'L-Glutamat Release',
        visual3DHint: { targetObject: 'vesicle', action: 'fuse', color: '#FDA4AF' }
      }
    ]
  },
  {
    id: 'koklear',
    number: 6,
    title: 'JALUR KOKLEAR',
    indonesianSense: 'Pendengaran (Organ Corti Koklea)',
    sensoryType: 'Pendengaran',
    primaryOrgan: 'Koklea Telinga Dalam (Organ Corti)',
    receptorCell: 'Sel Rambut Dalam (Inner Hair Cell / IHC)',
    stimulusType: 'Gelombang Tekanan Suara Akustik (20 Hz - 20.000 Hz)',
    tagline: 'GELOMBANG SUARA → MEMBRAN TIMPANI → STAPES → OVAL WINDOW → PERILIMFE → ENDOLIMFE → BASILAR MEMBRANE → TECTORIAL MEMBRANE → DEFLEKSI STEREOCILIA → STEREOSILIA TERTINGGI → KINOCILIUM → TIP LINK TEGANG → KANAL MET TERBUKA → K+ MASUK → DEPOLARISASI → VGCC TERBUKA → Ca2+ MASUK → VESIKEL GLUTAMAT → EKSOSITOSIS',
    summary: 'Transduksi suara dari getaran udara mekanik menjadi gelombang fluida di skala koklea, osilasi resonansi membran basilaris, gaya geser stereosilia terhadap membran tektoria, hingga konversi mekano-elektrik ultracepat menjadi potensial aksi saraf auditori.',
    keyClinicalRelevance: 'Ototoksisitas obat antibiotik aminoglikosida (gentamisin, kanamisin) dan kemoterapi cisplatin masuk langsung melalui kanal MET terbuka dan terakumulasi di dalam sel rambut koklea, merusak mitokondria dan memicu kematian sel rambut permanen (ketulian sensorineural). Paparan bising ekstrem merusak dan memutus filamen tip-links.',
    uniqueBiochemicalMystery: {
      question: 'Bagaimana koklea membedakan nada tinggi (treble) dan nada rendah (bass)?',
      explanation: 'Organisasi tonotopik membran basilaris: Di dekat basis koklea (dekat oval window), membran basilaris sempit dan kaku (meresonansi frekuensi suara tinggi, ~20 kHz). Di dekat apeks (helikotrema), membran basilaris lebar dan fleksibel (meresonansi frekuensi suara rendah, ~20 Hz). Gelombang berjalan mencapai puncak amplitudo maksimal pada lokasi spesifik, mendefleksikan stereosilia sel rambut pada segmen nada tersebut.'
    },
    detailedDescriptions: [
      'MENGUBAH GETARAN MEKANIK MENJADI GELOMBANG TEKANAN DALAM CAIRAN KOKLEA: Gelombang akustik di udara digetarkan oleh membran timpani dan diamplifikasi oleh osikel pendengaran (malleus, incus, stapes). Basis stapes menekan oval window seperti piston hidrolik, mengubah getaran udara berimpedansi rendah menjadi gelombang tekanan fluida di dalam perilimfe skala vestibuli.',
      'PERILIMFE MENGHANTARKAN GELOMBANG TEKANAN DI DALAM KOKLEA DAN MENGINDUKSI GERAKAN MEMBRAN BASILARIS: Gelombang tekanan fluida merambat sepanjang skala vestibuli melintasi helikotrema dan skala timpani, mendesak membran basilaris bergerak berosilasi ke atas dan ke bawah membentuk gelombang berjalan (traveling wave).',
      'GERAKAN RELATIF KEDUA MEMBRAN MENGHASILKAN GAYA MEKANIK PADA STEREOSILIA: Membran basilaris dan membran tektoria berputar pada poros engsel yang berbeda. Saat membran basilaris berosilasi naik ke skala media, terjadi pergeseran lateral relatif (shear motion) yang menimbulkan gaya geser mekanik menyamping pada berkas stereosilia sel rambut.',
      'DEFLEKSI STEREOSILIA KE ARAH STEREOSILIA TERTINGGI MENINGKATKAN TEGANGAN TIP LINK DAN MEMBUKA KANAL MET: Berkas stereosilia tersusun bertingkat seperti anak tangga pipa organ. Gaya geser mendorong stereosilia pendek condong ke arah stereosilia tertinggi, meregangkan jembatan tip-link molekuler dan menarik terbuka gerbang kanal mekanotransduksi (MET / TMC1).',
      'GRADIEN ELEKTROKIMIA K+ MENDORONG K+ DARI ENDOLIMFE KE DALAM HAIR CELL: Cairan endolimfe skala media memiliki potensial endolimfatik positif (+80 mV) dan konsentrasi K+ sangat tinggi (~150 mM). Muatan intraseluler sel rambut yang negatif (-45 s/d -60 mV) menghasilkan gaya dorong gradien listrik bersih ~125-140 mV yang mendorong ion K+ masuk deras ke dalam hair cell.',
      'PERUBAHAN POTENSIAL MEMBRAN MEMBUKA VOLTAGE GATED Ca2+ CHANNEL SEHINGGA Ca2+ MENGALIR MASUK KE HAIR CELL: Influks K+ mendepolarisasi membran sel rambut, membuka kanal kalsium gerbang voltase Cav1.3 di membran basolateral. Ion Ca2+ mengalir masuk, mengikat otoferlin dan memicu fusi eksositosis vesikel glutamat ke serat saraf koklearis (N. VIII).'
    ],
    steps: [
      {
        id: 'kok-1',
        shortLabel: 'GELOMBANG SUARA',
        fullName: 'Gelombang Suara Akustik di Udara',
        cellularLocation: 'Saluran Telinga Luar (Meatus Akustikus Eksternus)',
        category: 'stimulus',
        description: 'Gelombang kompresi dan dekompresi molekul udara ditangkap oleh daun telinga dan diarahkan ke membran timpani.',
        biochemicalDetails: 'Energi mekanik akustik merambat dengan kecepatan ~343 m/s di udara.',
        visual3DHint: { targetObject: 'membrane', action: 'activate', color: '#38BDF8' }
      },
      {
        id: 'kok-2',
        shortLabel: 'MEMBRAN TIMPANI',
        fullName: 'Getaran Membran Timpani (Gendang Telinga)',
        cellularLocation: 'Batas Telinga Luar dan Telinga Tengah',
        category: 'receptor',
        description: 'Membran timpani elastis bergetar seirama dengan frekuensi dan amplitudo gelombang suara.',
        biochemicalDetails: 'Luas permukaan membran timpani (~55 mm²) yang jauh lebih besar dari basis stapes (~3.2 mm²) menyediakan pencocokan impedansi akustik (impedance matching).',
        visual3DHint: { targetObject: 'membrane', action: 'activate', color: '#0EA5E9' }
      },
      {
        id: 'kok-3',
        shortLabel: 'STAPES',
        fullName: 'Amplifikasi Gerak Tulang Pendengaran Stapes',
        cellularLocation: 'Rongga Telinga Tengah (Osikula Pendengaran)',
        category: 'receptor',
        description: 'Rangkaian tulang malleus, incus, dan stapes bekerja sebagai tuas mekanik untuk mengamplifikasi tekanan getaran suara.',
        biochemicalDetails: 'Basis stapes (footplate) bergerak maju-mundur seperti piston hidrolik.',
        visual3DHint: { targetObject: 'membrane', action: 'activate', color: '#0284C7' }
      },
      {
        id: 'kok-4',
        shortLabel: 'OVAL WINDOW',
        fullName: 'Transmisi Piston pada Tingkap Lonjong (Oval Window)',
        cellularLocation: 'Dinding Tulang Telinga Dalam (Pintu Skala Vestibuli)',
        category: 'channel',
        description: 'Piston stapes menekan membran fleksibel oval window, mentransmisikan getaran ke dalam cairan koklea.',
        biochemicalDetails: 'MENGUBAH GETARAN MEKANIK MENJADI GELOMBANG TEKANAN DALAM CAIRAN KOKLEA.',
        visual3DHint: { targetObject: 'membrane', action: 'activate', color: '#2563EB' }
      },
      {
        id: 'kok-5',
        shortLabel: 'PERILIMFE',
        fullName: 'Gelombang Tekanan Menjalar di Cairan Perilimfe',
        cellularLocation: 'Skala Vestibuli & Skala Timpani Koklea',
        category: 'ion',
        description: 'PERILIMFE MENGHANTARKAN GELOMBANG TEKANAN DI DALAM KOKLEA DAN MENGINDUKSI GERAKAN MEMBRAN BASILARIS.',
        biochemicalDetails: 'Perilimfe memiliki komposisi ion mirip cairan ekstraseluler umum (tinggi Na+ ~140 mM, rendah K+ ~5 mM, potensial ~0 mV).',
        ionOrMolecule: 'Perilymph Fluid Wave',
        visual3DHint: { targetObject: 'membrane', action: 'flow', color: '#1D4ED8' }
      },
      {
        id: 'kok-6',
        shortLabel: 'ENDOLIMFE',
        fullName: 'Kompartemen Cairan Endolimfe Skala Media (+80 mV)',
        cellularLocation: 'Duktus Koklearis (Skala Media)',
        category: 'ion',
        description: 'Cairan endolimfe memiliki lingkungan biokimia luar biasa: tinggi ion K+ (~150 mM) dan bermuatan positif +80 mV dipelihara oleh stria vascularis.',
        biochemicalDetails: 'Menyediakan baterai biologis utama bagi proses mekanotransduksi sel rambut koklea.',
        ionOrMolecule: 'Endolymph (High K+, +80 mV)',
        visual3DHint: { targetObject: 'membrane', action: 'flow', color: '#7C3AED' }
      },
      {
        id: 'kok-7',
        shortLabel: 'BASILAR MEMBRANE',
        fullName: 'Osilasi Gelombang Berjalan Membran Basilaris',
        cellularLocation: 'Lantai Organ Corti (Membran Basilaris)',
        category: 'membrane',
        description: 'Tekanan gelombang fluida menggerakkan membran basilaris berosilasi vertikal naik dan turun membentuk traveling wave.',
        biochemicalDetails: 'Gradien kekakuan dan lebar membran basilaris menentukan pemisahan frekuensi nada secara tonotopik.',
        visual3DHint: { targetObject: 'membrane', action: 'activate', color: '#9333EA' }
      },
      {
        id: 'kok-8',
        shortLabel: 'TECTORIAL MEMBRANE',
        fullName: 'Interaksi Relatif dengan Membran Tektoria',
        cellularLocation: 'Atap Gelatinosa Organ Corti',
        category: 'membrane',
        description: 'GERAKAN RELATIF KEDUA MEMBRAN MENGHASILKAN GAYA MEKANIK PADA STEREOSILIA.',
        biochemicalDetails: 'Membran basilaris dan tektoria memiliki sumbu engsel berbeda, sehingga gerakan vertikal diubah menjadi pergeseran horizontal (shear force).',
        visual3DHint: { targetObject: 'membrane', action: 'activate', color: '#A855F7' }
      },
      {
        id: 'kok-9',
        shortLabel: 'DEFLEKSI STEREOCILIA',
        fullName: 'Defleksi Berkas Stereosilia Sel Rambut',
        cellularLocation: 'Puncak Apikal Sel Rambut Dalam & Luar (IHC & OHC)',
        category: 'stereocilia',
        description: 'Gaya geser mekanik membengkokkan berkas silia kaku mikrofilamen aktin sel rambut.',
        biochemicalDetails: 'Pergeseran sekecil 0.3 nanometer sudah cukup menghasilkan arus transduksi yang terdeteksi.',
        visual3DHint: { targetObject: 'stereocilia', action: 'bend', color: '#C026D3' }
      },
      {
        id: 'kok-10',
        shortLabel: 'STEREOSILIA TERTINGGI',
        fullName: 'DEFLEKSI KE ARAH STEREOSILIA TERTINGGI',
        cellularLocation: 'Tangga Berkas Stereosilia',
        category: 'stereocilia',
        description: 'DEFLEKSI STEREOSILIA KE ARAH STEREOSILIA TERTINGGI MENINGKATKAN TEGANGAN TIP LINK DAN MEMBUKA KANAL MET.',
        biochemicalDetails: 'Susunan berundak 3 baris memastikan gaya regangan disalurkan optimal ke jembatan tip-links.',
        visual3DHint: { targetObject: 'stereocilia', action: 'bend', color: '#DB2777' }
      },
      {
        id: 'kok-11',
        shortLabel: 'KINOCILIUM',
        fullName: 'Orientasi Sumbu Polaritas Silia (Kinocilium)',
        cellularLocation: 'Tepi Luar Tangga Silia',
        category: 'stereocilia',
        description: 'Pada sel rambut koklea dewasa kinocilium telah beregresi menyisakan basal body, namun orientasi morfologis polaritas tetap dipertahankan.',
        biochemicalDetails: 'Arah defleksi menuju titik eks-kinocilium memaksimalkan konduktansi kanal ion.',
        visual3DHint: { targetObject: 'stereocilia', action: 'bend', color: '#E11D48' }
      },
      {
        id: 'kok-12',
        shortLabel: 'TIP LINK TEGANG',
        fullName: 'Tegangan Maksimal Filamen Tip Links',
        cellularLocation: 'Ujung Atas Stereosilia (CDH23 & PCDH15)',
        category: 'channel',
        description: 'Filamen protein jembatan tip-link meregang tegang seperti pegas molekuler elastis.',
        biochemicalDetails: 'Tegangan mekanik menarik komponen gerbang kanal ion TMC1 secara langsung tanpa perantara sitoplasma.',
        visual3DHint: { targetObject: 'channel', action: 'open', color: '#EA580C' }
      },
      {
        id: 'kok-13',
        shortLabel: 'KANAL MET TERBUKA',
        fullName: 'Pembukaan Kanal Transduksi Mekano-Elektrik (TMC1)',
        cellularLocation: 'Ujung Apikal Stereosilia Baris Bawah/Tengah',
        category: 'channel',
        description: 'Pori kanal MET terbuka lebar dengan konduktansi tinggi (~100-300 pS).',
        biochemicalDetails: 'Kanal melewatkan ion kation monovalen dan divalen dengan kinetika sub-milidetik tercepat dalam biologi indra.',
        visual3DHint: { targetObject: 'channel', action: 'open', color: '#F97316' }
      },
      {
        id: 'kok-14',
        shortLabel: 'K+ MASUK',
        fullName: 'Influks Masuknya Ion Kalium (K+) dari Endolimfe',
        cellularLocation: 'Endolimfe ke Sitosol Sel Rambut Dalam',
        category: 'ion',
        description: 'GRADIEN ELEKTROKIMIA K+ MENDORONG K+ DARI ENDOLIMFE KE DALAM HAIR CELL.',
        biochemicalDetails: 'Gaya gerak listrik (electromotive force) sebesar +80 mV - (-45 mV) = 125 mV mendorong ion K+ masuk deras.',
        ionOrMolecule: 'K+ Influx',
        visual3DHint: { targetObject: 'ion_flow', action: 'flow', color: '#F59E0B' }
      },
      {
        id: 'kok-15',
        shortLabel: 'DEPOLARISASI',
        fullName: 'Depolarisasi Membran Sel Rambut Dalam (IHC)',
        cellularLocation: 'Badan Sel Rambut Dalam (IHC)',
        category: 'potential',
        description: 'Potensial membran sel rambut bergeser naik secara cepat dari -45 mV menuju -25 mV.',
        biochemicalDetails: 'Depolarisasi berosilasi sinkron mengikuti frekuensi gelombang suara (phase-locking hingga ~3-4 kHz).',
        membranePotentialChange: '-45 mV → -25 mV',
        visual3DHint: { targetObject: 'membrane', action: 'depolarize', color: '#06B6D4' }
      },
      {
        id: 'kok-16',
        shortLabel: 'VGCC TERBUKA',
        fullName: 'PERUBAHAN POTENSIAL MEMBRAN MEMBUKA VOLTAGE GATED Ca2+ CHANNEL',
        cellularLocation: 'Membran Basolateral di Zona Ribbon Sinaps',
        category: 'channel',
        description: 'Kanal kalsium gerbang voltase Cav1.3 terbuka merespons depolarisasi membran sel rambut.',
        biochemicalDetails: 'SEHINGGA Ca2+ MENGALIR MASUK KE HAIR CELL.',
        visual3DHint: { targetObject: 'channel', action: 'open', color: '#EF4444' }
      },
      {
        id: 'kok-17',
        shortLabel: 'Ca2+ MASUK',
        fullName: 'Influks Kalsium ke Presinaptik',
        cellularLocation: 'Zona Sinaps Pita Sel Rambut Dalam',
        category: 'ion',
        description: 'Ion Ca2+ masuk dari perilimfe sekitarnya ke dalam sitoplasma basolateral, memicu fusi membran.',
        biochemicalDetails: 'Kalsium berikatan dengan protein fusi khusus otoferlin pada membran vesikel ribbon.',
        ionOrMolecule: 'Ca2+ Influx',
        visual3DHint: { targetObject: 'ion_flow', action: 'flow', color: '#DC2626' }
      },
      {
        id: 'kok-18',
        shortLabel: 'VESIKEL GLUTAMAT',
        fullName: 'Pengerahan Vesikel Neurotransmitter Glutamat',
        cellularLocation: 'Pita Sinaps (Ribbon Synapse) Sel Rambut Dalam',
        category: 'vesicle',
        description: 'Vesikel sinaptik berderet padat di organel ribbon, siap melakukan fusi multivesikular terkoordinasi.',
        biochemicalDetails: 'Mendukung laju letupan pelepasan neurotransmitter berkecepatan tinggi tanpa kehabisan vesikel (kelelahan sinaps).',
        visual3DHint: { targetObject: 'vesicle', action: 'activate', color: '#FB7185' }
      },
      {
        id: 'kok-19',
        shortLabel: 'EKSOSITOSIS',
        fullName: 'Eksositosis Glutamat ke Serabut Saraf Koklearis',
        cellularLocation: 'Celah Sinaps ke Terminal Neuron Ganglion Spiralis',
        category: 'neurotransmitter',
        description: 'Molekul L-glutamat dilepaskan ke celah sinaps, mengikat reseptor AMPA pada ujung serabut saraf auditorius (Nervus Koklearis / N. VIII), memicu potensial aksi menuju nukleus koklearis batang otak dan korteks pendengaran temporal.',
        biochemicalDetails: 'Setiap sel rambut dalam bersinaps dengan ~10-20 serabut saraf aferen tipe I, mentransmisikan informasi frekuensi, intensitas, dan waktu kedatangan suara.',
        ionOrMolecule: 'Glutamat Release',
        visual3DHint: { targetObject: 'vesicle', action: 'fuse', color: '#FDA4AF' }
      }
    ]
  }
];
