import { axiosInstance } from "./axios.ts";

export interface ReservationResponse {
  time: string;
  guardianName: string;
  petName: string;
  petType: string;
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
