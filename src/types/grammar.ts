export type GrammarCategory = 
  | 'all'
  | 'noun-particle' // 의존 명사 vs 조사
  | 'verb-adj'       // 동사 vs 형용사
  | 'noun-adv'       // 명사 vs 부사
  | 'num-det'        // 수사 vs 관형사
  | 'pron-det'       // 대명사 vs 관형사
  | 'excl-adv-other'; // 감탄사 vs 부사/형용사

export interface WordUsageDetail {
  pos: string; // 품사 명칭 (e.g., '의존 명사', '조사')
  definition: string; // 문법적 특성 및 정의
  keyCondition: string; // 판별 조건 (e.g., '관형어의 수식을 받음', '체언에 바로 붙음')
  example: string; // 예문
  highlight: string; // 강조 단어
  explanation: string; // 상세 분석
}

export interface GrammarWord {
  id: string;
  word: string;
  types: string[];
  category: GrammarCategory;
  categoryLabel: string;
  distinctionRule: string; // 핵심 구분 규칙
  usages: [WordUsageDetail, WordUsageDetail]; // 대립하는 두 품사 사용례
  examTip: string; // 수능/내신 출제 포인트 및 킬러 함정
  frequency: '최다 빈출' | '고난도 킬러' | '내신 필수';
  cardColor: string; // 테마 컬러
}

export interface QuizQuestion {
  id: number;
  category: GrammarCategory;
  sentence: string; // 밑줄이나 하이라이트 포함 문장
  targetWord: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  distinctionFormula: string; // 적용된 공식
  difficulty: '기초' | '중간' | '고난도';
}

export interface UserQuizRecord {
  questionId: number;
  userAnswer: number;
  isCorrect: boolean;
  timestamp: number;
}
