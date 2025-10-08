import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/config/firebase";

type authState = {
  user: User | null;
  loading: boolean;
  setLoading: (data: boolean) => void;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<authState>((set) => ({
  user: null,
  loading: true,
  setLoading: (data) => set({ loading: data }),
  setUser: (user) => set({ user }),
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, loading: false });
});
