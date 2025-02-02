import React from 'react';
import bgImage from '../../assets/images/nat-10.jpg'; // Ensure this path is correct
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Heading,
  VStack,
  HStack,
  useBreakpointValue,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';

const NewsLetterSection = () => {
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box
      bgColor="#32b882"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <Box
        w={{ base: '95%', md: '80%', lg: '70%' }}
        h={{ base: 'auto', md: '60vh' }}
        maxW="1200px"
        bg="white"
        rounded="lg"
        overflow="hidden"
        shadow="xl"
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        position="relative"
      >
        {/* Left Form Section with Curved Clip Path */}
        <Box
          flex="1"
          bg={bgColor}
          p={{ base: 6, md: 8 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            bg: bgColor,
            clipPath: {
              base: 'none',
              md: 'path("M100% 0 Q80% 50% 100% 100% L0 100% L0 0 Z")', // Smooth curved transition
            },
            zIndex: -1,
          }}
        >
          <Heading
            as="h2"
            size={{ base: 'md', md: 'lg' }}
            mb={6}
            color="green.600"
            textTransform={'uppercase'}
          >
            Register for Our Newsletter
          </Heading>
          <VStack
            as="form"
            spacing={4}
            maxWidth={{ base: '100%', md: '300px' }}
          >
            <FormControl isRequired>
              <FormLabel
                htmlFor="name"
                color={useColorModeValue('gray.700', 'white')}
              >
                Full Name
              </FormLabel>
              <Input id="name" placeholder="Full Name" variant="filled" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel
                htmlFor="email"
                color={useColorModeValue('gray.700', 'white')}
              >
                Email Address
              </FormLabel>
              <Input
                id="email"
                placeholder="Email Address"
                type="email"
                variant="filled"
              />
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend" color="gray.700">
                Select Frequency
              </FormLabel>
              <RadioGroup defaultValue="small">
                <HStack spacing={4}>
                  <Radio value="small" colorScheme="green">
                    Weekly
                  </Radio>
                  <Radio value="large" colorScheme="green">
                    Monthly
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <Button colorScheme="green" size="lg" w="full" mt={4}>
              Next Step →
            </Button>
          </VStack>
        </Box>

        {/* Image Section on the Right */}
        <Box
          flex="1"
          position="relative"
          overflow="hidden"
          display={{ base: 'none', md: 'block' }}
        >
          <Image
            src={bgImage}
            alt="Newsletter Background"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NewsLetterSection;
