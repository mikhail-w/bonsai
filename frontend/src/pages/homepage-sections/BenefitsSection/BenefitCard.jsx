import { Box, Flex, Text, Heading, useColorModeValue } from '@chakra-ui/react';
import { hoverColors } from './benefitsData';
import '../../../assets/styles/holo.css';

const BenefitCard = ({
  benefit,
  index,
  openModal,
  cardBg,
  setHoveredIndex,
}) => {
  const cardBorder = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      bg={cardBg}
      borderRadius="xl"
      boxShadow="lg"
      border="1px solid"
      borderColor={cardBorder}
      p={6}
      key={index}
      maxW="350px"
      maxH="350px"
      minH="300px"
      className="holographic-card"
      userSelect="none"
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        touchAction: 'none',
        '--hover-bg-color': hoverColors[index].bg,
        '--hover-text-color': hoverColors[index].text,
        '--hover-heading-color': hoverColors[index].heading,
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={() => openModal(index)}
      cursor="pointer"
      overflow="hidden"
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      }}
      transition="transform 0.3s ease, box-shadow 0.3s ease"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        height="100%"
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
          color="gray.300"
          transition="color 0.5s ease"
        >
          {benefit.description}
        </Text>
      </Flex>
    </Box>
  );
};

export default BenefitCard;
