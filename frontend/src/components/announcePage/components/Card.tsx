import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

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

interface CardProps {
    announcement: Announcement;
    onClick: () => void;
}

const AnimalCard: React.FC<CardProps> = ({ announcement, onClick }) => {
    return (
        <div style={{ marginBottom: '3vh', marginTop: '3vh', marginLeft: '1vw' }}>
            <Card onClick={onClick} style={{ cursor: 'pointer', width: '17vw' }}>
                <CardMedia
                    component="img"
                    height="150"
                    width="200"
                    image={announcement.photo}
                    alt={`${announcement.urgency}`}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {announcement.urgency}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Тип животного: {announcement.animalType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Группа крови: {announcement.bloodType}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                    Организация: {announcement.organization}
                </Typography> */}
                </CardContent>
            </Card>
        </div>
    );
};

export default AnimalCard;
