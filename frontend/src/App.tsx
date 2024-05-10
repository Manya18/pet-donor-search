import React from "react";
import styles from "./App.module.css";
import HomePage from "pages/homePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnnouncePage from "pages/announcePage/AnnouncePage";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/announcements" element={<AnnouncePage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
