import { Children } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const Publiceroute = ({ Children }) => {
  const { user, isLoadingAuth } = useAuth();

  if (isLoadingAuth) return <div>loading...</div>;

  return !user ? Children : <Navigate to="/" replace />;
};
export default Publiceroute;
