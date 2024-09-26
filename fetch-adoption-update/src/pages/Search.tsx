import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { DogList } from '../components/DogView/DogList';
import { FavoritesList } from '../components/Favorites/FavoritesList';
import { SearchFilters } from '../components/Sidebar/SearchFilters';


export const SearchPage: React.FC = () => {
  return (
    <Flex>
      <Box width="250px" p={4}>
        <SearchFilters />
      </Box>
      <Box flex={1} p={4}>
        <DogList />
      </Box>
      <Box width="300px" p={4}>
        <FavoritesList />
      </Box>
    </Flex>
  );
};