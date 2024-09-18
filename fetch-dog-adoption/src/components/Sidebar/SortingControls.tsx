import React from 'react';
import { Box, Heading, Select } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { SortOption, sortOptionAtom } from '../../atoms/searchAtoms';


const SortingControls: React.FC = () => {
  const [sortOption, setSortOption] = useAtom(sortOptionAtom);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, direction] = e.target.value.split(':') as [SortOption['field'], SortOption['direction']];
    setSortOption({ field, direction });
  };

  return (
    <Box className="bg-gray-100 p-4 rounded-md">
      <Heading className="pb-2" size="md">Sort</Heading>
      <Select value={`${sortOption.field}:${sortOption.direction}`} onChange={handleSortChange}>
        <option value="breed:asc">Breed (A-Z)</option>
        <option value="breed:desc">Breed (Z-A)</option>
        <option value="name:asc">Name (A-Z)</option>
        <option value="name:desc">Name (Z-A)</option>
        <option value="age:asc">Age (Youngest First)</option>
        <option value="age:desc">Age (Oldest First)</option>
      </Select>
    </Box>
  );
};

export default SortingControls;