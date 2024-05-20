import React from "react";
import styles from "./App.module.css";
import HomePage from "pages/homePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnnouncePage from "pages/announcePage/AnnouncePage";
import StartPage from "pages/startPage/StartPage";
import AnnouncementDetails from "pages/announcementDetails/AnnouncementDetails";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/announcements" element={<AnnouncePage />} />
          <Route path="/announcement/:id" element={<AnnouncementDetails />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
