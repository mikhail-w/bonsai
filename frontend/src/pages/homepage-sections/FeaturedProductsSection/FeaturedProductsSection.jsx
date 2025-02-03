import { useState } from 'react';
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CustomButton from '../../../components/CustomButton';
import CustomHeading from '../../../components/CustomHeading';
import FeaturedProductCard from './FeaturedProductCard';
import {
  headingVariants,
  cardsContainerVariants,
  buttonVariants,
} from './animations';
import { products } from './products';

const FeaturedProductsSection = () => {
  const [flipped, setFlipped] = useState(Array(products.length).fill(false));
  const [showButton, setShowButton] = useState(false); // Track when animation is done

  const handleToggleFlip = index => {
    setFlipped(prevFlipped =>
      prevFlipped.map((flip, i) => (i === index ? !flip : flip))
    );
  };

  return (
    <Box
      mt={50}
      mb={100}
      py={16}
      textAlign="center"
      bg={useColorModeValue('white', 'gray.800')}
      minH="100vh"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <motion.div variants={headingVariants}>
          <CustomHeading size="2xl" mb={20} mt={{ base: -50, md: -50, lg: 3 }}>
            Featured Products
          </CustomHeading>
        </motion.div>

        <motion.div
          variants={cardsContainerVariants}
          onAnimationComplete={() => setShowButton(true)} // Set showButton to true after animation
        >
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            px={6}
            justifyItems="center"
            mt={30}
          >
            {products.map((product, index) => (
              <FeaturedProductCard
                key={index}
                product={product}
                index={index}
                flipped={flipped[index]}
                onToggleFlip={() => handleToggleFlip(index)}
              />
            ))}
          </SimpleGrid>

          {/* Button appears only after animations are complete */}
          {showButton && (
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              <CustomButton to="/products" mt={20}>
                Shop All Bonsai
              </CustomButton>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default FeaturedProductsSection;
