import React, { useState } from 'react';
import { Box, Button, Text, VStack, SimpleGrid, Image, useDisclosure } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../../atoms/searchAtoms';
import axios from 'axios';
import MatchModal from './MatchModal';

interface Dog {
  id: string;
  img: string;
  name: string;
}

const FavoritesList: React.FC = () => {
  const [favorites] = useAtom(favoritesAtom);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    const fetchFavoriteDogs = async () => {
      try {
        const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs', favorites, { withCredentials: true });
        setFavoriteDogs(response.data);
      } catch (error) {
        console.error('Error fetching favorite dogs:', error);
      }
    };
    if (favorites.length > 0) {
      fetchFavoriteDogs();
    }
  }, [favorites]);

  const handleGenerateMatch = async () => {
    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs/match', favorites, { withCredentials: true });
      const matchId = response.data.match;
      const matchResponse = await axios.post('https://frontend-take-home-service.fetch.com/dogs', [matchId], { withCredentials: true });
      setMatchedDog(matchResponse.data[0]);
      onOpen();
    } catch (error) {
      console.error('Error generating match:', error);
    }
  };

  return (
    <Box className="bg-gray-100 p-4 rounded-md">
      <VStack spacing={4} align="stretch">
        <Text fontWeight="bold" fontSize="xl">Favorites ({favorites.length})</Text>
        <SimpleGrid columns={2} spacing={2}>
          {favoriteDogs.map((dog) => (
            <Box key={dog.id} borderWidth={1} borderRadius="md" overflow="hidden">
              <Image src={dog.img} alt={dog.name} objectFit="cover" height="100px" width="100%" />
              <Text fontSize="sm" p={1} textAlign="center">{dog.name}</Text>
            </Box>
          ))}
        </SimpleGrid>
        <Button 
          onClick={handleGenerateMatch} 
          colorScheme="blue" 
          isDisabled={favorites.length === 0}
        >
          Generate Match
        </Button>
      </VStack>
      <MatchModal isOpen={isOpen} onClose={onClose} dog={matchedDog} />
    </Box>
  );
};

export default FavoritesList;