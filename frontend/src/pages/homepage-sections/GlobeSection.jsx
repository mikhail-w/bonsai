import { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Center, useBreakpointValue, Box, Spinner } from '@chakra-ui/react';
import Earth from '../../../public/Earth';
import CustomHeading from '../../components/CustomHeading';

// Constants
const ZOOM_LIMITS = {
  MIN: 5.5,
  MAX: 8,
  DEFAULT: 8,
};

const CONTAINER_SIZES = {
  base: '300px',
  sm: '400px',
  md: '600px',
  lg: '800px',
};

// Memoized OrbitControls component
const CustomOrbitControls = memo(({ minDistance, maxDistance }) => (
  <OrbitControls
    enableZoom={true}
    minDistance={minDistance}
    maxDistance={maxDistance}
    enablePan={false}
    enableRotate={true}
  />
));

CustomOrbitControls.displayName = 'CustomOrbitControls';

// Memoized loading spinner component
const LoadingFallback = memo(() => (
  <Center width="100%" height="100%">
    <Spinner size="xl" color="teal.500" thickness="4px" speed="0.8s" />
  </Center>
));

LoadingFallback.displayName = 'LoadingFallback';

// Earth canvas component
const EarthCanvas = memo(({ minZoom, maxZoom }) => (
  <Canvas
    className="earthContainer"
    camera={{ position: [0, 0, ZOOM_LIMITS.DEFAULT] }}
    dpr={[1, 2]}
    gl={{
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      premultipliedAlpha: false,
      // Prevent y-flip warning
      pixelStorei: {
        UNPACK_FLIP_Y_WEBGL: false,
        UNPACK_PREMULTIPLY_ALPHA_WEBGL: false,
      },
    }}
  >
    <ambientLight intensity={1} />
    <Earth />
    <CustomOrbitControls minDistance={minZoom} maxDistance={maxZoom} />
    <Environment preset="sunset" />
  </Canvas>
));

EarthCanvas.displayName = 'EarthCanvas';

// Main Globe Component
const GlobeSection = () => {
  const containerSize = useBreakpointValue(CONTAINER_SIZES);

  return (
    <Box
      marginBottom="100px"
      sx={{
        WebkitTapHighlightColor: 'transparent',
        willChange: 'transform',
        userSelect: 'none',
      }}
    >
      <Center
        width={containerSize}
        height={containerSize}
        margin="auto"
        position="relative"
        role="region"
        aria-label="Interactive 3D Earth Globe"
      >
        <Box position="relative" width="100%" height="100%">
          <Suspense fallback={<LoadingFallback />}>
            <EarthCanvas minZoom={ZOOM_LIMITS.MIN} maxZoom={ZOOM_LIMITS.MAX} />
          </Suspense>
        </Box>
      </Center>
      <Center marginTop="8">
        <CustomHeading>Save the World, plant a tree</CustomHeading>
      </Center>
    </Box>
  );
};

export default memo(GlobeSection);
