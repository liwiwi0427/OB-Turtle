import React, { useState, useEffect } from 'react';
import { 
  User, 
  MessageSquareQuote, 
  Stethoscope, 
  FileText, 
  Zap, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Activity,
  Award,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClinicalCase, CasePhase, InteractiveOption, BedsideAction } from '../types/megacode';
import { CallForHelpPanel } from './CallForHelpPanel';

interface CaseSimulatorProps {
  currentCase: ClinicalCase;
  currentPhaseIndex: number;
  onPhaseChange: (phaseIndex: number) => void;
  onScoreDelta: (delta: number) => void;
  onStabilityDelta: (delta: number) => void;
  onCaseCompleted: (caseId: string) => void;
}

export const CaseSimulator: React.FC<CaseSimulatorProps> = ({
  currentCase,
  currentPhaseIndex,
  onPhaseChange,
  onScoreDelta,
  onStabilityDelta,
  onCaseCompleted
}) => {
  const [activeTab, setActiveTab] = useState<'decision' | 'actions' | 'exam' | 'labs'>('decision');
  
  // Track selected answers per question: { [questionId]: optionId }
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: string }>({});
  // Track executed bedside actions: actionId[]
  const [executedActionIds, setExecutedActionIds] = useState<string[]>([]);
  // Feedback popup or message
  const [lastActionFeedback, setLastActionFeedback] = useState<{
    name: string;
    isGood: boolean;
    text: string;
  } | null>(null);

  // Track bedside readiness for CallForHelpPanel
  const [hasBedsideActionTaken, setHasBedsideActionTaken] = useState<boolean>(false);
  const [latestActionName, setLatestActionName] = useState<string>('');

  // Reset phase-specific states when case changes
  useEffect(() => {
    setSelectedAnswers({});
    setExecutedActionIds([]);
    setLastActionFeedback(null);
    setHasBedsideActionTaken(false);
    setLatestActionName('');
  }, [currentCase.id]);

  const phase: CasePhase = currentCase.phases[currentPhaseIndex] || currentCase.phases[0];

  const handleOptionSelect = (qId: string, opt: InteractiveOption) => {
    if (selectedAnswers[qId]) return; // already answered

    setSelectedAnswers(prev => ({ ...prev, [qId]: opt.id }));
    onScoreDelta(opt.scoreChange);
    onStabilityDelta(opt.stabilityImpact);

    if (opt.isCorrect) {
      setHasBedsideActionTaken(true);
      setLatestActionName('臨床鑑別決策制定');
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleExecuteAction = (action: BedsideAction) => {
    if (executedActionIds.includes(action.id)) return;

    setExecutedActionIds(prev => [...prev, action.id]);
    onStabilityDelta(action.stabilityDelta);
    onScoreDelta(action.isAppropriate ? 15 : -10);

    if (action.isAppropriate) {
      setHasBedsideActionTaken(true);
      setLatestActionName(action.name);
    }

    setLastActionFeedback({
      name: action.name,
      isGood: action.isAppropriate,
      text: action.feedback
    });

    if (action.isAppropriate) {
      try {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.8 }
        });
      } catch (e) {}
    }
  };

  const isLastPhase = currentPhaseIndex === currentCase.phases.length - 1;

  const handleNext = () => {
    if (!isLastPhase) {
      onPhaseChange(currentPhaseIndex + 1);
      setLastActionFeedback(null);
    } else {
      onCaseCompleted(currentCase.id);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handlePrev = () => {
    if (currentPhaseIndex > 0) {
      onPhaseChange(currentPhaseIndex - 1);
      setLastActionFeedback(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">
                  {currentCase.patientProfile.age} 歲孕婦 • {currentCase.patientProfile.gravidaPara}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  週數：{currentCase.patientProfile.gestationalAge}
                </span>
                {currentCase.patientProfile.bmi && (
                  <span className="text-xs text-slate-500">
                    BMI: {currentCase.patientProfile.bmi}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                主訴 (CC)：<span className="text-slate-800 font-medium">{currentCase.patientProfile.chiefComplaint}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {currentCase.patientProfile.pastHistory.map((h, idx) => (
              <span key={idx} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Phase Stepper */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {currentCase.phases.map((p, idx) => {
            const isCurrent = idx === currentPhaseIndex;
            const isPast = idx < currentPhaseIndex;

            return (
              <button
                key={idx}
                onClick={() => onPhaseChange(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-rose-600 text-white font-bold shadow-sm ring-2 ring-rose-300'
                    : isPast
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {isPast ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                )}
                <span>第 {idx + 1} 階段：{p.title.split('：')[1] || p.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-time Emergency Response: Call for Help Panel with Countdown */}
      <CallForHelpPanel
        onScoreDelta={onScoreDelta}
        onStabilityDelta={onStabilityDelta}
        hasBedsideActionTaken={hasBedsideActionTaken}
        latestActionName={latestActionName}
      />

      {/* Main Simulation Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Bedside Observation & Speech (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Patient Quote Bubble */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-200 p-4 shadow-sm relative">
            <div className="flex items-center gap-2 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
              <MessageSquareQuote className="w-4 h-4" />
              <span>產婦現場呼救自述</span>
            </div>
            <blockquote className="text-base sm:text-lg font-bold text-rose-950 italic leading-relaxed">
              "{phase.patientQuote}"
            </blockquote>
          </div>

          {/* Clinical Narrative Story */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              <span>臨床實況發展情境</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {phase.story}
            </p>
          </div>

          {/* Quick Action Feedback Alert (if clicked) */}
          {lastActionFeedback && (
            <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 transition-all ${
              lastActionFeedback.isGood
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              {lastActionFeedback.isGood ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <div className="font-bold text-sm mb-0.5">
                  執行處置：{lastActionFeedback.name}
                </div>
                <p className="leading-relaxed">
                  {lastActionFeedback.text}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Tabs & Decisions (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          {/* Sub-Tabs Header */}
          <div className="border-b border-slate-200 bg-slate-50 px-4 pt-2 flex items-center gap-2 overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab('decision')}
              className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'decision'
                  ? 'border-rose-600 text-rose-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>決策考驗問答 ({phase.questions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('actions')}
              className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'actions'
                  ? 'border-rose-600 text-rose-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>床邊即時決策處置 ({phase.quickActions?.length || 0})</span>
            </button>

            {phase.physicalExam && phase.physicalExam.length > 0 && (
              <button
                onClick={() => setActiveTab('exam')}
                className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'exam'
                    ? 'border-rose-600 text-rose-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Stethoscope className="w-4 h-4 text-sky-600" />
                <span>理學與產科檢查</span>
              </button>
            )}

            {(phase.labs || phase.diagnosticImaging) && (
              <button
                onClick={() => setActiveTab('labs')}
                className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'labs'
                    ? 'border-rose-600 text-rose-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                <span>檢驗報告與超音波</span>
              </button>
            )}
          </div>

          {/* Sub-Tab Content Area */}
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto max-h-[520px]">
            {/* 1. DECISION TAB */}
            {activeTab === 'decision' && (
              <div className="space-y-6">
                {phase.questions.map((q, qIndex) => {
                  const currentSelected = selectedAnswers[q.id];
                  return (
                    <div key={q.id} className="space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {qIndex + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                            {q.prompt}
                          </h4>
                          <span className="text-xs text-indigo-600 font-medium inline-block mt-0.5">
                            🎯 核心學習目標：{q.learningObjective}
                          </span>
                        </div>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 pt-1">
                        {q.options.map((opt) => {
                          const isChosen = currentSelected === opt.id;
                          const hasAnswered = !!currentSelected;

                          let btnStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';
                          if (hasAnswered) {
                            if (opt.isCorrect) {
                              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-1 ring-emerald-400';
                            } else if (isChosen && !opt.isCorrect) {
                              btnStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                            } else {
                              btnStyle = 'border-slate-100 text-slate-400 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={opt.id}
                              disabled={hasAnswered}
                              onClick={() => handleOptionSelect(q.id, opt)}
                              className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${btnStyle}`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {hasAnswered ? (
                                  opt.isCorrect ? (
                                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                                  ) : isChosen ? (
                                    <XCircle className="w-4 h-4 text-rose-600" />
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border border-slate-300" />
                                  )
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-slate-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p>{opt.text}</p>
                                {hasAnswered && isChosen && (
                                  <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs">
                                    <span className={`font-bold ${opt.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                                      {opt.isCorrect ? '✅ 決策正確！' : '❌ 臨床處置警訊：'}
                                    </span>{' '}
                                    <span className="text-slate-700">{opt.explanation}</span>
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. ACTIONS TAB */}
            {activeTab === 'actions' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-500">
                  💡 點擊床邊急症動作，模擬現場搶救。正確處置將提升病患穩定度並獲取積分！
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {phase.quickActions?.map((act) => {
                    const isExecuted = executedActionIds.includes(act.id);
                    return (
                      <button
                        key={act.id}
                        onClick={() => handleExecuteAction(act)}
                        disabled={isExecuted}
                        className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isExecuted
                            ? 'bg-slate-100 border-slate-300 opacity-60 text-slate-500 cursor-not-allowed'
                            : 'bg-white hover:bg-rose-50 border-slate-200 hover:border-rose-300 shadow-sm text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span>{act.category.toUpperCase()}</span>
                          </div>
                          {isExecuted && (
                            <span className="text-[10px] text-emerald-600 font-bold">已執行 ✓</span>
                          )}
                        </div>
                        <h5 className="font-bold text-sm text-slate-900 mb-1">
                          {act.name}
                        </h5>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {act.feedback}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. PHYSICAL EXAM TAB */}
            {activeTab === 'exam' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-rose-600" />
                  <span>床邊理學檢查與產科觸診紀錄</span>
                </h4>
                <ul className="space-y-2">
                  {phase.physicalExam?.map((item, i) => (
                    <li key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. LABS & IMAGING TAB */}
            {activeTab === 'labs' && (
              <div className="space-y-4">
                {phase.labs && phase.labs.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-2">急驗檢驗數據 (Laboratory Findings)</h4>
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                          <tr>
                            <th className="px-3 py-2">檢驗項目</th>
                            <th className="px-3 py-2">測定數值</th>
                            <th className="px-3 py-2">參考值範圍</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {phase.labs.map((lab, i) => (
                            <tr key={i} className={lab.abnormal ? 'bg-rose-50/70 font-semibold' : 'hover:bg-slate-50'}>
                              <td className="px-3 py-2 text-slate-800">{lab.item}</td>
                              <td className="px-3 py-2">
                                <span className={lab.abnormal ? 'text-rose-700 font-bold' : 'text-slate-800'}>
                                  {lab.value} {lab.unit || ''}
                                </span>
                                {lab.abnormal && (
                                  <span className="ml-1.5 text-[10px] px-1 py-0.2 rounded bg-rose-200 text-rose-800 font-bold">
                                    異常
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2 text-slate-500">{lab.reference || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {phase.diagnosticImaging && (
                  <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50">
                    <h5 className="font-bold text-sm text-indigo-950 mb-1">
                      {phase.diagnosticImaging.type}
                    </h5>
                    <p className="text-xs text-indigo-900 leading-relaxed mb-2 font-medium">
                      {phase.diagnosticImaging.findings}
                    </p>
                    {phase.diagnosticImaging.details && (
                      <p className="text-xs text-slate-600 bg-white/80 p-2 rounded border border-indigo-100">
                        {phase.diagnosticImaging.details}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stepper Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentPhaseIndex === 0}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentPhaseIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一階段</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all active:scale-95"
            >
              <span>{isLastPhase ? '完成案例演練！' : '進入下一階段'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
