import React, { useState } from 'react';
import {
  Flex,
  HStack,
  Box,
  Button,
  Icon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCube, FaArrowsAlt } from 'react-icons/fa';
import ThreeDModelViewer from './3DModel/ThreeDModelViewer';
import AugmentedReality from '../Dashboard/AugmentedReality';

const ProductButtons = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isQrOpen,
    onOpen: onQrOpen,
    onClose: onQrClose,
  } = useDisclosure();
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleQrCodeGeneration = () => {
    const qrCodeGenerator = new AugmentedReality({
      generateQrCode: setQrCodeUrl,
    });
    qrCodeGenerator();
    onQrOpen();
  };

  // Shared styles for the option boxes
  const boxStyles = {
    borderWidth: '1px',
    borderRadius: 'lg',
    boxShadow: 'md',
    p: 3,
    textAlign: 'center',
    flex: '1',
    h: '80px',
    cursor: 'pointer',
    _hover: { bg: useColorModeValue('gray.100', 'gray.700') },
  };

  // Shared styles for the buttons inside the boxes
  const buttonStyles = {
    variant: 'unstyled',
    h: '100%',
    w: '100%',
    _hover: { bg: useColorModeValue('gray.100', 'gray.700') },
  };

  return (
    <>
      <Flex justifyContent="center" my={6} maxW="370px" mx="auto">
        <HStack spacing={4} w="100%">
          <Box {...boxStyles}>
            <Button {...buttonStyles} onClick={onOpen}>
              <Flex direction="column" align="center" justify="center" h="100%">
                <Icon as={FaCube} boxSize={5} mb={1} />
                <Text fontSize="sm">See this item in 3D</Text>
              </Flex>
            </Button>
          </Box>
          <Box {...boxStyles}>
            <Button {...buttonStyles} onClick={handleQrCodeGeneration}>
              <Flex direction="column" align="center" justify="center" h="100%">
                <Icon as={FaArrowsAlt} boxSize={5} mb={1} />
                <Text fontSize="sm">See it in your space</Text>
              </Flex>
            </Button>
          </Box>
        </HStack>
      </Flex>

      {/* 3D Model Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          // maxW="800px"
          maxW={{ base: '90vw', md: '800px' }}
          h={{ base: '80vh', md: '600px' }}
          borderRadius="xl"
          overflow="hidden"
        >
          <ModalHeader
            bgGradient="linear(to-r, #38a169, green.500)"
            color="white"
            textAlign="center"
            fontSize="lg"
            py={4}
          >
            3D Model Viewer
          </ModalHeader>
          <ModalCloseButton color="white" mt={2} />
          <ModalBody p={4} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Box h="100%" w="100%">
              <ThreeDModelViewer />
            </Box>
          </ModalBody>
          <ModalFooter
            bg={useColorModeValue('gray.50', 'gray.800')}
            py={4}
            justifyContent="center"
          >
            {/* <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button> */}
            <Flex w="full" justify="center">
              <Button
                colorScheme="green"
                size="md"
                minW="120px"
                onClick={onClose}
                borderRadius="full"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* QR Code Modal */}
      <Modal isOpen={isQrOpen} onClose={onQrClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent borderRadius="xl">
          <ModalHeader
            bgGradient="linear(to-r, purple.500, pink.500)"
            color="white"
            textAlign="center"
            fontSize="lg"
            py={4}
          >
            Scan to See in Augmented Reality
          </ModalHeader>
          <ModalCloseButton color="white" mt={2} />
          <ModalBody
            p={4}
            bg={useColorModeValue('gray.50', 'gray.800')}
            display="flex"
            justifyContent="center"
          >
            {qrCodeUrl ? (
              <Image
                src={qrCodeUrl}
                alt="QR Code"
                boxSize="200px"
                objectFit="contain"
              />
            ) : (
              <Text>Loading QR Code...</Text>
            )}
          </ModalBody>
          <ModalFooter
            bg={useColorModeValue('gray.50', 'gray.800')}
            py={4}
            justifyContent="center"
          >
            <Button colorScheme="green" onClick={onQrClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductButtons;
