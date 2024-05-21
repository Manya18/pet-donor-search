import React from "react";
import styles from "./startPage.module.css";

function Login() {
    const login = async () => {
        const emailField = document.getElementById('email') as HTMLInputElement;
        const passwordField = document.getElementById('password') as HTMLInputElement;
        const baseUrl = 'http://localhost:8080/api/login';
        const url = new URL(baseUrl);
        const email = emailField.value;
        const password = passwordField.value;
        url.searchParams.append('email', email);
        url.searchParams.append('password', password);
        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
                
            });
            if(!response.ok) {
                emailField.style.border = "2px solid red";
                passwordField.style.border = "2px solid red";
                const err = document.getElementById("error") as HTMLDivElement;
                err.hidden = false;
            }
            else {
                response.json().then(res => {
                    sessionStorage.setItem('userID', `${res.id}`);
                });
                window.location.href='/';
            }
        } catch(e) {
            console.log(e);
        }
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
                <div id="error" className={styles.error} hidden>Неверный логин или пароль</div>
            </div>
            <button className={styles.authoButton} type="button" onClick={login}>Войти</button>
        </form>
    );
  }
  
export default Login;