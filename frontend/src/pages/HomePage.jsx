import '../index.css';
import {
  HeroSection,
  GlobeSection,
  NewsLetterSection,
} from '@homepageSections';
import { useEffect } from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';
import FeaturesSection from './homepage-sections/FeaturesSection/FeaturesSection';
import BenefitsSection from './homepage-sections/BenefitsSection/BenefitsSection';
import ExpandingCardsSection from './homepage-sections/ExpandingCardsSection/ExpandingCardsSection';
import { Box } from '@chakra-ui/react';
import AboutBonsaiSection from './homepage-sections/AboutBonsaiSection/AboutBonsaiSection';
import FeaturedProductsSection from './homepage-sections/FeaturedProductsSection/FeaturedProductsSection';
import ReviewsSection from './homepage-sections/ReviewsSection/ReviewsSection';

function HomePage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <HeroSection />
      <AboutBonsaiSection />
      <FeaturedProductsSection />
      <Box height="120px" bg="transparent" />
      <BenefitsSection />
      <Box height="120px" bg="transparent" />
      <FeaturesSection />
      <ReviewsSection />
      <ExpandingCardsSection />
      <GlobeSection />
      <NewsLetterSection />
      <ScrollToTopButton />
    </>
  );
}

export default HomePage;
