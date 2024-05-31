import React, { useState, useEffect } from "react";
import styles from "./profilePage.module.css";
import Header from "components/common/header/Header";
import Footer from "components/common/footer/Footer";
import Modal from "react-modal";


interface Locality {
    id: number;
    locality_name: string
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

interface organisationID {
    id: number;
};

interface PetType {
    id: number;
    pet_name: string
};

interface BloodType {
    id: number;
    blood_type: string
};

interface Breed {
    id: number;
    breed_name: string
};

interface PetData {
    id: number;
    user_id: number;
    pet_type_id: number;
    blood_type_id: number;
    pet_name: string;
    breed_id: number;
    photo_url: string|null
};

function ProfilePage() {
    const userID = sessionStorage.getItem('userID');
    const orgID = sessionStorage.getItem('organisationID');

    const [userData, setUserData] = useState<Data|null>(null);
    const [petsData, setPetsData] = useState<PetData[]>([]);
    const [petData, setPetData] = useState<PetData|null>();
    const [localities, setLocalities] = useState<Locality[]>([]);
    const [selectedLocality, setSelectedLocality] = useState<number | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [petModalIsOpen, setPetModalIsOpen] = useState(false);
    const [petTypes, setPetTypes] = useState<PetType[]>([]);
    const [selectedPetType, setSelectedPetType] = useState<number|null>(null);
    const [bloodTypes, setBloodTypes] = useState<BloodType[]>([]);
    const [selectedBloodType, setSelectedBloodType] = useState<number|null>(null);
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<number|null>(null);

    const emailField = document.getElementById('email') as HTMLInputElement;
    const phoneField = document.getElementById('phone') as HTMLInputElement;
    const tgNicknameField = document.getElementById('tg_nickname') as HTMLInputElement;
    const surnameField = document.getElementById('surname') as HTMLInputElement;
    const nameField = document.getElementById('name') as HTMLInputElement;
    const patronymicField = document.getElementById('patronymic') as HTMLInputElement;
    const localityField = document.getElementById('locality') as HTMLSelectElement;

    const petTypeField = document.getElementById('pet_type') as HTMLSelectElement;
    const bloodTypeField = document.getElementById('blood_type') as HTMLSelectElement;
    const petNameField = document.getElementById('pet_name') as HTMLInputElement;
    const breedField = document.getElementById('breed') as HTMLSelectElement;
    const photoField = document.getElementById('pet_photo') as HTMLInputElement;

    const editButtonDiv = document.getElementById('editButton') as HTMLDivElement;
    const saveAndCancelButtonDiv = document.getElementById('saveAndCancelButton') as HTMLDivElement;
    const errorDiv = document.getElementById('error') as HTMLDivElement;

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        window.location.reload();
    };

