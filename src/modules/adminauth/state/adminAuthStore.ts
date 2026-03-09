import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type PermissionModule =
  | "issuers"
  | "spvs"
  | "assets"
  | "orders"
  | "investors"
  | "roles"
  |"members";

  type PermissionAction =
  | "view"
  | "review"
  | "action"

type Permissions = Record<string, Record<string, boolean>>;

interface Admin {
  id: string;
  email: string;
  name: string;
}
interface AuthState {
  admin: Admin | null
  permissions: Permissions | null

  isAuthenticated: boolean
  hasHydrated: boolean

  setUser: (user: Admin | null, permissions?: Permissions) => void
  clearAuth: () => void

  hasPermission: (module: PermissionModule, action: PermissionAction) => boolean
}

export const useAuthStore1 = create<AuthState>()(
  persist(
    (set, get) => ({
      admin: null,
      permissions: null,
      isAuthenticated: false,
      hasHydrated: false,

      setUser: (admin, permissions) =>
        set({
          admin,
          permissions: permissions || null,
          isAuthenticated: !!admin,
        }),

      clearAuth: () =>
        set({
          admin: null,
          permissions: null,
          isAuthenticated: false,
        }),

      hasPermission: (module: PermissionModule, action: PermissionAction) => {
        const { permissions, hasHydrated } = get();

        // While permissions are still loading / before hydration,
        // treat all modules as allowed so the sidebar is not disabled by default.
        if (!hasHydrated || !permissions) {
          return true;
        }

        return permissions?.[module]?.[action] === true;
      },
    }),
    {
      name: "auth-session",
      storage: createJSONStorage(() => sessionStorage),

      partialize: (state) => ({
        admin: state.admin,
        permissions: state.permissions,
        isAuthenticated: state.isAuthenticated,
      }),

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true
        }
      },
    }
  )
)
