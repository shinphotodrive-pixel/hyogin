import React, { useState } from 'react';
import { CORE_FORMULAS, POS_SYSTEM } from '../data/grammarData';
import { BookOpen, Check, Layers, Lightbulb, ChevronRight, ArrowRight } from 'lucide-react';

interface ConceptSectionProps {
  onGoToSimulator: () => void;
  onGoToCases: () => void;
}

export const ConceptSection: React.FC<ConceptSectionProps> = ({ onGoToSimulator, onGoToCases }) => {
  const [activeFormulaId, setActiveFormulaId] = useState<number>(1);
  const [selectedPosFunction, setSelectedPosFunction] = useState<string>('체언 (體言)');

  const currentFormula = CORE_FORMULAS.find(f => f.id === activeFormulaId) || CORE_FORMULAS[0];
  const activePosGroup = POS_SYSTEM.find(p => p.functionName === selectedPosFunction) || POS_SYSTEM[0];

  return (
    <div className="space-y-10">
      {/* Hero Intro Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
            <span>파주 금촌고 2학년 막내를 위한 맞춤 학습 가이드</span>
            <span aria-hidden="true">·</span>
            <span>국어 1등급 달성 비법</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            품사 통용(品詞通用),<br />
            원리와 공식만 알면 절대 헷갈리지 않습니다
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            <strong>품사 통용</strong>이란 형태가 완전히 동일한 한 단어가 문맥이나 문장 성분상 기능에 따라 <strong>둘 이상의 품사</strong>로 인정되어 사전에 각각 등재되는 현상입니다.
            수능 &lsquo;언어와 매체&rsquo; 및 내신 문법에서 오답률 Top 3를 다투는 영역이므로, 단순 암기가 아닌 <strong>4대 판별 공식</strong>을 통해 확실한 구별 기준을 세워야 합니다.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onGoToSimulator}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>실시간 판별 실험실 시작</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGoToCases}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all whitespace-nowrap shrink-0"
            >
              빈출 사례 20선 확인
            </button>
          </div>
        </div>
      </section>

      {/* 4대 핵심 판별 공식 */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900">수능·내신 4대 판별 치트키 공식</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              문장 속 단어의 품사를 3초 만에 꿰뚫는 실전 적용 판별법입니다.
            </p>
          </div>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
            핵심 공식 4선
          </span>
        </div>

        {/* Formula Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-6">
          {CORE_FORMULAS.map((formula) => (
            <button
              key={formula.id}
              onClick={() => setActiveFormulaId(formula.id)}
              className={`p-3.5 text-left rounded-2xl border transition-all ${
                activeFormulaId === formula.id
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-mono font-bold ${
                  activeFormulaId === formula.id ? 'text-indigo-600' : 'text-slate-400'
                }`}>
                  공식 {formula.num}
                </span>
                {activeFormulaId === formula.id && (
                  <Check className="w-3.5 h-3.5 text-indigo-600" />
                )}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                {formula.title}
              </div>
              <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                {formula.summary}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Formula Details */}
        <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-base mb-2">
            <Lightbulb className="w-5 h-5 text-indigo-500 shrink-0" />
            <span>공식 {currentFormula.num}. {currentFormula.title}</span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-6 font-medium">
            {currentFormula.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="font-bold text-indigo-700 block mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                적용 사례 A
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">
                {currentFormula.goodExample}
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                적용 사례 B (상반 문맥)
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">
                {currentFormula.badExample}
              </p>
            </div>
          </div>

          <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
            <span className="font-bold shrink-0 text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
              1등급 팁
            </span>
            <span className="font-medium leading-relaxed">{currentFormula.tip}</span>
          </div>
        </div>
      </section>

      {/* 국어 9품사 5기능 체계도 */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>국어 9품사 5기능 체계도</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              품사 통용을 완전히 정복하기 위해서는 9품사가 각각 어떤 기능(문장 성분)에 속하는지 기본기를 확립해야 합니다.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            기능(기능/형태/의미) 기준 분류
          </span>
        </div>

        {/* 5 Functions Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {POS_SYSTEM.map((group) => (
            <button
              key={group.functionName}
              onClick={() => setSelectedPosFunction(group.functionName)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedPosFunction === group.functionName
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {group.functionName}
            </button>
          ))}
        </div>

        {/* Active POS details */}
        <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="mb-4">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              기능 정의
            </span>
            <h4 className="text-lg font-bold text-slate-900 mt-0.5">
              {activePosGroup.functionName}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {activePosGroup.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {activePosGroup.posList.map((pos) => (
              <div key={pos.name} className="p-4 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                    {pos.name}
                  </span>
                  <BookOpen className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  {pos.desc}
                </p>
                <div className="text-xs font-mono bg-slate-50 p-2 rounded border border-slate-100 text-indigo-600 font-semibold">
                  예: {pos.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
