import React from "react";
import styles from "./App.module.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/homePage/HomePage";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <Header />
        <HomePage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
