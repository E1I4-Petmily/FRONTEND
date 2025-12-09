import { axiosInstance } from "../apis/axios";

export interface Hospital {
  placeId: string;
  name: string;
  address: string;
  rating: number | null;
  userRatingsTotal: number | null;
  openNow: boolean | null;
  types: string[] | null;
  registered: boolean;
  hospitalAccountId: number | null;
  animalTypes: string[] | null;
}

export async function getHospitals(query: string): Promise<Hospital[]> {
  try {
    const trimmed = query.trim();

    //기본 검색어 지정
    const searchKeyword = trimmed.length > 0 ? trimmed : "동물";

    const response = await axiosInstance.get<Hospital[]>("/api/v1/hospitals", {
      params: { q: searchKeyword },
    });

    return response.data;
  } catch (error) {
    console.error("병원 리스트 조회 오류:", error);
    return [];
  }
}
