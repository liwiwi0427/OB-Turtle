import { ClinicalCase } from '../../types/megacode';
import { RAW_EXTRACTED_TEXTS } from '../rawExtractedTexts';

export const case5: ClinicalCase = {
  id: 'case-5',
  caseNumber: 5,
  title: '案例五：寶寶怎麼比預期還大？',
  subtitle: '妊娠糖尿病 (Gestational Diabetes Mellitus, GDM)',
  category: 'diabetes_abruption',
  targetDiagnosis: '妊娠糖尿病 (GDM) 導致胎兒高胰島素血症、巨大兒與羊水過多',
  estimatedTimeMin: 12,
  difficulty: 'Beginner',
  patientProfile: {
    age: 29,
    gravidaPara: 'G1P0',
    gestationalAge: '30+2 週',
    pastHistory: ['孕前 BMI 29 kg/m²', '家族有第二型糖尿病史', '多飲、多尿、體重近一個月暴增 4.5 公斤'],
    chiefComplaint: '例行產檢發現胎兒腹圍遠大於孕週，產婦常感口渴頻尿',
    bmi: 31.0
  },
  phases: [
    {
      phaseNumber: 1,
      title: '第一階段：門診產檢與臨床線索收集',
      subtitle: '多飲多尿、體重激增與宮高超標',
      patientQuote: '最近很容易口渴，一直想喝冰水，晚上都要起床尿好幾次，而且最近胖得特別快。',
      story: '29歲初產婦，30+2週接受例行產檢。測量恥骨聯合至宮底高度 (SFH) 達 34 cm（超前近 4 週）。',
      vitals: {
        bp: '122/76',
        hr: 78,
        rr: 16,
        spo2: 99,
        temp: 36.5,
        fhr: 142,
        fhrPattern: 'Baseline 142 bpm, Reactive NST, Acceleration 良好',
        uterineTension: '柔軟，宮腔容積膨大',
        bleedingAmount: '無出血'
      },
      physicalExam: [
        '雙下肢輕微水腫 1+',
        '腹部膨隆明顯，羊水震盪感明顯',
        'SFH 34 cm, 腹圍 102 cm'
      ],
      questions: [
        {
          id: 'c5-q1',
          prompt: '產婦具備孕前過重、家族糖尿病史、多飲多尿及宮高超標，首選之標準確診篩檢為？',
          learningObjective: '掌握 75g 口服葡萄糖耐量試驗 (OGTT) 診斷指引',
          options: [
            {
              id: 'c5-q1-a',
              text: '進行一站式 75g 口服葡萄糖耐量試驗 (75g OGTT，測空腹、1小時、2小時血糖)',
              isCorrect: true,
              scoreChange: 25,
              stabilityImpact: 10,
              explanation: '正確！IADPSG 與 WHO 標準推薦於 24-28 週（或高危險群於首診/孕晚期）進行 75g OGTT，三項中有一項超標即確診 GDM。'
            },
            {
              id: 'c5-q1-b',
              text: '單驗一次隨機指尖血糖即可，不需要空腹抽血',
              isCorrect: false,
              scoreChange: -15,
              stabilityImpact: -10,
              explanation: '錯誤！隨機血糖受進食影響極大，不能作為 GDM 正式確診標準。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c5-ogtt',
          name: '排程 75g 口服葡萄糖耐量試驗 (75g OGTT)',
          category: 'lab_diag',
          icon: 'FileSpreadsheet',
          isAppropriate: true,
          stabilityDelta: 10,
          feedback: '囑咐產婦空腹 8 小時以上，安排抽空腹血後飲用糖水。'
        }
      ]
    },
    {
      phaseNumber: 2,
      title: '第二階段：OGTT 報告與超音波判讀',
      subtitle: '診斷確立、巨大兒 (Macrosomia) 與羊水過多 (Polyhydramnios)',
      patientQuote: '醫生，超音波量出來寶寶居然已經有 2100 公克了？現在才 30 週耶！',
      story: '75g OGTT 結果出爐：空腹 104 mg/dL、1小時 208 mg/dL、2小時 175 mg/dL（三項全部超標！）。超音波顯示羊水指數 AFI 達 25 cm。',
      vitals: {
        bp: '124/78',
        hr: 80,
        rr: 16,
        spo2: 99,
        temp: 36.6,
        fhr: 144,
        fhrPattern: 'Baseline 144 bpm, Reactive',
        uterineTension: '柔軟膨大',
        bleedingAmount: '無出血'
      },
      labs: [
        { item: 'Fasting Glucose (空腹)', value: '104', unit: 'mg/dL', reference: '<92', abnormal: true },
        { item: '1-Hour Glucose', value: '208', unit: 'mg/dL', reference: '<180', abnormal: true },
        { item: '2-Hour Glucose', value: '175', unit: 'mg/dL', reference: '<153', abnormal: true },
        { item: 'HbA1c', value: '6.8%', reference: '<6.0%', abnormal: true }
      ],
      diagnosticImaging: {
        type: '產科詳細超音波掃描',
        findings: '胎兒預估體重 (EFW) 2100g (>97th percentile)。腹圍 (AC) 顯著突出。羊水最大垂直池 (MVP) 8.5 cm，AFI 25 cm。',
        details: '母體高血糖通過胎盤 → 刺激胎兒胰島過度分泌胰島素 → 促進脂肪與肝臟蛋白質堆積及高滲透性利尿（羊水過多）。'
      },
      questions: [
        {
          id: 'c5-q2',
          prompt: '為何母體高血糖會導致胎兒腹圍超前（巨大兒）以及羊水過多？',
          learningObjective: '理解 Pedersen 假說：母體高血糖致胎兒高胰島素血症與滲透性利尿機制',
          options: [
            {
              id: 'c5-q2-a',
              text: '葡萄糖自由穿過胎盤使胎兒胰島素分泌飆升（如同生長激素促使脂肪囤積），且胎兒利尿增加形成羊水過多',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 15,
              explanation: '正確！胎兒胰島素是宮內強效促生長因子，導致胎兒肩部及軀幹脂肪沉積（易難產），胎尿增多引起羊水過多。'
            },
            {
              id: 'c5-q2-b',
              text: '是因為母體胰島素穿過胎盤進入胎兒體內所致',
              isCorrect: false,
              scoreChange: -20,
              stabilityImpact: -15,
              explanation: '病理生理學概念錯誤！母體胰島素分子量大無法通過胎盤，高血糖才是穿過胎盤的元凶！'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c5-diet-counsel',
          name: '會診營養師啟動醫學營養治療 (MNT) 與居家血糖自我監測 (SMBG)',
          category: 'procedure',
          icon: 'Apple',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '建立每日四次血糖監測紀錄（空腹與三餐後 2 小時）。'
        }
      ]
    },
    {
      phaseNumber: 3,
      title: '第三階段：控糖達標評估與藥物啟動',
      subtitle: '飲食控制後血糖依然不達標，啟動胰島素治療',
      patientQuote: '我這兩週吃得很清淡，但飯後測血糖常常還是 150-160……',
      story: '嚴格飲食控制與散步運動 2 週後，追蹤血糖日誌：空腹平均 105 mg/dL，餐後 2 小時平均 152 mg/dL，未達目標值。',
      vitals: {
        bp: '120/74',
        hr: 76,
        rr: 16,
        spo2: 99,
        temp: 36.5,
        fhr: 140,
        fhrPattern: 'Baseline 140 bpm, Reactive',
        uterineTension: '柔軟',
        bleedingAmount: '無'
      },
      questions: [
        {
          id: 'c5-q3',
          prompt: 'GDM 經生活型態調整 1-2 週後血糖仍超標，國際產科指引推薦的第一線藥物治療為何？',
          learningObjective: '掌握妊娠期糖尿病藥物首選為不通過胎盤之胰島素 (Insulin)',
          options: [
            {
              id: 'c5-q3-a',
              text: '胰島素注射治療 (Insulin Therapy)，因其不通過胎盤且降糖療效最確切',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 20,
              explanation: '正確！胰島素不穿透胎盤，為 GDM 降血糖的黃金標準首選藥物。'
            },
            {
              id: 'c5-q3-b',
              text: '口服磺醯尿素類 (Sulfonylurea) 強效降糖藥',
              isCorrect: false,
              scoreChange: -20,
              stabilityImpact: -20,
              explanation: '錯誤！某些口服降血糖藥物可穿透胎盤，可能引發新生兒持久嚴重低血糖。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c5-start-insulin',
          name: '衛教並開立基礎-餐時胰島素皮下注射方案',
          category: 'medication',
          icon: 'Syringe',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: '產婦熟練掌握筆型胰島素皮下注射與低血糖自救技巧。'
        }
      ]
    },
    {
      phaseNumber: 4,
      title: '第四階段：足月生產規劃與新生兒併發症防範',
      subtitle: '肩難產 (Shoulder Dystocia) 與新生兒低血糖預防',
      patientQuote: '醫生，寶寶這麼大，如果自然產卡住怎麼辦？',
      story: '孕 38+5 週，胎兒預估體重達 4150g。醫療團隊召開產前討論會，詳細評估生產途徑與兒科交班。',
      vitals: {
        bp: '126/80',
        hr: 82,
        rr: 18,
        spo2: 99,
        temp: 36.6,
        fhr: 140,
        fhrPattern: 'Baseline 140 bpm, Category I',
        uterineTension: '柔軟',
        bleedingAmount: '無'
      },
      questions: [
        {
          id: 'c5-q4',
          prompt: '糖尿病產婦若胎兒預估體重 (EFW) ≥4500g（或 ACOG 部分指引 ≥4000-4200g），陰道分娩最大的機械性風險為何？',
          learningObjective: '預防高危肩難產與臂神經叢損傷 (Erb palsy)',
          options: [
            {
              id: 'c5-q4-a',
              text: '肩難產 (Shoulder Dystocia) 導致胎兒窒息、鎖骨骨折或臂神經叢損傷 (Erb palsy)，應充分諮詢剖腹產效益',
              isCorrect: true,
              scoreChange: 25,
              stabilityImpact: 20,
              explanation: '正確！GDM 胎兒脂肪不成比例沉積於肩部與胸圍，胎頭娩出後前肩極易嵌頓於恥骨聯合後方。'
            },
            {
              id: 'c5-q4-b',
              text: '胎兒呼吸窘迫率為零，自然分娩絕對無任何風險',
              isCorrect: false,
              scoreChange: -25,
              stabilityImpact: -25,
              explanation: '嚴重錯誤！GDM 胎兒高胰島素會延緩肺泡表面活性物質合成，肩難產與呼吸窘迫風險皆大幅增加。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c5-delivery-plan',
          name: '擬定安全生產計畫，向產婦解說剖腹產與陰道分娩之肩難產風險利弊',
          category: 'procedure',
          icon: 'FileCheck',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '產婦充分知情後選擇安全分娩路徑，新生兒科團隊進駐待命。'
        }
      ]
    }
  ],
  teacherGuide: {
    reasoningSteps: [
      {
        stepNumber: 1,
        title: '臨床線索提示代謝異常',
        clues: ['多飲多尿', '體重暴增', '宮高超前 4 cm', '高危因子 (BMI 29、家族史)'],
        reasoningPath: ['妊娠期胎盤荷爾蒙 (HPL、皮質醇) 拮抗胰島素作用 → 出現妊娠糖尿病'],
        conclusion: '首選 75g OGTT 確診'
      },
      {
        stepNumber: 2,
        title: 'OGTT 確診與超音波雙重驗證',
        clues: ['空腹 104、1h 208、2h 175', 'EFW >97th', '羊水過多 AFI 25'],
        reasoningPath: ['高血糖過胎盤刺激胎兒高胰島素 → 巨大兒 + 利尿羊水過多'],
        conclusion: '診斷確立：妊娠糖尿病 (GDM)'
      },
      {
        stepNumber: 3,
        title: '生活控制失敗轉向胰島素',
        clues: ['飲食控制 2 週餐後血糖仍 >140 mg/dL'],
        reasoningPath: ['高血糖若不積極控制將加重胎兒缺氧與難產'],
        conclusion: '及早啟動不通過胎盤之胰島素治療'
      },
      {
        stepNumber: 4,
        title: '分娩期與產後併發症預防',
        clues: ['足月巨大兒', '高胰島素儲備'],
        reasoningPath: ['產時防肩難產；產後斷臍後防新生兒嚴重低血糖與肺不成熟'],
        conclusion: '出生後早期餵食與血糖密集追蹤'
      }
    ],
    maternalClues: ['三多症狀 (口渴、多飲、多尿)', '體重迅速飆升', '產檢 SFH 宮底高度超標', '75g OGTT 三數值皆過高'],
    fetalClues: ['超音波腹圍 (AC) 顯著大於雙頂徑 (BPD)', '預估體重超出 97 百分位 (Macrosomia)', '羊水指數過多 (AFI ≥24-25 cm)'],
    maternalFetalCorrelation: '母體葡萄糖順濃度梯度穿過胎盤，刺激胎兒胰島過度肥大分泌大量胰島素；胰島素促成軀幹脂肪暴增（巨大兒肩難產因子），並促使胎兒排尿增加（羊水過多）。',
    osceStations: [
      {
        stationNumber: 1,
        stationTitle: '75g OGTT 衛教與診斷標準站',
        taskPrompt: '口述 75g OGTT 檢查步驟及空腹、1hr、2hr 診斷閥值 (IADPSG 準則)。',
        keyPoints: ['空腹 8-10 小時', '空腹 <92 mg/dL', '1 小時 <180 mg/dL', '2 小時 <153 mg/dL', '任一項超標即可診斷 GDM'],
        sampleModelAnswer: '檢查前需空腹 8-10 小時；喝下 75g 糖水後於 1 小時及 2 小時抽血。診斷閥值分別為：空腹 92、1小時 180、2小時 153 mg/dL；只要其中一項達到或超過即可確立診斷。'
      },
      {
        stationNumber: 2,
        stationTitle: 'GDM 自我血糖監測 (SMBG) 控制目標站',
        taskPrompt: '列出 ACOG 建議 GDM 孕婦之空腹、餐後 1 小時及餐後 2 小時血糖標準。',
        keyPoints: ['空腹血糖 ≤95 mg/dL', '餐後 1 小時 ≤140 mg/dL', '餐後 2 小時 ≤120 mg/dL'],
        sampleModelAnswer: '空腹血糖控制在 95 mg/dL 以下；餐後 1 小時在 140 mg/dL 以下；餐後 2 小時在 120 mg/dL 以下。若未達標需啟動藥物治療。'
      },
      {
        stationNumber: 3,
        stationTitle: '巨大兒肩難產 HELPERR 口訣站',
        taskPrompt: '口述肩難產急救 HELPERR 口訣各字母意義。',
        keyPoints: ['H: Help 呼救', 'E: Evaluate for episiotomy 評估會陰切開', 'L: Legs (McRoberts 手法)', 'P: Pressure 恥骨上加壓', 'E: Enter maneuvers 旋轉手法', 'R: Remove posterior arm 娩出後臂', 'R: Roll onto all fours 四肢著地'],
        sampleModelAnswer: 'H 呼叫團隊；E 評估切開；L 雙腿屈曲 McRoberts；P 恥骨上方加壓；E 陰道內旋轉手法；R 娩出後臂；R 產婦翻轉四肢著地。'
      },
      {
        stationNumber: 4,
        stationTitle: '新生兒低血糖預防與監測站',
        taskPrompt: '說明為何 GDM 嬰兒易低血糖，護理人員應於出生後多久首測血糖及處置標準。',
        keyPoints: ['母體葡萄糖來源中斷而高胰島素血症持續', '出生 30-60 分鐘內首測血糖', '血糖 <40 mg/dL (首4小時) 或 <45 mg/dL 需即刻餵奶或靜脈注糖'],
        sampleModelAnswer: '斷臍後來自母體的糖分突然消失，但寶寶胰島素依然極高，造成血糖暴跌。生後 30-60 分鐘內首測血糖，若低於 40 mg/dL 應立即初乳餵食，若餵食無效或有抽搐嗜睡症狀，立即靜脈注射 10% 葡萄糖。'
      },
      {
        stationNumber: 5,
        stationTitle: '產後 6-12 週糖尿病再評估衛教站',
        taskPrompt: '向產婦衛教產後隨訪的重要性，產後多久應再次進行葡萄糖耐量試驗？',
        keyPoints: ['GDM 產婦未來 10-20 年罹患第二型糖尿病風險高達 50%', '產後 6-12 週回診行 75g OGTT 重新分類', '終身維持健康體重與生活習慣'],
        sampleModelAnswer: '胎盤娩出後血糖通常恢復正常，但產婦日後患第 2 型糖尿病機率高達 50%。務必在產後 6-12 週回門診再次做 75g OGTT 檢驗，並維持規律運動與體重控制。'
      }
    ],
    takeawayTable: [
      { clue: '75g OGTT (92/180/153 mg/dL)', focus: '一項達標即確診 GDM' },
      { clue: 'EFW >97th + AFI 25 cm', focus: '胎兒高胰島素血症與滲透性利尿之典型外在表徵' },
      { clue: '飲食運動控糖目標', focus: '空腹 ≤95、餐後 1h ≤140、餐後 2h ≤120 mg/dL' },
      { clue: '藥物第一線首選', focus: '胰島素 (Insulin) 不通過胎盤，最為安全確切' },
      { clue: '新生兒期致命代謝危象', focus: '高胰島素誘發之急驟低血糖 (<40 mg/dL)' }
    ],
    pathophysiologySummary: '胎盤分泌生乳素 (HPL)、孕酮等抗胰島素激素 → 母體胰島素阻抗增加 → 胰島代償分泌不足致高血糖 (GDM) → 葡萄糖越過胎盤 → 胎兒高血糖刺激胰島 β 細胞肥大 → 胎兒高胰島素血症 → 促進合成巨大兒與胎尿增加羊水過多。',
    injections: [
      {
        id: 'inj-c5-hypo',
        title: '突發危機注入：巨大男嬰出生 40 分鐘突發嗜睡與抖動',
        description: '導師注入：新生兒室通報：嬰兒四肢發冷微抖、肌張力低下、哭聲微弱！',
        vitalsOverride: {
          hr: 110,
          temp: 35.8
        },
        newSituationPrompt: '兒科警報：產婦所生之 4100g 嬰兒出生 40 分鐘，末梢血糖僅 24 mg/dL！',
        requiredActionPrompt: '新生兒科第一步急救注射劑量為何？',
        correctResponse: '立即建立靜脈管路，靜脈緩注 10% 葡萄糖 (D10W) 2 mL/kg，隨後以 6-8 mg/kg/min 持續靜脈滴注維持血糖 ≥45-50 mg/dL！'
      }
    ]
  },
  rawContent: RAW_EXTRACTED_TEXTS['case_5'] || ''
};
