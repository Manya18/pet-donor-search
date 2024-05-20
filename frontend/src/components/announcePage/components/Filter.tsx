import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface FilterProps {
    filters: { animalType: string; urgency: string };
    setFilters: React.Dispatch<React.SetStateAction<{ animalType: string; urgency: string }>>;
}

const Filter: React.FC<FilterProps> = ({ filters, setFilters }) => {
    const handleAnimalTypeChange = (event: any) => {
        setFilters({ ...filters, animalType: event.target.value as string });
    };

    const handleUrgencyChange = (event: any) => {
        setFilters({ ...filters, urgency: event.target.value as string });
    };

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <InputLabel>Срочность</InputLabel>
                <Select value={filters.urgency} onChange={handleUrgencyChange}>
                    <MenuItem value="">Все</MenuItem>
                    <MenuItem value="High">Высокая</MenuItem>
                    <MenuItem value="Medium">Средняя</MenuItem>
                    <MenuItem value="Low">Низкая</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Тип животного</InputLabel>
                <Select value={filters.animalType} onChange={handleAnimalTypeChange}>
                    <MenuItem value="">Все</MenuItem>
                    <MenuItem value="Dog">Собака</MenuItem>
                    <MenuItem value="Cat">Кошка</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default Filter;
