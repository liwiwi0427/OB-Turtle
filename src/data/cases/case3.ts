import { ClinicalCase } from '../../types/megacode';
import { RAW_EXTRACTED_TEXTS } from '../rawExtractedTexts';

export const case3: ClinicalCase = {
  id: 'case-3',
  caseNumber: 3,
  title: '案例三：最近一直頭痛，是太累了嗎？',
  subtitle: '妊娠高血壓合併重度子癲前症 (Severe Preeclampsia)',
  category: 'hypertension',
  targetDiagnosis: '妊娠高血壓進展為重度子癲前症，合併中樞神經與肝功能受損危象',
  estimatedTimeMin: 15,
  difficulty: 'Intermediate',
  patientProfile: {
    age: 30,
    gravidaPara: 'G1P0',
    gestationalAge: '35+3 週',
    pastHistory: ['自然受孕', '無慢性高血壓史', '近兩日搏動性頭痛休息未緩解', '下肢與臉部嚴重浮腫'],
    chiefComplaint: '頭痛劇烈、看東西模糊、雙腳水腫嚴重，門診常規產檢血壓飆高',
    bmi: 28.5
  },
  phases: [
    {
      phaseNumber: 1,
      title: '第一階段：產檢門診評估與神經症狀識別',
      subtitle: '血壓 162/108 mmHg、視物模糊與深腱反射亢進',
      patientQuote: '這兩天一直頭痛，休息也沒有改善，昨天晚上看東西有點模糊，腳也比以前腫很多。',
      story: '30歲初產婦，35+3週至產檢門診。血壓高達 162/108 mmHg，下肢凹陷性水腫 3+。',
      vitals: {
        bp: '162/108',
        hr: 92,
        rr: 19,
        spo2: 98,
        temp: 36.7,
        fhr: 145,
        fhrPattern: 'Baseline 145 bpm, Moderate variability, 胎動尚可',
        uterineTension: '柔軟無宮縮',
        bleedingAmount: '無出血'
      },
      physicalExam: [
        '臉部眼眶周圍水腫，雙下肢凹陷性水腫 3+',
        '視網膜動脈充血痙攣，自述閃光暗點',
        '深腱反射 (DTR)：膝反射 3+ 伴隨踝部不自主抖動 (Clonus 2 beats)'
      ],
      questions: [
        {
          id: 'c3-q1',
          prompt: '患者血壓 162/108 mmHg，伴隨頭痛、視物模糊與 Clonus 陽性，臨床代表什麼病理警訊？',
          learningObjective: '辨別中樞神經易激性增高為子癲抽搐之先兆',
          options: [
            {
              id: 'c3-q1-a',
              text: '此為大腦血管痙攣與腦水腫導致的中樞神經系統過度興奮，極易誘發子癲症抽搐 (Impending Eclampsia)',
              isCorrect: true,
              scoreChange: 25,
              stabilityImpact: 15,
              explanation: '正確！頭痛、暗點與深腱反射亢進/踝陣攣是腦血管內皮病變及腦水腫指標，提示即將發生子癲抽搐。'
            },
            {
              id: 'c3-q1-b',
              text: '僅是一般孕期偏頭痛與電解質不足引起的下肢抽筋，開立普拿疼回家觀察',
              isCorrect: false,
              scoreChange: -25,
              stabilityImpact: -30,
              explanation: '嚴重錯誤！忽視神經症狀將導致患者在返家途中猝發子癲抽搐，危害母胎生命。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c3-admit',
          name: '立即安排住院轉入產房安靜暗室監護 (Quiet Room)',
          category: 'procedure',
          icon: 'Hospital',
          isAppropriate: true,
          stabilityDelta: 10,
          feedback: '減少光線與聲音刺激，降低誘發抽搐之風險。'
        },
        {
          id: 'act-c3-urinalysis',
          name: '急驗單次導尿尿蛋白與生化抽血',
          category: 'lab_diag',
          icon: 'FileText',
          isAppropriate: true,
          stabilityDelta: 10,
          feedback: '檢體送驗 CBC, AST, ALT, LDH, Cr, 尿蛋白定量。'
        }
      ]
    },
    {
      phaseNumber: 2,
      title: '第二階段：靶器官受累與實驗室確診',
      subtitle: '血小板消耗、蛋白尿 3+ 與上腹痛出現',
      patientQuote: '醫生，我心窩右上腹那邊好像有東西在勒緊，好痛……',
      story: '急驗報告回報：尿蛋白 3+、血小板下降至 105,000/μL、AST 95 U/L、ALT 102 U/L。產婦開始出現持續性右上腹痛。',
      vitals: {
        bp: '166/110',
        hr: 98,
        rr: 21,
        spo2: 97,
        temp: 36.8,
        fhr: 150,
        fhrPattern: 'Baseline 150 bpm, Minimal variability, 偶見早減',
        uterineTension: '張力輕微上升',
        bleedingAmount: '無出血'
      },
      labs: [
        { item: 'Urine Dipstick Protein', value: '3+', abnormal: true },
        { item: 'Platelet', value: '105,000', unit: '/μL', reference: '150,000-400,000', abnormal: true },
        { item: 'AST (GOT)', value: '95', unit: 'U/L', reference: '<40', abnormal: true },
        { item: 'ALT (GPT)', value: '102', unit: 'U/L', reference: '<40', abnormal: true },
        { item: 'Serum Creatinine', value: '1.3', unit: 'mg/dL', reference: '0.5-0.9', abnormal: true },
        { item: 'Serum Uric Acid', value: '7.8', unit: 'mg/dL', reference: '<5.5', abnormal: true }
      ],
      questions: [
        {
          id: 'c3-q2',
          prompt: '右上腹痛/心窩痛在重度子癲前症中代表什麼極端危險之器官病變？',
          learningObjective: '辨析肝細胞壞死、Glisson 肝被膜下血腫破裂之先兆',
          options: [
            {
              id: 'c3-q2-a',
              text: '代表肝臟小血管痙攣血栓導致肝細胞缺血壞死、Glisson 被膜受牽張，警惕肝破裂 (Hepatic Rupture)',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 20,
              explanation: '正確！右上腹心窩痛是子癲前症最凶險症狀之一，提示肝被膜下血腫或進行性肝梗塞。'
            },
            {
              id: 'c3-q2-b',
              text: '僅是一般孕期胃食道逆流 (GERD)，給予制酸劑即可',
              isCorrect: false,
              scoreChange: -25,
              stabilityImpact: -25,
              explanation: '錯誤！子癲前症患者的心窩痛切不可當作胃酸逆流，否則易漏診肝被膜破裂致失血休克。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c3-mgso4',
          name: '給予硫酸鎂 (MgSO4) 4-6g IV Loading 慢注 20 分鐘',
          category: 'medication',
          icon: 'ShieldAlert',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: '硫酸鎂已順利給予，並以 2 g/hr 靜脈幫浦持續維持！'
        },
        {
          id: 'act-c3-hydralazine',
          name: '靜脈注射 Hydralazine 5-10 mg 降壓',
          category: 'medication',
          icon: 'Pill',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '血壓平穩降至 146/92 mmHg，減低母體腦出血風險。'
        }
      ]
    },
    {
      phaseNumber: 3,
      title: '第三階段：促胎肺成熟與多專業評估',
      subtitle: '週數 35 週之處理策略與併發症預防',
      patientQuote: '血壓降下來以後，我的頭痛好多人了……但寶寶 35 週生出來會不會有問題？',
      story: '在硫酸鎂保護與血壓控制下，產婦神經症狀稍有緩解。週數為 35+3 週，需評估終止妊娠時機與胎兒肺部成熟度。',
      vitals: {
        bp: '144/92',
        hr: 88,
        rr: 18,
        spo2: 98,
        temp: 36.6,
        fhr: 140,
        fhrPattern: 'Baseline 140 bpm, Moderate variability, 無減速',
        uterineTension: '柔軟',
        bleedingAmount: '無'
      },
      questions: [
        {
          id: 'c3-q3',
          prompt: '對於懷孕 35+3 週之重度子癲前症產婦，在病情穩定後，國際準則推薦之分娩決策為何？',
          learningObjective: '掌握重度子癲前症於 34 週後之分娩指引',
          options: [
            {
              id: 'c3-q3-a',
              text: '孕週已滿 34 週且出現嚴重特徵，在給予類固醇促進胎肺成熟並穩定母體後，應適時終止妊娠分娩',
              isCorrect: true,
              scoreChange: 25,
              stabilityImpact: 20,
              explanation: '正確！ACOG 指引明訂：滿 34 週之重度子癲前症不建議長期保守治療，穩定後分娩可最大程度預防母體致命併發症。'
            },
            {
              id: 'c3-q3-b',
              text: '必須絕對安胎等待至滿 40 週預產期才可生產',
              isCorrect: false,
              scoreChange: -25,
              stabilityImpact: -30,
              explanation: '錯誤！子癲前症病情不可逆轉，盲目延長孕週常引發胎盤早剝、子癲抽搐或死胎。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c3-betamethasone',
          name: '肌肉注射 Betamethasone 12 mg (促胎肺成熟)',
          category: 'medication',
          icon: 'Sparkles',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '促進早產兒肺部表面活性物質 (Surfactant) 生成，減少 RDS 風險。'
        },
        {
          id: 'act-c3-foley',
          name: '放置 Foley 留置導尿管精確計算每小時尿量',
          category: 'procedure',
          icon: 'Activity',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '確保每小時尿量 >30 mL，防止硫酸鎂蓄積中毒。'
        }
      ]
    },
    {
      phaseNumber: 4,
      title: '第四階段：生產規劃與產後安全',
      subtitle: '產後持續硫酸鎂防抽搐與出院隨訪',
      patientQuote: '終於平安把寶寶生下來了！謝謝所有醫護人員！',
      story: '在引產監護下，產婦順利經陰道分娩一名 2480g 男嬰，Apgar 8→9 分。產後持續維持硫酸鎂點滴與降壓藥物。',
      vitals: {
        bp: '138/86',
        hr: 80,
        rr: 16,
        spo2: 99,
        temp: 36.6,
        fhr: 0,
        fhrPattern: '已生產',
        uterineTension: '收縮堅硬',
        bleedingAmount: '產後失血 300 mL'
      },
      questions: [
        {
          id: 'c3-q4',
          prompt: '產後使用硫酸鎂監控期間，若發現膝腱反射完全消失且呼吸 10 次/分，第一時間解毒劑與處置為何？',
          learningObjective: '掌握硫酸鎂急性中毒搶救程序',
          options: [
            {
              id: 'c3-q4-a',
              text: '立即關閉硫酸鎂點滴，靜脈慢注 10% 葡萄糖酸鈣 (Calcium Gluconate) 10 mL (1g)',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 25,
              explanation: '正確！鈣離子為鎂離子之特異性生理性拮抗劑，可即刻逆轉神經肌肉傳導阻滯與呼吸抑制。'
            },
            {
              id: 'c3-q4-b',
              text: '給予 Naloxone 解毒並繼續加大硫酸鎂劑量',
              isCorrect: false,
              scoreChange: -25,
              stabilityImpact: -30,
              explanation: '錯誤！Naloxone 為鴉片類解毒劑，對硫酸鎂中毒無效。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c3-calcium',
          name: '床邊常備 10% Calcium Gluconate 解毒針劑',
          category: 'emergency',
          icon: 'ShieldCheck',
          isAppropriate: true,
          stabilityDelta: 10,
          feedback: '床邊解毒盒確認備妥，提供最高安全防護。'
        }
      ]
    }
  ],
  teacherGuide: {
    reasoningSteps: [
      {
        stepNumber: 1,
        title: '區分高血壓分類',
        clues: ['妊娠 35 週新發高血壓 162/108', '既往無慢性高血壓史'],
        reasoningPath: ['20 週後新發高血壓 → 妊娠高血壓或子癲前症'],
        conclusion: '需進一步檢查蛋白尿與靶器官功能'
      },
      {
        stepNumber: 2,
        title: '識別嚴重特徵 (Severe Features)',
        clues: ['持續頭痛/視物模糊', '蛋白尿 3+', '右上腹心窩痛', '血小板 10.5 萬', 'ALT/AST 上升'],
        reasoningPath: ['符合收縮壓 ≥160 或舒張壓 ≥110、神經症狀、肝功能受損、血小板低下'],
        conclusion: '確立診斷：重度子癲前症 (Preeclampsia with severe features)'
      },
      {
        stepNumber: 3,
        title: '預防痙攣與控制腦血管灌注',
        clues: ['深反射 3+ 伴 Clonus 陽性'],
        reasoningPath: ['中樞神經系統充血水腫易觸發癲癇樣大發作'],
        conclusion: '首選硫酸鎂 (MgSO4) 行神經保護與降壓治療'
      },
      {
        stepNumber: 4,
        title: '時機評估與終止妊娠',
        clues: ['孕週 35+3 週 (>34 週)', '母體病情有惡化風險'],
        reasoningPath: ['促胎肺成熟後，適時終止妊娠是防止母體肝破裂、腦出血與胎盤早剝之根治措施'],
        conclusion: '病情穩定後分娩，產後維持 MgSO4 24 小時'
      }
    ],
    maternalClues: ['血壓 ≥160/110 mmHg', '神經系統症狀（頭痛、視物暗點）', '右上腹心窩痛（肝被膜受牽張）', '血小板消耗、肌酸酐升高', '膝腱反射亢進 (3+) 伴踝陣攣'],
    fetalClues: ['胎兒可能伴隨生長受限 (FGR)', '變異度微小 (Minimal variability)', '長期需防範急性胎盤剝離'],
    maternalFetalCorrelation: '母體廣泛性血管內皮細胞受損導致全身動脈痙攣與漏出，造成腦水腫（抽搐前兆）、肝水腫（心窩痛）、腎小球內皮腫脹（蛋白尿）以及胎盤缺血。',
    osceStations: [
      {
        stationNumber: 1,
        stationTitle: '深腱反射 (DTR) 與踝陣攣 (Clonus) 實體檢驗站',
        taskPrompt: '請考生使用叩診槌演練正確的髕骨反射敲擊法，並示範如何檢查踝陣攣 (Ankle Clonus)。',
        keyPoints: ['放鬆受檢肢體', '敲擊髕骨韌帶觀察跳動幅度 (0-4+)', '快速背屈足踝維持壓力，感受節律性跳動 (>2次為陽性)'],
        sampleModelAnswer: '支撐病人膝窩使下肢自然放鬆，快速叩擊髕韌帶；隨後快速推壓足底背屈並保持，若出現連續 2 次以上跳動即為踝陣攣陽性，代表上運動神經元受刺激亢進。'
      },
      {
        stationNumber: 2,
        stationTitle: '硫酸鎂滴定與每小時安全查核站',
        taskPrompt: '列出護理人員每小時監測的三大客觀生理數值與中止給藥之標準。',
        keyPoints: ['膝反射存在', '呼吸次數 ≥12 次/分', '尿量每小時 ≥30 mL'],
        sampleModelAnswer: '每小時記錄：深部肌腱反射（若消失為早期中毒，停藥）、呼吸速率（<12次/分提示呼吸肌受累，停藥）、每小時尿量（<30 mL/hr 提示排泄障礙，停藥或減量）。'
      },
      {
        stationNumber: 3,
        stationTitle: '葡萄糖酸鈣 (Calcium Gluconate) 搶救注射站',
        taskPrompt: '口述硫酸鎂中毒之解毒藥物、濃度、劑量與推注時間。',
        keyPoints: ['10% Calcium Gluconate', '10 mL (1.0 g)', '緩慢靜脈注射 3-5 分鐘以上'],
        sampleModelAnswer: '使用 10% 葡萄糖酸鈣 10 mL (相當於 1g)，以靜脈緩慢推注至少 3 分鐘，不可過快以免引起心律不整或心搏驟停。'
      },
      {
        stationNumber: 4,
        stationTitle: '重度高血壓靜脈降壓藥階梯站',
        taskPrompt: '比較 Labetalol 與 Hydralazine 之起始劑量、給藥間隔及氣喘禁忌。',
        keyPoints: ['Labetalol: 20mg IV 緩注，間隔 10-20 分加倍 (40, 80mg)，氣喘病史禁用', 'Hydralazine: 5-10mg IV 緩注，間隔 20 分鐘'],
        sampleModelAnswer: 'Labetalol 為 α/β 阻斷劑，首劑 20mg IV，若未達標每 10-20 分鐘給 40mg、80mg；有氣喘或嚴重心動過緩者禁用。此時改用 Hydralazine 5-10mg IV。'
      },
      {
        stationNumber: 5,
        stationTitle: '產後 48 小時子癲警覺站',
        taskPrompt: '說明為何生產後 24-48 小時仍不可放鬆警惕，需衛教產婦注意哪些出院前警訊。',
        keyPoints: ['約三分之一子癲抽搐發生於產後', '血管外水份回流循環加重心臟與腦血管負荷', '警惕產後劇烈頭痛、噁心嘔吐與視力異常'],
        sampleModelAnswer: '胎盤娩出後血管外液體大量回流血管腔，常引起血壓再度反彈與腦水腫；約 30% 子癲發生於產後。必須維持點滴 MgSO4 24 小時並加強衛教。'
      }
    ],
    takeawayTable: [
      { clue: '血壓 ≥160/110 mmHg 伴神經症狀', focus: '符合重度子癲前症，首要預防中樞抽搐' },
      { clue: '右上腹痛/心窩痛', focus: '肝被膜腫脹壞死警訊，警惕肝破裂' },
      { clue: '深反射亢進 3+ 伴踝陣攣', focus: '中樞神經易激性指標，預示抽搐即將發生' },
      { clue: '硫酸鎂中毒三大徵兆', focus: '膝反射消失 → 呼吸抑制 (<12) → 心臟停搏' },
      { clue: '硫酸鎂特異性解毒劑', focus: '10% Calcium Gluconate 10 mL IV 緩注' }
    ],
    pathophysiologySummary: '胎盤灌流不足引發抗血管生成因子 (sFlt-1, Endoglin) 釋放入血 → 全身血管內皮功能障礙 → 全身毛細血管通透性增加與血管痙攣 → 腦水腫 (頭痛、抽搐)、肝壞死被膜牽張 (心窩痛)、腎小球內皮病變 (蛋白尿、高肌酸酐) → 多器官衰竭。',
    injections: [
      {
        id: 'inj-c3-eclampsia',
        title: '突發危機注入：安靜病室內產婦突然全身抽搐 (Eclampsia)',
        description: '導師注入：產婦突然尖叫一聲、意識喪失、四肢強直陣攣抽搐！',
        vitalsOverride: {
          bp: '190/120',
          hr: 140,
          spo2: 82,
          fhr: 75,
          fhrPattern: 'Severe bradycardia'
        },
        newSituationPrompt: '病室警報大作！產婦突發子癲大發作，牙關緊咬，呼吸暫停！',
        requiredActionPrompt: '現場人員第一步物理急救與藥物急救為何？',
        correctResponse: '立即將病患頭轉向一側防吸入性窒息，清除口鼻分泌物，給予面罩高濃度氧氣，嚴禁強行撬牙；靜脈追加硫酸鎂 2g 緩注，抽搐平息後立即送開刀房剖腹產！'
      }
    ]
  },
  rawContent: RAW_EXTRACTED_TEXTS['case_3'] || ''
};
