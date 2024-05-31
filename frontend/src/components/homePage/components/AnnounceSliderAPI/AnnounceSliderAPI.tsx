import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUrgency, postAnnounceData, fetchAnimalTypes, fetchBloodTypes } from 'utils/announceApi';
import { AnnounceType } from '../../../../types/AnnounceType';
import AnimalCard from '../../../announcePage/components/animalCard/AnimalCard';
import styles from './AnnounceSliderAPI.module.css';
import Modal from "react-modal";
import { AnimalType } from '../../../../types/AnimalType';
import { BloodType } from '../../../../types/BloodType';

const AnnounceSlider = () => {
    const orgID = sessionStorage.getItem('organisationID');
    const navigate = useNavigate();

    const [data, setData] = useState<AnnounceType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [announceText, setAnnounceText] = useState("");
    const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
    const [bloodTypes, setBloodTypes] = useState<BloodType[]>([]);
    const [selectedAnimalType, setSelectedAnimalType] = useState("");
    const [selectedBloodType, setSelectedBloodType] = useState("");
    const [petName, setPetName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [isUrgent, setIsUrgent] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchUrgency();
                setData(response.data.slice(0, 3));
                setIsLoading(false);
            } catch (error) {
                console.error("Ошибка при загрузке объявлений:", error);
                setError("Ошибка при загрузке объявлений");
                setIsLoading(false);
            }
        };

        const getAnimalTypes = async () => {
            try {
                const response = await fetchAnimalTypes();
                setAnimalTypes(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке типов животных:", error);
            }
        };

        getData();
        getAnimalTypes();
    }, []);

    useEffect(() => {
        if (selectedAnimalType) {
            const getBloodTypes = async () => {
                try {
                    const response = await fetchBloodTypes(selectedAnimalType);
                    setBloodTypes(response.data);
                } catch (error) {
                    console.error("Ошибка при загрузке типов крови:", error);
                }
            };

            getBloodTypes();
        }
    }, [selectedAnimalType]);

    const handleCardClick = (id: number) => {
        navigate(`/announcement/${id}`);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        window.location.reload();
    };

    const createAnnounce = () => {

        const AnnounceData = {
            "user_id": 1, // TODO: Заменить на актуальный user_id
            "pet_type_id": selectedAnimalType,
            "blood_type_id": selectedBloodType,
            "pet_name": petName,
            "breed_id": 1, // Заменить на актуальный breed_id
            "photo_url": photoUrl,
            "announce_text": announceText,
            "org_id": 1, // TODO: Заменить на актуальный org_id
            "admin_id": 1, // TODO: Заменить на актуальный admin_id
            "urgency": isUrgent,
            "period": new Date().toISOString()
        };

        postAnnounceData(AnnounceData)
            .then((res) => {
                console.log("Объявление успешно создано:", res.data);
            })
            .catch((error) => {
                console.error("Ошибка при создании объявления:", error);
            });
        closeModal()
    };

    const handlePhotoChange = (e: any) => {
        setPhotoUrl(e.target.value);
    };

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    const items = data.map((announcement) => (
        <AnimalCard key={announcement.id} announcement={announcement} size="large" onClick={() => handleCardClick(announcement.id)} />
    ));

    const modalContent = (
        <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Добавить объявление</h2>
            <div className={styles.modalLabel}>
                <label>
                    Тип животного
                    <select value={selectedAnimalType} onChange={(e) => setSelectedAnimalType(e.target.value)}>
                        <option value="">Выберите тип животного</option>
                        {animalTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.pet_name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Имя питомца
                    <input
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                    />
                </label>
                <label>
                    Группа крови
                    <select value={selectedBloodType} onChange={(e) => setSelectedBloodType(e.target.value)}>
                    <option value="">Выберите группу крови</option>
                        {bloodTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.blood_type}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Фото питомца (URL)
                    <input
                        type="text"
                        value={photoUrl}
                        onChange={handlePhotoChange}
                    />
                </label>
                <label>
                    Текст объявления
                    <input
                        type="text"
                        value={announceText}
                        onChange={(e) => setAnnounceText(e.target.value)}
                    />
                </label>
                <div style={{ display: "flex", marginLeft: 'auto', marginRight: 'auto' }}>
                    <input
                        type="checkbox"
                        checked={isUrgent}
                        onChange={(e) => setIsUrgent(e.target.checked)}
                        className={styles.modalCheckbox}
                    />
                    <label className={styles.modalCheckboxLabel}>Срочно</label>

                </div>
                <button
                    className={styles.createButton}
                    onClick={createAnnounce}
                >
                    Создать
                </button>
            </div>
        </div>
    );


    return (
        <div className={styles.slider_wrapper}>
            <div className={styles.slider__header}>
                <h1 className={styles.slider__title}>
                    Объявления
                </h1>
                <a href="/announcements" className={styles.view_all_link}>Перейти ко всем объявлениям</a>
            </div>
            <div className={styles.cards_container}>
                {items}
            </div>
            {orgID ? (
            <div className={styles.add_announce_button}>
                <button className={styles.add_announce_link} onClick={() => openModal()}>Добавить объявление</button>
            </div>
            ) : (
                <div/>
            )}
            <Modal
                style={{
                    content: { width: "500px", marginLeft: "auto", marginRight: "auto", overflow: "hidden" },
                }}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
};

export default AnnounceSlider;
