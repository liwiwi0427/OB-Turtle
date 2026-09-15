import React, { useState } from 'react';
import { 
  Stethoscope, 
  Baby, 
  AlertCircle, 
  Flame, 
  ShieldAlert, 
  Droplet, 
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  Filter,
  GraduationCap
} from 'lucide-react';
import { ClinicalCase, Difficulty } from '../types/megacode';

interface CaseSelectorProps {
  cases: ClinicalCase[];
  selectedCaseId: string;
  onSelectCase: (caseId: string) => void;
  completedCaseIds: string[];
  onOpenPph: () => void;
}

export const CaseSelector: React.FC<CaseSelectorProps> = ({
  cases,
  selectedCaseId,
  onSelectCase,
  completedCaseIds,
  onOpenPph
}) => {
  const [difficultyFilter, setDifficultyFilter] = useState<'ALL' | Difficulty>('ALL');

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'hypertension':
        return { label: '妊娠高血壓', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'fetal_distress':
        return { label: '胎兒窘迫', color: 'bg-rose-100 text-rose-800 border-rose-200' };
      case 'diabetes_abruption':
        return { label: 'GDM / 胎盤早剝', color: 'bg-orange-100 text-orange-800 border-orange-200' };
      case 'abruption':
        return { label: '胎盤早期剝離', color: 'bg-red-100 text-red-800 border-red-200' };
      case 'previa':
        return { label: '前置胎盤', color: 'bg-pink-100 text-pink-800 border-pink-200' };
      case 'afe':
        return { label: '羊水栓塞 AFE', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      default:
        return { label: '急症教案', color: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return { 
          label: '初級', 
          dot: '🟢',
          color: 'text-emerald-800 bg-emerald-100 border-emerald-300 ring-1 ring-emerald-300/40',
          cardBorder: 'hover:border-emerald-400'
        };
      case 'Intermediate':
        return { 
          label: '中級', 
          dot: '🔵',
          color: 'text-sky-800 bg-sky-100 border-sky-300 ring-1 ring-sky-300/40',
          cardBorder: 'hover:border-sky-400'
        };
      case 'Advanced':
      default:
        return { 
          label: '高級', 
          dot: '🔴',
          color: 'text-rose-800 bg-rose-100 border-rose-300 ring-1 ring-rose-300/40',
          cardBorder: 'hover:border-rose-400'
        };
    }
  };

  // Filter cases based on selected difficulty
  const filteredCases = cases.filter((c) => {
    if (difficultyFilter === 'ALL') return true;
    return c.difficulty === difficultyFilter;
  });

  // Calculate counts
  const beginnerCount = cases.filter(c => c.difficulty === 'Beginner').length;
  const intermediateCount = cases.filter(c => c.difficulty === 'Intermediate').length;
  // Note: 4T PPH counts as Advanced
  const advancedCount = cases.filter(c => c.difficulty === 'Advanced').length + 1;

  // Show 4T PPH card if filter is ALL or Advanced
  const showPphCard = difficultyFilter === 'ALL' || difficultyFilter === 'Advanced';

  return (
    <div className="mb-6">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-rose-600" />
          <h2 className="text-base font-bold text-slate-900">
            9大產科急症情境教案庫
          </h2>
          <span className="text-xs text-slate-500 hidden sm:inline">
            （請選擇案例進入四階段高擬真臨床模擬）
          </span>
        </div>
        <div className="text-xs text-slate-500">
          已完成: <span className="font-bold text-rose-600">{completedCaseIds.length}</span> / 9
        </div>
      </div>

      {/* Difficulty Level Filter Bar */}
      <div className="flex items-center gap-2 mb-3.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 font-medium flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          難度分級篩選：
        </span>

        {/* ALL */}
        <button
          onClick={() => setDifficultyFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
            difficultyFilter === 'ALL'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <span>全部案例</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            difficultyFilter === 'ALL' ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-500'
          }`}>
            {cases.length + 1}
          </span>
        </button>

        {/* 初級 Beginner */}
        <button
          onClick={() => setDifficultyFilter('Beginner')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1.5 border ${
            difficultyFilter === 'Beginner'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-300/50'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
          }`}
        >
          <span>🟢 初級</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            difficultyFilter === 'Beginner' ? 'bg-emerald-700 text-emerald-100' : 'bg-emerald-200/80 text-emerald-900'
          }`}>
            {beginnerCount}
          </span>
        </button>

        {/* 中級 Intermediate */}
        <button
          onClick={() => setDifficultyFilter('Intermediate')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1.5 border ${
            difficultyFilter === 'Intermediate'
              ? 'bg-sky-600 text-white border-sky-600 shadow-sm ring-2 ring-sky-300/50'
              : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-300'
          }`}
        >
          <span>🔵 中級</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            difficultyFilter === 'Intermediate' ? 'bg-sky-700 text-sky-100' : 'bg-sky-200/80 text-sky-900'
          }`}>
            {intermediateCount}
          </span>
        </button>

        {/* 高級 Advanced */}
        <button
          onClick={() => setDifficultyFilter('Advanced')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1.5 border ${
            difficultyFilter === 'Advanced'
              ? 'bg-rose-600 text-white border-rose-600 shadow-sm ring-2 ring-rose-300/50'
              : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300'
          }`}
        >
          <span>🔴 高級</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            difficultyFilter === 'Advanced' ? 'bg-rose-700 text-rose-100' : 'bg-rose-200/80 text-rose-900'
          }`}>
            {advancedCount}
          </span>
        </button>
      </div>

      {/* Grid of Case Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredCases.map((c) => {
          const isSelected = selectedCaseId === c.id;
          const isCompleted = completedCaseIds.includes(c.id);
          const cat = getCategoryBadge(c.category);
          const diff = getDifficultyBadge(c.difficulty);

          return (
            <button
              key={c.id}
              onClick={() => onSelectCase(c.id)}
              className={`text-left p-3.5 rounded-xl border transition-all relative flex flex-col justify-between ${diff.cardBorder} ${
                isSelected
                  ? 'bg-rose-50/80 border-rose-500 shadow-md ring-2 ring-rose-400/30'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              {isCompleted && (
                <div className="absolute top-2.5 right-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                  <span className="text-xs font-bold text-slate-700">#{c.caseNumber}</span>
                  
                  {/* Category Badge */}
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cat.color}`}>
                    {cat.label}
                  </span>

                  {/* Difficulty Tag Badge */}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${diff.color}`}>
                    <span>{diff.dot}</span>
                    <span>{diff.label}</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                  {c.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>週數: {c.patientProfile.gestationalAge}</span>
                <span className="text-rose-600 font-medium">
                  {isSelected ? '演練中 ➔' : '選擇進入'}
                </span>
              </div>
            </button>
          );
        })}

        {/* 4T PPH Special Card (High Difficulty / 高級) */}
        {showPphCard && (
          <button
            onClick={onOpenPph}
            className="text-left p-3.5 rounded-xl border-2 border-dashed border-red-300 bg-red-50/50 hover:bg-red-50 transition-all shadow-sm flex flex-col justify-between relative group hover:border-rose-500"
          >
            <div>
              <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                <span className="text-xs font-bold text-red-800">#9 (專題)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
                  產後大出血 PPH
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-rose-100 text-rose-800 border-rose-300 ring-1 ring-rose-300/40 flex items-center gap-1">
                  <span>🔴</span>
                  <span>高級</span>
                </span>
              </div>
              <h3 className="text-sm font-bold text-red-950 line-clamp-1 mb-1 group-hover:text-red-700">
                案例九：產後大出血 4T 止血演練
              </h3>
              <p className="text-xs text-red-700/80 line-clamp-2 mb-2">
                Tone、Trauma、Tissue、Thrombin 四因鑑別、QBL量化失血與 Bakri 水球處置
              </p>
            </div>

            <div className="pt-2 border-t border-red-200/60 flex items-center justify-between text-[11px] text-red-700 font-semibold">
              <span>失血量計算法 (QBL)</span>
              <span className="text-red-700 underline">進入 4T 演練 ➔</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

