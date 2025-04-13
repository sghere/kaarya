import { create } from "zustand";
import { User } from "../generated/prisma";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useUser = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUser;
