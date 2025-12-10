import { axiosInstance } from "./axios.ts";

export interface ReservationResponse {
  time: string;
  guardianName: string;
  petName: string;
  petType: string;
  reportPdfUrl: string;
}

export const getReservationsByDate = async (date: string) => {
  const res = await axiosInstance.get<ReservationResponse[]>(
    "/api/v1/hospitals/me/appointments",
    {
      params: { date },
    }
  );
  console.log("[getReservationsByDate] 응답 데이터:", res.data);
  return res.data;
};

export interface CreateReservationRequest {
  hospitalProfileId: number;
  startAt: string;
  petType: string;
  petName: string;
  reportAgree: string;
  reportId?: number | null; //첨부 리포트 선택 시 포함
}

// 예약 생성 API
export const createReservation = async (data: CreateReservationRequest) => {
  const res = await axiosInstance.post("/api/v1/appointments", data);
  return res.data;
};
