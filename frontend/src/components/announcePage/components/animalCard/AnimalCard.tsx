import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { AnnounceType } from '../../../../types/AnnounceType';
import styles from './AnimalCard.module.css';
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAnnounce } from 'utils/announceApi';

interface CardProps {
    announcement: AnnounceType;
    onClick: () => void;
    size?: 'small' | 'large';
}

const AnimalCard: React.FC<CardProps> = ({ announcement, onClick, size = 'small' }) => {
    const cardClass = size === 'large' ? styles.cardLarge : styles.cardSmall;

    const deleteAnnounceFunc = () => {
        deleteAnnounce(announcement.id);
        window.location.reload();
    };

    return (
        <div className={styles.cardContainer}>
            <Card onClick={onClick} className={cardClass}>
                <CardMedia
                    component="img"
                    height="150"
                    width="200"
                    image={announcement.photo}
                    alt={announcement.petname}
                />
                {announcement.urgency && (
                    <div className={styles.urgencyBadge}>
                        Срочно
                    </div>
                )}
                <CardContent>
                    <Typography variant="h5" component="div">
                        {announcement.petname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Тип животного: {announcement.animaltype}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Группа крови: {announcement.bloodtype}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Организация: {announcement.organization}
                    </Typography>
                    <button
                        className={styles.delete__button}
                        onClick={(e) => {
                            e.stopPropagation(); 
                            deleteAnnounceFunc();
                        }}
                        title="Удалить объявление"
                    >
                        <DeleteIcon />
                    </button>
                </CardContent>
            </Card>
        </div>
    );
};

export default AnimalCard;
