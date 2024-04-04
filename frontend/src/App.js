import React from "react";
import "./App.css";
import Settings from "./component/Settings";
import Startup from "./component/Startup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Startup />} />
          <Route path="setting" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
