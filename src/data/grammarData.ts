import { GrammarWord, QuizQuestion } from '../types/grammar';

export const GRAMMAR_WORDS: GrammarWord[] = [
  {
    id: 'mankeum',
    word: '만큼',
    types: ['의존 명사', '조사'],
    category: 'noun-particle',
    categoryLabel: '의존 명사 vs 조사',
    distinctionRule: '앞말이 용언의 관형사형(어미 -(으)ㄴ, -는, -(으)ㄹ, -던)이면 띄어쓰는 의존 명사, 체언(명사·대명사) 뒤에 바로 붙으면 조사!',
    usages: [
      {
        pos: '의존 명사',
        definition: '앞의 말이 나타내는 수량이나 정도에 다다름을 나타내는 말. 관형어의 수식을 받으며 띄어 씀.',
        keyCondition: '관형사형 어미 뒤 (띄어쓰기 함)',
        example: '노력한 만큼 좋은 결실을 얻을 수 있다.',
        highlight: '만큼',
        explanation: "'노력한'은 동사 '노력하다'의 관형사형(관형어)이므로, 뒤의 '만큼'은 관형어의 수식을 받는 의존 명사입니다."
      },
      {
        pos: '조사',
        definition: '체언 뒤에 붙어 앞말과 비슷한 정도나 한도를 나타내는 격조사/보조사.',
        keyCondition: '체언 뒤 (붙여쓰기 함)',
        example: '너만큼 키가 큰 사람도 드물 것이다.',
        highlight: '너만큼',
        explanation: "'너'는 대명사(체언)이므로 바로 뒤에 붙은 '만큼'은 보조사(조사)입니다."
      }
    ],
    examTip: '수능 1순위 빈출! 띄어쓰기 문제와 직결됩니다. "먹을만큼(X) -> 먹을 만큼(O)", "나 만큼(X) -> 나만큼(O)"',
    frequency: '최다 빈출',
    cardColor: 'blue'
  },
  {
    id: 'gachi',
    word: '같이',
    types: ['부사', '조사'],
    category: 'excl-adv-other',
    categoryLabel: '부사 vs 조사',
    distinctionRule: "'함께'의 뜻으로 문장 내에서 독립적으로 쓰이거나 용언을 꾸미면 부사, 체언 뒤에 딱 붙어 '~처럼'의 뜻을 가지면 격조사!",
    usages: [
      {
        pos: '부사',
        definition: "'함께' 또는 '다름이 없이'라는 뜻으로 독립적으로 쓰이거나 용언을 수식함.",
        keyCondition: '독립 사용, 서술어 수식 (띄어씀)',
        example: '우리 모두 다 같이 힘을 합쳐 문제를 풀자.',
        highlight: '같이',
        explanation: "'함께'라는 뜻으로 부사어 역할을 하며, 뒤의 '힘을 합쳐'를 수식하는 독립된 부사입니다."
      },
      {
        pos: '조사',
        definition: '체언 뒤에 붙어서 앞말이 보이는 전형적인 특징과 같음을 나타내는 격조사.',
        keyCondition: '체언 바로 뒤 (붙여씀)',
        example: '얼음같이 차가운 겨울바람이 불어온다.',
        highlight: '얼음같이',
        explanation: "'얼음'이라는 명사 뒤에 바로 붙어 '~처럼'의 뜻을 더하는 격조사입니다."
      }
    ],
    examTip: "'얼음같이'는 붙여 쓰고, '친구와 같이'는 띄어 씁니다. 형용사 '같다'의 부사형과 헷갈리지 않도록 주의!",
    frequency: '최다 빈출',
    cardColor: 'indigo'
  },
  {
    id: 'keuda',
    word: '크다',
    types: ['동사', '형용사'],
    category: 'verb-adj',
    categoryLabel: '동사 vs 형용사',
    distinctionRule: "현재 시제 선어말 어미 '-ㄴ다/-는다'가 붙어 자라나는 진행/작용이면 동사, 결합할 수 없고 상태나 크기 자체를 나타내면 형용사!",
    usages: [
      {
        pos: '동사',
        definition: '동식물이 자라다, 세력이나 지위가 높아지다 등의 작용과 과정을 나타냄.',
        keyCondition: "'-ㄴ다' 결합 가능 (큰다)",
        example: '우리 집 화분의 나무가 하루가 다르게 쑥쑥 큰다.',
        highlight: '큰다',
        explanation: "'자라다'라는 진행/성장의 동작 및 작용을 의미하며 '큰다'처럼 '-ㄴ다'가 자연스럽게 붙으므로 동사입니다."
      },
      {
        pos: '형용사',
        definition: '길이나 넓이, 부피 등이 기준보다 더한 상태를 나타냄.',
        keyCondition: "'-ㄴ다' 결합 불가 (단순 상태)",
        example: '동생에게 이 겨울 외투는 아직 너무 크다.',
        highlight: '크다',
        explanation: "옷의 치수나 부피 상태를 나타내며 '크고 있다'의 작용이 아니므로 형용사입니다. (*이 외투가 지금 큰다 -> 어색함)"
      }
    ],
    examTip: "동사/형용사 판별 3종 세트: 1) '-ㄴ다/-는다' 가능 여부, 2) 명령형 '-아라/어라' 가능 여부, 3) 청유형 '-자' 가능 여부!",
    frequency: '최다 빈출',
    cardColor: 'emerald'
  },
  {
    id: 'oneul',
    word: '오늘',
    types: ['명사', '부사'],
    category: 'noun-adv',
    categoryLabel: '명사 vs 부사',
    distinctionRule: "뒤에 격조사나 보조사가 붙어 주어나 목적어 등의 문장 성분이 되면 명사, 조사 없이 용언(서술어)을 직접 꾸미면 부사!",
    usages: [
      {
        pos: '명사',
        definition: '지금 지나가고 있는 이날을 뜻하는 체언으로, 조사가 붙을 수 있음.',
        keyCondition: '조사 결합 가능',
        example: '오늘은 금촌고 국어 시험 1등급을 준비하는 날이다.',
        highlight: '오늘은',
        explanation: "보조사 '은'이 붙어 문장의 주어 역할을 하고 있으므로 명사입니다."
      },
      {
        pos: '부사',
        definition: '지금 지나가고 있는 이날에 직접 동작이나 사건이 일어남을 수식하는 말.',
        keyCondition: '조사 없이 용언 수식',
        example: '선생님께서 우리에게 오늘 떠나라고 말씀하셨다.',
        highlight: '오늘',
        explanation: "조사 없이 서술어 '떠나라'를 직접 꾸며주고 있으므로 부사입니다."
      }
    ],
    examTip: "'오늘, 내일, 하루, 어제, 아침' 등 시간 표현 단어들은 조사 결합 여부로 명사와 부사를 가릅니다.",
    frequency: '내신 필수',
    cardColor: 'amber'
  },
  {
    id: 'ani',
    word: '아니',
    types: ['감탄사', '부사'],
    category: 'excl-adv-other',
    categoryLabel: '감탄사 vs 부사',
    distinctionRule: "문장 맨 앞에서 놀람·느낌·부정의 대답으로 독립적으로 쓰이면 감탄사, 용언 앞에서 동작이나 상태를 부정하면 부사('안')!",
    usages: [
      {
        pos: '감탄사',
        definition: '놀라움이나 의외의 사실에 대한 반응, 또는 부름에 대해 부정으로 대답하는 독립어.',
        keyCondition: '독립어로 쉼표와 함께 사용',
        example: '아니, 벌써 금촌고 자율학습 시간이 끝났단 말이야?',
        highlight: '아니,',
        explanation: "놀람을 표현하며 뒤 문장과 문법적으로 독립되어 쓰였으므로 감탄사입니다."
      },
      {
        pos: '부사',
        definition: "동사나 형용사 앞에 놓여 부정을 나타내는 부사 ('안'의 본말).",
        keyCondition: '용언 바로 앞에서 부정 수식',
        example: '그 친구는 굳은 결심을 결코 아니 바꾼다.',
        highlight: '아니 바꾼다',
        explanation: "'바꾼다'라는 서술어를 직접 수식하여 부정을 뜻하므로 부사입니다."
      }
    ],
    examTip: "감탄사는 독립언이므로 다른 문장 성분과 직접적인 문법적 수식 관계를 맺지 않습니다.",
    frequency: '내신 필수',
    cardColor: 'rose'
  },
  {
    id: 'anio-aniyo',
    word: '아니오 / 아니요',
    types: ['형용사', '감탄사'],
    category: 'excl-adv-other',
    categoryLabel: '형용사 vs 감탄사',
    distinctionRule: "서술어로 문장을 끝맺으며 '책이 아니오'처럼 쓰이면 형용사 '아니다'의 하오체 활용형, 대답으로 '아니요, 제가 안 했습니다'는 감탄사!",
    usages: [
      {
        pos: '형용사 (아니오)',
        definition: "형용사 '아니다'의 어간 '아니-'에 종결 어미 '-오'가 결합한 서술어 활용형.",
        keyCondition: '서술어 기능 (앞에 보어가 옴)',
        example: '이것은 금촌고 2학년 학생의 책이 아니오.',
        highlight: '책이 아니오',
        explanation: "'책이'라는 보어 뒤에서 문장의 서술어 역할을 하는 형용사 '아니다'의 활용 형태입니다."
      },
      {
        pos: '감탄사 (아니요)',
        definition: '상대방의 물음에 대해 정중하게 부정할 때 단독으로 사용하는 독립언.',
        keyCondition: '대답용 단독 독립어',
        example: '아니요, 제가 아직 시험지를 제출하지 않았습니다.',
        highlight: '아니요,',
        explanation: "상대의 물음에 부정하여 공손하게 답하는 독립된 감탄사입니다."
      }
    ],
    examTip: "'예/아니요'의 짝은 감탄사 '아니요'입니다! '아니오'는 '이것은 거짓이 아니오'처럼 서술어에만 쓰입니다.",
    frequency: '고난도 킬러',
    cardColor: 'teal'
  },
  {
    id: 'ppun',
    word: '뿐',
    types: ['의존 명사', '조사'],
    category: 'noun-particle',
    categoryLabel: '의존 명사 vs 조사',
    distinctionRule: "관형사형 어미 뒤에서 띄어 쓰면 의존 명사('웃을 뿐'), 체언 뒤에 붙여 쓰면 보조사('너뿐이야')!",
    usages: [
      {
        pos: '의존 명사',
        definition: "'다만 어떠하거나 어찌할 따름'이라는 뜻을 나타내며 관형어의 수식을 받음.",
        keyCondition: '관형사형 어미 뒤 (띄어씀)',
        example: '그는 아무 말 없이 그저 허탈하게 웃을 뿐이었다.',
        highlight: '웃을 뿐',
        explanation: "'웃을'은 동사 '웃다'에 관형사형 어미 '-(으)ㄹ'이 붙은 관형어이므로 뒤의 '뿐'은 의존 명사입니다."
      },
      {
        pos: '조사',
        definition: "'그것만이고 더는 없음'을 나타내는 보조사.",
        keyCondition: '체언 뒤 (붙여씀)',
        example: '내가 믿고 의지할 사람은 오직 너뿐이다.',
        highlight: '너뿐이다',
        explanation: "'너'는 대명사(체언)이므로 바로 뒤에 붙은 '뿐'은 보조사입니다."
      }
    ],
    examTip: "뿐, 만, 대로, 만큼은 '체언 뒤엔 조사(붙여쓰기), 용언 관형형 뒤엔 의존명사(띄어쓰기)'라는 공식이 100% 동일하게 적용됩니다!",
    frequency: '최다 빈출',
    cardColor: 'sky'
  },
  {
    id: 'daero',
    word: '대로',
    types: ['의존 명사', '조사'],
    category: 'noun-particle',
    categoryLabel: '의존 명사 vs 조사',
    distinctionRule: "'본 대로 / 느낀 대로'처럼 관형사형 뒤는 의존 명사, '법대로 / 원칙대로'처럼 체언 뒤는 조사!",
    usages: [
      {
        pos: '의존 명사',
        definition: "어떤 모양이나 상태와 같이, 또는 그것이 일어나는 그때그때를 뜻하는 말.",
        keyCondition: '관형사형 어미 뒤 (띄어씀)',
        example: '시험장에서 네가 평소에 연습한 대로 차분하게 풀어나가렴.',
        highlight: '연습한 대로',
        explanation: "'연습한'이 동사의 관형사형(관형어)이므로 '대로'는 의존 명사로 띄어 씁니다."
      },
      {
        pos: '조사',
        definition: "앞에 오는 말에 따름을 나타내는 격조사/보조사.",
        keyCondition: '체언 뒤 (붙여씀)',
        example: '모든 평가는 학사 규정과 법대로 엄격하게 진행된다.',
        highlight: '법대로',
        explanation: "'법'이라는 명사(체언) 바로 뒤에 붙었으므로 조사가 맞습니다."
      }
    ],
    examTip: "'틈나는 대로'는 띄어쓰기(의존명사), '너는 너대로'는 붙여쓰기(조사)!",
    frequency: '최다 빈출',
    cardColor: 'cyan'
  },
  {
    id: 'man',
    word: '만',
    types: ['의존 명사', '조사'],
    category: 'noun-particle',
    categoryLabel: '의존 명사 vs 조사',
    distinctionRule: "시간의 경과나 횟수를 나타내면 의존 명사('십 년 만에'), 한정이나 비교를 뜻하면 보조사('너만 알아')!",
    usages: [
      {
        pos: '의존 명사',
        definition: "어떤 일이 일어난 때로부터 다른 일이 일어날 때까지의 시간적 간격을 나타냄.",
        keyCondition: '시간 경과 / 수관형사 뒤 (띄어씀)',
        example: '고향 친구를 졸업한 지 무려 삼 년 만에 다시 만났다.',
        highlight: '삼 년 만에',
        explanation: "'삼 년'이라는 시간적 경과를 나타내는 체언 구 뒤에 쓰여 간격을 의미하는 의존 명사이므로 띄어 씁니다."
      },
      {
        pos: '조사',
        definition: "다른 것은 배제하고 어떤 대상을 한정함을 나타내는 보조사.",
        keyCondition: '체언 뒤 한정 (붙여씀)',
        example: '이번 기말고사에서는 국어 문법만 완벽히 다 맞추자.',
        highlight: '문법만',
        explanation: "'문법'이라는 명사에 붙어 한정의 의미를 더하는 보조사이므로 붙여 씁니다."
      }
    ],
    examTip: "'얼마 만인가'의 '만'은 의존 명사라 띄어 쓰고, '하루 만에'도 띄어 씁니다!",
    frequency: '고난도 킬러',
    cardColor: 'violet'
  },
  {
    id: 'ji',
    word: '지',
    types: ['의존 명사', '어미'],
    category: 'noun-particle',
    categoryLabel: '의존 명사 vs 연결 어미',
    distinctionRule: "시간의 경과를 나타내면 띄어쓰는 의존 명사('떠난 지 3년'), 막연한 의문이나 추측을 나타내면 붙여쓰는 어미('-ㄴ지 / -는지')!",
    usages: [
      {
        pos: '의존 명사',
        definition: "어떤 일이 있었던 때로부터 지금까지의 시간 경과를 나타내는 말.",
        keyCondition: '시간의 경과 (띄어씀)',
        example: '금촌고등학교에 입학한 지가 엊그제 같은데 벌써 2학년이다.',
        highlight: '입학한 지가',
        explanation: "'입학한' 뒤에 시간의 경과를 뜻하며 주격조사 '가'가 결합할 수 있는 의존 명사입니다."
      },
      {
        pos: '연결 어미 (-는지 / -(으)ㄴ지)',
        definition: "어간 뒤에 붙어 막연한 의문이나 미결정의 사실을 나타내는 어말 어미.",
        keyCondition: '용언 어간에 바로 붙음 (붙여씀)',
        example: '내일 비가 올지 눈이 올지 아무도 장담할 수 없다.',
        highlight: '올지',
        explanation: "용언 어간 '오-' 뒤에 붙은 어말 어미 '-ㄹ지'의 일부이므로 한 단어의 일부로 붙여 씁니다."
      }
    ],
    examTip: "시간 경과 뜻이 있으면 '지'를 띄어 쓰고, 의문/의심 뜻이면 '는지'를 붙여 씁니다!",
    frequency: '최다 빈출',
    cardColor: 'purple'
  },
  {
    id: 'bakda',
    word: '밝다',
    types: ['동사', '형용사'],
    category: 'verb-adj',
    categoryLabel: '동사 vs 형용사',
    distinctionRule: "밤이 지나 날이 환해지는 '과정/변화'는 동사('날이 밝는다'), 불빛이 환한 '상태'나 감각이 예민한 상태는 형용사('눈이 밝다')!",
    usages: [
      {
        pos: '동사',
        definition: "밤이 지나고 환해지다, 새해가 시작되다 등 시간적 변화와 작용을 뜻함.",
        keyCondition: "'-ㄴ다' 결합 가능 (밝아 오는 작용)",
        example: '동창이 밝았느냐 노고지리 우지진다 / 날이 서서히 밝는다.',
        highlight: '밝는다',
        explanation: "환해지는 시간적 작용을 나타내며 '-는다'가 붙어 쓰이므로 동사입니다."
      },
      {
        pos: '형용사',
        definition: "빛이 환하여 어둡지 아니하다, 시력이나 청력이 뛰어나다 등 상태를 뜻함.",
        keyCondition: "'-ㄴ다' 결합 불가 (불빛/감각 상태)",
        example: '금촌고 도서관 열람실의 조명이 참 밝다.',
        highlight: '밝다',
        explanation: "빛의 세기나 환한 상태를 묘사하는 말이므로 형용사입니다."
      }
    ],
    examTip: "'새해가 밝는다' -> 동사! '성격이 밝다' -> 형용사! 작용인지 상태인지 주목하세요.",
    frequency: '고난도 킬러',
    cardColor: 'yellow'
  },
  {
    id: 'matda',
    word: '맞다',
    types: ['동사', '형용사'],
    category: 'verb-adj',
    categoryLabel: '동사 vs 형용사',
    distinctionRule: "표준국어대사전상 '정답이 맞는다'는 동사! 그러나 '성격이나 입맛에 어울린다/적합하다'는 형용사로 품사가 통용됩니다.",
    usages: [
      {
        pos: '동사',
        definition: "외부의 힘이나 물체에 닿다, 비/눈을 겪다, 문제에 정답을 답하다.",
        keyCondition: "'-는다' 결합 가능 (비 맞는다 / 답이 맞는다)",
        example: '그가 제출한 답안지의 정답이 모두 맞는다.',
        highlight: '맞는다',
        explanation: "국립국어원 표준어 규정에서 '답이 틀리지 아니하다'는 동사로 분류되어 '-는다'가 결합합니다."
      },
      {
        pos: '형용사',
        definition: "서로 어긋남이 없이 조화를 이루다, 입맛이나 규격에 꼭 어울리다.",
        keyCondition: "'-는다' 결합 불가 (조화/적합 상태)",
        example: '이 안경테는 내 얼굴형에 아주 잘 맞다.',
        highlight: '잘 맞다',
        explanation: "모양이나 격식이 서로 알맞은 상태를 나타내므로 형용사로 쓰입니다."
      }
    ],
    examTip: "수능 모의고사 단골 함정: '답이 맞는다'에서 '맞다'는 동사입니다! '틀리다'는 항상 동사이므로 주의!",
    frequency: '고난도 킬러',
    cardColor: 'orange'
  },
  {
    id: 'gutda',
    word: '굳다',
    types: ['동사', '형용사'],
    category: 'verb-adj',
    categoryLabel: '동사 vs 형용사',
    distinctionRule: "무른 것이 단단하게 '되어 가는 변화'는 동사('시멘트가 굳는다'), 이미 단단하고 견고한 '성질·상태'는 형용사('굳은 의지')!",
    usages: [
      {
        pos: '동사',
        definition: "무르거나 묽던 것이 말라 단단해지는 변화의 과정.",
        keyCondition: "'-는다' 결합 가능 (굳는다)",
        example: '날씨가 추워지니 마당에 깔아 둔 반죽이 딱딱하게 굳는다.',
        highlight: '굳는다',
        explanation: "액체나 반죽이 단단해지는 변화 과정을 나타내므로 동사입니다."
      },
      {
        pos: '형용사',
        definition: "살갗이나 뼈, 의지 등이 흔들림 없이 단단하고 견고한 성질.",
        keyCondition: "단순 상태/성질 (굳은 결심)",
        example: '그는 이번 수능에서 1등급을 받겠다는 굳은 결심을 했다.',
        highlight: '굳은 결심',
        explanation: "마음의 확고부동한 상태를 수식하는 형용사의 관형사형입니다."
      }
    ],
    examTip: "물질의 상태 변화 과정('땅이 굳는다')은 동사, 성질의 견고함('굳은 땅', '굳은 표정')은 형용사입니다.",
    frequency: '내신 필수',
    cardColor: 'zinc'
  },
  {
    id: 'daseot',
    word: '다섯',
    types: ['수사', '관형사'],
    category: 'num-det',
    categoryLabel: '수사 vs 수 관형사',
    distinctionRule: "뒤에 격조사가 붙을 수 있으면 수사(체언), 조사가 결합할 수 없고 뒤의 명사(단위성 의존명사 등)를 직접 꾸미면 수 관형사!",
    usages: [
      {
        pos: '수사',
        definition: "넷에 하나를 더한 수. 체언이므로 뒤에 격조사가 붙을 수 있음.",
        keyCondition: '조사 결합 가능 (다섯이, 다섯을)',
        example: '우리 조원 다섯이 함께 머리를 맞대고 보고서를 완성했다.',
        highlight: '다섯이',
        explanation: "뒤에 주격 조사 '이'가 결합하였으므로 문장의 체언인 수사입니다."
      },
      {
        pos: '수 관형사',
        definition: "뒤에 오는 체언(단위명사 등)의 수량을 꾸며주는 수식언.",
        keyCondition: '조사 결합 불가, 뒤 체언 수식',
        example: '오늘 독서실에 다섯 사람이 공부하러 모였다.',
        highlight: '다섯 사람',
        explanation: "조사 결합 없이 뒤의 명사 '사람'을 직접 수식하고 있으므로 관형사입니다."
      }
    ],
    examTip: "'하나, 둘, 셋, 넷, 다섯' 등 모든 수 표현은 조사가 붙으면 수사, 체언을 꾸미면 관형사입니다!",
    frequency: '최다 빈출',
    cardColor: 'emerald'
  },
  {
    id: 'igeo-i',
    word: '이 / 그 / 저',
    types: ['지시 대명사', '지시 관형사'],
    category: 'pron-det',
    categoryLabel: '대명사 vs 관형사',
    distinctionRule: "자체로 사물이나 사람을 대신 가리키며 조사가 붙으면 대명사('이가 맞다'), 뒤에 체언을 수식하며 조사 결합이 없으면 관형사('이 책')!",
    usages: [
      {
        pos: '지시 대명사',
        definition: "말하는 이에게 가까이 있는 사물이나 사람을 직접 가리키는 체언.",
        keyCondition: '조사 결합 가능 (이는, 이를)',
        example: '이는 우리가 다음 세대를 위해 반드시 지켜야 할 가치다.',
        highlight: '이는',
        explanation: "사물을 가리키며 뒤에 보조사 '는'이 결합하였으므로 지시 대명사입니다."
      },
      {
        pos: '지시 관형사',
        definition: "말하는 이에게 가까이 있는 대상을 가리키며 뒤의 명사를 수식하는 말.",
        keyCondition: '조사 결합 불가, 체언 수식',
        example: '이 문제집을 다 풀고 나면 품사 통용은 마스터할 수 있어.',
        highlight: '이 문제집',
        explanation: "뒤에 오는 명사 '문제집'을 지시하여 직접 꾸미고 있으므로 지시 관형사입니다."
      }
    ],
    examTip: "'이것/그것/저것'은 대명사이지만 '이/그/저' 단독으로 쓰일 때는 뒤에 조사가 붙는지, 체언이 오는지 확인해야 합니다.",
    frequency: '최다 빈출',
    cardColor: 'teal'
  },
  {
    id: 'dareun',
    word: '다른',
    types: ['관형사', '형용사 활용형'],
    category: 'excl-adv-other',
    categoryLabel: '관형사 vs 형용사 활용형',
    distinctionRule: "'딴 / 별개의(other)' 의미면 순수 관형사, '같지 않다(different)'의 서술성을 지니면 형용사 '다르다'의 활용형!",
    usages: [
      {
        pos: '관형사',
        definition: "'당장 문제시되고 있는 것 이외의 / 딴'의 뜻을 가진 순수 관형사.",
        keyCondition: "'딴'으로 치환 가능, 서술성 없음",
        example: '그 제안 말고 다른 방법을 한 번 찾아보도록 하자.',
        highlight: '다른 방법',
        explanation: "'딴 방법(another method)'의 뜻이며 '방법이 다르다'는 서술적 의미가 아니므로 관형사입니다."
      },
      {
        pos: '형용사 (다르다의 관형사형)',
        definition: "비교되는 두 대상이 서로 같지 않다는 서술적 성격을 띤 형용사 활용형.",
        keyCondition: "'같지 않은'의 서술성 (주어와 호응)",
        example: '우리 둘은 생각이 서로 다른 사람이다.',
        highlight: '서로 다른',
        explanation: "'생각이 서로 다르다'라는 서술절 구조를 안고 있으므로 형용사 '다르다'의 활용형입니다."
      }
    ],
    examTip: "부사 '서로'나 '매우'의 수식을 받을 수 있으면 형용사! ('서로 다른 사람'은 형용사, '다른 사람에게 물어봐'는 관형사)",
    frequency: '고난도 킬러',
    cardColor: 'fuchsia'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'noun-particle',
    sentence: "그는 아는 <u>만큼</u> 말하고 실천하는 성실한 학생이다.",
    targetWord: "만큼",
    options: ["의존 명사", "격조사", "보조사", "부사"],
    correctIndex: 0,
    explanation: "앞말인 '아는'이 동사 '알다'의 관형사형(관형어)이므로, 관형어의 수식을 받고 띄어 쓰는 '의존 명사'입니다.",
    distinctionFormula: "공식 1: 관형사형 어미('-(으)ㄴ, -는, -(으)ㄹ, -던') 뒤에서 띄어 쓰면 의존 명사!",
    difficulty: '기초'
  },
  {
    id: 2,
    category: 'excl-adv-other',
    sentence: "친구와 <u>같이</u> 도서관에서 국어 시험 대비 공부를 했다.",
    targetWord: "같이",
    options: ["명사", "조사", "부사", "형용사"],
    correctIndex: 2,
    explanation: "'함께'라는 뜻으로 문장 내에서 독립적으로 쓰여 서술어 '공부를 했다'를 수식하고 있으므로 '부사'입니다.",
    distinctionFormula: "공식 2: '함께'의 의미로 서술어를 꾸미면 부사, 체언 뒤에 딱 붙어 '~처럼'의 뜻이면 조사!",
    difficulty: '기초'
  },
  {
    id: 3,
    category: 'verb-adj',
    sentence: "우리 집 베란다의 작은 화초가 햇살을 받아 쑥쑥 <u>큰다</u>.",
    targetWord: "큰다",
    options: ["동사", "형용사", "관형사", "명사"],
    correctIndex: 0,
    explanation: "현재 시제 선어말 어미 '-ㄴ다'가 결합하여 식물이 '자라다'라는 진행과 작용의 과정을 나타내므로 '동사'입니다.",
    distinctionFormula: "공식 3: 현재 시제 어미 '-ㄴ다/-는다'가 자연스럽게 붙고 작용을 뜻하면 동사!",
    difficulty: '기초'
  },
  {
    id: 4,
    category: 'noun-adv',
    sentence: "<u>오늘</u>은 날씨가 매우 화창해서 야외 수업하기에 딱 좋다.",
    targetWord: "오늘",
    options: ["명사", "대명사", "부사", "감탄사"],
    correctIndex: 0,
    explanation: "뒤에 보조사 '은'이 결합하여 문장의 주어로 쓰였으므로 체언인 '명사'입니다.",
    distinctionFormula: "공식 1: 뒤에 격조사나 보조사가 붙어 주어·목적어 등의 성분이 되면 체언(명사)!",
    difficulty: '기초'
  },
  {
    id: 5,
    category: 'excl-adv-other',
    sentence: "<u>아니</u>, 네가 어떻게 내 금촌고 시험 번호를 알고 있었니?",
    targetWord: "아니",
    options: ["명사", "부사", "감탄사", "관형사"],
    correctIndex: 2,
    explanation: "놀람을 나타내며 문장 앞부분에서 뒤 문장 성분과 문법적 관계를 맺지 않고 독립적으로 쓰였으므로 '감탄사'입니다.",
    distinctionFormula: "공식 4: 문두에서 놀람이나 대답을 나타내는 독립어는 감탄사!",
    difficulty: '기초'
  },
  {
    id: 6,
    category: 'noun-particle',
    sentence: "내가 믿고 진솔하게 의지할 수 있는 사람은 오직 너<u>뿐</u>이야.",
    targetWord: "뿐",
    options: ["의존 명사", "보조사", "관형사", "감탄사"],
    correctIndex: 1,
    explanation: "대명사(체언) '너' 바로 뒤에 공백 없이 붙어 '오직 그것만'이라는 한정의 의미를 더하고 있으므로 '보조사(조사)'입니다.",
    distinctionFormula: "공식 1: 체언 바로 뒤에 붙여 쓰는 '뿐'은 보조사, 관형어 뒤 띄어쓰는 '뿐'은 의존 명사!",
    difficulty: '중간'
  },
  {
    id: 7,
    category: 'noun-particle',
    sentence: "선생님께서 가르쳐 주신 <u>대로</u> 문제를 차근차근 풀었다.",
    targetWord: "대로",
    options: ["의존 명사", "조사", "부사", "어미"],
    correctIndex: 0,
    explanation: "앞의 '주신'은 동사 '주시다'의 관형사형이므로, 관형어의 수식을 받는 '의존 명사'입니다.",
    distinctionFormula: "공식 1: 관형사형 어미 뒤의 '대로'는 의존 명사로 띄어 씀!",
    difficulty: '중간'
  },
  {
    id: 8,
    category: 'verb-adj',
    sentence: "창밖을 내다보니 어스름이 걷히고 동쪽 하늘이 서서히 <u>밝는다</u>.",
    targetWord: "밝는다",
    options: ["동사", "형용사", "관형사", "부사"],
    correctIndex: 0,
    explanation: "밤이 지나 날이 환해지는 시간적 작용 및 변화를 나타내며 현재 시제 어미 '-는-'이 붙었으므로 '동사'입니다.",
    distinctionFormula: "공식 3: 날이나 새해가 오는 작용은 동사('밝는다'), 단순히 환한 상태는 형용사('밝다')!",
    difficulty: '중간'
  },
  {
    id: 9,
    category: 'num-det',
    sentence: "도서관 모둠 활동에 참여한 <u>다섯</u> 사람이 모두 1등급을 받았다.",
    targetWord: "다섯",
    options: ["수사", "수 관형사", "명사", "형용사"],
    correctIndex: 1,
    explanation: "뒤에 조사가 붙지 않고 명사 '사람'을 직접 수식하고 있으므로 수식언인 '수 관형사'입니다.",
    distinctionFormula: "공식 2: 조사가 붙으면 수사('다섯이 왔다'), 체언을 꾸미면 관형사('다섯 사람')!",
    difficulty: '중간'
  },
  {
    id: 10,
    category: 'noun-particle',
    sentence: "초등학교를 졸업한 <u>지</u> 3년 만에 친구를 다시 만났다.",
    targetWord: "지",
    options: ["연결 어미", "의존 명사", "조사", "접미사"],
    correctIndex: 1,
    explanation: "어떤 일이 있었던 때로부터 지금까지의 '시간적 경과'를 나타내며 주격 조사 '가'가 붙을 수 있으므로 '의존 명사'입니다.",
    distinctionFormula: "공식 1: 시간의 경과를 나타내는 '지'는 의존 명사로 띄어 씀!",
    difficulty: '중간'
  },
  {
    id: 11,
    category: 'verb-adj',
    sentence: "선생님께서 채점하신 시험지의 정답이 모두 <u>맞는다</u>.",
    targetWord: "맞는다",
    options: ["동사", "형용사", "관형사", "부사"],
    correctIndex: 0,
    explanation: "국립국어원 표준국어대사전에서 '답이 틀리지 아니하다'는 뜻의 '맞다'는 동사로 분류되어 현재 시제 '-는다'가 결합합니다.",
    distinctionFormula: "공식 3: 수능 킬러 포인트! '정답이 맞는다'는 동사, '입맛에 꼭 맞다(어울리다)'는 형용사!",
    difficulty: '고난도'
  },
  {
    id: 12,
    category: 'excl-adv-other',
    sentence: "이 문제 말고 <u>다른</u> 풀이법을 찾아보는 게 좋겠어.",
    targetWord: "다른",
    options: ["형용사 활용형", "관형사", "부사", "대명사"],
    correctIndex: 1,
    explanation: "'딴 / 이외의(another)'의 뜻을 가지며 '풀이법이 다르다'라는 서술적 관계가 아니므로 순수 '관형사'입니다.",
    distinctionFormula: "공식 4: '딴'으로 바꿀 수 있으면 관형사, '비교 대상과 같지 않다'는 서술성이면 형용사!",
    difficulty: '고난도'
  },
  {
    id: 13,
    category: 'excl-adv-other',
    sentence: "그 친구와 나는 성격이 서로 <u>다른</u> 사람이다.",
    targetWord: "다른",
    options: ["관형사", "형용사 활용형", "동사 활용형", "명사"],
    correctIndex: 1,
    explanation: "부사 '서로'의 수식을 받으며 '성격이 서로 다르다(같지 않다)'라는 서술성을 지니고 있으므로 형용사 '다르다'의 관형사형입니다.",
    distinctionFormula: "공식 4: '서로'의 수식을 받거나 주어와 서술어 관계를 이루면 형용사의 활용형!",
    difficulty: '고난도'
  },
  {
    id: 14,
    category: 'noun-particle',
    sentence: "이번 중간고사에서는 오직 국어 문법<u>만</u>은 만점을 받겠다.",
    targetWord: "만",
    options: ["의존 명사", "보조사", "명사", "부사"],
    correctIndex: 1,
    explanation: "'문법'이라는 명사에 바로 붙어 '오직 그것 하나로 한정함'을 나타내며 뒤에 또 다른 보조사 '은'이 결합했으므로 '보조사'입니다.",
    distinctionFormula: "공식 1: 한정을 나타내며 체언 뒤에 결합하면 보조사, 시간 경과는 의존 명사('삼 년 만에')!",
    difficulty: '중간'
  },
  {
    id: 15,
    category: 'excl-adv-other',
    sentence: "아버님, 이것은 결코 소인의 잘못이 <u>아니오</u>.",
    targetWord: "아니오",
    options: ["감탄사", "형용사 활용형", "부사", "종결 어미"],
    correctIndex: 1,
    explanation: "앞의 보어 '잘못이'와 어울려 문장의 서술어 역할을 하는 형용사 '아니다'의 어간에 하오체 종결 어미 '-오'가 결합한 활용형입니다.",
    distinctionFormula: "공식 4: 문장의 서술어로 쓰이면 형용사 '아니오', 묻는 말에 대답하는 독립어는 감탄사 '아니요'!",
    difficulty: '고난도'
  }
];

