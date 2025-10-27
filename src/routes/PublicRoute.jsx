import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, isLoadingAuth } = useAuth();

  if (isLoadingAuth) return <div>Loading...</div>;

  return !user ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
