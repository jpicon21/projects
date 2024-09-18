import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Select, Input, Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import axios from 'axios';
import { searchFiltersAtom } from '../../atoms/searchAtoms';

const SearchFilters: React.FC = () => {
  const [filters, setFilters] = useAtom(searchFiltersAtom);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true });
        setBreeds(response.data);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };
    fetchBreeds();
  }, []);

  const handleApplyFilters = () => {
    setFilters({
      ...filters,
      breeds: selectedBreed ? [selectedBreed] : [],
      zipCodes: zipCode ? [zipCode] : [],
      ageMin: ageMin ? parseInt(ageMin) : null,
      ageMax: ageMax ? parseInt(ageMax) : null,
    });
  };

  const handleResetFilters = () => {
    setSelectedBreed('');
    setZipCode('');
    setAgeMin('');
    setAgeMax('');
    setFilters({
      breeds: [],
      zipCodes: [],
      ageMin: null,
      ageMax: null,
    });
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