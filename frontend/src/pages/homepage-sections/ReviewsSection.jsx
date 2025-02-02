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

// Original reviews array
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

// Arrow component (unchanged)
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
      {...(isNext ? { right: '1rem' } : { left: '1rem' })}
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

// Review card (unchanged from your original)
const ReviewCard = ({ review }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const titleColor = useColorModeValue('gray.800', 'white');
  const isMobile = useBreakpointValue({ base: true, lg: false });

  if (!review) {
    // If it's a placeholder "null," render an empty box for spacing
    return <Box width={isMobile ? 'calc(100vw - 80px)' : '350px'} />;
  }

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

export default function ReviewsSection() {
  // Determine if we are in mobile mode
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const sectionBg = useColorModeValue('gray.50', 'gray.900');
  const dotColor = useColorModeValue('gray.300', 'gray.600');
  const { colorMode } = useColorMode();

  // Hover state to pause auto-slide
  const [isHovered, setIsHovered] = React.useState(false);

  // We'll manage the current "fake" slide index for infinite loop
  const [currentSlide, setCurrentSlide] = React.useState(1);

  // ============================================
  // 1) Group reviews based on screen size:
  //
  // - On mobile (isMobile === true), group one review per slide.
  // - On larger screens, group in sets of three (and adjust final groups to center leftover items).
  // ============================================
  const chunkedReviews = React.useMemo(() => {
    const chunks = [];
    const step = isMobile ? 1 : 3; // Use 1 card per slide on mobile
    for (let i = 0; i < reviews.length; i += step) {
      let group = reviews.slice(i, i + step);
      if (!isMobile) {
        // For non-mobile: if the final group has fewer than 3 items, adjust them so that they are centered
        if (group.length === 1) {
          group = [null, group[0], null];
        } else if (group.length === 2) {
          group = [group[0], group[1], null];
        }
      }
      chunks.push(group);
    }
    return chunks;
  }, [isMobile]);

  // Total "real" slides
  const realSlidesCount = chunkedReviews.length;

  // ============================================
  // 2) Duplicate slides for infinite loop.
  //    We prepend the last chunk and append the first chunk.
  // ============================================
  const slidesForLoop = React.useMemo(() => {
    if (realSlidesCount === 1) {
      // Edge case: if there's only 1 chunk total, just present that chunk (no infinite looping needed).
      return chunkedReviews;
    }
    const firstChunk = chunkedReviews[0];
    const lastChunk = chunkedReviews[chunkedReviews.length - 1];
    return [lastChunk, ...chunkedReviews, firstChunk];
  }, [chunkedReviews, realSlidesCount]);

  // The total slides in our "duplicated" array
  const totalSlides = slidesForLoop.length; // realSlidesCount + 2 (usually)

  // If there's truly only 1 chunk, force currentSlide=0 so we don't break
  React.useEffect(() => {
    if (realSlidesCount === 1) {
      setCurrentSlide(0);
    }
  }, [realSlidesCount]);

  // ============================================
  // 3) Next / Prev handlers with infinite loop logic
  // ============================================
  const nextSlide = React.useCallback(() => {
    setCurrentSlide(prev => prev + 1);
  }, []);

  const prevSlide = React.useCallback(() => {
    setCurrentSlide(prev => prev - 1);
  }, []);

  // Function for pagination dots to jump to a "real" slide index.
  const goToSlide = index => {
    // real index "0" => fake index "1"
    setCurrentSlide(index + 1);
  };

  // ============================================
  // 4) Automatic sliding if not hovered
  // ============================================
  React.useEffect(() => {
    if (isHovered || realSlidesCount === 1) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide, realSlidesCount]);

  // ============================================
  // 5) Handle the "instant jump" for seamless infinite looping.
  // ============================================
  const [noTransition, setNoTransition] = React.useState(false);

  React.useEffect(() => {
    if (realSlidesCount === 1) return;

    let id;
    if (currentSlide === totalSlides - 1) {
      // Slid onto the final fake chunk (duplicated first)
      id = setTimeout(() => {
        setNoTransition(true);
        setCurrentSlide(1); // Jump to the real first chunk
      }, 300);
    } else if (currentSlide === 0) {
      // Slid onto the first fake chunk (duplicated last)
      id = setTimeout(() => {
        setNoTransition(true);
        setCurrentSlide(realSlidesCount); // Jump to the real last chunk
      }, 300);
    } else {
      setNoTransition(false);
    }

    return () => clearTimeout(id);
  }, [currentSlide, totalSlides, realSlidesCount]);

  // Track styles for sliding the slides
  const trackStyles = {
    display: 'flex',
    width: '100%',
    transition: noTransition ? 'none' : 'transform 0.6s ease-in-out',
    transform: `translateX(-${currentSlide * 100}%)`,
  };

  // ============================================
  // 6) Pagination Dots: map the "real" slide index to the current slide.
  // ============================================
  const activeDot = React.useMemo(() => {
    if (realSlidesCount === 1) return 0;
    let realIndex = currentSlide - 1;
    if (realIndex < 0) realIndex = realSlidesCount - 1;
    if (realIndex >= realSlidesCount) realIndex = 0;
    return realIndex;
  }, [currentSlide, realSlidesCount]);

  return (
    <Box bg={sectionBg} py={16} px={4}>
      <CustomHeading size="2xl">What Our Customers Say</CustomHeading>

      <Box
        maxW="1200px"
        mx="auto"
        position="relative"
        mt={8}
        mb={8}
        overflow="visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slider Track */}
        <Box position="relative" overflow="hidden">
          <Box style={trackStyles} mb={8}>
            {slidesForLoop.map((slideGroup, idx) => (
              <Box
                key={idx}
                minWidth="100%"
                flexShrink={0}
                display="flex"
                justifyContent="center"
              >
                {/* 
                  The SimpleGrid is configured to use 1 column on mobile (base)
                  and 3 columns on large screens (lg). Since our grouping now 
                  depends on isMobile, on mobile each slide will contain only one review.
                */}
                <SimpleGrid
                  columns={{ base: 1, lg: 3 }}
                  spacing={8}
                  alignItems="flex-start"
                >
                  {slideGroup.map((review, cardIndex) => (
                    <ReviewCard key={cardIndex} review={review} />
                  ))}
                </SimpleGrid>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Arrows */}
        {realSlidesCount > 1 && (
          <>
            <SliderArrow direction="prev" onClick={prevSlide} />
            <SliderArrow direction="next" onClick={nextSlide} />
          </>
        )}
      </Box>

      {/* Pagination Dots */}
      {realSlidesCount > 1 && (
        <Flex justify="center" mt={6} gap={3}>
          {Array.from({ length: realSlidesCount }).map((_, index) => (
            <Circle
              key={index}
              size="3"
              as="button"
              onClick={() => goToSlide(index)}
              bg={activeDot === index ? 'green.500' : dotColor}
              transform={activeDot === index ? 'scale(1.25)' : 'scale(1)'}
              transition="all 0.2s"
              _hover={{
                bg: activeDot === index ? 'green.500' : 'green.400',
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
          ))}
        </Flex>
      )}
    </Box>
  );
}
