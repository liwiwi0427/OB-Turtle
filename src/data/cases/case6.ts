import { ClinicalCase } from '../../types/megacode';
import { RAW_EXTRACTED_TEXTS } from '../rawExtractedTexts';

export const case6: ClinicalCase = {
  id: 'case-6',
  caseNumber: 6,
  title: '案例六：肚子一直痛，寶寶怎麼不太動了？',
  subtitle: '胎盤早期剝離 (Placental Abruption)',
  category: 'abruption',
  targetDiagnosis: '妊娠高血壓血管痙攣引發重度胎盤早期剝離、子宮高張強直與胎盤功能崩潰',
  estimatedTimeMin: 15,
  difficulty: 'Advanced',
  patientProfile: {
    age: 35,
    gravidaPara: 'G2P1',
    gestationalAge: '36+4 週',
    pastHistory: ['曾診斷妊娠高血壓服藥中', '昨日血壓 150/96 返家休息', '無跌倒外傷'],
    chiefComplaint: '上午突發下腹刀割樣劇烈絞痛伴腰痠，自覺胎動驟減前來急診',
    bmi: 26.8
  },
  phases: [
    {
      phaseNumber: 1,
      title: '第一階段：急診檢傷與理學檢查',
      subtitle: '持續下腹劇痛、木板樣硬度與暗紅出血',
      patientQuote: '我的肚子一直痛，完全不像陣痛那樣會停……而且寶寶今天幾乎沒什麼動！',
      story: '35歲高血壓產婦，36+4週，因持續性撕裂般腹痛至急診。產婦表情極度痛苦痛苦呻吟。',
      vitals: {
        bp: '154/98',
        hr: 114,
        rr: 22,
        spo2: 97,
        temp: 36.8,
        fhr: 165,
        fhrPattern: 'Baseline 165 bpm, Minimal variability, 偶見早減/晚減',
        uterineTension: '子宮硬如木板 (Woody uterus)，持續強直無放鬆，拒絕按壓',
        bleedingAmount: '陰道流出暗紅色帶凝塊血液約 150 mL'
      },
      physicalExam: [
        '子宮底高度比週數偏高 2 公分',
        '腹部觸診：子宮壁極端高張，觸摸如硬木，完全無法隔著腹壁觸摸胎體',
        '自訴下背部放射性牽扯痛'
      ],
      questions: [
        {
          id: 'c6-q1',
          prompt: '高血壓病史產婦突發「持續不間斷腹痛 + 木板樣堅硬子宮 + 暗紅色血液」，臨床首要診斷為何？',
          learningObjective: '經典鑑別胎盤早期剝離之三聯徵',
          options: [
            {
              id: 'c6-q1-a',
              text: '重度胎盤早期剝離 (Placental Abruption)，高血壓促使底蛻膜滋養動脈破裂形成大血腫',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 20,
              explanation: '正確！高血壓是胎盤早剝最大危險因子；持續腹痛、強直木板腹與暗紅出血是早剝最典型表現。'
            },
            {
              id: 'c6-q1-b',
              text: '完全性前置胎盤 (Placenta Previa)',
              isCorrect: false,
              scoreChange: -25,
              stabilityImpact: -30,
              explanation: '鑑別概念錯誤！前置胎盤為「無痛性、鮮紅色出血、子宮完全柔軟」！'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c6-large-bore',
          name: '建立雙側 16-18G 大口徑靜脈管路並開立晶體輸液',
          category: 'procedure',
          icon: 'Syringe',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '雙管路通暢，預留大量失血輸注通道。'
        },
        {
          id: 'act-c6-type-cross',
          name: '急送血型鑑定與交叉配血 4 單位 (Type & Crossmatch 4U pRBC)',
          category: 'procedure',
          icon: 'Droplet',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '血庫啟動緊急配血流程。'
        }
      ]
    },
    {
      phaseNumber: 2,
      title: '第二階段：胎心惡化與休克代償期',
      subtitle: '反覆晚期減速、血壓驟降與微循環障礙',
      patientQuote: '我好暈……寶寶心跳怎麼一直咚咚咚往下掉？',
      story: '急診入觀 20 分鐘，NST 出現反覆晚期減速，心跳最低跌至 90 bpm。產婦血壓從高血壓 154 驟降至 96/60 mmHg，四肢冰冷濕冷。',
      vitals: {
        bp: '96/60',
        hr: 128,
        rr: 26,
        spo2: 95,
        temp: 36.3,
        fhr: 90,
        fhrPattern: 'Recurrent Late Decelerations, Severe Bradycardia (90 bpm), 變異度消失',
        uterineTension: '持續木質高張硬度',
        bleedingAmount: '陰道暗紅出血累積至 350 mL'
      },
      questions: [
        {
          id: 'c6-q2',
          prompt: '原先高血壓的產婦，血壓突然「跌至 96/60 mmHg」伴隨脈搏 128 bpm，這代表什麼生理意義？',
          learningObjective: '辨識高血壓孕婦的「假性正常血壓」與失血性休克代償衰竭',
          options: [
            {
              id: 'c6-q2-a',
              text: '此為嚴重的低血容性休克 (Hypovolemic Shock)！在高血壓患者身上，96/60 mmHg 已經相當於常人重度休克',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 20,
              explanation: '正確！高血壓產婦基線血壓偏高，一旦血壓掉到 90-100 mmHg，微循環灌流已嚴重不足，屬休克晚期！'
            },
            {
              id: 'c6-q2-b',
              text: '血壓降至 90 多剛好恢復正常範圍，說明降壓藥發揮良好效果',
              isCorrect: false,
              scoreChange: -30,
              stabilityImpact: -35,
              explanation: '致命盲點！在胎盤大出血且心跳 128 bpm 下，絕不可將休克低血壓誤認為血壓控制良好！'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c6-trendelenburg',
          name: '維持左側臥並輕微抬高下肢 (Elevate legs)',
          category: 'position',
          icon: 'MoveUp',
          isAppropriate: true,
          stabilityDelta: 10,
          feedback: '增加下肢靜脈回心血量，保障腦部與心臟灌流。'
        },
        {
          id: 'act-c6-o2',
          name: '緊扣氧氣面罩 10 L/min',
          category: 'airway_oxygen',
          icon: 'Wind',
          isAppropriate: true,
          stabilityDelta: 10,
          feedback: '提高動脈血氧飽和度。'
        }
      ]
    },
    {
      phaseNumber: 3,
      title: '第三階段：凝血崩潰與緊急終止妊娠',
      subtitle: 'Fibrinogen 暴跌至 110 mg/dL，啟動開刀房剖腹',
      patientQuote: '醫生，一定要保住我的寶寶……',
      story: '抽血報告回報：Fibrinogen 跌至 110 mg/dL，D-dimer 大於 20 μg/mL，PT/aPTT 延長。醫療團隊立刻推入開刀房行全身麻醉緊急剖腹產。',
      vitals: {
        bp: '88/50',
        hr: 134,
        rr: 28,
        spo2: 94,
        temp: 36.1,
        fhr: 85,
        fhrPattern: 'Severe Fetal Distress',
        uterineTension: '持續強直硬',
        bleedingAmount: '累計隱匿與外出血估計 >1200 mL'
      },
      labs: [
        { item: 'Platelet', value: '76,000', unit: '/μL', abnormal: true },
        { item: 'Fibrinogen', value: '110', unit: 'mg/dL', reference: '300-600', abnormal: true },
        { item: 'PT / INR', value: '16.8s / 1.55', abnormal: true },
        { item: 'aPTT', value: '49.2s', abnormal: true },
        { item: 'D-dimer', value: '>20.0', unit: 'μg/mL', abnormal: true }
      ],
      questions: [
        {
          id: 'c6-q3',
          prompt: '嚴重胎盤早期剝離合併 DIC 且胎兒存活，唯一能夠挽救母嬰生命的決定性治療策略為何？',
          learningObjective: '掌握胎盤早剝的根治療法：儘快終止妊娠並補足凝血因子',
          options: [
            {
              id: 'c6-q3-a',
              text: '在積極抗休克、輸注 Cryoprecipitate/FFP 的同時，以最快速度施行剖腹產終止妊娠',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 25,
              explanation: '正確！胎盤剝離面是促發 DIC 的組織因子源頭，只有迅速娩出胎兒胎盤，才能徹底阻斷促凝因子的持續釋放！'
            },
            {
              id: 'c6-q3-b',
              text: '給予大劑量安胎藥物 Ritodrine 抑制宮縮，等待凝血因子自體修復',
              isCorrect: false,
              scoreChange: -35,
              stabilityImpact: -40,
              explanation: '致死錯誤！胎盤早剝是使用安胎藥的絕對禁忌症！盲目安胎會加速胎兒缺氧死亡與母體全身 DIC 出血致死！'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c6-cryo',
          name: '加壓靜脈輸注冷凍沉澱品 (Cryoprecipitate) 15 單位',
          category: 'medication',
          icon: 'Shield',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: '快速將血漿纖維蛋白原拉升至 200 mg/dL 以上安全水平！'
        },
        {
          id: 'act-c6-txa',
          name: '靜脈給予 Tranexamic Acid (TXA) 1g IV 於 10 分鐘內注入',
          category: 'medication',
          icon: 'Pill',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '抑制繼發性纖維蛋白溶解亢進，穩定微血栓創面。'
        }
      ]
    },
    {
      phaseNumber: 4,
      title: '第四階段：術中搶救與庫弗萊爾子宮處置',
      subtitle: '胎盤剝離 70%，成功保住母子性命',
      patientQuote: '（術後加護病房清醒）醫生……寶寶怎麼樣了？',
      story: '手術劃開見羊水呈深醬油色，剝離面積達 70%，血塊 900 mL。女嬰體重 2650g，經新生兒科急救後心跳恢復 140，Apgar 3→7 分。母體子宮給予背帶縫合後張力恢復。',
      vitals: {
        bp: '112/70',
        hr: 92,
        rr: 18,
        spo2: 99,
        temp: 36.4,
        fhr: 0,
        fhrPattern: '新生兒已娩出轉 NICU',
        uterineTension: '堅硬良好',
        bleedingAmount: '術後惡露少量'
      },
      questions: [
        {
          id: 'c6-q4',
          prompt: '術後母體轉入加護病房 (ICU)，除了監控凝血功能外，因大出血休克最需預防的遠期內分泌併發症為何？',
          learningObjective: '辨別產科嚴重失血休克導致之席漢氏症候群 (Sheehan Syndrome)',
          options: [
            {
              id: 'c6-q4-a',
              text: '席漢氏症候群 (Sheehan Syndrome)，腦下垂體前葉因低血壓缺血壞死導致產後無乳與內分泌全面衰退',
              isCorrect: true,
              scoreChange: 25,
              stabilityImpact: 20,
              explanation: '正確！產科大量失血性休克易引發腦下垂體前葉缺血梗塞壞死，日後表現為產後無乳、閉經與甲狀腺/腎上腺皮質功能衰竭。'
            },
            {
              id: 'c6-q4-b',
              text: '肢端肥大症',
              isCorrect: false,
              scoreChange: -20,
              stabilityImpact: -15,
              explanation: '錯誤！席漢氏症候群是分泌不足而非亢進。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c6-icu-transfer',
          name: '轉送重症加護病房 (ICU) 進行中心靜脈壓與器官灌流監測',
          category: 'procedure',
          icon: 'Hospital',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '嚴密監控尿量、電解質、腎功能與凝血圖譜。'
        }
      ]
    }
  ],
  teacherGuide: {
    reasoningSteps: [
      {
        stepNumber: 1,
        title: '高危險因子背景',
        clues: ['妊娠高血壓病史', '血壓 154/98'],
        reasoningPath: ['血管內皮受損痙攣 → 底蛻膜血管壞死出血'],
        conclusion: '高度懷疑胎盤早剝'
      },
      {
        stepNumber: 2,
        title: '早剝三聯徵識別',
        clues: ['持續劇痛無間歇', '板狀強直子宮 (Woody uterus)', '暗紅血伴宮底升高'],
        reasoningPath: ['血液積存在胎盤底蛻膜之間激惹子宮平滑肌持續痙攣'],
        conclusion: '排除前置胎盤，確立胎盤早期剝離'
      },
      {
        stepNumber: 3,
        title: '失血休克與 DIC 監控',
        clues: ['血壓自高值掉到 96/60', 'HR 128', 'Fibrinogen 110 mg/dL'],
        reasoningPath: ['休克失代償 + 組織因子引發消耗性凝血病變 (DIC)'],
        conclusion: '立即輸注 Cryo 並推入手術室剖腹'
      },
      {
        stepNumber: 4,
        title: '根治療法阻斷促凝因子',
        clues: ['剝離面 70%', '胎兒胎心 85 bpm'],
        reasoningPath: ['娩出胎兒胎盤徹底清除病灶，預防席漢氏症候群與多器官衰竭'],
        conclusion: '緊急剖腹產救治'
      }
    ],
    maternalClues: ['持續性刀割樣腹痛', '子宮木質板狀硬', '暗紅血與血塊', '假性正常血壓 → 快速休克', '纖維蛋白原顯著降低 (110 mg/dL)'],
    fetalClues: ['胎心率持續減速與徐緩 (<90 bpm)', '羊水暗醬油色', '新生兒重度酸中毒 (Apgar 3)'],
    maternalFetalCorrelation: '胎盤剝離切斷了母胎氧氣交換的主要界面；母體失血休克進一步降低子宮動脈灌注壓，形成雙重致命打擊。',
    osceStations: [
      {
        stationNumber: 1,
        stationTitle: '早剝 vs 前置胎盤鑑別實戰站',
        taskPrompt: '請在表格中快速寫出前置胎盤與胎盤早期剝離在出血顏色、腹痛性質、子宮張力及胎心狀況之 4 大關鍵差異。',
        keyPoints: ['出血：前置為鮮紅；早剝為暗紅或隱匿', '腹痛：前置無痛；早剝持續劇痛', '子宮：前置柔軟；早剝板狀硬如木', '胎心：前置多正常；早剝易窘迫'],
        sampleModelAnswer: '前置胎盤為無痛性鮮紅色陰道流血，子宮完全鬆軟無壓痛，胎心多正常；胎盤早剝為持續撕裂樣劇痛伴暗紅血或隱匿出血，子宮硬如木板且觸痛極強，胎心常迅速衰竭。'
      },
      {
        stationNumber: 2,
        stationTitle: '高血壓孕婦失血性休克評估站',
        taskPrompt: '說明為何高血壓患者血壓「100/60 mmHg」已屬重度危急休克狀態。',
        keyPoints: ['基線血壓偏高', '血管已處於重度痙攣代償極限', '平均動脈壓 (MAP) 降幅已超過 30-40%'],
        sampleModelAnswer: '高血壓產婦基線血管阻力高，當血壓跌至正常人水準時，代表循環血容已經喪失 30% 以上，微循環衰竭，胎盤與腎臟灌流已近乎斷絕。'
      },
      {
        stationNumber: 3,
        stationTitle: '早剝安胎藥物禁忌站',
        taskPrompt: '若實習醫師建議給予早剝產婦 Ritodrine (Yutopar) 抑宮縮，主治醫師應如何糾正？',
        keyPoints: ['早剝為安胎藥絕對禁忌', 'Ritodrine 加快心率掩蓋休克', '延誤終止妊娠將促發母胎死亡與全身 DIC'],
        sampleModelAnswer: '嚴格禁止！胎盤早剝是任何宮縮抑制劑的絕對禁忌。抑制宮縮無法阻止剝離擴大，反而延誤手術時機，加劇大出血與 DIC。'
      },
      {
        stationNumber: 4,
        stationTitle: '產科 DIC 止血三劍客站',
        taskPrompt: '說明 Cryoprecipitate、FFP 與 TXA 在產科 DIC 救治中的協同機制。',
        keyPoints: ['Cryo 補充濃縮纖維蛋白原快速達標', 'FFP 補足全部凝血因子與血漿容積', 'TXA 阻斷纖溶酶抑制微血栓溶解'],
        sampleModelAnswer: 'Cryo 迅速恢復纖維蛋白原水平；FFP 補充消耗的凝血酶原複合物；TXA 抑制過度纖溶，三者合力重建止血栓子。'
      },
      {
        stationNumber: 5,
        stationTitle: '席漢氏症候群 (Sheehan) 衛教站',
        taskPrompt: '向產後加護病房家屬解釋嚴重失血後可能產生的腦下垂體功能受損臨床表現。',
        keyPoints: ['無乳（泌乳素缺乏）', '閉經（促性腺激素缺乏）', '畏寒嗜睡乏力（甲狀腺與腎上腺皮質功能低下）'],
        sampleModelAnswer: '大出血休克可能造成腦下垂體缺血壞死。產後需注意是否無乳汁分泌、毛髮脫落或極度畏寒乏力，需定期追蹤內分泌荷爾蒙濃度。'
      }
    ],
    takeawayTable: [
      { clue: '持續撕裂樣腹痛 + 木質板狀腹', focus: '胎盤早剝之病理標誌' },
      { clue: '高血壓產婦血壓驟降至 90-100 mmHg', focus: '低血容性休克失代償危象' },
      { clue: '纖維蛋白原 <150 mg/dL', focus: '急性 DIC 確診指標' },
      { clue: '胎盤早剝之絕對禁忌', focus: '嚴禁使用宮縮抑制安胎藥！嚴禁未超音波前盲目內診' },
      { clue: '決定性根治手段', focus: '在輸血抗休克同時行緊急剖腹產終止妊娠' }
    ],
    pathophysiologySummary: '妊娠高血壓螺旋動脈壞死 → 底蛻膜出血剝離 → 胎盤後血腫持續擴大高壓 → 子宮平滑肌強直痙攣木板硬 → 大量促凝組織因子入血 → 廣泛性消耗性 DIC → 胎兒急性窒息死亡。',
    injections: [
      {
        id: 'inj-c6-arrest',
        title: '突發危機注入：胎心自 90 bpm 突降至 0 (胎心消失)',
        description: '導師注入：NST 監視器傳出刺耳警報：胎心曲線跌破 50 後轉為直線！',
        vitalsOverride: {
          fhr: 0,
          fhrPattern: 'Fetal Heart Sounds Absent (0 bpm)'
        },
        newSituationPrompt: '急迫警報！胎心音突然消失！產婦血壓持續跌至 80/40 mmHg！',
        requiredActionPrompt: '此時醫療團隊之急救策略核心是什麼？',
        correctResponse: '立即以搶救母體生命為首要目標！繼續推入手術室剖腹搶救，若胎兒娩出無活力由兒科全套 NRP 復甦；母體全力輸血抗 DIC 與防產後大出血！'
      }
    ]
  },
  rawContent: RAW_EXTRACTED_TEXTS['case_6'] || ''
};
