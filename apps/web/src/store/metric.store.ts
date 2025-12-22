import { fetchAllGradesByEmployee } from "@/fetch/grade/fetchAllGradesByEmployee";
import { Metric } from "@/types/metric.type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create((set, get) => ({
  metrics: [],
  addMetric: (metric: Metric) =>
    set(() => ({ metrics: [...get().metrics, metric] })),
  fetch: async (id: string) => {
    const data = await fetchAllGradesByEmployee(id);
    console.log("Store", data);
    set(() => ({ metrics: data }));
  },
  removeMetric: (id: string) =>
    set((state) => state.metrics.filter((metric: Metric) => metric.id !== id)),
  reset: () => set(() => ({ metrics: [] })),
}));

export default useStore;
