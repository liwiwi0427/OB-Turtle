import { ClinicalCase } from '../../types/megacode';
import { RAW_EXTRACTED_TEXTS } from '../rawExtractedTexts';

export const case2: ClinicalCase = {
  id: 'case-2',
  caseNumber: 2,
  title: '案例二：寶寶的心跳怎麼一直下降？',
  subtitle: '胎兒窘迫與胎心音異常 (Fetal Distress / NRFS)',
  category: 'fetal_distress',
  targetDiagnosis: '催產素引產引起子宮過度刺激 (Tachysystole)，導致胎心反覆晚期減速與急性胎兒窘迫',
  estimatedTimeMin: 15,
  difficulty: 'Beginner',
  patientProfile: {
    age: 28,
    gravidaPara: 'G1P0',
    gestationalAge: '39+4 週',
    pastHistory: ['規律產檢', '無慢性高血壓或糖尿病', '子宮頸開 4 cm 進入第一產程活躍期'],
    chiefComplaint: '規律陣痛待產中，接受 Oxytocin 引產，胎心率突然頻繁驟降',
    bmi: 24.5
  },
  phases: [
    {
      phaseNumber: 1,
      title: '第一階段：待產監測與初期評估',
      subtitle: '正常待產進入活躍期，評估宮縮與基線',
      patientQuote: '陣痛越來越強了，護理師，寶寶心跳監測器好像一直在叫？',
      story: '28歲初產婦，39+4週，因產程進展稍慢給予 Oxytocin 點滴引產。目前子宮頸擴張 4 cm，薄化 80%，胎頭先露 -1。',
      vitals: {
        bp: '118/72',
        hr: 82,
        rr: 18,
        spo2: 99,
        temp: 36.6,
        fhr: 140,
        fhrPattern: 'Baseline 140 bpm, Moderate variability (6-25 bpm), 有定期 Acceleration',
        uterineTension: '宮縮每 3-4 分鐘一次，持續 45 秒，張力適中',
        bleedingAmount: '少量黏稠粉紅落紅'
      },
      physicalExam: [
        '子宮底收縮間歇期放鬆良好',
        '人工破水檢視：羊水呈現清澈 (Clear fluid)',
        '母體自覺呼吸平順，生命徵象穩定'
      ],
      questions: [
        {
          id: 'c2-q1',
          prompt: '目前 NST 圖譜 Baseline 140 bpm、Moderate variability 且伴隨正常加速，屬 NICHD 分級的哪一類？',
          learningObjective: '掌握 NICHD Category I 正常胎心監測標準',
          options: [
            {
              id: 'c2-q1-a',
              text: 'Category I（正常）：胎兒酸鹼平衡良好，無需特殊醫療介入，持續常規待產監測',
              isCorrect: true,
              scoreChange: 20,
              stabilityImpact: 10,
              explanation: '正確！Category I 標準具備基線 110-160、中度變異度、無晚期/變異減速，預測胎兒臍血正常。'
            },
            {
              id: 'c2-q1-b',
              text: 'Category II（未確定）：需立即給予 Terbutaline 抑制宮縮',
              isCorrect: false,
              scoreChange: -15,
              stabilityImpact: -10,
              explanation: '錯誤！當前為標準 Category I 正常圖形，給予宮縮抑制劑會中斷正常產程。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-monitor-cont',
          name: '持續外胎心音與宮縮壓力計監控 (Continuous EFM)',
          category: 'procedure',
          icon: 'Activity',
          isAppropriate: true,
          stabilityDelta: 5,
          feedback: '保持超音波探頭塗抹凝膠並固定良好。'
        }
      ]
    },
    {
      phaseNumber: 2,
      title: '第二階段：宮縮過頻與變異減速',
      subtitle: 'Oxytocin 調速後引發子宮過度刺激 (Tachysystole)',
      patientQuote: '痛得停不下來了！一次痛還沒過去，下一次痛又來了！',
      story: 'Oxytocin 滴速調升後，宮縮在 10 分鐘內發作達 6 次。NST 顯示每次宮縮時胎心均驟降至 85 bpm，波形陡峭呈 V 字型。',
      vitals: {
        bp: '124/78',
        hr: 94,
        rr: 22,
        spo2: 98,
        temp: 36.7,
        fhr: 110,
        fhrPattern: 'Baseline 135 bpm, 每次宮縮出現 Variable Deceleration 降至 85 bpm，波形陡降陡升',
        uterineTension: '宮縮過頻 (Tachysystole: 10 分鐘內 >5 次)，間歇期不足 60 秒',
        bleedingAmount: '少量落紅'
      },
      questions: [
        {
          id: 'c2-q2',
          prompt: '10 分鐘內宮縮超過 5 次伴隨變異減速 (Variable Decelerations)，首要護理動作與機轉判定為何？',
          learningObjective: '辨識子宮過度刺激與臍帶受壓之應急處理',
          options: [
            {
              id: 'c2-q2-a',
              text: '此為產程進展良好徵象，應再加倍 Oxytocin 滴速以加快開指',
              isCorrect: false,
              scoreChange: -30,
              stabilityImpact: -35,
              explanation: '極度危險！Tachysystole 導致胎盤血流無法在間歇期灌流充血，加倍催產素會迅速造成胎兒窒息！'
            },
            {
              id: 'c2-q2-b',
              text: '立即關閉/調降 Oxytocin，協助產婦左側臥或膝胸臥位，面罩給氧，解除臍帶壓迫與過度刺激',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 20,
              explanation: '正確！Variable decel 乃臍帶受壓迷走反射；Tachysystole 必須第一時間關閉 Oxytocin！'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-stop-pitocin',
          name: '立即停滴催產素 (Turn OFF Oxytocin)',
          category: 'medication',
          icon: 'OctagonAlert',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: '催產素立即停止！子宮痙攣張力開始趨緩。'
        },
        {
          id: 'act-left-reposition',
          name: '變換體位為左側臥/膝胸臥位 (Reposition)',
          category: 'position',
          icon: 'RotateCcw',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '改變體位後解除了臍帶在骨盆與胎體間的直接夾擠！'
        }
      ]
    },
    {
      phaseNumber: 3,
      title: '第三階段：晚期減速與變異度消失',
      subtitle: '胎盤灌流衰竭，進展為 Category III 窘迫',
      patientQuote: '護士小姐……我怎麼覺得肚子發冷？寶寶現在還好嗎？',
      story: '儘管已停用 Oxytocin，但宮縮高峰後胎心率反覆出現晚期減速 (Late Deceleration)，心跳最低掉至 75 bpm，變異度轉為 Minimal (<5 bpm)。',
      vitals: {
        bp: '130/84',
        hr: 104,
        rr: 24,
        spo2: 97,
        temp: 36.8,
        fhr: 100,
        fhrPattern: 'Baseline 160 bpm, Minimal variability, 反覆 Late Deceleration 延遲回升',
        uterineTension: '宮縮間歇期張力仍偏高',
        bleedingAmount: '清澈羊水轉為濃稠黃綠色（胎便染色 Meconium staining!）'
      },
      questions: [
        {
          id: 'c2-q3',
          prompt: '胎心出現反覆晚期減速 (Late Decels) 併羊水胎便染色 (Meconium Stained Liquor)，且子宮仍緊繃，藥物宮內復甦首選為何？',
          learningObjective: '急症宮內復甦之子宮弛緩劑 (Tocolytic) 應用',
          options: [
            {
              id: 'c2-q3-a',
              text: '皮下注射 Terbutaline 0.25 mg 迅速放鬆子宮肌層，配合靜脈快速輸注 500-1000 mL 乳酸林格氏液',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 20,
              explanation: '正確！Terbutaline (β2 agonist) 可在 2-3 分鐘內放鬆子宮肌層，給予胎盤血管重灌流之黃金時間。'
            },
            {
              id: 'c2-q3-b',
              text: '給予 Atropine 加快母體心跳，不需要放鬆子宮',
              isCorrect: false,
              scoreChange: -20,
              stabilityImpact: -25,
              explanation: '錯誤！病因在於子宮張力過高阻斷絨毛間隙血流，非母體心搏過慢。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-terbutaline',
          name: '皮下注射 Terbutaline 0.25 mg SC',
          category: 'medication',
          icon: 'Zap',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: 'Terbutaline 迅速起效，子宮過度收縮獲得解除！'
        },
        {
          id: 'act-iv-bolus',
          name: "快速輸注 Ringer's Lactate 500 mL IV bolus",
          category: 'procedure',
          icon: 'Droplet',
          isAppropriate: true,
          stabilityDelta: 10,
          feedback: '母體循環血容擴增，提升心輸出量與子宮動脈灌注壓。'
        }
      ]
    },
    {
      phaseNumber: 4,
      title: '第四階段：復甦評估與決定性分娩',
      subtitle: '宮內復甦失敗，緊急轉入手術室剖腹產',
      patientQuote: '只要寶寶平安，我願意馬上開刀！請快點救救他！',
      story: '經過 15 分鐘完整宮內復甦處置，晚期減速依然持續出現，內診子宮頸僅開 5 cm，無法短時間經陰道娩出。醫療團隊啟動緊急剖腹產。',
      vitals: {
        bp: '120/76',
        hr: 90,
        rr: 18,
        spo2: 99,
        temp: 36.7,
        fhr: 0,
        fhrPattern: '胎兒已透過剖腹產順利娩出',
        uterineTension: '術中宮縮良好',
        bleedingAmount: '術中失血 400 mL'
      },
      questions: [
        {
          id: 'c2-q4',
          prompt: '經過積極宮內復甦 15 分鐘無效，產程進展評估為子宮頸僅擴張 5 cm，決定性處置決策為何？',
          learningObjective: '掌握 Category III 胎心音無法逆轉時的 30 分鐘緊急剖腹產 (Decision-to-delivery) 準則',
          options: [
            {
              id: 'c2-q4-a',
              text: '繼續給予高劑量催產素觀察 4 小時，等待自然分娩',
              isCorrect: false,
              scoreChange: -35,
              stabilityImpact: -40,
              explanation: '致死錯誤！Category III 伴酸中毒耐受時間有限，繼續等待自然產必然造成腦性麻痺或胎死宮內！'
            },
            {
              id: 'c2-q4-b',
              text: '果斷宣告宮內復甦失敗，在 30 分鐘內完成緊急剖腹產娩出胎兒 (Decision-to-delivery interval ≤30 mins)',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 25,
              explanation: '正確！產程無法即刻陰道分娩時，立即行剖腹產是搶救瀕危胎兒神經系統發育之唯一方法。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-ped-call',
          name: '呼叫新生兒急救團隊 (NRP) 入產房就位',
          category: 'emergency',
          icon: 'Baby',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: '兒科醫師就位備妥吸球、輻射保溫台、氣管內管與 T-piece 甦醒器。'
        }
      ]
    }
  ],
  teacherGuide: {
    reasoningSteps: [
      {
        stepNumber: 1,
        title: '基線正常待產',
        clues: ['Baseline 140', '中度變異度', '宮縮 3-4 分鐘一次'],
        reasoningPath: ['Category I 正常胎心，產程平穩'],
        conclusion: '常規產程監測'
      },
      {
        stepNumber: 2,
        title: 'Oxytocin 誘發宮縮過頻 (Tachysystole)',
        clues: ['10 分鐘宮縮 >5 次', '每次宮縮伴隨 Variable Deceleration (85 bpm)'],
        reasoningPath: ['間歇期不足導致胎盤血流短暫中斷，且臍帶遭受壓迫'],
        conclusion: '立停 Oxytocin 並改變體位'
      },
      {
        stepNumber: 3,
        title: '演變為晚期減速 (Late Decels) 與胎便染色',
        clues: ['反覆晚期減速', '變異度 <5 bpm', '羊水胎便染色'],
        reasoningPath: ['胎盤代償失調，胎兒中樞神經嚴重缺氧，肛門括約肌放鬆排出胎便'],
        conclusion: 'Category III 胎兒窘迫，立即宮內復甦 (Terbutaline + IVF + O2)'
      },
      {
        stepNumber: 4,
        title: '復甦失敗與終止妊娠',
        clues: ['復甦 15 分鐘無效', '子宮頸僅開 5 cm'],
        reasoningPath: ['無法短期內經陰道分娩，繼續等待將造成缺氧缺血性腦病變 (HIE)'],
        conclusion: '30 分鐘內緊急剖腹產'
      }
    ],
    maternalClues: ['催產素輸注中', '宮縮過頻 (Tachysystole >5次/10分)', '宮縮間歇期腹壁未完全放鬆'],
    fetalClues: ['早期變異減速 → 晚期減速', '基線心跳自 140 上升至 160 (代償性過速)', '變異度自中度變異降至微小變異 (<5 bpm)', '羊水黃綠色胎便染色'],
    maternalFetalCorrelation: '宮縮時子宮肌層血管受壓，絨毛間隙血流暫停；若宮縮過頻，間歇期太短，胎兒未及自上一次缺氧中恢復又面臨下一次缺血，氧債持續累積終至失代償。',
    osceStations: [
      {
        stationNumber: 1,
        stationTitle: '胎心減速型態辨析站',
        taskPrompt: '請比較 Early、Variable、Late Deceleration 之波形特徵與生理機轉。',
        keyPoints: ['Early: 與宮縮鏡像對稱，因胎頭受壓引起迷走神經興奮，屬生理性', 'Variable: 陡降陡升呈 V/U 型，因臍帶受壓引起，可藉改變體位改善', 'Late: 宮縮高峰後才開始下降，因子宮胎盤灌流不足引起，屬病理性缺氧'],
        sampleModelAnswer: '早期減速低谷與宮縮頂峰完全重疊，為胎頭受壓；變異減速開始至低谷 <30 秒，波形陡峭，為臍帶受壓；晚期減速延遲於宮縮頂點後開始，波形緩慢，代表胎盤灌流衰竭。'
      },
      {
        stationNumber: 2,
        stationTitle: '子宮過頻收縮 (Tachysystole) 搶救演練站',
        taskPrompt: '口述並執行當出現 Tachysystole 時之 4 項標準應急程序。',
        keyPoints: ['立刻關閉 Oxytocin', '給予左側臥或轉位', 'IV 靜脈輸液全速滴注 500 mL', '必要時給予 Terbutaline 0.25 mg SC'],
        sampleModelAnswer: '第一步切斷催產素滴注；第二步協助左側臥；第三步開大輸液 500mL；第四步若無緩解立即皮下注射 Terbutaline 0.25mg。'
      },
      {
        stationNumber: 3,
        stationTitle: '宮內復甦 (Intrauterine Resuscitation) 處置站',
        taskPrompt: '說明宮內復甦四部曲與其背後的生理學目的。',
        keyPoints: ['體位更換消除血管/臍帶壓迫', '面罩 10L/min 提升母體血氧分壓', '擴充血管容積增加胎盤動脈壓', '抑制過度宮縮恢復間歇期充血'],
        sampleModelAnswer: '透過更換體位、高流量給氧、快速水份灌注及宮縮抑制，最大化恢復絨毛間隙之血液充盈與血氧交換。'
      },
      {
        stationNumber: 4,
        stationTitle: '羊水胎便染色 (Meconium) 之 NRP 應變站',
        taskPrompt: '胎兒娩出若活力不佳 (Non-vigorous) 合併羊水胎便，現行 NRP 指引建議為何？',
        keyPoints: ['不再常規進行盲目氣管插管抽吸', '第一時間置於保溫台保暖擦乾刺激', '若呼吸暫停或心跳 <100 bpm，立即給予陽壓呼吸 (PPV)', '持續心跳監控'],
        sampleModelAnswer: '依現行 NRP 最新指引，不論胎便濃稠度，均應先放置保溫台擦乾刺激；若無自主呼吸或心跳 <100，立刻執行正壓通氣 (PPV)。'
      },
      {
        stationNumber: 5,
        stationTitle: '緊急剖腹產 30 分鐘決策溝通站',
        taskPrompt: '以同理心向焦慮的產婦及家屬進行緊急剖腹產的醫療決策告知與知情同意。',
        keyPoints: ['簡明說明胎兒心跳減速與胎盤供氧耗竭', '告知宮內復甦已執行但胎心未完全恢復', '解釋 30 分鐘內剖腹產是保障寶寶神經發育的最佳途徑', '取得簽署並安撫情緒'],
        sampleModelAnswer: '媽媽爸爸請聽我說，目前寶寶因為子宮收縮過強，胎盤送過去的氧氣已經不夠了，心跳出現反覆下降。我們已經嘗試了左側躺、吸氧和放鬆子宮藥物，但寶寶體力在透支。為了防止寶寶腦部缺氧，我們必須在 30 分鐘內進行剖腹產把寶寶接出來，請相信我們的專業團隊。'
      }
    ],
    takeawayTable: [
      { clue: '10 分鐘內宮縮超過 5 次', focus: 'Tachysystole！必須立刻停止催產素' },
      { clue: 'NST 出現反覆晚期減速 (Late decels)', focus: '胎盤灌流不足，胎兒組織低氧血症' },
      { clue: '胎心變異度小於 5 bpm (Minimal/Absent)', focus: '胎兒中樞神經代償機能耗竭，酸中毒危象' },
      { clue: '羊水胎便染色 (Meconium stained)', focus: '胎兒缺氧迷走神經興奮促使腸蠕動排便' },
      { clue: '積極宮內復甦 15 分鐘未見改善', focus: '應在 30 分鐘內完成剖腹產 (D-to-D interval)' }
    ],
    pathophysiologySummary: '催產素過量或子宮肌層敏感 → 宮縮頻率過密 (>5次/10分) 或持續時間過長 (>90秒) → 絨毛間隙缺血時間拉長 → 胎兒氧飽和度跌破臨界值 → 迷走神經受刺激排出胎便 → 晚期減速 → 胎兒心肌缺氧與酸中毒。',
    injections: [
      {
        id: 'inj-c2-prolonged',
        title: '突發危機注入：胎心墜至 55 bpm 超過 3 分鐘不回彈',
        description: '導師注入：出現 Prolonged Deceleration 跌至 55 bpm，產婦面色慘白！',
        vitalsOverride: {
          fhr: 55,
          fhrPattern: 'Prolonged Deceleration (55 bpm), Flatline',
          spo2: 95
        },
        newSituationPrompt: '胎心急降至 55 bpm 持續 3 分鐘未升，內診觸及一條搏動性索狀物！',
        requiredActionPrompt: '此時懷疑什麼致命併發症？第一時間徒手處置為何？',
        correctResponse: '臍帶脫垂 (Cord Prolapse)！立即戴無菌手套將胎頭往上推頂，減輕對臍帶壓迫，維持膝胸臥位，手切勿拔出，全速推入手術室剖腹產！'
      }
    ]
  },
  rawContent: RAW_EXTRACTED_TEXTS['case_2'] || ''
};
