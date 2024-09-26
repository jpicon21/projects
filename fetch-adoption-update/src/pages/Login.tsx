import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, useToast } from '@chakra-ui/react';
import { useAuth } from '../utils/useAuth';

export const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ name, email }, () => {
        navigate('/search');
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [name, email, login, navigate, toast]);

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={8} align="stretch" width="300px">
        <Heading>Login</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FormControl>
            <Button 
              type="submit" 
              width="full" 
              isLoading={isLoading}
              loadingText="Logging in..."
            >
              Login
            </Button>
          </VStack>
        </form>
        {error && <Box color="red.500">{error.message}</Box>}
      </VStack>
    </Box>
  );
};