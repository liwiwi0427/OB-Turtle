export interface QuizQuestion {
  id: string;
  category: string;
  caseRef: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  pearl: string;
}

export const CLASSROOM_QUIZ_BANK: QuizQuestion[] = [
  {
    id: 'quiz-1',
    category: '胎心音判讀 (NICHD)',
    caseRef: '案例一 & 案例二',
    question: '在胎心監護 (EFM) 中，下列何者符合 NICHD Category I（正常）之全部標準？',
    options: [
      {
        id: 'q1-a',
        text: '基線心率 110-160 bpm，中度變異度 (Moderate variability 6-25 bpm)，無晚期或變異減速',
        isCorrect: true,
        explanation: '正確！Category I 預測胎兒臍動脈血 pH 值正常，酸鹼平衡良好。'
      },
      {
        id: 'q1-b',
        text: '基線心率 170 bpm，變異度小於 5 bpm，宮縮後偶有晚期減速',
        isCorrect: false,
        explanation: '錯誤！心跳過速合併微小變異度與晚期減速屬於 Category II/III 異常。'
      },
      {
        id: 'q1-c',
        text: '正弦波形 (Sinusoidal pattern)，持續 20 分鐘以上',
        isCorrect: false,
        explanation: '錯誤！Sinusoidal pattern 屬於 Category III，提示胎兒重度貧血或酸中毒危急。'
      }
    ],
    pearl: 'Category I 為正常；Category III（正弦波或無變異度合併晚減/變異減/心搏過慢）需緊急剖腹；其餘皆為 Category II 需嚴密監護。'
  },
  {
    id: 'quiz-2',
    category: '急症宮內復甦 (Intrauterine Resuscitation)',
    caseRef: '案例二',
    question: 'Oxytocin 點滴引產時，10 分鐘內宮縮發作 6 次且胎心出現反覆變異減速，下列第一步處置何者最正確？',
    options: [
      {
        id: 'q2-a',
        text: '立即關閉催產素 (Turn OFF Oxytocin)，協助左側臥位，面罩給氧並快速輸液',
        isCorrect: true,
        explanation: '正確！子宮過頻收縮 (Tachysystole) 造成胎盤缺血，首要動作是切斷催產素並轉換體位緩解臍帶壓迫。'
      },
      {
        id: 'q2-b',
        text: '加速催產素滴速，以加速產程進展儘早自然分娩',
        isCorrect: false,
        explanation: '致命錯誤！加倍催產素將加劇子宮痙攣，使胎兒完全缺氧窒息。'
      },
      {
        id: 'q2-c',
        text: '維持仰臥平躺，等待 30 分鐘自行緩解',
        isCorrect: false,
        explanation: '錯誤！仰臥位會壓迫下腔靜脈（仰臥低血壓綜合徵），進一步惡化胎盤灌流。'
      }
    ],
    pearl: 'Tachysystole 救命首動：立停催產素 + 側臥改變體位 + 靜脈補液 + 面罩純氧。'
  },
  {
    id: 'quiz-3',
    category: '重度子癲前症與硫酸鎂',
    caseRef: '案例三',
    question: '使用硫酸鎂 (MgSO4) 預防子癲抽搐時，每小時查核之安全防護「金三角」為何？',
    options: [
      {
        id: 'q3-a',
        text: '髕骨膝腱反射存在 (DTR present)、呼吸速率 ≥12 次/分、每小時尿量 ≥30 mL',
        isCorrect: true,
        explanation: '正確！膝腱反射消失為早期中毒徵兆；呼吸 <12 代表呼吸肌麻痺；尿量 <30 mL 會導致鎂離子體內蓄積中毒。'
      },
      {
        id: 'q3-b',
        text: '瞳孔對光反應、體溫 >37.5℃、大便次數',
        isCorrect: false,
        explanation: '錯誤！非硫酸鎂滴定安全評估指標。'
      },
      {
        id: 'q3-c',
        text: '胎心音大於 180 bpm、血小板大於 30 萬、收縮壓低於 90 mmHg',
        isCorrect: false,
        explanation: '錯誤！'
      }
    ],
    pearl: '硫酸鎂中毒特異解毒劑為 10% 葡萄糖酸鈣 (Calcium Gluconate) 10 mL (1g) 緩慢靜注！'
  },
  {
    id: 'quiz-4',
    category: '前置胎盤絕對禁忌',
    caseRef: '案例七',
    question: '孕 35 週產婦主訴「無痛性鮮紅色陰道流血約 300 mL」，子宮完全柔軟，在進行超音波定位前，下列何項處置屬絕對禁忌？',
    options: [
      {
        id: 'q4-a',
        text: '以手指伸入子宮頸口進行陰道指診 (Digital Vaginal Exam)',
        isCorrect: true,
        explanation: '正確！手指伸入子宮頸內口若撕破覆蓋於頸口的前置胎盤海綿竇，將在數秒內造成致死性噴射狀大出血！'
      },
      {
        id: 'q4-b',
        text: '經腹壁產科超音波檢查',
        isCorrect: false,
        explanation: '錯誤！經腹超音波為確立前置胎盤的安全首選診斷方式。'
      },
      {
        id: 'q4-c',
        text: '建立大口徑靜脈留置針與交叉備血',
        isCorrect: false,
        explanation: '錯誤！這是必備的安全急救準備。'
      }
    ],
    pearl: '晚期妊娠陰道出血第一鐵律：未用超音波排除前置胎盤前，嚴禁盲目手指內診！'
  },
  {
    id: 'quiz-5',
    category: '胎盤早期剝離鑑別',
    caseRef: '案例四 & 案例六',
    question: '「持續性刀割樣腹部劇痛、子宮硬如木板 (Board-like rigidity)、拒絕觸摸、伴隨胎心率驟降」，此組臨床特徵最具代表性的診斷為？',
    options: [
      {
        id: 'q5-a',
        text: '胎盤早期剝離 (Placental Abruption)，特別警惕隱匿型出血 (Concealed abruption)',
        isCorrect: true,
        explanation: '正確！板狀強直腹、持續劇痛是胎盤早剝最具特異性表現；外出血量少常因血液積聚於胎盤後形成巨大血腫。'
      },
      {
        id: 'q5-b',
        text: '完全性前置胎盤',
        isCorrect: false,
        explanation: '錯誤！前置胎盤為無痛、子宮鬆軟、鮮紅出血。'
      },
      {
        id: 'q5-c',
        text: '假性陣痛 (Braxton Hicks)',
        isCorrect: false,
        explanation: '錯誤！假性陣痛無痛或輕微不適，無板狀腹及胎心惡化。'
      }
    ],
    pearl: '胎盤早剝超音波靈敏度僅約 50%，未見血腫絕不可排除診斷，必須以臨床板狀腹為首要警訊！'
  },
  {
    id: 'quiz-6',
    category: '羊水栓塞 (AFE) 搶救',
    caseRef: '案例八',
    question: '產婦分娩後突然出現胸悶、重度發紺 (SpO2 68%)、血壓暴跌至 60/30 mmHg 並突發抽搐昏迷，隨即心跳驟停。最新 AFE 專屬藥物協定「AOK Protocol」包含？',
    options: [
      {
        id: 'q6-a',
        text: 'Atropine (阿托品 0.5-1mg) + Ondansetron (樞復寧 8mg) + Ketorolac (酮咯酸 30mg)',
        isCorrect: true,
        explanation: '正確！Atropine 阻斷迷走心動過緩；Ondansetron 阻斷 5-HT 肺動脈痙攣；Ketorolac 阻斷血栓素抑制血小板微血栓。'
      },
      {
        id: 'q6-b',
        text: 'Aspirin + Oxytocin + Potassium',
        isCorrect: false,
        explanation: '錯誤！非 AFE 特異性協定。'
      },
      {
        id: 'q6-c',
        text: 'Adenosine + Omeprazole + Kayexalate',
        isCorrect: false,
        explanation: '錯誤！'
      }
    ],
    pearl: '羊水栓塞病程三部曲：急性右心衰竭心跳停止 → 左心衰竭肺水腫 → 爆發性 DIC 大出血！'
  },
  {
    id: 'quiz-7',
    category: '產後大出血 4T 病因',
    caseRef: '4T 產後大出血案例',
    question: '產後大出血 (PPH) 最常見之病因分類中，佔比高達 70% 的「第一 T」為何？',
    options: [
      {
        id: 'q7-a',
        text: 'Tone（子宮收縮乏力 Uterine Atony）',
        isCorrect: true,
        explanation: '正確！子宮收縮無力觸診柔軟如麵團，佔 PPH 70-80%，為首位致死原因。'
      },
      {
        id: 'q7-b',
        text: 'Trauma（產道撕裂傷）',
        isCorrect: false,
        explanation: '錯誤！Trauma 約佔 20%。'
      },
      {
        id: 'q7-c',
        text: 'Tissue（胎盤組織殘留）',
        isCorrect: false,
        explanation: '錯誤！Tissue 約佔 10%。'
      },
      {
        id: 'q7-d',
        text: 'Thrombin（凝血因子病變）',
        isCorrect: false,
        explanation: '錯誤！Thrombin 約佔 1%。'
      }
    ],
    pearl: '若子宮堅硬如石但陰道仍持續噴鮮血，病因不是 Tone，而是 Trauma 產道撕裂傷！'
  },
  {
    id: 'quiz-8',
    category: '休克指數 (Shock Index)',
    caseRef: '4T 產後大出血案例',
    question: '產後產婦心率 120 bpm，收縮壓 80 mmHg，計算其產科休克指數 (Shock Index = HR / SBP)，其數值與臨床意義為何？',
    options: [
      {
        id: 'q8-a',
        text: 'SI = 1.5，代表重度失血休克，需立即啟動大量輸血協定 (MTP)',
        isCorrect: true,
        explanation: '正確！正常產科 SI ≤0.7；0.9-1.0 為輕中度失血；SI ≥1.0 提示失血量常 >1500-2000 mL，≥1.4 屬極度危急！'
      },
      {
        id: 'q8-b',
        text: 'SI = 0.66，代表血液動力學非常穩定，可回病房休息',
        isCorrect: false,
        explanation: '計算顛倒錯誤！SI 是心跳除以收縮壓 (120/80 = 1.5)。'
      },
      {
        id: 'q8-c',
        text: 'SI 只適用於創傷外科，產科孕婦不能參考休克指數',
        isCorrect: false,
        explanation: '錯誤！產科休克指數是國際公認能比血壓更早發現隱匿性失血失代償的黃金指標。'
      }
    ],
    pearl: '產科休克指數 SI = HR / SBP：0.9 預警、1.0 備血、1.4 啟動 MTP 輸血！'
  },
  {
    id: 'quiz-9',
    category: 'PPH 宮縮劑禁忌辨識',
    caseRef: '4T 產後大出血案例',
    question: '產後大出血患者同時合併「嚴重氣喘 (Asthma)」與「重度子癲前症 (BP 170/110)」，下列宮縮劑選擇何者正確？',
    options: [
      {
        id: 'q9-a',
        text: '嚴禁使用 Methylergonovine（會加重高血壓致腦出血），且嚴禁使用 Carboprost/PGF2α（會誘發致命性支氣管痙攣）；應首選 Oxytocin 與 Misoprostol / Carbetocin',
        isCorrect: true,
        explanation: '正確！Methergine 禁忌為高血壓/子癲前症；Hemabate/Carboprost 禁忌為氣喘！'
      },
      {
        id: 'q9-b',
        text: '立即大劑量靜脈注射 Methylergonovine 降壓',
        isCorrect: false,
        explanation: '致命錯誤！Methergine 是強效血管收縮劑，會造成血壓暴衝腦出血！'
      },
      {
        id: 'q9-c',
        text: '肌肉注射 Carboprost 緩解氣喘發作',
        isCorrect: false,
        explanation: '致命錯誤！Carboprost (前列腺素 F2α) 會強烈收縮支氣管平滑肌導致窒息！'
      }
    ],
    pearl: '用藥鐵律口訣：高血壓不用 Methergine，氣喘不用 Carboprost (Hemabate)！'
  },
  {
    id: 'quiz-10',
    category: '大量輸血與致命三聯徵',
    caseRef: '產科大量輸血 MTP',
    question: '啟動產科大量輸血協定 (MTP) 時，預防致命三聯徵 (Lethal Triad) 之關鍵臨床處置為何？',
    options: [
      {
        id: 'q9-a',
        text: '輸入液體全程加溫 (37-40℃)、紅血球:血漿:血小板以 1:1:1 比例輸注、密切監測血鈣並補充電解質防酸中毒',
        isCorrect: true,
        explanation: '正確！致命三聯徵為：低體溫 (Hypothermia)、酸中毒 (Acidosis)、凝血障礙 (Coagulopathy)。'
      },
      {
        id: 'q9-b',
        text: '直接快速輸入 4000 mL 冰冷生理食鹽水降溫',
        isCorrect: false,
        explanation: '致死錯誤！冰冷晶體液會引發重度低體溫與稀釋性凝血崩潰。'
      },
      {
        id: 'q9-c',
        text: '不需輸血小板或血漿，只輸洗滌紅血球即可',
        isCorrect: false,
        explanation: '錯誤！缺乏凝血因子與血小板將導致持續滲血致死。'
      }
    ],
    pearl: 'MTP 核心心法：早啟動、1:1:1 平衡輸注、加溫保溫、及早給予 TXA 及補充 Fibrinogen (Cryo)！'
  }
];
