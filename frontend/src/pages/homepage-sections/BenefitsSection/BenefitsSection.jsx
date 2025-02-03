import {
  Box,
  SimpleGrid,
  Center,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import CustomHeading from '../../../components/CustomHeading';
import BenefitCard from './BenefitCard';
import BenefitModal from './BenefitModal';
import { benefits, overlayColors, getOverlayGradient } from './benefitsData';
import h3 from '../../../assets/images/hr4.jpg';
import {
  containerVariants,
  headerVariants,
  cardVariants,
} from './animationVariants';

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);

const BenefitsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode } = useColorMode();
  const overlayGradient = getOverlayGradient(colorMode);
  const cardBg = useColorModeValue('#F0F7EE', 'rgba(45, 55, 72, 0.8)');
  const headingColor = useColorModeValue('green.700', '#32CD32');
  const textColor = useColorModeValue('gray.900', 'white');

  // Animation controls
  const headerControls = useAnimation();
  const cardsControls = useAnimation();

  // Ref for section visibility
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    threshold: 0.5,
    once: true,
  });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(async () => {
        await headerControls.set('hidden');
        await cardsControls.set('hidden');

        await headerControls.start('visible');
        await cardsControls.start('visible');
      }, 500); // Delay in milliseconds (500ms = 0.5 seconds)

      return () => clearTimeout(timeout); // Cleanup timeout to prevent memory leaks
    }
  }, [isInView, headerControls, cardsControls]);

  const openModal = index => {
    setModalIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalIndex(null);
  };

  return (
    <Box position="relative">
      <MotionBox
        ref={sectionRef}
        className="section-features"
        bgImage={{
          base: `${
            hoveredIndex !== null
              ? overlayColors[hoveredIndex]
              : overlayGradient
          }, url(${h3})`,
        }}
        bgSize="cover"
        bgPosition="center"
        transform="skewY(-7deg)"
        mt={{ base: 20, md: -20 }}
        py={{ base: '8rem', md: '12rem', lg: '15rem' }}
        px={{ base: '1rem', md: '2rem', lg: '4rem' }}
        overflow="visible"
      >
        <Box position="relative" zIndex={1}>
          <Center>
            <motion.div
              variants={headerVariants}
              initial="hidden"
              animate={headerControls}
            >
              <CustomHeading
                size="2xl"
                color="white"
                transform="skewY(7deg)"
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                mb={100}
              >
                BENEFITS
              </CustomHeading>
            </motion.div>
          </Center>
        </Box>

        <Center transform="skewY(7deg)">
          <MotionSimpleGrid
            columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
            spacing={20}
            variants={containerVariants}
            initial="hidden"
            animate={cardsControls}
            justifyContent="center" // Centering the grid items
            alignItems="center"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={cardVariants}>
                <BenefitCard
                  cardBg={cardBg}
                  benefit={benefit}
                  index={index}
                  setHoveredIndex={setHoveredIndex}
                  openModal={openModal}
                />
              </motion.div>
            ))}
          </MotionSimpleGrid>
        </Center>
      </MotionBox>

      <BenefitModal
        headingColor={headingColor}
        textColor={textColor}
        cardBg={cardBg}
        isOpen={isOpen}
        onClose={closeModal}
        modalIndex={modalIndex}
        benefits={benefits}
      />
    </Box>
  );
};

export default BenefitsSection;
