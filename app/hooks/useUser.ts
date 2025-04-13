import { create } from "zustand";
import { User } from "../generated/prisma";

interface LoginModalStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useLoginModal;
