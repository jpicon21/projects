import React from 'react';
import { useAtom } from 'jotai';
import { favoriteDogsAtom, favoritesAtom, generateMatchAtom, generateMatchTriggerAtom } from '../../atoms/atoms';
import { Box, Button, VStack, Spinner, Text } from '@chakra-ui/react';
import FavoriteDogCard from './FavoriteDogCard';

export const FavoritesList: React.FC = () => {
  const [favoriteDogsQuery] = useAtom(favoriteDogsAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [generateMatchQuery] = useAtom(generateMatchAtom);
  const [, setGenerateMatchTrigger] = useAtom(generateMatchTriggerAtom);

  if (favoriteDogsQuery.isLoading) return <Spinner />;
  if (favoriteDogsQuery.isError) return <Text>Error: {favoriteDogsQuery.error.message}</Text>;

  const handleRemoveFavorite = (dogId: string) => {
    setFavorites(prev => prev.filter(id => id !== dogId));
  };

  const handleGenerateMatch = () => {
    setGenerateMatchTrigger(prev => prev + 1);
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        {favoriteDogsQuery.data?.map(dog => (
          <FavoriteDogCard key={dog.id} dog={dog} onRemove={() => handleRemoveFavorite(dog.id)} />
        ))}
        <Button 
          onClick={handleGenerateMatch} 
          isDisabled={favorites.length === 0 || generateMatchQuery.isFetching}
        >
          {generateMatchQuery.isFetching ? 'Generating...' : 'Generate Match'}
        </Button>
        {generateMatchQuery.isSuccess && (
          <Text>Match generated: {generateMatchQuery.data}</Text>
        )}
        {generateMatchQuery.isError && (
          <Text color="red.500">Error generating match: {generateMatchQuery.error.message}</Text>
        )}
      </VStack>
    </Box>
  );
};