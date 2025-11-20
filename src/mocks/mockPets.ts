import type { Pet } from "../types/pet";
import type { SymptomLog } from "../types/pet-log";

export const MOCK_PETS: Pet[] = [
  {
    id: 1,
    photo: "/images/pet1.png",
    name: "콩이",
    birthday: "2020-05-10",
    gender: "암컷",
    color: "#00C7AE",
  },
  {
    id: 2,
    photo: "/images/pet2.png",
    name: "초코",
    birthday: "2019-11-23",
    gender: "수컷",
    color: "#FFC107",
  },
  {
    id: 3,
    photo: "/images/pet3.png",
    name: "보리",
    birthday: "2021-02-15",
    gender: "중성화",
    color: "#FF5252",
  },
];

export const MOCK_LOGS: SymptomLog[] = [
  {
    id: 1,
    petId: 1,
    date: "2025-09-19",
    records: [
      { category: "행동 식습관", detail: "무기력, 밥 거부" },
      { category: "외형이상", detail: "가려움, 물집" },
    ],
  },
  {
    id: 2,
    petId: 2,
    date: "2025-09-19",
    records: [{ category: "외형이상", detail: "가려움, 물집" }],
  },
  {
    id: 3,
    petId: 1,
    date: "2025-09-04",
    records: [{ category: "행동", detail: "활발함" }],
  },
  {
    id: 4,
    petId: 2,
    date: "2025-09-04",
    records: [{ category: "식습관", detail: "간식 거부" }],
  },
  {
    id: 5,
    petId: 3,
    date: "2025-09-05",
    records: [{ category: "기타", detail: "그루밍 과다" }],
  },
];
