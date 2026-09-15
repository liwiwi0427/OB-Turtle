import { ClinicalCase } from '../../types/megacode';
import { RAW_EXTRACTED_TEXTS } from '../rawExtractedTexts';

export const case1: ClinicalCase = 
  {
    id: 'case-1',
    caseNumber: 1,
    title: '案例一：今天寶寶怎麼一直沒有動？',
    subtitle: '妊娠高血壓合併胎兒窘迫 (Gestational HTN + Fetal Distress)',
    category: 'fetal_distress',
    targetDiagnosis: '妊娠高血壓合併重度子癲前症，胎盤灌流不足引發胎兒窘迫',
    estimatedTimeMin: 15,
    difficulty: 'Intermediate',
    patientProfile: {
      age: 30,
      gravidaPara: 'G1P0',
      gestationalAge: '36+5 週',
      pastHistory: ['無慢性高血壓', '母親有高血壓病史', '近兩週血壓逐漸升高未回診'],
      chiefComplaint: '今天上午胎動明顯減少，持續性頭痛及眼前閃光感',
      bmi: 30.0
    },
    phases: [
      {
        phaseNumber: 1,
        title: '第一階段：急診檢傷與初步評估',
        subtitle: '主訴、生命徵象與非壓力試驗 (NST)',
        patientQuote: '昨天寶寶還一直踢，今天幾乎沒什麼動，而且我一直頭痛，看東西有點模糊。',
        story: '30歲初產婦，懷孕 36+5 週，因自覺胎動驟減併發嚴重頭痛前來急診。臉部及雙下肢呈現明顯 2+ 水腫。',
        vitals: {
          bp: '162/104',
          hr: 96,
          rr: 20,
          spo2: 97,
          temp: 36.8,
          fhr: 170,
          fhrPattern: 'Baseline 170 bpm (Tachycardia), Moderate variability, 無 Acceleration',
          uterineTension: '柔軟，無宮縮',
          bleedingAmount: '無陰道出血，未破水'
        },
        physicalExam: [
          '意識清醒但表情痛苦，抱怨雙顳部搏動性頭痛',
          '視力檢查：自述視物模糊且偶有閃光暗點 (Scotoma)',
          '右上腹/心窩部輕微壓痛',
          '深腱反射 (DTR)：膝反射 3+ (Hyperreflexia) 併輕度踝攣縮 (Clonus 1 beat)'
        ],
        questions: [
          {
            id: 'c1-q1',
            prompt: '針對目前母體血壓 162/104 mmHg（重測 164/106 mmHg）伴隨頭痛視障，以及胎兒 NST 呈現 Tachycardia 且無加速，首要臨床推理為何？',
            learningObjective: '辨識妊娠期重度高血壓合併神經系統危急徵象與胎盤灌流不足',
            options: [
              {
                id: 'c1-q1-a',
                text: '此為正常懷孕末期自律神經失調，給予定神鎮靜藥物後返家休養',
                isCorrect: false,
                scoreChange: -20,
                stabilityImpact: -25,
                explanation: '錯誤！血壓 ≥160/110 mmHg 且出現中樞神經徵象為重度子癲前症警訊，若不處置可能進展為抽搐或胎死腹中。'
              },
              {
                id: 'c1-q1-b',
                text: '高度懷疑妊娠高血壓合併重度子癲前症徵象，且胎兒可能已出現早期代償性缺氧（心搏過速）',
                isCorrect: true,
                scoreChange: 25,
                stabilityImpact: 15,
                explanation: '正確！母體血管痙攣引起重度高血壓、神經與肝臟缺血；胎盤灌流不足刺激胎兒交感神經，導致胎心基線過速。'
              },
              {
                id: 'c1-q1-c',
                text: '應立即給予大量水份灌注以利尿，先不需抽血或驗尿',
                isCorrect: false,
                scoreChange: -15,
                stabilityImpact: -20,
                explanation: '錯誤！子癲前症患者血管內皮受損、微血管通透性增加，盲目輸液易誘發急性肺水腫。'
              }
            ]
          }
        ],
        quickActions: [
          {
            id: 'act-left-tilt',
            name: '左側臥位 (Left Lateral Tilt)',
            category: 'position',
            icon: 'Activity',
            isAppropriate: true,
            stabilityDelta: 10,
            feedback: '減輕下腔靜脈壓迫，增加回心血量與子宮胎盤灌流量！'
          },
          {
            id: 'act-iv-access',
            name: '建立 18G 靜脈管路並備抽血/尿液',
            category: 'procedure',
            icon: 'Syringe',
            isAppropriate: true,
            stabilityDelta: 10,
            feedback: '成功建立雙管路，同時採檢 CBC、AST/ALT、Cr、Uric acid 及尿蛋白。'
          },
          {
            id: 'act-o2',
            name: '給予氧氣面罩 8-10 L/min',
            category: 'airway_oxygen',
            icon: 'Wind',
            isAppropriate: true,
            stabilityDelta: 5,
            feedback: '改善母體動脈氧合，提升絨毛間隙氧分壓。'
          }
        ]
      },
      {
        phaseNumber: 2,
        title: '第二階段：檢驗報告回報與 NST 惡化',
        subtitle: '靶器官受損指標分析與胎心異常變異',
        patientQuote: '醫生，我右上腹好像越來越悶脹……寶寶心跳怎麼聽起來變慢了？',
        story: '尿液檢驗與抽血報告出爐，證實多重器官受累。30 分鐘後追蹤 NST，胎心基線進一步升高，且基線變異度明顯縮減。',
        vitals: {
          bp: '168/108',
          hr: 102,
          rr: 21,
          spo2: 96,
          temp: 36.9,
          fhr: 175,
          fhrPattern: 'Baseline 175 bpm, Minimal variability (<5 bpm), 出現 Variable Deceleration',
          uterineTension: '宮縮不規則，張力略高',
          bleedingAmount: '無出血'
        },
        labs: [
          { item: 'Urine Protein', value: '3+', unit: 'dipstick', abnormal: true },
          { item: 'Platelet Count', value: '118,000', unit: '/μL', reference: '150,000-400,000', abnormal: true },
          { item: 'AST (GOT)', value: '68', unit: 'U/L', reference: '10-40', abnormal: true },
          { item: 'ALT (GPT)', value: '72', unit: 'U/L', reference: '10-40', abnormal: true },
          { item: 'Serum Creatinine', value: '1.2', unit: 'mg/dL', reference: '0.5-0.9', abnormal: true }
        ],
        questions: [
          {
            id: 'c1-q2',
            prompt: '檢驗報告顯示尿蛋白 3+、血小板下降至 11.8 萬、肝功能指數上升及肌酸酐 1.2 mg/dL，此時臨床確診與處置重點為何？',
            learningObjective: '確立子癲前症嚴重特徵並啟動器官保護與抗抽搐治療',
            options: [
              {
                id: 'c1-q2-a',
                text: '診斷為子癲前症合併嚴重特徵 (Preeclampsia with severe features)，需立即給予硫酸鎂 (Magnesium Sulfate) 預防痙攣並靜脈降壓',
                isCorrect: true,
                scoreChange: 30,
                stabilityImpact: 20,
                explanation: '正確！符合血壓 ≥160/110、血小板低下、肝腎功能異常與神經症狀，MgSO4 為預防子癲發作首選，Labetalol/Hydralazine 控制血壓。'
              },
              {
                id: 'c1-q2-b',
                text: '僅為單純慢性腎炎惡化，暫時口服止痛藥追蹤即可',
                isCorrect: false,
                scoreChange: -25,
                stabilityImpact: -25,
                explanation: '危險錯誤！患者已出現多重器官損傷與血小板進行性消耗，延誤治療極易導致 HELLP 症候群或子癲抽搐。'
              }
            ]
          }
        ],
        quickActions: [
          {
            id: 'act-mgso4',
            name: '給予硫酸鎂 (MgSO4) Loading dose 4g IV',
            category: 'medication',
            icon: 'ShieldAlert',
            isAppropriate: true,
            stabilityDelta: 20,
            feedback: '硫酸鎂已於 20 分鐘內給予完畢，隨後以 1-2 g/hr 持續點滴維持，膝反射維持在 2+，呼吸平穩。'
          },
          {
            id: 'act-labetalol',
            name: '給予 Labetalol 20mg IV slow push',
            category: 'medication',
            icon: 'Pill',
            isAppropriate: true,
            stabilityDelta: 15,
            feedback: '血壓自 168/108 mmHg 漸降至 148/94 mmHg，降低腦出血危險。'
          }
        ]
      },
      {
        phaseNumber: 3,
        title: '第三階段：急性胎兒窘迫 (Late Decelerations)',
        subtitle: '胎盤功能衰竭與臍動脈阻力激增',
        patientQuote: '肚子一直硬硬的……寶寶完全沒有動了……我好害怕！',
        story: '約 20 分鐘後，產婦感覺腹壁持續繃緊，NST 監測儀出現週期性胎心晚期減速 (Recurrent Late Decelerations)，床邊超音波顯示臍動脈都卜勒阻力大幅增高。',
        vitals: {
          bp: '170/112',
          hr: 110,
          rr: 24,
          spo2: 95,
          temp: 36.9,
          fhr: 180,
          fhrPattern: 'Baseline 180 bpm, Minimal variability, 每次宮縮均伴隨典型的 Late Deceleration',
          uterineTension: '宮縮頻率 2-3 分鐘一次，子宮弛緩期張力偏高',
          bleedingAmount: '少量暗紅色微滲'
        },
        diagnosticImaging: {
          type: '產科床邊超音波 (Bedside Obstetric Ultrasound)',
          findings: '胎兒預估體重 (EFW) 2400g (小於第 10 百分位，FGR)。臍動脈舒張期末期血流阻力 (RI) 明顯升高，S/D ratio 升高。',
          details: '長期子癲前症血管病變導致胎盤絨毛微血管缺血硬化，代償能力完全耗竭。'
        },
        questions: [
          {
            id: 'c1-q3',
            prompt: 'NST 出現反覆晚期減速 (Recurrent Late Decelerations) 且變異度極小，臍動脈阻力升高，這在病理機轉上代表什麼意義？',
            learningObjective: '理解晚期減速之病理生理學：子宮收縮導致本已受損之胎盤絨毛間隙血流斷絕引發急性胎兒缺氧',
            options: [
              {
                id: 'c1-q3-a',
                text: '代表胎兒頭部受到產道機械性壓迫（迷走神經反射），屬正常現象不需處理',
                isCorrect: false,
                scoreChange: -20,
                stabilityImpact: -30,
                explanation: '錯誤！那是早期減速 (Early deceleration)。晚期減速是子宮胎盤灌流不足 (Uteroplacental insufficiency) 的極度危急表現！'
              },
              {
                id: 'c1-q3-b',
                text: '代表子宮胎盤血流灌注衰竭，宮縮高峰期胎兒血氧降至危險閾值以下，胎兒已有嚴重酸中毒危險',
                isCorrect: true,
                scoreChange: 30,
                stabilityImpact: 15,
                explanation: '正確！晚期減速通常在宮縮頂點之後才開始降心跳，宮縮結束後才慢慢恢復，是胎兒窘迫 (NRFS) Category III 的危象！'
              }
            ]
          }
        ],
        quickActions: [
          {
            id: 'act-call-ob',
            name: '立即啟動產科/麻醉/新生兒科緊急剖腹產小組 (Code C/S)',
            category: 'emergency',
            icon: 'BellRing',
            isAppropriate: true,
            stabilityDelta: 25,
            feedback: '手術室、麻醉科與兒科急救團隊已就位，通知備血 2U pRBC！'
          }
        ]
      },
      {
        phaseNumber: 4,
        title: '第四階段：決定性手術與新生兒復甦',
        subtitle: '緊急剖腹產終止妊娠與術後評估',
        patientQuote: '謝謝醫生護理師……寶寶一定要平安……',
        story: '醫療團隊果斷執行緊急剖腹產，自劃刀至娩出胎兒僅用 9 分鐘。男嬰體重 2350g，Apgar Score 5分（1分鐘）→ 8分（5分鐘）。臍帶動脈血 pH 7.08。',
        vitals: {
          bp: '142/88',
          hr: 88,
          rr: 18,
          spo2: 99,
          temp: 36.7,
          fhr: 0,
          fhrPattern: '胎兒已順利娩出',
          uterineTension: '術中宮縮良好，按摩後堅硬',
          bleedingAmount: '術中出血量約 550 mL'
        },
        labs: [
          { item: 'Platelet (術前即時)', value: '92,000', unit: '/μL', abnormal: true },
          { item: 'AST', value: '110', unit: 'U/L', abnormal: true },
          { item: 'ALT', value: '105', unit: 'U/L', abnormal: true },
          { item: 'LDH', value: '650', unit: 'U/L', reference: '<250', abnormal: true },
          { item: 'Cord Blood pH', value: '7.08', unit: 'pH', reference: '7.25-7.35', abnormal: true }
        ],
        questions: [
          {
            id: 'c1-q4',
            prompt: '術後產婦檢驗顯示血小板降至 9.2 萬，AST/ALT 與 LDH 明顯增高，臍帶血 pH 7.08。產後首要防範的致命性併發症為何？',
            learningObjective: '辨識子癲前症產後 24-48 小時內進展為 HELLP 症候群與子癲抽搐之危險期',
            options: [
              {
                id: 'c1-q4-a',
                text: '持續給予硫酸鎂 (MgSO4) 至少 24 小時以防產後子癲抽搐，並嚴密監測尿量、深反射與 HELLP 演變',
                isCorrect: true,
                scoreChange: 25,
                stabilityImpact: 20,
                explanation: '正確！生產終止妊娠雖是唯一根治之道，但約 30% 子癲抽搐發生於產後 48 小時內。維持 MgSO4 與血壓控制至關重要。'
              },
              {
                id: 'c1-q4-b',
                text: '既然胎兒已生出，所有高血壓藥物與硫酸鎂皆可立刻停用，轉入普通病房',
                isCorrect: false,
                scoreChange: -25,
                stabilityImpact: -30,
                explanation: '致命錯誤！產後 24-48 小時為微血管重吸收與痙攣反彈高峰，猝然停藥常誘發產後子癲發作及腦出血。'
              }
            ]
          }
        ],
        quickActions: [
          {
            id: 'act-postop-mgso4',
            name: '維持硫酸鎂 1g/hr 持續靜脈滴注 24 小時',
            category: 'medication',
            icon: 'Shield',
            isAppropriate: true,
            stabilityDelta: 20,
            feedback: '產婦轉入產後加護病房，持續記錄尿量 (每小時 >30 mL) 與呼吸頻率。'
          }
        ]
      }
    ],
    teacherGuide: {
      reasoningSteps: [
        {
          stepNumber: 1,
          title: '識別新發重度高血壓',
          clues: ['妊娠 20 週後血壓 ≥160/104 mmHg', '初產婦、BMI 30、家族高血壓史'],
          reasoningPath: ['排除慢性高血壓 → 定位為妊娠期高血壓疾病譜系'],
          conclusion: '需立即排查子癲前症重度徵象'
        },
        {
          stepNumber: 2,
          title: '靶器官損傷與器官受累確認',
          clues: ['蛋白尿 3+', '嚴重頭痛/視力模糊', '血小板低下 11.8 萬', '肝指數 AST/ALT 異常上升'],
          reasoningPath: ['血管內皮損害引起微血管通透性增加與血管收縮痙攣'],
          conclusion: '診斷確立：子癲前症合併嚴重特徵 (Preeclampsia with severe features)'
        },
        {
          stepNumber: 3,
          title: '母體血管痙攣對胎兒的連鎖打擊',
          clues: ['胎動驟減', 'Baseline 170-175 bpm', '晚期減速 (Late decels)', '變異度喪失 (Minimal variability)'],
          reasoningPath: ['子宮螺旋動脈硬化狹窄 → 胎盤血流灌注斷層 → 胎兒低血氧酸中毒'],
          conclusion: '胎兒窘迫 (Category III) 確立，無等待陰道分娩之餘地'
        },
        {
          stepNumber: 4,
          title: '急症終止妊娠與產後監測',
          clues: ['臍帶血 pH 7.08 證實酸中毒', '術前血小板續降至 9.2 萬，LDH 飆高'],
          reasoningPath: ['胎兒已耐受不能，緊急剖腹產為母胎唯一挽救手段；產後須防杜 HELLP 與產後子癲'],
          conclusion: '產後維持硫酸鎂與血壓管理至少 24 小時'
        }
      ],
      maternalClues: ['持續重度高血壓 (≥160/110)', '蛋白尿 3+', '中樞頭痛與視力暗點', '右上腹壓痛 (肝被膜張力增高)', '血小板進行性下降 (消耗性微血管病變)'],
      fetalClues: ['胎動自覺完全消失', '胎心率過速 → 變異度消失', '晚期減速 (Late deceleration)', '超音波臍動脈阻力指數 (RI) 激增', '生長受限 (FGR)'],
      maternalFetalCorrelation: '子癲前症本質為全身血管內皮受損與廣泛性小動脈痙攣。胎盤絨毛間隙實質為血管床，當子宮動脈痙攣缺血，胎盤灌流即刻急降。胎兒自初期代償性過速、代償失效晚期減速，終至嚴重酸中毒與窘迫。',
      osceStations: [
        {
          stationNumber: 1,
          stationTitle: 'NST 圖譜即時判讀站',
          taskPrompt: '請考生在 2 分鐘內分析監測圖，指出 Baseline、Variability、Deceleration 型態及 NICHD 分級。',
          keyPoints: ['辨認 Baseline 175-180 bpm', '變異度 <5 bpm (Minimal)', '每次宮縮伴隨晚期減速 (Late deceleration)', '歸類為 Category III 異常圖譜'],
          sampleModelAnswer: '此圖譜為 Category III 胎心監測，基準心跳為 175 bpm，變異性低下，宮縮頂點後出現典型的晚期減速，反映胎盤功能嚴重受損，需立即行宮內復甦並準備終止妊娠。'
        },
        {
          stationNumber: 2,
          stationTitle: 'SBAR 跨專業危急通報站',
          taskPrompt: '請考生使用標準 SBAR 結構向產科值班主治醫師進行危急情境通報。',
          keyPoints: ['S: 產婦姓名週數與胎心晚期減速現狀', 'B: 重度子癲前症與待產病史', 'A: 胎盤灌流不足與急性胎兒窘迫評估', 'R: 建議立即至 OR 執行緊急剖腹產'],
          sampleModelAnswer: 'S: 報告醫師，我是急診待產室護理師，36+5 週 G1P0 產婦目前胎心出現反覆晚期減速；B: 病人血壓 168/108，尿蛋白 3+，有嚴重頭痛；A: 評估為重度子癲前症併發急性胎兒窘迫；R: 建議立即啟動緊急剖腹產，麻醉科與手術室已在線待命。'
        },
        {
          stationNumber: 3,
          stationTitle: '宮內復甦 (Intrauterine Resuscitation) 優先處置站',
          taskPrompt: '請考生按優先順序口述並演練 4 項非手術性宮內復甦核心動作。',
          keyPoints: ['改變母體姿勢為左側臥', '高流量氧氣 8-10 L/min (Non-rebreather)', '快速靜脈輸液維持血容 (謹防肺水腫)', '若有點滴催產素必須立停'],
          sampleModelAnswer: '第一：立即協助左側臥減輕血管壓迫；第二：面罩給予 100% 氧氣 10 L/min；第三：立即停止任何 Oxytocin 輸注；第四：調快一般輸液並迅速通報醫師。'
        },
        {
          stationNumber: 4,
          stationTitle: '硫酸鎂 (MgSO4) 藥理機制與中毒監控站',
          taskPrompt: '說明硫酸鎂的使用目的、劑量以及護理人員三項關鍵毒性監測指標。',
          keyPoints: ['目的：抑制中樞神經突觸乙醯膽鹼釋放，預防子癲痙攣發作', '監測：深腱反射 (DTR 膝反射消失是早期中毒指標)', '呼吸頻率 ≥12-16 次/分', '每小時尿量 ≥30 mL (硫酸鎂由腎臟排泄)'],
          sampleModelAnswer: '硫酸鎂用於預防子癲發作。給藥期間每小時嚴密評估：膝腱反射是否存在、每分鐘呼吸不可少於 12-14 次、尿量每小時不可少於 30 mL。若中毒備妥 10% Calcium gluconate 解毒。'
        },
        {
          stationNumber: 5,
          stationTitle: '緊急剖腹產術前整備與安全把關站',
          taskPrompt: '說明此類高風險產婦進入手術室前必備之安全核對清單。',
          keyPoints: ['雙管 18G IV 暢通', '血小板計數與凝血功能確認 (是否可半身麻醉)', '備血 2U 抵達', '新生兒急救保溫台與兒科團隊就位'],
          sampleModelAnswer: '確認血小板 9.2 萬並已告知麻醉科，因血小板低下且緊急可能需全身麻醉；留置導尿管排空膀胱；備血到位；保溫箱與新生兒急救設備開機預熱完成。'
        }
      ],
      takeawayTable: [
        { clue: '妊娠 20 週後新發血壓 ≥160/110 mmHg', focus: '重度高血壓警訊，需立即藥物降壓保護母體腦血管' },
        { clue: '尿蛋白 3+、頭痛、視物暗點、右上腹痛', focus: '符合子癲前症嚴重特徵，多器官內皮受損' },
        { clue: '血小板進行性降低、AST/ALT 與 LDH 升高', focus: '微血管溶血與肝損傷，警惕惡化為 HELLP 症候群' },
        { clue: '胎動劇減、NST 出現晚期減速、變異度低下', focus: '胎盤灌流衰竭，胎兒急性低氧血症 (Category III)' },
        { clue: '臍動脈都卜勒阻力指數顯著上升', focus: '胎盤絨毛血管阻力高，無法提供足夠氣體交換' },
        { clue: '新生兒臍動脈血 pH 7.08', focus: '客觀證實胎兒已處於失代償酸中毒，印證緊急終止妊娠之必要性' }
      ],
      pathophysiologySummary: '妊娠高血壓／子癲前症 → 全身血管內皮受損與小動脈痙攣 → 胎盤螺旋動脈硬化狹窄 → 絨毛間隙血液灌流嚴重不足 → 胎兒長期缺氧受限 (FGR) → 宮縮引發急性低氧 → 晚期減速與變異度喪失 → 胎兒失代償酸中毒。',
      injections: [
        {
          id: 'inj-c1-seizure',
          title: '突發危機注入：產婦突發全身強直陣攣性抽搐 (Eclamptic Fit)',
          description: '教學導師注入情境：產婦突然眼神上吊、牙關緊閉、四肢抽搐失去意識！',
          vitalsOverride: {
            bp: '188/118',
            hr: 135,
            spo2: 84,
            fhr: 80,
            fhrPattern: 'Prolonged deceleration (<80 bpm)'
          },
          newSituationPrompt: '警報！產婦發生子癲症 (Eclampsia) 抽搐，SpO2 掉至 84%，胎心驟降至 80 bpm！',
          requiredActionPrompt: '請問當下第一優先處置為何？',
          correctResponse: '維持呼吸道暢通（側臥防吸入性肺炎）、面罩高流量給氧、靜脈追加 MgSO4 2-4g IV 緩注，抽搐停止後立即送開刀房剖腹產！'
        },
        {
          id: 'inj-c1-brady',
          title: '突發危機注入：胎心音持續深減速墜至 60 bpm 不回升',
          description: '教學導師注入情境：NST 出現 Prolonged Deceleration，胎心掉至 60 bpm 已持續超過 2 分鐘！',
          vitalsOverride: {
            fhr: 60,
            fhrPattern: 'Severe Bradycardia / Terminal prolonged deceleration (60 bpm)',
            spo2: 94
          },
          newSituationPrompt: '緊急廣播：胎心驟停式減速至 60 bpm，超過 2 分鐘未見復甦跡象！',
          requiredActionPrompt: '團隊應採取什麼決定性步驟？',
          correctResponse: '啟動 Crash C-Section（極度緊急剖腹產），在 3-5 分鐘內於產房或開刀房娩出胎兒！'
        }
      ]
    },
    rawContent: RAW_EXTRACTED_TEXTS['case_1'] || ''
  }
;