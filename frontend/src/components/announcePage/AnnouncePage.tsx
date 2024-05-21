import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Filter from './components/Filter';
import Map from './components/Map';
import AnimalCard from './components/Card';

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

const AnnouncePage: React.FC = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<{ animalType: string; urgency: string }>({ animalType: '', urgency: '' });
    const [announcements] = useState<Announcement[]>([
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
        {
            id: 2,
            animalType: 'Собака',
            urgency: 'Шарик',
            bloodType: 'A+',
            organization: 'Вет Гуффи',
            address: ' ул. Карла Маркса, 316, Ижевск',
            workingHours: '9:00 - 18:00',
            description: 'Болеет((',
            photo: 'https://i.pinimg.com/originals/6c/8e/56/6c8e5666bcde85152b1c73f8be8e3ef2.jpg'
        },
        {
            id: 3,
            animalType: 'Собака',
            urgency: 'Шарик',
            bloodType: 'A+',
            organization: 'Вет Гуффи',
            address: ' ул. Карла Маркса, 316, Ижевск',
            workingHours: '9:00 - 18:00',
            description: 'Болеет((',
            photo: 'https://i.pinimg.com/originals/6c/8e/56/6c8e5666bcde85152b1c73f8be8e3ef2.jpg'
        },
    ]);

    const filteredAnnouncements = announcements.filter(announcement => {
        return (
            (!filters.animalType || announcement.animalType === filters.animalType) &&
            (!filters.urgency || announcement.urgency === filters.urgency)
        );
    });

    const handleCardClick = (id: number) => {
        navigate(`/announcement/${id}`);
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Filter filters={filters} setFilters={setFilters} />
                </Grid>
                <Grid item xs={9}>
                    <Grid container direction="column">
                        <Grid item>
                            <Map />
                        </Grid>
                        <Grid item container spacing={2}>
                            {filteredAnnouncements.map(announcement => (
                                <Grid item xs={12} sm={6} md={4} key={announcement.id}>
                                    <AnimalCard announcement={announcement} onClick={() => handleCardClick(announcement.id)} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AnnouncePage;
