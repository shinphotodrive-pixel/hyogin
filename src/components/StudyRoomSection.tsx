import React, { useState, useEffect } from 'react';
import { GRAMMAR_WORDS, CORE_FORMULAS } from '../data/grammarData';
import { Heart, Sparkles, Calendar, Edit3, Save, CheckCircle2, Printer, Bookmark } from 'lucide-react';

interface StudyRoomSectionProps {
  bookmarkedIds: string[];
  onOpenCheatSheet: () => void;
}

export const StudyRoomSection: React.FC<StudyRoomSectionProps> = ({ bookmarkedIds, onOpenCheatSheet }) => {
  const [memo, setMemo] = useState<string>(() => {
    return localStorage.getItem('gm_study_memo') || '1. 만큼, 대로, 뿐: 체언 뒤 붙여쓰기(조사), 관형어 뒤 띄어쓰기(의존명사)\n2. 크다, 밝다, 맞다: 현재시제 -ㄴ다/-는다 결합 여부 확인!\n3. 오늘 모의고사 100점 목표 달성하기!';
  });
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [goalText, setGoalText] = useState<string>(() => {
    return localStorage.getItem('gm_study_goal') || '금촌고 2학년 국어 1등급 쟁취!';
  });
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);

  const handleSaveMemo = () => {
    localStorage.setItem('gm_study_memo', memo);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSaveGoal = () => {
    localStorage.setItem('gm_study_goal', goalText);
    setIsEditingGoal(false);
  };

  const bookmarkedWords = GRAMMAR_WORDS.filter(w => bookmarkedIds.includes(w.id));

  return (
    <div className="space-y-8">
      {/* Encouragement Card */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-md relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-2">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>파주 금촌고등학교 2학년 막내 전용 스터디룸</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            막내야, 국어 문법은 원리만 알면<br />
            무조건 100점 나오는 최고의 효자 과목이야!
          </h3>

          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            고2 2학기는 수능과 내신의 분수령이 되는 중요한 시기입니다. 
            처음엔 &lsquo;품사 통용&rsquo;이 헷갈리고 외울 게 많아 보여도, 
            <strong> [조사 결합]</strong>과 <strong>[-ㄴ다 어미]</strong>라는 단 두 가지 열쇠만 쥐고 있으면 어떤 킬러 문제도 다 풀립니다.
            늘 곁에서 힘차게 응원하고 있으니 지치지 말고 차근차근 나아가자! 화이팅 🥰
          </p>

          {/* Goal Tag */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {isEditingGoal ? (
              <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20">
                <input
                  type="text"
                  value={goalText}
                  onChange={(e) => setGoalText(e.target.value)}
                  className="bg-transparent text-white px-2 py-1 text-xs focus:outline-none"
                />
                <button
                  onClick={handleSaveGoal}
                  className="px-2.5 py-1 text-xs font-bold bg-indigo-500 text-white rounded-lg"
                >
                  저장
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingGoal(true)}
                className="cursor-pointer flex items-center gap-2 bg-white/10 hover:bg-white/15 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-semibold transition-colors"
                title="클릭하여 목표 수정"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>나의 목표: {goalText}</span>
                <Edit3 className="w-3 h-3 text-slate-400 ml-1" />
              </div>
            )}

            <button
              onClick={onOpenCheatSheet}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-white text-slate-900 rounded-xl hover:bg-slate-100 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-600" />
              <span>시험 직전 1장 요약본 열기</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Deck: Memo Notes + Bookmarked Tricky Words */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Study Notes & Memo */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <span>나만의 비밀 오답 정리 노트</span>
              </h4>
              <span className="text-xs text-slate-400">자동 로컬 저장</span>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              자주 틀리는 단어나 선생님이 강조하신 킬러 포인트를 자유롭게 메모해 두세요.
            </p>

            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={8}
              className="w-full p-4 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-sans leading-relaxed resize-none text-slate-800"
              placeholder="여기에 자유롭게 복습 메모를 적어보세요..."
            />
          </div>

          <div className="mt-4 flex items-center justify-between pt-2">
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              {isSaved && (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  저장되었습니다!
                </>
              )}
            </span>
            <button
              onClick={handleSaveMemo}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <Save className="w-3.5 h-3.5" />
              <span>메모 저장하기</span>
            </button>
          </div>
        </div>

        {/* Bookmarked Words Review List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>내가 찜한 헷갈림 단어장 ({bookmarkedWords.length})</span>
            </h4>
            <span className="text-xs text-slate-400">사례 사전 연동</span>
          </div>

          {bookmarkedWords.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
              <p>아직 북마크한 단어가 없습니다.</p>
              <p className="mt-1 text-slate-500">
                <strong>&lsquo;사례 사전&rsquo;</strong>에서 헷갈리는 단어 카드의 북마크 버튼을 누르면 이곳에 모아볼 수 있습니다!
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {bookmarkedWords.map(word => (
                <div
                  key={word.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-extrabold text-slate-900">
                      {word.word}
                    </span>
                    <span className="text-xs text-indigo-600 font-semibold">
                      {word.types.join(' vs ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {word.distinctionRule}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
