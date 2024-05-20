import React from "react";
import styles from "./startPage.module.css";

function Login() {
    const login = async () => {
        const emailField = document.getElementById('email') as HTMLInputElement;
        const passwordField = document.getElementById('password') as HTMLInputElement;
        const email = emailField.value;
        const password = passwordField.value;
        try {
            const response = await fetch(`http://localhost:8080/api/login?param=123`);
        } catch(e) {
            console.log(e);
        }
        // console.log(response);
    }
    return (
        <form>
            <h1>Вход</h1>
            <div className={styles.info}>
                <label>
                    Почта
                    <input id="email" type="text" required/>
                </label>
                <label>
                    Пароль
                    <input id="password" type="password" required/>
                </label>
            </div>
            <button className={styles.authoButton} type="button" onClick={login}>Войти</button>
        </form>
    );
  }
  
export default Login;