import React, { useState, useEffect } from 'react';
import { 
  Box, Button, Text, VStack, Flex,
  Popover, PopoverContent, PopoverBody, PopoverCloseButton,
  PopoverTrigger, SlideFade
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../../atoms/searchAtoms';
import { Dog } from '../../atoms/dogAtom';
import axios from 'axios';
import DogCard from '../DogView/DogCard';
import FavoriteDogCard from './FavoriteDogCard';

interface FavoritesListProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ isOpen, onClose, children }) => {
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  useEffect(() => {
    const fetchFavoriteDogs = async () => {
      if (favorites.length > 0) {
        try {
          const response = await axios.post<Dog[]>('https://frontend-take-home-service.fetch.com/dogs', favorites, { withCredentials: true });
          setFavoriteDogs(response.data);
        } catch (error) {
          console.error('Error fetching favorite dogs:', error);
        }
      } else {
        setFavoriteDogs([]);
      }
    };

    fetchFavoriteDogs();
  }, [favorites]);

  const handleGenerateMatch = async () => {
    try {
      const response = await axios.post<{ match: string }>('https://frontend-take-home-service.fetch.com/dogs/match', favorites, { withCredentials: true });
      const matchId = response.data.match;
      const matchResponse = await axios.post<Dog[]>('https://frontend-take-home-service.fetch.com/dogs', [matchId], { withCredentials: true });
      setMatchedDog(matchResponse.data[0]);
    } catch (error) {
      console.error('Error generating match:', error);
    }
  };

  const handleNewMatch = () => {
    setMatchedDog(null);
  };

  const handleResetFavorites = () => {
    setFavorites([]);
    setFavoriteDogs([]);
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites(prev => prev.filter(favId => favId !== id));
    setFavoriteDogs(prev => prev.filter(dog => dog.id !== id));
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} placement="bottom-end" closeOnBlur={false}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent 
        width="400px" 
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.15)"
        border="none"
        bg="#FBA919"
        borderRadius="md"
        overflow="hidden"
      >
        <SlideFade 
          in={isOpen} 
          offsetY="-20px" 
          transition={{ enter: { duration: 0.5 }, exit: { duration: 0.8 } }}
        >
          <Box height="600px">
            <PopoverCloseButton color="#4A1A55" size={"md"} />
            <PopoverBody p={0} display="flex" flexDirection="column" height="100%">
              <Flex p={4} alignItems="center">
                <Text 
                  fontWeight="bold" 
                  fontSize="2xl" 
                  bgGradient="linear(to-b, #4A1A55, #300D38)"
                  bgClip="text"
                >
                  {matchedDog ? "Your Match" : "Favorites"}
                </Text>
                {!matchedDog && (
                  <Button
                    onClick={handleResetFavorites}
                    size="xs"
                    colorScheme="purple"
                    bg="#4A1A55"
                    color="white"
                    _hover={{ bg: "#300D38" }}
                    ml={4}
                  >
                    Reset
                  </Button>
                )}
              </Flex>
              {!matchedDog ? (
                <>
                  <Box overflowY="auto" flex={1} px={4} pb={4} pt={2}>
                    <VStack spacing={2} align="stretch">
                      {favoriteDogs.map((dog) => (
                        <FavoriteDogCard key={dog.id} dog={dog} onRemove={handleRemoveFavorite} />
                      ))}
                    </VStack>
                  </Box>
                  <Flex p={4} borderTop="1px solid" borderColor="rgba(255, 255, 255, 0.2)">
                    <Button 
                      onClick={handleGenerateMatch} 
                      colorScheme="purple" 
                      bg="#4A1A55"
                      _hover={{ bg: "#300D38" }}
                      isDisabled={favorites.length === 0}
                      width="100%"
                    >
                      Generate Match
                    </Button>
                  </Flex>
                </>
              ) : (
                <Flex direction="column" height="100%">
                  <Box flex={1} p={4}>
                    <DogCard dog={matchedDog} isFavorite={false} onToggleFavorite={() => {}} />
                  </Box>
                  <Flex p={4} borderTop="1px solid" borderColor="rgba(255, 255, 255, 0.2)">
                    <Button 
                      onClick={handleNewMatch} 
                      colorScheme="purple" 
                      bg="#4A1A55"
                      _hover={{ bg: "#300D38" }}
                      width="100%"
                    >
                      New Match
                    </Button>
                  </Flex>
                </Flex>
              )}
            </PopoverBody>
          </Box>
        </SlideFade>
      </PopoverContent>
    </Popover>
  );
};

export default FavoritesList;