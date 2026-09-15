import { ClinicalCase } from '../../types/megacode';
import { RAW_EXTRACTED_TEXTS } from '../rawExtractedTexts';

export const case8: ClinicalCase = {
  id: 'case-8',
  caseNumber: 8,
  title: '案例八：突然崩潰的產婦（羊水栓塞）',
  subtitle: '羊水栓塞 (Amniotic Fluid Embolism, AFE)',
  category: 'afe',
  targetDiagnosis: '急性羊水栓塞引發爆發性心因性/阻塞性休克、心跳停止與重度 DIC 凝血崩潰',
  estimatedTimeMin: 15,
  difficulty: 'Advanced',
  patientProfile: {
    age: 34,
    gravidaPara: 'G2P1',
    gestationalAge: '39+1 週',
    pastHistory: ['孕期產檢常規正常', '無高血壓或心臟病史', '經催產素引產歷時 8 小時順產一女嬰，胎盤完整娩出'],
    chiefComplaint: '產後 5 分鐘突發嚴重呼吸困難、胸痛發紺、狂躁不安，隨即抽搐意識喪失',
    bmi: 25.1
  },
  phases: [
    {
      phaseNumber: 1,
      title: '第一階段：急驟心肺崩潰與呼吸衰竭',
      subtitle: '產後數分鐘內突發胸悶、發紺、低血壓與昏迷',
      patientQuote: '我好喘……胸口像被大石頭壓住……我吸不到氣……救我……',
      story: '34歲產婦剛順利分娩女嬰，胎盤完整娩出 5 分鐘後。產婦突然大叫胸口劇痛窒息，面部及唇周迅速呈現青紫色（發紺），隨後雙眼上吊，全身抽搐失去意識！',
      vitals: {
        bp: '60/30',
        hr: 145,
        rr: 36,
        spo2: 68,
        temp: 36.2,
        fhr: 0,
        fhrPattern: '已自然分娩',
        uterineTension: '鬆弛變軟',
        bleedingAmount: '陰道出血暫時中等約 300 mL'
      },
      physicalExam: [
        '意識狀態：GCS 3 分 (E1V1M1)，呼之不應，無自主呼吸動作',
        '中央發紺 (Central Cyanosis)，頸靜脈高度怒張 (JVD 陽性)',
        '聽診：雙肺滿佈濕囉音，心音極度微弱且快速'
      ],
      questions: [
        {
          id: 'c8-q1',
          prompt: '產婦於胎盤娩出數分鐘內突然發生「急性呼吸困難 + 重度發紺 (SpO2 68%) + 暴跌性休克 + 抽搐昏迷」，最凶險之首要診斷為何？',
          learningObjective: '第一時間識別產科頭號殺手——羊水栓塞 (Amniotic Fluid Embolism, AFE)',
          options: [
            {
              id: 'c8-q1-a',
              text: '急性羊水栓塞 (Amniotic Fluid Embolism, AFE)，引發急性肺血管痙攣、急性右心衰竭與心因性休克',
              isCorrect: true,
              scoreChange: 35,
              stabilityImpact: 25,
              explanation: '正確！AFE 典型於破水或產後數分鐘內猝發，以急性低血氧、嚴重低血壓與中樞神經抽搐三聯徵為前驅表現！'
            },
            {
              id: 'c8-q1-b',
              text: '單純過度換氣症候群引起的換氣過度鹼中毒',
              isCorrect: false,
              scoreChange: -40,
              stabilityImpact: -45,
              explanation: '致死判斷錯誤！SpO2 跌至 68% 伴休克是瀕死危象，誤判為過度換氣將直接導致患者死亡！'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c8-code-blue',
          name: '高聲呼救啟動 Code Blue 產房全院心肺急救小組',
          category: 'emergency',
          icon: 'BellRing',
          isAppropriate: true,
          stabilityDelta: 25,
          feedback: '急救鐘聲大作！麻醉科插管小組、心臟重症醫師與急診團隊全速奔赴產房！'
        },
        {
          id: 'act-c8-bag-mask',
          name: '立即使用袋瓣罩甦醒球 (Ambu Bag) 給予 100% 純氧正壓通氣',
          category: 'airway_oxygen',
          icon: 'Wind',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '密合面罩緊扣口鼻加壓給氧，氧氣流量 15 L/min。'
        }
      ]
    },
    {
      phaseNumber: 2,
      title: '第二階段：心跳停止與心肺復甦 (CPR / ACLS)',
      subtitle: '心電圖呈現 PEA（無脈搏電氣活動），執行高品質 CPR 與 AOK 協定',
      patientQuote: '（病患已失去意識與頸動脈搏動）',
      story: '心電圖監視器接上，呈現微弱寬大 QRS 波，觸摸頸動脈搏動完全消失！為 PEA（無脈搏性電活動）心跳停止。麻醉科迅速完成氣管內管插管。',
      vitals: {
        bp: '0/0',
        hr: 42,
        rr: 10,
        spo2: 72,
        temp: 35.8,
        fhr: 0,
        fhrPattern: '已分娩',
        uterineTension: '無收縮',
        bleedingAmount: '惡露量持續增多'
      },
      questions: [
        {
          id: 'c8-q2',
          prompt: '在 AFE 心肺復甦中，國際最新產科重症推薦的「AOK 藥物協定 (AOK Protocol)」包含哪三種關鍵藥物？',
          learningObjective: '掌握羊水栓塞特異性前列腺素與迷走神經阻斷之 AOK 搶救方案',
          options: [
            {
              id: 'c8-q2-a',
              text: 'Atropine (阿托品 0.5-1mg) + Ondansetron (樞復寧 8mg) + Ketorolac (酮咯酸 30mg)',
              isCorrect: true,
              scoreChange: 35,
              stabilityImpact: 30,
              explanation: '正確！Atropine 阻斷迷走神經心動過緩；Ondansetron 阻斷 5-HT3 血清素受體抑制肺動脈痙攣；Ketorolac 阻斷血栓素 (TXA2) 合成！'
            },
            {
              id: 'c8-q2-b',
              text: 'Aspirin + Oxytocin + Potassium chloride',
              isCorrect: false,
              scoreChange: -30,
              stabilityImpact: -35,
              explanation: '錯誤！這並非 AOK 方案，且靜脈給予氯化鉀會引發心臟驟停致死。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c8-cpr-compress',
          name: '高品質胸外心臟按壓 (100-120次/分，深度 5-6 cm)',
          category: 'emergency',
          icon: 'HeartPulse',
          isAppropriate: true,
          stabilityDelta: 25,
          feedback: '持續胸外按壓，由第二人每 2 分鐘輪替，確保胸壁充分回彈。'
        },
        {
          id: 'act-c8-epinephrine',
          name: '靜脈注射 Epinephrine 1 mg IV push (每 3-5 分鐘一次)',
          category: 'medication',
          icon: 'Zap',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: '強效激發心肌收縮與周邊血管收縮，恢復冠狀動脈灌注壓！'
        },
        {
          id: 'act-c8-aok',
          name: '給予 AOK 搶救三聯藥物 (Atropine + Ondansetron + Ketorolac)',
          category: 'medication',
          icon: 'Shield',
          isAppropriate: true,
          stabilityDelta: 25,
          feedback: 'AOK 方案快速注入！抑制肺血管血清素與血栓素風暴。'
        }
      ]
    },
    {
      phaseNumber: 3,
      title: '第三階段：自主循環恢復 (ROSC) 與爆發性 DIC',
      subtitle: '恢復心跳後進入第二階段：全身各處無法凝固之大失血',
      patientQuote: '（呼吸器接續運作中，血氧緩慢爬升至 88%）',
      story: '經過 8 分鐘高品質 CPR 與插管，心電圖恢復竇性心搏，觸摸到股動脈搏動，自主循環恢復 (ROSC)！但緊接著，產婦陰道、靜脈針孔、氣管內管與導尿管全都湧出水樣不凝固血液！',
      vitals: {
        bp: '78/42',
        hr: 138,
        rr: 22,
        spo2: 88,
        temp: 35.5,
        fhr: 0,
        fhrPattern: '已分娩',
        uterineTension: '子宮鬆弛如泥灘',
        bleedingAmount: '陰道噴湧水樣血液，累積失血 >2000 mL'
      },
      labs: [
        { item: 'Platelet', value: '38,000', unit: '/μL', abnormal: true },
        { item: 'Fibrinogen', value: '<50', unit: 'mg/dL', reference: '300-600', abnormal: true },
        { item: 'PT / aPTT', value: '>100s / >120s (不可測)', abnormal: true },
        { item: 'D-dimer', value: '>35.0', unit: 'μg/mL', abnormal: true },
        { item: 'Arterial Blood Gas pH', value: '7.12', abnormal: true }
      ],
      questions: [
        {
          id: 'c8-q3',
          prompt: '羊水栓塞恢復心跳後迅速爆發全身水樣大出血，Fibrinogen 跌破 50 mg/dL，此時輸血與止血救命戰略為何？',
          learningObjective: '掌握 AFE 合併爆發性 DIC 之大量輸血協定 (MTP) 與纖維蛋白原超量補充',
          options: [
            {
              id: 'c8-q3-a',
              text: '啟動最高級大量輸血協定 (MTP 1:1:1)，立即加壓輸注冷凍沉澱品 (Cryo 20U) 補充 Fibrinogen，給予 TXA 1g，並放置 Bakri 子宮水球填塞',
              isCorrect: true,
              scoreChange: 35,
              stabilityImpact: 25,
              explanation: '正確！羊水成分中富含組織因子促發超急性消耗性 DIC；唯有超量補充 Cryo/FFP/Platelet 重建凝血瀑布，配合機械性壓迫才能止血！'
            },
            {
              id: 'c8-q3-b',
              text: '只輸注生理食鹽水 3000 mL，暫不需叫血',
              isCorrect: false,
              scoreChange: -35,
              stabilityImpact: -40,
              explanation: '致死錯誤！大量晶體液會造成稀釋性凝血病變，使患者死於全身失血性休克！'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c8-mtp-full',
          name: '啟動最高級產科大量輸血 (MTP 1:1:1: Cryo, pRBC, FFP, Plt)',
          category: 'procedure',
          icon: 'Droplets',
          isAppropriate: true,
          stabilityDelta: 25,
          feedback: '加溫加壓輸血器全開！4U pRBC + 4U FFP + 20U Cryo 連續灌注！'
        },
        {
          id: 'act-c8-uterine-packing',
          name: '置入 Bakri 子宮止血水球填塞 (Tamponade) 並注射 TXA 1g',
          category: 'procedure',
          icon: 'Shield',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: 'Bakri 水球注水 400 mL，子宮腔出血明顯收斂！'
        }
      ]
    },
    {
      phaseNumber: 4,
      title: '第四階段：ICU 高階重症生命支持',
      subtitle: '體外維生系統 (VA-ECMO) 評估與加護病房轉運',
      patientQuote: '（病患鎮靜插管轉入重症加護病房）',
      story: '在輸注 16 單位各類血製品、大劑量強心升壓劑 (Norepinephrine, Epinephrine) 與 Bakri 水球壓迫下，血壓回升至 104/62 mmHg，Fibrinogen 回升至 180 mg/dL，轉入 ICU 評估 ECMO 體外葉克膜支持。',
      vitals: {
        bp: '104/62',
        hr: 108,
        rr: 20,
        spo2: 96,
        temp: 36.2,
        fhr: 0,
        fhrPattern: '轉入重症加護病房',
        uterineTension: '水球壓迫填塞止血良好',
        bleedingAmount: '滲血逐漸減少凝固'
      },
      questions: [
        {
          id: 'c8-q4',
          prompt: '羊水栓塞 (AFE) 產後死亡率高達 20-60%，其典型的「病程三部曲」依序為何？',
          learningObjective: '深刻掌握羊水栓塞的經典病理演進三階段',
          options: [
            {
              id: 'c8-q4-a',
              text: '第一階段：急性肺動脈高壓、缺氧與心因性休克（心跳停止）→ 第二階段：心肌收縮力抑制與左心衰竭（急性肺水腫）→ 第三階段：爆發性消耗性凝血障礙 (DIC 大出血)',
              isCorrect: true,
              scoreChange: 35,
              stabilityImpact: 25,
              explanation: '正確！這是產科教科書最經典之 AFE 三階段演變，考驗醫護團隊跨呼吸、循環、凝血之全方位綜合搶救能力！'
            },
            {
              id: 'c8-q4-b',
              text: '第一階段：子宮過度收縮 → 第二階段：過敏疹 → 第三階段：慢性高血壓',
              isCorrect: false,
              scoreChange: -25,
              stabilityImpact: -25,
              explanation: '錯誤！AFE 是極為急驟的心肺與凝血崩潰，而非慢性演變。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c8-icu-ecmo',
          name: 'ICU 心臟重症團隊待命 VA-ECMO (靜動脈葉克膜) 體外循環',
          category: 'procedure',
          icon: 'Activity',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: '葉克膜團隊床邊超音波評估右心收縮力，維持微循環灌流。'
        }
      ]
    }
  ],
  teacherGuide: {
    reasoningSteps: [
      {
        stepNumber: 1,
        title: '猝發心肺崩潰識別',
        clues: ['產後 5 分鐘', '突發胸痛呼吸困難', '發紺 SpO2 68%', '低血壓抽搐'],
        reasoningPath: ['產科病人急性心肺衰竭 → 排除單純氣胸，高度鎖定羊水栓塞 (AFE)'],
        conclusion: '立即呼叫 Code Blue 與純氧正壓通氣'
      },
      {
        stepNumber: 2,
        title: '心跳停止與 ACLS 搶救',
        clues: ['心電圖 PEA', '頸動脈搏消失'],
        reasoningPath: ['急性肺血管痙攣誘發右心室急性膨脹衰竭致心搏驟停'],
        conclusion: '高品質 CPR + 插管 + Epinephrine + AOK 協定'
      },
      {
        stepNumber: 3,
        title: 'ROSC 之後迎戰爆發性 DIC',
        clues: ['針孔、傷口、尿道、陰道全身性不凝固出血', 'Fibrinogen <50 mg/dL'],
        reasoningPath: ['羊水富含組織因子引發體內爆發性微血栓消耗凝血物質'],
        conclusion: 'MTP 1:1:1 大量輸血 + Cryo 20U + TXA + Bakri 水球壓迫'
      },
      {
        stepNumber: 4,
        title: 'ICU 體外循環生命支持',
        clues: ['嚴重左心抑制與酸中毒'],
        reasoningPath: ['加護病房呼吸機肺保護、升壓強心藥，必要時 ECMO 輔助'],
        conclusion: '多科重症醫學會診爭取器官修復時間'
      }
    ],
    maternalClues: ['突然劇烈喘息胸悶', '全身青紫發紺', '血壓斷崖式跌破 60', '突發抽搐昏迷', '全身不凝固水樣大出血', 'Fibrinogen 幾乎耗盡'],
    fetalClues: ['多發生於破水或胎盤娩出前後（本例發生於產後 5 分鐘）'],
    maternalFetalCorrelation: '羊水及其胎兒有形成分（胎兒鱗狀上皮、胎糞）經子宮內膜靜脈竇進入母體血循環，引發類似全身過敏性休克樣的過敏反應綜合徵 (Anaphylactoid syndrome of pregnancy)。',
    osceStations: [
      {
        stationNumber: 1,
        stationTitle: '羊水栓塞急救第一時間處置站',
        taskPrompt: '產婦突然在產房發紺抽搐，作為第一位在場護理師，10 秒內必做的三件事。',
        keyPoints: ['大聲呼救啟動 Code Blue 產科急救', '維持呼吸道通暢立即面罩 100% 給氧', '觸摸頸動脈評估搏動，若無搏動立即胸外按壓'],
        sampleModelAnswer: '第一：立即高聲呼叫啟動產房 Code Blue；第二：抓起氧氣面罩接上純氧扣緊產婦口鼻；第三：兩指觸摸頸動脈確認有無搏動，若無搏動立刻開始胸外按壓！'
      },
      {
        stationNumber: 2,
        stationTitle: '孕婦/產後心肺復甦術 (CPR) 特殊要點站',
        taskPrompt: '若產婦尚未生產即發生心跳停止，CPR 時子宮推移 (LUD) 與緊急剖腹產 (PMCA) 準則。',
        keyPoints: ['手動左側子宮推移 (Left Uterine Displacement) 減輕主腔靜脈壓迫', '按壓位置略高於胸骨中段', '4 分鐘無 ROSC，5 分鐘內執行死前剖腹產 (PMCD/PMCA)'],
        sampleModelAnswer: '若未分娩需由助手施行持續左側子宮推移；按壓位置在胸骨中下段稍高處；若 CPR 進行 4 分鐘仍無心跳恢復，必須在 5 分鐘內於現場施行死前剖腹產以搶救母胎！'
      },
      {
        stationNumber: 3,
        stationTitle: 'AOK 救命協定藥理站',
        taskPrompt: '口述 AOK 方案中 Atropine、Ondansetron、Ketorolac 之各自劑量與藥理靶點。',
        keyPoints: ['Atropine 0.5-1mg IV: 迷走神經阻斷', 'Ondansetron 8mg IV: 5-HT3 阻斷肺動脈痙攣', 'Ketorolac 30mg IV: 環氧合酶阻斷抑制血栓素 TXA2'],
        sampleModelAnswer: 'Atropine 1mg 拮抗迷走神經心動過緩；Ondansetron 8mg 拮抗血清素緩解肺動脈痙攣；Ketorolac 30mg 抑制血栓素合成，減少血小板微聚集。'
      },
      {
        stationNumber: 4,
        stationTitle: '大量輸血協定 (MTP) 致命三聯徵防範站',
        taskPrompt: '大量輸血時如何防範「低體溫、酸中毒、凝血功能障礙」致命三聯徵？',
        keyPoints: ['所有輸入血品與液體必須加溫器預熱至 37-40℃', '輸血 1:1:1 比例防止稀釋', '密切監測血鈣 (每輸 4U 血預防性補鈣防枸櫞酸中毒)'],
        sampleModelAnswer: '必須使用加溫輸血儀防止低體溫；按照紅血球、血漿、血小板 1:1:1 輸注避免稀釋；及時補充葡萄糖酸鈣拮抗血袋中抗凝劑枸櫞酸中毒。'
      },
      {
        stationNumber: 5,
        stationTitle: '產科危機資源管理 (CRM) 團隊溝通站',
        taskPrompt: '在 AFE 混亂現場，隊長如何運用閉環溝通 (Closed-loop communication) 指派任務。',
        keyPoints: ['指定具體姓名', '明確藥物與劑量', '受令者大聲覆誦確認完成', '定時平息噪音簡報進度'],
        sampleModelAnswer: '「張護理師，請立即靜脈推注 Epinephrine 1mg！」「張護理師收到，現在推注 Epinephrine 1mg……已推注完畢！」「李醫師，請立即接手壓胸，我來評估心律！」保持指令清晰覆誦。'
      }
    ],
    takeawayTable: [
      { clue: '分娩前後突發胸痛、低血氧發紺、低血壓、抽搐', focus: '羊水栓塞 (AFE) 經典四聯徵' },
      { clue: '心跳停止時特異性協定', focus: '高品質 CPR + 插管 + AOK (Atropine+Ondansetron+Ketorolac)' },
      { clue: 'ROSC 後水樣不凝固大出血', focus: '超急性消耗性 DIC，Fibrinogen 暴跌' },
      { clue: 'DIC 止血核心', focus: '啟動 MTP、重劑量 Cryoprecipitate 補充 Fibrinogen、TXA、Bakri 水球' },
      { clue: '孕期未分娩心跳停止鐵律', focus: '4 分鐘未復甦，5 分鐘內執行現場死前剖腹產 (PMCD)' }
    ],
    pathophysiologySummary: '羊水有形成分破入母體血液 → 引發急性全身性過敏樣反應 (Anaphylactoid) → 急性廣泛性肺動脈痙攣 → 急性肺心症、右心衰竭與低血氧休克 → 心肌缺氧左心功能衰竭 → 羊水促凝物質激發全身微血栓形成 → 凝血因子全盤消耗 → 猛爆性 DIC 與致命性大出血。',
    injections: [
      {
        id: 'inj-c8-vf-arrest',
        title: '突發危機注入：心電圖轉為粗糙心室纖維顫動 (Coarse VF)',
        description: '導師注入：CPR 過程中監視器突然呈現混亂無規則大鋸齒波形 (VF)！',
        vitalsOverride: {
          hr: 220,
          bp: '0/0',
          spo2: 60
        },
        newSituationPrompt: '緊急警報！監視器出現心室纖維顫動 (Ventricular Fibrillation, VF)！',
        requiredActionPrompt: '此時急救團隊之第一優先動作與電擊能量為何？',
        correctResponse: '所有人離開病床 (All clear)！立即使用去顫電擊器以雙相波 200 焦耳 (Joule) 進行非同步去顫電擊 (Defibrillation)，電擊後不停頓立刻恢復 2 分鐘胸外按壓！'
      }
    ]
  },
  rawContent: RAW_EXTRACTED_TEXTS['case_8'] || ''
};
