import { axiosInstance } from "./axios";

export interface PetUpdateRequest {
  name: string;
  gender: string; // "MALE" | "FEMALE" | "NEUTERED"
  birthDate: string; // "2023-01-01"
}

export async function petEdit(
  petId: number,
  requestDto: PetUpdateRequest,
  petImage?: File
) {
  const formData = new FormData();

  formData.append(
    "requestDto",
    new Blob([JSON.stringify(requestDto)], { type: "application/json" })
  );

  if (petImage) {
    formData.append("petImage", petImage);
  }

  const response = await axiosInstance.patch(
    `/api/v1/pets/${petId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
