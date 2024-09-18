import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../atoms/searchAtoms';
import DogList from '../components/DogView/DogList';
import FavoritesList from '../components/Favorites/FavoritesList';
import FavoritesButton from '../components/Favorites/FavoritesButton';
import Sidebar from '../components/Sidebar/Sidebar';

const SearchPage: React.FC = () => {
  const [favorites] = useAtom(favoritesAtom);
  const { isOpen: isSidebarOpen, onToggle: toggleSidebar } = useDisclosure({ defaultIsOpen: true });
  const { isOpen: isFavoritesOpen, onOpen: openFavorites, onClose: closeFavorites } = useDisclosure();

  return (
    <Flex minHeight="100vh">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <Box 
        flex={1} 
        ml={isSidebarOpen ? { base: '60px', md: '270px' } : '60px'} 
        transition="margin-left 0.3s"
        p={4}
      >
        <Box position="fixed" top="20px" right="20px" zIndex="sticky">
          <FavoritesList isOpen={isFavoritesOpen} onClose={closeFavorites}>
            <FavoritesButton 
              favoritesCount={favorites.length} 
              onClick={openFavorites}
            />
          </FavoritesList>
        </Box>
        <DogList />
      </Box>
    </Flex>
  );
};

export default SearchPage;