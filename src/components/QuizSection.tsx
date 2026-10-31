import React, { useState, useEffect } from 'react';
import { QuizQuestion, UserQuizRecord } from '../types/grammar';
import { QUIZ_QUESTIONS } from '../data/grammarData';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, Sparkles, BookOpen, Clock } from 'lucide-react';

interface QuizSectionProps {
  onGoToCases: () => void;
}

type QuizMode = 'speed' | 'full' | 'wrong';

export const QuizSection: React.FC<QuizSectionProps> = ({ onGoToCases }) => {
  const [mode, setMode] = useState<QuizMode>('speed');
  const [quizList, setQuizList] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('gm_wrong_questions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Initialize questions according to mode
  const initQuiz = (targetMode: QuizMode) => {
    setMode(targetMode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);

    let list: QuizQuestion[] = [];
    if (targetMode === 'speed') {
      // 5 random questions
      const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
      list = shuffled.slice(0, 5);
    } else if (targetMode === 'wrong') {
      // Questions from wrong list
      list = QUIZ_QUESTIONS.filter(q => wrongQuestionIds.includes(q.id));
      if (list.length === 0) {
        list = QUIZ_QUESTIONS.slice(0, 5);
      }
    } else {
      // Full 15 questions
      list = [...QUIZ_QUESTIONS];
    }
    setQuizList(list);
  };

  useEffect(() => {
    initQuiz('speed');
  }, []);

  const currentQ = quizList[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQ) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      // record wrong answer
      setWrongQuestionIds(prev => {
        const next = Array.from(new Set([...prev, currentQ.id]));
        localStorage.setItem('gm_wrong_questions', JSON.stringify(next));
        return next;
      });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizList.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished
      setQuizFinished(true);
      const finalScorePct = Math.round(((score + (selectedOption === currentQ.correctIndex ? 0 : 0)) / quizList.length) * 100);
      if (finalScorePct >= 80) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }
  };

  const totalQuestions = quizList.length;
  const currentNum = currentIndex + 1;
  const progressPercent = totalQuestions > 0 ? (currentNum / totalQuestions) * 100 : 0;
  const calculatedFinalScore = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Mode Selector Bar */}
      {!quizFinished && (
        <div className="bg-white rounded-2xl p-3 border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => initQuiz('speed')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                mode === 'speed' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚡ 5분 스피드 퀴즈 (5문항)
            </button>
            <button
              onClick={() => initQuiz('full')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                mode === 'full' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📋 실전 모의고사 (15문항)
            </button>
            {wrongQuestionIds.length > 0 && (
              <button
                onClick={() => initQuiz('wrong')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  mode === 'wrong' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                오답 복습 ({wrongQuestionIds.length})
              </button>
            )}
          </div>

          <div className="text-xs font-mono font-bold text-slate-500 pr-2">
            진행도: {currentNum} / {totalQuestions}
          </div>
        </div>
      )}

      {/* Main Quiz Card */}
      {!quizFinished && currentQ ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative">
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Question Title & Subtext */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              문제 {currentNum}
            </span>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>난이도: {currentQ.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span>현재 점수: {score}개 정답</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 font-medium mb-6">
            다음 문장에서 밑줄 친 단어의 올바른 <strong>품사</strong>를 고르시오.
          </p>

          {/* Target Sentence Box */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center text-lg sm:text-xl font-bold text-slate-900 leading-relaxed break-keep">
            <span
              dangerouslySetInnerHTML={{
                __html: currentQ.sentence.replace(
                  /<u>(.*?)<\/u>/g,
                  '<span class="text-indigo-600 underline decoration-indigo-500 decoration-4 underline-offset-4 bg-indigo-50 px-1 py-0.5 rounded">$1</span>'
                )
              }}
            />
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctIndex;

              let btnStyle = 'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 text-slate-800';

              if (isAnswered) {
                if (isCorrectAnswer) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 font-bold line-through';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl border-2 text-center text-sm sm:text-base font-semibold transition-all ${btnStyle}`}
                >
                  <span className="mr-2 text-xs font-mono text-slate-400 font-normal">0{idx + 1}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Instant Feedback Panel */}
          {isAnswered && (
            <div className={`mt-6 p-6 rounded-2xl border transition-all animate-in fade-in duration-200 ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50/80 border-emerald-300'
                : 'bg-rose-50/80 border-rose-300'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-base font-bold text-emerald-800">
                      정답입니다! 완벽해요 👏
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span className="text-base font-bold text-rose-800">
                      아쉬워요! 정답은 &lsquo;{currentQ.options[currentQ.correctIndex]}&rsquo;입니다.
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mt-2">
                <strong>해설:</strong> {currentQ.explanation}
              </p>

              <div className="mt-3 text-xs bg-white/90 p-2.5 rounded-lg border border-slate-200/80 text-slate-600 font-medium">
                <strong>적용 공식:</strong> {currentQ.distinctionFormula}
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0"
                >
                  <span>{currentIndex + 1 < quizList.length ? '다음 문제로 넘어가기' : '최종 결과 확인하기'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* FINAL SCORE SUMMARY SCREEN */}
      {quizFinished && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-2xs">
            <Award className="w-8 h-8" />
          </div>

          <div className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-1">
            TEST COMPLETED
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            실전 모의고사 평가 완료!
          </h3>

          <div className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto">
            <span className="text-xs font-semibold text-slate-500 block mb-1">
              금촌고 2학년 막내의 성적표
            </span>
            <div className="text-4xl sm:text-5xl font-black text-indigo-600 tracking-tight">
              {calculatedFinalScore}점
            </div>
            <div className="mt-1 text-xs text-slate-500">
              총 {totalQuestions}문항 중 <strong className="text-slate-800">{score}개</strong> 정답
            </div>
          </div>

          {/* Encouragement Message */}
          <div className="mt-6 max-w-lg mx-auto p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {calculatedFinalScore === 100 ? (
              <p>
                🎉 <strong>언어와 매체 만점 보장!</strong> 모든 품사 통용의 판별 공식과 킬러 함정을 완벽하게 꿰뚫고 있습니다. 실전 수능과 내신에서도 흔들림 없이 1등급을 쟁취할 수 있어요!
              </p>
            ) : calculatedFinalScore >= 70 ? (
              <p>
                ✨ <strong>훌륭합니다! 1등급 턱밑 도달!</strong> 대부분의 원리를 잘 이해하고 있어요. 헷갈렸던 1~2개 문제만 <strong>&lsquo;사례 사전&rsquo;</strong>에서 복습하면 완벽해집니다!
              </p>
            ) : (
              <p>
                💪 <strong>품사 통용은 국어 문법 최고의 킬러 파트예요!</strong> 좌절할 필요 전혀 없습니다. 1번 탭의 <strong>&lsquo;조사 결합 판별법&rsquo;</strong>과 <strong>&lsquo;현재시제 -ㄴ다&rsquo;</strong> 공식만 다시 복습하면 금세 정복됩니다!
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => initQuiz(mode)}
              className="flex items-center gap-1.5 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>다시 도전하기</span>
            </button>
            <button
              onClick={onGoToCases}
              className="flex items-center gap-1.5 px-6 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-4 h-4" />
              <span>핵심 사례 사전 복습하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
