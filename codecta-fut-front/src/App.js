import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Players from "./components/Players/Players";
import Teams from "./components/Teams/Teams";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Players />} />
            <Route path="/players" element={<Players />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
