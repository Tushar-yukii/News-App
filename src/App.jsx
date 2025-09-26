import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [mode, setMode] = useState("light");

  // Toggle mode function
  const togglemode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#121212"; // dark background
      document.body.style.color = "white"; // light text
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white"; // light background
      document.body.style.color = "black"; // dark text
    }
  };

  return (
    <>
      <Navbar togglemode={togglemode} mode={mode} />
      <div>
        <Routes>
          <Route
            path="/"
            element={<News key="general" country="us" category="general" />}
          />
          <Route
            path="/business"
            element={<News key="business" country="us" category="business" />}
          />
          <Route
            path="/entertainment"
            element={
              <News key="entertainment" country="us" category="entertainment" />
            }
          />
          <Route
            path="/general"
            element={<News key="general" country="us" category="general" />}
          />
          <Route
            path="/health"
            element={<News key="health" country="us" category="health" />}
          />
          <Route
            path="/science"
            element={<News key="science" country="us" category="science" />}
          />
          <Route
            path="/sports"
            element={<News key="sports" country="us" category="sports" />}
          />
          <Route
            path="/technology"
            element={
              <News key="technology" country="us" category="technology" />
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
