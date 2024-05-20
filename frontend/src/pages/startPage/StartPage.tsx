import React, { useState } from "react";
import styles from "./components/startPage.module.css";
import Login from "./components/Login";
import Registartion from "./components/Registration";

function StartPage() {
    const [isLogin, setIsLogin] = useState(true);
    function changeForm(value: boolean) {
        setIsLogin(value);
    }

    return (
        <div className={styles.startForm}>
            <div className={styles.menu}>
                <button className={styles.propButton} onClick={() => changeForm(true)}>Вход</button>
                <button className={styles.propButton} onClick={() => changeForm(false)}>Регистрация</button>
            </div>
            {isLogin ? (
                <Login/>
            ) : (
                <Registartion/>
            )}
        </div>
    );
  }
  
  export default StartPage;
