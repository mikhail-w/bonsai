import { useState, useEffect } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CustomButton from '../../../components/CustomButton';
import { cardVariants } from './animations';
import '../../../assets/styles/card.css';

const MotionBox = motion(Box);

const FeaturedProductCard = ({ product, index, onToggleFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the user is on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsFlipped(false);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <MotionBox
      className="card"
      variants={cardVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick} // Enable click-to-flip on mobile
      cursor="pointer"
    >
      <Box className={`card__inner ${isFlipped ? 'is-flipped' : ''}`}>
        {/* Front Face */}
        <Box className="card__face card__face--front" bg="white">
          <Box
            className={`card__picture card__picture--${index + 1}`}
            position="relative"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image
              src={product.image}
              alt={product.title}
              className="card__image"
              borderRadius="lg"
              objectFit="cover"
              zIndex={0}
            />
          </Box>
          <h3 className={`card__heading card__heading--${index + 1}`}>
            <span
              className={`card__heading-span card__heading-span--${index + 1}`}
            >
              {product.title}
            </span>
          </h3>
        </Box>

        {/* Back Face */}
        <Box
          className={`card__face card__face--back card__face--back--${
            index + 1
          }`}
        >
          <Flex
            className="card__content"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
            height="100%"
          >
            <Text
              fontFamily="lato"
              fontWeight="300"
              fontSize="2rem"
              mb={4}
              color="white"
            >
              {product.description}
            </Text>
            <CustomButton to={product.path}>Shop Now</CustomButton>
          </Flex>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default FeaturedProductCard;
