import { Box, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import ReviewCard from './ReviewCard';
import SliderArrow from './SliderArrow';
import PaginationDots from './PaginationDots';
import reviews from './reviews';

const ReviewsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Start at 1 to account for cloned slide
  const [isAnimating, setIsAnimating] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const chunkSize = isMobile ? 1 : 3;
  const sliderRef = useRef(null);

  // Create chunked reviews with cloned slides for infinite scroll
  const chunkedReviews = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < reviews.length; i += chunkSize) {
      let group = reviews.slice(i, i + chunkSize);
      if (!isMobile) {
        if (group.length === 1) {
          group = [null, group[0], null]; // Center single item
        } else if (group.length === 2) {
          group = [null, ...group]; // Center two items
        }
      }
      chunks.push(group);
    }

    // Clone first and last slides for smooth infinite scroll
    return [chunks[chunks.length - 1], ...chunks, chunks[0]];
  }, [isMobile]);

  // Handle the infinite scroll transition
  const handleTransitionEnd = useCallback(() => {
    setIsAnimating(false);

    if (currentSlide === 0) {
      setNoTransition(true);
      setCurrentSlide(chunkedReviews.length - 2);
    } else if (currentSlide === chunkedReviews.length - 1) {
      setNoTransition(true);
      setCurrentSlide(1);
    }
  }, [currentSlide, chunkedReviews.length]);

  useEffect(() => {
    if (noTransition) {
      const timeout = setTimeout(() => {
        setNoTransition(false);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [noTransition]);

  const goToSlide = index => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index + 1); // Add 1 to account for cloned slide
    }
  };

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <Box position="relative" maxW="1200px" mx="auto" mt={8} overflow="hidden">
      <Box
        ref={sliderRef}
        display="flex"
        transition={noTransition ? 'none' : 'transform 0.6s ease-in-out'}
        transform={`translateX(-${currentSlide * 100}%)`}
        onTransitionEnd={handleTransitionEnd}
      >
        {chunkedReviews.map((group, idx) => (
          <Box key={idx} minWidth="100%" display="flex" justifyContent="center">
            <SimpleGrid
              columns={{ base: 1, lg: 3 }}
              spacing={8}
              justifyItems="center"
              width="100%"
            >
              {group.map((review, cardIndex) =>
                review ? (
                  <ReviewCard key={cardIndex} review={review} />
                ) : (
                  <Box key={cardIndex} width="350px" />
                )
              )}
            </SimpleGrid>
          </Box>
        ))}
      </Box>
      <SliderArrow direction="prev" onClick={prevSlide} />
      <SliderArrow direction="next" onClick={nextSlide} />
      <PaginationDots
        realSlidesCount={chunkedReviews.length - 2} // Subtract 2 for cloned slides
        activeDot={currentSlide - 1} // Subtract 1 to account for first cloned slide
        goToSlide={goToSlide}
      />
    </Box>
  );
};

export default ReviewsSlider;
