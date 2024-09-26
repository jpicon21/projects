import React from 'react';
import { HStack, Image, Box, Text, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Dog } from '../../atoms/dogAtom';

interface FavoriteDogCardProps {
  dog: Dog;
  onRemove: (id: string) => void;
}

const FavoriteDogCard: React.FC<FavoriteDogCardProps> = ({ dog, onRemove }) => {
  return (
    <HStack 
      bg="white" 
      p={2} 
      borderRadius="md" 
      spacing={3} 
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
      }}
      position="relative"
    >
      <IconButton
        aria-label="Remove from favorites"
        icon={<CloseIcon fontSize={10} />}
        size="xs"
        colorScheme="blue"
        borderRadius="full"
        position="absolute"
        top="-6px"
        right="-6px"
        onClick={() => onRemove(dog.id)}
      />
      <Image 
        src={dog.img} 
        alt={dog.name} 
        objectFit="cover" 
        boxSize="60px" 
        borderRadius="md" 
      />
      <Box>
        <Text fontWeight="bold" color="#4A1A55">{dog.name}, {dog.age} years</Text>
        <Text fontSize="sm" color="gray.600">{dog.breed}</Text>
      </Box>
    </HStack>
  );
};

export default FavoriteDogCard;