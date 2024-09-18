import { forwardRef } from 'react';
import { IconButton, Box, Text } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

interface FavoritesButtonProps {
  favoritesCount: number;
  onClick: () => void;
}

const FavoritesButton = forwardRef<HTMLButtonElement, FavoritesButtonProps>(
  ({ favoritesCount, onClick }, ref) => {
    return (
      <Box position="relative">
        <IconButton
          ref={ref}
          aria-label="Favorites"
          icon={<FaHeart />}
          onClick={onClick}
          isRound
          size="lg"
          bgColor="#FBA919"
          _hover={{ bgColor: "#e69b16" }}
          color="#4A1A55"
        />
        {favoritesCount > 0 && (
          <Box
            position="absolute"
            top="-2px"
            right="-2px"
            bg="red.500"
            color="white"
            borderRadius="full"
            width="20px"
            height="20px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="xs" fontWeight="bold">
              {favoritesCount}
            </Text>
          </Box>
        )}
      </Box>
    );
  }
);

export default FavoritesButton;