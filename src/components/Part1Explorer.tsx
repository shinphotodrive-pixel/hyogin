import React, { useState } from 'react';
import {
  QUESTION_1_DICTIONARIES,
  QUESTION_2_NORMS,
  QUESTION_3_LOANWORDS,
  QUESTION_4_GANADA_LIST,
  QUESTION_5_REFINED_WORDS,
} from '../data/assessmentData';
import { BookOpen, Check, Copy, CheckCircle2, HelpCircle, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

export const Part1Explorer: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loanwordAnswers, setLoanwordAnswers] = useState<Record<string, string>>({});
  const [selectedRefinedIds, setSelectedRefinedIds] = useState<string[]>([
    'screen-door',
    'kiosk',
    'drive-through',
  ]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleRefinedSelection = (id: string) => {
    if (selectedRefinedIds.includes(id)) {
      if (selectedRefinedIds.length > 3) {
        setSelectedRefinedIds(prev => prev.filter(i => i !== id));
      }
    } else {
      if (selectedRefinedIds.length < 3) {
        setSelectedRefinedIds(prev => [...prev, id]);
      } else {
        setSelectedRefinedIds(prev => [...prev.slice(1), id]);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Question Selector Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <span>1차 평가지 대비 (20분)</span>
              <span aria-hidden="true">·</span>
              <span>국립국어원 홈페이지 검색 활용</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              1차 평가지 문항별 모범 답안 & 핵심 정리
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              실제 시험지 1번부터 5번까지 정확한 국어원 공식 명칭과 서술 양식을 학습하세요.
            </p>
          </div>

          <div className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 whitespace-nowrap shrink-0">
            1번 ~ 5번 총 5문항
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6">
          {[
            { id: 1, label: "1번: 5대 사전", sub: "[사전] 메뉴" },
            { id: 2, label: "2번: 4대 어문규범", sub: "[어문 규범]" },
            { id: 3, label: "3번: 외래어 표기", sub: "cardigan, cake" },
            { id: 4, label: "4번: 온라인 가나다", sub: "품사 통용 Q&A" },
            { id: 5, label: "5번: 다듬은 말 3개", sub: "[공공언어 개선]" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveQuestion(tab.id)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                activeQuestion === tab.id
                  ? 'border-blue-600 bg-blue-50/70 shadow-sm text-blue-900'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="text-xs sm:text-sm font-bold line-clamp-1">{tab.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{tab.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* QUESTION 1: 5가지 사전 */}
      {activeQuestion === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                문항 1번 출제 지문
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-1">
                국립국어원 홈페이지 접속 - 하단의 [사전/언어정보/교육/어문 규범/수어·점자] 중 [사전]에서 소개하고 있는 5가지 사전의 이름을 쓰시오.
              </h4>
            </div>
            <button
              onClick={() => handleCopy('q1', QUESTION_1_DICTIONARIES.map(d => d.name).join(', '))}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg whitespace-nowrap shrink-0"
            >
              {copiedId === 'q1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>5가지 답안 복사</span>
            </button>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-900 font-semibold">
            🎯 <strong>시험지 작성 모범 답안 (정확한 5가지 명칭):</strong><br />
            1. 표준국어대사전 &nbsp;&nbsp; 2. 우리말샘 &nbsp;&nbsp; 3. 한국어기초사전 &nbsp;&nbsp; 4. 한국어-외국어 학습사전 &nbsp;&nbsp; 5. 지역어 사전
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUESTION_1_DICTIONARIES.map((dict, idx) => (
              <div key={dict.name} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                      {dict.badge}
                    </span>
                  </div>
                  <h5 className="text-base font-extrabold text-slate-900">{dict.name}</h5>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{dict.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] text-slate-400 font-mono">
                  {dict.urlPath}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 2: 4가지 어문 규범 */}
      {activeQuestion === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                문항 2번 출제 지문
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-1">
                [국립국어원 홈페이지-어문 규범]에서 제시하는 어문 규범 4가지가 무엇인지 쓰시오. (&lsquo;용례찾기&rsquo; 제외)
              </h4>
            </div>
            <button
              onClick={() => handleCopy('q2', QUESTION_2_NORMS.map(n => n.name).join(', '))}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg whitespace-nowrap shrink-0"
            >
              {copiedId === 'q2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>4대 규범 복사</span>
            </button>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-900 font-semibold">
            🎯 <strong>시험지 작성 모범 답안 (어문 규범 4대 명칭):</strong><br />
            1. 한글 맞춤법 &nbsp;&nbsp; 2. 표준어 규정 &nbsp;&nbsp; 3. 외래어 표기법 &nbsp;&nbsp; 4. 국어의 로마자 표기법
            <span className="block text-xs font-normal text-emerald-700 mt-1">
              *주의: 메뉴의 &lsquo;용례찾기&rsquo;는 규범 본문이 아닌 검색 도구이므로 제외해야 정답입니다!
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {QUESTION_2_NORMS.map((norm, idx) => (
              <div key={norm.name} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-extrabold text-slate-900">{norm.name}</span>
                  <span className="text-[11px] font-medium text-slate-400">{norm.proclaimedYear}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{norm.description}</p>
                <div className="text-xs text-indigo-700 bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100 font-medium">
                  <strong>핵심 원칙:</strong> {norm.coreRule}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 3: 외래어 표기 cardigan, cake */}
      {activeQuestion === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                문항 3번 출제 지문
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-1">
                [어문 규범-용례 찾기]를 활용하여 다음 단어의 올바른 외래어 표기를 적으시오.
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                ① cardigan &nbsp;&nbsp;&nbsp; ② cake
              </p>
            </div>
          </div>

          {/* Core Target Words */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Cardigan */}
            <div className="p-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50/40">
              <span className="text-xs font-mono font-bold text-indigo-600 block mb-1">
                ① cardigan
              </span>
              <div className="text-3xl font-black text-slate-900">
                정답: <span className="text-indigo-600 underline">카디건</span>
              </div>
              <div className="mt-3 text-xs text-rose-600 font-semibold flex items-center gap-1.5">
                <span>❌ 오답 함정:</span>
                <span className="line-through text-slate-400">가디건</span>,
                <span className="line-through text-slate-400">카디간</span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                외래어 표기법 원칙상 영어 [k]는 거센소리 &lsquo;ㅋ&rsquo;으로 적으며 [dɪ]는 &lsquo;디&rsquo;로 표기합니다.
              </p>
            </div>

            {/* Cake */}
            <div className="p-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50/40">
              <span className="text-xs font-mono font-bold text-indigo-600 block mb-1">
                ② cake
              </span>
              <div className="text-3xl font-black text-slate-900">
                정답: <span className="text-indigo-600 underline">케이크</span>
              </div>
              <div className="mt-3 text-xs text-rose-600 font-semibold flex items-center gap-1.5">
                <span>❌ 오답 함정:</span>
                <span className="line-through text-slate-400">케익</span>,
                <span className="line-through text-slate-400">케잌</span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                어말의 무성 파열음 [k] 뒤에 모음 &lsquo;으&rsquo;를 붙여 적는 규칙에 따라 3음절인 &lsquo;케이크&rsquo;로 적습니다.
              </p>
            </div>
          </div>

          {/* Bonus Frequent Exam Loanwords */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              함께 자주 출제되는 고2 킬러 외래어 표기 보너스
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {QUESTION_3_LOANWORDS.slice(2).map((item) => (
                <div key={item.english} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                  <span className="text-[11px] text-slate-400 block">{item.english}</span>
                  <div className="text-sm font-bold text-indigo-700 mt-0.5">
                    {item.correct} <span className="text-slate-400 font-normal text-xs line-through">({item.wrong.join(', ')})</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{item.ruleTip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QUESTION 4: 온라인 가나다 품사 통용 Q&A */}
      {activeQuestion === 4 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                문항 4번 출제 지문 & 엄격한 채점 기준
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-1">
                한 개의 품사(또는 품사 통용)를 정하고, 그 품사에 대해 궁금했던 내용을 국립국어원 홈페이지의 [국어 상담-온라인 가나다]에서 검색하여 찾아본 후 질문과 답변 내용을 정리하여 적으시오.
              </h4>
            </div>
          </div>

          {/* Teacher's Strict Warning */}
          <div className="p-4 bg-amber-50 border border-amber-300/80 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-amber-950">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-800 font-bold block mb-1">
                선생님 안내문 경고 조항 (절대 감점 주의!):
              </strong>
              <span>
                &ldquo;&lsquo;예/아니오&rsquo; 답변이나 &lsquo;학교에서 배우신 내용과 국어 문법서의 내용을 기준으로 하시기 바랍니다.&rsquo;와 같은 내용은 정리 안 됨.&rdquo;<br />
                -&gt; <strong>반드시 구체적인 어문 규범 조항과 문법적 판별 원리(관형어 수식, 체언 결합, -ㄴ다 어미 등)가 포함된 알찬 상담 글을 적어야 만점입니다!</strong>
              </span>
            </div>
          </div>

          {/* Pre-packaged High-scoring Q&A Options */}
          <div className="space-y-4">
            {QUESTION_4_GANADA_LIST.map((qa) => (
              <div key={qa.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
                      {qa.category}
                    </span>
                    <h5 className="text-base font-bold text-slate-900 mt-1">{qa.title}</h5>
                  </div>
                  <button
                    onClick={() => handleCopy(qa.id, `[질문 내용]\n${qa.questionText}\n\n[답변 내용]\n${qa.fullAnswer}`)}
                    className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg whitespace-nowrap shrink-0 transition-colors"
                  >
                    {copiedId === qa.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>이 Q&A 모범답안 복사</span>
                  </button>
                </div>

                <div className="mt-3 text-xs sm:text-sm space-y-2">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <strong className="text-indigo-600 font-bold block mb-1">내가 작성할 [질문 내용]:</strong>
                    <p className="text-slate-800 font-medium">{qa.questionText}</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <strong className="text-emerald-700 font-bold block mb-1">정리하여 적을 [답변 내용]:</strong>
                    <p className="text-slate-700 whitespace-pre-line leading-relaxed font-sans text-xs">
                      {qa.fullAnswer}
                    </p>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-emerald-800 font-semibold bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                  {qa.scoringCheck}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 5: 다듬은 말 3개 */}
      {activeQuestion === 5 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                문항 5번 출제 지문
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-1">
                국립국어원 홈페이지 [공공언어 개선]에서 [다듬은 말]을 클릭하여 일상생활 속에서 자주 쓰이는 외래어를 어떤 표현으로 다듬었는지 검색하여 적으시오. (3개)
              </h4>
            </div>
            <button
              onClick={() => {
                const text = selectedRefinedIds
                  .map((id, i) => {
                    const item = QUESTION_5_REFINED_WORDS.find(w => w.id === id);
                    return item ? `${i + 1}. ${item.original} -> ${item.refined} (${item.whyChosen})` : '';
                  })
                  .join('\n');
                handleCopy('q5', text);
              }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg whitespace-nowrap shrink-0"
            >
              {copiedId === 'q5' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>선택한 3개 답안 복사</span>
            </button>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-900 font-semibold">
            💡 <strong>6번 원고지 논술과 직결되는 핵심 문항!</strong><br />
            여기서 선택한 다듬은 말 중 1개 이상을 <strong>6번 원고지 글쓰기(15줄 찬반 논술)</strong>의 근거 예시로 반드시 활용해야 합니다. 아래 추천 6선 중 마음에 드는 3개를 클릭하여 선택해 보세요.
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUESTION_5_REFINED_WORDS.map((word) => {
              const isSelected = selectedRefinedIds.includes(word.id);
              return (
                <div
                  key={word.id}
                  onClick={() => toggleRefinedSelection(word.id)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">{word.usageContext}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      isSelected ? 'bg-blue-600 text-white font-bold' : 'border border-slate-300 text-transparent'
                    }`}>
                      ✓
                    </span>
                  </div>

                  <div className="mt-1">
                    <div className="text-xs text-slate-400 font-medium">원래 외래어</div>
                    <div className="text-base font-bold text-slate-700">{word.original}</div>
                  </div>

                  <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200">
                    <div className="text-xs font-bold text-blue-600">다듬은 우리말 표현</div>
                    <div className="text-lg font-black text-blue-700 mt-0.5">{word.refined}</div>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    <strong>선정 이유:</strong> {word.whyChosen}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
