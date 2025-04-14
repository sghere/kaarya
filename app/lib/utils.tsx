/* eslint-disable */
import axios from "axios";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { apiUrls } from "./apiUrls";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalize = (value: string) =>
  value[0].toUpperCase() + value.slice(1);

export const createAsyncFetch = async (set: any, key: string = "wallet") => {
  const { dataKey, url } = apiUrls[key];
  set({ loading: true, error: null });

  try {
    const response = await axios.get(url); // Dynamically use the provided URL
    set({ [dataKey]: response.data, loading: false }); // Dynamically set response data
  } catch (error: any) {
    set({ error: error.message, loading: false });
  }
};
