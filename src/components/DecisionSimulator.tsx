import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, HelpCircle } from 'lucide-react';

interface PreSetCase {
  id: string;
  word: string;
  sentence: string;
  step1Question: string;
  step1Hint: string;
  step2Question: string;
  step2Hint: string;
  resultPos: string;
  resultReason: string;
  contrastSentence: string;
  contrastPos: string;
}

const PRESET_CASES: PreSetCase[] = [
  {
    id: 'm1',
    word: '만큼',
    sentence: '노력한 만큼 좋은 결실을 얻을 수 있다.',
    step1Question: "앞말 '노력한'의 형태와 띄어쓰기는 어떤가요?",
    step1Hint: "동사 '노력하다'의 관형사형(어미 -(으)ㄴ) 뒤에 띄어 썼습니다.",
    step2Question: "뒤에 격조사(+이/가/을/를)가 결합할 수 있나요?",
    step2Hint: "'노력한 만큼을 바라다'처럼 조사가 결합할 수 있습니다.",
    resultPos: '의존 명사',
    resultReason: "관형어 '노력한'의 꾸밈을 받고 문맥상 조사가 결합할 수 있는 자립성이 낮은 체언이므로 의존 명사입니다.",
    contrastSentence: '나만큼 키가 큰 사람도 없다.',
    contrastPos: '조사 (대명사 뒤에 붙여 씀)'
  },
  {
    id: 'm2',
    word: '큰다',
    sentence: '우리 집 화분의 나무가 하루가 다르게 쑥쑥 큰다.',
    step1Question: "기본형 '크다'에 현재 시제 어미 '-ㄴ다'가 붙었나요?",
    step1Hint: "네, '크-' + '-ㄴ다' 형태로 현재의 성장/진행 작용을 나타냅니다.",
    step2Question: "'자라다'라는 동작/작용인가요, 단순히 길이가 긴 상태인가요?",
    step2Hint: "동식물이 자라는 능동적인 작용과 과정입니다.",
    resultPos: '동사',
    resultReason: "현재 시제 선어말 어미 '-ㄴ다'가 붙어 '자라다'라는 작용의 과정을 나타내므로 동사입니다.",
    contrastSentence: '이 신발은 내 발에 너무 크다.',
    contrastPos: '형용사 (단순 치수 상태, *신발이 큰다 불가)'
  },
  {
    id: 'm3',
    word: '오늘',
    sentence: '오늘은 금촌고 2학년 국어 시험 1등급을 준비하는 날이다.',
    step1Question: "단어 뒤에 보조사 '은'이 결합되어 있나요?",
    step1Hint: "'오늘' 뒤에 보조사 '은'이 결합하여 문장의 주어로 기능합니다.",
    step2Question: "격조사(+이/가/을/를)로 교체해도 자연스럽나요?",
    step2Hint: "'오늘이(주격) 즐겁다', '오늘을(목적격) 기다렸다' 모두 자연스럽습니다.",
    resultPos: '명사 (체언)',
    resultReason: "조사와 자유롭게 결합하여 문장의 주어 역할을 하므로 체언인 명사입니다.",
    contrastSentence: '우리 오늘 학교 끝나고 분식집 가자.',
    contrastPos: '부사 (조사 없이 서술어 꾸밈)'
  },
  {
    id: 'm4',
    word: '같이',
    sentence: '얼음같이 차가운 겨울바람이 불어온다.',
    step1Question: "앞말 '얼음'과 띄어 썼나요, 붙여 썼나요?",
    step1Hint: "명사 '얼음' 뒤에 띄어쓰기 없이 바로 붙여 썼습니다.",
    step2Question: "문맥상 '~처럼 / ~와 비슷하게'의 뜻으로 쓰였나요?",
    step2Hint: "체언 뒤에 붙어 앞말이 보이는 전형적인 특징을 비유적으로 나타냅니다.",
    resultPos: '격조사 (부사격 조사)',
    resultReason: "체언 '얼음' 뒤에 결합하여 자립성 없이 앞말과 체언을 이어주는 격조사입니다.",
    contrastSentence: '친구와 같이 시험 준비를 했다.',
    contrastPos: "부사 ('함께'의 뜻으로 독립 사용)"
  },
  {
    id: 'm5',
    word: '다섯',
    sentence: '독서실에 다섯 사람이 모여서 공부했다.',
    step1Question: "뒤에 격조사나 보조사가 붙어 있나요?",
    step1Hint: "조사가 전혀 붙어 있지 않고 뒤에 명사 '사람'이 이어집니다.",
    step2Question: "뒤에 오는 체언(명사) '사람'을 수식하고 있나요?",
    step2Hint: "수량을 한정하여 뒤의 명사를 직접 꾸며주는 수식언의 역할을 합니다.",
    resultPos: '수 관형사',
    resultReason: "조사와 결합하지 않고 체언 바로 앞에서 수량을 지정하며 꾸며주므로 관형사입니다.",
    contrastSentence: '우리 조원 다섯이 함께 만점을 받았다.',
    contrastPos: "수사 (주격조사 '이' 결합)"
  }
];

