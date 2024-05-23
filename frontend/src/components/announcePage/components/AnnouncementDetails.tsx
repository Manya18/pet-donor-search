import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from "@mui/icons-material/Place";
import Diversity1Icon from "@mui/icons-material/Diversity1";

import styles from './AnnouncementDetails.module.css';

interface Announcement {
    id: number;
    pet_id: number;
    urgency: boolean;
    org_id: number;
    announce_text: string;
    period: string;
    hidden: boolean;
    admin_id: number | null;
    animaltype: string;
    bloodtype: string;
    organization: string;
    address: string;
    workinghours: string;
    photo: string;
    petname: string;
}

const AnnouncementDetails: React.FC = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const [open, setOpen] = useState(false);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

    useEffect(() => {
        getAnnounceSearch();
    }, [id]);

    const getAnnounceSearch = async () => {
        if (!id) return;  // Добавляем проверку на наличие id

        try {
            const response = await fetch(`http://localhost:8080/api/announce/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error('Ошибка при получении данных');
                return;
            }

            const result = await response.json();
            console.log('Result from API:', result); // Добавлено отладочное сообщение

            // Если результат не массив, оборачиваем его в массив
            const announcementsArray = Array.isArray(result) ? result : [result];
            setAnnouncements(announcementsArray);

            const announcement = announcementsArray.find(ann => ann.id === parseInt(id, 10));
            console.log('Filtered Announcement:', announcement); // Добавлено отладочное сообщение
            setSelectedAnnouncement(announcement || null);
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    useEffect(() => {
        console.log('Announcements state:', announcements); // Добавлено отладочное сообщение
        console.log('Selected Announcement state:', selectedAnnouncement); // Добавлено отладочное сообщение
    }, [announcements, selectedAnnouncement]);

    if (!id) {
        return <Typography variant="h5">Announcement not found</Typography>;
    }

    if (!selectedAnnouncement) {
        return <Typography variant="h5">Announcement not found</Typography>;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <img src={selectedAnnouncement.photo} className={styles.image} />
                {selectedAnnouncement.urgency && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '130px',
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontWeight: 'bold'
                        }}
                    >
                        Срочно
                    </div>)}
                <div className={styles.info}>
                    <Typography variant="h4">{selectedAnnouncement.urgency}</Typography>
                    <Typography variant="h5">{selectedAnnouncement.petname}</Typography>
                    <Typography variant="body1">Тип животного: {selectedAnnouncement.animaltype}</Typography>
                    <Typography variant="body1">Группа крови: {selectedAnnouncement.bloodtype}</Typography>
                    <div className={styles.iconText}>
                        <Diversity1Icon />
                        <Typography variant="body1" ml={1}>{selectedAnnouncement.organization}</Typography>
                    </div>
                    <div className={styles.iconText}>
                        <PlaceIcon />
                        <Typography variant="body1" ml={1}>{selectedAnnouncement.address}</Typography>
                    </div>
                    <div className={styles.iconText}>
                        <AccessTimeIcon />
                        <Typography variant="body1" ml={1}>{selectedAnnouncement.workinghours}</Typography>
                    </div>
                </div>
            </div>
            <div className={styles.description}>
                <Typography variant="h6">Описание</Typography>
                <Typography variant="body1">{selectedAnnouncement.announce_text.replace(/\n/g, '\n')}</Typography>
            </div>
            <div className={styles.centerButton}>
                <button className={styles.button} onClick={handleClickOpen}>
                    Помочь
                </button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <div className={styles.modal_content}>
                    <h3 className={styles.modal_title}>Ждем вас!</h3>
                    <button className={styles.close} onClick={handleClose}>
                        X
                    </button>
                </div>
            </Dialog>
        </div>
    );
};

export default AnnouncementDetails;
