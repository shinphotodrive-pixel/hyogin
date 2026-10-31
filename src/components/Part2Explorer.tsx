import React, { useState, useMemo } from 'react';
import { QUESTION_6_ESSAYS, QUESTION_7_RULES } from '../data/assessmentData';
import { PenTool, CheckCircle2, AlertTriangle, FileText, Sparkles, Copy, Check, RotateCcw } from 'lucide-react';

export const Part2Explorer: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'essay' | 'phonology'>('essay');
  const [selectedStance, setSelectedStance] = useState<'agree' | 'disagree'>('agree');
  const [customEssayText, setCustomEssayText] = useState<string>(
    QUESTION_6_ESSAYS.agree.lines.join('\n')
  );
  const [copied, setCopied] = useState<boolean>(false);

  // Switch stance template
  const handleStanceChange = (stance: 'agree' | 'disagree') => {
    setSelectedStance(stance);
    setCustomEssayText(QUESTION_6_ESSAYS[stance].lines.join('\n'));
  };

  // Line count and validation
  const essayLines = useMemo(() => {
    return customEssayText.split('\n').filter(line => line.trim().length > 0);
  }, [customEssayText]);

  const lineCount = essayLines.length;
  const isLineCountValid = lineCount >= 15;
  const charCount = customEssayText.length;

  const handleCopyEssay = () => {
    navigator.clipboard.writeText(customEssayText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-1">
              <span>2차 평가지 대비 (25분)</span>
              <span aria-hidden="true">·</span>
              <span>검색 기기 제출 후 서술형 작성</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              2차 평가지: 원고지 15줄 논술 & 표준발음법 음운 변동
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              기기 없이 직접 손글씨로 작성해야 하므로 모범 문장과 7개 항별 음운 변동 명칭을 철저히 암기해야 합니다.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveSubTab('essay')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeSubTab === 'essay'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              6번: 원고지 15줄 글쓰기
            </button>
            <button
              onClick={() => setActiveSubTab('phonology')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeSubTab === 'phonology'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              7번: 표준발음법 음운 변동
            </button>
          </div>
        </div>

        {/* Requirements Summary */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="font-bold text-slate-700">6번 채점 기준:</span>
          <span>찬반 의견 명시</span>
          <span aria-hidden="true">·</span>
          <span>타당한 근거 2가지</span>
          <span aria-hidden="true">·</span>
          <span>다듬은 말 예시 1개 이상</span>
          <span aria-hidden="true">·</span>
          <strong className="text-rose-600 font-bold">15줄 이상 분량 (미달 시 감점)</strong>
        </div>
      </div>

      {/* SUBTAB 1: ESSAY WRITING */}
      {activeSubTab === 'essay' && (
        <div className="space-y-6">
          {/* Stance Choice & Live Status */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">입장 선택:</span>
                <button
                  onClick={() => handleStanceChange('agree')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    selectedStance === 'agree'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  찬성 모범 답안 (권장)
                </button>
                <button
                  onClick={() => handleStanceChange('disagree')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    selectedStance === 'disagree'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  반대 / 신중 모범 답안
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEssay}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg whitespace-nowrap shrink-0 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>글 복사하기</span>
                </button>
              </div>
            </div>

            {/* Live Criteria Verification Box */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isLineCountValid ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <span>작성 분량 (15줄 이상)</span>
                <strong className="font-mono text-sm">{lineCount} / 15줄 {isLineCountValid ? '✅' : '❌'}</strong>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-between">
                <span>총 글자 수</span>
                <strong className="font-mono text-sm">{charCount}자</strong>
              </div>
              <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/50 text-emerald-900 flex items-center justify-between">
                <span>근거 2가지 제시</span>
                <strong>충족 완료 ✅</strong>
              </div>
              <div className="p-3 rounded-xl border border-indigo-100 bg-indigo-50/50 text-indigo-900 flex items-center justify-between">
                <span>다듬은 말 예시</span>
                <strong>{selectedStance === 'agree' ? '키오스크, 스크린도어' : '드라이브스루'}</strong>
              </div>
            </div>

            {/* Editable or Reviewable Lines */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  실제 원고지 줄별 내용 (직접 수정하며 연습 가능)
                </label>
                <span className="text-[11px] text-slate-400">
                  줄바꿈(Enter) 1번당 실제 원고지 1줄에 해당
                </span>
              </div>
              <textarea
                value={customEssayText}
                onChange={(e) => setCustomEssayText(e.target.value)}
                rows={17}
                className="w-full p-4 text-xs sm:text-sm font-sans leading-relaxed rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
              />
            </div>
          </div>

          {/* Simulated 20-box Manuscript Grid Preview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>시험 당일 배포되는 실제 원고지 양식 미리보기</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  학교 시험 원고지에 적힐 줄별 배치 상태를 미리 눈으로 확인해보세요.
                </p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                isLineCountValid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                현재 {lineCount}줄 {isLineCountValid ? '(15줄 요건 완벽 통과)' : '(분량 부족!)'}
              </span>
            </div>

            <div className="space-y-1.5 font-mono text-xs bg-amber-50/30 p-4 rounded-2xl border border-amber-200/60 max-h-[500px] overflow-y-auto">
              {essayLines.map((line, idx) => (
                <div key={idx} className="flex items-center gap-3 py-1 px-2 border-b border-amber-100">
                  <span className="text-[10px] font-mono text-amber-700 font-bold w-6 shrink-0 text-right">
                    {idx + 1}
                  </span>
                  <div className="flex-1 font-sans text-xs sm:text-sm font-medium text-slate-800 tracking-wide">
                    {line}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {line.length}자
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: PHONOLOGY RULES (표준발음법 제4장 & 제5장) */}
      {activeSubTab === 'phonology' && (
        <div className="space-y-6">
          {/* Important Instruction Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h4 className="text-lg font-bold text-slate-900">
              7번 문항: 표준발음법 제4장·제5장 중심 음운 변동 명칭
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              시험 문제 지시사항: <strong>&lsquo;교체/첨가/탈락/축약&rsquo; 안에 속하는 구체적인 음운 변동 명칭으로 적을 것</strong> (예: ㄴ첨가).<br />
              시험지 프린트에는 각 조항의 본문이 제공되므로, <strong>각 항의 핵심 내용과 매칭되는 정확한 공식 명칭</strong>을 외워야 합니다.
            </p>

            <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-rose-950 font-medium">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-800 font-bold block mb-0.5">
                  🚨 22항 안내문 특이사항 절대 준수!
                </strong>
                선생님 안내문에 <strong>&lsquo;22항: (&lsquo;ㅣ&rsquo;모음 순행 동화로 쓰지 말 것.)&rsquo;</strong>이라고 명확히 단서가 붙어 있습니다. 
                따라서 22항은 반드시 <strong>&lsquo;반모음 첨가&rsquo;</strong> 또는 <strong>&lsquo;모음 첨가&rsquo;</strong>로 작성해야 합니다!
              </div>
            </div>
          </div>

          {/* 7 Rules Cards */}
          <div className="space-y-4">
            {QUESTION_7_RULES.map((rule) => (
              <div key={rule.clause} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {rule.chapter}
                    </span>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {rule.clause}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {rule.clauseTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      대분류: <strong>{rule.majorType}</strong>
                    </span>
                    <span className="text-xs font-extrabold text-white bg-slate-900 px-3 py-1 rounded-lg">
                      정답 명칭: {rule.specificPhonologyName}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                  <strong className="text-slate-900 block mb-1">제공되는 조항 본문:</strong>
                  {rule.officialContent}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-slate-500">대표 발음 예시:</span>
                  {rule.examples.map((ex) => (
                    <span key={ex} className="bg-white border border-slate-200 px-2 py-0.5 rounded font-mono text-indigo-700 font-semibold">
                      {ex}
                    </span>
                  ))}
                </div>

                {rule.cautionNote && (
                  <p className="mt-2 text-xs text-amber-800 bg-amber-50/70 p-2 rounded-lg border border-amber-200/60">
                    💡 {rule.cautionNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
