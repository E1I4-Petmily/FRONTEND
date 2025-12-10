import { axiosInstance } from "./axios";
import type { PetForm } from "../types/pet";

//반려동물 목록 조회 api
export interface PetResponse {
  petId: number;
  name: string;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
  birthDate: string;
  colorHex: string;
  petImageUrl: string;
}

export interface RecordUpdateRequest {
  date: string;
  weight?: number | null;
  memo?: string | null;
  behavior?: string[];
  appearance?: string[];
  reaction?: string[];
}

export interface PetRecordResponse {
  date: string;
  petName: string;
  petColor: string;
}

export interface DailyPetRecordResponse {
  date: string;
  pets: {
    petId: number;
    name: string;
    color: string;
    weight: number | null;
    behavior: string[];
    appearance: string[];
    reaction: string[];
  }[];
}

export async function getPetList() {
  const res = await axiosInstance.get<PetResponse[]>("/api/v1/pets");
  return res.data;
}

export async function registerPet(petInfo: PetForm) {
  const formData = new FormData();

  const genderType: Record<string, string> = {
    수컷: "MALE",
    암컷: "FEMALE",
    중성화: "UNKNOWN",
  };

  // requestDto 생성
  const requestDto = {
    name: petInfo.name,
    gender: genderType[petInfo.gender],
    birthDate: `${petInfo.birthday.year}-${String(petInfo.birthday.month).padStart(2, "0")}-${String(
      petInfo.birthday.day
    ).padStart(2, "0")}`,
    colorHex: petInfo.color,
  };

  formData.append(
    "requestDto",
    new Blob([JSON.stringify(requestDto)], { type: "application/json" })
  );

  // petImage (파일)
  if (petInfo.photo) {
    formData.append("petImage", petInfo.photo);
  }

  return axiosInstance.post("/api/v1/pets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//반려동물 삭제 API
export async function deletePet(petId: number) {
  return axiosInstance.delete(`/api/v1/pets/${petId}`);
}

export const updatePetRecord = async (
  petId: number,
  data: RecordUpdateRequest
) => {
  const res = await axiosInstance.post(`/api/v1/pets/${petId}/entries`, data);
  return res.data;
};

export async function getMonthlyRecords(year: number, month: number) {
  const res = await axiosInstance.get(`/api/v1/entries`, {
    params: { year, month },
  });
  console.log("📅 [API] 월별 기록 조회:", res.data);
  return res.data as PetRecordResponse[];
}

export const getDailyRecords = async (
  date: string
): Promise<DailyPetRecordResponse> => {
  const res = await axiosInstance.get("/api/v1/entries/detail", {
    params: { date },
  });
  return res.data;
};
