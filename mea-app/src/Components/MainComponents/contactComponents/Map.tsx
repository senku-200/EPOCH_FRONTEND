"use client";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false, 
});

const Map: React.FC = () => {
  useEffect(() => {
  }, []);

  return (
    <div>
      <MapComponent />
    </div>
  );
};

export default Map;
