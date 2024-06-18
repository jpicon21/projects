// src/pages/CMA.tsx
import { useAtom } from 'jotai';
import { searchAddressAtom, homesDataAtom, Home } from '../atoms/atom';
import { Box, Button, Input, Spinner, Text, Image, SimpleGrid } from '@chakra-ui/react';
import { loadCsvData } from '../utils/loadCsv';
import Header from '../components/Header';

export const CMA = () => {
  const [searchAddress] = useAtom(searchAddressAtom);
  const [homesData, setHomesData] = useAtom(homesDataAtom);

  const handleSearch = () => {
    const csvUrl = '/HomeHarvest.csv';
    loadCsvData(csvUrl, setHomesData);
  };

  console.log(homesData);

  return (
    <>
    <Header title=" Competitive Market Analysis (CMA)" />
    <Box mx="auto" p={5} bgColor={"#F9F6EB"}>
      <Box maxW="70%" display="flex" justifyContent="center" margin="auto" mb={8}>
        <Input
          type="text"
          placeholder="Enter address"
          value={searchAddress}
          isReadOnly
          size="lg"
          variant="outline"
          mr={4}
          bgColor={"white"}
        />
        <Button onClick={handleSearch} colorScheme="blue" size="lg">
          Search
        </Button>
      </Box>

      {homesData.length === 0 && (
        <Box display="flex" justifyContent="center" my={6}>
          <Spinner size="xl" />
        </Box>
      )}

      {homesData.length > 0 && (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={8}>
          {homesData.map((home: Home, index: number) => (
            <Box
              key={index}
              height={"400px"}
              position="relative"
              borderWidth="1px"
              borderRadius="lg"
              borderColor={"#F9F6EB"}
              overflow="hidden"
              boxShadow="md"
              _hover={{ transform: 'scale(1.05)' }}
              transition="transform 0.3s ease-in-out"
            >
              <Image src={home.primary_photo} alt={home.street} boxSize="100%" objectFit="cover" />
              <Box
                position="absolute"
                bottom="0"
                left="0"
                width="100%"
                bg="rgba(0, 0, 0, 0.6)"
                color="white"
                p={4}
                zIndex="1"
              >
                <Text fontWeight="bold" fontSize="md">{home.street}</Text>
                {home.price_per_sqft ? <Text fontSize="sm">${parseFloat(home.price_per_sqft).toFixed(2)} per SqFt</Text> : <Text fontSize="sm">Price per SqFt: N/A</Text>}
                <Text fontSize="sm">Bed(s): {home.beds}</Text>
                <Text fontSize="sm">Full Bath(s): {home.full_baths}</Text>
                {home.half_baths && <Text fontSize="sm">Half Bath(s): {home.half_baths}</Text>}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
    </>
  );
};
