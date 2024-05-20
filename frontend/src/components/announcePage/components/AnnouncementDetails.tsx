import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from './AnnouncementDetails.module.css';

interface Announcement {
    id: number;
    animalType: string;
    urgency: string;
    bloodType: string;
    organization: string;
    address: string;
    workingHours: string;
    description: string;
    photo: string;
}

const announcements: Announcement[] = [
    {
        id: 1,
        animalType: 'Собака',
        urgency: 'Шарик',
        bloodType: 'A+',
        organization: 'Вет Гуффи',
        address: ' ул. Карла Маркса, 316, Ижевск',
        workingHours: '9:00 - 18:00',
        description: 'Болеет((',
        photo: 'https://i.pinimg.com/originals/6c/8e/56/6c8e5666bcde85152b1c73f8be8e3ef2.jpg'
    },
];

const AnnouncementDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [open, setOpen] = useState(false);

    if (!id) {
        return <Typography variant="h5">Announcement not found</Typography>;
    }

    const announcement = announcements.find(ann => ann.id === parseInt(id, 10));

    if (!announcement) {
        return <Typography variant="h5">Announcement not found</Typography>;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container className={styles.container}>
            <Box className={styles.details}>
                <img src={announcement.photo} alt={announcement.urgency} className={styles.image} />
                <Box className={styles.info}>
                    <Typography variant="h4">{announcement.urgency}</Typography>
                    <Typography variant="h6">{announcement.animalType}</Typography>
                    <Typography variant="body1">Группа крови: {announcement.bloodType}</Typography>
                    <Box className={styles.iconText}>
                        <HomeIcon />
                        <Typography variant="body1" ml={1}>{announcement.address}</Typography>
                    </Box>
                    <Box className={styles.iconText}>
                        <AccessTimeIcon />
                        <Typography variant="body1" ml={1}>{announcement.workingHours}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box className={styles.description}>
                <Typography variant="h6">Описание</Typography>
                <Typography variant="body1">{announcement.description}</Typography>
            </Box>
            <Box className={styles.centerButton}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Помочь
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Помочь</DialogTitle>
                <DialogContent>
                    <Typography>Ждем вас</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AnnouncementDetails;
