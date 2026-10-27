import { useContext } from 'react';
import { MapCanvas2DContext } from '../context';

export function useMapCanvas2D() {
  const context = useContext(MapCanvas2DContext);

  if (!context) {
    throw new Error('useMapCanvas2D must be used within MapCanvas2D');
  }

  return context;
}
