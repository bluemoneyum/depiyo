export interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  description: string;
  tools: string[];
  year: string;
  thumbnail: string;
  detailImage?: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface Experience {
  company: string;
  period: string;
  role: string;
  projects: string[];
  skills: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'gundam-shop-renewal',
    title: '건담샵 메인 프로모션 리뉴얼',
    category: '웹 / 이벤트',
    role: '디자인 + 운영 프로모션',
    description: '이벤트 노출 강화 중심 메인 리뉴얼 작업. 사용자의 구매 흐름을 분석하여 프로모션 배너의 효율을 극대화했습니다.',
    tools: ['Photoshop', 'XD', 'HTML/CSS'],
    year: '2023',
    thumbnail: 'https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=1470&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=1470&auto=format&fit=crop',
    tags: ['웹사이트', '이벤트/프로모션'],
    isFeatured: true
  },
  {
    id: 'food-detail-page',
    title: '정육각 상세페이지 신규 제작',
    category: '상세페이지',
    role: '기획 가이드 + 디자인',
    description: '상품 정보 흐름과 가독성을 중심으로 설계한 상세페이지. 산지 직송의 신선함을 시각적으로 강조했습니다.',
    tools: ['Photoshop', 'Illustrator'],
    year: '2023',
    thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1470&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1470&auto=format&fit=crop',
    tags: ['상세페이지'],
    isFeatured: true
  },
  {
    id: 'fashion-event-banner',
    title: '무신사 시즌 오프 배너 시리즈',
    category: '이벤트 / 프로모션',
    role: '메인 배너 디자인',
    description: '프로모션 운영 목적에 맞춰 구성한 이벤트 페이지 및 배너 디자인. 클릭률 분석을 통한 최적의 레이아웃을 적용했습니다.',
    tools: ['Photoshop'],
    year: '2022',
    thumbnail: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1374&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1374&auto=format&fit=crop',
    tags: ['이벤트/프로모션'],
    isFeatured: true
  },
  {
    id: 'cosmetic-brand-site',
    title: '뷰티 브랜드 아카이브 사이트 구축',
    category: '웹사이트 디자인',
    role: 'UI/UX 디자인',
    description: '브랜드 가시성과 쇼핑 편의성을 동시에 잡은 웹사이트 디자인. 카페24 솔루션에 최적화된 테마 제작.',
    tools: ['XD', 'Photoshop', 'Cafe24'],
    year: '2022',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1487&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1487&auto=format&fit=crop',
    tags: ['웹사이트'],
    isFeatured: true
  },
  {
    id: 'industrial-mall-renewal',
    title: '나노공구안전 자사몰 통합 리뉴얼',
    category: '웹사이트 디자인',
    role: '디자인 총괄 + 상품 DB 최적화',
    description: '방대한 상품 데이터를 효율적으로 노출하기 위한 그리드 시스템 도입. 실무 운영자의 관리 편의성을 극대화한 UI 설계.',
    tools: ['Photoshop', 'Cafe24', 'HTML/CSS'],
    year: '2019',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop',
    tags: ['웹사이트'],
    isFeatured: true
  },
  {
    id: 'package-design-series',
    title: '친환경 푸드 패키지 시리즈',
    category: '인쇄물 디자인',
    role: '패키지 디자인 + 인쇄 관리',
    description: '실제 제작 환경을 고려해 작업한 인쇄물 디자인. 패키지 재질과 금박 등 후가공까지 고려한 전문 리드.',
    tools: ['Illustrator', 'Photoshop'],
    year: '2021',
    thumbnail: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=1470&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=1470&auto=format&fit=crop',
    tags: ['인쇄물'],
    isFeatured: false
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: '(주) 가보나라',
    period: '2024.08 - 2026.03',
    role: '웹 콘텐츠 디자인 및 운영',
    projects: [
      '상품 상세페이지, 이벤트 페이지, 안내 페이지 등 웹 콘텐츠 디자인 기획 및 제작',
      '리플렛, 스티커 등 인쇄물 디자인 작업',
      '각 디자인의 목적에 따른 시각 콘셉트 설정 및 수정 보완 진행',
      '자사몰·네이버스토어·쿠팡·옥션 등 온라인몰 상품 등록 및 정보 관리',
      '상품명, 이미지, 옵션, 가격 등의 상품 정보 업데이트 및 유지보수',
      '쿠팡 상품 등록 및 관리',
      '네이버쇼핑 광고 기획, 운영 및 성과 분석, 최적화'
    ],
    skills: ['Photoshop', 'Naver Ads', 'Coupang SCM', 'Product Management']
  },
  {
    company: '(주) 이지웨이',
    period: '2022.01 - 2024.07',
    role: '자사몰 기획 및 관리',
    projects: [
      '신규 자사몰 기획, 디자인 작업 외 세팅 (https://easyway365.com)',
      '자사몰 (디월트매니아, 밀워키하우스) 리뉴얼 및 상품, 이벤트 관리',
      '네이버쇼핑 주력 상품 상위 노출 작업 및 가격비교 상품관리',
      '네이버쇼핑 광고 운영, 분석, 광고수익률 관리',
      '유튜브, 인스타그램 등 SNS 광고 소재 제작'
    ],
    skills: ['UI/UX Plan', 'SEO', 'Marketing Data Analysis', 'Price Comparison Management']
  },
  {
    company: '(주) 나노공구안전',
    period: '2020.09 - 2021.10',
    role: '네이버 스토어 디자인 및 마케팅',
    projects: [
      '네이버 스토어 디자인 관리',
      '상품 촬영 및 상품 상세 디자인',
      '이벤트, 공지 배너 디자인',
      '네이버 키워드 운영, 분석, 광고수익률 관리'
    ],
    skills: ['Naver Smart Store', 'Keyword Ads', 'Photography']
  },
  {
    company: '(주) 씨와이',
    period: '2020.02 - 2020.08',
    role: '한의원 전문쇼핑몰 디자인 관리',
    projects: [
      '한의원 전문쇼핑몰 한판(https://www.1pan.co.kr) 디자인 관리',
      '상품 촬영 및 상품 상세 디자인',
      '스티커, 홍보물 등 인쇄물 디자인',
      '쇼핑몰 운영 메뉴얼 작업'
    ],
    skills: ['E-commerce Guide', 'Print Design', 'Product Detail Design']
  },
  {
    company: '(주) 퓨처사이버',
    period: '2011.06 - 2019.07',
    role: '건담샵 사이트 및 운영 관리',
    projects: [
      '프라모델 쇼핑몰 건담샵(www.gundamshop.co.kr) 사이트 및 상품, 이벤트, 기획전 관리',
      '입점 업체 사방넷을 이용하여 상품 관리',
      '자체 OEM 제품 패키지 디자인 및 상품 상세 디자인',
      '네이버 카페 커뮤니티 관리 (http://cafe.naver.com/gundamshopcafe)'
    ],
    skills: ['Sabangnet', 'Package Design', 'Community Management', 'Event Planning']
  },
  {
    company: '(주) 에스엠스타일',
    period: '2007.06 - 2009.10',
    role: '기획 및 콘텐츠 디자인',
    projects: [
      '판촉물쇼핑몰 아이디어토픽(www.ideatopic.com) 기획 및 디자인',
      '의류쇼핑몰 스타일엔진(www.styleengin.com) 커뮤니티 페이지 및 컨텐츠 디자인',
      '입점업체 이벤트 기획, 디자인 및 상품관리(디엔샵, 오가게 등 총 12개업체)'
    ],
    skills: ['Multi-platform Management', 'Promotion Planning', 'Editorial Design']
  },
  {
    company: '(주) 웹이즈',
    period: '2004.09 - 2007.02',
    role: '전략기획팀 디자이너',
    projects: [
      '디자인소품 쇼핑몰 바보사랑(www.babosarang.co.kr) 네이밍 및 디자인',
      '회사소개사이트(http://company.babosarang.co.kr) 기획 및 디자인',
      '고객센터 업무프로세스 개선작업 - 관리자 페이지 인테페이스 기획 및 디자인',
      '디자인팀 업무프로세스 개선작업 - 업무통합관리 인터페이스 기획 및 디자인',
      '무료도메인 발급사이트 토스트넷(www.tost.net) 기획 및 디자인',
      '제휴마케팅 사이트 헷토(www.hetto.com) 기획 및 디자인'
    ],
    skills: ['Brand Naming', 'UI Architecture', 'Portal Planning']
  }
];
