import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/config/firebase";
import { getUserProfile, getUserResumes } from "@/store/firestore";

type AuthState = {
  user: User | null;
  profile: any | "";
  resumes: any[];
  loading: boolean;
  modal: boolean;

  setLoading: (data: boolean) => void;
  setUser: (user: User | null) => void;
  loadProfile: (profile: object | null) => void;
  loadResumes: (resumes: any[]) => void;
  setModal: (data: boolean) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: "",
  resumes: [],
  loading: true,
  modal: false,

  setLoading: (data) => set({ loading: data }),
  setUser: (user) => set({ user }),
  loadProfile: (profile) => set({ profile }),
  loadResumes: (resumes) => set({ resumes }),
  setModal: (data) => set({ modal: data }),
  clear: () => set({ user: null, profile: null, resumes: [] }),
}));

// Listen for auth changes
onAuthStateChanged(auth, async (user) => {
  const store = useAuthStore.getState();
  store.setLoading(true);

  if (user) {
    const profile = await getUserProfile(user.uid);
    const resumes = await getUserResumes(user.uid);
    

    useAuthStore.setState({
      user,
      profile,
      resumes,
      loading: false,
    });
  } else {
    store.clear();
    store.setLoading(false);
  }
});
