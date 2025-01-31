import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Box, Spinner, HStack, Text } from '@chakra-ui/react';
import CustomMarker from '../../assets/images/leaf-green.png';
import ActiveMarker from '../../assets/images/leaf-red.png';
import useMapLogic from '../../hooks/useMapLogic';
import MapMarkerInfoWindow from './MapMarkerInfoWindow';
import DefaultImg from '../../assets/images/bonsai-tree-logo.png';

const mapContainerStyle = {
  height: '90%',
  width: '100%',
};

//Default to New York
const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

const mapOptions = {
  disableDefaultUI: false,
  gestureHandling: 'greedy',
  clickableIcons: false,
  zoom: 9,
  maxZoom: 18,
  minZoom: 3,
};

const MapContainer = ({
  center,
  setCenter,
  markers,
  setMarkers,
  locationList,
  setLocationList,
  searchTerm,
  setPanTo,
  selectedMarker,
  setSelectedMarker,
  activeMarker,
}) => {
  const mapRef = useRef(null);
  const { isLoaded, loadError } = useMapLogic();
  const [error, setError] = useState('');
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [cachedResults, setCachedResults] = useState(new Map());
  const hoverTimeoutRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const servicesRef = useRef(null);

  const markerIcons = useMemo(() => {
    if (!isLoaded || !window.google?.maps) {
      return {
        default: { url: CustomMarker },
        active: { url: ActiveMarker },
      };
    }

    return {
      default: {
        url: CustomMarker,
        scaledSize: new window.google.maps.Size(38, 95),
      },
      active: {
        url: ActiveMarker,
        scaledSize: new window.google.maps.Size(38, 95),
      },
    };
  }, [isLoaded]);

  const handleMouseOver = useCallback(
    marker => {
      if (!marker) return;
      clearTimeout(hoverTimeoutRef.current);
      setSelectedMarker(marker);
      setInfoWindowVisible(true);
    },
    [setSelectedMarker]
  );

  const handleMouseOut = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setInfoWindowVisible(false);
      setSelectedMarker(null);
    }, 200);
  }, [setSelectedMarker]);

  const memoizedMarkers = useMemo(() => {
    if (!isLoaded || !markers?.length || !window.google?.maps) {
      return [];
    }

    return markers
      .map(marker => {
        if (!marker?.position?.lat || !marker?.position?.lng) {
          return null;
        }

        return (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={
              selectedMarker?.id === marker.id
                ? markerIcons.active
                : markerIcons.default
            }
            zIndex={selectedMarker?.id === marker.id ? 999 : 1}
            onMouseOver={() => handleMouseOver(marker)}
            onMouseOut={handleMouseOut}
            onClick={() => {
              setSelectedMarker(marker);
              setInfoWindowVisible(true);
              clearTimeout(hoverTimeoutRef.current);
            }}
          />
        );
      })
      .filter(Boolean);
  }, [
    markers,
    selectedMarker,
    handleMouseOver,
    handleMouseOut,
    markerIcons,
    isLoaded,
  ]);

  const processPlace = useCallback(place => {
    if (!place?.geometry?.location) {
      return null;
    }

    try {
      return {
        id: place.place_id,
        name: place.name,
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        vicinity: place.vicinity,
        photos: place.photos,
        rating: place.rating || 0,
        reviewCount: place.user_ratings_total || 0,
        isOpen: place.opening_hours?.isOpen() || false,
        types: place.types || [],
        photo: place.photos?.[0]?.getUrl({ maxWidth: 200 }) || DefaultImg,
      };
    } catch (error) {
      console.error('Error processing place:', error);
      return null;
    }
  }, []);

  // Geolocation setup
  useEffect(() => {
    if (!center?.lat && !center?.lng) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setCenter({ lat: latitude, lng: longitude });
          },
          error => {
            console.log('Geolocation error, using default center:', error);
            setCenter(defaultCenter);
            setError('Could not get your location. Using default center.');
          },
          { timeout: 5000, maximumAge: 60000 }
        );
      } else {
        console.log('Geolocation not supported, using default center');
        setCenter(defaultCenter);
        setError('Geolocation is not supported by your browser.');
      }
    }
  }, [center?.lat, center?.lng, setCenter]);

  useEffect(() => {
    if (center?.lat && center?.lng) {
      searchPlaces();
    }
  }, [center]);

  // Places search logic
  const searchPlaces = useCallback(async () => {
    if (!center?.lat || !center?.lng) {
      return;
    }

    if (!isLoaded || !window.google || !mapRef.current) {
      return;
    }

    try {
      setIsLoadingPlaces(true);
      setError('');

      if (!servicesRef.current) {
        servicesRef.current = new window.google.maps.places.PlacesService(
          mapRef.current
        );
      }

      const request = {
        location: new window.google.maps.LatLng(center?.lat, center?.lng),
        // location: new window.google.maps.LatLng(40.7128, -74.006),
        // location: new window.google.maps.LatLng(51.5074, -0.1278),
        radius: 50000,
        keyword: 'bonsai',
        type: 'store',
      };

      const results = await new Promise((resolve, reject) => {
        try {
          servicesRef.current.nearbySearch(request, (results, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              results
            ) {
              resolve(results);
            } else if (
              status ===
              window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS
            ) {
              resolve([]); // No results found
            } else {
              reject(new Error(`Places API Error: ${status}`));
            }
          });
        } catch (error) {
          reject(error);
        }
      });

      if (!results.length) {
        setError('No locations found nearby.');
        setMarkers([]);
        setLocationList([]);
        return;
      }

      const processedResults = results.map(place => ({
        id: place.place_id,
        name: place.name,
        address: place.vicinity,
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        vicinity: place.vicinity,
        rating: place.rating || 0,
        reviewCount: place.user_ratings_total || 0,
        isOpen: place.opening_hours?.isOpen() || false,
        types: place.types || [],
        photo: place.photos?.[0]?.getUrl({ maxWidth: 200 }) || DefaultImg,
      }));

      setMarkers(processedResults);
      setLocationList(processedResults);
    } catch (error) {
      console.error('Search error:', error);
      setError(error.message || 'Failed to search for places');
      setMarkers([]);
      setLocationList([]);
    } finally {
      setIsLoadingPlaces(false);
    }
  }, [isLoaded, center, setMarkers, setLocationList]);

  if (loadError) {
    return (
      <Box p={4} textAlign="center">
        <Text color="red.500">
          Error loading Google Maps: {loadError.message}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      flex="1"
      mb={{ base: 0, md: 0 }}
      height={{ base: 'calc(100vh - 56px)', md: '100vh' }}
      overflow="hidden"
      position="relative"
    >
      {error && (
        <Box
          position="absolute"
          top="4"
          left="50%"
          transform="translateX(-50%)"
          zIndex="1000"
          bg="red.50"
          p="2"
          borderRadius="md"
          boxShadow="lg"
        >
          <Text color="red.500">{error}</Text>
        </Box>
      )}

      {isLoaded ? (
        <>
          {isLoadingPlaces && (
            <Box
              position="absolute"
              top="4"
              left="50%"
              transform="translateX(-50%)"
              zIndex="1000"
              bg="white"
              p="2"
              borderRadius="md"
              boxShadow="lg"
            >
              <HStack spacing="2">
                <Spinner size="sm" color="green.500" />
                <Text>Loading nearby locations...</Text>
              </HStack>
            </Box>
          )}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            options={mapOptions}
            onLoad={map => {
              mapRef.current = map;
              if (window.google && !servicesRef.current) {
                servicesRef.current =
                  new window.google.maps.places.PlacesService(mapRef.current);
              }
            }}
            onClick={() => {
              setInfoWindowVisible(false);
              setSelectedMarker(null);
            }}
          >
            {memoizedMarkers}
            {selectedMarker && infoWindowVisible && selectedMarker.position && (
              <MapMarkerInfoWindow
                selectedMarker={selectedMarker}
                onMouseEnter={() => clearTimeout(hoverTimeoutRef.current)}
                onMouseLeave={handleMouseOut}
              />
            )}
          </GoogleMap>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Spinner size="xl" color="green.500" />
        </Box>
      )}
    </Box>
  );
};

export default MapContainer;
