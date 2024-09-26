import React, { useState, useEffect } from 'react';
import { Flex, Button, Text, Input, HStack } from '@chakra-ui/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState(currentPage.toString());

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPage = parseInt(inputPage);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    } else {
      setInputPage(currentPage.toString());
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Flex justify="center" align="center" mt={6}>
      <Button
        onClick={handlePrevClick}
        isDisabled={currentPage === 1}
        mr={4}
        size="sm"
        bg="#FBA919"
        color="#4A1A55"
        _hover={{ bg: "#e69b16" }}
      >
        Previous
      </Button>
      <HStack>
        <Text fontSize="sm">Page</Text>
        <form onSubmit={handleInputSubmit}>
          <Input
            value={inputPage}
            onChange={handleInputChange}
            onBlur={handleInputSubmit}
            size="sm"
            width="50px"
            textAlign="center"
          />
        </form>
        <Text fontSize="sm">of {totalPages}</Text>
      </HStack>
      <Button
        onClick={handleNextClick}
        isDisabled={currentPage === totalPages}
        ml={4}
        size="sm"
        bg="#FBA919"
        color="#4A1A55"
        _hover={{ bg: "#e69b16" }}
      >
        Next
      </Button>
    </Flex>
  );
};