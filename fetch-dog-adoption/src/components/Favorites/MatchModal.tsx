import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  VStack,
  Badge,
} from '@chakra-ui/react';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  dog: Dog;
}

const MatchModal: React.FC<MatchModalProps> = ({ isOpen, onClose, dog }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your Perfect Match: {dog.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={dog.img} alt={dog.name} width="100%" objectFit="cover" borderRadius="md" />
          <VStack align="start" spacing={4} mt={4}>
            <Badge colorScheme="green">It's a Match!</Badge>
            <Text><strong>Breed:</strong> {dog.breed}</Text>
            <Text><strong>Age:</strong> {dog.age} years old</Text>
            <Text><strong>Location:</strong> {dog.zip_code}</Text>
            <Text><strong>ID:</strong> {dog.id}</Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MatchModal;