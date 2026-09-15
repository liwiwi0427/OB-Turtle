import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle, 
  XCircle, 
  Award, 
  RotateCcw, 
  Sparkles, 
  BookOpen,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CLASSROOM_QUIZ_BANK, QuizQuestion } from '../data/classroomQuiz';

export const QuizArena: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: string }>({});
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const question: QuizQuestion = CLASSROOM_QUIZ_BANK[currentQuestionIndex];
  const selectedOptionId = selectedAnswers[question.id];
  const hasAnswered = !!selectedOptionId;

  const handleSelectOption = (optId: string, isCorrect: boolean) => {
    if (hasAnswered) return;

    setSelectedAnswers(prev => ({ ...prev, [question.id]: optId }));

    if (isCorrect) {
      setScore(prev => prev + 10);
      try {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < CLASSROOM_QUIZ_BANK.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      try {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quiz Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/20 text-amber-100">
              CLASSROOM INTERACTIVE QUIZ
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              產科急症高頻核心試題互動競答
            </h2>
            <p className="text-xs text-amber-100 mt-0.5">
              精選 10 大產科急症致命考點（胎心圖譜、Tachysystole、硫酸鎂、早剝前置鑑別、AFE、4T、休克指數）
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-black/25 px-3 py-1.5 rounded-lg border border-white/20 text-center">
            <span className="text-[10px] uppercase text-amber-200 block">累積得分</span>
            <span className="text-xl font-bold font-mono text-white">{score}</span>
          </div>
        </div>
      </div>

      {/* Finished Summary Screen */}
      {isFinished ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            恭喜完成產科急症核心競答！
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            總共 10 題，你的最終成績為 <span className="font-bold text-amber-600 text-lg">{score}</span> / 100 分。
            {score >= 80 ? ' 表現極為出色，具備扎實的產科急症臨床判斷力！' : ' 建議再次複習 8 大教案與 4T 止血指引！'}
          </p>

          <div className="pt-4">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新再測一次</span>
            </button>
          </div>
        </div>
      ) : (
        /* Question Card */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Question Header */}
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                第 {currentQuestionIndex + 1} / {CLASSROOM_QUIZ_BANK.length} 題
              </span>
              <span className="text-slate-500 font-medium">
                領域：{question.category}
              </span>
            </div>
            <span className="text-slate-400">
              關聯：{question.caseRef}
            </span>
          </div>

          {/* Question Body */}
          <div className="p-5 sm:p-6 space-y-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {question.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let btnStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';

                if (hasAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-1 ring-emerald-400';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                  } else {
                    btnStyle = 'border-slate-100 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {hasAnswered ? (
                        opt.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-600" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-300" />
                        )
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p>{opt.text}</p>
                      {hasAnswered && isSelected && (
                        <div className="mt-2 pt-2 border-t border-slate-200/70 text-xs">
                          <span className={`font-bold ${opt.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {opt.isCorrect ? '✓ 回答正確！' : '✗ 回答錯誤：'}
                          </span>{' '}
                          <span className="text-slate-700">{opt.explanation}</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Clinical Pearl Box (Visible after answer) */}
            {hasAnswered && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2 animate-fadeIn">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900">產科急症重點精華 (Clinical Pearl)：</span>
                  <p className="mt-0.5 leading-relaxed">{question.pearl}</p>
                </div>
              </div>
            )}
          </div>

          {/* Question Footer */}
          <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                currentQuestionIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一題</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!hasAnswered}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                !hasAnswered
                  ? 'opacity-50 cursor-not-allowed bg-slate-200 text-slate-500'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md active:scale-95'
              }`}
            >
              <span>{currentQuestionIndex === CLASSROOM_QUIZ_BANK.length - 1 ? '查看成果結算' : '下一題'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
