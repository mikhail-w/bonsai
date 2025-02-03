import { Box, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import ReviewCard from './ReviewCard';
import SliderArrow from './SliderArrow';
import PaginationDots from './PaginationDots';
import reviews from './reviews';

const ReviewsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const chunkSize = isMobile ? 1 : 3;
  const sliderRef = useRef(null);
  const autoplayRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const chunkedReviews = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < reviews.length; i += chunkSize) {
      let group = reviews.slice(i, i + chunkSize);
      if (!isMobile) {
        if (group.length === 1) {
          group = [null, group[0], null];
        } else if (group.length === 2) {
          group = [null, ...group];
        }
      }
      chunks.push(group);
    }
    return [chunks[chunks.length - 1], ...chunks, chunks[0]];
  }, [isMobile]);

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
      setCurrentSlide(index + 1);
    }
  };

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(prev => prev + 1);
    }
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(prev => prev - 1);
    }
  }, [isAnimating]);

  // Handle touch events
  const onTouchStart = e => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = e => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Reset and start autoplay
  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, 10000);
  }, [nextSlide]);

  // Initialize autoplay
  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [resetAutoplay]);

  // Pause autoplay on touch
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const pauseAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };

    const resumeAutoplay = () => {
      resetAutoplay();
    };

    slider.addEventListener('touchstart', pauseAutoplay);
    slider.addEventListener('touchend', resumeAutoplay);
    slider.addEventListener('mouseenter', pauseAutoplay);
    slider.addEventListener('mouseleave', resumeAutoplay);

    return () => {
      slider.removeEventListener('touchstart', pauseAutoplay);
      slider.removeEventListener('touchend', resumeAutoplay);
      slider.removeEventListener('mouseenter', pauseAutoplay);
      slider.removeEventListener('mouseleave', resumeAutoplay);
    };
  }, [resetAutoplay]);

  const sliderStyles = {
    position: 'relative',
    maxWidth: '1200px',
    margin: '32px auto 0',
    overflow: 'hidden',
  };

  const trackStyles = {
    display: 'flex',
    transition: noTransition ? 'none' : 'transform 0.6s ease-in-out',
    transform: `translateX(-${currentSlide * 100}%)`,
    touchAction: 'pan-y pinch-zoom',
  };

  return (
    <Box style={sliderStyles}>
      <Box
        ref={sliderRef}
        style={trackStyles}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTransitionEnd={handleTransitionEnd}
      >
        {chunkedReviews.map((group, idx) => (
          <Box
            key={idx}
            style={{
              minWidth: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
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
                  <Box key={cardIndex} style={{ width: '350px' }} />
                )
              )}
            </SimpleGrid>
          </Box>
        ))}
      </Box>
      <SliderArrow direction="prev" onClick={prevSlide} />
      <SliderArrow direction="next" onClick={nextSlide} />
      <PaginationDots
        realSlidesCount={chunkedReviews.length - 2}
        activeDot={currentSlide - 1}
        goToSlide={goToSlide}
      />
    </Box>
  );
};

export default ReviewsSlider;
