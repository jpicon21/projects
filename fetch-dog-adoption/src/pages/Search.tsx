import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../atoms/searchAtoms';
import DogList from '../components/DogView/DogList';
import FavoritesList from '../components/Favorites/FavoritesList';
import Sidebar from '../components/Sidebar/Sidebar';

const SearchPage: React.FC = () => {
  const [favorites] = useAtom(favoritesAtom);
  const hasFavorites = favorites.length > 0;
  const { isOpen: isSidebarOpen, onToggle: toggleSidebar } = useDisclosure({ defaultIsOpen: true });

  return (
    <Flex>
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <Box 
        flex={1} 
        ml={isSidebarOpen ? { base: '60px', md: '300px' } : '60px'} 
        transition="margin-left 0.3s"
        p={4}
      >
        <Flex direction={['column', 'column', 'row']} gap={4}>
          <Box flex={hasFavorites ? 2 : 3} transition="flex 0.3s">
            <DogList />
          </Box>
          {hasFavorites && (
            <Box flex={1} transition="flex 0.3s">
              <FavoritesList />
            </Box>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default SearchPage;