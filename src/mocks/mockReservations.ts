import type { ReservationResponse } from "../apis/hospital-reservation";

export const MOCK_RESERVATIONS: ReservationResponse[] = [
  {
    time: "09:00",
    guardianName: "신짱구",
    petName: "흰둥이",
    petType: "개",
  },
  {
    time: "14:00",
    guardianName: "김철수",
    petName: "깜둥이",
    petType: "고양이",
  },
  {
    time: "19:00",
    guardianName: "한유리",
    petName: "모찌",
    petType: "햄스터",
  },
];
