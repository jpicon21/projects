// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Button, Flex, VStack } from '@chakra-ui/react';
import Header from '../components/Header';

export const Home = () => {
  return (
    <>
      <Header title="Modern Realtor Code Assignment" />
      <Box bg="#F9F6EB" minH="100vh" py={8} px={4}>
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="2xl" mb={4}>Welcome to Modern Realtor Coding Assignment</Heading>
        </Box>
        <Flex justify="center">
          <VStack spacing={8} maxW="1200px" w="100%">
            <Box
              bg="white"
              p={6}
              boxShadow="lg"
              borderRadius="md"
              textAlign="center"
              width="100%"
              maxW="800px"
            >
              <Heading as="h2" size="lg" mb={4}>California Residential Purchase Agreement (CRA)</Heading>
              <Text mb={4}>
                Learn about the California Residential Purchase Agreement and guide yourself through filling out the first page of the CAR RPA form.
              </Text>
              <Button as={Link} to="/cra" colorScheme="teal">
                Go to CRA Page
              </Button>
            </Box>
            <Box
              bg="white"
              p={6}
              boxShadow="lg"
              borderRadius="md"
              textAlign="center"
              width="100%"
              maxW="800px"
            >
              <Heading as="h2" size="lg" mb={4}>Competitive Market Analysis (CMA)</Heading>
              <Text mb={4}>
                View similar homes sold nearby based on a given address and get up-to-date information on the real estate market.
              </Text>
              <Button as={Link} to="/cma" colorScheme="teal">
                Go to CMA Page
              </Button>
            </Box>
            <Box
              bg="white"
              p={6}
              boxShadow="lg"
              borderRadius="md"
              textAlign="center"
              width="100%"
              maxW="800px"
            >
              <Heading as="h2" size="lg" mb={4}>Property Price Trends (PPT)</Heading>
              <Text mb={4}>
                Analyze various scatter plots of sold home data based on address, radius, and number of days to see trends in the market.
              </Text>
              <Button as={Link} to="/ppt" colorScheme="teal">
                Go to PPT Page
              </Button>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </>
  );
};
