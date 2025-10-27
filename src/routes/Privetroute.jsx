import { Navigate } from "react-router-dom";

const Privetroute = ({ Children }) => {
  const { user, isLoadingAuth } = useAuth();

  if (isLoadingAuth) return <div>loading...</div>;

  return user ? Children : <Navigate to="/login" replace />;
};

export default Privetroute;
