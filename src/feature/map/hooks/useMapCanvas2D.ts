import { useContext } from 'react';
import { MapCanvas2DContext } from '../context';

export function useMapCanvas2D() {
  const contex = useContext(MapCanvas2DContext);

  if (!contex?.engine) throw new Error('useMapEngine2D must be used after engine is ready');

  return contex.engine;
}
