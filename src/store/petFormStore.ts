import { create } from "zustand";
import type { PetForm } from "../types/pet";

interface PetFormState {
  petInfo: PetForm;
  setPhoto: (photo: PetForm["photo"]) => void;
  setName: (name: string) => void;
  setBirth: (birthday: PetForm["birthday"]) => void;
  setGender: (gender: PetForm["gender"]) => void;
  setColor: (color: string) => void;
  resetPetForm: () => void;
}

export const usePetFormStore = create<PetFormState>((set) => ({
  petInfo: {
    photo: null,
    name: "",
    birthday: { year: null, month: null, day: null },
    gender: "",
    color: "",
  },
  setPhoto: (photo) =>
    set((state) => ({ petInfo: { ...state.petInfo, photo } })),
  setName: (name) => set((state) => ({ petInfo: { ...state.petInfo, name } })),
  setBirth: (birthday) =>
    set((state) => ({ petInfo: { ...state.petInfo, birthday } })),
  setGender: (gender) =>
    set((state) => ({ petInfo: { ...state.petInfo, gender } })),
  setColor: (color) =>
    set((state) => ({ petInfo: { ...state.petInfo, color } })),
  resetPetForm: () =>
    set({
      petInfo: {
        photo: null,
        name: "",
        birthday: { year: null, month: null, day: null },
        gender: "",
        color: "",
      },
    }),
}));
