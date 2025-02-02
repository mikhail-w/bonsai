import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  Flex,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Image,
  useBreakpointValue,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { useState } from 'react';
import h3 from '../../assets/images/hr4.jpg';
import m1 from '../../assets/images/m1.jpg';
import m2 from '../../assets/images/m2.jpg';
import m3 from '../../assets/images/m3.jpg';
import m4 from '../../assets/images/m5.jpg';
import '../../assets/styles/holo.css';
import CustomHeading from '../../components/CustomHeading';

const BenefitsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue('gray.900', 'white');
  const headingColor = useColorModeValue('green.700', '#32CD32');
  const cardBg = useColorModeValue('#F0F7EE', 'rgba(45, 55, 72, 0.8)');
  const cardBorder = useColorModeValue('gray.200', 'gray.600');

  const benefits = [
    {
      icon: '🌿',
      title: 'Connect with Nature',
      description:
        'Growing bonsai helps foster a deep connection with nature, bringing tranquility and peace into your home.',
      additional:
        'Caring for a bonsai fosters mindfulness and appreciation for nature, bringing seasonal beauty and tranquility into your home.',
      image: m1,
    },
    {
      icon: '🧘‍♂️',
      title: 'Reduce Stress',
      description:
        'The patience and care required for bonsai cultivation can help reduce stress and promote mindfulness.',
      additional:
        'The meditative practice of shaping and nurturing a bonsai helps lower stress, increase focus, and promote a sense of calm.',
      image: m2,
    },
    {
      icon: '💧',
      title: 'Improve Air Quality',
      description:
        'Bonsai plants purify the air by filtering toxins, making your indoor environment healthier.',
      additional:
        'Bonsai trees filter indoor pollutants and release oxygen, creating a fresher and healthier living environment.',
      image: m3,
    },
    {
      icon: '🌸',
      title: 'Enhance Home Decor',
      description:
        'Bonsai plants add a touch of elegance and zen to any room, enhancing your home decor naturally.',
      additional:
        'A bonsai’s natural elegance and artistic beauty enhance any space, adding a calming and sophisticated touch to your home.',
      image: m4,
    },
  ];

  const hoverColors = [
    {
      bg: 'linear-gradient(180deg, #E6F4EA 0%, #B4D6B4 100%)',
      text: '#000000',
      heading: '#fff',
    },
    { bg: 'rgba(93, 236, 107, 0.7)', text: '#000000', heading: '#F9F8F6' },
    { bg: 'rgba(166, 152, 218, 0.7)', text: '#000000', heading: '#FAFAED' },
    { bg: 'rgba(59, 205, 238, 0.7)', text: '#000000', heading: '#FAFAED' },
  ];

  const overlayColors = [
    'linear-gradient(to right bottom, rgba(93, 236, 107, 0.8), rgba(40, 180, 133, 0.8))',
    'linear-gradient(to right bottom, rgba(166, 152, 218, 0.8), rgba(142, 68, 173, 0.8))',
    'linear-gradient(to right bottom, rgba(59, 205, 238, 0.8), rgba(39, 125, 217, 0.8))',
    'linear-gradient(to right bottom, rgba(251, 92, 116, 0.8), rgba(227, 67, 51, 0.8))',
  ];

  const overlayGradient = useColorModeValue(
    'linear-gradient(to right bottom, rgba(126, 213, 111, 0.8), rgba(40, 180, 133, 0.8))',
    'linear-gradient(to right bottom, rgba(45, 52, 54, 0.8), rgba(25, 42, 86, 0.8))'
  );

  const openModal = index => {
    setModalIndex(index);
    onOpen();
  };

  return (
    <>
      <Box
        className="section-features"
        bgImage={{
          base: `${
            hoveredIndex !== null
              ? overlayColors[hoveredIndex]
              : overlayGradient
          }, url(${h3})`,
        }}
        bgSize="cover"
        bgPosition="center"
        transform="skewY(-7deg)"
        mt={-40}
        py={{ base: '6rem', md: '10rem', lg: '15rem' }}
        px={{ base: '1rem', md: '2rem', lg: '4rem' }}
      >
        <Center>
          <CustomHeading
            size="2xl"
            color="white"
            transform="skewY(7deg)"
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
          >
            BENEFITS
          </CustomHeading>
        </Center>
        <Box transform="skewY(7deg)">
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
            spacing={10}
            justifyItems="center"
          >
            {benefits.map((benefit, index) => (
              <Box
                bg={cardBg}
                borderRadius="xl"
                boxShadow="lg"
                border="1px solid"
                borderColor={cardBorder}
                p={6}
                transition="all 0.3s ease"
                key={index}
                maxW="350px"
                maxH="350px"
                minH="300px"
                className="holographic-card"
                style={{
                  '--hover-bg-color': hoverColors[index].bg,
                  '--hover-text-color': hoverColors[index].text,
                  '--hover-heading-color': hoverColors[index].heading,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openModal(index)}
                cursor="pointer"
                transition="transform 0.3s ease, box-shadow 0.3s ease"
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                }}
                borderRadius="lg"
                overflow="hidden"
              >
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  textAlign="center"
                  height="100%"
                  p={4}
                >
                  <Text fontSize="4xl" mb={4}>
                    {benefit.icon}
                  </Text>
                  <Heading
                    className="hoverable-text-heading"
                    fontFamily="lato"
                    as="h3"
                    size="md"
                    mb={2}
                    color="cyan.400"
                  >
                    {benefit.title}
                  </Heading>
                  <Text
                    className="hoverable-text"
                    fontFamily="lato"
                    fontWeight="400"
                    color={'gray.300'}
                    transition="color 0.5s ease"
                  >
                    {benefit.description}
                  </Text>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg={
            modalIndex !== null ? overlayColors[modalIndex] : 'blackAlpha.600'
          }
          backdropFilter="blur(2px)"
        />
        <ModalContent
          maxW={{ base: '95vw', md: '80vw', lg: '900px' }}
          maxH={{ base: '95vh', md: '85vh' }}
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
            m={2}
            _hover={{
              bg: 'blackAlpha.600',
            }}
          />

          <Flex direction={{ base: 'column', md: 'row' }} h="100%">
            {/* Image Section */}
            <Box
              w={{ base: '100%', md: '50%' }}
              h={{ base: '35vh', md: '100%' }}
              position="relative"
            >
              {modalIndex !== null && (
                <Image
                  src={benefits[modalIndex].image}
                  alt={benefits[modalIndex].title}
                  objectFit="cover"
                  h="100%"
                  w="100%"
                />
              )}
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
              {modalIndex !== null && (
                <>
                  {/* Title Section */}
                  <Flex direction="column" align="center" mb={4}>
                    <Text fontSize="3xl" mb={2}>
                      {benefits[modalIndex].icon}
                    </Text>
                    <Heading
                      size={{ base: 'lg', md: 'xl' }}
                      // color="green.700"
                      color={headingColor}
                      fontFamily="lato"
                      fontWeight="500"
                      textAlign="center"
                    >
                      {benefits[modalIndex].title}
                    </Heading>
                  </Flex>

                  <ModalBody p={0}>
                    {modalIndex !== null && (
                      <Flex
                        align="center"
                        justify="center"
                        height="80%" // Ensures full height
                        textAlign="center"
                      >
                        <Text
                          fontWeight={{ base: '400', md: '300' }}
                          fontSize={{ base: 'md', md: 'lg', lg: '2xl' }}
                          fontFamily="lato"
                          lineHeight="tall"
                          color={textColor}
                        >
                          {benefits[modalIndex].additional}
                        </Text>
                      </Flex>
                    )}
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
                </>
              )}
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BenefitsSection;