    const openPetModal = (event: React.MouseEvent<HTMLDivElement>) => {
        setPetModalIsOpen(true);
        const petDiv = event.currentTarget as HTMLElement;
        const petID = petDiv.id;

        const getPetData = async() => {
            const response = await fetch(`http://localhost:8080/api/pet/${petID}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const result: PetData = await response.json();
            setPetData(result);
        }

        getPetData();
    };

    useEffect(() => {
        if (petData) {
            setSelectedPetType(Number(petData?.pet_type_id));
            setSelectedBreed(Number(petData?.breed_id));
            setSelectedBloodType(Number(petData?.blood_type_id));
        }
    }, [petData]);

    const closePetModal = () => {
        setPetModalIsOpen(false);
        window.location.reload();
    };

    const getOrganisationID = async() => {
        const response = await fetch(`http://localhost:8080/api/organisationID/${userID}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const result: organisationID = await response.json();
        console.log(result);
        if(result) {
            sessionStorage.setItem('organisationID', result.id.toString());
            window.location.href = '/';
        }
    }

    const removeOrganisationID = () => {
        sessionStorage.removeItem('organisationID');
        window.location.href = '/';
    }

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

        const getPetTypes = async() => {
            const response = await fetch(`http://localhost:8080/api/petTypes`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const result: PetType[] = await response.json();
            setPetTypes(result);
            console.log(petTypes);
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

        const getPetsData = async() => {
            const response = await fetch(`http://localhost:8080/api/pets/${userID}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const result: PetData[] = await response.json();
            setPetsData(result);
            console.log(petsData);
    }

        getLocalities();
        getUserData();
        getPetTypes();
        getPetsData();
    }, []);

    useEffect(() => {
        const getBreeds = async() => {
            if(selectedPetType !== null) {
                const response = await fetch(`http://localhost:8080/api/breeds/${selectedPetType}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
                const result: Breed[] = await response.json();
                setBreeds(result);
                console.log(result);
            }
        };

        getBreeds();
    }, [selectedPetType]);

    useEffect(() => {
        const getBloodTypes = async() => {
            if(selectedPetType !== null) {
                const response = await fetch(`http://localhost:8080/api/bloodTypes/${selectedPetType}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
                const result: BloodType[] = await response.json();
                setBloodTypes(result);
                console.log(result);
            }
        };

        getBloodTypes();
    }, [selectedPetType]);

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

    const handlePetTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPetType(Number(event.target.value));
    }
    
    const handleBloodTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBloodType(Number(event.target.value));
    }

    const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreed(Number(event.target.value));
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

    const addPet = async(event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        const pet_type_id = petTypeField.value;
        const blood_type_id = bloodTypeField.value;
        const pet_name = petNameField.value;
        const breed_id = breedField.value;
        const photo_url = (photoField.value.length > 0 ? photoField.value : null);
        const data = {
            user_id: userID,
            pet_type_id: pet_type_id,
            blood_type_id: blood_type_id,
            pet_name: pet_name,
            breed_id: breed_id,
            photo_url: photo_url
        };
        event.preventDefault();

        if(form.checkValidity() === true) {
            try {
                const response = await fetch(`http://localhost:8080/api/pet`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                window.location.reload();
            } catch(e) {
                console.log(e);
            }
        }
    }

    const updatePet = async(event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        const pet_type_id = petTypeField.value;
        const blood_type_id = bloodTypeField.value;
        const pet_name = petNameField.value;
        const breed_id = breedField.value;
        const photo_url = (photoField.value.length > 0 ? photoField.value : null);
        const data = {
            pet_type_id: pet_type_id,
            blood_type_id: blood_type_id,
            pet_name: pet_name,
            breed_id: breed_id,
            photo_url: photo_url
        };
        event.preventDefault();

        if(form.checkValidity() === true) {
            try {
                const response = await fetch(`http://localhost:8080/api/pet/${petData?.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                window.location.reload();
            } catch(e) {
                console.log(e);
            }
        }
    }

    const deletePet = async() => {
        const response = await fetch(`http://localhost:8080/api/pet/${petData?.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.reload();
    }

    const modalContent = (
        <form onSubmit={addPet}>
            <h1 className={styles.modalInfo}>Информация о вашем питомце</h1>
                <label>
                    Вид животного
                    <select id="pet_type" value= {selectedPetType ?? ""} onChange={handlePetTypeChange} required>
                        <option value=""></option>
                        {petTypes.map((petType) => (
                            <option value={petType.id}>{petType.pet_name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Порода
                    <select id="breed" value= {selectedBreed ?? ""} onChange={handleBreedChange} required>
                        <option value=""></option>
                        {breeds.map((breed) => (
                            <option value={breed.id}>{breed.breed_name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Группа крови
                    <select id="blood_type" value= {selectedBloodType ?? ""} onChange={handleBloodTypeChange} required>
                        <option value=""></option>
                        {bloodTypes.map((bloodType) => (
                            <option value={bloodType.id}>{bloodType.blood_type}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Имя
                    <input id="pet_name" type="text" required/>
                </label>
                <label>
                    Фото питомца (URL)
                    <input id="pet_photo" type="text"/>
                </label>
                <button className={styles.editButton} type="submit">Добавить</button>
        </form>
    );

    const modalPetContent = (
        <form onSubmit={updatePet}>
            <h1 className={styles.modalInfo}>Информация о вашем питомце</h1>
                <label>
                    Вид животного
                    <select id="pet_type" value= {selectedPetType ?? ""} onChange={handlePetTypeChange} required>
                        <option value=""></option>
                        {petTypes.map((petType) => (
                            <option value={petType.id}>{petType.pet_name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Порода
                    <select id="breed" value= {selectedBreed ?? ""} onChange={handleBreedChange} required>
                        <option value=""></option>
                        {breeds.map((breed) => (
                            <option value={breed.id}>{breed.breed_name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Группа крови
                    <select id="blood_type" value= {selectedBloodType ?? ""} onChange={handleBloodTypeChange} required>
                        <option value=""></option>
                        {bloodTypes.map((bloodType) => (
                            <option value={bloodType.id}>{bloodType.blood_type}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Имя
                    <input id="pet_name" type="text" defaultValue={petData?.pet_name} required/>
                </label>
                <label>
                    Фото питомца (URL)
                    <input id="pet_photo" type="text" defaultValue={petData?.photo_url?.toString()}/>
                </label>
                <img className={styles.petPhoto} alt="pet" src={petData?.photo_url?.toString()}/>
                <button className={styles.editButton} type="submit">Сохранить изменения</button>
                <button className={styles.editButton} type="button" onClick={deletePet}>Удалить питомца</button>
        </form>
    );

    return (
        <div>
            <div className={styles.content}>
                <Header/>
                {orgID ? (
                <div>
                    <button className={styles.rightButton} onClick={removeOrganisationID}>Войти как пользователь</button>
                </div>
                ) : (
                <div>
                    <button className={styles.rightButton} onClick={getOrganisationID}>Войти как организация</button>
                </div>
                )}

                <h1>Личные данные</h1>
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
                <button className={styles.rightButton} onClick={() => openModal()}>Добавить питомца</button>
                <h1>Мои питомцы</h1>
                <div className={styles.pets}>
                    {petsData.map((pet) => (
                    <div className={styles.petCard} id={pet.id.toString()} onClick={openPetModal}>
                        <img className={styles.petImg} alt="pet" src={pet.photo_url?.toString()}/>
                        <label className={styles.petName}>{pet.pet_name}</label>
                    </div>                    
                    ))}
                </div>
            </div>
            <Footer/>
            <Modal
                style={{
                content: { width: "500px", marginLeft: "auto", marginRight: "auto" },
                }}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                {modalContent}
            </Modal>
            <Modal
                style={{
                content: { width: "500px", marginLeft: "auto", marginRight: "auto" },
                }}
                isOpen={petModalIsOpen}
                onRequestClose={closePetModal}
            >
                {modalPetContent}
            </Modal>
        </div>
    );

}

export default ProfilePage;