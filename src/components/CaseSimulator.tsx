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
  FileSpreadsheet,
  Lightbulb,
  Send,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClinicalCase, CasePhase, InteractiveOption, BedsideAction, GuidedQuestion } from '../types/megacode';
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
  
  // Track student open-ended reasonings: { [questionId]: string }
  const [studentReasonings, setStudentReasonings] = useState<{ [qId: string]: string }>({});
  // Track revealed questions / submitted decisions: { [questionId]: boolean }
  const [revealedDecisions, setRevealedDecisions] = useState<{ [qId: string]: boolean }>({});
  // Track clue open state: { [questionId]: boolean }
  const [showClues, setShowClues] = useState<{ [qId: string]: boolean }>({});
  // Track self assessments: { [questionId]: 'matched' | 'learning' }
  const [selfAssessments, setSelfAssessments] = useState<{ [qId: string]: 'matched' | 'learning' }>({});

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
    setStudentReasonings({});
    setRevealedDecisions({});
    setShowClues({});
    setSelfAssessments({});
    setExecutedActionIds([]);
    setLastActionFeedback(null);
    setHasBedsideActionTaken(false);
    setLatestActionName('');
  }, [currentCase.id]);

  const phase: CasePhase = currentCase.phases[currentPhaseIndex] || currentCase.phases[0];

  const handleSubmitDecision = (qId: string, q: GuidedQuestion) => {
    if (revealedDecisions[qId]) return;

    setRevealedDecisions(prev => ({ ...prev, [qId]: true }));
    const correctOpt = q.options.find(o => o.isCorrect) || q.options[0];

    onScoreDelta(correctOpt.scoreChange || 25);
    onStabilityDelta(correctOpt.stabilityImpact || 15);

    setHasBedsideActionTaken(true);
    setLatestActionName('臨床推理決策制定');

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}
  };

  const handleSelfAssess = (qId: string, type: 'matched' | 'learning') => {
    if (selfAssessments[qId]) return;
    setSelfAssessments(prev => ({ ...prev, [qId]: type }));
    if (type === 'matched') {
      onScoreDelta(10);
    }
  };

  const handleRevise = (qId: string) => {
    setRevealedDecisions(prev => ({ ...prev, [qId]: false }));
  };

  const toggleClue = (qId: string) => {
    setShowClues(prev => ({ ...prev, [qId]: !prev[qId] }));
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
            {/* 1. DECISION TAB (海龜湯開放推理模式 - 無選項) */}
            {activeTab === 'decision' && (
              <div className="space-y-5">
                {/* Mode Intro Banner */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 flex items-start gap-2.5 shadow-sm">
                  <span className="text-xl shrink-0 mt-0.5">🐢</span>
                  <div className="flex-1 leading-relaxed">
                    <span className="font-bold text-emerald-900">「海龜湯」開放式情境推理模式：</span>
                    <span className="text-emerald-800">
                      本系統<strong>無提供預設立場的選擇題選項</strong>，請您扮演床邊主治與主責助產團隊，依據產婦當前主訴、胎心監護條帶與即時數據，主動寫下您的臨床推論與決策處置！
                    </span>
                  </div>
                </div>

                {phase.questions.map((q, qIndex) => {
                  const isRevealed = !!revealedDecisions[q.id];
                  const reasoning = studentReasonings[q.id] || '';
                  const correctOpt = q.options.find(o => o.isCorrect) || q.options[0];
                  const wrongOpts = q.options.filter(o => !o.isCorrect);
                  const isClueOpen = !!showClues[q.id];
                  const assessment = selfAssessments[q.id];

                  return (
                    <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3.5">
                      {/* Question Header */}
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          {qIndex + 1}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                            {q.prompt}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className="text-xs text-indigo-600 font-medium">
                              🎯 核心學習目標：{q.learningObjective}
                            </span>
                            {/* Clue button */}
                            <button
                              type="button"
                              onClick={() => toggleClue(q.id)}
                              className="text-[11px] text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-200 font-medium transition-colors inline-flex items-center gap-1"
                            >
                              <Lightbulb className="w-3 h-3 text-amber-600" />
                              <span>{isClueOpen ? '收合線索' : '💡 臨床情境線索'}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Clue Panel (Collapsible) */}
                      {isClueOpen && (
                        <div className="bg-amber-50/90 border border-amber-200 rounded-lg p-3 text-xs text-amber-950 space-y-1 animate-in fade-in duration-150">
                          <div className="font-bold flex items-center gap-1 text-amber-800">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                            <span>🔍 海龜湯情境線索提示：</span>
                          </div>
                          <p className="leading-relaxed text-amber-900">
                            {q.clinicalClue || '仔細比對產婦當前生命徵象（血壓、心率、呼吸）、宮縮張力與胎兒監護條帶（變異度、減速型態）。思考哪些介入應列為最高優先（給氧、姿勢、停藥、降壓或備刀）。'}
                          </p>
                        </div>
                      )}

                      {/* Reasoning Input Area (No options!) */}
                      {!isRevealed ? (
                        <div className="space-y-2.5 pt-1">
                          <div className="relative">
                            <textarea
                              rows={3}
                              value={reasoning}
                              onChange={(e) => setStudentReasonings(prev => ({ ...prev, [q.id]: e.target.value }))}
                              placeholder="請在此輸入您的臨床鑑別診斷、推論依據或擬定之處置處方（無選項限制，依臨床判斷自由作答）..."
                              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-800 placeholder:text-slate-400 leading-relaxed outline-none"
                            />
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] text-slate-500">
                              {reasoning.trim().length > 0 ? `已輸入 ${reasoning.trim().length} 字` : '自主思考後，點擊右方按鈕揭曉海龜湯臨床解答'}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleSubmitDecision(q.id, q)}
                              className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 active:scale-95 ml-auto"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>{reasoning.trim().length > 0 ? '提交推論並揭曉解答' : '直接揭曉標準解答'}</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Revealed Feedback & Model Answer Area */
                        <div className="space-y-3 pt-1 animate-in fade-in duration-200">
                          {/* Student's submitted reasoning */}
                          {reasoning.trim() && (
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                              <div className="font-semibold text-slate-500 text-[10px] uppercase mb-0.5">
                                您的臨床推論思考紀錄：
                              </div>
                              <p className="italic text-slate-800 leading-relaxed">{reasoning}</p>
                            </div>
                          )}

                          {/* Gold Standard / Model Decision (The Soup Base) */}
                          <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-300 text-emerald-950 space-y-2 shadow-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>🐢 海龜湯湯底 • 專家標準臨床決策：</span>
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">
                                權威處置標準
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-emerald-950 leading-relaxed">
                              {correctOpt.text}
                            </p>
                            <div className="pt-2 border-t border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                              <strong className="font-bold text-emerald-800">臨床實證與病理詳解：</strong>
                              <span>{correctOpt.explanation}</span>
                            </div>
                          </div>

                          {/* Critical Clinical Pitfalls / Distractors (What to avoid) */}
                          {wrongOpts.length > 0 && (
                            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950 space-y-2">
                              <div className="font-bold text-rose-800 flex items-center gap-1.5 text-[11px]">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                <span>產科臨床常見致命盲點與處置禁忌：</span>
                              </div>
                              <div className="space-y-1.5 pl-1">
                                {wrongOpts.map((w) => (
                                  <div key={w.id} className="text-[11px] text-slate-700 border-l-2 border-rose-300 pl-2 leading-relaxed">
                                    <span className="font-semibold text-rose-700">❌ 禁忌/誤區：</span>
                                    <span>{w.text}</span>
                                    <div className="text-slate-500 text-[10px] mt-0.5">{w.explanation}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Self-Assessment Reflection */}
                          <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-600">思維反思：</span>
                              <button
                                type="button"
                                onClick={() => handleSelfAssess(q.id, 'matched')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                  assessment === 'matched'
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                                }`}
                              >
                                <span>🎯 與專家決策相符 (+10分)</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSelfAssess(q.id, 'learning')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                  assessment === 'learning'
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                                }`}
                              >
                                <span>💡 釐清盲點，學習到了</span>
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRevise(q.id)}
                              className="text-[11px] text-slate-400 hover:text-slate-600 underline ml-auto"
                            >
                              修改我的推論
                            </button>
                          </div>
                        </div>
                      )}
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
