import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from "@mui/icons-material/Place";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { AnnounceType } from '../../../../types/AnnounceType';

import styles from './AnnouncementId.module.css';
import { fetchAnnounceId } from 'utils/announceApi';

const AnnouncementId: React.FC = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const [open, setOpen] = useState(false);
    const [announcement, setAnnouncement] = useState<AnnounceType | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchAnnounceId(id);
                setAnnouncement(response.data);
            } catch (error) {
                console.error("Error fetching AnnounceId:", error);
            }
        };

        getData();
    }, [id]);

    if (!id) {
        return <Typography variant="h5">Announcement not found</Typography>;
    }

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
        <div className={styles.container}>
            <div className={styles.details}>
                <img src={announcement.photo} className={styles.image} />
                {announcement.urgency && (
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
                    <Typography variant="h4">{announcement.urgency}</Typography>
                    <Typography variant="h5">{announcement.petname}</Typography>
                    <Typography variant="body1">Тип животного: {announcement.animaltype}</Typography>
                    <Typography variant="body1">Группа крови: {announcement.bloodtype}</Typography>
                    <div className={styles.iconText}>
                        <Diversity1Icon />
                        <Typography variant="body1" ml={1}>{announcement.organization}</Typography>
                    </div>
                    <div className={styles.iconText}>
                        <PlaceIcon />
                        <Typography variant="body1" ml={1}>{announcement.address}</Typography>
                    </div>
                    <div className={styles.iconText}>
                        <AccessTimeIcon />
                        <Typography variant="body1" ml={1}>{announcement.workinghours}</Typography>
                    </div>
                </div>
            </div>
            <div className={styles.description}>
                <Typography variant="h6">Описание</Typography>
                <Typography variant="body1">{announcement.announce_text}</Typography>
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

export default AnnouncementId;
