// BenefitModal.jsx
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
  Skeleton,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { overlayColors } from './benefitsData';
import { useState } from 'react';

const MotionModalContent = motion(ModalContent);
const MotionModalOverlay = motion(ModalOverlay);

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
      duration: 0.3,
    },
  },
};

const PreloadedImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box position="relative" {...props}>
      <Skeleton isLoaded={isLoaded} h="100%" w="100%" fadeDuration={0.4}>
        <Image
          src={src}
          alt={alt}
          objectFit="cover"
          h="100%"
          w="100%"
          onLoad={() => setIsLoaded(true)}
        />
      </Skeleton>
    </Box>
  );
};

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
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          motionPreset="scale"
          size="6xl"
        >
          <MotionModalOverlay
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            bg={
              modalIndex !== null ? overlayColors[modalIndex] : 'blackAlpha.600'
            }
            backdropFilter="blur(2px)"
          />
          <MotionModalContent
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            maxW={{ base: '95vw', md: '80vw', lg: '900px' }}
            maxH={{ base: '90vh', md: '85vh' }}
            h={{ base: 'auto', md: '600px' }}
            borderRadius="xl"
            boxShadow="xl"
            overflow="hidden"
          >
            <ModalCloseButton
              zIndex={2}
              color="white"
              bg="blackAlpha.400"
              borderRadius="full"
              size="lg"
              _hover={{ bg: 'blackAlpha.600' }}
            />
            <Flex direction={{ base: 'column', md: 'row' }} h="100%">
              <Box
                w="100%"
                h={{ base: '300px', md: '100%' }}
                maxH={{ base: '40vh', md: '100%' }}
              >
                <PreloadedImage
                  src={benefit.image}
                  alt={benefit.title}
                  h="100%"
                />
              </Box>

              <Box
                w="100%"
                h={{ base: 'auto', md: '100%' }}
                flex={{ base: '1', md: '0 0 50%' }}
              >
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ height: '100%' }}
                >
                  <Flex
                    direction="column"
                    bg={cardBg}
                    p={{ base: 6, md: 8 }}
                    justify="space-between"
                    h="100%"
                  >
                    <Box>
                      <Flex direction="column" align="center" mb={6}>
                        <Text fontSize="4xl" mb={4}>
                          {benefit.icon}
                        </Text>
                        <Heading
                          size={{ base: 'lg', md: 'xl' }}
                          mb={{ base: '0px', md: '50px' }}
                          color={headingColor}
                          fontFamily="lato"
                          fontWeight="500"
                          textAlign="center"
                        >
                          {benefit.title}
                        </Heading>
                      </Flex>

                      <Text
                        fontWeight={{ base: '400', md: '300' }}
                        fontSize={{ base: 'md', md: '2xl' }}
                        fontFamily="lato"
                        lineHeight="tall"
                        color={textColor}
                        textAlign="center"
                      >
                        {benefit.additional}
                      </Text>
                    </Box>

                    <Flex justify="center" mt={6}>
                      <Button
                        colorScheme="green"
                        size="lg"
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
                  </Flex>
                </motion.div>
              </Box>
            </Flex>
          </MotionModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default BenefitModal;
