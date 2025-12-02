//일단 목데이터
export interface Hospital {
  placeId: string;
  name: string;
  address: string;
  rating: number | null;
  userRatingsTotal: number | null;
  registered: boolean; // 펫밀리 가입 여부
  treatTargets?: string[]; // 가입 병원의 진료 대상 태그 (강아지, 도마뱀 등)
}

const MOCK_HOSPITALS: Hospital[] = [
  {
    placeId: "ChIJTcRFwrRFezUR1vGaLdQdvdk",
    name: "24시 동탄시티 동물의료센터",
    address: "대한민국 경기도 화성시 동탄지성로 126 202호",
    rating: 3.8,
    userRatingsTotal: 19,
    registered: true,
    treatTargets: ["강아지", "도마뱀"],
  },
  {
    placeId: "ChIJx3KyejpEezUR1x9ygn5NNeU",
    name: "24시 동탄 윌 동물의료센터",
    address: "대한민국 경기도 화성시 반송동 93-9",
    rating: 3.3,
    userRatingsTotal: 7,
    registered: false, //가입 X
  },
  {
    placeId: "ChIJiS3OlJxFezUR16cczsz0XKk",
    name: "밴스 동물병원 (VANS)",
    address: "대한민국 화성시",
    rating: 4.8,
    userRatingsTotal: 26,
    registered: true,
    treatTargets: ["강아지"],
  },
];

export async function getHospitals(query: string): Promise<Hospital[]> {
  const trimmed = query.trim();

  if (!trimmed) {
    return Promise.resolve(MOCK_HOSPITALS);
  }

  const lower = trimmed.toLowerCase();

  const filtered = MOCK_HOSPITALS.filter(
    (h) =>
      h.name.toLowerCase().includes(lower) ||
      h.address.toLowerCase().includes(lower)
  );

  return Promise.resolve(filtered);
}
