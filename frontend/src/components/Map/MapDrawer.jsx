import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  HStack,
  VStack,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';

const MapDrawer = ({
  isOpen,
  onClose,
  locationList,
  setCenter,
  handleIconClick,
  setSelectedMarker,
}) => {
  const listItemBg = useColorModeValue('white', 'gray.700');
  const listItemHoverBg = useColorModeValue('gray.100', 'gray.600');

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Nearby Bonsai Locations</DrawerHeader>
        <DrawerBody>
          <List spacing={4} pl={0}>
            {locationList.map(location => (
              <ListItem
                key={location.place_id}
                p={3}
                borderRadius="md"
                boxShadow="sm"
                bg={listItemBg}
                _hover={{
                  bg: listItemHoverBg,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setSelectedMarker(location);
                  setCenter({
                    lat: location.position.lat,
                    lng: location.position.lng,
                  });

                  onClose();
                }}
              >
                <HStack spacing={4}>
                  <Image
                    boxSize="50px"
                    borderRadius="md"
                    objectFit="cover"
                    src={location.photo || '/default-image.png'}
                    alt={`${location.name} thumbnail`}
                    fallbackSrc="/default-image.png"
                  />
                  <VStack align="start" spacing={1}>
                    <Text fontFamily="rale" fontWeight="bold">
                      {location.name}
                    </Text>
                    <Text
                      fontFamily="rale"
                      fontSize="sm"
                      color={useColorModeValue('gray.600', 'gray.300')}
                    >
                      {location.vicinity}
                    </Text>
                  </VStack>
                </HStack>
              </ListItem>
            ))}
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MapDrawer;
