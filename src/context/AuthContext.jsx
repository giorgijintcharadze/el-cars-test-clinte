import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { fetchCurrentUser, loginUser, logoutUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // ✅ აქ უნდა განისაზღვროს login და logout, არა გარეთ
  const login = async (credentials) => {
    await loginUser(credentials);
    await queryClient.invalidateQueries(["auth", "me"]); // typo直ება
  };

  const logout = async () => {
    await logoutUser();
    queryClient.setQueryData(["auth", "me"], null);
    queryClient.removeQueries(["auth", "me"]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingAuth: isLoading,
        isAuthError: isError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ custom hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
