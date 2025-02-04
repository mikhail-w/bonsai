import { Box, Flex, Text, chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { cardVariants } from './animationVariants';
import { gradients } from './data';
import '../../../assets/styles/expanded-cards-section.css';

const MotionBox = chakra(motion.div);

function ExpandingCard({ index, image, activeIndex, handleClick, isMobile }) {
  const isAnyCardActive = activeIndex !== null;
  const isEdgeCard = index === 0 || index === 5; // Assuming 6 cards total, adjust if different

  // Optimize transition timing for edge cards on mobile
  const mobileTransition = {
    height: {
      duration: isEdgeCard ? 0.4 : 0.6, // Faster for edge cards
      ease: 'easeInOut',
    },
    flex: {
      duration: isEdgeCard ? 0.4 : 0.6,
      ease: 'easeInOut',
    },
  };

  return (
    <MotionBox
      layout="position" // Optimize layout animations
      layoutId={`card-${index}`} // Help Framer track elements
      variants={cardVariants}
      custom={index}
      bgImage={`url(${image.url})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      borderRadius="3xl"
      cursor="pointer"
      position="relative"
      m={2}
      flexShrink={0}
      minWidth="0"
      maxWidth="100vw"
      flex={isMobile ? 'none' : activeIndex === index ? 5 : 0.1}
      height={isMobile ? (activeIndex === index ? '300px' : '100px') : '80vh'}
      transition={
        isMobile
          ? mobileTransition
          : 'flex 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), height 1.2s ease-in-out'
      }
      onClick={() => handleClick(index)}
      willChange="transform, height, flex"
      style={{
        backfaceVisibility: 'hidden', // Optimize performance
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      <Flex
        bg={
          activeIndex === index
            ? 'transparent'
            : gradients[index % gradients.length]
        }
        borderRadius="3xl"
        height="100%"
        align={isMobile ? 'flex-end' : 'center'}
        justify="center"
        color="white"
        p={4}
        style={{
          willChange: 'opacity, transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {activeIndex !== index && (
          <Text
            style={{
              fontWeight: 200,
              willChange: 'opacity, transform',
              transition: 'opacity 0.3s ease-out',
            }}
            className={`${isMobile ? 'horizontal-text' : 'vertical-text'} ${
              isAnyCardActive ? 'hide' : ''
            }`}
          >
            {image.title}
          </Text>
        )}
      </Flex>

      <Box
        position="absolute"
        bottom="30px"
        left="20px"
        zIndex="1"
        className={`card__title ${
          activeIndex === index ? 'card__title--active' : ''
        }`}
        style={{
          transitionDelay: activeIndex === index ? '.3s' : '0s',
          willChange: 'opacity, transform',
        }}
      >
        <span className={`card__title-span card__title-span--${index + 1}`}>
          {image.title}
        </span>
      </Box>
    </MotionBox>
  );
}

export default ExpandingCard;
