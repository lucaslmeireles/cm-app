import { create } from 'zustand'

const useSelectedEmployees =create((set) => ({
    selectedRows: [],
    setSelectedRows: (rows) => set({ selectedRows: rows }),
    reset: (state) => set({ selectedRows: [] }),
  }));

export default  useSelectedEmployees