import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Select, Input, Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import axios from 'axios';
import { searchFiltersAtom } from '../../atoms/searchAtoms';
import { searchDogsAtom } from '../../atoms/dogAtom';

const SearchFilters: React.FC = () => {
  const [, setFilters] = useAtom(searchFiltersAtom);
  const [, searchDogs] = useAtom(searchDogsAtom);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get<string[]>('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true });
        setBreeds(response.data);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };
    fetchBreeds();
  }, []);

  const handleApplyFilters = async () => {
    const newFilters = {
      breeds: selectedBreed ? [selectedBreed] : [],
      zipCodes: zipCode ? [zipCode] : [],
      ageMin: ageMin ? parseInt(ageMin) : null,
      ageMax: ageMax ? parseInt(ageMax) : null,
    };
    setFilters(newFilters);
    await searchDogs(newFilters);
  };

  const handleResetFilters = async () => {
    setSelectedBreed('');
    setZipCode('');
    setAgeMin('');
    setAgeMax('');
    const resetFilters = {
      breeds: [],
      zipCodes: [],
      ageMin: null,
      ageMax: null,
    };
    setFilters(resetFilters);
    await searchDogs(resetFilters);
  };

  return (
    <Box className="bg-gray-100 p-4 rounded-md">
      <VStack spacing={4} align="stretch">
        <Heading size="md">Filters</Heading>
        <Select placeholder="Select breed" value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </Select>
        <Input placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        <Input placeholder="Minimum Age" type="number" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} />
        <Input placeholder="Maximum Age" type="number" value={ageMax} onChange={(e) => setAgeMax(e.target.value)} />
        <Button colorScheme="blue" onClick={handleApplyFilters}>Apply Filters</Button>
        <Button variant="outline" onClick={handleResetFilters}>Reset Filters</Button>
      </VStack>
    </Box>
  );
};

export default SearchFilters;