export const CORE_FORMULAS = [
  {
    id: 1,
    num: "01",
    title: "조사 결합 판별법",
    summary: "뒤에 조사가 붙을 수 있는가?",
    description: "체언(명사, 대명사, 수사)은 반드시 격조사나 보조사가 결합할 수 있습니다. 반면 관형사나 부사 등 수식언 뒤에는 격조사가 결합할 수 없습니다.",
    goodExample: "오늘이(명사) 내 생일이다. / 다섯이(수사) 모였다.",
    badExample: "오늘(부사) 출발하자. / 다섯(관형사) 사람이 왔다.",
    tip: "조사 '+이/가', '+을/를', '+은/는'을 강제로 넣어보세요. 말이 되면 체언, 어색하면 수식언!"
  },
  {
    id: 2,
    num: "02",
    title: "띄어쓰기 & 수식 대상 판별법",
    summary: "무엇을 수식하며 띄어 쓰는가?",
    description: "체언(명사)을 수식하면 관형사, 주로 용언(동사/형용사)이나 다른 부사를 수식하면 부사입니다. 또한 의존 명사는 앞말과 띄어 쓰지만, 조사는 앞 체언에 반드시 붙여 씁니다.",
    goodExample: "노력한 만큼(의존명사, 띄어씀) / 나만큼(조사, 붙여씀)",
    badExample: "새 옷(관형사, 체언 수식) / 빨리 뛴다(부사, 용언 수식)",
    tip: "앞말이 용언의 관형사형('-(으)ㄴ, -는, -(으)ㄹ, -던')이면 의존명사라 띄어 쓰고, 앞말이 체언이면 조사라 붙여 씁니다!"
  },
  {
    id: 3,
    num: "03",
    title: "현재 시제 어미 결합법",
    summary: "'-ㄴ다/-는다'가 붙을 수 있는가?",
    description: "동사는 동작이나 작용을 나타내므로 현재 시제 선어말 어미 '-ㄴ다/-는다', 관형사형 어미 '-는', 명령형 '-아라/어라', 청유형 '-자'가 결합할 수 있습니다. 형용사는 상태나 성질이므로 이들이 결합할 수 없습니다.",
    goodExample: "나무가 잘 큰다(동사, 결합O) / 날이 밝는다(동사)",
    badExample: "옷이 너무 크다(형용사, *큰다 불가) / 조명이 밝다(형용사)",
    tip: "지금 당장 문맥 속 단어에 '-ㄴ다/-는다'를 붙여보세요! 어색하지 않고 작용이 느껴지면 100% 동사!"
  },
  {
    id: 4,
    num: "04",
    title: "본래 품사 vs 전성 어미 활용법",
    summary: "사전 표제어인가, 서술어의 변신인가?",
    description: "'다른'처럼 사전의 관형사 표제어(딴, another)인지, 아니면 형용사 '다르다(같지 않다)'의 어간에 관형사형 전성 어미 '-(으)ㄴ'이 결합한 서술어 활용형인지 구분해야 합니다.",
    goodExample: "다른 방법을 찾자 (관형사, '딴')",
    badExample: "생각이 서로 다른 친구 (형용사, '생각이 다르다' 서술성)",
    tip: "부사 '서로'나 '매우'를 앞에 붙여보거나, '주어-서술어' 관계로 풀어보아 말이 되면 형용사 활용형입니다!"
  }
];

