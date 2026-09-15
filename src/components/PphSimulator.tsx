import React, { useState } from 'react';
import { 
  Heart, 
  Droplet, 
  Activity, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Calculator, 
  Scissors, 
  Flame,
  Award,
  Sparkles,
  HelpCircle,
  Stethoscope
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PPH_4T_CASES, PPH_ALGORITHM_STEPS, QBL_CALCULATION_GUIDE } from '../data/pph4TData';

export const PphSimulator: React.FC = () => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const currentCase = PPH_4T_CASES[selectedCaseIndex] || PPH_4T_CASES[0];

  // QBL Calculator State
  const [spongeWeightGrams, setSpongeWeightGrams] = useState<number>(350); // 1g = 1mL
  const [suctionVolumeMl, setSuctionVolumeMl] = useState<number>(400);
  const [drapeVolumeMl, setDrapeVolumeMl] = useState<number>(250);

  // Shock index calculator
  const [calcHr, setCalcHr] = useState<number>(currentCase.vitals.hr);
  const parseSystolic = (bp: string) => parseInt(bp.split('/')[0], 10) || 100;
  const [calcSbp, setCalcSbp] = useState<number>(parseSystolic(currentCase.vitals.bp));

  // Interactive drug order checks
  const [appliedInterventions, setAppliedInterventions] = useState<string[]>([]);
  const [drugWarning, setDrugWarning] = useState<string | null>(null);

  const totalQbl = spongeWeightGrams + suctionVolumeMl + drapeVolumeMl;
  const shockIndex = calcSbp > 0 ? parseFloat((calcHr / calcSbp).toFixed(2)) : 1.0;

  const getShockIndexAssessment = (si: number) => {
    if (si < 0.7) return { text: '正常生理狀態 (SI <0.7)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (si <= 0.9) return { text: '警戒狀態 (SI 0.7-0.9)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (si <= 1.4) return { text: '重度失血休克 (SI 1.0-1.4)：需立即備血輸血！', color: 'text-orange-800 bg-orange-50 border-orange-200 animate-pulse font-bold' };
    return { text: '🚨 極度危急失血休克 (SI ≥1.4)：立即啟動大量輸血協定 MTP！', color: 'text-rose-900 bg-rose-100 border-rose-400 font-black animate-bounce' };
  };

  const handleApplyAction = (actionName: string) => {
    if (appliedInterventions.includes(actionName)) return;

    // Check specific clinical warnings
    if (actionName.includes('Methergine') || actionName.includes('Methylergonovine')) {
      if (currentCase.vitals.bp.startsWith('14') || currentCase.vitals.bp.startsWith('15') || currentCase.vitals.bp.startsWith('16')) {
        setDrugWarning('⚠️ 警告：該產婦有血壓升高病史，使用 Methergine 有誘發腦出血危險！');
      }
    }

    setAppliedInterventions(prev => [...prev, actionName]);
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-red-950 text-white rounded-xl p-5 shadow-lg border border-red-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-600/80 flex items-center justify-center border border-red-400/40">
              <Droplet className="w-6 h-6 text-white fill-white/80" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-500/30 text-red-200 border border-red-400/30">
                  OBSTETRIC HEMORRHAGE 4T SIMULATOR
                </span>
                <span className="text-xs text-red-200">案例九專題</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                產後大出血 (PPH) 4T 病因鑑別與止血搶救模擬
              </h2>
              <p className="text-xs text-red-200/90 mt-0.5">
                涵蓋 Tone、Trauma、Tissue、Thrombin 臨床路徑、QBL 量化失血與休克指數計算
              </p>
            </div>
          </div>
        </div>

        {/* 4T Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 border-t border-red-800/80 pt-3">
          {PPH_4T_CASES.map((c, idx) => {
            const isSelected = selectedCaseIndex === idx;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCaseIndex(idx);
                  setCalcHr(c.vitals.hr);
                  setCalcSbp(parseSystolic(c.vitals.bp));
                  setDrugWarning(null);
                }}
                className={`p-2.5 rounded-lg text-left transition-all border ${
                  isSelected
                    ? 'bg-white text-red-950 font-bold border-white shadow-md'
                    : 'bg-red-950/60 text-red-200 border-red-800/80 hover:bg-red-900/50'
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                  第 {idx + 1} T: {c.category}
                </div>
                <div className="text-xs sm:text-sm font-bold truncate">
                  {c.nameZh.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Details & Interactive Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Clinical Case Presentation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Patient Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                  4T 分類：{currentCase.category} - {currentCase.nameZh}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {currentCase.caseTitle}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
              {currentCase.profile}
            </p>

            {/* Vitals summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">血壓 (BP)</span>
                <span className="font-bold text-sm text-slate-900">{currentCase.vitals.bp}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">心率 (HR)</span>
                <span className="font-bold text-sm text-rose-600">{currentCase.vitals.hr} bpm</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">子宮張力</span>
                <span className="font-bold text-xs text-purple-900 line-clamp-1">{currentCase.vitals.uterineTension}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">失血量評估</span>
                <span className="font-bold text-xs text-red-700 line-clamp-1">{currentCase.vitals.bleedingAmount}</span>
              </div>
            </div>

            {/* Bleeding description & findings */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs">
                <span className="font-bold text-red-900">出血特徵：</span>{' '}
                <span className="text-slate-700">{currentCase.bleedingDescription}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-1">理學檢查關鍵發現：</span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {currentCase.physicalFindings.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Priority Interventions Checklist */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-600" />
              <span>優先處置指引 (點擊執行床邊處置)</span>
            </h4>

            {drugWarning && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs font-medium flex items-center gap-2 animate-pulse">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{drugWarning}</span>
              </div>
            )}

            <div className="space-y-2">
              {currentCase.priorityInterventions.map((action, i) => {
                const isDone = appliedInterventions.includes(action);
                return (
                  <button
                    key={i}
                    onClick={() => handleApplyAction(action)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${
                      isDone
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-slate-50 hover:bg-rose-50 border-slate-200 hover:border-rose-300 text-slate-800'
                    }`}
                  >
                    <span className="font-medium">{action}</span>
                    {isDone ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        已執行
                      </span>
                    ) : (
                      <span className="text-xs text-rose-600 font-bold underline">
                        立即執行 ➔
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guided Questions & Pearls */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>臨床思維與診斷問答 (Guiding Clinical Q&A)</span>
            </h4>

            <div className="space-y-3">
              {currentCase.guidingQuestions.map((gq, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs sm:text-sm">
                  <div className="font-bold text-slate-900 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <span>{gq.question}</span>
                  </div>
                  <div className="pl-7 text-xs text-slate-700 leading-relaxed bg-white p-2.5 rounded border border-slate-200">
                    <span className="font-bold text-emerald-700">解答要點：</span> {gq.answerGuide}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900">
              <span className="font-bold">導師教學核心提示：</span> {currentCase.keyTeacherFocus}
            </div>
          </div>
        </div>

        {/* Right Column: QBL & Shock Index Calculator (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Shock Index Calculator Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-rose-600" />
                <h4 className="font-bold text-sm text-slate-900">
                  產科休克指數計算器 (Shock Index, SI)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">
                SI = HR / SBP
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500 block mb-1">心跳 (HR bpm)</label>
                <input
                  type="number"
                  value={calcHr}
                  onChange={(e) => setCalcHr(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-mono font-bold text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">收縮壓 (SBP mmHg)</label>
                <input
                  type="number"
                  value={calcSbp}
                  onChange={(e) => setCalcSbp(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-mono font-bold text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Shock Index Result */}
            <div className="p-3.5 rounded-xl border flex flex-col items-center justify-center text-center space-y-1 bg-slate-50">
              <span className="text-xs text-slate-500">當前計算指數</span>
              <span className="text-3xl font-black font-mono text-slate-900">{shockIndex}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full border mt-1 ${getShockIndexAssessment(shockIndex).color}`}>
                {getShockIndexAssessment(shockIndex).text}
              </span>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div>• 正常產婦 SI: &lt;0.7-0.9</div>
              <div>• SI ≥1.0: 預估失血常已超過 1500 mL，應立即備血</div>
              <div>• SI ≥1.4: 嚴重低血容代償衰竭，應立即啟動大量輸血協定 (MTP)</div>
            </div>
          </div>

          {/* QBL Calculator Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-600" />
                <h4 className="font-bold text-sm text-slate-900">
                  量化失血量計算器 (QBL Calculator)
                </h4>
              </div>
              <span className="text-xs font-bold text-indigo-600">
                1 g 淨重 = 1 mL
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600">紗布/止血墊秤重淨重 (g/mL):</span>
                  <span className="font-bold font-mono">{spongeWeightGrams} mL</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={spongeWeightGrams}
                  onChange={(e) => setSpongeWeightGrams(parseInt(e.target.value, 10))}
                  className="w-full accent-red-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600">抽吸瓶刻度液量 (扣除羊水) (mL):</span>
                  <span className="font-bold font-mono">{suctionVolumeMl} mL</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={suctionVolumeMl}
                  onChange={(e) => setSuctionVolumeMl(parseInt(e.target.value, 10))}
                  className="w-full accent-red-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600">產台集血袋 (V-drape) 收集量 (mL):</span>
                  <span className="font-bold font-mono">{drapeVolumeMl} mL</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={drapeVolumeMl}
                  onChange={(e) => setDrapeVolumeMl(parseInt(e.target.value, 10))}
                  className="w-full accent-red-600"
                />
              </div>
            </div>

            {/* Total QBL Output */}
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-red-900 block">累積量化總失血量 (QBL):</span>
                <span className="text-xs text-red-700">
                  {totalQbl >= 1000 ? '⚠️ 已達到產後大出血 (PPH) 確診標準！' : '監控中'}
                </span>
              </div>
              <div className="text-2xl font-black font-mono text-red-800">
                {totalQbl} <span className="text-xs font-normal">mL</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step PPH Algorithm Accordion */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>標準 PPH 四階梯階梯搶救流程</span>
            </h4>
            <div className="space-y-2">
              {PPH_ALGORITHM_STEPS.map((step) => (
                <div key={step.stage} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <span>{step.stage}</span>
                    <span className="text-red-600 font-mono">{step.bloodLossThreshold}</span>
                  </div>
                  <ul className="text-slate-600 space-y-0.5 pl-3 list-disc">
                    {step.actions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
