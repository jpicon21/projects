import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { isAuthenticatedAtom, userAtom } from '../atoms/authAtom';
import axios, { AxiosError } from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Container,
  useToast,
} from '@chakra-ui/react';

interface ErrorResponse {
  message: string;
}

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/auth/login',
        { name, email },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser({ name, email });
        navigate('/search');
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          errorMessage = axiosError.response.data?.message || `Server error: ${axiosError.response.status}`;
        } else if (axiosError.request) {
          errorMessage = "No response received from server. Please check your internet connection.";
        } else {
          errorMessage = axiosError.message;
        }
      }
      toast({
        title: "Login failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box 
      minHeight="100vh" 
      width="100%" 
      bg="#300D38" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
    >
      <Container maxW="md" bg="white" p={8} borderRadius="lg" boxShadow="xl">
        <VStack spacing={6} align="stretch">
          <Heading color="#FBA919" textAlign="center">Login</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  borderColor="#300D38"
                  _hover={{ borderColor: "#FBA919" }}
                  _focus={{ borderColor: "#FBA919", boxShadow: "0 0 0 1px #FBA919" }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  borderColor="#300D38"
                  _hover={{ borderColor: "#FBA919" }}
                  _focus={{ borderColor: "#FBA919", boxShadow: "0 0 0 1px #FBA919" }}
                />
              </FormControl>
              <Button 
                type="submit" 
                width="full" 
                mt={4} 
                bg="#FBA919" 
                color="white"
                _hover={{ bg: "#e69b16" }}
              >
                Login
              </Button>
            </VStack>
          </form>
          <Text fontSize="sm" textAlign="center">
            Enter your name and email to start finding your perfect dog!
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default LoginPage;