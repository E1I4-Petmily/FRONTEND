import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PetResponse } from "../apis/pet";

export interface Pet {
  petId: number;
  name: string;
  gender: string;
  birthDate: string;
  colorHex: string;
  petImageUrl: string;
}

interface PetListState {
  pets: PetResponse[];
  setPets: (pets: PetResponse[]) => void;
  clearPets: () => void;
}

export const usePetListStore = create<PetListState>()(
  persist(
    (set) => ({
      pets: [],
      setPets: (pets) => set({ pets }),
      clearPets: () => set({ pets: [] }),
    }),
    {
      name: "pet-list-storage", // localStorage key
    }
  )
);
