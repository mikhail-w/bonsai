import '../index.css';
import {
  HeroSection,
  FeaturedProductsSection,
  BenefitsSection,
  ExpandingCardsSection,
  ReviewsSection,
  GlobeSection,
  NewsLetterSection,
  AboutBonsaisSection,
} from '@homepageSections';
import { useEffect } from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';
import FeaturesSection from './homepage-sections/FeaturesSection/FeaturesSection';
import { Box } from '@chakra-ui/react';

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
      <AboutBonsaisSection />
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
