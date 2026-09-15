import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Stethoscope, 
  Activity, 
  PhoneCall, 
  GraduationCap, 
  HeartHandshake, 
  BookOpen, 
  Award, 
  Check, 
  Play,
  RotateCcw,
  Zap,
  Flame
} from 'lucide-react';

interface WelcomeTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultToTutorial?: boolean;
}

export const WelcomeTutorialModal: React.FC<WelcomeTutorialModalProps> = ({
  isOpen,
  onClose,
  defaultToTutorial = false
}) => {
  const [view, setView] = useState<'prompt' | 'tutorial'>(defaultToTutorial ? 'tutorial' : 'prompt');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dontAskAgain, setDontAskAgain] = useState<boolean>(true);

  // Sync view when defaultToTutorial prop changes
  useEffect(() => {
    if (defaultToTutorial) {
      setView('tutorial');
      setCurrentStep(0);
    } else {
      setView('prompt');
      setCurrentStep(0);
    }
  }, [defaultToTutorial, isOpen]);

  if (!isOpen) return null;

  const handleDismissPrompt = (acceptTutorial: boolean) => {
    if (dontAskAgain) {
      try {
        localStorage.setItem('megacode_tutorial_dismissed', 'true');
      } catch (e) {}
    }

    if (acceptTutorial) {
      setView('tutorial');
      setCurrentStep(0);
    } else {
      onClose();
    }
  };

  const handleCompleteTutorial = () => {
    try {
      localStorage.setItem('megacode_tutorial_dismissed', 'true');
    } catch (e) {}
    onClose();
  };

  const tutorialSteps = [
    {
      stepNumber: 1,
      tag: '難度分級與案例選擇',
      title: '難度分級篩選與 8+1 大高危急症教案',
      icon: Stethoscope,
      iconColor: 'text-rose-500 bg-rose-50 border-rose-200',
      description: '系統完整收錄 9 大 ChatGPT 共享源產科急症教案，包含妊娠高血壓、重度子癲前症、催產素過度刺激、胎盤早期剝離、完全性前置胎盤、羊水栓塞 (AFE) 及 4T 產後大出血專題。',
      highlights: [
        { dot: '🟢', label: '初級 (Beginner)', detail: '催產素引產監控、妊娠糖尿病控制（適合基礎臨床學習）' },
        { dot: '🔵', label: '中級 (Intermediate)', detail: '子癲前症降壓、子癲抽搐 MgSO₄ 搶救、前置胎盤無痛出血' },
        { dot: '🔴', label: '高級 (Advanced)', detail: '隱藏性胎盤早剝、羊水栓塞急救心跳停止、4T 產後大量出血' },
      ],
      tip: '您可以隨時在頂部標籤透過「難度分級篩選器」自由挑選適合的臨床挑戰！'
    },
    {
      stepNumber: 2,
      tag: '即時生理監測',
      title: '高擬真產科生理監視器 (Bedside OB Monitor)',
      icon: Activity,
      iconColor: 'text-emerald-500 bg-emerald-50 border-emerald-200',
      description: '真實模擬醫院產房與急診床邊監視儀。隨著您的處置與病情進展，生命徵象數值與波形將即時動態變化。',
      highlights: [
        { dot: '💓', label: '母體生命徵象', detail: '血壓 (BP)、心率脈搏、呼吸頻率、血氧 (SpO₂)、體溫' },
        { dot: '📉', label: '胎兒監護條帶', detail: '胎心率 (FHR bpm) 與 NICHD Category I/II/III 條帶判定' },
        { dot: '🌊', label: '子宮收縮與出血', detail: 'TOCO 宮縮強度 (mmHg) 與陰道出血量實時標註' }
      ],
      tip: '留意重度高血壓警訊 (≥160/110) 與胎心反覆晚期減速 (Late Decels)，代表母胎瀕危！'
    },
    {
      stepNumber: 3,
      tag: '實時應變考驗',
      title: '『呼叫支援 (Call for Help)』團隊動員倒數',
      icon: PhoneCall,
      iconColor: 'text-amber-500 bg-amber-50 border-amber-200',
      description: '真實急救時，呼叫後援需要時間動員。點擊【呼叫支援】將啟動 Code OB 60秒跨專科召集倒數計時！',
      highlights: [
        { dot: '⏱️', label: '時間成本考驗', detail: '產科主治、麻醉科、NICU、血庫與急診刀房團隊正奔赴產房' },
        { dot: '⚠️', label: '床邊急救鐵律', detail: '在團隊抵達前，您「必須同時進行」初步床邊搶救（給氧、側臥、停藥）' },
        { dot: '📉', label: '處置延誤扣分', detail: '若倒數歸零前完全未作處置，將扣除 25 分與 15% 病患穩定度' }
      ],
      tip: '切記：呼叫後援與床邊處置必須並行，絕不能坐等後援而延誤黃金搶救時間！'
    },
    {
      stepNumber: 4,
      tag: '決策與遊戲化機制',
      title: '四階臨床思維推導與即時積分/穩定度',
      icon: Award,
      iconColor: 'text-indigo-500 bg-indigo-50 border-indigo-200',
      description: '每個案例依臨床實況劃分為 3~4 個演變階段，引導您從主訴、檢驗數據到最終搶救層層推進。',
      highlights: [
        { dot: '📊', label: '病患穩定度 (0~100%)', detail: '正確處置提升穩定度，錯誤抉擇將導致母胎代償崩潰' },
        { dot: '🎯', label: '床邊即時決策處置', detail: '支援給氧、左側臥、靜脈輸液、MgSO₄、Labetalol 等動作' },
        { dot: '🏆', label: '即時積分與音效', detail: '答對累積積分與彩帶慶賀，強化臨床實戰成就感' }
      ],
      tip: '完成階段後，點擊「進入下一階段」推展真實病情變化！'
    },
    {
      stepNumber: 5,
      tag: '進階功能',
      title: '導師控場、OSCE 考站、4T 專題與原始教案庫',
      icon: GraduationCap,
      iconColor: 'text-purple-500 bg-purple-50 border-purple-200',
      description: '系統不只是學生練習工具，更具備完整的課堂教學與考評功能：',
      highlights: [
        { dot: '👨‍🏫', label: '導師控場站 (Teacher)', detail: '突發危機注入器（可注入抽搐、DIC等）、OSCE 5 站示範標準話術' },
        { dot: '🩸', label: '4T 產後大出血專題', detail: 'Tone, Trauma, Tissue, Thrombin 鑑別、休克指數 (SI) 與 QBL 計算器' },
        { dot: '⚡', label: '課堂互動競答 (Quiz)', detail: '10 大產科致命考點實戰答題，附臨床精華 (Clinical Pearls)' },
        { dot: '📖', label: '原始教案庫 (Archives)', detail: '完整閱讀與一鍵複製 ChatGPT 原始教案全文' }
      ],
      tip: '可透過頂部導覽列隨時切換不同模組，體驗全方位的產科急症模擬！'
    }
  ];

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* ================= VIEW 1: PROMPT DIALOG ================= */}
        {view === 'prompt' && (
          <div className="p-6 sm:p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-rose-200 mb-4">
              <Sparkles className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 mb-2">
              MEGACODE OB-GYN SIMULATION
            </span>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 tracking-tight">
              歡迎使用產科急症高擬真教學系統
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-md">
              本系統依據真實產科急症規範設計，包含<strong>高擬真生理監視器</strong>、<strong>難度分級教案</strong>、<strong>『呼叫支援』團隊動員倒數</strong>與<strong>四階臨床推導</strong>。
              <br /><br />
              請問您是否需要簡要的<strong>系統操作導覽與教學說明</strong>？
            </p>

            <div className="w-full space-y-3 mb-5">
              <button
                onClick={() => handleDismissPrompt(true)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-rose-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>需要，開始 2 分鐘快速導覽教學</span>
              </button>

              <button
                onClick={() => handleDismissPrompt(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all active:scale-[0.98]"
              >
                暫時不需要，直接進入實戰演練 ➔
              </button>
            </div>

            {/* Don't ask again checkbox */}
            <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontAskAgain}
                onChange={(e) => setDontAskAgain(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-500 w-3.5 h-3.5 border-slate-300"
              />
              <span>記住我的選擇，未來進入不再主動跳出（可隨時從右上角「教學指引」再次開啟）</span>
            </label>
          </div>
        )}

        {/* ================= VIEW 2: STEP-BY-STEP TUTORIAL ================= */}
        {view === 'tutorial' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:px-6 sm:py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                  {currentTutorial.stepNumber}/5
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-rose-300 font-bold">
                    系統操作指引 • {currentTutorial.tag}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
                    {currentTutorial.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="關閉指引"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Progress Dots */}
            <div className="px-6 pt-3 pb-2 bg-slate-50 flex items-center justify-between border-b border-slate-200/80">
              <div className="flex items-center gap-1.5 w-full">
                {tutorialSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`h-2 rounded-full transition-all flex-1 ${
                      idx === currentStep
                        ? 'bg-rose-600'
                        : idx < currentStep
                        ? 'bg-emerald-500'
                        : 'bg-slate-200'
                    }`}
                    title={`第 ${idx + 1} 步：${step.tag}`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-bold text-slate-500 ml-3 shrink-0">
                步驟 {currentStep + 1} / 5
              </span>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${currentTutorial.iconColor}`}>
                  <currentTutorial.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {currentTutorial.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {currentTutorial.description}
                  </p>
                </div>
              </div>

              {/* Highlights List */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-2.5">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  重點特色與操作要點：
                </div>
                {currentTutorial.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="text-sm shrink-0">{h.dot}</span>
                    <div>
                      <strong className="text-slate-900 font-semibold">{h.label}：</strong>
                      <span className="text-slate-600">{h.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pro Tip Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
                <span className="font-bold text-amber-700 shrink-0">💡 專家提示：</span>
                <span className="leading-relaxed">{currentTutorial.tip}</span>
              </div>
            </div>

            {/* Footer Navigation Controls */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="px-3 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>上一步</span>
              </button>

              <div className="flex items-center gap-2">
                {currentStep < tutorialSteps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep((prev) => Math.min(tutorialSteps.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <span>下一步</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteTutorial}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-200 transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>完成教學，開始演練！</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
