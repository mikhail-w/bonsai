import { useState } from 'react';
import { Box, Flex, useColorModeValue, Wrap, WrapItem } from '@chakra-ui/react';
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
      mb={{ base: '0', md: '100' }}
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
          onAnimationComplete={() => setShowButton(true)}
        >
          {/* Responsive Layout for Cards */}
          <Wrap
            spacing={{ base: '30', md: '40' }}
            px={6}
            justify="center"
            align="center"
            shouldWrapChildren
          >
            {products.map((product, index) => (
              <WrapItem
                key={index}
                flex={{ base: '1 1 100%', md: '1 1 45%', lg: '1 1 30%' }}
                display="flex"
                justifyContent="center"
              >
                <FeaturedProductCard
                  product={product}
                  index={index}
                  flipped={flipped[index]}
                  onToggleFlip={() => handleToggleFlip(index)}
                />
              </WrapItem>
            ))}
          </Wrap>

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
