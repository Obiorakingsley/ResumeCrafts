import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/config/firebase";

type authState = {
  user: User | null;
  loading: boolean;
  modal: boolean;
  setLoading: (data: boolean) => void;
  setUser: (user: User | null) => void;
  setModal: (data: boolean) => void;
};

export const useAuthStore = create<authState>((set) => ({
  user: null,
  loading: true,
  modal: false,

  setLoading: (data) => set({ loading: data }),
  setUser: (user) => set({ user }),

  setModal: (data: boolean) => {
    set(() => ({ modal: data }));
  },
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, loading: false });
});
