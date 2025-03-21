import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  userType: "admin" | "student" | "faculty" | null;
  name: string;
  authToken: string;
  id: string;
  profileImage: string | null;
  setUserType: (userType: "admin" | "student" | "faculty" | null) => void;
  setName: (name: string) => void;
  setAuthToken: (authToken: string) => void;
  setId: (id: string) => void;
  setProfileImage: (profileImageUrl: string) => void;
  reset: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userType: null,
      name: "",
      authToken: "",
      id: "",
      profileImage: "",
      setUserType: (userType: "admin" | "student" | "faculty" | null) =>
        set(() => ({ userType })),
      setName: (name: string) => set(() => ({ name })),
      setAuthToken: (authToken: string) => set(() => ({ authToken })),
      setId: (id: string) => set(() => ({ id })),
      setProfileImage: (profileImageUrl: string) =>
        set(() => ({ profileImage: profileImageUrl })),
      reset: () =>
        set(() => ({ userType: null, name: "", authToken: "", id: "" })),
    }),
    {
      name: "auth-storage", // The key under which the state will be stored in localStorage
    }
  )
);

export default useAuthStore;
