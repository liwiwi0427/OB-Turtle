import { ClinicalCase } from '../../types/megacode';
import { RAW_EXTRACTED_TEXTS } from '../rawExtractedTexts';

export const case7: ClinicalCase = {
  id: 'case-7',
  caseNumber: 7,
  title: '案例七：沒有疼痛，卻一直出血',
  subtitle: '前置胎盤 (Placenta Previa)',
  category: 'previa',
  targetDiagnosis: '完全性前置胎盤 (Complete Placenta Previa) 併發急性無痛性大出血，嚴禁內診',
  estimatedTimeMin: 12,
  difficulty: 'Intermediate',
  patientProfile: {
    age: 32,
    gravidaPara: 'G3P1A1',
    gestationalAge: '34+5 週',
    pastHistory: ['曾有一胎剖腹產史 (C-section scar)', '24 週超音波曾提示胎盤偏低未回診追蹤'],
    chiefComplaint: '凌晨熟睡中突然感覺內褲濕透，醒來發現大量鮮紅色陰道流血約 200 mL，無任何腹痛',
    bmi: 23.4
  },
  phases: [
    {
      phaseNumber: 1,
      title: '第一階段：急診檢傷與無痛出血評估',
      subtitle: '完全無痛、子宮柔軟、鮮血直流之經典表徵',
      patientQuote: '我完全沒有肚子痛，睡到一半覺得下面濕濕的，開燈一看整片都是鮮血！好可怕！',
      story: '32歲產婦，34+5週，曾有一胎剖腹產。由救護車送抵急診，外陰部墊布滿浸鮮紅血液。',
      vitals: {
        bp: '112/68',
        hr: 96,
        rr: 18,
        spo2: 99,
        temp: 36.7,
        fhr: 142,
        fhrPattern: 'Baseline 142 bpm, Moderate variability, Category I 正常',
        uterineTension: '完全柔軟，無宮縮，無任何壓痛或反跳痛',
        bleedingAmount: '鮮紅色液態血液流出約 250 mL'
      },
      physicalExam: [
        '腹部觸診：子宮輪廓清晰柔軟，胎體極易觸及，無板狀腹',
        '胎心音清楚有力 (142 bpm)，胎動正常',
        '無任何下腹痙攣或腰痛'
      ],
      questions: [
        {
          id: 'c7-q1',
          prompt: '產婦有剖腹產史，懷孕晚期出現「無痛性鮮紅色大量陰道流血」且子宮完全柔軟，產科檢查之第一絕對禁忌為何？',
          learningObjective: '掌握前置胎盤未超音波定位前【嚴禁手指陰道指診】之鐵律',
          options: [
            {
              id: 'c7-q1-a',
              text: '絕對嚴禁任何手指陰道指診 (NO Digital Vaginal Exam)！',
              isCorrect: true,
              scoreChange: 35,
              stabilityImpact: 25,
              explanation: '正確！手指伸入子宮頸口若觸及並撕裂覆蓋在頸口上的前置胎盤血管，會立刻引發噴射性致死大出血！在超音波確認前，絕不可做手指內診！'
            },
            {
              id: 'c7-q1-b',
              text: '立即進行雙合診以手指伸入子宮頸檢查開指程度',
              isCorrect: false,
              scoreChange: -40,
              stabilityImpact: -45,
              explanation: '致死級醫療疏失！指診會撕破胎盤下緣海綿竇血管，可在數分鐘內失血上千毫升導致母嬰雙亡！'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c7-no-touch',
          name: '掛上「嚴禁陰道指診 (No Digital Exam)」警示牌',
          category: 'procedure',
          icon: 'ShieldAlert',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: '全體急診與產房醫護均清楚標記禁忌，確保產婦安全。'
        },
        {
          id: 'act-c7-ultrasound',
          name: '執行經腹部產科超音波檢查 (Transabdominal Ultrasound)',
          category: 'lab_diag',
          icon: 'Activity',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '超音波探頭經腹壁輕柔掃描，清楚看見胎盤完全覆蓋子宮頸內口 (Complete Previa)！'
        }
      ]
    },
    {
      phaseNumber: 2,
      title: '第二階段：超音波確診與胎盤植入 (Accreta) 排查',
      subtitle: '完全性前置胎盤合併前次剖腹產疤痕處評估',
      patientQuote: '醫生，超音波照出來真的是胎盤擋在產道門口嗎？那我能自然生嗎？',
      story: '經腹部超音波證實胎盤後壁與前壁完全跨越覆蓋子宮頸內口 (Complete Previa)。都卜勒超音波進一步評估前次剖腹產疤痕是否有胎盤植入。',
      vitals: {
        bp: '110/66',
        hr: 98,
        rr: 18,
        spo2: 98,
        temp: 36.6,
        fhr: 140,
        fhrPattern: 'Baseline 140 bpm, Category I',
        uterineTension: '柔軟，無陣痛',
        bleedingAmount: '鮮紅出血漸緩，目前點滴滲出約 50 mL'
      },
      diagnosticImaging: {
        type: '彩色都卜勒超音波掃描 (Color Doppler US)',
        findings: '完全性前置胎盤 (Complete placenta previa)。前次剖腹產疤痕處肌層厚度 2.8 mm，漿膜膀胱交界處血流尚平整，暫無明顯胎盤穿透 (Percreta) 徵象。',
        details: '前置胎盤合併前次剖腹產者，胎盤植入 (Placenta Accreta Spectrum, PAS) 之風險高達 11-25%！'
      },
      questions: [
        {
          id: 'c7-q2',
          prompt: '此產婦有剖腹產疤痕史且確診為前置胎盤，生產方式與備血策略為何？',
          learningObjective: '規劃完全性前置胎盤之安全剖腹產與大量出血備戰',
          options: [
            {
              id: 'c7-q2-a',
              text: '完全性前置胎盤必須選擇剖腹產；且因合併剖腹產疤痕，必須警惕胎盤植入大出血，常規交叉備血 4U pRBC',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 20,
              explanation: '正確！胎盤完全擋住子宮頸口不可能陰道分娩，強行試產會致大出血；剖腹疤痕大幅增加植入風險，必須備足血源。'
            },
            {
              id: 'c7-q2-b',
              text: '人工破水讓胎頭下降壓迫胎盤即可順利自然產',
              isCorrect: false,
              scoreChange: -30,
              stabilityImpact: -35,
              explanation: '錯誤！完全性前置胎盤無法透過胎頭壓迫止血，盲目破水會刺破胎盤血管造成災難性大失血。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c7-blood-ready',
          name: '完成 Type & Crossmatch 4U pRBC 與 4U FFP',
          category: 'procedure',
          icon: 'Droplet',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '血庫確認庫存充足隨時可發血。'
        }
      ]
    },
    {
      phaseNumber: 3,
      title: '第三階段：保守期待治療與促胎肺成熟',
      subtitle: '34 週少量出血之安胎治療策略',
      patientQuote: '血好像流得比較少了……我能在床上多躺幾天讓寶寶長大一點嗎？',
      story: '經絕對臥床休息後，鮮血逐漸轉為少量暗色點滴狀。目前週數 34+5 週，胎心與母體生命徵象穩定。',
      vitals: {
        bp: '116/70',
        hr: 82,
        rr: 16,
        spo2: 99,
        temp: 36.6,
        fhr: 138,
        fhrPattern: 'Baseline 138 bpm, Reactive',
        uterineTension: '柔軟',
        bleedingAmount: '微量暗褐色微滲'
      },
      questions: [
        {
          id: 'c7-q3',
          prompt: '對於懷孕 34+5 週、出血暫時止住且母胎穩定的前置胎盤產婦，目前最佳處置方針為何？',
          learningObjective: '掌握前置胎盤早產階段之保守期待療法 (Expectant Management)',
          options: [
            {
              id: 'c7-q3-a',
              text: '採取期待治療：絕對臥床休息、投予類固醇促胎肺成熟、維持靜脈管路隨時待命，計畫滿 36-37 週擇期剖腹產',
              isCorrect: true,
              scoreChange: 25,
              stabilityImpact: 20,
              explanation: '正確！在無活動性大出血且胎心正常下，給予 Betamethasone 促胎肺成熟並爭取胎兒成熟，通常安排於 36+0 至 37+6 週剖腹產。'
            },
            {
              id: 'c7-q3-b',
              text: '鼓勵下床劇烈慢跑運動以幫助胎盤往上移動',
              isCorrect: false,
              scoreChange: -25,
              stabilityImpact: -30,
              explanation: '危險錯誤！運動與震盪會再度撕裂子宮下段與胎盤附著面，誘發再次致命大出血。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c7-beta',
          name: '肌肉注射 Betamethasone 12 mg (間隔 24 小時共兩劑)',
          category: 'medication',
          icon: 'Sparkles',
          isAppropriate: true,
          stabilityDelta: 15,
          feedback: '促胎肺成熟劑順利施打。'
        },
        {
          id: 'act-c7-bedrest',
          name: '囑咐嚴格絕對臥床休息與床上便盆使用',
          category: 'position',
          icon: 'Bed',
          isAppropriate: true,
          stabilityDelta: 10,
          feedback: '避免任何增加腹壓動作。'
        }
      ]
    },
    {
      phaseNumber: 4,
      title: '第四階段：擇期手術與術中大出血防範',
      subtitle: '孕 36+2 週擇期剖腹產與子宮下段止血',
      patientQuote: '寶寶健康哭出聲了！太感激你們了！',
      story: '產婦安胎至 36+2 週，在資深產科團隊執刀下行計畫性剖腹產。術中順利娩出 2900g 女嬰。子宮下段胎盤剝離面給予 8 字縫合止血與 Bakri 水球壓迫，成功保全子宮。',
      vitals: {
        bp: '118/74',
        hr: 84,
        rr: 17,
        spo2: 99,
        temp: 36.6,
        fhr: 0,
        fhrPattern: '胎兒已平安娩出',
        uterineTension: '宮底收縮堅硬，下段水球填塞良好',
        bleedingAmount: '術中失血 600 mL，止血成功'
      },
      questions: [
        {
          id: 'c7-q4',
          prompt: '前置胎盤剖腹產中，為何「子宮下段 (Lower uterine segment)」剝離面特別容易發生難以控制之大出血？',
          learningObjective: '理解子宮下段解剖生理學：肌纖維薄且缺乏交叉肌束「活體結紮」機制',
          options: [
            {
              id: 'c7-q4-a',
              text: '因為子宮下段平滑肌纖維極為薄弱，缺乏上段肌層交叉收縮壓迫血管之生理結紮功能，剝離後血竇難以自體閉合',
              isCorrect: true,
              scoreChange: 30,
              stabilityImpact: 20,
              explanation: '正確！子宮下段肌層菲薄，收縮力差，胎盤剝離後撕裂血竇無法靠肌纖維緊縮止血，需仰賴局部縫合、水球壓迫或動脈結紮。'
            },
            {
              id: 'c7-q4-b',
              text: '是因為全身凝血功能先天缺失所致',
              isCorrect: false,
              scoreChange: -15,
              stabilityImpact: -15,
              explanation: '錯誤！此為局部解剖肌層收縮特異性問題，非全身凝血缺陷。'
            }
          ]
        }
      ],
      quickActions: [
        {
          id: 'act-c7-bakri',
          name: '放置 Bakri 子宮水球灌注 300 mL 溫生理食鹽水壓迫下段',
          category: 'procedure',
          icon: 'Shield',
          isAppropriate: true,
          stabilityDelta: 20,
          feedback: 'Bakri 水球精準壓迫子宮下段創面，引流管血液迅速清澈！'
        }
      ]
    }
  ],
  teacherGuide: {
    reasoningSteps: [
      {
        stepNumber: 1,
        title: '識別無痛鮮紅出血',
        clues: ['無任何宮縮腹痛', '鮮紅色血液約 200 mL', '子宮完全柔軟無壓痛'],
        reasoningPath: ['無痛性晚期出血 → 高度指向前置胎盤 (Placenta Previa)'],
        conclusion: '首要鐵律：絕對嚴禁手指陰道指診'
      },
      {
        stepNumber: 2,
        title: '超音波影像確診與分類',
        clues: ['胎盤完全跨越子宮頸內口', '前次剖腹產疤痕史'],
        reasoningPath: ['經腹超音波定位胎盤與宮頸內口關係，評估 PAS 胎盤植入風險'],
        conclusion: '確診為完全性前置胎盤 (Complete Previa)'
      },
      {
        stepNumber: 3,
        title: '早產週數之期待治療',
        clues: ['孕 34+5 週', '母胎生命徵象穩定，出血已趨緩'],
        reasoningPath: ['在無大出血危象下，給予類固醇促肺成熟爭取週數'],
        conclusion: '絕對臥床、嚴密監護、備妥血源待命'
      },
      {
        stepNumber: 4,
        title: '終止妊娠與下段止血策略',
        clues: ['滿 36 週擇期剖腹產', '子宮下段平滑肌缺乏活體結紮功能'],
        reasoningPath: ['剖腹產娩出後，以局部縫合 + Bakri 水球填塞化解下段無力出血'],
        conclusion: '保全子宮，成功止血'
      }
    ],
    maternalClues: ['無痛性 (Painless)', '鮮紅色 (Bright red)', '反覆發生性', '子宮柔軟弛緩 (Soft, non-tender)', '剖腹產或流產刮宮史'],
    fetalClues: ['胎心多保持正常（除非母體大出血休克）', '胎位易異常（臀位、橫位，因胎盤佔據骨盆入口）'],
    maternalFetalCorrelation: '前置胎盤出血主要來自母體胎盤床靜脈竇撕裂，因此早期胎心多正常；但若失血量過大導致母體低血容休克，胎盤灌流將驟減進而危及胎兒。',
    osceStations: [
      {
        stationNumber: 1,
        stationTitle: '前置胎盤指診禁忌與防護溝通站',
        taskPrompt: '請考生向前來內診實習的新進人員嚴正說明「為何禁止陰道指診」之解剖病理機轉。',
        keyPoints: ['胎盤位於子宮頸內口', '手指伸入觸摸可直接撕脫胎盤海綿竇引起噴血', '必須先經超音波確認胎盤位置方可決定後續檢查'],
        sampleModelAnswer: '在未經超音波確定胎盤位置前，任何晚期陰道出血病人都絕對禁止手指指診。因為手指直接探入可撕裂覆蓋在子宮頸內口上的胎盤組織，造成數分鐘內上千毫升的致死性大出血。'
      },
      {
        stationNumber: 2,
        stationTitle: '前置胎盤超音波分類站',
        taskPrompt: '口述完全性 (Complete)、部分性 (Partial)、邊緣性 (Marginal) 與低位胎盤 (Low-lying) 之超音波定義。',
        keyPoints: ['Complete: 胎盤完全跨越覆蓋子宮頸內口', 'Partial: 胎盤部分覆蓋內口', 'Marginal: 胎盤邊緣緊貼內口邊界 (<0 cm)', 'Low-lying: 胎盤邊緣距內口 <20 mm'],
        sampleModelAnswer: '完全性為胎盤完全覆蓋內口；部分性為部分覆蓋；邊緣性為邊緣達到內口但未跨越；低位胎盤為胎盤邊緣距離子宮頸內口小於 2 cm。'
      },
      {
        stationNumber: 3,
        stationTitle: '剖腹產疤痕與胎盤植入 (PAS) 評估站',
        taskPrompt: '產婦有剖腹產史且本次為前置胎盤，術前必須向家屬衛教哪些潛在大出血與處置風險？',
        keyPoints: ['胎盤植入譜系疾病 (PAS) 風險飆升', '術中可能大量失血需啟動 MTP', '可能需子宮切除術 (Hysterectomy) 以保命'],
        sampleModelAnswer: '前次剖腹產疤痕處內膜缺陷，使胎盤絨毛易侵入子宮肌層甚至穿透至膀胱。術中若發生植入性大出血，可能需施行大量輸血、子宮動脈結紮甚至緊急切除子宮以搶救生命。'
      },
      {
        stationNumber: 4,
        stationTitle: '子宮下段 Bakri 水球壓迫技術站',
        taskPrompt: '說明 Bakri Balloon 放置於子宮下段壓迫止血之操作要領與注水量。',
        keyPoints: ['經子宮切口或陰道置入囊球', '注入溫無菌生理食鹽水 300-500 mL', '陰道填塞紗布防脫出', '連接引流袋觀察每小時出血量'],
        sampleModelAnswer: '經宮腔置入 Bakri 水球至子宮下段，注入無菌生理食鹽水 300-500 mL 直至產生充盈壓迫感；陰道填塞紗布固定水球；引流管接引流袋持續監測止血效果。'
      },
      {
        stationNumber: 5,
        stationTitle: '前置胎盤保守安胎居家衛教站',
        taskPrompt: '若產婦符合出院條件返家休養，必須給予哪 4 項關鍵出院生活禁令？',
        keyPoints: ['絕對禁止性生活 (Pelvic rest)', '禁止提重物與劇烈運動', '禁止陰道灌洗或塞劑', '一旦見血或腹痛立刻搭救護車返院'],
        sampleModelAnswer: '第一：絕對禁止性行為；第二：禁止陰道塞劑或灌洗；第三：避免粗重工作與提重物；第四：一旦發現陰道有任何出血，不要等待，立即叫救護車送回產房急診。'
      }
    ],
    takeawayTable: [
      { clue: '無痛性、鮮紅色陰道流血 + 子宮柔軟', focus: '前置胎盤之典型臨床表徵' },
      { clue: '最高臨床禁忌', focus: '超音波未確認前【絕對禁止手指陰道指診】' },
      { clue: '前次剖腹產 + 本次前置胎盤', focus: '胎盤植入譜系 (PAS) 極高危族群' },
      { clue: '子宮下段胎盤床出血', focus: '肌層薄弱缺乏結紮功能，常需水球填塞或壓迫縫合' },
      { clue: '決定性生產方式', focus: '完全性前置胎盤必須行剖腹產 (36-37 週擇期)' }
    ],
    pathophysiologySummary: '受精卵著床於子宮下段 → 孕晚期子宮下段形成與拉長延伸 → 附著於下段之胎盤無法隨之伸展 → 胎盤與子宮壁錯位剝離撕破母體血竇 → 無痛性鮮紅血液外流 → 下段肌層薄弱缺乏活體結紮使出血不易自體停止。',
    injections: [
      {
        id: 'inj-c7-hemorrhage',
        title: '突發危機注入：安胎病房產婦突然大湧血 600 mL 伴休克',
        description: '導師注入：產婦在病床上突然鮮血大湧染紅整張床墊，臉色煞白！',
        vitalsOverride: {
          bp: '82/46',
          hr: 130,
          spo2: 94,
          fhr: 110,
          bleedingAmount: '床單大片鮮血，突發失血約 600-800 mL'
        },
        newSituationPrompt: '緊急警報！產婦突發無痛性大出血不止，血壓掉至 82/46 mmHg！',
        requiredActionPrompt: '此時醫療團隊之決定性搶救決策是什麼？',
        correctResponse: '立即停止期待治療！全速推進手術室施行超緊急剖腹產 (Emergency C-Section)，啟動大量輸血與手術室備血，備好 Bakri 水球與子宮切除手術包！'
      }
    ]
  },
  rawContent: RAW_EXTRACTED_TEXTS['case_7'] || ''
};
