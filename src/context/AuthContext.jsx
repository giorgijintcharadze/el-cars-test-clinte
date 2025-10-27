// AuthContext.jsx
import { createContext, useContext } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser, logoutUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Load user from backend
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes // cache user for 5 mins
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear user cache immediately
      queryClient.setQueryData(["auth", "me"], null);
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
      toast.success("Logged out successfully!", { position: "bottom-left" });
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error?.message || "Logout failed", {
        position: "bottom-left",
      });
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingAuth: isLoading,
        isAuthError: isError,
        logout,
        isLoggingOut: logoutMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
