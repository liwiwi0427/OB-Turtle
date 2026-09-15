import { PPH4TCase } from "../types/megacode";

export const PPH_4T_CASES: PPH4TCase[] = [
  {
    id: "pph-tone",
    category: "Tone",
    nameZh: "子宮收縮不良 (Uterine Atony)",
    caseTitle: "案例一：產後 20 分鐘持續流血，子宮摸起來像麵糰",
    profile: "32歲，G2P1，39+2週，自然產，產程順利，男嬰 3250g。胎盤完整娩出。產後 20 分鐘護理師發現產婦持續流血。",
    vitals: {
      bp: "108/72",
      hr: 118,
      rr: 22,
      spo2: 98,
      temp: 36.8,
      fhr: 0,
      fhrPattern: "已生產",
      uterineTension: "柔軟 (Boggy)，底高於臍平，按摩後短暫變硬又變軟",
      bleedingAmount: "產後 20 分鐘累積出血約 650 mL，伴大量血塊"
    },
    bleedingDescription: "惡露呈現持續湧出之大量鮮紅色血液，伴隨拳頭大血塊，會陰縫合傷口無滲血。",
    physicalFindings: [
      "子宮底位置上升至肚臍上方 2 指",
      "子宮觸診：質地軟如麵糰 (Boggy)，按摩刺激後微硬但旋即鬆弛",
      "膀胱觸診：微脹（排尿反射尚未恢復）",
      "會陰檢視：第二度撕裂傷縫合處緊密無滲血"
    ],
    guidingQuestions: [
      {
        question: "目前失血 650 mL 是否符合產後大出血 (PPH) 定義？",
        answerGuide: "符合！ACOG 及國際指引定義：不論分娩方式，分娩後 24 小時內累積出血量 ≥1,000 mL，或伴隨低血容症狀/生命徵象異常者即為 PPH。自然產若超過 500 mL 且持續出血即應啟動第一級 PPH 警報！"
      },
      {
        question: "子宮柔軟如海綿，首要護理動作與後續藥物階梯為何？",
        answerGuide: "第一步：立即以單手/雙手進行持續性子宮按摩 (Fundal massage / Bimanual compression)，並排空膀胱（導尿）；第二步：第一線藥物為 Oxytocin (催產素 10-40 IU/L IV 滴注)；第二線為 Methylergonovine (高血壓禁用)、Carboprost/Hemabate (氣喘禁用)、Misoprostol (舌下或直腸給藥 800-1000 mcg) 及 Tranexamic Acid (TXA 1g IV)！"
      }
    ],
    keyTeacherFocus: "Tone 佔產後出血原因的 70-80%。切記用藥禁忌：高血壓產婦禁用 Methergine；支氣管氣喘病史禁用 Carboprost (PGF2α)！",
    priorityInterventions: [
      "即刻子宮底環狀強力按摩 (Fundal Massage)",
      "放置導尿管排空膀胱，消除阻礙子宮收縮之機械性因素",
      "靜脈輸注 Oxytocin 20-40 Units 快速點滴",
      "雙管路 18G 靜脈輸液，通知備血交叉配血",
      "若無改善，準備 Bakri 水球壓迫止血 (Bakri Balloon Tamponade)"
    ]
  },
  {
    id: "pph-trauma",
    category: "Trauma",
    nameZh: "產道撕裂傷 (Genital Tract Laceration)",
    caseTitle: "案例二：子宮像石頭一樣硬，但鮮紅血液卻源源不絕？",
    profile: "29歲初產婦，39週，自然產。第二產程約 2 小時，胎兒 3800g。胎盤完整娩出。產後 10 分鐘開始持續流血。",
    vitals: {
      bp: "110/70",
      hr: 108,
      rr: 20,
      spo2: 99,
      temp: 36.9,
      fhr: 0,
      fhrPattern: "已生產",
      uterineTension: "堅硬如石 (Firmly contracted)，位於臍下一指",
      bleedingAmount: "產後累積鮮紅出血 500-700 mL"
    },
    bleedingDescription: "血液呈持續涓涓細流或噴射狀鮮紅色，無明顯暗紅大血塊，與子宮收縮節律完全無關。",
    physicalFindings: [
      "子宮底觸診：輪廓清晰、堅硬如石，收縮極佳",
      "按摩子宮對止血完全無效",
      "會陰檢視：雖有側切傷口，但鮮血似自陰道深處或子宮頸側緣流出"
    ],
    guidingQuestions: [
      {
        question: "為什麼子宮明明收縮良好堅硬，產婦卻依舊持續失血？",
        answerGuide: "這是臨床最容易忽略的警訊！當「子宮堅硬 (Firm) 但出血不止」時，幾乎百分之百源於產道撕裂傷 (Trauma)——包括子宮頸裂傷 (Cervical tear)、陰道高位撕裂或會陰深層動脈損傷！"
      },
      {
        question: "此時應如何進行下一步鑑別與處置？",
        answerGuide: "切勿浪費時間反覆按摩子宮！應立即將產婦移置結石位 (Lithotomy position)，在良好手術燈光源下，使用直腸鏡/陰道窺器 (Auvard or Sims speculum) 與環鉗 (Ring forceps) 逐圈檢視子宮頸 360 度及陰道側壁穹窿，找到噴血動脈點並以可吸收線嚴密縫合！"
      }
    ],
    keyTeacherFocus: "臨床黃金口訣：「子宮硬硬還出血，必定產道有撕裂！」切記立即以鴨嘴或拉鉤暴露深部陰道及子宮頸裂痕進行縫合。",
    priorityInterventions: [
      "停止盲目按摩子宮，避免造成產婦不必要疼痛",
      "充足照明與良好暴露，置入陰道拉鉤 (Speculum)",
      "使用兩支無齒環鉗順時針逐一夾持檢查子宮頸邊緣 (12點鐘至11點鐘)",
      "以 2-0 Vicryl 可吸收線進行「裂傷頂端上方 1 cm」處縫合第一針以結紮回縮動脈",
      "縫合完畢後清點紗布，檢查肛門指診排除直腸黏膜穿透"
    ]
  },
  {
    id: "pph-tissue",
    category: "Tissue",
    nameZh: "胎盤碎片殘留 (Retained Tissue / Placental Fragments)",
    caseTitle: "案例三：胎盤娩出缺一角，子宮軟塌且反覆出血",
    profile: "34歲，G3P2，自然產。胎盤娩出延遲達 35 分鐘，醫師曾拉扯臍帶娩出胎盤。產後 30 分鐘開始大量出血 850 mL。",
    vitals: {
      bp: "102/68",
      hr: 118,
      rr: 22,
      spo2: 97,
      temp: 36.9,
      fhr: 0,
      fhrPattern: "已生產",
      uterineTension: "偏軟，按摩能短暫收縮但無法維持，底高微高",
      bleedingAmount: "產後 30 分鐘累積出血約 850 mL，伴有暗紅不碎血塊"
    },
    bleedingDescription: "暗紅色混雜鮮紅血液，伴有碎裂組織碎片與肉樣小塊，出血斷續湧出。",
    physicalFindings: [
      "胎盤母體面檢視：胎盤葉 (Cotyledon) 邊緣不完整，缺少一處約 3x3 cm 組織，胎膜血管走行延伸至胎膜缺損邊緣（提示副胎盤可能）",
      "子宮肌肉因腔內有殘留異物而無法完全緊縮壓迫螺旋動脈",
      "床邊超音波：子宮腔內可見不規則高回音團塊 (Echogenic mass)"
    ],
    guidingQuestions: [
      {
        question: "為何殘留一小塊胎盤組織會導致整個子宮收縮不良與大出血？",
        answerGuide: "殘留胎盤組織持續釋放一氧化氮與前列腺素代謝物，且在物理上撐開子宮肌層「生活結紮 (Living ligatures)」機制，阻礙肌纖維交叉收縮壓迫螺旋動脈，導致創面持續失血！"
      },
      {
        question: "下一步確立診斷與急救處置為何？",
        answerGuide: "立即推來床邊超音波確認宮腔內回音；在適當鎮靜止痛下，由醫師戴無菌長手套伸入宮腔進行手取殘留組織 (Manual exploration of uterus)，若無效則在超音波導引下以大號鈍頭刮匙進行溫柔清宮術 (Gentle curettage)！"
      }
    ],
    keyTeacherFocus: "分娩後務必常規「仔細拼合並檢查胎盤母體面與胎膜血管」！副胎盤 (Succenturiate lobe) 或部分植入皆可能造成胎盤組織撕脫殘留。",
    priorityInterventions: [
      "仔細重拼胎盤母體面與胎膜，確認缺損部位",
      "床邊超音波掃描子宮腔，定位高回音殘存團塊",
      "無菌戴手套施行宮腔徒手探查 (Manual uterine exploration)",
      "必要時超音波監控下鈍性刮宮 (Sharp/blunt curettage)",
      "術後投予預防性抗生素與持續 Oxytocin 點滴促進復原"
    ]
  },
  {
    id: "pph-hematoma",
    category: "Hematoma",
    nameZh: "產道血腫 (Trauma — Puerperal Hematoma)",
    caseTitle: "案例四：產婦大叫「屁股極度脹痛比生小孩還痛！」但外表幾乎沒流血？",
    profile: "31歲初產婦，39+1週，胎兒 3900g，因第二產程延長接受真空吸引分娩 (Vacuum extraction)。產後 30 分鐘生命徵象不穩。",
    vitals: {
      bp: "112/72",
      hr: 124,
      rr: 24,
      spo2: 98,
      temp: 36.8,
      fhr: 0,
      fhrPattern: "已生產",
      uterineTension: "堅硬，位於臍下 1 指",
      bleedingAmount: "陰道外觀僅有少量微淡惡露 (<100 mL)"
    },
    bleedingDescription: "外出血極少，但產婦心跳進行性加快達 124 bpm，面色蒼白，大汗淋漓。",
    physicalFindings: [
      "主訴：「護士小姐，我下面屁股肛門那邊像快要炸開一樣，比剛才生小孩還要痛一萬倍！」",
      "會陰與外陰局部視診：左側大陰唇及陰道下段嚴重膨大、緊繃、皮下呈紫黑色腫塊 (約 8x6 cm)，極度觸痛",
      "直腸指診：可觸及陰道後壁向直腸內突出膨出之巨大血腫壓迫腸道"
    ],
    guidingQuestions: [
      {
        question: "產婦外出血僅少量，為何會出現 HR 124 bpm、血壓瀕臨休克？",
        answerGuide: "此為典型的「隱匿性產後出血 (Concealed PPH)」！由於深層陰部血管（如陰部內動脈分支）破裂，血液在組織間隙（外陰、陰道旁、骨盆腹膜後間隙）不斷積聚，形成巨大產道血腫 (Vulvovaginal hematoma)，積血可達 500-1500 mL 而不溢出體外！"
      },
      {
        question: "此時應如何緊急介入治療？",
        answerGuide: "若血腫進行性增大（>5 cm）或伴生命徵象不穩，保守冰敷已不足夠！必須立即進手術室切開血腫表面黏膜，清除暗紅凝血塊，仔細尋找活動性搏動出血血管結紮，並以雙層褥式縫合閉合死腔，陰道內緊密填塞紗布壓迫 24 小時，留置導尿管。"
      }
    ],
    keyTeacherFocus: "警惕致命警訊：「劇烈肛門墜脹感 + 頻脈低血壓 + 外出血少 = 隱蔽性產道血腫」！若擴展至腹膜後 (Retroperitoneal) 可導致休克甚至死亡。",
    priorityInterventions: [
      "高度警覺隱匿性出血，立即進行會陰與陰道雙合診",
      "快速建立粗大靜脈輸液管道，預防失血性休克",
      "急召產科醫師進手術室於麻醉下切開引流與止血",
      "徹底清除深部血塊，確切結紮破裂之陰部小動脈",
      "放置陰道紗條緊密填塞 (Vaginal packing) 壓迫止血 24 小時並留置尿管"
    ]
  },
  {
    id: "pph-thrombin",
    category: "Thrombin",
    nameZh: "凝血功能障礙 (Coagulopathy / Thrombin Defects / DIC)",
    caseTitle: "案例五：抽血針孔與傷口全都在滲水狀不凝固血液！",
    profile: "37歲，G2P1，因重度胎盤早期剝離接受緊急剖腹產。術中失血約 900 mL。術後 30 分鐘在恢復室出現多處異常滲血。",
    vitals: {
      bp: "88/52",
      hr: 132,
      rr: 28,
      spo2: 92,
      temp: 36.2,
      fhr: 0,
      fhrPattern: "已生產",
      uterineTension: "收縮尚可或中等",
      bleedingAmount: "腹部傷口、會陰、導尿管皆有血性液體，出血稀薄不凝固"
    },
    bleedingDescription: "血液呈淡紅色水樣，完全沒有任何血塊 (Non-clotting blood)；靜脈穿刺點、導尿管尿液、腹壁傷口全面廣泛滲血。",
    physicalFindings: [
      "靜脈留置針注射處持續滲出粉紅血水",
      "導尿管引流出肉眼可見鮮紅血尿 (Hematuria)",
      "腹部敷料被淡紅血水完全滲透浸濕",
      "床邊試管凝血試驗 (Lee-White or clot test)：血液注入無抗凝試管 10 分鐘後依然呈液態不凝固"
    ],
    guidingQuestions: [
      {
        question: "為何血液會完全喪失凝固能力？最關鍵的實驗室追蹤指標為何？",
        answerGuide: "嚴重胎盤早剝釋放大量組織因子 (Tissue Factor)，引發急性瀰漫性血管內凝血 (DIC)！全身微血管血栓形成耗盡了血小板與凝血因子，並引發繼發性纖溶亢進。關鍵指標：Fibrinogen < 150 mg/dL (極危急 < 100)、Platelet < 50,000、PT/aPTT 顯著延長、D-dimer 與 FDP 大幅飆升！"
      },
      {
        question: "此時應立即啟動什麼專項搶救方案？輸血比例為何？",
        answerGuide: "立即啟動大量輸血協定 (Massive Transfusion Protocol, MTP)！按照 1:1:1 比例（紅血球 pRBC : 新鮮冷凍血漿 FFP : 血小板 Platelet）均衡輸注；優先補充冷凍沉澱品 (Cryoprecipitate) 快速提升纖維蛋白原 > 200 mg/dL；給予傳明酸 (Tranexamic acid 1g IV)；並維持體溫 > 36℃ 避免致命三聯徵 (低體溫、酸中毒、凝血障礙)！"
      }
    ],
    keyTeacherFocus: "Thrombin 異常多由胎盤早剝、羊水栓塞、重度子癲前症或死胎過久誘發。看到「不凝固血液 (Non-clotting blood)」務必第一時間補充 Fibrinogen 與 Cryoprecipitate！",
    priorityInterventions: [
      "立即啟動大量輸血協定 (MTP 1:1:1 比例)",
      "加壓輸注冷凍沉澱品 (Cryoprecipitate 10-20 units) 提升 Fibrinogen",
      "靜脈注射抗纖溶劑 Tranexamic Acid (TXA) 1g IV 於 10 分鐘內給予",
      "保溫毯加溫，加溫輸液防範低體溫致命三聯徵",
      "轉送重症加護病房 (ICU) 與動脈栓塞 (TAE) 團隊評估"
    ]
  }
];

