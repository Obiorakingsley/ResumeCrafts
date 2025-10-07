import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/config/firebase";

type authState = {
  user: User | null;
  loading: boolean;
  setLoading: (data: boolean) => void;
};

export const useAuthStore = create<authState>((set) => ({
  user: null,
  loading: false,

  setLoading: (data) => {
    set(() => ({ loading: data }));
  },
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, loading: false });
});
