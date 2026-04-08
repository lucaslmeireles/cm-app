import { create } from "zustand";

const useGrade = create((set, get) => ({
  grades: [],
  addGrade: (grade) => set(() => ({ grades: [...get().grades, grade] })),
  removeGrade: (id) =>
    set((state) => state.grades.filter((grade) => grade.id !== id)),
  reset: () => set(() => ({ grades: [] })),
}));

export default useGrade;
