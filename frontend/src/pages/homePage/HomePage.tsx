import React from "react";
import styles from "./HomePage.module.css";
import Header from "components/common/header/Header";
import Home from "components/homePage/HomePage";
import Footer from "components/common/footer/Footer";

function HomePage() {
  return (
    <div className={styles.homePage}>
      <div className={styles.content}>
        <Header />
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