export const DecisionSimulator: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('m1');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const activeCase = PRESET_CASES.find(c => c.id === selectedCaseId) || PRESET_CASES[0];

  const handleCaseChange = (id: string) => {
    setSelectedCaseId(id);
    setCurrentStep(1);
    setShowAnswer(false);
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowAnswer(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setShowAnswer(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>실시간 판별 알고리즘</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            3단계 인터랙티브 품사 판별 시뮬레이터
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            수능·내신 킬러 문맥을 선택하고, 국어 문법 판별 공식에 따라 단계별로 검증해보세요.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          처음부터 다시
        </button>
      </div>

      {/* Case Selector Tabs */}
      <div className="mt-6">
        <label className="text-xs font-semibold text-slate-500 block mb-2">
          검증할 빈출 단어 문맥 선택:
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCaseChange(c.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCaseId === c.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c.word} 판별
            </button>
          ))}
        </div>
      </div>

      {/* Target Sentence Box */}
      <div className="mt-6 p-5 bg-indigo-50/50 rounded-xl border border-indigo-100">
        <div className="text-xs font-medium text-indigo-600 mb-1">분석 대상 예문</div>
        <div className="text-lg font-bold text-slate-900 tracking-tight">
          {activeCase.sentence.split(activeCase.word).map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="underline decoration-indigo-500 decoration-4 underline-offset-4 text-indigo-700 font-extrabold bg-indigo-100/70 px-1.5 py-0.5 rounded">
                  {activeCase.word}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step by Step Flow */}
      <div className="mt-6 space-y-4">
        {/* Step 1 */}
        <div className={`p-4 rounded-xl border transition-all ${
          currentStep >= 1 ? 'border-indigo-200 bg-white' : 'border-slate-100 bg-slate-50 opacity-60'
        }`}>
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0 mt-0.5">
              1
            </span>
            <div className="flex-1">
              <div className="text-xs font-semibold text-indigo-600">STEP 1. 결합 구조 & 띄어쓰기 판별</div>
              <p className="text-sm font-semibold text-slate-800 mt-1">
                {activeCase.step1Question}
              </p>
              <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                <span><strong>문법 검증:</strong> {activeCase.step1Hint}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        {currentStep >= 2 && (
          <div className="p-4 rounded-xl border border-indigo-200 bg-white transition-all">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0 mt-0.5">
                2
              </span>
              <div className="flex-1">
                <div className="text-xs font-semibold text-indigo-600">STEP 2. 문장 성분 & 수식 대상 확인</div>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {activeCase.step2Question}
                </p>
                <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span><strong>문법 검증:</strong> {activeCase.step2Hint}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      {!showAnswer && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNextStep}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <span>{currentStep === 1 ? '다음 단계 판별하기' : '최종 품사 판정 확인'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Final Verdict Box */}
      {showAnswer && (
        <div className="mt-6 p-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 transition-all">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>최종 품사 판정 결과:</span>
              <span className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-base font-extrabold tracking-wide">
                {activeCase.resultPos}
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md whitespace-nowrap shrink-0">
              판정 완료
            </span>
          </div>

          <p className="mt-3 text-sm text-slate-700 leading-relaxed font-medium">
            {activeCase.resultReason}
          </p>

          {/* Contrast Example */}
          <div className="mt-4 pt-4 border-t border-emerald-200/60 grid sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-emerald-100">
              <span className="font-bold text-slate-500 block mb-1">비교 문맥 (상반 품사):</span>
              <p className="text-slate-900 font-semibold">{activeCase.contrastSentence}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-emerald-100">
              <span className="font-bold text-slate-500 block mb-1">상반 품사 판정:</span>
              <p className="text-indigo-600 font-bold">{activeCase.contrastPos}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
