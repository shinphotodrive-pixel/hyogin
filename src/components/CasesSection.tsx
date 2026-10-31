import React, { useState, useMemo } from 'react';
import { GrammarWord, GrammarCategory } from '../types/grammar';
import { GRAMMAR_WORDS } from '../data/grammarData';
import { WordDetailModal } from './WordDetailModal';
import { Search, RotateCw, Bookmark, BookmarkCheck, ExternalLink, Filter } from 'lucide-react';

interface CasesSectionProps {
  bookmarkedIds: string[];
  onToggleBookmark: (wordId: string) => void;
}

export const CasesSection: React.FC<CasesSectionProps> = ({ bookmarkedIds, onToggleBookmark }) => {
  const [selectedCategory, setSelectedCategory] = useState<GrammarCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeModalWord, setActiveModalWord] = useState<GrammarWord | null>(null);

  const categories: { id: GrammarCategory; label: string }[] = [
    { id: 'all', label: '전체 보기' },
    { id: 'noun-particle', label: '의존 명사 vs 조사' },
    { id: 'verb-adj', label: '동사 vs 형용사' },
    { id: 'noun-adv', label: '명사 vs 부사' },
    { id: 'num-det', label: '수사 vs 관형사' },
    { id: 'pron-det', label: '대명사 vs 관형사' },
    { id: 'excl-adv-other', label: '기타 (감탄사/활용형)' },
  ];

  const filteredWords = useMemo(() => {
    return GRAMMAR_WORDS.filter((word) => {
      const matchCategory = selectedCategory === 'all' || word.category === selectedCategory;
      const matchBookmark = !onlyBookmarks || bookmarkedIds.includes(word.id);
      const matchSearch =
        searchQuery.trim() === '' ||
        word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.types.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        word.distinctionRule.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.usages.some(u => u.example.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchBookmark && matchSearch;
    });
  }, [selectedCategory, searchQuery, onlyBookmarks, bookmarkedIds]);

  const toggleFlip = (wordId: string, e: React.MouseEvent) => {
    // If clicking on interactive buttons inside card, don't flip
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setFlippedCards((prev) => ({
      ...prev,
      [wordId]: !prev[wordId]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              수능·내신 필수 품사 통용 사례 사전
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              카드를 클릭하여 앞뒷면을 뒤집어보고, 핵심 공식과 용례를 비교해 보세요.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlyBookmarks(!onlyBookmarks)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                onlyBookmarks
                  ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-amber-500 text-amber-600' : ''}`} />
              <span>오답노트 보관함 ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="단어명(예: 만큼, 큰다, 같이), 품사, 예문 검색..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/50"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 whitespace-nowrap shrink-0"
            >
              검색 초기화
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredWords.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <p className="text-slate-500 text-sm">
            {onlyBookmarks
              ? '아직 오답노트 보관함에 담긴 단어가 없습니다. 카드 우측 상단의 북마크 버튼을 눌러보세요!'
              : '조건에 해당하는 품사 통용 사례가 없습니다.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map((word) => {
            const isFlipped = !!flippedCards[word.id];
            const isBookmarked = bookmarkedIds.includes(word.id);

            return (
              <div
                key={word.id}
                onClick={(e) => toggleFlip(word.id, e)}
                className="h-80 perspective-1000 cursor-pointer select-none group"
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-3d rounded-2xl shadow-sm border border-slate-200 ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      {/* Top Bar on Card */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                          <span>{word.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-indigo-600 font-semibold">{word.frequency}</span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(word.id);
                          }}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isBookmarked
                              ? 'bg-amber-50 border-amber-300 text-amber-600'
                              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                          }`}
                          title="오답노트 보관함"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-600' : ''}`} />
                        </button>
                      </div>

                      {/* Word Title */}
                      <div className="mt-6 text-center">
                        <h4 className="text-3xl font-black text-slate-900 tracking-tight">
                          {word.word}
                        </h4>
                        <div className="mt-2 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
                          {word.types.join('  VS  ')}
                        </div>
                      </div>

                      {/* Rule preview */}
                      <p className="mt-4 text-xs text-slate-600 line-clamp-3 text-center leading-relaxed">
                        {word.distinctionRule}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-700">
                        <RotateCw className="w-3.5 h-3.5" />
                        클릭하여 뒤집기
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalWord(word);
                        }}
                        className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        상세보기
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-slate-900 text-white rounded-2xl p-6 rotate-y-180 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-xs font-bold text-indigo-400">
                          {word.word} 품사 판별 대조표
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <RotateCw className="w-3 h-3" />
                          다시 뒤집기
                        </span>
                      </div>

                      {/* Usage 1 */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                            {word.usages[0].pos}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {word.usages[0].keyCondition}
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 mt-1 font-medium leading-snug">
                          &ldquo;{word.usages[0].example}&rdquo;
                        </p>
                      </div>

                      {/* Usage 2 */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                            {word.usages[1].pos}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {word.usages[1].keyCondition}
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 mt-1 font-medium leading-snug">
                          &ldquo;{word.usages[1].example}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalWord(word);
                        }}
                        className="w-full py-2 text-xs font-semibold text-center text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        킬러 함정 & 상세 분석 보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Word Detail Modal */}
      <WordDetailModal
        word={activeModalWord}
        onClose={() => setActiveModalWord(null)}
        isBookmarked={activeModalWord ? bookmarkedIds.includes(activeModalWord.id) : false}
        onToggleBookmark={onToggleBookmark}
      />
    </div>
  );
};
