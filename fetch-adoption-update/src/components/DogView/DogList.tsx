import React from 'react';
import { useAtom } from 'jotai';
import { Box, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { DogCard } from './DogCard';
import { Pagination } from './Pagination';
import { dogsAtom, searchParamsAtom, favoritesAtom } from '../../atoms/atoms';

export const DogList: React.FC = () => {
  const [dogsQuery] = useAtom(dogsAtom);
  const [searchParams, setSearchParams] = useAtom(searchParamsAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  if (dogsQuery.isLoading) return <Spinner />;
  if (dogsQuery.isError) return <Text>Error: {dogsQuery.error.message}</Text>;

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => ({ ...prev, from: (newPage - 1) * (prev.size || 25) }));
  };

  const toggleFavorite = (dogId: string) => {
    setFavorites(prev => 
      prev.includes(dogId) ? prev.filter(id => id !== dogId) : [...prev, dogId]
    );
  };

  return (
    <Box>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
        {dogsQuery.data?.map(dog => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={favorites.includes(dog.id)}
            onToggleFavorite={() => toggleFavorite(dog.id)}
          />
        ))}
      </SimpleGrid>
      <Pagination
        currentPage={Math.floor((searchParams.from || 0) / (searchParams.size || 25)) + 1}
        totalPages={Math.ceil((dogsQuery.data?.length || 0) / (searchParams.size || 25))}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};