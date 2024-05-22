import React, { useState, useEffect } from "react";
import styles from "./profilePage.module.css";
import Header from "components/common/header/Header";
import Footer from "components/common/footer/Footer";


interface Locality {
    id: number;
    locality_name: string;
};

interface Data {
    id: number|null;
    email: string|null;
    phone: string|null;
    tg_nickname: string|null;
    surname: string|null;
    name: string|null;
    patronymic: string|null;
    is_admin: boolean|null;
    locality_id: number|null
};

function ProfilePage() {
    const userID = sessionStorage.getItem('userID');

    const [userData, setUserData] = useState<Data|null>(null);
    const [localities, setLocalities] = useState<Locality[]>([]);
    const [selectedLocality, setSelectedLocality] = useState<number | null>(null);

    const emailField = document.getElementById('email') as HTMLInputElement;
    const phoneField = document.getElementById('phone') as HTMLInputElement;
    const tgNicknameField = document.getElementById('tg_nickname') as HTMLInputElement;
    const surnameField = document.getElementById('surname') as HTMLInputElement;
    const nameField = document.getElementById('name') as HTMLInputElement;
    const patronymicField = document.getElementById('patronymic') as HTMLInputElement;
    const localityField = document.getElementById('locality') as HTMLSelectElement;

    const editButtonDiv = document.getElementById('editButton') as HTMLDivElement;
    const saveAndCancelButtonDiv = document.getElementById('saveAndCancelButton') as HTMLDivElement;
    const errorDiv = document.getElementById('error') as HTMLDivElement;

    useEffect(() => {
        const getLocalities = async() => {
            const response = await fetch(`http://localhost:8080/api/localities`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const result: Locality[] = await response.json();
            setLocalities(result);
            console.log(localities);
        }
        
        const getUserData = async() => {
                const response = await fetch(`http://localhost:8080/api/user/${userID}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
                const result: Data = await response.json();
                setUserData(result);
                setSelectedLocality(result.locality_id);
                console.log(selectedLocality);
                console.log(userData);
        }

        getLocalities();
        getUserData();
    }, []);

    function editParams() {
        emailField.disabled = false;
        phoneField.disabled = false;
        tgNicknameField.disabled = false;
        surnameField.disabled = false;
        nameField.disabled = false;
        patronymicField.disabled = false;
        localityField.disabled = false;

        editButtonDiv.hidden = true;
        saveAndCancelButtonDiv.hidden = false;
    }

    function cancelUpdate() {
        emailField.disabled = true;
        phoneField.disabled = true;
        tgNicknameField.disabled = true;
        surnameField.disabled = true;
        nameField.disabled = true;
        patronymicField.disabled = true;
        localityField.disabled = true;

        editButtonDiv.hidden = false;
        saveAndCancelButtonDiv.hidden = true;
        errorDiv.hidden = true;
    }

    function exit() {
        sessionStorage.clear();
        window.location.href = '/';
    }

    const handleLocalityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocality(Number(event.target.value));
    }

    const updateUser = async(event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        const email = emailField.value;
        const phone = (phoneField.value.length > 0 ? phoneField.value : null);
        const tg_nickname = (tgNicknameField.value.length > 0 ? tgNicknameField.value : null);
        const surname = (surnameField.value.length > 0 ? surnameField.value : null);
        const name = (nameField.value.length > 0 ? nameField.value : null);
        const patronymic = (patronymicField.value.length > 0 ? patronymicField.value : null);
        const locality_id = (localityField.value !== '' ? Number(localityField.value) : null);
        const data = {
            email: email,
            phone: phone,
            tg_nickname: tg_nickname,
            surname: surname,
            name: name,
            patronymic: patronymic,
            locality_id: locality_id
        };
        event.preventDefault();

        if(form.checkValidity() === true) {
            try {
                const response = await fetch(`http://localhost:8080/api/user/${userID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if(!response.ok) {
                    errorDiv.hidden = false;
                }
                else {
                    window.location.reload();
                }
            } catch(e) {
                console.log(e);
            }
        }
    }

    return (
        <div>
            <div className={styles.content}>
                <Header/>
                <h1>Профиль</h1>
                <form onSubmit={updateUser}>
                    <div className={styles.info}>
                        <label>
                            Почта
                            <input id="email" type="email" defaultValue={userData?.email ?? ''}disabled required/>
                        </label>
                        <label>
                            Телефон (без кода страны)
                            <input className={styles.phone} id="phone" type="tel" defaultValue={userData?.phone ?? ''} pattern="[0-9]{10}" disabled/>
                        </label>
                        <label>
                            Ник в Telegram
                            <input id="tg_nickname" type="text" defaultValue={userData?.tg_nickname ?? ''} placeholder="@" disabled/>
                        </label>
                    </div>
                    <div className={styles.info}>
                        <label>
                            Фамилия
                            <input id="surname" type="text" defaultValue={userData?.surname ?? ''}disabled/>
                        </label>
                        <label>
                            Имя
                            <input id="name" type="text" defaultValue={userData?.name ?? ''}disabled/>
                        </label>
                        <label>
                            Отчество
                            <input id="patronymic" type="text" defaultValue={userData?.patronymic ?? ''}disabled/>
                        </label>
                    </div>
                    <div className={styles.info}>
                        <label>
                            Населенный пункт
                            <select id="locality" value={selectedLocality ?? ""} onChange={handleLocalityChange} disabled>
                                <option value=""></option>
                                {localities.map((locality) => (
                                    <option value={locality.id}>{locality.locality_name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div id="error" className={styles.error} hidden>Такая почта уже существует</div>
                    <div id="editButton">
                        <button className={styles.editButton} type="button" onClick={() => editParams()}>Редактировать</button>
                    </div>
                    <div id="saveAndCancelButton" hidden>
                        <button className={styles.editButton} type="submit">Сохранить</button>
                        <button className={styles.editButton} type="reset" onClick={() => cancelUpdate()}>Отмена</button>
                    </div>
                    <div>
                        <button className={styles.editButton} type="button" onClick={() => exit()}>Выход</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );

}

export default ProfilePage;