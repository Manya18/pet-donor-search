import React from "react";
import styles from "./App.module.css";
import HomePage from "pages/homePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnnouncePage from "pages/announcePage/AnnouncePage";
import StartPage from "pages/startPage/StartPage";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/announcements" element={<AnnouncePage />} />
        <Route path="/start" element={<StartPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
