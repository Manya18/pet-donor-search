import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

interface Announcement {
    id: number;
    animaltype: string;
    urgency: boolean;
    bloodtype: string;
    organization: string;
    address: string;
    workingHours: string;
    description: string;
    photo: string;
    petname: string;
}

interface CardProps {
    announcement: Announcement;
    onClick: () => void;
}

const AnimalCard: React.FC<CardProps> = ({ announcement, onClick }) => {
    return (
        <div style={{ marginBottom: '3vh', marginTop: '3vh', marginLeft: '1vw' }}>
            <Card onClick={onClick} style={{ cursor: 'pointer', width: '17vw', position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="150"
                    width="200"
                    image={announcement.photo}
                    alt={announcement.petname}
                />
                {announcement.urgency && (
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '5px',
                        borderRadius: '5px'
                    }}>
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
                </CardContent>
            </Card>
        </div>
    );
};

export default AnimalCard;
