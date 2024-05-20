import React from "react";
import styles from "./startPage.module.css";

function Registartion() {
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
            </div>
            <button className={styles.authoButton} type="submit">Зарегистрироваться</button>
        </form>
    );
  }
  
export default Registartion;