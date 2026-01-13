"use client";

import React from "react";
import { Provider } from "react";
// import { useAuthStore } from "@/modules/identity-access/state/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Initialize auth on app startup
// export const initializeAuth = () => {
//   useAuthStore.getState().initializeAuth();
// };

const queryClient = new QueryClient();

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // React.useEffect(() => {
  //   initializeAuth();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
