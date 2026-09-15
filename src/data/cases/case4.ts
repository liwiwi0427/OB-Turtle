import { ClinicalCase } from '../../types/megacode';
import { RAW_EXTRACTED_TEXTS } from '../rawExtractedTexts';

export const case4: ClinicalCase = {
  id: 'case-4',
  caseNumber: 4,
  title: '案例四：昨天還好好的，今天怎麼突然肚子一直痛？',
  subtitle: '妊娠糖尿病合併胎盤早期剝離 (GDM + Concealed Abruption)',
  category: 'diabetes_abruption',
  targetDiagnosis: '妊娠糖尿病控制不良胎盤微血管病變，誘發急性隱匿性胎盤早期剝離與高張性板狀腹',
  estimatedTimeMin: 15,
  difficulty: 'Advanced',
  patientProfile: {
    age: 35,
    gravidaPara: 'G2P1',
    gestationalAge: '36+2 週',
    pastHistory: ['妊娠 28 週確診 GDM 未規則控糖', '超音波顯示胎兒偏大 (巨大兒趨向)', '無外傷跌倒史'],
    chiefComplaint: '下午突發持續性刀割樣腹部劇痛，無間歇放鬆，自覺胎動驟停',
    bmi: 31.2
  },
  phases: [
    {
      phaseNumber: 1,
      title: '第一階段：急診檢傷與板狀腹觸診',
      subtitle: '腹部劇烈持續脹痛、板狀腹與微量出血之陷阱',
      patientQuote: '我的肚子硬得像塊大石頭一樣，痛得停不下來，但內褲只有幾滴暗紅色的血……',
      story: '35歲產婦，36+2週，因突發持續下腹絞痛至急診。產婦面容驚恐蒼白，雙手緊護腹部拒絕任何按壓。',
      vitals: {
        bp: '148/94',
        hr: 112,
        rr: 24,
        spo2: 97,
        temp: 36.9,
        fhr: 110,
        fhrPattern: 'Baseline 110 bpm, Minimal variability, 胎動未測得',
        uterineTension: '板狀硬 (Board-like rigidity)，無間歇期放鬆，觸痛極劇烈',
        bleedingAmount: '僅少量暗紅色陰道滲血 (約 20 mL)'
      },
      physicalExam: [
        '腹部觸診：子宮張力極高如木板 (Woody / Board-like abdomen)，無法觸摸胎體輪廓',
        '子宮底高度比前次產檢驟升 3 公分（提示子宮內大量積血）',
        '自訴腰背部劇痛難忍'
      ],
      questions: [
        {
          id: 'c4-q1',
          prompt: '外出血僅 20 mL，但子宮卻硬如木板且觸痛劇烈、心跳 112 bpm，臨床首要判斷為何？',
          learningObjective: '辨識隱匿型胎盤早期剝離 (Concealed Placental Abruption) 之致命陷阱',
          options: [
            {
              id: 'c4-q1-a',
              text: '外出血少代表只是假性陣痛，可能是胎兒踢動引起的局部肌肉拉傷',
              isCorrect: false,
              scoreChange: -30,
              stabilityImpact: -35,
              explanation: '致死陷阱！胎盤早期剝離中約 20% 為「隱匿型 (Concealed)」，血液積存在胎盤後方未流出，外出血量完全不能反映失血真實嚴重度！'
            },
            {
              id: 'c4-q1-b',
              text: '高度懷疑重度隱匿性胎盤早期剝離 (Concealed Abruption)，胎盤後已形成巨大血腫，且有胎兒宮內窘迫',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 20,
              explanation: '正確！持續高張板狀腹、劇烈壓痛與宮底上升是隱匿性胎盤早剝的經典特徵。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c4-no-exam',
          name: '嚴禁盲目手指陰道內診 (NO Digital Vaginal Exam)',
          category: 'procedure',
          icon: 'Ban',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '在超音波排除前置胎盤前，嚴禁手指伸入子宮頸，避免致命撕裂大出血！'
        },
        {
          id: 'act-c4-bedside-us',
          name: '急推床邊超音波 (Bedside US) 評估胎盤與血腫',
          category: 'lab_diag',
          icon: 'Activity',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '超音波顯示胎盤增厚達 6 cm，胎盤後方可見低回音液性暗區 (Retroplacental hematoma)！'
        }
      ]
    },
    {
      phaseNumber: 2,
      title: '第二階段：胎心暴跌與凝血功能消耗',
      subtitle: '急性胎兒窘迫與消耗性凝血病變 (DIC 早期)',
      patientQuote: '我覺得好冷……眼前一陣陣發黑，快救救我的孩子！',
      story: '胎盤後血腫持續擴大，壓迫阻斷絨毛血流。NST 出現胎心持續減速掉至 80 bpm。急驗凝血功能顯示纖維蛋白原 (Fibrinogen) 進行性暴跌。',
      vitals: {
        bp: '102/60',
        hr: 126,
        rr: 26,
        spo2: 94,
        temp: 36.1,
        fhr: 80,
        fhrPattern: 'Prolonged deceleration / Bradycardia (80 bpm), 變異度完全消失 (Absent)',
        uterineTension: '持續板狀強直硬度',
        bleedingAmount: '陰道暗紅出血微增至 80 mL'
      },
      labs: [
        { item: 'Blood Glucose (血糖)', value: '235', unit: 'mg/dL', reference: '70-140', abnormal: true },
        { item: 'Hb / Hct', value: '8.2 / 24.6%', abnormal: true },
        { item: 'Fibrinogen', value: '140', unit: 'mg/dL', reference: '300-600 (孕期)', abnormal: true },
        { item: 'Platelet', value: '98,000', unit: '/μL', abnormal: true },
        { item: 'D-dimer', value: '18.5', unit: 'μg/mL', abnormal: true }
      ],
      questions: [
        {
          id: 'c4-q2',
          prompt: '孕晚期正常 Fibrinogen 應升高至 400-600 mg/dL，此時產婦降至 140 mg/dL 且 D-dimer 飆高，臨床警訊為何？',
          learningObjective: '掌握胎盤早剝促發 DIC 之急驟進展',
          options: [
            {
              id: 'c4-q2-a',
              text: '孕期纖維蛋白原 <150-200 mg/dL 代表體內大量消耗凝血因子，已發生急性瀰漫性血管內凝血 (DIC)',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 25,
              explanation: '正確！胎盤剝離釋放組織因子 (Tissue Factor) 入血促發外源性凝血，迅速耗盡纖維蛋白原，極易術中大出血不止。'
            },
            {
              id: 'c4-q2-b',
              text: '此數值仍在一般成年人正常值範圍，不需擔心出血問題',
              isCorrect: false,
              scoreChange: -30,
              stabilityImpact: -35,
              explanation: '致命盲點！正常孕晚期處於高凝狀態，Fibrinogen 常達 400 以上；若跌破 200 即屬危急，跌破 100-150 即為嚴重 DIC！'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c4-code-cs',
          name: '通報開刀房啟動超緊急剖腹產 (Crash C-Section)',
          category: 'emergency',
          icon: 'Flame',
          isAppropriate: true,
          stabilityDelta: 25,
          feedback: '全速推入開刀房！通知麻醉科與兒科團隊到位！'
        },
        {
          id: 'act-c4-blood-bank',
          name: '血庫緊急調用 4U pRBC + 4U FFP + 10U 冷凍沉澱品 (Cryo)',
          category: 'procedure',
          icon: 'Droplet',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: '加溫輸血加壓器備妥，預防術中廣泛性滲血。'
        }
      ]
    },
    {
      phaseNumber: 3,
      title: '第三階段：術中探查與子宮卒中 (Couvelaire Uterus)',
      subtitle: '剝離面超過 60% 與子宮肌層廣泛浸潤',
      patientQuote: '（產婦於全身麻醉下平穩入睡）',
      story: '手術刀劃開子宮，羊水呈現深咖啡色血性混濁。胎兒迅速娩出（體重 3750g 男嬰）。胎盤娩出後，發現後方剝離面積達 65%，凝血塊超過 800 mL！子宮外表呈現紫藍色斑駁。',
      vitals: {
        bp: '92/54',
        hr: 118,
        rr: 20,
        spo2: 98,
        temp: 36.3,
        fhr: 0,
        fhrPattern: '胎兒已順利娩出',
        uterineTension: '庫弗萊爾子宮 (Couvelaire Uterus)，子宮肌壁紫黑色血腫浸潤',
        bleedingAmount: '術中血腫加出血累積達 1500 mL'
      },
      questions: [
        {
          id: 'c4-q3',
          prompt: '術中見子宮外表呈紫藍色斑駁（庫弗萊爾子宮 Couvelaire Uterus），此現象之形成機轉與首要處理為何？',
          learningObjective: '認識子宮胎盤卒中之病理與子宮收縮乏力之急救',
          options: [
            {
              id: 'c4-q3-a',
              text: '此為胎盤後血液滲入子宮肌纖維間及漿膜下所致，肌纖維受損易引發嚴重複發性子宮收縮乏力，需積極給予宮縮劑、子宮按摩甚至壓迫縫合 (B-Lynch)',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 20,
              explanation: '正確！卒中子宮肌層被血液浸潤分離，極易術後頑固性無力收縮。傳統觀點不需立即切除子宮，應先積極止血與收縮子宮。'
            },
            {
              id: 'c4-q3-b',
              text: '子宮呈現紫黑色即已壞死，唯一處置為立刻切除全子宮',
              isCorrect: false,
              scoreChange: -20,
              stabilityImpact: -25,
              explanation: '過度治療！多數 Couvelaire uterus 在積極止血、輸注凝血因子與加強收縮後可恢復張力，保留子宮。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c4-blynch',
          name: '施行子宮背帶式壓迫縫合術 (B-Lynch Suture) 與注射 Carboprost',
          category: 'procedure',
          icon: 'Scissors',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: 'B-Lynch 縫合成功壓迫創面，子宮肌層明顯緊縮變硬，滲血大幅減少！'
        }
      ]
    },
    {
      phaseNumber: 4,
      title: '第四階段：母胎加護與復原評估',
      subtitle: '新生兒低血糖預防與母體 DIC 糾正',
      patientQuote: '寶寶哭聲好響亮……我也活過來了……',
      story: '男嬰經新生兒科積極復甦（插管通氣擦乾刺激），Apgar 4→8分，送 NICU 密切追蹤血糖。產婦輸注血製品後 Fibrinogen 回升至 220 mg/dL，生命徵象穩定。',
      vitals: {
        bp: '116/72',
        hr: 86,
        rr: 17,
        spo2: 99,
        temp: 36.6,
        fhr: 0,
        fhrPattern: '已娩出轉 NICU',
        uterineTension: '堅硬收縮良好',
        bleedingAmount: '術後惡露少量'
      },
      questions: [
        {
          id: 'c4-q4',
          prompt: '糖尿病母親所生之巨大男嬰，出生後數小時內最常見之代謝危象為何？應如何預防？',
          learningObjective: '掌握糖尿病母體所生高胰島素血症新生兒低血糖處置',
          options: [
            {
              id: 'c4-q4-a',
              text: '高血糖與高血鈣',
              isCorrect: false,
              scoreChange: -20,
              stabilityImpact: -15,
              explanation: '錯誤！母體高血糖中斷後，胎兒自身高濃度的胰島素會引發嚴重低血糖！'
            },
            {
              id: 'c4-q4-b',
              text: '急性低血糖 (Hypoglycemia <40 mg/dL)，應於出生後 30-60 分鐘內監測微血管血糖，儘早餵食或靜脈輸注葡萄糖',
              isCorrect: true,
              scoreChange: 25,
              stabilityImpact: 20,
              explanation: '正確！胎兒在宮內長期暴露高血糖使胰島 β 細胞增生分泌大量胰島素；斷臍後母體葡萄糖中斷，極易發生抽搐性低血糖。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c4-sugar-check',
          name: '新生兒出生 30 分鐘微量末梢血糖檢測 (Dextrostix)',
          category: 'procedure',
          icon: 'Thermometer',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '新生兒血糖 48 mg/dL，予以初乳餵食並持續監測。'
        }
      ]
    }
  ],
  teacherGuide: {
    reasoningSteps: [
      {
        stepNumber: 1,
        title: '識破「隱匿性出血」的表象',
        clues: ['外出血僅微量 20 mL', '子宮硬如木板且持續劇痛', '宮底高度反常升高'],
        reasoningPath: ['血液積聚於胎盤後無外流通道 → 形成封閉性高壓血腫'],
        conclusion: '確立為隱匿型胎盤早期剝離 (Concealed Abruption)'
      },
      {
        stepNumber: 2,
        title: '糖尿病與胎盤病變關聯',
        clues: ['未嚴格控糖 GDM', '胎兒巨大兒趨勢', '血糖 235 mg/dL'],
        reasoningPath: ['高血糖引起胎盤微血管硬化與滋養層退化，易於脆性撕裂'],
        conclusion: '高危險妊娠併發急症'
      },
      {
        stepNumber: 3,
        title: '急性 DIC 啟動之預警',
        clues: ['Fibrinogen 暴跌至 140 mg/dL', 'D-dimer 飆升', '胎心持續徐緩 80 bpm'],
        reasoningPath: ['剝離面大量組織促凝因子進入母體血循環 → 全身性微血栓與消耗性凝血障礙'],
        conclusion: '立即輸注冷凍沉澱品 (Cryo) 並行緊急剖腹產'
      },
      {
        stepNumber: 4,
        title: '庫弗萊爾子宮與保宮決策',
        clues: ['子宮肌壁紫黑色血腫浸潤', '術中失血 1500 mL'],
        reasoningPath: ['血液浸潤肌層阻礙收縮，先予 B-Lynch 壓迫縫合與強效宮縮劑'],
        conclusion: '保全子宮，預防術後頑固性 PPH'
      }
    ],
    maternalClues: ['持續刀割樣劇痛無放鬆期', '板狀腹 (Board-like abdomen)', '隱匿性出血外表少體內多', '急驟低血壓休克', '纖維蛋白原耗竭 (<150 mg/dL)'],
    fetalClues: ['胎動驟減甚至消失', '胎心持續性徐緩 (<80 bpm)', '羊水血性暗紅', '新生兒高胰島素低血糖高危'],
    maternalFetalCorrelation: '胎盤後血腫不斷擴大撕脫絨毛母體面，造成胎盤實質剝離與阻斷血氧供應；剝離面破裂將組織因子泵入母體血管引發致命 DIC。',
    osceStations: [
      {
        stationNumber: 1,
        stationTitle: '隱匿型胎盤早剝理學檢查評估站',
        taskPrompt: '請口述如何透過子宮觸診、宮底標記與問診快速鑑別前置胎盤與胎盤早剝。',
        keyPoints: ['前置胎盤：無痛、子宮柔軟、鮮血、無壓痛', '胎盤早剝：持續劇痛、板狀硬、暗紅或無血、壓痛強烈'],
        sampleModelAnswer: '觸摸子宮若如木板般堅硬且無間歇放鬆，壓痛明顯，即便無陰道出血亦高度支持胎盤早期剝離；若子宮柔軟無痛純鮮紅出血則多為前置胎盤。'
      },
      {
        stationNumber: 2,
        stationTitle: '急診床邊超音波偽陰性防範站',
        taskPrompt: '說明為何超音波陰性（未見血腫）仍不能完全排除胎盤早剝之診斷。',
        keyPoints: ['超音波對胎盤早剝靈敏度僅約 50-60%', '急性期血塊與胎盤組織回音相近', '必須以臨床症狀（板狀腹、胎心惡化）作為決策指引'],
        sampleModelAnswer: '超音波未見血腫絕不能排除早剝，因為新形成的凝血塊與胎盤實質回音幾乎完全相同。胎盤早剝主要依賴臨床理學檢查（板狀腹、壓痛、宮縮持續不放鬆）進行臨床診斷。'
      },
      {
        stationNumber: 3,
        stationTitle: '產科大量輸血 (MTP) 與 Fibrinogen 補充站',
        taskPrompt: '說明胎盤早剝合併 DIC 時，優先補充哪種血品以快速拉高纖維蛋白原？',
        keyPoints: ['冷凍沉澱品 (Cryoprecipitate)', '每袋含 150-250 mg Fibrinogen', '輸注 10-20 袋可快速將 Fibrinogen 拉升至安全線 200 mg/dL 以上'],
        sampleModelAnswer: '優先輸注冷凍沉澱品 (Cryo)，其纖維蛋白原濃度高於新鮮冷凍血漿 (FFP) 數倍，能以最小輸液體積迅速糾正嚴重低纖維蛋白原血症。'
      },
      {
        stationNumber: 4,
        stationTitle: '庫弗萊爾子宮 (Couvelaire) 處置站',
        taskPrompt: '術中發現 Couvelaire uterus 時，止血保留子宮之階梯處置為何？',
        keyPoints: ['大劑量子宮收縮劑 (Oxytocin + Carboprost)', '雙手壓迫按摩', '子宮壓迫縫合術 (B-Lynch suture)', '子宮動脈結紮或 Bakri balloon'],
        sampleModelAnswer: '給予強效宮縮劑，施行 B-Lynch 壓迫縫合術，糾正凝血功能；若持續大量失血難以控制且危及母體生命時才考慮切除子宮。'
      },
      {
        stationNumber: 5,
        stationTitle: '高危巨大兒肩難產 (Shoulder Dystocia) 預防站',
        taskPrompt: '糖尿病產婦若嘗試陰道分娩，發生肩難產時之 McRoberts 手法與恥骨上加壓要點。',
        keyPoints: ['McRoberts: 產婦雙腿極度屈曲緊貼腹部，擴大骨盆出口', '恥骨上加壓 (Suprapubic pressure): 由助手向下向側方推擠前肩', '切嚴禁宮底加壓 (Fundal pressure)'],
        sampleModelAnswer: '立即呼叫支援；產婦雙大腿極度屈曲緊貼腹部；助手在恥骨聯合上方用力加壓推動前肩；切嚴禁在子宮底推壓以防子宮破裂。'
      }
    ],
    takeawayTable: [
      { clue: '持續腹痛、無放鬆期、板狀硬', focus: '胎盤早期剝離之病理特徵' },
      { clue: '外出血量極少但心跳快血壓降', focus: '隱匿型出血 (Concealed abruption) 陷阱' },
      { clue: '纖維蛋白原跌破 150 mg/dL', focus: '已發生急性 DIC，需備妥 Cryo 與大量輸血' },
      { clue: '胎心 Prolonged deceleration <80 bpm', focus: '胎兒宮內缺血臨界，緊急剖腹產搶救' },
      { clue: '庫弗萊爾子宮 (Couvelaire)', focus: '胎盤後血液浸潤子宮肌層，術後防範頑固性 PPH' }
    ],
    pathophysiologySummary: '妊娠糖尿病血管病變 → 底蛻膜螺旋動脈破裂形成胎盤後血腫 → 血腫剝離周圍絨毛 → 釋放組織因子入母血誘發 DIC → 血液穿透子宮肌層形成庫弗萊爾子宮 → 絨毛血流斷絕致急性胎死宮內或重度窒息。',
    injections: [
      {
        id: 'inj-c4-dic-shock',
        title: '突發危機注入：術中廣泛性滲血與血壓暴跌至 60/30',
        description: '導師注入：手術切口與骨盆創面突然滲水狀不凝固血水，血壓暴跌！',
        vitalsOverride: {
          bp: '60/30',
          hr: 145,
          spo2: 90
        },
        newSituationPrompt: '警報！麻醉科通報：病人發生嚴重 DIC 休克，手術野廣泛滲血，抽血不凝！',
        requiredActionPrompt: '此時麻醉與外科團隊應採取什麼決死搶救步驟？',
        correctResponse: '立即啟動 MTP 快速加溫輸注 pRBC/FFP/Cryo/Platelets (1:1:1:1)，靜脈給予 TXA 1g，盆腔雙側子宮動脈結紮或紗布緊密填塞 (Pelvic Packing)，保溫糾正酸中毒！'
      }
    ]
  },
  rawContent: RAW_EXTRACTED_TEXTS['case_4'] || ''
};
