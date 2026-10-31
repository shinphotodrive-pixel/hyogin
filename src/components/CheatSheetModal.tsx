import React from 'react';
import { GRAMMAR_WORDS, CORE_FORMULAS } from '../data/grammarData';
import { X, Printer, Sparkles, CheckCircle2 } from 'lucide-react';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-200 print:border-b-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>파주 금촌고 2학년 막내를 위한 1등급 국어 비법</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              품사 통용 마스터 시험 직전 1장 완벽 치트시트
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              수능 &lsquo;언어와 매체&rsquo; 및 내신 문법 시험에 단골 출제되는 4대 판별 공식과 빈출 단어 총정리
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>인쇄 / PDF 저장</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 Rules Summary Section */}
        <div className="mt-6">
          <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-3">
            01. 3초 만에 푸는 4대 판별 치트키 공식
          </h4>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            {CORE_FORMULAS.map(f => (
              <div key={f.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                <span className="font-bold text-indigo-600 block mb-1">
                  [{f.num}] {f.title}
                </span>
                <p className="text-slate-700 font-medium leading-relaxed mb-1.5">
                  {f.description}
                </p>
                <div className="text-[11px] text-indigo-950 bg-indigo-50/80 p-2 rounded border border-indigo-100 font-mono">
                  {f.goodExample}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tricky Words Table */}
        <div className="mt-8">
          <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-3">
            02. 수능·내신 킬러 품사 통용 단어 대조 요약표
          </h4>
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                <tr>
                  <th className="py-3 px-4 w-20">단어</th>
                  <th className="py-3 px-4 w-32">통용 품사</th>
                  <th className="py-3 px-4">판별 기준 및 핵심 예문</th>
                  <th className="py-3 px-4 w-44">1등급 킬러 팁</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                {GRAMMAR_WORDS.map(word => (
                  <tr key={word.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-indigo-700">
                      {word.word}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {word.types.join(' / ')}
                    </td>
                    <td className="py-3 px-4 leading-relaxed">
                      <div className="mb-1">
                        <strong className="text-indigo-600 font-bold">[{word.usages[0].pos}]</strong> {word.usages[0].example}
                      </div>
                      <div>
                        <strong className="text-emerald-600 font-bold">[{word.usages[1].pos}]</strong> {word.usages[1].example}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px] leading-snug">
                      {word.examTip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-400 print:text-black">
          파주 금촌고등학교 2학년 국어 만점을 진심으로 응원합니다! (국립국어원 표준국어대사전 규정 준수)
        </div>
      </div>
    </div>
  );
};
