import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex,
  Box,
  Image,
  Text,
  Heading,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { overlayColors } from './benefitsData';

const BenefitModal = ({
  isOpen,
  onClose,
  modalIndex,
  benefits,
  cardBg,
  headingColor,
  textColor,
}) => {
  if (modalIndex === null) return null;

  const benefit = benefits[modalIndex];

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        bg={modalIndex !== null ? overlayColors[modalIndex] : 'blackAlpha.600'}
        backdropFilter="blur(2px)"
      />
      <ModalContent
        maxW={{ base: '95vw', md: '80vw', lg: '900px' }}
        maxH={{ base: '95vh', md: '85vh' }}
        borderRadius="xl"
        boxShadow="xl"
        overflow="hidden"
      >
        {' '}
        <ModalCloseButton
          zIndex={2}
          color="white"
          bg="blackAlpha.400"
          borderRadius="full"
          size="lg"
          _hover={{ bg: 'blackAlpha.600' }}
        />
        <Flex direction={{ base: 'column', md: 'row' }} h="100%">
          {/* Image Section */}
          <Box
            position="relative"
            w={{ base: '100%', md: '50%' }}
            h={{ base: '35vh', md: '100%' }}
          >
            <Image
              src={benefit.image}
              alt={benefit.title}
              objectFit="cover"
              h="100%"
              w="100%"
            />
          </Box>
          {/* Content Section */}
          <Flex
            direction="column"
            w={{ base: '100%', md: '50%' }}
            bg={cardBg}
            p={{ base: 6, md: 8 }}
            justify="space-between"
            align="center"
            minH="100%"
          >
            {/* Title Section */}
            <Flex direction="column" align="center" mb={4}>
              <Text fontSize="3xl">{benefit.icon}</Text>
              <Heading
                size={{ base: 'lg', md: 'xl' }}
                color={headingColor}
                fontFamily="lato"
                fontWeight="500"
                textAlign="center"
              >
                {benefit.title}
              </Heading>
            </Flex>

            {/* Body Section */}
            <ModalBody p={0}>
              <Flex
                align="center"
                justify="center"
                height="80%"
                textAlign="center"
              >
                <Text
                  fontWeight={{ base: '400', md: '300' }}
                  fontSize={{ base: 'md', md: 'lg', lg: '2xl' }}
                  fontFamily="lato"
                  lineHeight="tall"
                  color={textColor}
                >
                  {benefit.additional}
                </Text>
              </Flex>
              {/* Button Section */}
              <Flex w="full" justify="center" mt={6}>
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
            </ModalBody>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default BenefitModal;
