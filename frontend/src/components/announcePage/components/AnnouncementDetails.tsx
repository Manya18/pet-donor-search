import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from './AnnouncementDetails.module.css';

interface Announcement {
    id: number;
    pet_id: number;
    urgency: string;
    org_id: number;
    announce_text: string;
    period: string;
    hidden: boolean;
    admin_id: number;
    animalType: string;
    bloodType: string;
    organization: string;
    address: string;
    workingHours: string;
    photo: string;
}

const AnnouncementDetails: React.FC = () => {
    const userID = sessionStorage.getItem('userID');
    const { id } = useParams<{ id: string | undefined }>();
    const [open, setOpen] = useState(false);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

    useEffect(() => {
        const getAnnounceSearch = async () => {
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

                const result: Announcement[] = await response.json();
                setAnnouncements(result);
                console.log('Announcements:', announcements);
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        };

        getAnnounceSearch();

    }, []);

    useEffect(() => {
        if (id && announcements.length > 0) {
            const announcement = announcements.find(ann => ann.id === parseInt(id, 10));
            setSelectedAnnouncement(announcement || null);
            console.log('Selected Announcement:', announcement);
        }
    }, [id, announcements]);

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
                <img src={selectedAnnouncement.photo} alt={selectedAnnouncement.urgency} className={styles.image} />
                <div className={styles.info}>
                    <Typography variant="h4">{selectedAnnouncement.urgency}</Typography>
                    <Typography variant="h6">{selectedAnnouncement.animalType}</Typography>
                    <Typography variant="body1">Группа крови: {selectedAnnouncement.bloodType}</Typography>
                    <div className={styles.iconText}>
                        <HomeIcon />
                        <Typography variant="body1" ml={1}>{selectedAnnouncement.address}</Typography>
                    </div>
                    <div className={styles.iconText}>
                        <AccessTimeIcon />
                        <Typography variant="body1" ml={1}>{selectedAnnouncement.workingHours}</Typography>
                    </div>
                </div>
            </div>
            <div className={styles.description}>
                <Typography variant="h6">Описание</Typography>
                <Typography variant="body1">{selectedAnnouncement.announce_text}</Typography>
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
