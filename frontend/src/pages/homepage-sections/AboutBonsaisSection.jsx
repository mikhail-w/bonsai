// src/components/homepage-sections/AboutBonsaisSection.jsx
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const AboutBonsaisSection = () => {
  return (
    <Box
      as="section"
      bg="gray.50"
      py={{ base: 8, md: 16 }}
      px={{ base: 4, md: 8 }}
    >
      <VStack spacing={6} textAlign="center" maxW="3xl" mx="auto">
        <Heading as="h2" size="xl" fontWeight="bold" color="green.700">
          Discover the Art of Bonsai
        </Heading>
        <Text fontSize="lg" color="gray.700">
          At MW Bonsai, we celebrate the timeless tradition of bonsai. Our
          collection features meticulously crafted bonsais for every level of
          enthusiast, from beginners to seasoned artists. We also offer
          high-quality tools, pots, and guides to help you nurture your
          miniature masterpiece.
        </Text>
        <Text fontSize="lg" color="gray.700">
          Whether you’re seeking to bring tranquility to your home or searching
          for the perfect gift, MW Bonsai is your destination for all things
          bonsai. Explore our shop, dive into our care guides, and join a
          community of bonsai lovers worldwide.
        </Text>
      </VStack>
    </Box>
  );
};

export default AboutBonsaisSection;
