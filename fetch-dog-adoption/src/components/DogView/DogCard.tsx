import React, { useState } from 'react';
import { Box, Image, Text, VStack, AspectRatio, Flex, IconButton } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

interface DogCardProps {
  id: string;
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
}

const DogCard: React.FC<{ dog: DogCardProps; isFavorite: boolean; onToggleFavorite: () => void }> = ({ dog, isFavorite, onToggleFavorite }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <AspectRatio ratio={3/2} width="100%">
      <Box
        position="relative"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        onClick={() => setShowDetails(!showDetails)}
        transition="all 0.3s"
        _hover={{ transform: "scale(1.05)" }}
        boxShadow="lg"
      >
        {!showDetails ? (
          <>
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
              <Flex justify="flex-end" mt={2}>
                <Text fontSize="sm">Click for Details →</Text>
              </Flex>
            </Box>
            <IconButton
              aria-label="Favorite"
              icon={<FaHeart />}
              position="absolute"
              top={2}
              right={2}
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
              bg="rgba(128, 128, 128, 0.6)"
              color={isFavorite ? "red.500" : "gray.300"}
              _hover={{ bg: "rgba(128, 128, 128, 0.8)" }}
            />
          </>
        ) : (
          <Box
            bg="white"
            p={4}
            height="100%"
            overflowY="auto"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <VStack align="flex-start" spacing={2} width="100%">
              <Text><strong>NAME:</strong> {dog.name}</Text>
              <Text><strong>BREED:</strong> {dog.breed}</Text>
              <Text><strong>AGE:</strong> {dog.age} years</Text>
              <Text><strong>ZIP CODE:</strong> {dog.zip_code}</Text>
            </VStack>
          </Box>
        )}
      </Box>
    </AspectRatio>
  );
};

export default DogCard;