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
      title: 'Shop   Plants',
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
      mt={100}
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
          >
            <Box
              className={`card__inner ${flipped[index] ? 'is-flipped' : ''}`}
            >
              {/* Front Side */}
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
              {/* Back Side */}
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
                  {/* <CustomButton to={product.path}>Shop Now</CustomButton> */}
                  <Button
                    as={RouterLink}
                    to={product.path}
                    mt={50}
                    mb={50}
                    padding={'1rem 2.5rem'}
                    size="lg"
                    textTransform={'uppercase'}
                    borderRadius={'100px'}
                    bg="#55c57a"
                    color="white"
                    position="relative"
                    fontFamily="lato"
                    fontWeight={'350px'}
                    _hover={{
                      transform: 'translateY(-3px)',
                      // boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                      border: '1px solid',
                      outlineColor: 'rgba(255, 255, 255, 0)',
                      outlineOffset: '15px',
                      // textShadow: '1px 1px 2px #427388',
                    }}
                    _active={{
                      transform: 'translateY(-1px)',
                      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                    }}
                    _after={{
                      content: '""',
                      display: 'inline-block',
                      height: '100%',
                      width: '100%',
                      borderRadius: '100px',
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      zIndex: '-1',
                      transition: 'all 0.4s',
                      backgroundColor: 'white',
                    }}
                    sx={{
                      ':hover::after': {
                        transform: 'scaleX(1.4) scaleY(1.6)',
                        opacity: 0,
                      },
                    }}
                  >
                    Shop Now
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Button
        as={RouterLink}
        to="/products"
        mt={50}
        mb={50}
        padding={'1rem 2.5rem'}
        size="lg"
        textTransform={'uppercase'}
        borderRadius={'100px'}
        bg="#55c57a"
        color="white"
        position="relative"
        fontFamily="lato"
        fontWeight={'350px'}
        _hover={{
          transform: 'translateY(-3px)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        }}
        _active={{
          transform: 'translateY(-1px)',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
        }}
        _after={{
          content: '""',
          display: 'inline-block',
          height: '100%',
          width: '100%',
          borderRadius: '100px',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '-1',
          transition: 'all 0.4s',
          backgroundColor: bgColor,
        }}
        sx={{
          ':hover::after': {
            transform: 'scaleX(1.4) scaleY(1.6)',
            opacity: 0,
          },
        }}
      >
        Shop All Bonsai
      </Button>
      {/* <CustomButton to="/products">Shop All Bonsai</CustomButton> */}
    </Box>
  );
};

export default FeaturedProductsSection;
