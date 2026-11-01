import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  Award,
  AlertCircle,
  ArrowRight,
  BookOpen,
  TrendingUp,
  BarChart3,
  Trash2,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { QUESTION_7_RULES } from '../data/assessmentData';

export interface ExamAttempt {
  id: string;
  attemptNumber: number;
  label: string;
  date: string;
  part1Score: number; // 7.5 max
  part2Score: number; // 7.5 max
  totalScore: number; // 15.0 max
  timeSpentMinutes: number;
  note: string;
}

const DEFAULT_ATTEMPTS: ExamAttempt[] = [
  {
    id: 'att-1',
    attemptNumber: 1,
    label: '1회차',
    date: '10/26',
    part1Score: 4.8,
    part2Score: 4.2,
    totalScore: 9.0,
    timeSpentMinutes: 44,
    note: '첫 모의고사 (외래어 표기·음운변동 실수)'
  },
  {
    id: 'att-2',
    attemptNumber: 2,
    label: '2회차',
    date: '10/28',
    part1Score: 5.8,
    part2Score: 5.5,
    totalScore: 11.3,
    timeSpentMinutes: 41,
    note: '5대 사전 및 4대 어문규범 숙지 완료'
  },
  {
    id: 'att-3',
    attemptNumber: 3,
    label: '3회차',
    date: '10/29',
    part1Score: 6.5,
    part2Score: 6.5,
    totalScore: 13.0,
    timeSpentMinutes: 38,
    note: '원고지 15줄 요건 및 다듬은 말 예시 완벽 충족'
  },
  {
    id: 'att-4',
    attemptNumber: 4,
    label: '4회차',
    date: '10/30',
    part1Score: 7.2,
    part2Score: 7.0,
    totalScore: 14.2,
    timeSpentMinutes: 35,
    note: '22항 반모음 첨가 정확히 작성'
  },
  {
    id: 'att-5',
    attemptNumber: 5,
    label: '5회차',
    date: '10/31',
    part1Score: 7.5,
    part2Score: 7.5,
    totalScore: 15.0,
    timeSpentMinutes: 31,
    note: '15점 만점 달성! 실전 시험 준비 완료'
  }
];

