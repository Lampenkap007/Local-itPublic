import React from "react";
import Sidebar from "../components/sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard";
import "./../styles/home.scss";
import Settings from "../components/settings";
import Project from "../components/project";
import New_project from "../components/new_project";
import Profile from "../components/profile";

const Home = () => {
  if (localStorage.getItem("userId") === null) {
    window.open("/login", "_self");
  }

  return (
    <div className="home">
      <Sidebar />

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new_project" element={<New_project />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Home;
