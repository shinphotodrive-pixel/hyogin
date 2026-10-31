import React from 'react';
import { X, Printer, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  QUESTION_1_DICTIONARIES,
  QUESTION_2_NORMS,
  QUESTION_3_LOANWORDS,
  QUESTION_4_GANADA_LIST,
  QUESTION_5_REFINED_WORDS,
  QUESTION_6_ESSAYS,
  QUESTION_7_RULES,
} from '../data/assessmentData';

interface FullCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FullCheatSheetModal: React.FC<FullCheatSheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-200 print:border-b-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>파주 금촌고 2학년 화법과 언어 국어 규범 탐구 (15점 만점)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              수행평가 1~7번 전 문항 15점 만점 정답 총정리
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              1차(1~5번 검색형) & 2차(6~7번 서술형) 모범 답안 한 장 요약본
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>인쇄 / PDF 저장</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-6 space-y-6 text-xs sm:text-sm text-slate-800">
          {/* 1번 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="font-bold text-blue-700 mb-1">
              [1번] 국립국어원 홈페이지 하단 [사전] 5가지 이름
            </div>
            <p className="font-medium text-slate-900 leading-relaxed">
              <strong>1. 표준국어대사전</strong> &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong>2. 우리말샘</strong> &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong>3. 한국어기초사전</strong> &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong>4. 한국어-외국어 학습사전</strong> &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong>5. 지역어 사전</strong>
            </p>
          </div>

          {/* 2번 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="font-bold text-blue-700 mb-1">
              [2번] [어문 규범] 4가지 규범 이름 (&lsquo;용례찾기&rsquo; 제외)
            </div>
            <p className="font-medium text-slate-900 leading-relaxed">
              <strong>1. 한글 맞춤법</strong> &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong>2. 표준어 규정</strong> &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong>3. 외래어 표기법</strong> &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong>4. 국어의 로마자 표기법</strong>
            </p>
          </div>

          {/* 3번 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="font-bold text-blue-700 mb-1">
              [3번] [어문 규범-용례 찾기] 올바른 외래어 표기
            </div>
            <p className="font-medium text-slate-900 leading-relaxed">
              ① cardigan: <strong>카디건</strong> (가디건 X) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              ② cake: <strong>케이크</strong> (케익 X)
            </p>
          </div>

          {/* 4번 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="font-bold text-blue-700 mb-1">
              [4번] [온라인 가나다] 품사(품사 통용) Q&A 모범 요약 (선생님 주의사항 준수)
            </div>
            <div className="text-xs space-y-1.5 leading-relaxed font-medium">
              <p>
                <strong>• 질문:</strong> &lsquo;노력한 만큼&rsquo;과 &lsquo;너만큼&rsquo;에서 &lsquo;만큼&rsquo;의 품사와 띄어쓰기는 어떻게 다른가요?
              </p>
              <p>
                <strong>• 국어원 답변:</strong> &lsquo;노력한 만큼&rsquo;의 &lsquo;만큼&rsquo;은 동사 &lsquo;노력하다&rsquo;의 관형사형의 수식을 받는 &lsquo;의존 명사&rsquo;이므로 한글 맞춤법 제42항에 따라 앞말과 띄어 씁니다. 반면 &lsquo;너만큼&rsquo;의 &lsquo;만큼&rsquo;은 대명사(체언) &lsquo;너&rsquo; 뒤에 붙어 정도를 뜻하는 &lsquo;보조사(조사)&rsquo;이므로 제41항에 따라 앞말에 붙여 씁니다. 따라서 &lsquo;만큼&rsquo;은 의존 명사와 조사로 쓰이는 품사 통용 단어입니다.
              </p>
            </div>
          </div>

          {/* 5번 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="font-bold text-blue-700 mb-1">
              [5번] [공공언어 개선 - 다듬은 말] 3개
            </div>
            <p className="font-medium text-slate-900 leading-relaxed text-xs">
              1. <strong>스크린도어 (screen door)</strong> -&gt; <strong>안전문 (승강장 안전문)</strong><br />
              2. <strong>키오스크 (kiosk)</strong> -&gt; <strong>무인 안내기 (무인 주문기)</strong><br />
              3. <strong>드라이브스루 (drive-through)</strong> -&gt; <strong>승차 구매 (승차 구매점)</strong>
            </p>
          </div>

          {/* 6번 */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
            <div className="font-bold text-emerald-800 mb-1">
              [6번] [글쓰기-원고지] 외래어 다듬기 찬성 논술 모범 답안 (16줄 구성, 감점 방지)
            </div>
            <div className="text-[11px] sm:text-xs font-sans text-slate-800 space-y-1 bg-white p-3 rounded-xl border border-emerald-100 leading-snug">
              {QUESTION_6_ESSAYS.agree.lines.map((l, i) => (
                <div key={i} className="flex gap-2">
                  <span className="w-5 text-emerald-600 font-mono text-[10px] text-right shrink-0">{i + 1}</span>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 7번 */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800">
            <div className="font-bold text-emerald-400 mb-2">
              [7번] 표준발음법 제4장·제5장 항별 구체적 음운 변동 명칭 (100% 암기 필수)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-800 rounded-lg">
                <span className="text-slate-400">제4장 9항:</span> <strong className="text-amber-300">음절의 끝소리 규칙 (평폐쇄음화)</strong> [교체]
              </div>
              <div className="p-2.5 bg-slate-800 rounded-lg">
                <span className="text-slate-400">제4장 10항:</span> <strong className="text-amber-300">자음군 단순화</strong> [탈락]
              </div>
              <div className="p-2.5 bg-slate-800 rounded-lg">
                <span className="text-slate-400">제4장 12항 1:</span> <strong className="text-amber-300">거센소리되기 (자음 축약)</strong> [축약]
              </div>
              <div className="p-2.5 bg-slate-800 rounded-lg">
                <span className="text-slate-400">제5장 17항:</span> <strong className="text-amber-300">구개음화</strong> [교체]
              </div>
              <div className="p-2.5 bg-slate-800 rounded-lg">
                <span className="text-slate-400">제5장 18항:</span> <strong className="text-amber-300">비음화 (자음 동화)</strong> [교체]
              </div>
              <div className="p-2.5 bg-slate-800 rounded-lg">
                <span className="text-slate-400">제5장 20항:</span> <strong className="text-amber-300">유음화 (자음 동화)</strong> [교체]
              </div>
              <div className="p-2.5 bg-slate-800 rounded-lg col-span-full border border-rose-500/50">
                <span className="text-rose-300 font-bold">제5장 22항 (주의):</span> <strong className="text-emerald-300 font-extrabold text-sm">반모음 첨가 (모음 첨가)</strong> [첨가]
                <span className="block text-[11px] text-slate-300 mt-0.5">*(&lsquo;ㅣ&rsquo;모음 순행 동화로 쓰지 말 것! 반드시 반모음 첨가로 적을 것)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-400 print:text-black">
          파주 금촌고등학교 2학년 화법과 언어 수행평가 15점 만점을 힘차게 응원합니다!
        </div>
      </div>
    </div>
  );
};
