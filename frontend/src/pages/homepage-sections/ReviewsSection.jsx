import React from 'react';
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
import r1 from '../../assets/images/r1.png';
import r2 from '../../assets/images/r2.png';
import CustomHeading from '../../components/CustomHeading';

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

const SliderArrow = ({ direction, onClick }) => {
  const isNext = direction === 'next';

  return (
    <IconButton
      aria-label={`${direction} slide`}
      icon={isNext ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      onClick={onClick}
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      {...(isNext ? { right: '-16px' } : { left: '-16px' })}
      zIndex={2}
      colorScheme="green"
      borderRadius="full"
      size="lg"
      _hover={{
        transform: 'translateY(-50%) scale(1.1)',
      }}
      transition="all 0.2s"
    />
  );
};

const ReviewCard = ({ review }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const titleColor = useColorModeValue('gray.800', 'white');
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box
      bg={bgColor}
      borderRadius="xl"
      boxShadow="lg"
      p={6}
      textAlign="center"
      width={isMobile ? 'calc(100vw - 80px)' : '350px'}
      maxW={isMobile ? '100%' : '350px'}
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

      <Text
        color={textColor}
        fontSize={isMobile ? 'lg' : 'md'}
        mb={4}
        fontStyle="italic"
        px={isMobile ? 2 : 0}
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

const ReviewsSection = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [displayedGroup, setDisplayedGroup] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const sectionBg = useColorModeValue('gray.50', 'gray.900');
  const titleColor = useColorModeValue('green.600', 'green.400');
  const dotColor = useColorModeValue('gray.300', 'gray.600');
  const { colorMode } = useColorMode();

  // Calculate the total number of groups for desktop view (3 reviews per group)
  const totalGroups = Math.ceil(reviews.length / 3);

  const nextSlide = () => {
    if (isMobile) {
      setCurrentSlide(prev => (prev + 1) % reviews.length);
    } else {
      setDisplayedGroup(prev => (prev + 1) % totalGroups);
    }
  };

  const prevSlide = () => {
    if (isMobile) {
      setCurrentSlide(prev => (prev - 1 + reviews.length) % reviews.length);
    } else {
      setDisplayedGroup(prev => (prev - 1 + totalGroups) % totalGroups);
    }
  };

  const goToSlide = index => {
    if (isMobile) {
      setCurrentSlide(index);
    } else {
      setDisplayedGroup(Math.floor(index / 3));
    }
  };

  React.useEffect(() => {
    let timer;
    if (!isHovered) {
      timer = setInterval(nextSlide, 7000);
    }
    return () => clearInterval(timer);
  }, [isHovered, isMobile]);

  // Get the current group of reviews for desktop view
  const getCurrentGroup = () => {
    const startIndex = displayedGroup * 3;
    const currentGroup = reviews.slice(startIndex, startIndex + 3);

    // If it's the last group and there's only one review, center it
    if (currentGroup.length === 1) {
      return [null, currentGroup[0], null];
    } else if (currentGroup.length === 2) {
      return [currentGroup[0], currentGroup[1], null];
    }
    return currentGroup;
  };

  return (
    <Box bg={sectionBg} py={16} px={4}>
      <CustomHeading size={'2xl'}>What Our Customers Say</CustomHeading>
      <Box
        maxW="1200px"
        mx="auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isMobile ? (
          <Box position="relative" mx={6}>
            <ReviewCard review={reviews[currentSlide]} />
            <SliderArrow direction="prev" onClick={prevSlide} />
            <SliderArrow direction="next" onClick={nextSlide} />
          </Box>
        ) : (
          <Box position="relative">
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
              {getCurrentGroup().map((review, index) =>
                review ? (
                  <ReviewCard key={index} review={review} />
                ) : (
                  <Box key={index} width="350px" /> // Placeholder for centering
                )
              )}
            </SimpleGrid>
            <SliderArrow direction="prev" onClick={prevSlide} />
            <SliderArrow direction="next" onClick={nextSlide} />
          </Box>
        )}

        {/* Custom Pagination Dots */}
        <Flex justify="center" mt={6} gap={3}>
          {isMobile
            ? // Mobile pagination - one dot per review
              reviews.map((_, index) => (
                <Circle
                  key={index}
                  size="3"
                  as="button"
                  onClick={() => goToSlide(index)}
                  bg={currentSlide === index ? 'green.500' : dotColor}
                  transform={
                    currentSlide === index ? 'scale(1.25)' : 'scale(1)'
                  }
                  transition="all 0.2s"
                  _hover={{
                    bg: currentSlide === index ? 'green.500' : 'green.400',
                  }}
                  sx={{
                    '&:focus': {
                      boxShadow: 'none',
                      outline:
                        colorMode === 'dark'
                          ? '1px solid white'
                          : '1px solid black',
                      outlineOffset: '2px',
                    },
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))
            : // Desktop pagination - one dot per group of 3
              Array.from({ length: totalGroups }).map((_, index) => (
                <Circle
                  key={index}
                  size="3"
                  as="button"
                  onClick={() => goToSlide(index * 3)}
                  bg={displayedGroup === index ? 'green.500' : dotColor}
                  transform={
                    displayedGroup === index ? 'scale(1.25)' : 'scale(1)'
                  }
                  transition="all 0.2s"
                  _hover={{
                    bg: displayedGroup === index ? 'green.500' : 'green.400',
                  }}
                  sx={{
                    '&:focus': {
                      boxShadow: 'none',
                      outline:
                        colorMode === 'dark'
                          ? '1px solid white'
                          : '1px solid black',
                      outlineOffset: '2px',
                    },
                  }}
                  aria-label={`Go to group ${index + 1}`}
                />
              ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default ReviewsSection;
