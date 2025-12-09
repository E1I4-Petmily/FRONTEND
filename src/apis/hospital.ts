import { axiosInstance } from "./axios";

//병원 검색 api
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

  return res.data;
};

//병원 회원가입 api
export interface HospitalRegisterRequest {
  username: string;
  password: string;
  nickname: string;
  userProfile: number;
  managerName: string;
  managerPhone: string;
  hospitalName: string;
  representativeName: string;
  address: string;
  animalTypes: string;
  departments: string;
  businessHours: string;
  placeId: string;
}

//POST 요청
export const registerHospital = async (body: HospitalRegisterRequest) => {
  const res = await axiosInstance.post("/api/v1/auth/hospitals/register", body);
  return res.data;
};
