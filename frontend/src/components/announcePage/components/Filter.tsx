import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchAnimalTypes } from 'utils/announceApi';

interface FilterProps {
    filters: { animaltype: string; urgency: string };
    setFilters: React.Dispatch<React.SetStateAction<{ animaltype: string; urgency: string }>>;
}

const Filter: React.FC<FilterProps> = ({ filters, setFilters }) => {
    const [animalTypes, setAnimalTypes] = useState<string[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchAnimalTypes();
                const animalTypeNames = response.data.map((animalType: { id: number; pet_name: string }) => animalType.pet_name);
                setAnimalTypes(animalTypeNames);
            } catch (error) {
                console.error('Ошибка при загрузке типов животных:', error);
            }
        };

        getData();
    }, []);

    const handleAnimalTypeChange = (event: any) => {
        setFilters({ ...filters, animaltype: event.target.value as string });
    };

    const handleUrgencyChange = (event: any) => {
        setFilters({ ...filters, urgency: event.target.value as string });
    };

    const selectStyles = {
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9D0B0B',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9D0B0B',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9D0B0B',
        }
    };

    const menuItemStyles = {
        '&:hover': {
            backgroundColor: 'gray',
        },
        '&.Mui-selected': {
            backgroundColor: 'gray',
            '&:hover': {
                backgroundColor: 'gray',
            },
        },
    };

    const formControlStyles = {
        '&:hover .MuiInputLabel-root': {
            color: '#9D0B0B',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#9D0B0B',
        }
    };

    return (
        <div>
            <FormControl fullWidth margin="normal" sx={formControlStyles}>
                <InputLabel>Срочность</InputLabel>
                <Select
                    value={filters.urgency}
                    onChange={handleUrgencyChange}
                    sx={selectStyles}
                >
                    <MenuItem value="">Все</MenuItem>
                    <MenuItem value="true" sx={menuItemStyles}>Срочно</MenuItem>
                    <MenuItem value="false" sx={menuItemStyles}>Не срочно</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" sx={formControlStyles}>
                <InputLabel>Тип животного</InputLabel>
                <Select
                    value={filters.animaltype}
                    onChange={handleAnimalTypeChange}
                    sx={selectStyles}
                >
                    <MenuItem value="">Все</MenuItem>
                    {animalTypes.map((type) => (
                        <MenuItem key={type} value={type} sx={menuItemStyles}>{type}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default Filter;
