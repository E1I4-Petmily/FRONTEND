import { create } from "zustand";

interface RecordState {
  selectedPetId: number | null;
  setSelectedPetId: (id: number | null) => void;

  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;

  reopenPicker: boolean;
  setReopenPicker: (value: boolean) => void;
}

export const useRecordStore = create<RecordState>((set) => ({
  selectedPetId: null,
  setSelectedPetId: (id) => set({ selectedPetId: id }),

  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),

  reopenPicker: false,
  setReopenPicker: (value) => set({ reopenPicker: value }),
}));
