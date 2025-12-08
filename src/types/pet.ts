export type Gender = "수컷" | "암컷" | "중성화";

// 실제 DB에 등록될 반려동물 정보
export interface Pet {
  id: number;
  photo: string;
  name: string;
  birthday: string; // YYYY-MM-DD
  gender: Gender;
  color: string;
}

// 사용자가 입력할 정보
export interface PetForm {
  photo: File | null;
  name: string;
  birthday: {
    year: string | null;
    month: string | null;
    day: string | null;
  };
  gender: Gender | "";
  color: string;
}
