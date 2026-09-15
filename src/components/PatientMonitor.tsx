import React from 'react';
import { 
  Heart, 
  Activity, 
  AlertTriangle, 
  Wind, 
  Thermometer, 
  ShieldAlert,
  Flame,
  Droplets
} from 'lucide-react';
import { VitalsData } from '../types/megacode';

interface PatientMonitorProps {
  vitals: VitalsData;
  stability: number;
  crisisAlert?: string | null;
}

export const PatientMonitor: React.FC<PatientMonitorProps> = ({
  vitals,
  stability,
  crisisAlert
}) => {
  // Parse systolic to judge BP status
  const parseBp = (bpStr: string) => {
    const parts = bpStr.split('/');
    const sys = parseInt(parts[0], 10) || 120;
    const dia = parseInt(parts[1], 10) || 80;
    return { sys, dia };
  };

  const { sys, dia } = parseBp(vitals.bp);
  const isSevereHypertension = sys >= 160 || dia >= 110;
  const isHypotension = sys < 90;
  const isFetalDistress = vitals.fhr > 0 && (vitals.fhr < 110 || vitals.fhr > 160);
  const isHypoxia = vitals.spo2 < 95;

  return (
    <div className="bg-slate-950 text-slate-100 rounded-xl border border-slate-800 shadow-xl overflow-hidden mb-6">
      {/* Top Monitor Bar */}
      <div className="bg-slate-900 px-4 py-2 flex flex-wrap items-center justify-between border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-mono text-emerald-400 font-semibold tracking-wider uppercase">
            BEDSIDE OB MONITOR #01
          </span>
          <span className="text-slate-400">• 即時生命徵象監視系統</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="font-mono">LEAD II • CTG 1cm/min</span>
          <span className="text-slate-500">|</span>
          <span className={`font-semibold ${stability < 50 ? 'text-rose-400 animate-pulse' : 'text-slate-300'}`}>
            穩定指數: {stability}%
          </span>
        </div>
      </div>

      {/* Emergency Crisis Alert Banner */}
      {crisisAlert && (
        <div className="bg-gradient-to-r from-rose-900/90 via-red-800/90 to-rose-900/90 text-white px-4 py-2.5 flex items-center gap-3 border-b border-rose-600 animate-pulse">
          <Flame className="w-5 h-5 text-amber-300 shrink-0" />
          <div className="text-sm font-bold flex-1">
            🚨 導師注入突發危急事件：{crisisAlert}
          </div>
          <span className="px-2 py-0.5 rounded bg-white text-rose-900 text-xs font-bold uppercase tracking-wide">
            緊急狀況
          </span>
        </div>
      )}

      {/* Grid of Monitor Cards */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. Maternal Blood Pressure */}
        <div className={`p-3 rounded-lg border flex flex-col justify-between ${
          isSevereHypertension 
            ? 'bg-rose-950/40 border-rose-700/80 text-rose-200' 
            : isHypotension 
            ? 'bg-amber-950/40 border-amber-700/80 text-amber-200'
            : 'bg-slate-900/90 border-slate-800 text-cyan-300'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>NIBP (mmHg)</span>
            {isSevereHypertension && <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-bounce" />}
          </div>
          <div className="my-1">
            <div className={`text-2xl font-black font-mono tracking-tight ${
              isSevereHypertension ? 'text-rose-400' : isHypotension ? 'text-amber-400' : 'text-cyan-400'
            }`}>
              {vitals.bp}
            </div>
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {isSevereHypertension ? '⚠️ 重度高血壓警訊' : isHypotension ? '⚠️ 低血容休克警訊' : '血壓範圍穩定'}
          </div>
        </div>

        {/* 2. Maternal Heart Rate */}
        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col justify-between text-emerald-300">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>HR (bpm)</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/80 animate-pulse" />
          </div>
          <div className="my-1 flex items-baseline gap-1">
            <span className="text-2xl font-black font-mono text-emerald-400">{vitals.hr}</span>
            <span className="text-[10px] text-slate-400 font-mono">/min</span>
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {vitals.hr > 110 ? '母體心搏過速' : vitals.hr < 60 ? '母體心動過緩' : '竇性心律正常'}
          </div>
        </div>

        {/* 3. Maternal SpO2 & RR */}
        <div className={`p-3 rounded-lg border flex flex-col justify-between ${
          isHypoxia ? 'bg-rose-950/40 border-rose-700/80 text-rose-300' : 'bg-slate-900/90 border-slate-800 text-sky-300'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>SpO2 / RR</span>
            <Wind className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="my-1 flex items-baseline gap-1.5">
            <span className={`text-2xl font-black font-mono ${isHypoxia ? 'text-rose-400' : 'text-sky-400'}`}>
              {vitals.spo2}%
            </span>
            <span className="text-xs text-slate-400 font-mono">RR {vitals.rr}</span>
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {isHypoxia ? '⚠️ 重度缺氧發紺！' : '呼吸血氧正常'}
          </div>
        </div>

        {/* 4. Fetal Heart Rate (FHR) */}
        <div className={`p-3 rounded-lg border flex flex-col justify-between ${
          isFetalDistress 
            ? 'bg-rose-950/50 border-rose-600 text-rose-200' 
            : vitals.fhr === 0
            ? 'bg-slate-900 border-slate-700 text-slate-400'
            : 'bg-slate-900/90 border-slate-800 text-amber-300'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>FHR (胎心率)</span>
            {isFetalDistress && <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-ping" />}
          </div>
          <div className="my-1 flex items-baseline gap-1">
            <span className={`text-2xl font-black font-mono ${
              vitals.fhr === 0 ? 'text-slate-500' : isFetalDistress ? 'text-rose-400' : 'text-amber-400'
            }`}>
              {vitals.fhr > 0 ? vitals.fhr : '已分娩'}
            </span>
            {vitals.fhr > 0 && <span className="text-[10px] text-slate-400 font-mono">bpm</span>}
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {vitals.fhr === 0 ? '新生兒已娩出' : isFetalDistress ? '⚠️ 胎兒窘迫警訊！' : 'NICHD Cat I 正常'}
          </div>
        </div>

        {/* 5. Uterine Contraction & Tension */}
        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col justify-between text-purple-300">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>子宮張力 / TOCO</span>
            <Activity className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="my-1 text-xs font-semibold text-purple-200 line-clamp-2 leading-relaxed">
            {vitals.uterineTension}
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            宮縮頻率與腹壁觸診
          </div>
        </div>

        {/* 6. Bleeding / Blood Loss */}
        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col justify-between text-rose-300">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>產道出血評估</span>
            <Droplets className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="my-1 text-xs font-semibold text-rose-200 line-clamp-2 leading-relaxed">
            {vitals.bleedingAmount}
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            失血量與出血性狀
          </div>
        </div>
      </div>

      {/* FHR Pattern Strip Detail */}
      <div className="bg-slate-900/80 px-4 py-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">胎心電子監護圖譜 (NST/CTG):</span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${
            isFetalDistress ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-200'
          }`}>
            {vitals.fhrPattern}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <span className="flex items-center gap-1">
            <Thermometer className="w-3 h-3 text-amber-400" /> 體溫: {vitals.temp} °C
          </span>
        </div>
      </div>
    </div>
  );
};
