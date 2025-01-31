import { useState, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const LIBRARIES = ['places']; // Define libraries as a constant outside

const useMapLogic = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES, // Use the constant
  });

  return { isLoaded, loadError };
};

export default useMapLogic;
