export interface PetLog {
  weight?: number;
  behavior?: string[];
  appearance?: string[];
  physiological?: string[];
}

export type PetLogsByDate = Record<
  string, // YYYY-MM-DD
  Record<number, PetLog> // number: perId
>;

export interface PetDailyRecord {
  date: string; // YYYY-MM-DD
  petId: number;
  weight?: number;

  behavior?: string[];
  appetite?: string[];

  skin?: string[];
  wound?: string[];

  poop?: string[];
  breath?: string[];
}

export interface SymptomLog {
  id: number;
  petId: number;
  date: string; // YYYY-MM-DD
  records: {
    category: string;
    detail: string;
  }[];
}
