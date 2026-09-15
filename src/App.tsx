/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { PatientMonitor } from './components/PatientMonitor';
import { CaseSelector } from './components/CaseSelector';
import { CaseSimulator } from './components/CaseSimulator';
import { TeacherStation } from './components/TeacherStation';
import { PphSimulator } from './components/PphSimulator';
import { QuizArena } from './components/QuizArena';
import { RawArchiveViewer } from './components/RawArchiveViewer';
import { WelcomeTutorialModal } from './components/WelcomeTutorialModal';
import { ALL_CLINICAL_CASES } from './data/cases';
import { ClinicalCase, TeacherInjection, VitalsData } from './types/megacode';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'teacher' | 'pph' | 'quiz' | 'archive'>('simulator');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-1');
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  
  // Gamification stats
  const [stability, setStability] = useState<number>(85);
  const [score, setScore] = useState<number>(100);
  const [completedCaseIds, setCompletedCaseIds] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Teacher crisis injection
  const [activeCrisis, setActiveCrisis] = useState<TeacherInjection | null>(null);

  // Welcome tutorial popup for first-time visitors
  const [showTutorialModal, setShowTutorialModal] = useState<boolean>(() => {
    try {
      return localStorage.getItem('megacode_tutorial_dismissed') !== 'true';
    } catch (e) {
      return true;
    }
  });
  const [tutorialDirectStart, setTutorialDirectStart] = useState<boolean>(false);

  // Get current case
  const currentCase: ClinicalCase = useMemo(() => {
    return ALL_CLINICAL_CASES.find(c => c.id === selectedCaseId) || ALL_CLINICAL_CASES[0];
  }, [selectedCaseId]);

  // Derive current vitals (override if teacher injected a crisis)
  const currentVitals: VitalsData = useMemo(() => {
    const basePhase = currentCase.phases[currentPhaseIndex] || currentCase.phases[0];
    if (activeCrisis && activeCrisis.modifiedVitals) {
      return {
        ...basePhase.vitals,
        ...activeCrisis.modifiedVitals
      };
    }
    return basePhase.vitals;
  }, [currentCase, currentPhaseIndex, activeCrisis]);

  // Web Audio Synthesizer for realistic hospital bedside & game feedback
  const playTone = (freq: number, type: OscillatorType = 'sine', duration = 0.15) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  };

  const handleScoreDelta = (delta: number) => {
    setScore(prev => Math.max(0, prev + delta));
    if (delta > 0) {
      playTone(587.33, 'triangle', 0.2); // D5
      setTimeout(() => playTone(880, 'triangle', 0.3), 120); // A5
    } else {
      playTone(220, 'sawtooth', 0.3); // A3 warning
    }
  };

  const handleStabilityDelta = (delta: number) => {
    setStability(prev => {
      const nextVal = Math.min(100, Math.max(10, prev + delta));
      return nextVal;
    });
  };

  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentPhaseIndex(0);
    setActiveCrisis(null);
    setStability(80);
    playTone(440, 'sine', 0.1);
  };

  const handleResetCase = () => {
    setCurrentPhaseIndex(0);
    setActiveCrisis(null);
    setStability(85);
    playTone(392, 'sine', 0.15);
  };

  const handleCaseCompleted = (caseId: string) => {
    if (!completedCaseIds.includes(caseId)) {
      setCompletedCaseIds(prev => [...prev, caseId]);
      setScore(prev => prev + 50);
    }
    // Festive tone
    playTone(523.25, 'sine', 0.15);
    setTimeout(() => playTone(659.25, 'sine', 0.15), 150);
    setTimeout(() => playTone(783.99, 'sine', 0.25), 300);
  };

  const handleInjectCrisis = (injection: TeacherInjection) => {
    setActiveCrisis(injection);
    setStability(prev => Math.max(25, prev - 25));
    // Dramatic emergency buzzer
    playTone(330, 'square', 0.3);
    setTimeout(() => playTone(293.66, 'square', 0.4), 250);
  };

  const handleClearCrisis = () => {
    setActiveCrisis(null);
    setStability(prev => Math.min(100, prev + 15));
    playTone(523.25, 'sine', 0.2);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        stability={stability}
        score={score}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
        onResetCase={handleResetCase}
        onOpenTutorial={() => {
          setTutorialDirectStart(true);
          setShowTutorialModal(true);
        }}
        currentCaseTitle={currentCase.title}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* TAB 1: STUDENT SIMULATOR */}
        {activeTab === 'simulator' && (
          <div>
            {/* Case Selector Bar */}
            <CaseSelector
              cases={ALL_CLINICAL_CASES}
              selectedCaseId={selectedCaseId}
              onSelectCase={handleSelectCase}
              completedCaseIds={completedCaseIds}
              onOpenPph={() => setActiveTab('pph')}
            />

            {/* High-Fidelity Bedside Monitor */}
            <PatientMonitor
              vitals={currentVitals}
              stability={stability}
              crisisAlert={activeCrisis ? `${activeCrisis.title}（請進入導師控場站查閱解答或即刻處置）` : null}
            />

            {/* Step-by-Step Interactive Case Simulation */}
            <CaseSimulator
              currentCase={currentCase}
              currentPhaseIndex={currentPhaseIndex}
              onPhaseChange={setCurrentPhaseIndex}
              onScoreDelta={handleScoreDelta}
              onStabilityDelta={handleStabilityDelta}
              onCaseCompleted={handleCaseCompleted}
            />
          </div>
        )}

        {/* TAB 2: TEACHER / INSTRUCTOR STATION */}
        {activeTab === 'teacher' && (
          <div>
            {/* Case Selector so teacher can inspect any case */}
            <CaseSelector
              cases={ALL_CLINICAL_CASES}
              selectedCaseId={selectedCaseId}
              onSelectCase={handleSelectCase}
              completedCaseIds={completedCaseIds}
              onOpenPph={() => setActiveTab('pph')}
            />

            {/* Bedside monitor preview */}
            <PatientMonitor
              vitals={currentVitals}
              stability={stability}
              crisisAlert={activeCrisis ? `[目前注入中] ${activeCrisis.title}` : null}
            />

            {/* Teacher Console with Reasoning, Crisis Injector, and OSCE */}
            <TeacherStation
              currentCase={currentCase}
              onInjectCrisis={handleInjectCrisis}
              activeCrisis={activeCrisis}
              onClearCrisis={handleClearCrisis}
            />
          </div>
        )}

        {/* TAB 3: 4T POSTPARTUM HEMORRHAGE SIMULATOR */}
        {activeTab === 'pph' && (
          <PphSimulator />
        )}

        {/* TAB 4: CLASSROOM QUIZ ARENA */}
        {activeTab === 'quiz' && (
          <QuizArena />
        )}

        {/* TAB 5: RAW TRANSCRIPTS & CASE ARCHIVES */}
        {activeTab === 'archive' && (
          <RawArchiveViewer />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-4 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>MEGACODE 產科急症高擬真互動教學系統 • 依據 ChatGPT 原生提取教案</span>
          <span className="text-slate-500">NICHD Guidelines • ACOG PPH Bundle • AFE Foundation Consensus</span>
        </div>
      </footer>

      {/* First-time Welcome & Tutorial Guide Modal */}
      <WelcomeTutorialModal
        isOpen={showTutorialModal}
        onClose={() => setShowTutorialModal(false)}
        defaultToTutorial={tutorialDirectStart}
      />
    </div>
  );
}
