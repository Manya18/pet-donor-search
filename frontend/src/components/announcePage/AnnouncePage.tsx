import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Filter from './components/Filter';
import Map from './components/Map';
import AnimalCard from './components/Card';

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

const AnnouncePage: React.FC = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<{ animaltype: string; urgency: string }>({ animaltype: '', urgency: '' });
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        getAnnouncements();
    }, [filters]);

    const getAnnouncements = async () => {
        let url = 'http://localhost:8080/api/announce/';
        if (filters.urgency === 'true') {
            url = 'http://localhost:8080/api/urgency';
        }

        try {
            const response = await fetch(url, {
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
            const announcementsArray = Array.isArray(result) ? result : [result];
            setAnnouncements(announcementsArray);

        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleCardClick = (id: number) => {
        navigate(`/announcement/${id}`);
    };

    const filteredAnnouncements = announcements.filter(announcement => {
        return (
            (!filters.animaltype || announcement.animaltype === filters.animaltype) &&
            (!filters.urgency || announcement.urgency.toString() === filters.urgency)
        );
    });

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
