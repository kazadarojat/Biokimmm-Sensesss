import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';
import { SENSORY_PATHWAYS } from '../data/pathwayData';
import { soundEffects } from '../audio/soundEffects';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  ListOrdered, 
  Check, 
  ChevronRight,
  TrendingUp,
  Brain,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const QuizPlatform: React.FC = () => {
  const [filterPathway, setFilterPathway] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [orderedItems, setOrderedItems] = useState<{ id: string; label: string }[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, { isCorrect: boolean; userSelection: any }>>({});
  const [showSummary, setShowSummary] = useState<boolean>(false);

  // Filtered question set
  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    if (filterPathway === 'all') return true;
    return q.pathwayId === filterPathway;
  });

  const currentQ: QuizQuestion | undefined = filteredQuestions[currentIndex];

  // Initialize ordering items when question changes
  React.useEffect(() => {
    if (currentQ && currentQ.type === 'ordering' && currentQ.orderingItems) {
      // Shuffle ordering items initially so user has to order them
      const shuffled = [...currentQ.orderingItems].sort(() => Math.random() - 0.5);
      setOrderedItems(shuffled);
    }
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  }, [currentIndex, filterPathway]);

  // Handle reorder movement
  const moveOrderItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= orderedItems.length) return;
    const updated = [...orderedItems];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setOrderedItems(updated);
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (!currentQ || isAnswerSubmitted) return;

    let isCorrect = false;

    if (currentQ.type === 'multiple-choice' || currentQ.type === 'clinical-case') {
      if (selectedOption === null) return;
      isCorrect = selectedOption === currentQ.correctOptionIndex;
    } else if (currentQ.type === 'ordering' && currentQ.correctOrderIds) {
      const currentOrderIds = orderedItems.map((item) => item.id);
      isCorrect = currentOrderIds.every((id, idx) => id === currentQ.correctOrderIds![idx]);
    }

    if (isCorrect) {
      soundEffects.playQuizCorrect();
    } else {
      soundEffects.playQuizIncorrect();
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        isCorrect,
        userSelection: currentQ.type === 'ordering' ? orderedItems : selectedOption,
      },
    }));

    setIsAnswerSubmitted(true);
  };

  // Move to next question or show summary
  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);
      // Confetti trigger if score >= 70%
      const totalAnswered = Object.keys(userAnswers).length;
      const totalCorrect = Object.values(userAnswers).filter((a) => a.isCorrect).length;
      if (totalCorrect / Math.max(1, totalAnswered) >= 0.7) {
        try {
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch (_) {}
      }
    }
  };

  // Restart Quiz
  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setShowSummary(false);
  };

  // Score metrics
  const totalCorrect = Object.values(userAnswers).filter((a) => a.isCorrect).length;
  const scorePercentage = Math.round((totalCorrect / Math.max(1, filteredQuestions.length)) * 100);

  // Breakdown by sense
  const senseBreakdown = SENSORY_PATHWAYS.map((path) => {
    const questionsOfSense = filteredQuestions.filter((q) => q.pathwayId === path.id);
    const correctOfSense = questionsOfSense.filter((q) => userAnswers[q.id]?.isCorrect).length;
    return {
      title: path.title,
      name: path.indonesianSense,
      total: questionsOfSense.length,
      correct: correctOfSense,
    };
  }).filter((s) => s.total > 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Quiz Header & Pathway Filter (Frosted Glass Panel) */}
      <div className="glass-card border border-white/12 rounded-3xl p-6 shadow-xl backdrop-blur-2xl relative overflow-hidden">
        {/* Top specular reflection line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Brain className="w-5 h-5 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <span>Kuis Evaluasi Otomatis Mekanisme Biokimia Indra</span>
            </h2>
            <p className="text-xs text-slate-300/80 mt-0.5">
              Uji penguasaan konsep fototransduksi, termoreseptor TRPV, silia olfaktori, rasa manis, sakulus, dan koklea
            </p>
          </div>

          <button
            onClick={handleRestartQuiz}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-pill text-slate-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto cursor-pointer shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
            <span>Mulai Ulang Kuis</span>
          </button>
        </div>

        {/* Pathway Filter Segmented Control */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1">
          <button
            onClick={() => {
              setFilterPathway('all');
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              filterPathway === 'all'
                ? 'bg-sky-500/30 text-sky-200 border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'glass-pill text-slate-300 hover:text-white'
            }`}
          >
            Semua Jalur ({QUIZ_QUESTIONS.length})
          </button>
          {SENSORY_PATHWAYS.map((p) => {
            const count = QUIZ_QUESTIONS.filter((q) => q.pathwayId === p.id).length;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setFilterPathway(p.id);
                  setCurrentIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  filterPathway === p.id
                    ? 'bg-sky-500/30 text-sky-200 border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : 'glass-pill text-slate-400 hover:text-white'
                }`}
              >
                {p.title} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Quiz Card */}
      {!showSummary && currentQ ? (
        <div className="glass-card-strong border border-white/18 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-2xl flex flex-col gap-6 relative overflow-hidden">
          {/* Top specular reflection line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

          {/* Question Meta Bar */}
          <div className="flex items-center justify-between text-xs border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-sky-300 font-bold bg-sky-950/80 px-2.5 py-1 rounded-xl border border-sky-400/40 shadow-sm">
                Soal {currentIndex + 1} dari {filteredQuestions.length}
              </span>
              <span className="text-slate-400 capitalize">
                Tipe: <strong className="text-slate-200">{currentQ.type.replace('-', ' ')}</strong>
              </span>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-xl bg-white/[0.04] text-slate-300 border border-white/10">
              Tingkat: {currentQ.difficulty}
            </span>
          </div>

          {/* Question Text */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-sky-300 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{currentQ.title}</span>
            </h3>
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* QUESTION TYPE 1: Multiple Choice & Clinical Case */}
          {(currentQ.type === 'multiple-choice' || currentQ.type === 'clinical-case') && currentQ.options && (
            <div className="flex flex-col gap-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctOptionIndex;

                let stateClasses = 'glass-card-subtle border-white/10 text-slate-200 hover:border-white/25 hover:bg-white/[0.08]';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    stateClasses = 'glass-glow-emerald border-emerald-400/60 text-emerald-200 ring-1 ring-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.3)]';
                  } else if (isSelected && !isCorrect) {
                    stateClasses = 'glass-glow-rose border-rose-400/60 text-rose-200 ring-1 ring-rose-400/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]';
                  } else {
                    stateClasses = 'bg-white/[0.02] border-white/5 text-slate-500 opacity-50';
                  }
                } else if (isSelected) {
                  stateClasses = 'glass-glow-sky border-sky-400/60 text-white ring-1 ring-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => setSelectedOption(idx)}
                    className={`text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer backdrop-blur-xl ${stateClasses}`}
                  >
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-white/[0.06] border border-white/15 shrink-0 mt-0.5 shadow-inner">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed flex-1 pt-0.5">{option}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* QUESTION TYPE 2: Pathway Step Reordering Challenge */}
          {currentQ.type === 'ordering' && (
            <div className="flex flex-col gap-3">
              <span className="text-xs text-slate-300">
                Gunakan tombol panah naik/turun untuk menyusun urutan biokimia yang tepat dari awal hingga akhir:
              </span>
              <div className="flex flex-col gap-2.5">
                {orderedItems.map((item, idx) => {
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 glass-card-subtle border border-white/10 rounded-2xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sky-300 bg-sky-950/80 px-2.5 py-1 rounded-xl border border-sky-400/40 shrink-0 shadow-sm">
                          Urutan {idx + 1}
                        </span>
                        <span className="text-slate-100 font-medium leading-relaxed">{item.label}</span>
                      </div>

                      {!isAnswerSubmitted && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => moveOrderItem(idx, idx - 1)}
                            disabled={idx === 0}
                            className="px-2.5 py-1 glass-pill rounded-lg text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            title="Pindah ke Atas"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => moveOrderItem(idx, idx + 1)}
                            disabled={idx === orderedItems.length - 1}
                            className="px-2.5 py-1 glass-pill rounded-lg text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            title="Pindah ke Bawah"
                          >
                            ▼
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Answer Feedback & Scientific Rationale (Frosted Glass Panel) */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-2xl glass-card border border-white/15 flex flex-col gap-3 text-xs leading-relaxed shadow-lg backdrop-blur-xl">
              <div className="flex items-center gap-2">
                {userAnswers[currentQ.id]?.isCorrect ? (
                  <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" /> Jawaban Anda Tepat!
                  </span>
                ) : (
                  <span className="text-rose-300 font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]" /> Jawaban Kurang Tepat
                  </span>
                )}
                <span className="text-slate-500">·</span>
                <span className="text-sky-300 font-mono">Konsep: {currentQ.biochemicalKeyConcept}</span>
              </div>
              <p className="text-slate-200">
                <strong className="text-white block mb-0.5">Penjelasan Ilmiah:</strong>
                {currentQ.scientificExplanation}
              </p>
            </div>
          )}

          {/* Action Button: Submit or Next */}
          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={currentQ.type !== 'ordering' && selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500/80 to-blue-600/80 hover:from-sky-500 hover:to-blue-600 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs cursor-pointer shadow-[0_0_20px_rgba(14,165,233,0.3)] border border-sky-300/40"
              >
                Periksa & Evaluasi Jawaban
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold transition-all text-xs cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-300/40"
              >
                <span>{currentIndex < filteredQuestions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Evaluasi Lengkap'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : showSummary ? (
        /* Evaluation Summary Report (Frosted Glass Strong Card) */
        <div className="glass-card-strong border border-white/18 rounded-3xl p-7 shadow-2xl backdrop-blur-2xl flex flex-col gap-6 relative overflow-hidden">
          {/* Top specular reflection line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-xs uppercase tracking-wider text-sky-400 font-semibold block mb-1">
                Laporan Hasil Evaluasi Otomatis
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Ringkasan Kompetensi Biokimia Sistem Indra
              </h3>
            </div>
            <div className="p-3.5 glass-glow-amber rounded-2xl border border-amber-400/40 flex items-center gap-3.5 shadow-lg">
              <Award className="w-9 h-9 text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
              <div>
                <span className="text-[10px] text-amber-200/80 uppercase tracking-wider block font-semibold">Skor Akhir</span>
                <span className="text-2xl font-mono font-bold text-white tabular-nums">
                  {scorePercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Performance Breakdown by Sense */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-3.5">
              Tingkat Penguasaan per Jalur Indra:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {senseBreakdown.map((s, idx) => {
                const pct = Math.round((s.correct / s.total) * 100);
                return (
                  <div key={idx} className="p-3.5 glass-card-subtle rounded-2xl border border-white/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{s.title}</span>
                      <span className="font-mono text-sky-300">{s.correct}/{s.total} ({pct}%)</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500/80 to-blue-600/80 hover:from-sky-500 hover:to-blue-600 text-white font-semibold transition-all text-xs cursor-pointer shadow-[0_0_20px_rgba(14,165,233,0.35)] border border-sky-300/40"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis Sekarang</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
