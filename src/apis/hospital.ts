import { axiosInstance } from "./axios";

export interface HospitalSearchResult {
  placeId: string;
  name: string;
  address: string;
}

export const searchHospitals = async (
  query: string
): Promise<HospitalSearchResult[]> => {
  const res = await axiosInstance.get("/api/v1/hospitals/register/search", {
    params: { q: query },
  });

  return res.data; // 배열 그대로 반환됨
};
