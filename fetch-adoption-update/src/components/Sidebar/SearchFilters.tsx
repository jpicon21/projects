import React from 'react';
import { useAtom } from 'jotai';
import { Box, VStack, Select, Input, Button, Text } from '@chakra-ui/react';
import { searchParamsAtom, breedsAtom } from '../../atoms/atoms';

export const SearchFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useAtom(searchParamsAtom);
  const [breedsQuery] = useAtom(breedsAtom);

  const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(prev => ({ ...prev, breeds: [e.target.value] }));
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => ({ ...prev, zipCodes: [e.target.value] }));
  };

  const handleAgeMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => ({ ...prev, ageMin: Number(e.target.value) || undefined }));
  };

  const handleAgeMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => ({ ...prev, ageMax: Number(e.target.value) || undefined }));
  };

  const handleResetFilters = () => {
    setSearchParams({
      breeds: [],
      zipCodes: [],
      ageMin: undefined,
      ageMax: undefined,
      size: 25,
      from: 0,
      sort: 'breed:asc',
    });
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Select 
          placeholder="Select breed" 
          value={searchParams.breeds && searchParams.breeds[0]} 
          onChange={handleBreedChange}
          isDisabled={breedsQuery.isLoading}
        >
          {breedsQuery.isLoading ? (
            <option>Loading breeds...</option>
          ) : breedsQuery.isError ? (
            <option>Error loading breeds</option>
          ) : (
            breedsQuery.data?.map(breed => (
              <option key={breed} value={breed}>{breed}</option>
            ))
          )}
        </Select>
        <Input 
          placeholder="Zip Code" 
          value={searchParams.zipCodes && searchParams.zipCodes[0]} 
          onChange={handleZipCodeChange} 
        />
        <Input 
          placeholder="Minimum Age" 
          type="number" 
          value={searchParams.ageMin ?? ''} 
          onChange={handleAgeMinChange} 
        />
        <Input 
          placeholder="Maximum Age" 
          type="number" 
          value={searchParams.ageMax ?? ''} 
          onChange={handleAgeMaxChange} 
        />
        <Button onClick={handleResetFilters}>Reset Filters</Button>
      </VStack>
      {breedsQuery.isError && (
        <Text color="red.500" mt={2}>Error loading breeds: {breedsQuery.error.message}</Text>
      )}
    </Box>
  );
};