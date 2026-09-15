import React, { useState } from 'react';
import { 
  GraduationCap, 
  Flame, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  HelpCircle,
  Network,
  Sparkles,
  Zap,
  ArrowRight,
  Radio
} from 'lucide-react';
import { ClinicalCase, TeacherInjection, OSCEStation } from '../types/megacode';

interface TeacherStationProps {
  currentCase: ClinicalCase;
  onInjectCrisis: (injection: TeacherInjection) => void;
  activeCrisis: TeacherInjection | null;
  onClearCrisis: () => void;
  syncStatus?: 'connected' | 'reconnecting' | 'polling';
}

export const TeacherStation: React.FC<TeacherStationProps> = ({
  currentCase,
  onInjectCrisis,
  activeCrisis,
  onClearCrisis,
  syncStatus = 'connected'
}) => {
  const [activeSection, setActiveSection] = useState<'reasoning' | 'osce' | 'injections' | 'takeaways'>('reasoning');
  const [revealedModelAnswers, setRevealedModelAnswers] = useState<{ [stationNum: number]: boolean }>({});

  const tg = currentCase.teacherGuide;

  const toggleModelAnswer = (stationNum: number) => {
    setRevealedModelAnswers(prev => ({
      ...prev,
      [stationNum]: !prev[stationNum]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Teacher Station Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-xl p-5 shadow-md border border-indigo-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/80 flex items-center justify-center border border-indigo-400/40">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                  INSTRUCTOR CONTROL STATION
                </span>
                <span className="text-xs text-indigo-200">案例 #{currentCase.caseNumber}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                導師控場與臨床思維引導站：{currentCase.title}
              </h2>
              <p className="text-xs text-indigo-200/80 mt-0.5">
                目標診斷：<span className="font-semibold text-amber-300">{currentCase.targetDiagnosis}</span>
              </p>
            </div>
          </div>

          {/* Active Crisis Badge */}
          {activeCrisis ? (
            <div className="flex items-center gap-2 bg-rose-950/80 text-rose-200 px-3 py-1.5 rounded-lg border border-rose-700 animate-pulse">
              <Flame className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold">已注入危象：{activeCrisis.title}</span>
              <button
                onClick={onClearCrisis}
                className="ml-2 text-xs underline text-rose-300 hover:text-white"
              >
                解除
              </button>
            </div>
          ) : (
            <div className="text-xs text-indigo-300/80 bg-indigo-950/60 px-3 py-1.5 rounded-lg border border-indigo-800">
              ⚡ 導師可隨時注入突發危急事件考驗學生應變
            </div>
          )}
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-indigo-800/70 pt-3 overflow-x-auto text-xs sm:text-sm">
          <button
            onClick={() => setActiveSection('reasoning')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeSection === 'reasoning'
                ? 'bg-indigo-500 text-white font-bold'
                : 'text-indigo-200 hover:bg-indigo-800/50'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>臨床思維推導步道 (Reasoning Steps)</span>
          </button>

          <button
            onClick={() => setActiveSection('injections')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeSection === 'injections'
                ? 'bg-rose-600 text-white font-bold'
                : 'text-indigo-200 hover:bg-indigo-800/50'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>突發危機注入器 (Crisis Injections)</span>
          </button>

          <button
            onClick={() => setActiveSection('osce')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeSection === 'osce'
                ? 'bg-indigo-500 text-white font-bold'
                : 'text-indigo-200 hover:bg-indigo-800/50'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>OSCE 5大評估考站與解答</span>
          </button>

          <button
            onClick={() => setActiveSection('takeaways')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeSection === 'takeaways'
                ? 'bg-indigo-500 text-white font-bold'
                : 'text-indigo-200 hover:bg-indigo-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>臨床精華對照與病理鏈</span>
          </button>
        </div>
      </div>

      {/* 1. CLINICAL REASONING STEPS */}
      {activeSection === 'reasoning' && (
        <div className="space-y-6">
          {/* 4 Steps Chain */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Network className="w-5 h-5 text-indigo-600" />
              <span>四步臨床思維推導演繹 (Clinical Diagnostic Workflow)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tg.reasoningSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                        {step.title}
                      </h4>
                    </div>

                    {/* Clues */}
                    <div className="mb-3">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        觀察線索 (Clues):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {step.clues.map((c, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Reasoning */}
                    <div className="mb-3">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        病理推導路徑:
                      </span>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {step.reasoningPath.map((r, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-indigo-500 font-bold">➔</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-indigo-700 uppercase block mb-0.5">
                      臨床決策結論:
                    </span>
                    <p className="text-xs font-bold text-slate-900">
                      {step.conclusion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maternal vs Fetal Clues */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                <span>母體關鍵警訊 (Maternal Signs)</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {tg.maternalClues.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 bg-pink-50/50 p-2 rounded border border-pink-100">
                    <span className="text-pink-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                <span>胎兒關鍵警訊 (Fetal Signs)</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {tg.fetalClues.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 bg-sky-50/50 p-2 rounded border border-sky-100">
                    <span className="text-sky-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Maternal-Fetal Interaction Chain */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
              母胎病理生理關聯機制 (Maternal-Fetal Correlation):
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
              {tg.maternalFetalCorrelation}
            </p>
          </div>
        </div>
      )}

      {/* 2. CRISIS INJECTIONS */}
      {activeSection === 'injections' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-600" />
                  <span>導師突發危機注入控制台 (Crisis Event Injector)</span>
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                  <span>已啟動跨裝置實時同步</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                導師在一台裝置（如手機、iPad 或教師電腦）按下「立即注入此危象」，所有學生裝置與監視螢幕將<strong>毫秒級實時同步</strong>突發急症與警報！
              </p>
            </div>
            {activeCrisis && (
              <button
                onClick={onClearCrisis}
                className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
              >
                <span>解除當前危象 (所有裝置同步復原)</span>
              </button>
            )}
          </div>

          <div className="space-y-4 pt-2">
            {tg.injections.map((inj) => {
              const isActive = activeCrisis?.id === inj.id;

              return (
                <div
                  key={inj.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-300'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-rose-600" />
                      <h4 className="font-bold text-sm sm:text-base text-slate-900">
                        {inj.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => isActive ? onClearCrisis() : onInjectCrisis(inj)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-slate-800 text-white hover:bg-slate-700'
                          : 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
                      }`}
                    >
                      {isActive ? '解除危象 (Restore)' : '立即注入此危象！'}
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mb-3">
                    {inj.description}
                  </p>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-rose-700">情境提問：</span>{' '}
                      <span className="text-slate-800">{inj.requiredActionPrompt}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <span className="font-bold text-emerald-700">導師標準解答：</span>{' '}
                      <span className="text-slate-700 font-medium">{inj.correctResponse}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. OSCE 5 STATIONS */}
      {activeSection === 'osce' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-indigo-600" />
              <span>本案例 OSCE 5大客觀結構化臨床測驗教案</span>
            </h3>
            <p className="text-xs text-slate-500">
              包含考站任務指令、考官評分核心指標 (Key Points)，並提供標準示範話術供師生觀摩演練。
            </p>
          </div>

          <div className="space-y-4">
            {tg.osceStations.map((station) => {
              const isRevealed = revealedModelAnswers[station.stationNumber];

              return (
                <div
                  key={station.stationNumber}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-indigo-100 text-indigo-800 font-bold text-xs">
                        Station {station.stationNumber}
                      </span>
                      <h4 className="font-bold text-base text-slate-900">
                        {station.stationTitle}
                      </h4>
                    </div>

                    <button
                      onClick={() => toggleModelAnswer(station.stationNumber)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? '隱藏標準示範話術' : '顯示考官示範話術'}</span>
                    </button>
                  </div>

                  {/* Task Prompt */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800">
                    <span className="font-bold text-indigo-700 block mb-1">📋 考生任務指令 (Task Prompt):</span>
                    <p>{station.taskPrompt}</p>
                  </div>

                  {/* Key Points */}
                  <div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      ✓ 考官評分關鍵指標 (Key Scoring Points):
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {station.keyPoints.map((kp, i) => (
                        <li key={i} className="p-2 rounded bg-emerald-50/60 border border-emerald-200 text-emerald-950 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Model Answer (Collapsible) */}
                  {isRevealed && (
                    <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs sm:text-sm text-indigo-950 space-y-1 animate-fadeIn">
                      <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        標準示範應答話術 (Model Answer):
                      </span>
                      <p className="leading-relaxed pl-5 italic text-slate-800">
                        "{station.sampleModelAnswer}"
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. TAKEAWAYS & PATHOPHYSIOLOGY */}
      {activeSection === 'takeaways' && (
        <div className="space-y-6">
          {/* Pathophysiology Chain */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>疾病病理生理演進鏈 (Pathophysiological Cascade)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {tg.pathophysiologySummary}
            </p>
          </div>

          {/* Takeaways Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>臨床核心辨識對照精華表 (Clinical Takeaway Pearls)</span>
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="px-4 py-2.5 w-1/3">臨床徵象與線索 (Clue)</th>
                    <th className="px-4 py-2.5">判讀核心與應急處理 (Action Focus)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tg.takeawayTable.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-semibold text-slate-900">
                        {row.clue}
                      </td>
                      <td className="px-4 py-2.5 text-indigo-900 font-medium">
                        {row.focus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
