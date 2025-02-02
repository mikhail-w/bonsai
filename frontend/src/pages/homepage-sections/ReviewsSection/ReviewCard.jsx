import {
  Box,
  Text,
  Heading,
  Image,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaQuoteRight } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const titleColor = useColorModeValue('gray.800', 'white');
  const isMobile = useBreakpointValue({ base: true, lg: false });

  if (!review) return <Box width={isMobile ? 'calc(100vw - 80px)' : '350px'} />;

  return (
    <Box
      bg={bgColor}
      borderRadius="xl"
      boxShadow="lg"
      p={6}
      textAlign="center"
      width={isMobile ? 'calc(100vw - 80px)' : '350px'}
      minH="400px"
      position="relative"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
    >
      <Box position="relative" display="inline-block" mb={4}>
        <Image
          src={review.image}
          alt={review.name}
          borderRadius="full"
          boxSize="80px"
          objectFit="cover"
          mx="auto"
          border="3px solid"
          borderColor="green.400"
        />
        <Box
          position="absolute"
          top="-2px"
          right="-2px"
          bg="green.400"
          color="white"
          borderRadius="full"
          p={1.5}
        >
          <FaQuoteRight size="12px" />
        </Box>
      </Box>
      <Text
        padding={'0px 15px'}
        color={textColor}
        fontSize="lg"
        mb={4}
        fontStyle="italic"
      >
        {review.review}
      </Text>
      <Heading as="h3" size="md" color={titleColor} mb={1}>
        {review.name}
      </Heading>
      <Text color="gray.500" fontSize="sm">
        {review.position}
      </Text>
    </Box>
  );
};

export default ReviewCard;
