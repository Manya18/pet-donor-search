import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface FilterProps {
    filters: { animaltype: string; urgency: string };
    setFilters: React.Dispatch<React.SetStateAction<{ animaltype: string; urgency: string }>>;
}

const Filter: React.FC<FilterProps> = ({ filters, setFilters }) => {
    const [animalTypes, setAnimalTypes] = useState<string[]>([]);

    useEffect(() => {
        fetchAnimalTypes();
    }, []);

    const fetchAnimalTypes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/animaltypes');
            const data = await response.json();
            const animalTypeNames = data.map((animalType: { id: number; pet_name: string }) => animalType.pet_name);
            setAnimalTypes(animalTypeNames);
        } catch (error) {
            console.error('Ошибка при загрузке типов животных:', error);
        }
    };

    const handleAnimalTypeChange = (event: any) => {
        setFilters({ ...filters, animaltype: event.target.value as string });
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
                    <MenuItem value="true">Срочно</MenuItem>
                    <MenuItem value="false">Не срочно</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Тип животного</InputLabel>
                <Select value={filters.animaltype} onChange={handleAnimalTypeChange}>
                    <MenuItem value="">Все</MenuItem>
                    {animalTypes.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default Filter;
