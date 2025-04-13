import { create } from "zustand";
import { createAsyncFetch } from "../lib/utils";

interface ApiState {
  [key: string]: any; // To handle any dynamic data
  loading: boolean;
  error: string | null;
  fetchData: (url: string, dataKey?: string) => Promise<void>;
}

const useApiStore = create<ApiState>((set) => ({
  loading: false,
  error: null,
  fetchData: async () => {
    await createAsyncFetch(set, "wallet");
  },
}));

export default useApiStore;
