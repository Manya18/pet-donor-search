import React from "react";
import styles from "./App.module.css";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import HomePage from "./components/homePage/HomePage";

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
