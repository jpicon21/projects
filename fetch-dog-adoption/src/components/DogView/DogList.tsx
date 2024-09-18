import React, { useEffect, useState } from 'react';
import { SimpleGrid, VStack, InputGroup, Input, Center, InputLeftElement } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { searchFiltersAtom, sortOptionAtom, pageAtom, favoritesAtom } from '../../atoms/searchAtoms';
import { dogsAtom, searchDogsAtom, SearchParams } from '../../atoms/dogAtom';
import { SearchIcon } from '@chakra-ui/icons';
import Pagination from './Pagination';
import DogCard from './DogCard';

const DogList: React.FC = () => {
  const [filters] = useAtom(searchFiltersAtom);
  const [sortOption] = useAtom(sortOptionAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [allDogs] = useAtom(dogsAtom);
  const [, searchDogs] = useAtom(searchDogsAtom);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDogs = async () => {
      const searchParams: SearchParams = {
        ...filters,
        sort: `${sortOption.field}:${sortOption.direction}`,
        size: 20,
        from: (page - 1) * 20,
      };
      const total = await searchDogs(searchParams);
      setTotalPages(Math.ceil(total / 20));
    };
    fetchDogs();
  }, [filters, sortOption, page, searchDogs]);

  const toggleFavorite = (dogId: string) => {
    setFavorites((prev) => {
      if (prev.includes(dogId)) {
        return prev.filter(id => id !== dogId);
      } else {
        return [...prev, dogId];
      }
    });
  };

  const filteredDogs = allDogs.filter(dog => 
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <VStack spacing={8} align="stretch" width="100%">
      <InputGroup size="lg" maxWidth="400px" alignSelf="center">
        <InputLeftElement width="4.5rem">
          <Center 
            width="10" 
            height="10" 
            borderRadius="full" 
            bg="#FBA919"
            ml="-25px"
          >
            <SearchIcon color="#4A1A55" />
          </Center>
        </InputLeftElement>
        <Input
          placeholder="Search Dog's Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          borderRadius="full"
          pl="3rem"
        />
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