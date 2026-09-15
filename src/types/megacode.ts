export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface VitalsData {
  bp: string; // e.g. "162/104"
  hr: number; // e.g. 110
  rr: number; // e.g. 20
  spo2: number; // e.g. 96
  temp: number; // e.g. 36.8
  fhr: number; // e.g. 175
  fhrPattern: string; // e.g. "Late Deceleration, Minimal Variability"
  uterineTension?: string; // e.g. "柔軟", "板狀腹", "強直收縮"
  bleedingAmount?: string; // e.g. "無出血", "200 mL", "650 mL"
}

export interface LabItem {
  item: string;
  value: string;
  unit?: string;
  reference?: string;
  abnormal?: boolean;
}

export interface InteractiveOption {
  id: string;
  text: string;
  isCorrect: boolean;
  scoreChange: number;
  stabilityImpact: number; // e.g. +15 or -25
  explanation: string;
  dangerAlert?: string;
}

export interface GuidedQuestion {
  id: string;
  prompt: string;
  options: InteractiveOption[];
  learningObjective: string;
  clinicalClue?: string;
}

export interface BedsideAction {
  id: string;
  name: string;
  category: 'position' | 'airway_oxygen' | 'medication' | 'procedure' | 'lab_diag' | 'emergency';
  icon: string;
  isAppropriate: boolean;
  stabilityDelta: number;
  feedback: string;
}

export interface CasePhase {
  phaseNumber: number;
  title: string;
  subtitle: string;
  patientQuote: string;
  story: string;
  vitals: VitalsData;
  physicalExam?: string[];
  labs?: LabItem[];
  diagnosticImaging?: {
    type: string;
    findings: string;
    details: string;
  };
  questions: GuidedQuestion[];
  quickActions: BedsideAction[];
}

export interface OSCEStation {
  stationNumber: number;
  stationTitle: string;
  taskPrompt: string;
  keyPoints: string[];
  sampleModelAnswer: string;
}

export interface TeacherInjection {
  id: string;
  title: string;
  description: string;
  vitalsOverride: Partial<VitalsData>;
  newSituationPrompt: string;
  requiredActionPrompt: string;
  correctResponse: string;
}

export interface ReasoningStep {
  stepNumber: number;
  title: string;
  clues: string[];
  reasoningPath: string[];
  conclusion: string;
}

export interface ClinicalCase {
  id: string;
  caseNumber: number;
  title: string;
  subtitle: string;
  category: 'fetal_distress' | 'hypertension' | 'diabetes_abruption' | 'abruption' | 'previa' | 'afe' | 'pph_4t';
  targetDiagnosis: string;
  estimatedTimeMin: number;
  difficulty: Difficulty;
  patientProfile: {
    age: number;
    gravidaPara: string;
    gestationalAge: string;
    pastHistory: string[];
    chiefComplaint: string;
    bmi?: number;
  };
  phases: CasePhase[];
  teacherGuide: {
    reasoningSteps: ReasoningStep[];
    maternalClues: string[];
    fetalClues: string[];
    maternalFetalCorrelation: string;
    osceStations: OSCEStation[];
    physicianOrdersExplained?: { order: string; rationale: string; priority: 'Urgent' | 'High' | 'Medium' }[];
    takeawayTable: { clue: string; focus: string }[];
    pathophysiologySummary: string;
    injections: TeacherInjection[];
  };
  rawContent: string;
}

export interface PPH4TCase {
  id: string;
  category: 'Tone' | 'Trauma' | 'Tissue' | 'Thrombin' | 'Hematoma';
  nameZh: string;
  caseTitle: string;
  profile: string;
  vitals: VitalsData;
  bleedingDescription: string;
  physicalFindings: string[];
  guidingQuestions: {
    question: string;
    answerGuide: string;
  }[];
  keyTeacherFocus: string;
  priorityInterventions: string[];
}

export interface QuizQuestion {
  id: string;
  caseRef: string;
  question: string;
  scenario: string;
  options: { label: string; text: string; correct: boolean }[];
  explanation: string;
  category: string;
}
