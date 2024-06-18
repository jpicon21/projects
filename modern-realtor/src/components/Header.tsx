// src/components/Header.tsx
import { Box, Heading, Flex, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Header = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box bg="teal.500" color="white" px={4} py={3} mb={6}>
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">{title}</Heading>
        <Flex align="center">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              colorScheme="whiteAlpha"
              _hover={{ bg: 'teal.600' }}
              _expanded={{ bg: 'teal.600' }}
            />
            <MenuList bg="white" color="black">
              <MenuItem onClick={() => handleNavigation('/')} _hover={{ bg: 'teal.100' }}>
                Home
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('/cra')} _hover={{ bg: 'teal.100' }}>
                CRA Form
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('/cma')} _hover={{ bg: 'teal.100' }}>
                Competitive Market Analysis
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('/ppt')} _hover={{ bg: 'teal.100' }}>
                Property Price Trend Visualizer
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
