import React from "react";
import Home from "./pages/home";
import Newpost from "./pages/Newpost";
import Register from "./pages/register";
import Header from "./components/Header";
import Login from "./pages/login";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-dvh bg-green-400">
      <Header />
      <main className=""></main>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/newpost" element={<Newpost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