export const PPH_4T_MATRIX = {
  columns: ["原因 (4T)", "子宮狀態", "出血特徵", "臨床識別線索", "主要處置措施"],
  rows: [
    {
      cause: "Tone（子宮收縮不良）",
      uterus: "柔軟、膨大、位置上升",
      bleeding: "大量鮮紅湧出、伴大型血塊",
      clues: "按摩後短暫改善又鬆弛；佔 PPH 70-80%",
      actions: "子宮底按摩、排空膀胱、Oxytocin、Methergine/Carboprost、Bakri 水球"
    },
    {
      cause: "Trauma（產道撕裂傷）",
      uterus: "堅硬如石、收縮良好",
      bleeding: "持續涓涓細流或噴血、鮮紅、無大血塊",
      clues: "子宮很硬但依然大量流血；器械助產、急產、巨大兒高危",
      actions: "置入陰道拉鉤良好照明、360度巡查子宮頸與深穹窿、縫合止血"
    },
    {
      cause: "Tissue（胎盤殘留）",
      uterus: "偏軟、收縮不全",
      bleeding: "持續出血、混雜組織碎屑",
      clues: "胎盤娩出時間過長、胎盤母體面缺損、超音波見強回音團塊",
      actions: "超音波確認、宮腔徒手探查 (Manual removal)、鈍性刮宮術、收縮劑"
    },
    {
      cause: "Trauma（產道血腫）",
      uterus: "堅硬、輪廓正常",
      bleeding: "外出血極少或無出血",
      clues: "頻脈、低血壓、肛門會陰撕裂般極度脹痛、紫黑色局部腫塊",
      actions: "評估血腫擴大趨勢、進手術室切開清除血塊、確切縫合止血、紗布填塞"
    },
    {
      cause: "Thrombin（凝血障礙/DIC）",
      uterus: "可硬可軟",
      bleeding: "水樣淡紅、完全不凝固、多處針眼滲血",
      clues: "胎盤早剝、羊水栓塞或休克後；PT/aPTT 顯著延長、Fibrinogen 暴跌",
      actions: "大量輸血協定 (MTP)、輸注 FFP、血小板、Cryoprecipitate、TXA 止血"
    }
  ]
};

