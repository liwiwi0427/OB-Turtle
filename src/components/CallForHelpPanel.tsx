import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  Users, 
  Timer, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ShieldAlert, 
  HeartHandshake,
  Activity,
  UserCheck,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CallForHelpPanelProps {
  onScoreDelta: (delta: number) => void;
  onStabilityDelta: (delta: number) => void;
  hasBedsideActionTaken: boolean;
  latestActionName?: string;
  soundEnabled?: boolean;
}

type CallStatus = 'idle' | 'calling' | 'delayed_penalty' | 'arrived_stabilized';

export const CallForHelpPanel: React.FC<CallForHelpPanelProps> = ({
  onScoreDelta,
  onStabilityDelta,
  hasBedsideActionTaken,
  latestActionName,
  soundEnabled = true
}) => {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [penaltyTriggered, setPenaltyTriggered] = useState<boolean>(false);
  const [rewardTriggered, setRewardTriggered] = useState<boolean>(false);

  // Keep track of whether action was taken during this specific call
  const [actionDoneDuringCall, setActionDoneDuringCall] = useState<boolean>(false);

  // Audio tone synthesizer
  const playBeep = (freq: number, type: OscillatorType = 'sine', duration = 0.15) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted
    }
  };

  // Listen for actions taken by the student
  useEffect(() => {
    if (hasBedsideActionTaken && status === 'calling') {
      setActionDoneDuringCall(true);
      playBeep(659.25, 'triangle', 0.18); // E5 positive chime
    }
  }, [hasBedsideActionTaken, status]);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (status === 'calling') {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // Time is up! Check status
            clearInterval(interval!);
            return 0;
          }
          // Warning beeps when time is running low
          if (prev === 10 || prev === 5 || prev === 3 || prev === 2) {
            playBeep(440, 'square', 0.1);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  // Handle when countdown reaches 0
  useEffect(() => {
    if (status === 'calling' && secondsLeft === 0) {
      if (actionDoneDuringCall || hasBedsideActionTaken) {
        // SUCCESS: student treated the patient in time
        setStatus('arrived_stabilized');
        if (!rewardTriggered) {
          setRewardTriggered(true);
          onScoreDelta(30);
          onStabilityDelta(15);
          playBeep(523.25, 'sine', 0.2);
          setTimeout(() => playBeep(659.25, 'sine', 0.2), 150);
          setTimeout(() => playBeep(783.99, 'sine', 0.3), 300);
          try {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch (e) {}
        }
      } else {
        // PENALTY: student called help but did nothing to stabilize the patient!
        setStatus('delayed_penalty');
        if (!penaltyTriggered) {
          setPenaltyTriggered(true);
          onScoreDelta(-25);
          onStabilityDelta(-15);
          playBeep(220, 'sawtooth', 0.35);
          setTimeout(() => playBeep(185, 'sawtooth', 0.45), 250);
        }
      }
    }
  }, [secondsLeft, status, actionDoneDuringCall, hasBedsideActionTaken, rewardTriggered, penaltyTriggered, onScoreDelta, onStabilityDelta]);

  const handleStartCall = () => {
    setStatus('calling');
    setSecondsLeft(60);
    setActionDoneDuringCall(hasBedsideActionTaken);
    setPenaltyTriggered(false);
    setRewardTriggered(false);

    // Initial alert tone (Hospital chime: High-Low)
    playBeep(880, 'sine', 0.25);
    setTimeout(() => playBeep(587.33, 'sine', 0.35), 200);
  };

  const handleEarlyHandoff = () => {
    if (!actionDoneDuringCall && !hasBedsideActionTaken) return;
    setStatus('arrived_stabilized');
    if (!rewardTriggered) {
      setRewardTriggered(true);
      onScoreDelta(25);
      onStabilityDelta(10);
      playBeep(659.25, 'sine', 0.2);
      setTimeout(() => playBeep(783.99, 'sine', 0.3), 150);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setSecondsLeft(60);
    setActionDoneDuringCall(false);
    setPenaltyTriggered(false);
    setRewardTriggered(false);
  };

  const isStabilized = actionDoneDuringCall || hasBedsideActionTaken;
  const progressPercent = Math.max(0, Math.min(100, ((60 - secondsLeft) / 60) * 100));

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-5 transition-all">
      {/* 1. IDLE STATE: CALL BUTTON */}
      {status === 'idle' && (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-200 shrink-0 mt-0.5">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  啟動緊急應變：呼叫跨專科團隊支援 (Code OB)
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                  實時應變考驗
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                模擬現實急症中召集產科主治、麻醉科、NICU 及手術室團隊的「時間成本（60秒）」。
                <strong className="text-rose-700">【重要考驗】</strong>呼叫後團隊抵達需要時間，您必須同步在床邊執行初步急救處置或回答決策；若團隊抵達時現場完全未處置，將視為延誤搶救並扣除分數！
              </p>
            </div>
          </div>

          <button
            onClick={handleStartCall}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-200 flex items-center justify-center gap-2 transition-all shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>立即呼叫支援 (Call for Help)</span>
          </button>
        </div>
      )}

      {/* 2. CALLING STATE: COUNTDOWN IN PROGRESS */}
      {status === 'calling' && (
        <div className="p-4 sm:p-5 bg-gradient-to-br from-rose-950/5 via-amber-500/5 to-slate-50 border-l-4 border-l-rose-600">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
            {/* Left Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-200 shrink-0">
                <Users className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    團隊動員趕赴中 (Code OB Activated)
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  跨專科急救小組正趕往現場，倒數計時中
                </h4>
              </div>
            </div>

            {/* Big Countdown Timer */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <div className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow-inner border border-slate-700 flex items-center gap-2.5">
                <Timer className={`w-5 h-5 ${secondsLeft <= 10 ? 'text-rose-400 animate-bounce' : 'text-amber-400'}`} />
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">團隊抵達倒數</div>
                  <div className={`text-xl sm:text-2xl font-black font-mono tracking-wider ${
                    secondsLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-white'
                  }`}>
                    00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                  </div>
                </div>
              </div>

              {isStabilized && (
                <button
                  onClick={handleEarlyHandoff}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                  title="床邊已處置完成，團隊提前交班"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>提前交班 ✓</span>
                </button>
              )}
            </div>
          </div>

          {/* Response Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                secondsLeft <= 10 ? 'bg-rose-600' : 'bg-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Mobilizing Teams Status Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3 text-[11px]">
            <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
              <span>👨‍⚕️</span>
              <div className="truncate">
                <div className="font-bold text-slate-800">主治醫師與文屏姐</div>
                <div className="text-amber-600 text-[10px] font-medium">正在趕來的路上...</div>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
              <span>💉</span>
              <div className="truncate">
                <div className="font-bold text-slate-800">麻醉科Duty</div>
                <div className="text-amber-600 text-[10px] font-medium">準備麻醉、建立呼吸道與Time Out...</div>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
              <span>👶</span>
              <div className="truncate">
                <div className="font-bold text-slate-800">兒科團隊與SBR</div>
                <div className="text-amber-600 text-[10px] font-medium">已聯絡，準備中...</div>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
              <span>🩸</span>
              <div className="truncate">
                <div className="font-bold text-slate-800">血庫</div>
                <div className="text-amber-600 text-[10px] font-medium">備血、交叉試驗中...</div>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center gap-2 col-span-2 sm:col-span-1">
              <span>🏥</span>
              <div className="truncate">
                <div className="font-bold text-slate-800">開刀房</div>
                <div className="text-amber-600 text-[10px] font-medium">刀房可接刀...</div>
              </div>
            </div>
          </div>

          {/* Real-time Treatment Status & Warning */}
          <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
            isStabilized
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <div className="flex items-center gap-2">
              {isStabilized ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 animate-bounce" />
              )}
              <div>
                {isStabilized ? (
                  <span>
                    <strong>床邊搶救即時就緒！</strong> 已實施關鍵處置（{latestActionName || '初步穩定措施'}），母胎獲得及時照護，等待團隊抵達無縫接手！
                  </span>
                ) : (
                  <span>
                    <strong>⚠️ 警告：目前尚未進行任何床邊急救處置！</strong> 請立即在下方標籤【床邊即時決策處置】或【決策問答】執行處置，避免團隊抵達時因延誤搶救被扣分！
                  </span>
                )}
              </div>
            </div>

            <div className="shrink-0 text-[11px] font-bold">
              {isStabilized ? (
                <span className="text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md">安全防護已啟動 ✓</span>
              ) : (
                <span className="text-rose-700 bg-rose-100 px-2 py-1 rounded-md animate-pulse">亟需處置！</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. PENALTY STATE: FAILED TO TREAT IN TIME */}
      {status === 'delayed_penalty' && (
        <div className="p-5 bg-rose-50 border-l-4 border-l-rose-600">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-900">
                    處置延誤警訊 (Treatment Delay Penalty)
                  </span>
                  <span className="text-xs font-bold text-rose-700">
                    積分 -25 分 • 穩定度 -15%
                  </span>
                </div>
                <h4 className="text-base font-bold text-rose-950 mt-1">
                  團隊已抵達，但現場未在黃金召集時間內實施初步床邊急救處置！
                </h4>
                <p className="text-xs text-rose-800/90 mt-1 leading-relaxed max-w-3xl">
                  <strong>【臨床檢討】</strong>產科高危急症的黃金急救原則為：<strong>「呼叫支援與床邊初步穩定必須同時進行」</strong>。
                  在團隊抵達產房前的 60 秒空窗期，若第一線醫護人員未採取給氧、左側臥位、停用縮宮劑、擴充點滴或給予保護性藥物，產婦與胎兒可能陷入無可挽回的不可逆缺氧或休克！
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-rose-700 font-bold border border-rose-300 text-xs shadow-sm transition-all shrink-0 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重新呼叫 / 再次挑戰</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. SUCCESS STATE: TEAM ARRIVED & PATIENT STABILIZED */}
      {status === 'arrived_stabilized' && (
        <div className="p-5 bg-emerald-50 border-l-4 border-l-emerald-600">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                    搶救成功接軌 (Optimal Handoff Success)
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    團隊協同獎勵 +30 分 • 穩定度 +15%
                  </span>
                </div>
                <h4 className="text-base font-bold text-emerald-950 mt-1">
                  跨專科團隊已全數抵達！高度肯定現場第一時間的床邊穩定處置！
                </h4>
                <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed max-w-3xl">
                  <strong>【跨領域合作典範】</strong>在團隊奔赴現場的 60 秒內，您成功執行了床邊關鍵復甦與穩定措施，避免了母胎缺氧惡化。
                  目前產婦由婦產科部醫療團隊接手，新生兒將由兒科部醫療團隊接手，你做的不錯⋯也沒有被文屏姐罵！
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-emerald-800 font-bold border border-emerald-300 text-xs shadow-sm transition-all shrink-0 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重置狀態</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
