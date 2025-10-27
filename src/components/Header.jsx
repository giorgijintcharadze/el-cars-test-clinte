import React from "react";
import { useAuth } from "../context/authContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { user, isLoadingAuth } = useAuth();
  return (
    <div>
      <NavLink to="/home">home</NavLink>
      <NavLink to="/login">login</NavLink>
      <NavLink to="/register">register</NavLink>
      <NavLink to="/new">newpost</NavLink>
    </div>
  );
};

export default Header;