export const POS_SYSTEM = [
  {
    functionName: "체언 (體言)",
    description: "문장에서 주어, 목적어, 보어 등의 몸통 역할을 함. 조사와 결합 가능.",
    posList: [
      { name: "명사", desc: "사물이나 개념의 이름을 나타냄 (오늘, 만큼, 책)", example: "오늘이 좋다." },
      { name: "대명사", desc: "사람이나 사물의 이름을 대신 가리킴 (이, 그, 저, 너)", example: "이가 맞다." },
      { name: "수사", desc: "사물의 수량이나 순서를 나타냄 (하나, 둘, 다섯)", example: "다섯이 모였다." }
    ]
  },
  {
    functionName: "용언 (用言)",
    description: "문장에서 서술어 역할을 하며 어간과 어미가 활용(변화)함.",
    posList: [
      { name: "동사", desc: "사람이나 사물의 동작이나 작용을 나타냄 (-ㄴ다 가능)", example: "쑥쑥 큰다, 날이 밝는다" },
      { name: "형용사", desc: "사람이나 사물의 상태나 성질을 나타냄 (-ㄴ다 불가)", example: "옷이 크다, 눈이 밝다" }
    ]
  },
  {
    functionName: "수식언 (修飾言)",
    description: "다른 말을 꾸며주는 역할을 하며 형태가 변하지 않음 (조사 결합 불가).",
    posList: [
      { name: "관형사", desc: "체언(명사) 바로 앞에서 체언의 뜻을 제한함", example: "새 옷, 다섯 사람, 이 책" },
      { name: "부사", desc: "용언(동사/형용사)이나 다른 말을 꾸며줌", example: "오늘 떠나자, 같이 가자" }
    ]
  },
  {
    functionName: "관계언 (關係言)",
    description: "자립성이 있는 말 뒤에 붙어 문법적 관계를 나타내거나 특별한 뜻을 더함.",
    posList: [
      { name: "조사", desc: "격조사, 접속조사, 보조사 (앞말에 붙여 씀)", example: "너만큼, 얼음같이, 법대로" }
    ]
  },
  {
    functionName: "독립언 (獨立言)",
    description: "문장의 다른 성분과 직접적인 문법적 관계를 맺지 않고 독립적으로 쓰임.",
    posList: [
      { name: "감탄사", desc: "느낌, 놀람, 부름, 대답을 나타냄 (형태 불변)", example: "아니!, 아니요." }
    ]
  }
];