export const PPH_ALGORITHM_STEPS = [
  {
    stage: "第一階段：預警與初級處置",
    bloodLossThreshold: "累積失血 500-1000 mL",
    actions: [
      "呼叫團隊支援，啟動 PPH Code",
      "持續強力子宮環狀按摩 (Fundal Massage) 與排空膀胱",
      "第一線子宮收縮劑：Oxytocin 20-40 IU 靜脈輸注",
      "建立第二條大口徑 (18G) 靜脈管路，抽血備血 (Type & Screen)"
    ]
  },
  {
    stage: "第二階段：持續出血與進階藥物",
    bloodLossThreshold: "累積失血 1000-1500 mL 或 SI ≥ 1.0",
    actions: [
      "給予第二線宮縮劑：Methergine (高血壓禁用) 或 Carboprost (氣喘禁用) 或 Misoprostol",
      "靜脈注射抗纖溶劑 Tranexamic Acid (TXA 1g IV)",
      "通知血庫準備 2-4 單位紅血球，加溫輸液",
      "轉送產房/手術室進行雙手壓迫 (Bimanual Compression) 及徹底產道檢查"
    ]
  },
  {
    stage: "第三階段：侵入性機械與器械壓迫",
    bloodLossThreshold: "累積失血 1500-2000 mL 或生命徵象不穩",
    actions: [
      "置入 Bakri 子宮填塞水球 (Bakri Balloon Tamponade，注水 300-500 mL)",
      "若水球無效，準備緊急剖腹探查手術",
      "外科止血術式：B-Lynch 子宮縫合壓迫術、子宮動脈結紮術",
      "若條件允許且血液動力穩定，考慮介入放射科子宮動脈栓塞術 (UAE)"
    ]
  },
  {
    stage: "第四階段：大量輸血與終極搶救",
    bloodLossThreshold: "失血 > 2000 mL 或休克指數 SI ≥ 1.4",
    actions: [
      "全面啟動大量輸血協定 (MTP，pRBC : FFP : Platelet = 1:1:1)",
      "補充 Cryoprecipitate 確保 Fibrinogen > 200 mg/dL",
      "骨盆腔紗布填塞 (Pelvic Packing)",
      "挽救生命之最終手段：緊急子宮切除術 (Emergency Peripartum Hysterectomy)"
    ]
  }
];

export const QBL_CALCULATION_GUIDE = {
  description: "定量失血 (Quantitative Blood Loss, QBL) 是評估產後大出血的黃金標準，誤差遠小於傳統目測法 (EBL)。",
  spongeWeightRatio: "1 克 (g) 淨濕重差值 ＝ 1 毫升 (mL) 失血量",
  guidelines: [
    "預先秤量乾紗布與止血棉墊之基礎重量",
    "產後秤量浸潤血液之物品重量，扣除乾重即為失血量 (g = mL)",
    "抽吸瓶刻度總液量須扣除預估羊水量 (若破水後進行)",
    "產台刻度集血袋 (V-drape) 可直接讀取收集血量"
  ]
};

