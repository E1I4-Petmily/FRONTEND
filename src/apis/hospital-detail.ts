export interface Review {
  rating: number;
  text: string;
}

export interface SummaryKeyword {
  term: string; //키워드(친절 등)
  sentiment: "POSITIVE" | "NEGATIVE"; // 긍정, 중립, 부정 판별
  count: number; // 키워드 개수
  ratio: number; // 전체 리뷰 개수 대비 키워드 출현 비율
}

export interface Summary {
  keywords: SummaryKeyword[];
  negativeCount: number; //부정리뷰개수
  positiveCount: number; //긍정리뷰개수
  totalCount: number; //총 리뷰개수
  overallSummary: string; // AI리뷰
}

export interface HospitalDetail {
  name: string;
  website?: string;
  rating: number | null;
  types: string[];
  reviews: Review[];
  registered: boolean; // 펫밀리 가입 여부
  hospitalAccountId?: number; // 펫밀리 가입되어있으면 병원 고유 식별자
  animalTypes?: string[]; // 진료 대상 동물 종류

  summary?: Summary; //AI 요약 데이터

  place_id: string; // 구글맵 고유 식별자
  formatted_address: string; // 구글맵에 등록된 주소
  formatted_phone_number?: string;
  user_ratings_total: number; //총 리뷰개수

  opening_hours?: {
    //현재운영중인지
    open_now: boolean;
  };
}

export interface HospitalDetailResponse {
  status: string;
  result: HospitalDetail;
}
