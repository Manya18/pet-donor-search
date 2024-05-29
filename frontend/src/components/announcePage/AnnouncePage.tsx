import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Filter from './components/Filter';
import Map from './components/Map';
import AnimalCard from './components/animalCard/AnimalCard';
import { fetchAnnounce, fetchUrgency } from 'utils/announceApi';
import { AnnounceType } from '../../types/AnnounceType';

const AnnouncePage: React.FC = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<{ animaltype: string; urgency: string }>({ animaltype: '', urgency: '' });
    const [announcements, setAnnouncements] = useState<AnnounceType[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await fetchAnnounce();
                if (filters.urgency === 'true') response = await fetchUrgency();
                const announcementsArray = Array.isArray(response.data) ? response.data : [response.data];
                setAnnouncements(announcementsArray);
            } catch (error) {
                console.error("Error fetching Advices:", error);
            }
        };

        getData();
    }, [filters]);

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
