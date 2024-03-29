import React from "react";
import styles from "./App.module.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <Header />
        <div style={{ height: "300px" }}> content</div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
