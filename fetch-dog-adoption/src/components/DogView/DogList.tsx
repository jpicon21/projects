import React, { useState, useEffect } from 'react';
import {
  SimpleGrid,
  VStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { searchFiltersAtom, sortOptionAtom, pageAtom, favoritesAtom } from '../../atoms/searchAtoms';
import axios from 'axios';
import { SearchIcon } from '@chakra-ui/icons';
import Pagination from './Pagination';
import DogCard from './DogCard';

interface DogListProps {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const DogList: React.FC = () => {
  const [filters] = useAtom(searchFiltersAtom);
  const [sortOption] = useAtom(sortOptionAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [dogs, setDogs] = useState<DogListProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const searchResponse = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
          params: {
            ...filters,
            sort: `${sortOption.field}:${sortOption.direction}`,
            size: 20,
            from: (page - 1) * 20,
          },
          withCredentials: true,
        });

        const dogIds = searchResponse.data.resultIds;
        const dogsResponse = await axios.post('https://frontend-take-home-service.fetch.com/dogs', dogIds, { withCredentials: true });
        setDogs(dogsResponse.data);
        setTotalPages(Math.ceil(searchResponse.data.total / 20));
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };
    fetchDogs();
  }, [filters, sortOption, page]);

  const toggleFavorite = (dogId: string) => {
    setFavorites((prev) => 
      prev.includes(dogId) ? prev.filter(id => id !== dogId) : [...prev, dogId]
    );
  };

  const filteredDogs = dogs.filter(dog => 
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <VStack spacing={8} align="center" width="100%">
      <InputGroup size="lg" width="400px" maxWidth="100%">
        <Input
          placeholder="Search Dog's Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          borderRadius="full"
          pr="4.5rem"
        />
        <InputRightElement width="4.5rem">
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            size="sm"
            colorScheme="yellow"
            bg="#FBA919"
            color="white"
            borderRadius="full"
            _hover={{ bg: "#e69b16" }}
          />
        </InputRightElement>
      </InputGroup>

      <SimpleGrid columns={[1, 2, 3, 4]} spacing={8} width="100%">
        {filteredDogs.map((dog) => (
          <DogCard 
            key={dog.id} 
            dog={dog} 
            isFavorite={favorites.includes(dog.id)}
            onToggleFavorite={() => toggleFavorite(dog.id)}
          />
        ))}
      </SimpleGrid>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </VStack>
  );
};

export default DogList;