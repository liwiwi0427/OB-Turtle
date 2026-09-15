import React from 'react';
import { 
  Heart, 
  Activity, 
  GraduationCap, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  BookOpen,
  Award,
  Zap,
  HelpCircle
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'simulator' | 'teacher' | 'pph' | 'quiz' | 'archive';
  onTabChange: (tab: 'simulator' | 'teacher' | 'pph' | 'quiz' | 'archive') => void;
  stability: number;
  score: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetCase: () => void;
  onOpenTutorial?: () => void;
  currentCaseTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  stability,
  score,
  soundEnabled,
  onToggleSound,
  onResetCase,
  onOpenTutorial,
  currentCaseTitle
}) => {
  // Stability color & status
  const getStabilityBadge = (val: number) => {
    if (val >= 75) return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: '生命徵象穩定' };
    if (val >= 45) return { bg: 'bg-amber-50 text-amber-700 border-amber-200', text: '危象代償中' };
    return { bg: 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse', text: '瀕危急症預警！' };
  };

  const status = getStabilityBadge(stability);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center shadow-inner">
            <Heart className="w-5 h-5 text-white fill-white/80" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                MEGACODE OB-GYN
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">產科急症高擬真教學</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
              產科急症互動遊戲式教學系統
              {currentCaseTitle && (
                <span className="text-xs font-normal text-slate-400 hidden lg:inline max-w-xs truncate">
                  • {currentCaseTitle}
                </span>
              )}
            </h1>
          </div>
        </div>

        {/* Live Metrics & Controls */}
        <div className="flex items-center gap-3">
          {/* Stability Indicator */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <Activity className="w-4 h-4 text-rose-400 animate-pulse" />
            <div className="text-xs">
              <span className="text-slate-400">病患穩定度:</span>{' '}
              <span className="font-bold text-white">{stability}%</span>
            </div>
            <div className="w-16 sm:w-20 bg-slate-700 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  stability >= 70 ? 'bg-emerald-500' : stability >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(0, stability))}%` }}
              />
            </div>
          </div>

          {/* Gamification Score */}
          <div className="flex items-center gap-1.5 bg-indigo-950/70 text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-700/50">
            <Award className="w-4 h-4 text-amber-400" />
            <div className="text-xs">
              <span className="text-indigo-300/80 hidden sm:inline">累積得分:</span>{' '}
              <span className="font-bold text-amber-300 text-sm">{score}</span>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? '音效已開啟' : '音效已關閉'}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Reset Case */}
          <button
            onClick={onResetCase}
            title="重置當前案例演練"
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">重置</span>
          </button>

          {/* Tutorial / Help Guide */}
          {onOpenTutorial && (
            <button
              onClick={onOpenTutorial}
              title="查看系統操作指引與教學說明"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white border border-indigo-500/50 shadow-sm transition-all active:scale-95"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-200" />
              <span>教學指引</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-950 border-t border-slate-800/80 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 overflow-x-auto py-1.5 scrollbar-none text-xs sm:text-sm font-medium">
          <button
            onClick={() => onTabChange('simulator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-rose-600 text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>學生實戰演練 (8大案例)</span>
          </button>

          <button
            onClick={() => onTabChange('teacher')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'teacher'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>導師控場與 OSCE 站</span>
          </button>

          <button
            onClick={() => onTabChange('pph')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'pph'
                ? 'bg-red-700 text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-300" />
            <span>4T 產後大出血專題</span>
          </button>

          <button
            onClick={() => onTabChange('quiz')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-amber-600 text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-200" />
            <span>課堂互動競答 (Quiz)</span>
          </button>

          <button
            onClick={() => onTabChange('archive')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'archive'
                ? 'bg-slate-700 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>原始教案庫 (Archives)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
