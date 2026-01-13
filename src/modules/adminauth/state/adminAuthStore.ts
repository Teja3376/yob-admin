import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Admin {
  id: string;
  email: string;
  name: string;
}
interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  setUser: (user: Admin | null) => void;
  clearAuth: () => void;
}

export const useAuthStore1 = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,
      hasHydrated: false,

      setUser: (admin) =>
        set({
          admin,
          isAuthenticated: !!admin,
        }),

      clearAuth: () =>
        set({
          admin: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-session",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        admin: state.admin,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
