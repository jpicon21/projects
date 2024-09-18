import React from 'react';
import {
  Box,
  VStack,
  IconButton,
  Button,
  Collapse,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { ChevronLeftIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useSetAtom } from 'jotai';
import { logoutAtom } from '../../atoms/authAtom';
import { useNavigate } from 'react-router-dom';
import SortingControls from './SortingControls';
import SearchFilters from './SearchFilters';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const logout = useSetAtom(logoutAtom);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      width={isOpen ? '275px' : '60px'}
      bgGradient="linear(to-b, #4A1A55, #300D38, #1A0720)"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.2)"
      transition="width 0.3s ease"
      zIndex={10}
    >
      <Flex direction="column" height="100%" align={isOpen ? "stretch" : "center"}>
        <Box p={3} alignSelf={isOpen ? "flex-start" : "center"}>
          <IconButton
            aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            icon={isOpen ? <ChevronLeftIcon /> : <HamburgerIcon />}
            onClick={onToggle}
            variant="ghost"
            color="whiteAlpha.800"
            _hover={{ bg: 'whiteAlpha.200', color: '#FBA919' }}
            size="lg"
          />
        </Box>

        <Collapse in={isOpen} animateOpacity>
          <VStack spacing={6} align="stretch" p={4}>
            <SortingControls />
            <Divider borderColor="whiteAlpha.300" />
            <SearchFilters />
          </VStack>
        </Collapse>

        <Box mt="auto" p={4} width={isOpen ? "100%" : "auto"} alignSelf={isOpen ? "stretch" : "center"}>
          {isOpen ? (
            <Button
              onClick={handleLogout}
              width="full"
              bg="#FBA919"
              color="#300D38"
              _hover={{ 
                bg: "#e69b16",
                color: "#300D38" 
              }}
              p={2}
            >
              Logout
            </Button>
          ) : (
            <IconButton
              aria-label="Logout"
              icon={<CloseIcon />}
              onClick={handleLogout}
              bg="#FBA919"
              color="#300D38"
              _hover={{ 
                bg: "#e69b16",
                color: "#300D38" 
              }}
              size="md"
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;