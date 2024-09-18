import React from 'react';
import { Box, Image, Text, AspectRatio, IconButton } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

interface DogCardProps {
  id: string;
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
}

interface Props {
  dog: DogCardProps;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const DogCard: React.FC<Props> = ({ dog, isFavorite, onToggleFavorite }) => {
  return (
    <AspectRatio ratio={3/2} width="100%">
      <Box
        position="relative"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
      >
        <Image src={dog.img} alt={dog.name} objectFit="cover" w="100%" h="100%" />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p={4}
          bgGradient="linear(to-t, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)"
          color="white"
        >
          <Text fontWeight="bold" fontSize="xl">{dog.name}, {dog.age} years</Text>
          <Text>{dog.breed}</Text>
          <Text fontSize="sm" color="gray.400">Location: {dog.zip_code}</Text>
        </Box>
        <IconButton
          aria-label="Favorite"
          icon={<FaHeart />}
          position="absolute"
          top={2}
          right={2}
          onClick={onToggleFavorite}
          bg={isFavorite ? "rgba(74, 26, 85, 0.8)" : "rgba(128, 128, 128, 0.6)"}
          color={isFavorite ? "#FBA919" : "white"}
          _hover={{ bg: isFavorite ? "rgba(48, 13, 56, 0.8)" : "rgba(128, 128, 128, 0.8)" }}
        />
      </Box>
    </AspectRatio>
  );
};

export default DogCard;