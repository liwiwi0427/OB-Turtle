import React, { useState } from 'react';
import { BookOpen, Copy, Check, FileText, Search } from 'lucide-react';
import { RAW_EXTRACTED_TEXTS } from '../data/rawExtractedTexts';

interface ArchiveItem {
  id: string;
  title: string;
  subtitle: string;
}

const ARCHIVE_ITEMS: ArchiveItem[] = [
  { id: 'case_1', title: '案例一：今天寶寶怎麼一直沒有動？', subtitle: '妊娠高血壓合併胎兒窘迫 (Gestational HTN + Fetal Distress)' },
  { id: 'case_2', title: '案例二：寶寶的心跳怎麼一直下降？', subtitle: '催產素過度刺激與胎心變異減速 (Fetal Distress)' },
  { id: 'case_3', title: '案例三：最近一直頭痛，是太累了嗎？', subtitle: '重度子癲前症與子癲大抽搐 (Severe Preeclampsia → Eclampsia)' },
  { id: 'case_4', title: '案例四：昨天還好好的，今天肚子突然一直痛？', subtitle: '妊娠糖尿病 (GDM) 合併胎盤早期剝離 (Placental Abruption)' },
  { id: 'case_5', title: '案例五：寶寶怎麼比預期還大？', subtitle: '妊娠糖尿病 (GDM)、巨大兒與胰島素治療' },
  { id: 'case_6', title: '案例六：肚子一直痛，寶寶怎麼不太動了？', subtitle: '高血壓誘發胎盤早期剝離與隱藏性出血' },
  { id: 'case_7', title: '案例七：沒有疼痛，卻一直出血', subtitle: '前置胎盤 (Placenta Previa) 與無痛鮮紅出血' },
  { id: 'case_8', title: '案例八：突然崩潰的產婦（羊水栓塞）', subtitle: '急性低血氧、心跳驟停與暴發性 DIC' },
  { id: 'pph_4t', title: '案例九：產後大出血 (PPH) 4T 止血專題', subtitle: 'Tone、Trauma、Tissue、Thrombin 全面鑑別與處置' }
];

export const RawArchiveViewer: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case_1');
  const [copied, setCopied] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentText = RAW_EXTRACTED_TEXTS[selectedCaseId] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredItems = ARCHIVE_ITEMS.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
              <BookOpen className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                RAW CLINICAL CASE ARCHIVES
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                ChatGPT 共享源 9大案例完整文字庫
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                完整保留原始臨床分期、引導問題、教師版臨床推理、OSCE 考站話術與病理機轉延伸討論
              </p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '已複製全文到剪貼簿！' : '一鍵複製當前教案'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Case List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="搜尋案例關鍵字..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* List */}
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredItems.map((item) => {
              const isSelected = selectedCaseId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedCaseId(item.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 font-bold shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <FileText className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="line-clamp-1">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-normal line-clamp-1">
                    {item.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Reader Area: Full Transcript (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-h-[750px] overflow-y-auto">
          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-mono text-slate-800">
            {currentText}
          </div>
        </div>
      </div>
    </div>
  );
};
