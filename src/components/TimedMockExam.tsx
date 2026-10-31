import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Clock, Play, RotateCcw, CheckCircle2, Award, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import { QUESTION_7_RULES } from '../data/assessmentData';

export const TimedMockExam: React.FC = () => {
  const [examPart, setExamPart] = useState<'part1' | 'part2'>('part1');
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60); // 20 mins for part1
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form Inputs
  const [q1Answers, setQ1Answers] = useState<string[]>(['', '', '', '', '']);
  const [q2Answers, setQ2Answers] = useState<string[]>(['', '', '', '']);
  const [q3_1, setQ3_1] = useState<string>('');
  const [q3_2, setQ3_2] = useState<string>('');
  const [q4Text, setQ4Text] = useState<string>('');
  const [q5Text, setQ5Text] = useState<string>('');
  const [q6Text, setQ6Text] = useState<string>('');
  const [q7Answers, setQ7Answers] = useState<Record<string, string>>({
    '9': '',
    '10': '',
    '12_1': '',
    '17': '',
    '18': '',
    '20': '',
    '22': '',
  });

  // Switch part resets timer
  const handleSwitchPart = (part: 'part1' | 'part2') => {
    setExamPart(part);
    setIsTimerRunning(false);
    setIsSubmitted(false);
    setTimeLeft(part === 'part1' ? 20 * 60 : 25 * 60);
  };

  useEffect(() => {
    let timer: any = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      alert('시험 시간이 종료되었습니다! 답안을 제출하세요.');
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    setIsTimerRunning(false);
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleReset = () => {
    setIsTimerRunning(false);
    setIsSubmitted(false);
    setTimeLeft(examPart === 'part1' ? 20 * 60 : 25 * 60);
  };

  // Check 6번 line count
  const q6Lines = q6Text.split('\n').filter(l => l.trim().length > 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Timer & Control Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm sticky top-20 z-30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => handleSwitchPart('part1')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                examPart === 'part1'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1차 평가지 (1~5번) 20분
            </button>
            <button
              onClick={() => handleSwitchPart('part2')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                examPart === 'part2'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2차 평가지 (6~7번) 25분
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span className={`text-2xl font-black font-mono tracking-tight ${
                timeLeft < 180 ? 'text-rose-600 animate-pulse' : 'text-slate-900'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!isTimerRunning ? (
                <button
                  onClick={() => setIsTimerRunning(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>시험 시작</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsTimerRunning(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-xl transition-all"
                >
                  일시정지
                </button>
              )}

              <button
                onClick={handleReset}
                className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 rounded-xl"
                title="시간 초기화"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EXAM PAPER CONTENT */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
        <div className="text-center pb-6 border-b border-slate-200">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
            금촌고등학교 2학년 화법과 언어
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            국어 규범 탐구 수행평가 실전 모의 시험지 ({examPart === 'part1' ? '1차' : '2차'})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            실제 시험지와 100% 동일한 서술형 입력 및 채점 시뮬레이션
          </p>
        </div>

        {/* PART 1 QUESTIONS */}
        {examPart === 'part1' && (
          <div className="space-y-8">
            {/* 1번 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-sm font-bold text-slate-900 block mb-2">
                1) 국립국어원 홈페이지 하단의 [사전]에서 소개하고 있는 5가지 사전의 이름을 쓰시오.
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-3">
                {q1Answers.map((ans, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={ans}
                    onChange={(e) => {
                      const copy = [...q1Answers];
                      copy[idx] = e.target.value;
                      setQ1Answers(copy);
                    }}
                    placeholder={`사전 ${idx + 1}`}
                    className="p-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                ))}
              </div>
              {isSubmitted && (
                <div className="mt-3 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <strong>정답:</strong> 표준국어대사전, 우리말샘, 한국어기초사전, 한국어-외국어 학습사전, 지역어 사전
                </div>
              )}
            </div>

            {/* 2번 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-sm font-bold text-slate-900 block mb-2">
                2) [국립국어원 홈페이지-어문 규범]에서 제시하는 어문 규범 4가지가 무엇인지 쓰시오. (&lsquo;용례찾기&rsquo; 제외)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mt-3">
                {q2Answers.map((ans, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={ans}
                    onChange={(e) => {
                      const copy = [...q2Answers];
                      copy[idx] = e.target.value;
                      setQ2Answers(copy);
                    }}
                    placeholder={`규범 ${idx + 1}`}
                    className="p-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                ))}
              </div>
              {isSubmitted && (
                <div className="mt-3 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <strong>정답:</strong> 한글 맞춤법, 표준어 규정, 외래어 표기법, 국어의 로마자 표기법
                </div>
              )}
            </div>

            {/* 3번 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-sm font-bold text-slate-900 block mb-2">
                3) [어문 규범-용례 찾기]를 활용하여 다음 단어의 올바른 외래어 표기를 적으시오.
              </label>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">① cardigan</span>
                  <input
                    type="text"
                    value={q3_1}
                    onChange={(e) => setQ3_1(e.target.value)}
                    placeholder="한글 외래어 표기 입력"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-1">② cake</span>
                  <input
                    type="text"
                    value={q3_2}
                    onChange={(e) => setQ3_2(e.target.value)}
                    placeholder="한글 외래어 표기 입력"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
              {isSubmitted && (
                <div className="mt-3 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <strong>정답:</strong> ① 카디건 (가디건 X), ② 케이크 (케익 X)
                </div>
              )}
            </div>

            {/* 4번 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-sm font-bold text-slate-900 block mb-1">
                4) 한 개의 품사(또는 품사 통용)를 정하고 [온라인 가나다]에서 질문과 답변 내용을 정리하여 적으시오.
              </label>
              <p className="text-xs text-slate-500 mb-2">
                *단순 &lsquo;예/아니오&rsquo; 또는 문법서 참고하라는 답변 절대 금지
              </p>
              <textarea
                value={q4Text}
                onChange={(e) => setQ4Text(e.target.value)}
                rows={4}
                placeholder="품사(통용) 선정 단어 및 질문과 국어원 답변 내용 정리 입력..."
                className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {isSubmitted && (
                <div className="mt-3 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <strong>모범 답안 예시:</strong> &lsquo;만큼&rsquo; 품사 통용 - 관형어 수식을 받는 &lsquo;노력한 만큼&rsquo;은 의존 명사이므로 한글 맞춤법 제42항에 따라 띄어 쓰고, 대명사 뒤에 붙은 &lsquo;너만큼&rsquo;은 보조사이므로 제41항에 따라 앞말에 붙여 씀.
                </div>
              )}
            </div>

            {/* 5번 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-sm font-bold text-slate-900 block mb-2">
                5) [공공언어 개선]에서 [다듬은 말]을 검색하여 일상생활 속 자주 쓰이는 외래어 다듬은 표현 3개를 적으시오.
              </label>
              <textarea
                value={q5Text}
                onChange={(e) => setQ5Text(e.target.value)}
                rows={3}
                placeholder="1. 외래어 -> 다듬은 말&#10;2. 외래어 -> 다듬은 말&#10;3. 외래어 -> 다듬은 말"
                className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {isSubmitted && (
                <div className="mt-3 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <strong>모범 답안 예시:</strong> 1. 스크린도어 -&gt; 안전문, 2. 드라이브스루 -&gt; 승차 구매, 3. 키오스크 -&gt; 무인 안내기 (무인 주문기)
                </div>
              )}
            </div>
          </div>
        )}

        {/* PART 2 QUESTIONS */}
        {examPart === 'part2' && (
          <div className="space-y-8">
            {/* 6번 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-900">
                  6) [글쓰기-원고지] 외래어 다듬기 찬반 의견 및 구체적 근거 2가지 제시 (15줄 이상, 예시 1개 이상 활용)
                </label>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                  q6Lines.length >= 15 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  현재 {q6Lines.length}줄 / 최소 15줄
                </span>
              </div>
              <textarea
                value={q6Text}
                onChange={(e) => setQ6Text(e.target.value)}
                rows={16}
                placeholder="줄바꿈(Enter)으로 원고지 줄을 구분하여 작성하세요. (15줄 이상 작성 필수)"
                className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans leading-relaxed"
              />
              {isSubmitted && (
                <div className="mt-3 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <strong>채점 기준 확인:</strong> 찬성/반대 입장 명시 여부, 근거 2가지(알 권리/정보 소외 방지, 문화적 주체성), 다듬은 말 예시(키오스크-&gt;무인 안내기), 15줄 이상 달성 여부
                </div>
              )}
            </div>

            {/* 7번 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-sm font-bold text-slate-900 block mb-1">
                7) 표준발음법 제4장·제5장 다음의 각 항이 설명하고 있는 중심적인 음운 변동 명칭 1가지를 적으시오.
              </label>
              <p className="text-xs text-rose-600 font-semibold mb-3">
                *(교체/첨가/탈락/축약 안의 구체적 명칭으로 적을 것. 22항은 &lsquo;ㅣ모음 순행 동화&rsquo; 표기 금지!)*
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { key: '9', label: '제4장 9항', answer: '음절의 끝소리 규칙 (평폐쇄음화)' },
                  { key: '10', label: '10항', answer: '자음군 단순화' },
                  { key: '12_1', label: '12항 1', answer: '거센소리되기 (자음 축약)' },
                  { key: '17', label: '제5장 17항', answer: '구개음화' },
                  { key: '18', label: '18항', answer: '비음화 (자음 동화)' },
                  { key: '20', label: '20항', answer: '유음화 (자음 동화)' },
                  { key: '22', label: '22항 (주의)', answer: '반모음 첨가 (모음 첨가)' },
                ].map((item) => (
                  <div key={item.key} className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-1">{item.label}</span>
                    <input
                      type="text"
                      value={q7Answers[item.key]}
                      onChange={(e) => setQ7Answers({ ...q7Answers, [item.key]: e.target.value })}
                      placeholder="구체적 음운 변동 명칭 입력"
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    {isSubmitted && (
                      <span className="block mt-1 text-[11px] font-bold text-emerald-700">
                        정답: {item.answer}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>답안 제출 및 모범답안 자동 채점</span>
          </button>
        </div>
      </div>
    </div>
  );
};
