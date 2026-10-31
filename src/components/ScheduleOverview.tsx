import React, { useState } from 'react';
import { ASSESSMENT_SCHEDULE } from '../data/assessmentData';
import { Calendar, AlertTriangle, Clock, Smartphone, FileText, CheckCircle2, Image as ImageIcon, ArrowRight, BookOpen } from 'lucide-react';

interface ScheduleOverviewProps {
  onGoToPart1: () => void;
  onGoToPart2: () => void;
  onOpenCheatSheet: () => void;
}

export const ScheduleOverview: React.FC<ScheduleOverviewProps> = ({
  onGoToPart1,
  onGoToPart2,
  onOpenCheatSheet,
}) => {
  const [showOriginalNotice, setShowOriginalNotice] = useState<boolean>(false);

  return (
    <div className="space-y-8">
      {/* Hero Notice Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
              <span>파주 금촌고등학교 2학년</span>
              <span aria-hidden="true">·</span>
              <span className="font-bold text-slate-700">화법과 언어 2학기 수행평가</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-600 font-bold">15점 만점</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              &lt;화법과 언어 수행평가 안내문&gt;<br className="hidden sm:inline" />
              국어 규범 탐구 완벽 대비 가이드
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-2xl">
              선생님께서 배포하신 공식 안내문에 기반한 실전 대비 시스템입니다. 
              <strong> 1차(1~5번 검색형 20분)</strong>와 <strong>2차(6~7번 서술형 25분)</strong>로 나뉘어 진행되므로 
              시간 배분과 필수 정답 조건을 미리 숙지해야 15점 만점을 받을 수 있습니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => setShowOriginalNotice(true)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all border border-indigo-200 whitespace-nowrap"
            >
              <ImageIcon className="w-4 h-4 text-indigo-600" />
              <span>선생님 원본 안내문 사진 보기</span>
            </button>
            <button
              onClick={onOpenCheatSheet}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all whitespace-nowrap shadow-xs"
            >
              <span>15점 만점 모범답안 요약본</span>
            </button>
          </div>
        </div>

        {/* Timetable & Class Breakdown */}
        <div className="mt-6">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            실시 학급 및 시간표 (11월 5일 목요일)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ASSESSMENT_SCHEDULE.classes.map((c) => (
              <div
                key={c.classNum}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"
              >
                <span className="text-xs font-bold text-indigo-600 bg-indigo-100/70 px-2 py-0.5 rounded">
                  {c.classNum}
                </span>
                <div className="text-base font-extrabold text-slate-900 mt-1">
                  {c.date}
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  {c.period}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Format Steps */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid md:grid-cols-2 gap-4">
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md">
                  1차 평가지 (1번~5번)
                </span>
                <span className="text-xs font-mono font-bold text-blue-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 20분 제한
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-1">
                스마트폰 활용 국립국어원 홈페이지 검색
              </h4>
              <ul className="text-xs text-slate-600 mt-2 space-y-1.5 leading-relaxed">
                <li>• 1번: 하단 [사전] 소개 5가지 사전 이름 작성</li>
                <li>• 2번: [어문 규범] 4가지 규범 쓰기 ('용례찾기' 제외)</li>
                <li>• 3번: [용례 찾기] 외래어 올바른 표기 (cardigan, cake)</li>
                <li>• 4번: [온라인 가나다] 품사(통용) 질문과 답변 정리</li>
                <li>• 5번: [공공언어 개선-다듬은 말] 외래어 다듬은 표현 3개</li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-200/60 flex items-center justify-between">
              <span className="text-[11px] text-blue-800 font-semibold">
                작성 완료 후 휴대폰·패드 즉시 전량 제출!
              </span>
              <button
                onClick={onGoToPart1}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                1차 내용 학습하기 <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                  2차 평가지 (6번~7번)
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 25분 제한
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-1">
                기기 제출 후 서술형 작성 (원고지 & 음운 변동)
              </h4>
              <ul className="text-xs text-slate-600 mt-2 space-y-1.5 leading-relaxed">
                <li>• 6번: [글쓰기-원고지] 외래어 다듬기 찬반 논술 (15줄 이상, 근거 2가지, 다듬은 말 예시 1개 이상 활용)</li>
                <li>• 7번: [표준발음법 제4장·제5장] 7개 항별 중심 음운 변동 명칭 (9항, 10항, 12항 1, 17항, 18항, 20항, 22항)</li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center justify-between">
              <span className="text-[11px] text-emerald-800 font-semibold">
                22항 주의: &lsquo;ㅣ모음 순행 동화&rsquo; 표기 금지!
              </span>
              <button
                onClick={onGoToPart2}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
              >
                2차 내용 학습하기 <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-rose-900">
            <span className="font-bold text-rose-800 block mb-0.5">
              ⚠️ 부정행위 엄격 규정 (안내문 필독 사항)
            </span>
            <p className="leading-relaxed">
              1차 평가지 작성 시 <strong>&lsquo;국립국어원 홈페이지&rsquo; 외 다른 사이트에 접속하거나 카톡, 캡처본, 메모 내용 등을 열람하는 경우 부정행위로 간주</strong>됩니다.
              따라서 안내문에 나온 핵심 정답과 검색 동선을 미리 확실하게 외워두고 들어가야 안전합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 7 Questions Summary Strip */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          평가 문항 1~7번 출제 영역 총정리
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { num: "1번", title: "국립국어원 5가지 사전", desc: "표준국어대사전, 우리말샘, 한국어기초사전, 한국어-외국어 학습사전, 지역어 사전" },
            { num: "2번", title: "어문 규범 4가지", desc: "한글 맞춤법, 표준어 규정, 외래어 표기법, 국어의 로마자 표기법 ('용례찾기' 제외)" },
            { num: "3번", title: "외래어 올바른 표기", desc: "cardigan -> 카디건, cake -> 케이크" },
            { num: "4번", title: "온라인 가나다 품사 통용", desc: "만큼/대로/뿐, 크다/밝다 등 구체적 문법 규정과 조항이 명시된 Q&A 정리" },
            { num: "5번", title: "공공언어 다듬은 말 3개", desc: "스크린도어(안전문), 키오스크(무인 안내기), 드라이브스루(승차 구매) 등" },
            { num: "6번", title: "원고지 찬반 논술", desc: "외래어 다듬기 찬반 + 근거 2가지 + 다듬은 말 예시 1개 + 15줄 이상" },
            { num: "7번", title: "표준발음법 음운 변동", desc: "9항, 10항, 12항 1, 17항, 18항, 20항, 22항 구체적 명칭 적기" },
          ].map((item) => (
            <div key={item.num} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {item.num}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1.5">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal to view original notice photo */}
      {showOriginalNotice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs"
          onClick={() => setShowOriginalNotice(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 border border-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-sm font-bold text-slate-900">
                선생님 배포 원본 안내문 사진
              </span>
              <button
                onClick={() => setShowOriginalNotice(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 px-2.5 py-1 rounded-lg bg-slate-100"
              >
                닫기
              </button>
            </div>
            <div className="mt-4 flex justify-center">
              <img
                src="/public/assets/aistudio/1793410258943_909a9550.jpg"
                alt="화법과 언어 수행평가 안내문 원본 사진"
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-md border border-slate-200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
