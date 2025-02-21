import React from 'react';
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
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaCube, FaArrowsAlt } from 'react-icons/fa';
import ThreeDModelViewer from './3DModel/ThreeDModelViewer';
import QRCode from 'qrcode';
import { useState, useEffect } from 'react';

const ProductButtons = () => {
  const {
    isOpen: is3DOpen,
    onOpen: on3DOpen,
    onClose: on3DClose,
  } = useDisclosure();
  const {
    isOpen: isAROpen,
    onOpen: onAROpen,
    onClose: onARClose,
  } = useDisclosure();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const isMobile = useBreakpointValue({ base: true, md: false });

  // S3 URLs for 3D models
  const gltfUrl = `${import.meta.env.VITE_S3_PATH}/media/ficus_bonsai.glb`;
  const usdzUrl = `${import.meta.env.VITE_S3_PATH}/media/ficus_bonsai.usdz`;

  // Detect iOS device
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Get appropriate AR URL based on device
  const arUrl = isIOS
    ? usdzUrl
    : `https://arvr.google.com/scene-viewer/1.0?file=${gltfUrl}&mode=ar-only`;

  useEffect(() => {
    if (!isMobile) {
      // Generate QR code only for desktop
      QRCode.toDataURL(arUrl, { width: 200 }, (err, url) => {
        if (!err) {
          setQrCodeUrl(url);
        }
      });
    }
  }, [arUrl, isMobile]);

  const handleARClick = () => {
    if (isMobile) {
      // Direct to AR viewer on mobile
      window.location.href = arUrl;
    } else {
      // Show QR code modal on desktop
      onAROpen();
    }
  };

  // Shared styles
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

  const buttonStyles = {
    variant: 'unstyled',
    h: '100%',
    w: '100%',
    _hover: { bg: 'transparent' },
  };

  return (
    <>
      <Flex justifyContent="center" my={6} maxW="370px" mx="auto">
        <HStack spacing={4} w="100%">
          <Box {...boxStyles}>
            <Button {...buttonStyles} onClick={on3DOpen}>
              <VStack spacing={1}>
                <Icon as={FaCube} boxSize={5} />
                <Text fontSize="sm">See this item in 3D</Text>
              </VStack>
            </Button>
          </Box>
          <Box {...boxStyles}>
            <Button {...buttonStyles} onClick={handleARClick}>
              <VStack spacing={1}>
                <Icon as={FaArrowsAlt} boxSize={5} />
                <Text fontSize="sm">See it in your space</Text>
              </VStack>
            </Button>
          </Box>
        </HStack>
      </Flex>

      {/* QR Code Modal (desktop only) */}
      <Modal isOpen={isAROpen} onClose={onARClose} isCentered>
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
            <Button colorScheme="purple" onClick={onARClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 3D Model Modal */}
      <Modal isOpen={is3DOpen} onClose={on3DClose} size="xl" isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          maxW={{ base: '90vw', md: '800px' }}
          h={{ base: '80vh', md: '600px' }}
          borderRadius="xl"
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
            <Button
              colorScheme="green"
              size="md"
              minW="120px"
              onClick={on3DClose}
              borderRadius="full"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductButtons;
