import React from 'react';
import { GrammarWord } from '../types/grammar';
import { X, Bookmark, BookmarkCheck, AlertCircle, Sparkles, BookOpen } from 'lucide-react';

interface WordDetailModalProps {
  word: GrammarWord | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (wordId: string) => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  word,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  if (!word) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <span>{word.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-600 font-bold">{word.frequency}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <span>{word.word}</span>
              <span className="text-sm font-medium text-slate-500">
                ({word.types.join(' vs ')})
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(word.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
              }`}
              title={isBookmarked ? '오답노트 보관함에서 제거' : '오답노트 보관함에 추가'}
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5 fill-amber-500 text-amber-600" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Core Distinction Rule Box */}
        <div className="mt-5 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-950">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>핵심 구별 공식</span>
          </div>
          <p className="text-sm font-semibold leading-relaxed">
            {word.distinctionRule}
          </p>
        </div>

        {/* Two Usage Comparison */}
        <div className="mt-6 space-y-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            품사별 상세 분석 및 용례 비교
          </h4>

          <div className="grid sm:grid-cols-2 gap-4">
            {word.usages.map((usage, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border ${
                  idx === 0 
                    ? 'border-indigo-200 bg-indigo-50/30' 
                    : 'border-emerald-200 bg-emerald-50/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                    idx === 0 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {usage.pos}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {usage.keyCondition}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed min-h-[40px]">
                  {usage.definition}
                </p>

                <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold text-slate-400 block mb-0.5">예문</span>
                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {usage.example}
                  </p>
                </div>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  <strong>분석:</strong> {usage.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Tip */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900">
            <span className="font-bold text-amber-800 block mb-0.5">수능·내신 출제 킬러 포인트</span>
            <p className="font-medium leading-relaxed">{word.examTip}</p>
          </div>
        </div>

        {/* Footer close */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
