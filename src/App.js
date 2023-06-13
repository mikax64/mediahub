import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import DashboardMovies from "./components/DashboardMovies.js";

function App() {
  return (
    <>
      <BrowserRouter>


        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/movies" element={<DashboardMovies />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
