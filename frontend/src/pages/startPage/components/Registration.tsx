import React from "react";
import styles from "./startPage.module.css";

function Registartion() {
    const createUser = async () => {
        const emailField = document.getElementById('email') as HTMLInputElement;
        const passwordField = document.getElementById('password') as HTMLInputElement;
        const againPasswordField = document.getElementById('again-password') as HTMLInputElement;
        const email = emailField.value;
        const password = passwordField.value;
        const againPassword = againPasswordField.value;
        const data = {
            email: email,
            password: password
        };

        if(password === againPassword && email.length !== 0 && password.length !== 0) {
            try {
                const response = await fetch('http://localhost:8080/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if(!response.ok) {
                    emailField.style.border = '2px solid red';
                    passwordField.style.border = '2px solid red';
                    againPasswordField.style.border = '2px solid red';
                    const err = document.getElementById("error") as HTMLDivElement;
                    err.hidden = false;
                }
                else {
                    response.json().then(res => {
                        sessionStorage.setItem('userID', `${res.id}`);
                    });
                    window.location.href='/';
                }
            } catch (e) {
                console.log(e);
            }
        }
        else {
            emailField.style.border = '2px solid red';
            passwordField.style.border = '2px solid red';
            againPasswordField.style.border = '2px solid red';
            const err = document.getElementById("error") as HTMLDivElement;
            err.hidden = false;
        }
    }

    return (
        <form>
            <h1>Регистрация</h1>
            <div className={styles.info}>
                <label>
                    Почта
                    <input id="email" type="text" required/>
                </label>
                <label>
                    Пароль
                    <input id="password" type="password" required/>
                </label>
                <label>
                    Повторите пароль
                    <input id="again-password" type="password" required/>
                </label>
                <div className={styles.error} id="error" hidden>Ошибка регистрации</div>
            </div>
            <button className={styles.authoButton} type="button" onClick={createUser}>Зарегистрироваться</button>
        </form>
    );
  }
  
export default Registartion;