import { axiosInstance } from "./axios";

//반려동물 목록 조회 api
export interface PetResponse {
  petId: number;
  name: string;
  gender: string;
  birthDate: string;
  petImageUrl: string;
}

export async function getPetList() {
  const res = await axiosInstance.get<PetResponse[]>("/api/v1/pets");
  return res.data;
}
