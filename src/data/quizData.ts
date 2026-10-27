export interface QuizQuestion {
  id: string;
  pathwayId: 'optik' | 'integumen' | 'olfaktori' | 'gustatori' | 'vestibular' | 'koklear' | 'komparatif';
  type: 'multiple-choice' | 'ordering' | 'clinical-case';
  title: string;
  question: string;
  options?: string[];
  correctOptionIndex?: number;
  // For ordering type questions:
  orderingItems?: { id: string; label: string }[];
  correctOrderIds?: string[];
  scientificExplanation: string;
  biochemicalKeyConcept: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tinggi';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. OPTIK
  {
    id: 'q-opt-1',
    pathwayId: 'optik',
    type: 'multiple-choice',
    title: 'Fototransduksi Retina: Efek Cahaya Terhadap Membran',
    question: 'Pada sel batang retina, apakah perubahan potensial membran dan pelepasan neurotransmitter yang terjadi ketika foton cahaya diserap?',
    options: [
      'Depolarisasi membran dan peningkatan pelepasan glutamat',
      'Depolarisasi membran dan penurunan pelepasan glutamat',
      'Hiperpolarisasi membran dan penurunan pelepasan neurotransmitter glutamat',
      'Hiperpolarisasi membran dan peningkatan pelepasan asetilkolin'
    ],
    correctOptionIndex: 2,
    scientificExplanation: 'Cahaya mengaktifkan rhodopsin → transdusin → PDE6 yang mengurai cGMP. Penurunan cGMP menutup kanal kation CNG (menghentikan "arus gelap" Na+/Ca2+), sehingga membran sel batang terhiperpolarisasi (dari -40 mV ke -70 mV) dan pelepasan neurotransmitter glutamat menurun.',
    biochemicalKeyConcept: 'Hiperpolarisasi fotoreseptor & penghentian arus gelap oleh degradasi cGMP',
    difficulty: 'Mudah'
  },
  {
    id: 'q-opt-2',
    pathwayId: 'optik',
    type: 'ordering',
    title: 'Urutkan Jalur Fototransduksi Retina',
    question: 'Susun urutan tahapan biokimia fototransduksi sel batang retina berikut ini dari awal stimulus hingga respons akhir:',
    orderingItems: [
      { id: 'step-a', label: 'Penyerapan foton & fotoisomerisasi 11-cis-retinal menjadi all-trans-retinal' },
      { id: 'step-b', label: 'Pembentukan Metarhodopsin II (fotopigmen aktif)' },
      { id: 'step-c', label: 'Aktivasi protein G transdusin (Gαt-GTP) dan peningkatan aktivitas fosfodiesterase (PDE6)' },
      { id: 'step-d', label: 'Penurunan kadar cGMP sitosol dan penutupan kanal kation CNG' },
      { id: 'step-e', label: 'Hiperpolarisasi membran fotoreseptor dan penurunan pelepasan glutamat' }
    ],
    correctOrderIds: ['step-a', 'step-b', 'step-c', 'step-d', 'step-e'],
    scientificExplanation: 'Urutan baku: Foton diserap → 11-cis-retinal mengalami fotoisomerisasi menjadi all-trans → terbentuk Metarhodopsin II → mengaktifkan Transdusin → Transdusin mengaktifkan PDE6 → cGMP terdegradasi menjadi 5\'-GMP → kanal CNG menutup → membran terhiperpolarisasi → sekresi glutamat di sinaps pita menurun.',
    biochemicalKeyConcept: 'Kaskade amplifikasi sinyal optik',
    difficulty: 'Sedang'
  },
  {
    id: 'q-opt-3',
    pathwayId: 'optik',
    type: 'clinical-case',
    title: 'Kasus Farmakologi: Efek Samping Obat Sildenafil pada Penglihatan',
    question: 'Seorang pasien mengeluhkan sensasi distorsi penglihatan bernuansa kebiruan (cyanopsia) setelah mengonsumsi sildenafil dosis tinggi. Berdasarkan mekanisme biokimia retina, apakah penyebab fenomena ini?',
    options: [
      'Sildenafil memblokir kanal TRPV pada kornea',
      'Inhibisi silang (cross-inhibition) oleh sildenafil terhadap enzim PDE6 retina yang mendegradasi cGMP',
      'Sildenafil menghambat pembentukan all-trans-retinal di sel epitel pigmen retina',
      'Sildenafil memicu influks klorida masif ke sel batang'
    ],
    correctOptionIndex: 1,
    scientificExplanation: 'Sildenafil terutama dirancang menghambat PDE5 vaskular, namun memiliki afinitas silang parsial terhadap enzim homolog PDE6 yang berada di sel fotoreseptor retina. Inhibisi parsial PDE6 mempertahankan kadar cGMP tetap tinggi pada sel kerucut biru (S-cones), menimbulkan persepsi penglihatan berwarna kebiruan sementara.',
    biochemicalKeyConcept: 'Selektivitas isoform enzim fosfodiesterase (PDE5 vs PDE6)',
    difficulty: 'Tinggi'
  },

  // 2. INTEGUMEN
  {
    id: 'q-int-1',
    pathwayId: 'integumen',
    type: 'multiple-choice',
    title: 'Termoreseptor Panas: Ion yang Berperan',
    question: 'Ketika kulit terpapar suhu ≥40°C, kanal TRPV membuka dan memfasilitasi masuknya ion utama apakah ke dalam ujung serabut saraf sensorik?',
    options: [
      'Influks Kalium (K+) dan efluks Natrium (Na+)',
      'Influks Klorida (Cl-) dan efluks Kalsium (Ca2+)',
      'Influks Natrium (Na+) dan Kalsium (Ca2+)',
      'Efluks proton (H+) dan influks Bikarbonat (HCO3-)'
    ],
    correctOptionIndex: 2,
    scientificExplanation: 'Kanal TRPV (seperti TRPV1/3/4) adalah kanal kation non-selektif dengan permeabilitas tinggi terhadap Na+ dan Ca2+. Ketika pori terbuka oleh panas, gradien elektrokimia mendorong Na+ dan Ca2+ mengalir deras masuk ke dalam sel (inward current), mendepolarisasi membran menuju potensial aksi.',
    biochemicalKeyConcept: 'Permeabilitas kanal TRPV kationik non-selektif',
    difficulty: 'Mudah'
  },
  {
    id: 'q-int-2',
    pathwayId: 'integumen',
    type: 'clinical-case',
    title: 'Mekanisme Molekuler Sensasi Pedas Kapsaisin',
    question: 'Mengapa memakan cabai yang mengandung kapsaisin menimbulkan sensasi rasa terbakar/panas yang serupa dengan menyentuh air mendidih?',
    options: [
      'Kapsaisin meningkatkan suhu fisik lidah sebesar 10°C secara eksotermis',
      'Kapsaisin berikatan langsung pada saku intraseluler kanal TRPV1, menurunkan ambang aktivasi termalnya sehingga terbuka pada suhu tubuh normal (37°C)',
      'Kapsaisin menghambat pelepasan asetilkolin di kelenjar ludah',
      'Kapsaisin memecah fosfolipid membran menjadi prostaglandin E2 secara spontan'
    ],
    correctOptionIndex: 1,
    scientificExplanation: 'Kapsaisin adalah agonis lipofilik eksogen yang mengikat saku asam amino hidrofobik di sisi intraseluler heliks S3-S4 kanal TRPV1. Pengikatan ini menurunkan ambang batas aktivasi termal TRPV1 dari >42°C menjadi di bawah suhu tubuh normal (~35°C), sehingga reseptor terpicu aktif dan otak menafsirkannya sebagai panas terbakar.',
    biochemicalKeyConcept: 'Modulasi alosterik ambang aktivasi suhu kanal TRPV1',
    difficulty: 'Sedang'
  },

  // 3. OLFAKTORI
  {
    id: 'q-olf-1',
    pathwayId: 'olfaktori',
    type: 'multiple-choice',
    title: 'Transduksi Penciuman: Peran Kanal Klorida ANO2',
    question: 'Pada silia reseptor olfaktori, mengapa pembukaan kanal Cl- yang diaktivasi Ca2+ (Anoctamin-2) menghasilkan DEPOLARISASI seluler, bukan hiperpolarisasi?',
    options: [
      'Kanal ANO2 sebenarnya mengalirkan kation Na+ masuk',
      'Konsentrasi Cl- intraseluler silia olfaktori dijaga sangat tinggi oleh transporter NKCC1, sehingga Cl- mengalir KELUAR sel membuang muatan negatif',
      'Ion Cl- bermuatan positif di lingkungan silia olfaktori',
      'Kanal ANO2 menukar Cl- dengan ion Kalsium ekstraseluler secara stoikiometrik'
    ],
    correctOptionIndex: 1,
    scientificExplanation: 'Silia olfaktori secara unik mengekspresikan kotransporter aktif NKCC1 yang memompa Cl- ke dalam silia hingga konsentrasinya mencapai ~40-50 mM (sangat tinggi dibandingkan neuron biasa ~5 mM). Potensial ekuilibrium klorida (E_Cl) menjadi sekitar -15 mV. Ketika Ca2+ membuka kanal ANO2, Cl- mengalir KELUAR sel, mengurangi muatan negatif sitosol dan mendepolarisasi membran secara masif (menyumbang ~80% arus depolarisasi olfaktori).',
    biochemicalKeyConcept: 'Gradien elektrokimia Cl- yang tidak lazim pada silia ORN',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-olf-2',
    pathwayId: 'olfaktori',
    type: 'ordering',
    title: 'Urutkan Kaskade Biokimia Olfaktori',
    question: 'Susun langkah-langkah pensinyalan second messenger pada silia sel reseptor olfaktori:',
    orderingItems: [
      { id: 'olf-a', label: 'Odorant mengikat Olfactory GPCR dan mengaktifkan protein Golf (Gα-GTP)' },
      { id: 'olf-b', label: 'Aktivasi Adenylyl Cyclase III mengonversi ATP menjadi cAMP' },
      { id: 'olf-c', label: 'cAMP membuka kanal kation CNG memicu influks Ca2+ dan Na+' },
      { id: 'olf-d', label: 'Peningkatan Ca2+ intraseluler membuka kanal klorida gerbang Ca2+ (ANO2)' },
      { id: 'olf-e', label: 'Efluks ion Cl- keluar sel mendepolarisasi membran dan memicu potensial aksi' }
    ],
    correctOrderIds: ['olf-a', 'olf-b', 'olf-c', 'olf-d', 'olf-e'],
    scientificExplanation: 'Kaskade olfaktori diawali oleh GPCR → Golf → Adenylyl Cyclase III → pembentukan cAMP → pembukaan kanal kation CNG → influks Ca2+ & Na+ → aktivasi kanal Cl- teraktivasi Ca2+ (Anoctamin 2) → efluks Cl- keluar → depolarisasi kuat & perambatan potensial aksi.',
    biochemicalKeyConcept: 'Pensinyalan ganda CNG dan kanal klorida teraktivasi Ca2+',
    difficulty: 'Sedang'
  },

  // 4. GUSTATORI
  {
    id: 'q-gus-1',
    pathwayId: 'gustatori',
    type: 'multiple-choice',
    title: 'Pengecap Manis: Neurotransmisi Non-Vesikular',
    question: 'Bagaimanakah sel reseptor rasa Tipe II (pengecap manis T1R2+T1R3) melepaskan molekul neurotransmitter ATP ke celah sinaps menuju serabut saraf aferen?',
    options: [
      'Fusi vesikel sinaptik bermuatan ATP melalui protein SNARE standar',
      'Melalui difusi pasif menembus lipid bilayer membran tanpa protein',
      'Pelepasan non-vesikular melalui hemichannel pori besar CALHM1/CALHM3 yang terbuka oleh depolarisasi dan Ca2+',
      'Melalui pompa ATPase penukar proton'
    ],
    correctOptionIndex: 2,
    scientificExplanation: 'Sel reseptor rasa Tipe II tidak memiliki vesikel sinaptik klasik dan aparatus fusi SNARE. Saat membran terdepolarisasi dan Ca2+ sitosol meningkat, hemichannel berpori besar CALHM1/3 terbuka lebar di membran basolateral, memungkinkan molekul ATP bebas sitosol mengalir keluar ke celah sinaptik menuruni gradien konsentrasinya, mengikat reseptor purinergik P2X2/P2X3 pada serabut aferen.',
    biochemicalKeyConcept: 'Neurotransmisi ATP non-vesikular via hemichannel CALHM1/3',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-gus-2',
    pathwayId: 'gustatori',
    type: 'ordering',
    title: 'Urutkan Transduksi Rasa Manis Sel Tipe II',
    question: 'Susun urutan jalur biokimia seluler rasa manis dari tastant hingga pengaktifan serabut saraf:',
    orderingItems: [
      { id: 'gus-a', label: 'Tastant manis berikatan dengan heterodimer GPCR T1R2 + T1R3' },
      { id: 'gus-b', label: 'Disosiasi subunit Gβγ mengaktifkan enzim Fosfolipase C beta 2 (PLCβ2)' },
      { id: 'gus-c', label: 'PLCβ2 memotong PIP2 menjadi IP3 dan DAG; IP3 memicu pelepasan Ca2+ dari Retikulum Endoplasma' },
      { id: 'gus-d', label: 'Peningkatan Ca2+ sitosolik membuka kanal kation TRPM5 memicu influks Na+ dan depolarisasi' },
      { id: 'gus-e', label: 'Pembukaan hemichannel CALHM1/3 melepas ATP ke celah sinaps mengaktivasi reseptor P2X2/P2X3' }
    ],
    correctOrderIds: ['gus-a', 'gus-b', 'gus-c', 'gus-d', 'gus-e'],
    scientificExplanation: 'Urutan lengkap: Tastant → T1R2+T1R3 → subunit Gβγ terlepas → aktivasi PLCβ2 → hidrolisis PIP2 menghasilkan IP3 → reseptor IP3 pada membran Retikulum Endoplasma terbuka → Ca2+ keluar ke sitosol → aktivasi kanal TRPM5 → influks Na+ → depolarisasi → pembukaan CALHM1/3 → efluks ATP → aktivasi P2X2/P2X3 serabut aferen.',
    biochemicalKeyConcept: 'Jalur fosfolipase C, pelepasan kalsium organel, dan kanal TRPM5',
    difficulty: 'Sedang'
  },

  // 5. VESTIBULAR
  {
    id: 'q-ves-1',
    pathwayId: 'vestibular',
    type: 'multiple-choice',
    title: 'Vestibular Sakulus: Respons Akselerasi Lift Naik',
    question: 'Ketika sebuah elevator/lift mulai bergerak naik dengan percepatan vertikal ke atas, apakah yang terjadi pada membran otolitik dan sel rambut sakulus?',
    options: [
      'Membran otolitik terangkat ke atas karena ditiup angin lift',
      'Inersia otoconia bermassa berat menggeser membran gelatinosa ke arah bawah, membengkokkan stereosilia sel rambut inferior striola ke arah kinocilium',
      'Kanal MET menutup permanen akibat penurunan tekanan atmosfer lift',
      'Sel rambut mengalami hiperpolarisasi masif akibat keluarnya ion kalium'
    ],
    correctOptionIndex: 1,
    scientificExplanation: 'Makula sakulus terletak pada orientasi vertikal. Saat lift melesat naik (akselerasi ke atas), inersia kristal kalsium karbonat otoconia yang bermassa jenis tinggi (~2.7 g/cm³) menahan gerakan sehingga membran otolit tertinggal ke arah bawah relatif terhadap epitel. Pada sel rambut inferior striola yang kinociliumnya menghadap ke atas, pergeseran ke bawah ini mendefleksikan stereosilia ke arah kinocilium, meregangkan tip-links dan membuka kanal MET.',
    biochemicalKeyConcept: 'Inersia massa otolitik dan polaritas morfologis striola sakulus',
    difficulty: 'Sedang'
  },
  {
    id: 'q-ves-2',
    pathwayId: 'vestibular',
    type: 'multiple-choice',
    title: 'Biokimia Endolimfe vs Perilimfe pada Sel Rambut',
    question: 'Apakah keunikan komposisi elektrolit cairan endolimfe yang membasahi berkas stereosilia sel rambut vestibular dan koklear?',
    options: [
      'Tinggi Na+ (~140 mM), rendah K+ (~5 mM), potensial 0 mV',
      'Tinggi K+ (~150 mM), rendah Na+ (~2 mM), dan berpotensial endolimfatik positif (+80 mV)',
      'Tinggi glukosa dan protein albumin, bebas ion kalium',
      'Sama persis dengan cairan serebrospinal bebas ion'
    ],
    correctOptionIndex: 1,
    scientificExplanation: 'Endolimfe adalah satu-satunya cairan ekstraseluler dalam tubuh manusia yang memiliki konsentrasi ion K+ sangat tinggi (~150 mM) dan potensial positif tinggi (+80 mV di skala media). Ini menciptakan gradien elektrokimia netto yang sangat masif (~140 mV) untuk mendorong ion K+ mengalir MASUK ke dalam sel rambut tanpa memerlukan energi metabolik lokal saat transduksi.',
    biochemicalKeyConcept: 'Potensial endolimfatik dan komposisi K+ tinggi',
    difficulty: 'Mudah'
  },

  // 6. KOKLEAR
  {
    id: 'q-kok-1',
    pathwayId: 'koklear',
    type: 'multiple-choice',
    title: 'Transduksi Koklea: Tegangan Tip-Link & Kanal MET',
    question: 'Berdasarkan deskripsi lengkap mekanisme koklea, bagaimanakah gerakan relatif membran basilaris dan membran tektoria membuka kanal mekanotransduksi (MET)?',
    options: [
      'Membran tektoria menekan sel rambut hingga hancur dan melepaskan ion',
      'Gerakan relatif kedua membran menghasilkan gaya geser (shear force) menyamping yang mendefleksikan stereosilia ke arah stereosilia tertinggi, meningkatkan tegangan tip-link dan membuka kanal MET',
      'Gelombang suara mengubah pH cairan perilimfe menjadi sangat asam',
      'Kanal MET terbuka karena pengikatan molekul neurotransmitter asetilkolin'
    ],
    correctOptionIndex: 1,
    scientificExplanation: 'Karena poros engsel membran basilaris dan membran tektoria berbeda, getaran vertikal traveling wave menghasilkan gaya geser menyamping (shear motion) antara kedua membran. Gaya ini membengkokkan stereosilia ke arah baris tertinggi, menegangkan filamen tip-link (CDH23/PCDH15) yang secara mekanis langsung menarik terbuka gerbang kanal MET (TMC1).',
    biochemicalKeyConcept: 'Gaya geser mekanik dan gerbang mekanik langsung kanal MET',
    difficulty: 'Sedang'
  },
  {
    id: 'q-kok-2',
    pathwayId: 'koklear',
    type: 'clinical-case',
    title: 'Ototoksisitas Antibiotik Aminoglikosida',
    question: 'Antibiotik aminoglikosida (seperti gentamisin atau kanamisin) dapat menyebabkan efek samping ketulian permanen (ototoksisitas). Bagaimana obat ini menembus dan merusak sel rambut koklea?',
    options: [
      'Menghambat fusi tulang stapes pada oval window',
      'Molekul polikationik aminoglikosida meresap langsung menembus pori kanal MET yang terbuka pada stereosilia, lalu terakumulasi di sitosol dan memicu apoptosis sel rambut',
      'Merusak membran timpani secara kimiawi dari luar',
      'Menghambat sintesis rhodopsin di sel ganglion spiralis'
    ],
    correctOptionIndex: 1,
    scientificExplanation: 'Aminoglikosida bermuatan polikationik dengan diameter molekul (~0.8-1 nm) yang sesuai dengan ukuran pori kanal MET sel rambut yang sedang terbuka saat merespons suara. Obat ini bertindak sebagai pemblokir permeabel: masuk ke sitosol sel rambut namun tidak dapat dipompa keluar, memicu stres oksidatif reaktif (ROS) dan apoptosis sel rambut dalam/luar secara permanen.',
    biochemicalKeyConcept: 'Permeasi toksik xenobiotik melalui pori kanal MET',
    difficulty: 'Tinggi'
  },
  {
    id: 'q-kok-3',
    pathwayId: 'koklear',
    type: 'ordering',
    title: 'Urutkan Jalur Konduksi Mekano-Elektrik Koklea',
    question: 'Susun urutan transmisi getaran suara hingga eksositosis neurotransmitter pada koklea:',
    orderingItems: [
      { id: 'kok-a', label: 'Gelombang suara menggetarkan membran timpani dan piston stapes di oval window' },
      { id: 'kok-b', label: 'Gelombang tekanan perilimfe menginduksi osilasi traveling wave pada membran basilaris' },
      { id: 'kok-c', label: 'Gerakan relatif membran tektoria menghasilkan gaya geser mendefleksikan stereosilia ke arah stereosilia tertinggi' },
      { id: 'kok-d', label: 'Tip link tegang membuka kanal MET memicu influks K+ dari endolimfe dan depolarisasi' },
      { id: 'kok-e', label: 'Pembukaan kanal Ca2+ gerbang voltase (VGCC) memicu eksositosis vesikel glutamat' }
    ],
    correctOrderIds: ['kok-a', 'kok-b', 'kok-c', 'kok-d', 'kok-e'],
    scientificExplanation: 'Urutan utuh koklea: Gelombang suara → Membran timpani & osikula stapes → Oval window → Gelombang cairan perilimfe → Osilasi membran basilaris → Gesekan membran tektoria → Defleksi ke arah stereosilia tertinggi → Tip link tegang → Kanal MET terbuka → K+ masuk → Depolarisasi → VGCC terbuka → Ca2+ masuk → Eksositosis vesikel glutamat.',
    biochemicalKeyConcept: 'Integrasi konduksi akustik, hidrodinamika, mekanobiologi, dan neurokimia',
    difficulty: 'Sedang'
  },

  // 7. PERTANYAAN KOMPARATIF SISTEM INDRA
  {
    id: 'q-comp-1',
    pathwayId: 'komparatif',
    type: 'multiple-choice',
    title: 'Analisis Komparatif: Sumber Ion Depolarisasi Awal',
    question: 'Dari keenam jalur indra yang dipelajari, manakah indra yang menggunakan ion K+ (bukan Na+) sebagai ion utama yang mengalir masuk untuk menghasilkan depolarisasi awal sel reseptor?',
    options: [
      'Jalur Optik dan Integumen',
      'Jalur Olfaktori dan Gustatori',
      'Jalur Vestibular dan Koklear',
      'Jalur Integumen dan Gustatori'
    ],
    correctOptionIndex: 2,
    scientificExplanation: 'Baik sel rambut vestibular (makula sakulus) maupun koklear (organ Corti) berada di bawah pengaruh cairan endolimfe yang kaya ion Kalium (K+ ~150 mM, +80 mV). Influks K+ inilah yang secara langsung mendepolarisasi sel rambut saat kanal MET terbuka. Sebaliknya, reseptor somatosensorik (TRPV) dan gustatori (TRPM5) menggunakan influks ion Natrium (Na+).',
    biochemicalKeyConcept: 'Dua paradigma ionik depolarisasi sensorik (K+ endolimfatik vs Na+ ekstraseluler)',
    difficulty: 'Sedang'
  },
  {
    id: 'q-comp-2',
    pathwayId: 'komparatif',
    type: 'multiple-choice',
    title: 'Sistem Second Messenger: Optik vs Olfaktori',
    question: 'Bandingkan peran nukleotida siklik pada jalur Optik dan Olfaktori. Pernyataan manakah yang paling tepat?',
    options: [
      'Optik menggunakan peningkatan cAMP, sedangkan Olfaktori menggunakan penurunan cGMP',
      'Optik melibatkan penurunan cGMP akibat degradasi oleh PDE6, sedangkan Olfaktori melibatkan peningkatan cAMP oleh Adenylyl Cyclase III',
      'Keduanya sama-sama bergantung pada penurunan cAMP intraseluler',
      'Optik tidak menggunakan protein G, sedangkan Olfaktori menggunakan protein G'
    ],
    correctOptionIndex: 1,
    scientificExplanation: 'Pada fototransduksi retina (Optik), stimulasi cahaya mengaktifkan PDE6 yang MENURUNKAN cGMP (menutup kanal CNG → hiperpolarisasi). Sebaliknya pada penciuman (Olfaktori), odoran mengaktifkan Adenylyl Cyclase III yang MENINGKATKAN cAMP (membuka kanal CNG → depolarisasi). Keduanya merupakan contoh klasik fleksibilitas regulasi kanal CNG oleh nukleotida siklik.',
    biochemicalKeyConcept: 'Regulasi diferensial siklik nukleotida (cGMP vs cAMP) pada reseptor sensorik',
    difficulty: 'Tinggi'
  }
];
