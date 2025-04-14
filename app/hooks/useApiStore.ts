import { create } from "zustand";
import { createAsyncFetch } from "../lib/utils";
import { Wallet } from "../generated/prisma";

export type StoreValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | object
  | ((...args: unknown[]) => unknown);

export interface ApiState {
  wallet?: Wallet;
  [key: string]: StoreValue; // To handle any dynamic data
  loading: boolean;
  error: string | null;
  fetchData: (url: string, dataKey?: string) => Promise<void>;
  setValue: (key: string, value: StoreValue) => void;
}

const useApiStore = create<ApiState>((set) => ({
  loading: false,
  error: null,
  fetchData: async () => {
    await createAsyncFetch(set, "wallet");
  },
  setValue: (key: string, value: StoreValue) => {
    set({ [key]: value });
  },
}));

export default useApiStore;
