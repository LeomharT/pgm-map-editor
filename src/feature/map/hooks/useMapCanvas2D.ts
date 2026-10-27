import { useContext } from 'react';
import { MapCanvas2DContext } from '../context';

export function useMapCanvas2D() {
  const contex = useContext(MapCanvas2DContext);

  if (!contex) throw new Error('Please use this hook inside Canvas2D');

  return contex;
}
