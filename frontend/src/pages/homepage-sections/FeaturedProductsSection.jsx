import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Button,
  Text,
  Image,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import p3 from '../../assets/images/h10.jpg';
import p4 from '../../assets/images/potters.jpg';
import p5 from '../../assets/images/can.jpg';
import '../../assets/styles/card.css';
import CustomButton from '../../components/CustomButton';
import CustomHeading from '../../components/CustomHeading';

const FeaturedProductsSection = () => {
  const bgColor = useColorModeValue('#48a169', 'white');
  const products = [
    {
      title: 'Shop Plants',
      description: 'Discover a wide variety of plants.',
      image: p3,
      path: '/plants',
      gradient: 'linear-gradient(to bottom right, #ff9f40, #ffce00)',
    },
    {
      title: 'Shop Planters',
      description: 'Explore elegant planters for your plants.',
      image: p4,
      path: '/planters',
      gradient: 'linear-gradient(to bottom right, #48ef80, #48bf91)',
    },
    {
      title: 'Shop Accessories',
      description: 'Find perfect accessories for bonsai care.',
      image: p5,
      path: '/essentials',
      gradient: 'linear-gradient(to bottom right, #4891ef, #48bfff)',
    },
  ];

  const [flipped, setFlipped] = useState(Array(products.length).fill(false));

  const handleMouseEnter = index => {
    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);
  };

  const handleMouseLeave = index => {
    const newFlipped = [...flipped];
    newFlipped[index] = false;
    setFlipped(newFlipped);
  };

  const handleToggleFlip = index => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
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
      <CustomHeading size={'2xl'}>Featured Products</CustomHeading>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={10}
        px={6}
        justifyItems="center"
      >
        {products.map((product, index) => (
          <Box
            key={index}
            className="card"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => handleToggleFlip(index)}
            cursor={'pointer'}
            justifySelf={
              index === 2 && { base: 'center', md: 'center', lg: 'center' }
            }
          >
            <Box
              className={`card__inner ${flipped[index] ? 'is-flipped' : ''}`}
            >
              <Box className="card__face card__face--front " bg={'white'}>
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
                    className={`card__heading-span card__heading-span--${
                      index + 1
                    }`}
                  >
                    {product.title}
                  </span>
                </h3>
              </Box>
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
                    fontWeight={'300'}
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
          </Box>
        ))}
      </SimpleGrid>
      <CustomButton to="/products">Shop All Bonsai</CustomButton>
    </Box>
  );
};

export default FeaturedProductsSection;
