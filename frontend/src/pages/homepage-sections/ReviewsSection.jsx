import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Heading,
  Image,
  SimpleGrid,
  useBreakpointValue,
  useColorModeValue,
  IconButton,
  Flex,
  Circle,
  useColorMode,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaQuoteRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import r1 from '../../assets/images/r1.png';
import r2 from '../../assets/images/r2.png';
import CustomHeading from '../../components/CustomHeading';

const MotionBox = motion(Box);

const reviews = [
  {
    name: 'James Wilson',
    position: 'Project Manager at Microsoft',
    image: r1,
    review:
      "This website is a bonsai lover's dream! The selection is incredible, and the care instructions that come with each tree are so helpful.",
  },
  {
    name: 'Robert Fox',
    position: 'Founder at Brain.co',
    image: r2,
    review:
      '"I had never owned a bonsai before, but this website made the process so easy and enjoyable. The descriptions for each tree are super detailed."',
  },
  {
    name: 'Kristin Watson',
    position: 'UX Designer at Google',
    image: 'https://randomuser.me/api/portraits/women/50.jpg',
    review:
      "As an interior designer, I'm always on the lookout for unique pieces to incorporate into my projects, and this bonsai eCommerce site has become my go-to!",
  },
  {
    name: 'Sophia Martinez',
    position: 'Zen Enthusiast',
    image: 'https://randomuser.me/api/portraits/women/52.jpg',
    review:
      'This website is amazing! The on-demand Zen quotes help me stay grounded and focused throughout the day.',
  },
  {
    name: 'Ethan Carter',
    position: 'Outdoor Photographer',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    review:
      "I'm always on the go, and the Local Weather feature ensures I know the conditions before heading out for a shoot. Super useful!",
  },
  {
    name: 'Olivia Chen',
    position: 'Nurse',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    review:
      'The 3D and AR bonsai experience blew me away! Seeing the trees in augmented reality helped me decide which one fits my space best.',
  },
  {
    name: 'Daniel Robinson',
    position: 'Bonsai Collector',
    image: 'https://randomuser.me/api/portraits/men/40.jpg',
    review:
      "Finding bonsai nurseries near me has never been easier. The 'Discover Local Treasures' feature led me to a hidden gem in my town!",
  },
  {
    name: 'Emily Thompson',
    position: 'Plant Blogger',
    image: 'https://randomuser.me/api/portraits/women/38.jpg',
    review:
      'I love sharing my bonsai journey, and the Bonsai Blog feature makes it seamless to connect with other enthusiasts!',
  },
  {
    name: 'Michael Adams',
    position: 'Botany Student',
    image: 'https://randomuser.me/api/portraits/men/39.jpg',
    review:
      'The AI-powered plant identification tool is mind-blowing! I just snap a photo, and I get all the details I need instantly.',
  },
  {
    name: 'Grace Lee',
    position: 'Mindfulness Coach',
    image: 'https://randomuser.me/api/portraits/women/48.jpg',
    review:
      'The AI Zen Master chatbot is such a unique touch! It gives insightful advice that truly helps me stay in a peaceful mindset.',
  },
];

const SliderArrow = ({ direction, onClick }) => (
  <IconButton
    aria-label={`${direction} slide`}
    icon={direction === 'next' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    onClick={onClick}
    position="absolute"
    top="50%"
    transform="translateY(-50%)"
    {...(direction === 'next' ? { right: '-16px' } : { left: '-16px' })}
    zIndex={2}
    colorScheme="green"
    borderRadius="full"
    size="lg"
    _hover={{ transform: 'translateY(-50%) scale(1.1)' }}
    transition="all 0.2s"
  />
);

const ReviewCard = ({ review }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const titleColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      bg={bgColor}
      borderRadius="xl"
      boxShadow="lg"
      p={6}
      textAlign="center"
      width="350px"
      maxW="350px"
      minH="400px"
      m="auto"
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
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FaQuoteRight size="12px" />
        </Box>
      </Box>

      <Text color={textColor} fontSize="md" mb={4} fontStyle="italic">
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

const ReviewsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayedGroup, setDisplayedGroup] = useState(0);
  const [direction, setDirection] = useState('next');
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const sectionBg = useColorModeValue('gray.50', 'gray.900');
  const dotColor = useColorModeValue('gray.300', 'gray.600');
  const totalGroups = Math.ceil(reviews.length / 3);

  const nextSlide = () => {
    setDirection('next');
    if (isMobile) {
      setCurrentSlide(prev => (prev + 1) % reviews.length);
    } else {
      setDisplayedGroup(prev => (prev + 1) % totalGroups);
    }
  };

  const prevSlide = () => {
    setDirection('prev');
    if (isMobile) {
      setCurrentSlide(prev => (prev - 1 + reviews.length) % reviews.length);
    } else {
      setDisplayedGroup(prev => (prev - 1 + totalGroups) % totalGroups);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(nextSlide, 7000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  return (
    <Box bg={sectionBg} py={16} px={4}>
      <CustomHeading size={'2xl'}>What Our Customers Say</CustomHeading>
      <Box
        maxW="1200px"
        mx="auto"
        position="relative"
        minH="500px"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <MotionBox
            key={isMobile ? currentSlide : displayedGroup}
            display="flex"
            justifyContent="center"
            gap={8}
            minH="450px"
            initial={{ opacity: 0, x: direction === 'next' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'next' ? -50 : 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {isMobile ? (
              <ReviewCard review={reviews[currentSlide]} />
            ) : (
              reviews
                .slice(displayedGroup * 3, displayedGroup * 3 + 3)
                .map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))
            )}
          </MotionBox>
        </AnimatePresence>
        <SliderArrow direction="prev" onClick={prevSlide} />
        <SliderArrow direction="next" onClick={nextSlide} />
      </Box>

      {/* Pagination Dots */}
      <Flex justify="center" mt={6} gap={3} minH="24px">
        {Array.from({ length: isMobile ? reviews.length : totalGroups }).map(
          (_, index) => (
            <Circle
              key={index}
              size="3"
              as="button"
              onClick={() =>
                isMobile ? setCurrentSlide(index) : setDisplayedGroup(index)
              }
              bg={
                (isMobile ? currentSlide : displayedGroup) === index
                  ? 'green.500'
                  : dotColor
              }
              transition="all 0.2s"
              _hover={{ bg: 'green.400' }}
            />
          )
        )}
      </Flex>
    </Box>
  );
};

export default ReviewsSection;