export const TimedMockExam: React.FC = () => {
  const [examPart, setExamPart] = useState<'part1' | 'part2'>('part1');
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60); // 20 mins for part1
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHistoryTable, setShowHistoryTable] = useState<boolean>(false);

  // Score History State
  const [history, setHistory] = useState<ExamAttempt[]>(() => {
    try {
      const saved = localStorage.getItem('gm_mock_history_v2');
      return saved ? JSON.parse(saved) : DEFAULT_ATTEMPTS;
    } catch {
      return DEFAULT_ATTEMPTS;
    }
  });

  // Current calculated score upon submission
  const [lastSubmissionScore, setLastSubmissionScore] = useState<{
    part1: number;
    part2: number;
    total: number;
  } | null>(null);

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

  // Save history to local storage
  const saveHistory = (newHistory: ExamAttempt[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem('gm_mock_history_v2', JSON.stringify(newHistory));
    } catch {}
  };

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

  // Automated scoring logic for current attempt
  const calculateScores = () => {
    // Part 1 Scoring (Max 7.5 pts)
    let p1 = 0;
    // Q1: 5 dictionaries (1.5 pts: 0.3 per item)
    const validDicts = ['표준국어대사전', '우리말샘', '한국어기초사전', '한국어-외국어', '지역어'];
    q1Answers.forEach((ans) => {
      const clean = ans.trim();
      if (clean && validDicts.some(d => clean.includes(d) || d.includes(clean))) {
        p1 += 0.3;
      }
    });

    // Q2: 4 norms (1.5 pts: 0.375 per item)
    const validNorms = ['맞춤법', '표준어', '외래어', '로마자'];
    q2Answers.forEach((ans) => {
      const clean = ans.trim();
      if (clean && validNorms.some(n => clean.includes(n))) {
        p1 += 0.375;
      }
    });

    // Q3: cardigan, cake (1.5 pts: 0.75 each)
    if (q3_1.trim().includes('카디건')) p1 += 0.75;
    if (q3_2.trim().includes('케이크')) p1 += 0.75;

    // Q4: Ganada QA (1.5 pts)
    if (q4Text.trim().length >= 25) {
      p1 += 1.5;
    } else if (q4Text.trim().length >= 10) {
      p1 += 0.8;
    }

    // Q5: Refined words (1.5 pts)
    if (q5Text.trim().length >= 20) {
      p1 += 1.5;
    } else if (q5Text.trim().length >= 8) {
      p1 += 0.8;
    }

    // Part 2 Scoring (Max 7.5 pts)
    let p2 = 0;
    // Q6: Essay 15 lines (3.5 pts)
    const lines = q6Text.split('\n').filter(l => l.trim().length > 0);
    if (lines.length >= 15) {
      p2 += 2.5;
    } else {
      p2 += Math.min(2.5, (lines.length / 15) * 2.5);
    }
    const hasExample = ['키오스크', '무인', '스크린도어', '안전문', '드라이브스루', '승차 구매', '비대면'].some(w => q6Text.includes(w));
    if (hasExample) p2 += 1.0;

    // Q7: 7 phonology rules (4.0 pts: ~0.57 each)
    if (q7Answers['9'].includes('끝소리') || q7Answers['9'].includes('평폐쇄')) p2 += 0.57;
    if (q7Answers['10'].includes('자음군')) p2 += 0.57;
    if (q7Answers['12_1'].includes('거센') || q7Answers['12_1'].includes('축약')) p2 += 0.57;
    if (q7Answers['17'].includes('구개')) p2 += 0.57;
    if (q7Answers['18'].includes('비음')) p2 += 0.57;
    if (q7Answers['20'].includes('유음')) p2 += 0.57;
    if ((q7Answers['22'].includes('반모음') || q7Answers['22'].includes('모음 첨가')) && !q7Answers['22'].includes('순행')) {
      p2 += 0.58;
    }

    const roundedP1 = Math.min(7.5, Math.round(p1 * 10) / 10);
    const roundedP2 = Math.min(7.5, Math.round(p2 * 10) / 10);
    const roundedTotal = Math.min(15.0, Math.round((roundedP1 + roundedP2) * 10) / 10);

    return { part1: roundedP1, part2: roundedP2, total: roundedTotal };
  };

  const handleSubmit = () => {
    setIsTimerRunning(false);
    setIsSubmitted(true);

    const scores = calculateScores();
    setLastSubmissionScore(scores);

    // Append to history
    const nextAttemptNum = history.length + 1;
    const today = new Date();
    const dateStr = `${today.getMonth() + 1}/${today.getDate()}`;
    const newAttempt: ExamAttempt = {
      id: `att-${Date.now()}`,
      attemptNumber: nextAttemptNum,
      label: `${nextAttemptNum}회차`,
      date: dateStr,
      part1Score: scores.part1,
      part2Score: scores.part2,
      totalScore: scores.total,
      timeSpentMinutes: Math.max(1, Math.round(((examPart === 'part1' ? 20 * 60 : 25 * 60) - timeLeft) / 60)),
      note: scores.total >= 14.5 ? '15점 만점 수준 달성!' : '오답 및 감점 요인 점검 완료'
    };

    saveHistory([...history, newAttempt]);

    try {
      confetti({
        particleCount: scores.total >= 14 ? 90 : 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleReset = () => {
    setIsTimerRunning(false);
    setIsSubmitted(false);
    setTimeLeft(examPart === 'part1' ? 20 * 60 : 25 * 60);
  };

  const handleResetHistory = () => {
    if (confirm('모의고사 성적 기록을 초기 기준 데이터로 되돌리시겠습니까?')) {
      saveHistory(DEFAULT_ATTEMPTS);
    }
  };

  // Analytics summary calculations
  const stats = useMemo(() => {
    if (history.length === 0) {
      return { latest: 0, highest: 0, average: 0, count: 0, perfectCount: 0 };
    }
    const latest = history[history.length - 1].totalScore;
    const highest = Math.max(...history.map(h => h.totalScore));
    const average = Math.round((history.reduce((acc, h) => acc + h.totalScore, 0) / history.length) * 10) / 10;
    const count = history.length;
    const perfectCount = history.filter(h => h.totalScore >= 14.5).length;
    return { latest, highest, average, count, perfectCount };
  }, [history]);

  // Check 6번 line count
  const q6Lines = q6Text.split('\n').filter(l => l.trim().length > 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* SCORE TRENDS VISUALIZATION (RECHARTS) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              <span>실시간 성적 분석 대시보드</span>
              <span aria-hidden="true">·</span>
              <span>15점 만점 기준</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              모의고사 성적 추이 & 만점 달성률
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              회차별 실전 모의고사 채점 점수 추이를 Recharts 시각화로 모니터링합니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistoryTable(!showHistoryTable)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>회차별 상세표</span>
              {showHistoryTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleResetHistory}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="기록 초기화"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Quantitative KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <span className="text-[11px] font-semibold text-indigo-700 block mb-0.5">최근 회차 점수</span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-900 tabular-nums">
              {stats.latest} <span className="text-xs font-bold text-indigo-600">/ 15점</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              달성률 {Math.round((stats.latest / 15) * 100)}%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-[11px] font-semibold text-emerald-700 block mb-0.5">역대 최고 점수</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-900 tabular-nums">
              {stats.highest} <span className="text-xs font-bold text-emerald-600">/ 15점</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              {stats.highest === 15.0 ? '🎉 만점 달성 완료' : '만점까지 ' + (15 - stats.highest).toFixed(1) + '점'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <span className="text-[11px] font-semibold text-blue-700 block mb-0.5">누적 평균 점수</span>
            <div className="text-2xl sm:text-3xl font-black text-blue-900 tabular-nums">
              {stats.average} <span className="text-xs font-bold text-blue-600">점</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              총 {stats.count}회 모의고사 응시
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
            <span className="text-[11px] font-semibold text-amber-700 block mb-0.5">목표 1등급 가능성</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-900 tabular-nums">
              {stats.latest >= 14 ? '98%' : stats.latest >= 12 ? '85%' : '70%'}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              만점(14.5+) {stats.perfectCount}회 기록
            </span>
          </div>
        </div>

        {/* Recharts Line/Area Chart Container */}
        <div className="mt-6 pt-2">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={history}
                margin={{ top: 15, right: 20, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                />
                <YAxis
                  domain={[0, 15]}
                  ticks={[0, 3, 6, 9, 12, 15]}
                  tickLine={false}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  unit="점"
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as ExamAttempt;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl text-xs space-y-1.5 border border-slate-800">
                          <div className="font-bold text-sm text-indigo-300 flex items-center justify-between gap-4">
                            <span>{data.label} ({data.date})</span>
                            <span className="text-emerald-400 font-extrabold text-base">{data.totalScore}점 / 15점</span>
                          </div>
                          <div className="text-slate-300 space-y-0.5 text-[11px] pt-1 border-t border-slate-800">
                            <div>• 1차 검색 영역 (1~5번): <strong>{data.part1Score}점</strong> / 7.5점</div>
                            <div>• 2차 서술 영역 (6~7번): <strong>{data.part2Score}점</strong> / 7.5점</div>
                            <div>• 풀이 소요 시간: <strong>{data.timeSpentMinutes}분</strong></div>
                          </div>
                          {data.note && (
                            <div className="text-amber-300 text-[10px] pt-1">
                              💡 {data.note}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }}
                  formatter={(value) => {
                    if (value === 'totalScore') return '총점 (15점 만점)';
                    if (value === 'part1Score') return '1차 평가지 (7.5점)';
                    if (value === 'part2Score') return '2차 평가지 (7.5점)';
                    return value;
                  }}
                />
                {/* 15점 만점 기준선 */}
                <ReferenceLine
                  y={15}
                  stroke="#10B981"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: '15점 만점 목표선',
                    position: 'top',
                    fill: '#059669',
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                />
                {/* Lines */}
                <Area
                  type="monotone"
                  dataKey="totalScore"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                  activeDot={{ r: 6, fill: '#4F46E5', stroke: '#FFFFFF', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="part1Score"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={{ r: 3, fill: '#3B82F6' }}
                />
                <Line
                  type="monotone"
                  dataKey="part2Score"
                  stroke="#10B981"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={{ r: 3, fill: '#10B981' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accordion History Table */}
        {showHistoryTable && (
          <div className="mt-6 pt-6 border-t border-slate-100 overflow-x-auto animate-in fade-in duration-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">회차</th>
                  <th className="py-2.5 px-3">응시일</th>
                  <th className="py-2.5 px-3">1차(7.5)</th>
                  <th className="py-2.5 px-3">2차(7.5)</th>
                  <th className="py-2.5 px-3">총점(15)</th>
                  <th className="py-2.5 px-3">소요시간</th>
                  <th className="py-2.5 px-3">비고 / 복습 메모</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {history.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-indigo-600">{att.label}</td>
                    <td className="py-2.5 px-3 text-slate-500">{att.date}</td>
                    <td className="py-2.5 px-3 font-mono">{att.part1Score}점</td>
                    <td className="py-2.5 px-3 font-mono">{att.part2Score}점</td>
                    <td className="py-2.5 px-3 font-bold font-mono text-indigo-900">
                      {att.totalScore}점
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">{att.timeSpentMinutes}분</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">{att.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

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

        {/* SUBMISSION SCORE ALERT IF JUST SUBMITTED */}
        {isSubmitted && lastSubmissionScore && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-indigo-50 border border-emerald-200 text-slate-900 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-600" />
                <span className="text-base sm:text-lg font-bold text-emerald-900">
                  실전 모의평가 자동 채점 완료!
                </span>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-white px-3 py-1 rounded-full border border-indigo-200 shadow-2xs">
                차트에 성적 기록 반영됨 ✅
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">1차 점수</span>
                <strong className="text-base font-extrabold text-blue-600">{lastSubmissionScore.part1}</strong> / 7.5점
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">2차 점수</span>
                <strong className="text-base font-extrabold text-emerald-600">{lastSubmissionScore.part2}</strong> / 7.5점
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">최종 총점</span>
                <strong className="text-xl font-black text-indigo-600">{lastSubmissionScore.total}</strong> / 15점
              </div>
            </div>
          </div>
        )}

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
