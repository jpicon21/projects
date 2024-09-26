import React from 'react';
import { Box, VStack, Button, useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SearchFilters } from './SearchFilters';
import { useAuth } from '../../utils/useAuth';

export const Sidebar: React.FC = () => {
  const { logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box width={isOpen ? "250px" : "60px"} transition="width 0.3s">
      <Button onClick={onToggle}>{isOpen ? "Close" : "Open"}</Button>
      {isOpen && (
        <VStack spacing={4} align="stretch">
          <SearchFilters />
          <Button 
            onClick={handleLogout} 
            isLoading={isLoading}
            loadingText="Logging out..."
          >
            Logout
          </Button>
        </VStack>
      )}
    </Box>
  );
};